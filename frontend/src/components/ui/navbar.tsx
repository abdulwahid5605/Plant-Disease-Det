import {
  Box,
  Flex,
  HStack,
  Image,
  Avatar,
  Menu,
  Portal,
  Button,
} from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css"
import { logoutUser } from "../../services/auth";
import ConfirmModal from "../modals/ConfirmModal";
import { toaster } from "../ui/toaster";
import { useState } from "react";
export default function Navbar() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await logoutUser(token);
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  };
const confirmLogout = async () => {
  setIsLogoutOpen(false); // 🔥 MODAL ALWAYS CLOSE FIRST

  try {
    const token = localStorage.getItem("token");
    await logoutUser(token);

    toaster.create({
      title: "Logged out",
      description: "You have been logged out successfully.",
      type: "success",
    });

  } catch (error) {
    console.error("Logout failed", error);

    toaster.create({
      title: "Logout failed",
      description: "Something went wrong. You were logged out locally.",
      type: "error",
    });

  } finally {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }
};



  return (
    <Box bg="green.900" color="white" px={6} py={4} boxShadow="md">
      <Flex maxW="1200px" mx="auto" alignItems="center">
        {/* Logo / Brand */}

      <Link to="/">
      <Image
        src="./plant-logo.png"   // put your image in public/logo.png
        alt="PlantApp Logo"
        height="80px"
        objectFit="contain"
        cursor="pointer"
      />
    </Link>


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
              to="/ai-disease"
              className="nav-link"
            >
              AI Disease Tool
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
             <Link
              to="/market-place"
              className="nav-link"
            >
              Market Place
            </Link>
          </HStack>
        </Flex>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="plain">
              <Avatar.Root cursor="pointer" size="sm">
                {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
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

               <Menu.Item
  value="logout"
  color="red.500"
  onClick={() => setIsLogoutOpen(true)}
>
  <LuLogOut /> Logout
</Menu.Item>

              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
      <ConfirmModal
  isOpen={isLogoutOpen}
  title="Confirm Logout"
  message="Are you sure you want to log out of your account?"
  confirmText="Yes, Logout"
  cancelText="Cancel"
  confirmColorScheme="blue"   // 🔥 IMPORTANT LINE
  onClose={() => setIsLogoutOpen(false)}
  onConfirm={confirmLogout}
/>



    </Box>
  );
}
