import { Button, HStack, Image, Link, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useQuizContext } from '~/features/quiz/components/QuizContext'
import { trpc } from '~/utils/trpc'

export const Results = () => {
  const { categoryChoices } = useQuizContext()
  const [results] = trpc.quiz.getResults.useSuspenseQuery({
    categories: categoryChoices ?? [],
  })

  const router = useRouter()

  const retakeButtonStyle = {
    bgColor: '#4B2814',
    borderColor: '#4B2814',
  }

  return (
    <VStack
      px="24px"
      py="24px"
      minH="100vh"
      justifyContent="center"
      gap="20px"
      bgColor="#F9F0E3"
    >
      <Text fontSize="28px" fontWeight={700}>
        Heres a customized itinerary just for you!
      </Text>
      {results.map((result) => {
        return (
          <HStack
            key={result.id}
            w="100%"
            px="20px"
            py="20px"
            h="90px"
            borderRadius="20px"
            borderColor="black"
            borderWidth="1px"
            justifyContent="space-between"
          >
            <Image
              src={result.mediaUrl}
              alt="test"
              width="50px"
              height="50px"
            ></Image>
            <Text fontWeight={500}>{result.description}</Text>
            <Link
              href={getGoogleMapsUrl(result.lat, result.lng)}
              colorScheme="green"
              target="_blank"
            >
              Direction
            </Link>
          </HStack>
        )
      })}
      <Button
        width="200px"
        mt="1rem"
        mb="1rem"
        sx={retakeButtonStyle}
        _active={retakeButtonStyle}
        _focus={retakeButtonStyle}
        _hover={retakeButtonStyle}
        fontSize="20px"
        fontWeight="semibold"
        onClick={async () => {
          await router.push('/quiz/start')
        }}
      >
        Retake quiz
      </Button>
    </VStack>
  )
}

export const getGoogleMapsUrl = (lat: number, lng: number): string => {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
}
