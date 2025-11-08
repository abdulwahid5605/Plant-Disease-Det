import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  Link as ChakraLink,
  Spacer,
} from "@chakra-ui/react";
import { LuMoon } from "react-icons/lu";

export default function Navbar() {
  return (
    <Box bg="green.800" color="white" px={6} py={4} boxShadow="md">
      <Flex maxW="1200px" mx="auto" alignItems="center">
        {/* Logo / Brand */}
        <Text fontSize="xl" fontWeight="bold">
          PlantApp
        </Text>

         <Flex flex={1} justifyContent="center">
          <HStack gap={12}> 
            <ChakraLink
              href="/"
              color="white"
              fontWeight="medium"
              _hover={{ color: "green.300", transition: "color 0.3s ease" }}
            >
              Home
            </ChakraLink>
            <ChakraLink
              href="/about"
              color="white"
              fontWeight="medium"
              _hover={{ color: "green.300", transition: "color 0.3s ease" }}
            >
              About Us
            </ChakraLink>
            <ChakraLink
              href="/contact"
              color="white"
              fontWeight="medium"
              _hover={{ color: "green.300", transition: "color 0.3s ease" }}
            >
              Contact
            </ChakraLink>
          </HStack>
        </Flex>

        <IconButton
          aria-label="Dark mode icon"
          variant="ghost"
          color="white"
          _hover={{ bg: "green.700", transition: "background 0.3s ease" }}
        >
          <LuMoon />
        </IconButton>
      </Flex>
    </Box>
  );
}
