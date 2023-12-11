// Retrieved and modified from https://usehooks-ts.com/react-hook/use-local-storage

import { type SetStateAction, useCallback, useEffect, useState } from 'react'
import { LOCAL_STORAGE_EVENT } from '~/constants/localStorage'
import { useEventCallback, useEventListener } from 'usehooks-ts'

export const useLocalStorageTest = <T>(
  key: string,
  initialValue?: T
): readonly [T | undefined, (value: SetStateAction<T | undefined>) => void] => {
  console.log('testLocalStorage')
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback(() => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      return initialValue
    }
  }, [initialValue, key])
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(readValue)
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useEventCallback((value: SetStateAction<T | undefined>) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value

      if (newValue === undefined) {
        window.localStorage.removeItem(key)
      } else {
        console.log('newValue', newValue)
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(newValue))
        // Save state
      }
      setStoredValue(newValue)
      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT))
    } catch {
      // TODO (#2640) Pass in some sort of logger here.
    }
  })

  useEffect(() => {
    setStoredValue(readValue())
    // check if need to rely on "key" change, is there a chance something doesnt get updated? ie same initial value
    // but different key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return
      }
      setStoredValue(readValue())
    },
    [key, readValue]
  )

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange)

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener('local-storage', handleStorageChange)
  return [storedValue, setValue] as const
}
