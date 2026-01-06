import {
    Box,
    Button,
    SimpleGrid,
    Heading,
    Image,
    Text,
    VStack,
    Input,
    Textarea,
    Dialog,
    Portal,
    CloseButton,
    Accordion,
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import data from "../../data";

const MarketPlace = () => {
    const [posts, setPosts] = useState(data.marketplacePosts);

    const [form, setForm] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
    });

    const handleAddPost = () => {
        if (!form.title || !form.price) return;

        setPosts([
            {
                id: Date.now().toString(),
                title: form.title,
                price: Number(form.price),
                image: form.image,
                description: form.description,
            },
            ...posts,
        ]);

        setForm({ title: "", price: "", image: "", description: "" });
    };

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
           <Flex
    alignItems="center"
    justify="space-between"
    mb={10}
    mx={10}

>
    <Text>Total Post</Text>

    <Heading >Market Place</Heading>

    <Dialog.Root>
        <Dialog.Trigger asChild>
            <Button colorScheme="green">
                + Add Post
            </Button>
        </Dialog.Trigger>

        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Sell a Plant</Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                        <VStack gap={4}>
                            <Input
                                placeholder="Plant Name"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                            />
                            <Input
                                placeholder="Price"
                                type="number"
                                value={form.price}
                                onChange={(e) =>
                                    setForm({ ...form, price: e.target.value })
                                }
                            />
                            <Input
                                placeholder="Image URL"
                                value={form.image}
                                onChange={(e) =>
                                    setForm({ ...form, image: e.target.value })
                                }
                            />
                            <Textarea
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                            />
                        </VStack>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </Dialog.ActionTrigger>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mt={6}>
                {posts.map((post) => (
                    <Box
                        key={post.id}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="md"
                        _hover={{ transform: "translateY(-4px)", transition: "0.3s" }}
                    >
                        <Image
                            src={post.image}
                            alt={post.title}
                            h="200px"
                            w="100%"
                            objectFit="cover"
                        />

                        <VStack align="start" p={4} gap={2}>
                            <Text fontWeight="bold">{post.title}</Text>
                            <Text color="green.600" fontWeight="semibold">
                                Rs {post.price}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                                {post.description}
                            </Text>
                        </VStack>
                    </Box>
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
};

export default MarketPlace;
