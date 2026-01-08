import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const InfoSection = ({
  heading,
  description,
  image,
  bgColor = "green.100",
}) => {
  return (
    <Box mb={20}>
      <Box
        bg={bgColor}
        borderRadius="none"
        shadow="xl"
        overflow="hidden"
      >
        <Flex direction={{ base: "column", md: "row" }} align="stretch">
          {/* Text Section */}
          <Flex
            flex="1"
            direction="column"
            justify="center"
            p={{ base: 12, md: 24 }}
          >
            <Heading mb={8}>{heading}</Heading>
            <Text fontSize="lg" color="gray.600" mb={8}>
              {description}
            </Text>
          </Flex>

          {/* Image Section */}
          <Box
            flex="1"
            minH={{ base: "300px", md: "70vh" }}
            bgImage={`url('${image}')`}
            bgSize="cover"
            bgPosition="center"
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default InfoSection;
