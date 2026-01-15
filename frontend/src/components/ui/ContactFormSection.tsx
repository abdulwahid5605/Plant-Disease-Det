"use client";

import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  Flex,
  Image,
} from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import TextInput from "../ui/TextInput";
import TextAreaInput from "../ui/TextAreaInput";

interface ContactFormSectionProps {
  image?: string;
  title?: string;
}

export default function ContactFormSection({
  image = "/plant-disease-contactus.jpeg",
  title = "Contact Us",
}: ContactFormSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [number , setNumber] = useState("");
  const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbz_BPwMa6IrGYmd8AHjVChTri3kuOvHdGCpjTDgH0cXtDf78qmT6fL0J_RKdQ1SPC34/exec";

  const handleSubmit = async () => {
    if (!name || !email || !message || !number) {
      toaster.create({
        title: "Missing Fields",
        description: "Name, Email aur Message are required.",
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
        description: "We recieved your message",
        type: "success",
      });

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setNumber("");

    } catch (error) {
      toaster.update(toastId, {
        title: "Failed",
        description: "Message can not send. Try again.",
        type: "error",
      });
    }
  };

  return (
    <Flex
      height="100vh"
      bg="gray.50"
      direction={{ base: "column", md: "row" }}
      p={{ base: 4, md: 16 }}
    >
      {/* LEFT IMAGE */}
      <Box
        flex="1"
        display={{ base: "none", md: "block" }}
        borderTopLeftRadius="lg"
        borderBottomLeftRadius="lg"
        overflow="hidden"
        position="relative"
      >
        <Image src={image} alt="Contact" w="100%" h="100%" objectFit="cover" />
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4))"
        />
      </Box>

      {/* FORM */}
      <Flex
        flex="1"
        align="center"
        justify="center"
        boxShadow="lg"
        borderRadius="lg"
        p={{ base: 4, md: 8 }}
        bg="white"
      >
        <Box w="100%" maxW="500px">
          <Heading mb={6} textAlign="center" fontSize="xl">
            {title}
          </Heading>

          <VStack gap={4}>
            <TextInput
              label="Full Name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

             <TextInput
              label="Phone Number"
              placeholder="Your Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)} // ✅ FIX
            />

            <TextInput
              label="Email Address"
              placeholder="yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
              label="Subject"
              placeholder="Topic (optional)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <TextAreaInput
              label="Message"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

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
