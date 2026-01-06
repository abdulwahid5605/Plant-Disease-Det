import {
    Box,
    Heading,
    SimpleGrid,
    Image,
    Card,
    Button,
    Flex,
    Text,
    Accordion
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import data from "../../data.tsx"


export default function ArticlesPage() {
    return (
        <Box >
            <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            h="80vh"
                            w="100%"
                            bgImage="url('/plant_disease_2.jpeg')"
                            bgSize="cover"
                            bgRepeat="no-repeat"
                            css={{ clipPath: "polygon(0 0, 100% 0, 100% 56%, 0% 100%)" }}
                            // mb={20}
                        >
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                w="100%"
                                h="100%"
                                bg="rgba(0, 0, 0, 0.5)"
                                zIndex={0}
                            />
            
                            <Flex direction="column" align="center" justify="center" textAlign="center" color="white" zIndex={1} px={4}>
                                <Heading size="3xl" mb={4}>
                                    Welcome to Plant Disease Detection System With AI
                                </Heading>
                                <Text fontSize="xl" mb={6}>
                                    Detect plant diseases instantly and connect with the marketplace
                                    community to buy and sell plants easily.
                                </Text>
                                <Button
                                    onClick={() =>
                                        window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
                                    }
                                    colorScheme="green"
                                    size="lg"
                                    display="flex"
                                    alignItems="center"
                                    gap={3}
                                    _focus={{ boxShadow: "none" }}
                                >
                                    <Text fontWeight="bold">Scroll Down</Text>
                                    <Box as="span" display="flex" alignItems="center" justifyContent="center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="7" y="2" width="10" height="20" rx="5" ry="5" />
                                            <line x1="12" y1="6" x2="12" y2="10" />
                                        </svg>
                                    </Box>
                                </Button>
                            </Flex>
                        </Flex>
            <Heading mb={6} textAlign="center">
                Latest Articles
            </Heading>

            <SimpleGrid mb={12} columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
                {data.articles.map((article) => (
                    <Card.Root key={article.id} boxShadow="md" _hover={{ boxShadow: "xl" }}>
                        <Image
                            src={article.image}
                            alt={article.title}
                            height="180px"
                            w="100%"
                            objectFit="cover"
                        />

                        <Card.Body gap={3}>
                            <Card.Title>{article.title}</Card.Title>
                            <Card.Description>{article.excerpt}</Card.Description>

                            <Link to={`/articles/${article.id}`}>
                                <Button
                                    variant="solid"
                                    colorScheme="green"
                                    w="fit-content"
                                    mt={2}
                                >
                                    Read More
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card.Root>
                ))}
            </SimpleGrid>
             <Box mb={16} px={8}>
                            <Heading mb={6} textAlign="center">
                                Frequently Asked Questions
                            </Heading>
            
                            <Flex direction={{ base: "column", md: "row" }} gap={8} borderRadius="md" shadow="xl" p={8} bg="white">
                                <Box flex={1}>
                                    <Accordion.Root collapsible defaultValue={["b"]} gap={4}>
                                        {data.faqItems.map((item, idx) => (
                                            <Accordion.Item key={idx} value={item.value}>
                                                <Accordion.ItemTrigger>
                                                    <Accordion.ItemTrigger>
                                                        <Flex
                                                            p={4}
                                                            bg="green.50"
                                                            borderRadius="md"
                                                            shadow="sm"
                                                            cursor="pointer"
                                                            _hover={{ shadow: "md", bg: "green.100" }}
                                                            transition="all 0.2s"
                                                            minW="100%"
                                                            justify="space-between"
                                                        >
                                                            <Text fontWeight="semibold" color="green.900">
                                                                {item.title}
                                                            </Text>
                                                            <Accordion.ItemIndicator />
                                                        </Flex>
                                                    </Accordion.ItemTrigger>
            
                                                </Accordion.ItemTrigger>
            
                                                <Accordion.ItemContent>
                                                    <Accordion.ItemBody>
                                                        <Box p={4} mt={2} bg="green.50" borderRadius="md" shadow="sm">
                                                            {item.text}
                                                        </Box>
                                                    </Accordion.ItemBody>
                                                </Accordion.ItemContent>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion.Root>
                                </Box>
            
                                <Box flex={1} display="flex" alignItems="center" justifyContent="center">
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
                                            Explore our tutorials, guides, and community forum to learn more about plant care and disease management.
                                        </Text>
                                        <Button colorScheme="green">Go to Resources</Button>
                                    </Box>
                                </Box>
                            </Flex>
                        </Box>
                        <Box mb={16} textAlign="center">
                            <Heading mb={4}>Connect With Us</Heading>
                            <Box color="gray.600" mb={6}>
                                Follow us on social media for updates and tips
                            </Box>
            
                            <Flex justify="center" gap={6}>
                                {["Facebook", "Instagram", "LinkedIn"].map((platform) => (
                                    <Box
                                        key={platform}
                                        px={6}
                                        py={3}
                                        border="1px solid"
                                        borderColor="green.200"
                                        borderRadius="full"
                                        cursor="pointer"
                                        _hover={{ bg: "green.50" }}
                                    >
                                        {platform}
                                    </Box>
                                ))}
                            </Flex>
                        </Box>
        </Box>
    );
}
