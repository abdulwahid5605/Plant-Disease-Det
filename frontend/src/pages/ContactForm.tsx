"use client";

import { useState } from "react";
import {
    Box,
    Button,
    Input,
    Textarea,
    VStack,
    Heading,
    Text,
    Flex,
    Image,
} from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";

export default function ContactForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const GOOGLE_SHEET_URL: string = "PASTE_YOUR_GOOGLE_WEB_APP_URL_HERE";

    const handleSubmit = async () => {
        if (!name || !email || !message) {
            toaster.create({
                title: "Missing Fields",
                description: "Name, Email, aur Message required hain.",
                type: "warning",
            });
            return;
        }

        const toastId = toaster.create({
            title: "Sending Message...",
            type: "loading",
        });

        try {
            await fetch(GOOGLE_SHEET_URL, {
                method: "POST",
                body: JSON.stringify({ name, email, subject, message }),
            });

            toaster.update(toastId, {
                title: "Message Sent",
                description: "Hum nay aap ka message receive kar liya hai.",
                type: "success",
            });

            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        } catch (error) {
            toaster.update(toastId, {
                title: "Failed",
                description: "Message send nahi hua. Try again.",
                type: "error",
            });
        }
    };

    return (
        <Flex
            height="100vh"
            bg="gray.50"
            direction={["column", "column", "row"]}
            padding={10}
        >
            {/* LEFT IMAGE */}
            <Box flex="1" display={["none", "none", "block"]}>
                <Image
                    src="/contact-form.jpg"
                    alt="Plant"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                />
            </Box>

            {/* RIGHT FORM */}
            <Flex
                flex="1"
                align="center"
                justify="center"
                bg="white"
                boxShadow={["none", "none", "lg"]}
            >
                <Box
                    w="90%"
                    maxW="500px"
                    h={["auto", "auto", "100%"]} 
                    p={6}
                    borderRadius="lg"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <Heading mb={6} textAlign="center" fontSize="xl">
                        Contact Us
                    </Heading>

                    <VStack gap={4} flex="1">
                        <Box width="100%">
                            <Text mb={1} fontSize="sm">
                                Full Name
                            </Text>
                            <Input
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Box>

                        <Box width="100%">
                            <Text mb={1} fontSize="sm">
                                Email Address
                            </Text>
                            <Input
                                type="email"
                                placeholder="yourname@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>

                        <Box width="100%">
                            <Text mb={1} fontSize="sm">
                                Subject
                            </Text>
                            <Input
                                placeholder="Topic (optional)"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </Box>

                        <Box width="100%" flex="1">
                            <Text mb={1} fontSize="sm">
                                Message
                            </Text>
                            <Textarea
                                placeholder="Write your message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                h="100%" 
                            />
                        </Box>

                        <Button width="100%" colorScheme="teal" onClick={handleSubmit}>
                            Send Message
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        </Flex>
    );
}
