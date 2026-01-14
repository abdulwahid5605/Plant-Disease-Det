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
        <VStack align="flex-start" spacing={3} maxW="380px">
          <Image
            src="/plant-logo.png"
            alt="PlantApp Logo"
            height="60px"
          />
          <Text fontSize="sm" color="gray.300">
            Plant Disease Detection System with AI helps you grow smarter 🌱 <br></br>
            Discover plants, read articles, and explore the green marketplace.
 
          </Text>
        </VStack>

        {/* Links */}
        
        <VStack align="flex-start" spacing={2}>
          <Text fontWeight="bold" color="white">
            Explore
          </Text>
          <Link as={RouterLink} to="/" className="nav-link" color="white">Home</Link>
          <Link as={RouterLink} to="/articles" className="nav-link" color="white">Articles</Link>
          <Link as={RouterLink} to="/market-place" className="nav-link" color="white">Market place</Link>
          <Link as={RouterLink} to="/ai-disease" className="nav-link" color="white">AI Disease Tool</Link>

        </VStack>

        {/* Support */}
        <VStack align="flex-start" spacing={2}>
          <Text fontWeight="bold" color="white">
            Support
          </Text>
          <Link as={RouterLink} to="/about" className="nav-link" color="white">About Us</Link>
          <Link as={RouterLink} to="/contact" className="nav-link" color="white">Contact</Link>
          {/* <Link color="white">Privacy Policy</Link>
          <Link color="white">Terms & Conditions</Link> */}
        </VStack>

        {/* Social */}
        <VStack align="flex-start" spacing={6}>
          <Text fontWeight="bold" color="white">
            Follow Us
          </Text>
          <HStack spacing={4}>
            <Link href="#" className="nav-link" isExternal aria-label="Facebook">
              <FaFacebookF />
            </Link>
            <Link href="#" className="nav-link" isExternal aria-label="Instagram">
              <FaInstagram />
            </Link>
            <Link href="#" className="nav-link" isExternal aria-label="Twitter">
              <FaTwitter />
            </Link>
          </HStack>
        </VStack>
      </Flex>


      {/* Bottom Bar */}
      <Box textAlign="center" py={4} fontSize="sm" color="gray.300">
        © {new Date().getFullYear()} Plant Disease Detection System with AI. All rights reserved.
      </Box>
    </Box>
  );
}
