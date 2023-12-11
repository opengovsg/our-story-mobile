import { QuizStateProvider } from '~/features/quiz/components/QuizContext'
import { Start } from '~/components/Quiz/Start'

const StartPage = () => {
  return (
    <QuizStateProvider>
      <Start />
    </QuizStateProvider>
  )
}

export default StartPage
