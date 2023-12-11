import { Button, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LetsJalan2Logo from 'public/assets/LetsJalan2_Logo.svg'
import { useQuizContext } from '~/features/quiz/components/QuizContext'

export const Start = () => {
  const router = useRouter()
  const startButtonStyle = {
    bgColor: '#4B2814',
    borderColor: '#4B2814',
  }

  const { clearCategoryChoices } = useQuizContext()

  return (
    <VStack
      px="24px"
      py="24px"
      h="100vh"
      justifyContent="center"
      gap="40px"
      bgColor="#F9F0E3"
    >
      <Image
        src="https://cdn-icons-png.flaticon.com/512/3549/3549492.png"
        alt="map"
        width={150}
        height={150}
      ></Image>
      <Image
        src={LetsJalan2Logo}
        alt="Let's Jalan Jalan logo"
        width={300}
        height={140}
      />
      <Button
        width="200px"
        mt="1rem"
        mb="1rem"
        sx={startButtonStyle}
        _active={startButtonStyle}
        _focus={startButtonStyle}
        _hover={startButtonStyle}
        fontSize="20px"
        fontWeight="semibold"
        onClick={async () => {
          clearCategoryChoices()
          await router.push('/quiz/1')
        }}
      >
        Start
      </Button>
    </VStack>
  )
}
