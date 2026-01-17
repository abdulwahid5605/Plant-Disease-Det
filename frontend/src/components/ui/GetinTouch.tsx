import { Box, Heading, Flex } from "@chakra-ui/react";

const GetinTouch = () => {
  const contactInfo = [
    { title: "Email Us", value: "support@plantapp.com" },
    { title: "Call Us", value: "+92 300 1234567" },
    { title: "Location", value: "Karachi, Pakistan" },
    { title: "Working Hours", value: "Mon – Fri, 9am – 6pm" },
  ];

  const helpItems = [
    {
      title: "Technical Support",
      desc: "Facing issues with login, OTP, or uploads?",
    },
    {
      title: "Marketplace Help",
      desc: "Questions about buying or selling plants?",
    },
    {
      title: "AI Detection Queries",
      desc: "Need help understanding disease results?",
    },
  ];

  return (
    <Box py={8} px={8} bg="green.100">
      {/* Heading */}
      <Heading textAlign="center" fontSize="2xl" m={4}>
        Get in Touch
      </Heading>

      {/* Contact Info */}
      <Flex gap={6} justify="center" wrap="wrap">
        {contactInfo.map((item, i) => (
          <Box
            key={i}
            bg="#F0FDF4"
            border="1px solid"
            borderColor="green.100"
            borderRadius="lg"
            p={6}
            w={{ base: "100%", md: "220px" }}
            textAlign="center"
            shadow="md"
          >
            <Heading size="sm" mb={2} color="green.700">
              {item.title}
            </Heading>
            <Box fontSize="sm" color="gray.600">
              {item.value}
            </Box>
          </Box>
        ))}
      </Flex>

      {/* Help Section */}
      <Box px={8} py={16}>
        <Heading textAlign="center" fontSize="2xl" m={4}>
          How Can We Help You?
        </Heading>

        <Flex gap={6} justify="center" wrap="wrap">
          {helpItems.map((item, i) => (
            <Box
              key={i}
              bg="white"
              borderRadius="lg"
              shadow="md"
              p={6}
              maxW="320px"
              textAlign="center"
              _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
              transition="all 0.2s"
            >
              <Heading size="sm" mb={3} color="green.700">
                {item.title}
              </Heading>
              <Box fontSize="sm" color="gray.600">
                {item.desc}
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Response */}
      <Box textAlign="center" px={8}>
        <Heading size="md" color="green.800" mb={2}>
          Fast Response Guarantee
        </Heading>
        <Box color="green.700">
          We usually respond within <b>24 hours</b>.
        </Box>
      </Box>
    </Box>
  );
};

export default GetinTouch;
