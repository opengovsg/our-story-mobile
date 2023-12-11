import { type UseRadioProps, useRadio, Box, Text, Flex } from '@chakra-ui/react'

interface RadioCardProps {
  radioProps: UseRadioProps
  option: string
  children?: React.ReactNode
}

export const RadioCard = ({ radioProps, children, option }: RadioCardProps) => {
  const { getInputProps, getRadioProps } = useRadio(radioProps)

  const input = getInputProps()
  const checkbox = getRadioProps()

  const nextButtonStyleChecked = {
    bgColor: '#9E7259',
    borderColor: '#9E7259',
    color: 'white',
  }

  const nextButtonStyle = {
    borderColor: '#9E7259',
  }

  return (
    <Box as="label" width="100%">
      <input {...input} />
      <Flex
        {...checkbox}
        _checked={nextButtonStyleChecked}
        sx={nextButtonStyle}
        _active={nextButtonStyle}
        _focus={nextButtonStyle}
        _hover={nextButtonStyle}
        alignItems="center"
        justifyContent="start"
        cursor="pointer"
        minHeight="80px"
        borderWidth="1px"
        borderRadius="md"
        px={5}
        py={3}
        fontSize="20px"
        fontWeight="semibold"
      >
        {children}
        <Text fontSize="20px" pl="24px">
          {option}
        </Text>
      </Flex>
    </Box>
  )
}
