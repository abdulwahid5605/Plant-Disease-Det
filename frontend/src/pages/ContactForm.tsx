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
import TextInput from "../components/ui/TextInput";
import TextAreaInput from "../components/ui/TextAreaInput";

export default function ContactForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const GOOGLE_SHEET_URL: string = "https://script.google.com/macros/s/AKfycbz_BPwMa6IrGYmd8AHjVChTri3kuOvHdGCpjTDgH0cXtDf78qmT6fL0J_RKdQ1SPC34/exec";

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
            padding={[4, 16]}
        >
            {/* LEFT IMAGE */}
            <Box position="relative" flex="1" display={["none", "none", "block"]}                   
            borderTopLeftRadius="lg" borderBottomLeftRadius="lg" overflow="hidden">
                <Image
                    src="/plant-disease-contactus.jpeg"
                    alt="Plant"
                    w="100%"
                    h="100%"
                    objectFit="cover"

                />
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    w="100%"
                    h="100%"
                    bg="linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4))"
                />
            </Box>

            {/* RIGHT FORM */}
            <Flex
                flex="1"
                align="center"
                justify="center"
                boxShadow="0 4px 20px rgba(0,0,0,0.3)"
                borderTopRadius="lg"
                borderBottomRightRadius="lg"
                p={[4, 8]}
            >
                <Box
                    w="90%"
                    maxW="500px"
                    h={["auto", "auto", "100%"]}
                    p={[0, 4]}
                    // borderRadius="lg"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <Heading mb={6} textAlign="center" fontSize="xl">
                        Contact Us
                    </Heading>

                    <VStack gap={4} flex="1">
                        <Box width="100%">
                            <TextInput
                                label="Full Name"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Box>

                        <Box width="100%">
                            <TextInput
                                label="Email Address"
                                placeholder="yourname@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>

                        <Box width="100%">
                            <TextInput
                                label="Subject"
                                placeholder="Topic (optional)"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </Box>

                        <Box width="100%" flex="1">
                            <TextAreaInput
                                label="Message"
                                placeholder="Write your message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                        </Box>

                        <Button
                            width="100%"
                            colorScheme="teal"
                            size="lg"
                            _hover={{ bg: "teal.600" }}
                            onClick={handleSubmit}
                        >
                            Send Message
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        </Flex>
    );
}
