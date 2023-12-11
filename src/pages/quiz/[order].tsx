import { useRouter } from 'next/router'
import { trpc } from '~/utils/trpc'
import { QuestionCard } from '~/components/Quiz/QuestionCard'
import { QuizStateProvider } from '~/features/quiz/components/QuizContext'

const QuestionPage = () => {
  const router = useRouter()
  const order = router.query.order

  const [question] = trpc.question.getByOrder.useSuspenseQuery({
    order: Number(order),
  })

  if (!question.question) {
    return <></>
  }

  return (
    <QuizStateProvider>
      <QuestionCard
        key={question.question.id}
        question={question.question}
        hasNext={question.hasNext}
        order={question.order}
      />
    </QuizStateProvider>
  )
}

export default QuestionPage
