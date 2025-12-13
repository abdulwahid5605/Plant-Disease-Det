import {
  Box,
  Flex,
  HStack,
  Text,
  Link as ChakraLink,
  Avatar,
  Menu,
  Portal,
  Button,
} from "@chakra-ui/react";
import { LuMoon, LuSun, LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css"


export default function Navbar() {
  return (
    <Box bg="green.900" color="white" px={6} py={4} boxShadow="md">
      <Flex maxW="1200px" mx="auto" alignItems="center">
        {/* Logo / Brand */}
        <Text fontSize="xl" fontWeight="bold">
          PlantApp
        </Text>

        <Flex flex={1} justifyContent="center">
          <HStack gap={12}>
            <Link
              to="/"
              className="nav-link"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="nav-link"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="nav-link"
            >
              Contact
            </Link>
            <Link
              to="/articles"
              className="nav-link"
            >
              Articles
            </Link>
          </HStack>
        </Flex>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="plain">
              <Avatar.Root cursor="pointer" size="sm">
                <Avatar.Image src="https://bit.ly/sage-adebayo" />
                <Avatar.Fallback name="User" />
              </Avatar.Root>
            </Button>

          </Menu.Trigger>

          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {/* <Menu.Item
                  value="theme"
                  onClick={toggleColorMode}
                >
                  {colorMode === "light" ? (
                    <>
                      <LuMoon /> Dark Mode
                    </>
                  ) : (
                    <>
                      <LuSun /> Light Mode
                    </>
                  )}
                </Menu.Item> */}

                <Menu.Item value="logout" color="red.500">
                  <LuLogOut /> Logout
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>


      </Flex>
    </Box>
  );
}
