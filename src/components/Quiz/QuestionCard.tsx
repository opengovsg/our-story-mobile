import { Button, Image, Text, VStack, useRadioGroup } from '@chakra-ui/react'
import { useState } from 'react'
import { RadioCard } from './RadioCard'
import { type Question } from '~/server/modules/question/question.service'
import { useRouter } from 'next/router'
import { useQuizContext } from '~/features/quiz/components/QuizContext'

interface QuestionCardProps {
  question: Question
  order: number
  hasNext: boolean
}

export const QuestionCard = ({
  question,
  order,
  hasNext,
}: QuestionCardProps) => {
  const nextButtonStyle = {
    bgColor: '#4B2814',
    borderColor: '#4B2814',
  }

  const { setCategoryChoice } = useQuizContext()

  const [selected, setSelected] = useState<string>()

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'question',
    onChange: (value) => {
      setSelected(value)
    },
  })

  const router = useRouter()

  const group = getRootProps()

  return (
    <VStack
      width="100%"
      pl="24px"
      pr="24px"
      pt="24px"
      h="100vh"
      justifyContent="center"
      gap="40px"
      bgColor="#F9F0E3"
    >
      <Text fontSize="28px" fontWeight="bold">
        {question.question}
      </Text>
      <VStack {...group} w="100%">
        {question.choices?.map((value, index) => {
          const radio = getRadioProps({ value: value.category })
          return (
            <RadioCard
              key={index}
              radioProps={{ ...radio }}
              option={value.description}
            >
              <Image src={value.image} alt="image" w="30px" h="30px"></Image>
            </RadioCard>
          )
        })}
      </VStack>
      <Button
        width="200px"
        mt="1rem"
        mb="1rem"
        sx={nextButtonStyle}
        _active={nextButtonStyle}
        _focus={nextButtonStyle}
        _hover={nextButtonStyle}
        fontSize="20px"
        fontWeight="semibold"
        isDisabled={!selected}
        // isLoading={submit.isLoading}
        onClick={async () => {
          // save answer
          setCategoryChoice(selected ?? '', order)
          if (hasNext) {
            await router.push(`/quiz/${order + 1}`)
          } else {
            // handle submit
            await router.push(`/quiz/results`)
          }
        }}
      >
        {hasNext ? 'Next' : 'Submit'}
      </Button>
    </VStack>
  )
}
