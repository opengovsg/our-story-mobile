import { publicProcedure, router } from '~/server/trpc'
import { listQuestions } from './question.service'
import { z } from 'zod'

export const questionRouter = router({
  list: publicProcedure.query(async () => {
    return listQuestions()
  }),
  getByOrder: publicProcedure
    .input(z.object({ order: z.number() }))
    .query(async ({ input }) => {
      const question = listQuestions()[input.order - 1]
      return {
        question,
        order: input.order,
        hasNext: !!listQuestions()[input.order],
      }
    }),
})
