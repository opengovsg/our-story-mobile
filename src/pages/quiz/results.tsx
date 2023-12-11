import { QuizStateProvider } from '~/features/quiz/components/QuizContext'
import { Results } from '~/components/Quiz/Results'

const ResultsPage = () => {
  return (
    <QuizStateProvider>
      <Results />
    </QuizStateProvider>
  )
}

export default ResultsPage
