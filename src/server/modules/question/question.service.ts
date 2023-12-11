import questionJson from './question.json'

export const questionData: QuestionData = questionJson

interface QuestionData {
  questions: QuestionByKey
}

type QuestionByKey = {
  [key: string]: Question
}

export type Question = {
  id: string
  question: string
  choices: Choice[]
}

type Choice = {
  description: string
  category: string
  image: string
}

export const listQuestions = (): Question[] => {
  return Object.values(questionData.questions)
}
