"use client";

import { useState } from "react";
import {
    Box,
    Button,
    VStack,
    Heading,
    Flex,
    Image,
    Accordion,
    Text,
} from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";
import TextInput from "../components/ui/TextInput";
import TextAreaInput from "../components/ui/TextAreaInput";
import data from "../../data.tsx"

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
        <Box>
            <Box py={4} px={8} bg="green.100">
                <Heading textAlign="center" mb={10}>
                    Get in Touch
                </Heading>
                <Flex
                    gap={6}
                    justify="center"
                    wrap="wrap"
                >
                    {[
                        { title: "Email Us", value: "support@plantapp.com" },
                        { title: "Call Us", value: "+92 300 1234567" },
                        { title: "Location", value: "Karachi, Pakistan" },
                        { title: "Location", value: "Karachi, Pakistan" },
                        { title: "Working Hours", value: "Mon – Fri, 9am – 6pm" },
                    ].map((item, i) => (
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
                <Box px={8} py={16}>
                    <Heading textAlign="center" mb={10}>
                        How Can We Help You?
                    </Heading>

                    <Flex gap={6} justify="center" wrap="wrap">
                        {[
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
                        ].map((item, i) => (
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
                <Box textAlign="center" px={8}>
                    <Heading size="md" color="green.800" mb={2}>
                        Fast Response Guarantee
                    </Heading>
                    <Box color="green.700">
                        We usually respond within <b>24 hours</b>.
                    </Box>
                </Box>

            </Box>
            <Flex
                height="100vh"
                bg="gray.50"
                direction={["column", "column", "row"]}
                padding={[4, 16]}
            >
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
