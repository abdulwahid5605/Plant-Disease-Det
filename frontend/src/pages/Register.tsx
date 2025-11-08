import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";

export default function Register() {
  return (
    <Box
      maxW="md"
      mx="auto"
      mt={20}
      p={8}
      borderRadius="lg"
      boxShadow="base"
      shadow="xl"
    >
      <Heading mb={6} textAlign="center" fontWeight="semibold">
        Create Account
      </Heading>

      <VStack gap={5}>
        {/* Email */}
        <Box width="100%">
          <Text mb={1} fontSize="sm">
            Email Address
          </Text>
          <Input type="email" placeholder="yourname@example.com" />
        </Box>

        {/* Password */}
        <Box width="100%">
          <Text mb={1} fontSize="sm">
            Password
          </Text>
          <Input type="password" placeholder="Enter password" />
        </Box>

        {/* Submit Button */}
        <Button width="100%" colorScheme="teal">
          Register
        </Button>
      </VStack>
    </Box>
  );
}
