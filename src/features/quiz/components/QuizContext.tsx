import {
  createContext,
  type PropsWithChildren,
  useContext,
  useCallback,
} from 'react'
import { useLocalStorageTest } from '~/hooks/useLocalStorageTest'

type QuizStates = {
  categoryChoices: string[] | undefined
  setCategoryChoice: (category: string, order: number) => void
  clearCategoryChoices: () => void
}

export const QuizContext = createContext<QuizStates | undefined>(undefined)

export const useQuizContext = () => {
  const context = useContext(QuizContext)

  if (context === undefined) {
    throw new Error(`Must use sign in context within ${QuizStateProvider}.name`)
  }

  return context
}

export const QuizStateProvider = ({ children }: PropsWithChildren) => {
  const quizState = useProvideQuizState()

  return (
    <QuizContext.Provider value={quizState}>{children}</QuizContext.Provider>
  )
}

const useProvideQuizState = () => {
  console.log('testQuizState')
  const [categoryChoices, setCategoryChoices] = useLocalStorageTest<string[]>(
    'categories-choices',
    []
  )

  const setCategoryChoice = useCallback(
    (category: string, order: number) => {
      setCategoryChoices((previousCategoryChoices) => {
        if (!previousCategoryChoices) {
          return [category]
        }
        const clonedArray = JSON.parse(JSON.stringify(previousCategoryChoices))
        if (!!clonedArray[order - 1]) {
          clonedArray[order - 1] = category
          return clonedArray
        }
        return [...clonedArray, category]
      })
      console.log(category)
    },
    [setCategoryChoices]
  )

  const clearCategoryChoices = useCallback(() => {
    setCategoryChoices([])
  }, [setCategoryChoices])

  return {
    categoryChoices,
    setCategoryChoice,
    clearCategoryChoices,
  }
}
