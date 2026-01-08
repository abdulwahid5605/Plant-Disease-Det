import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface SocialConnectProps {
  heading?: string;
  subtitle?: string;
  platforms?: string[];
}

const SocialConnect = ({
  heading = "Connect With Us",
  subtitle = "Follow us on social media for updates and tips",
  platforms = ["Facebook", "Instagram", "LinkedIn"],
}: SocialConnectProps) => {
  return (
    <Box mb={16} textAlign="center">
      <Heading mb={4}>{heading}</Heading>

      <Text color="gray.600" mb={6}>
        {subtitle}
      </Text>

      <Flex justify="center" gap={6} wrap="wrap">
        {platforms.map((platform) => (
          <Box
            key={platform}
            px={6}
            py={3}
            border="1px solid"
            borderColor="green.200"
            borderRadius="full"
            cursor="pointer"
            fontWeight="medium"
            _hover={{ bg: "green.50" }}
            transition="all 0.2s"
          >
            {platform}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default SocialConnect;
