"use client";

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
        <Box px={6} py={6}>
            <Heading textAlign="center" mb={10}>Market Place</Heading>

            <Dialog.Root>
                {/* Floating Button */}
                <Dialog.Trigger asChild>
                    <Button
                        colorScheme="green"
                        position="fixed"
                        top="100px"
                        right="30px"
                        zIndex={1000}
                    >
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

                                <Dialog.ActionTrigger asChild>
                                    <Button colorScheme="green" onClick={handleAddPost}>
                                        Post
                                    </Button>
                                </Dialog.ActionTrigger>
                            </Dialog.Footer>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>

            {/* ---------------- ALL POSTS GRID ---------------- */}
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
        </Box>
    );
};

export default MarketPlace;
