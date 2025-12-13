import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Button,
    Icon,
    Span,
} from "@chakra-ui/react";
import { LuLeaf, LuUsers, LuBook, LuPhone } from "react-icons/lu";
import { Accordion, Avatar } from "@chakra-ui/react";
import { GiWaterDrop } from "react-icons/gi";
import { MdHistoryEdu } from "react-icons/md";
import { FaHeart, FaUsers } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiBookLine } from "react-icons/ri";
import { BiBookContent } from "react-icons/bi"

export default function AboutUs() {
    // FAQ items
    const faqItems = [
        {
            value: "a",
            title: "How accurate is the AI disease detection?",
            text: "Our AI model provides high-accuracy results with detailed information about plant diseases.",
        },
        {
            value: "b",
            title: "How do I post a plant in the marketplace?",
            text: "Simply login, go to the marketplace section, click 'Add Plant', and fill in the details.",
        },
        {
            value: "c",
            title: "Can I contact the seller directly?",
            text: "Yes, you can see the seller's contact information and reach them directly through the app.",
        },
    ];

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

            <Box mb={16} px={8}>
                <Heading mb={6} textAlign="center">
                    Our Features
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
                    <Box p={6} bg="white" borderRadius="md" shadow="md" textAlign="center">
                        <Icon as={LuLeaf} w={10} h={10} color="green.500" mb={4} />
                        <Heading size="md" mb={2}>AI Disease Detection</Heading>
                        <Text>Upload a plant image and get instant disease detection results.</Text>
                    </Box>
                    <Box p={6} bg="white" borderRadius="md" shadow="md" textAlign="center">
                        <Icon as={LuUsers} w={10} h={10} color="green.500" mb={4} />
                        <Heading size="md" mb={2}>Marketplace</Heading>
                        <Text>Buy and sell plants, contact sellers directly, and explore listings.</Text>
                    </Box>
                    <Box p={6} bg="white" borderRadius="md" shadow="md" textAlign="center">
                        <Icon as={LuBook} w={10} h={10} color="green.500" mb={4} />
                        <Heading size="md" mb={2}>Articles</Heading>
                        <Text>Read articles about plant care, disease prevention, and tips.</Text>
                    </Box>
                    <Box p={6} bg="white" borderRadius="md" shadow="md" textAlign="center">
                        <Icon as={LuPhone} w={10} h={10} color="green.500" mb={4} />
                        <Heading size="md" mb={2}>Contact Us</Heading>
                        <Text>Reach out to us through the contact form for support or inquiries.</Text>
                    </Box>
                    <Box p={6} bg="white" borderRadius="md" shadow="md" textAlign="center">
                        <Icon as={GiWaterDrop} w={10} h={10} color="green.500" mb={4} />
                        <Heading size="md" mb={2}>Plant Care Tips</Heading>
                        <Text>Get daily guidance on watering, sunlight, and soil requirements for different plants.</Text>
                    </Box>

                    <Box p={6} bg="white" borderRadius="md" shadow="md" textAlign="center">
                        <Icon as={MdHistoryEdu} w={10} h={10} color="green.500" mb={4} />
                        <Heading size="md" mb={2}>Disease History</Heading>
                        <Text>Track the health of your plants over time and view past disease detections.</Text>
                    </Box>

                    <Box p={6} bg="white" borderRadius="md" shadow="md" textAlign="center">
                        <Icon as={FaHeart} w={10} h={10} color="green.500" mb={4} />
                        <Heading size="md" mb={2}>Marketplace Favorites</Heading>
                        <Text>Save listings of plants you like for easy access and faster transactions later.</Text>
                    </Box>

                    <Box p={6} bg="white" borderRadius="md" shadow="md" textAlign="center">
                        <Icon as={IoNotificationsOutline} w={10} h={10} color="green.500" mb={4} />
                        <Heading size="md" mb={2}>Notifications</Heading>
                        <Text>Receive alerts for messages, new listings, and important updates in the app.</Text>
                    </Box>

                    <Box p={6} bg="white" borderRadius="md" shadow="md" textAlign="center">
                        <Icon as={LuLeaf} w={10} h={10} color="green.500" mb={4} />
                        <Heading size="md" mb={2}>AI Suggestions</Heading>
                        <Text>Get recommended plants based on your garden type, climate, and preferences.</Text>
                    </Box>

                    <Box p={6} bg="white" borderRadius="md" shadow="md" textAlign="center">
                        <Icon as={FaUsers} w={10} h={10} color="green.500" mb={4} />
                        <Heading size="md" mb={2}>Community Forum</Heading>
                        <Text>Discuss plant care issues, ask questions, and share experiences with other users.</Text>
                    </Box>

                    <Box p={6} bg="white" borderRadius="md" shadow="md" textAlign="center">
                        <Icon as={RiBookLine} w={10} h={10} color="green.500" mb={4} />
                        <Heading size="md" mb={2}>Plant Journal</Heading>
                        <Text>Maintain a log for each plant: watering, growth, fertilization, and disease treatments.</Text>
                    </Box>

                    <Box p={6} bg="white" borderRadius="md" shadow="md" textAlign="center">
                        <Icon as={BiBookContent} w={10} h={10} color="green.500" mb={4} />
                        <Heading size="md" mb={2}>Tutorials & Guides</Heading>
                        <Text>Follow step-by-step guides for planting, disease management, and seasonal care tips.</Text>
                    </Box>
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
                            {faqItems.map((item, idx) => (
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
