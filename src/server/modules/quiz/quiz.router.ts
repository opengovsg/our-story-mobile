import { publicProcedure, router } from '~/server/trpc'
import { z } from 'zod'
import { type Place } from '@prisma/client'

export const quizRouter = router({
  getResults: publicProcedure
    .input(z.object({ categories: z.array(z.string()) }))
    .query(async ({ input, ctx }) => {
      const topTwoCategories = findTopTwoCategories(input.categories)

      // randomly get 2 places each category
      const firstCategoryPlaces = await ctx.prisma.place.findMany({
        where: {
          category: {
            name: topTwoCategories[0],
          },
        },
      })

      const secondCategoryPlaces = await ctx.prisma.place.findMany({
        where: {
          category: {
            name: topTwoCategories[1],
          },
        },
      })

      return [
        ...getRandomPlaces(firstCategoryPlaces, 2),
        ...getRandomPlaces(secondCategoryPlaces, 2),
      ]
    }),
})

const findTopTwoCategories = (categories: string[]) => {
  // Create an object to store the count of each category
  const categoryCount = new Map<string, number>()

  categories.forEach((category) => {
    categoryCount.set(category, (categoryCount.get(category) || 0) + 1)
  })

  const countArray = Array.from(categoryCount.entries())

  // Sort the array based on count in descending order
  countArray.sort((a, b) => b[1] - a[1])

  // Extract the top two categories
  const topTwoCategories = countArray.slice(0, 2).map((entry) => entry[0])

  return topTwoCategories
}

const getRandomPlaces = (arr: Place[], count: number) => {
  const shuffledArray = arr.slice().sort(() => Math.random() - 0.5)
  return shuffledArray.slice(0, count)
}
