import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Button,
    Icon,
} from "@chakra-ui/react";
import { Accordion } from "@chakra-ui/react";
import data from "../../data.tsx"

export default function AboutUs() {
    // Team members
    const team = [
        { name: "Ali Khan", role: "Founder & CEO", src: "https://ricimelion.pk/cdn/shop/files/AldericThreePieceSuit.webp?v=1737306793" },
        { name: "Sara Ahmed", role: "CTO", src: "https://mogusuit.com/cdn/shop/collections/1530625038127128.png?v=1667976131" },
        { name: "Usman Tariq", role: "Lead Designer", src: "https://m.media-amazon.com/images/I/715Yo+YX5wL._AC_SL1500_.jpg" },
    ];

    return (
        <Box bg="gray.50" >
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
                        Welcome to PlantApp
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

            <Box mb={20} >
                <Box
                    bg="green.100"
                    borderRadius="none"
                    shadow="xl"
                    overflow="hidden"
                >
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        align="stretch"
                    >
                        <Flex
                            flex="1"
                            direction="column"
                            justify="center"
                            p={{ base: 6, md: 12 }}
                        >
                            <Heading mb={4}>
                                Who We Are
                            </Heading>
                            <Text fontSize="lg" color="gray.600" mb={4}>
                                PlantApp is a smart agriculture platform designed to help plant owners,
                                farmers, and gardeners detect plant diseases using AI-powered image
                                analysis.
                            </Text>

                            <Text fontSize="md" color="gray.600">
                                Our platform not only provides instant disease detection results but
                                also connects users with a trusted plant marketplace, educational
                                articles, and a supportive community focused on sustainable plant care.
                            </Text>
                        </Flex>
                        <Box
                            flex="1"
                            minH={{ base: "300px", md: "70vh" }}
                            bgImage="url('/vision.jpg')"
                            bgSize="cover"
                        />
                    </Flex>
                </Box>
            </Box>

            <Box mb={16} px={8}>
                <Heading mb={6} textAlign="center">
                    Our Features
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
                    {data.features.map((feature) => (
                        <Box
                            key={feature.id}
                            p={6}
                            bg="white"
                            borderRadius="md"
                            shadow="md"
                            textAlign="center"
                        >
                            <Icon
                                as={feature.icon}
                                w={10}
                                h={10}
                                color="green.500"
                                mb={4}
                            />
                            <Heading size="md" mb={2}>
                                {feature.title}
                            </Heading>
                            <Text>{feature.description}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>

            <Box mb={16} px={8}>
                <Heading mb={6} textAlign="center">
                    Meet the Team
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} textAlign="center">
                    {team.map((member, idx) => (
                        <Box key={idx} bg="white" borderRadius="md" shadow="md" overflow="hidden">
                            {/* Full Image */}
                            <Box>
                                <img
                                    src={member.src}
                                    alt={member.name}
                                    style={{
                                        width: "100%",
                                        height: "400px",
                                        objectFit: "cover",
                                        objectPosition: "top"
                                    }}
                                />
                            </Box>
                            {/* Name & Role */}
                            <Box p={4}>
                                <Heading size="md" mt={2}>{member.name}</Heading>
                                <Text>{member.role}</Text>
                            </Box>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>

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

            <Box textAlign="center" mb={16}>
                <Heading mb={6} textAlign="center">
                    Ready to Start?
                </Heading>
                <Button colorScheme="green" size="lg">
                    Upload Your Plant Now
                </Button>
            </Box>
        </Box>
    );
}
