import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Accordion,
} from "@chakra-ui/react";
import data from "../../../data";

const FAQSection = () => {
  return (
    <Box my={16} px={8}>
      <Heading mb={6} textAlign="center">
        Frequently Asked Questions
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }}
        gap={8}
        borderRadius="md"
        shadow="xl"
        p={8}
        bg="white"
      >
        {/* FAQ */}
        <Box flex={1}>
          <Accordion.Root collapsible defaultValue={["b"]}>
            {data.faqItems.map((item, idx) => (
              <Accordion.Item key={idx} value={item.value}>
                <Accordion.ItemTrigger>
                  <Flex
                    w="100%"
                    p={4}
                    bg="green.50"
                    borderRadius="md"
                    justify="space-between"
                    align="center"
                    cursor="pointer"
                    _hover={{ bg: "green.100" }}
                    transition="all 0.2s"
                  >
                    <Text fontWeight="semibold" color="green.900">
                      {item.title}
                    </Text>
                    <Accordion.ItemIndicator />
                  </Flex>
                </Accordion.ItemTrigger>

                <Accordion.ItemContent>
                  <Box
                    p={4}
                    mt={2}
                    bg="green.50"
                    borderRadius="md"
                    shadow="sm"
                  >
                    {item.text}
                  </Box>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Box>

        {/* Side Help */}
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg="green.100"
            borderRadius="xl"
            p={6}
            textAlign="center"
            shadow="lg"
            maxW="400px"
          >
            <Heading size="md" mb={4} color="green.900">
              Need More Help?
            </Heading>
            <Text mb={4}>
              Explore our tutorials, guides, and community forum.
            </Text>
            <Button colorScheme="green">
              Go to Resources
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default FAQSection;
