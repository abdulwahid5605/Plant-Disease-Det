import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Link,
  Image,
  Heading,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <Box bg="green.900" color="gray.200" mt={10}>
      {/* Main Footer */}
      <Flex
        maxW="1200px"
        height="300px"
        mx="auto"
        px={6}
        py={10}
        justify="space-between"
        flexWrap="wrap"
        gap={10}
      >
        {/* Brand */}
        <VStack align="flex-start" gap={3} maxW="380px">
          <Image
            src="/plant-logo.png"
            alt="PlantApp Logo"
            height="60px"
          />
          <Text fontSize="sm" color="gray.300">
            Plant Disease Detection System with AI helps you grow smarter 🌱
            <br />
            Discover plants, read articles, and explore the green marketplace.
          </Text>
        </VStack>

        {/* Explore Links */}
        <VStack align="flex-start" gap={2}>
          <Text fontWeight="bold" color="white">
            Explore
          </Text>

          <Link asChild className="nav-link" color="white">
            <RouterLink to="/">Home</RouterLink>
          </Link>

          <Link asChild  className="nav-link" color="white">
            <RouterLink to="/articles">Articles</RouterLink>
          </Link>

          <Link asChild className="nav-link" color="white">
            <RouterLink to="/market-place">Market place</RouterLink>
          </Link>

          <Link asChild className="nav-link" color="white">
            <RouterLink to="/ai-disease">AI Disease Tool</RouterLink>
          </Link>
        </VStack>

        {/* Support */}
        <VStack align="flex-start" gap={2}>
          <Text fontWeight="bold" color="white">
            Support
          </Text>

          <Link asChild className="nav-link" color="white">
            <RouterLink to="/about">About Us</RouterLink>
          </Link>

          <Link asChild className="nav-link" color="white">
            <RouterLink to="/contact">Contact</RouterLink>
          </Link>
        </VStack>

        {/* Social */}
        <VStack align="flex-start" gap={6}>
          <Text fontWeight="bold" color="white">
            Follow Us
          </Text>

          <HStack gap={4}>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="nav-link"
            >
              <FaFacebookF />
            </Link>

            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="nav-link"
            >
              <FaInstagram />
            </Link>

            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="nav-link"
            >
              <FaTwitter />
            </Link>
          </HStack>
        </VStack>
      </Flex>

      {/* Bottom Bar */}
      <Box textAlign="center" py={4} fontSize="sm" color="gray.300">
        © {new Date().getFullYear()} Plant Disease Detection System with AI. All
        rights reserved.
      </Box>
    </Box>
  );
}
