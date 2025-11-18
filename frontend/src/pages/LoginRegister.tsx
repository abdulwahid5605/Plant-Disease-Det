"use client";

import { useState } from "react";
import { Box, Button, Input, VStack, Heading, Text, Link, Tabs, Center } from "@chakra-ui/react";
import { registerUser, loginUser, verifyOtp } from "../services/auth";
import { toaster } from "../components/ui/toaster";

export default function AuthPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpStep, setIsOtpStep] = useState(false);

  const handleRegister = async () => {
    if (!registerEmail || !registerPassword) {
      toaster.create({
        title: "Missing Fields",
        description: "Please enter both email and password.",
        type: "warning",
      });
      return;
    }

    const toastId = toaster.create({
      title: "Registering...",
      type: "loading",
    });

    try {
      await registerUser({ email: registerEmail, password: registerPassword });
      toaster.update(toastId, {
        title: "Registration Successful",
        description: "Your account has been created. Please login.",
        type: "success",
      });
    } catch (error: any) {
      toaster.update(toastId, {
        title: "Registration Failed",
        description: error?.response?.data?.message || "Something went wrong.",
        type: "error",
      });
    }
  };

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      toaster.create({
        title: "Missing Fields",
        description: "Please enter both email and password.",
        type: "warning",
      });
      return;
    }

    const toastId = toaster.create({ title: "Logging in...", type: "loading" });

    try {
      const response = await loginUser({
        email: loginEmail,
        password: loginPassword,
      });

      toaster.update(toastId, {
        title: "Login Successful",
        description: "Redirecting to dashboard...",
        type: "success",
      });

      setIsOtpStep(true);

      toaster.update(toastId, {
        title: "OTP Sent",
        description: "Check your email for the OTP.",
        type: "success",
      });
    } catch (error: any) {
      toaster.update(toastId, {
        title: "Login Failed",
        description: error?.response?.data?.message || "Invalid credentials.",
        type: "error",
      });
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toaster.create({ title: "Missing OTP", description: "Please enter OTP.", type: "warning" });
      return;
    }

    const toastId = toaster.create({ title: "Verifying OTP...", type: "loading" });

    try {
      const response = await verifyOtp(loginEmail, otp);
      localStorage.setItem("token", response.access_token);
      toaster.update(toastId, { title: "Login Successful", description: "Redirecting...", type: "success" });
      window.location.href = "/dashboard";
    } catch (error: any) {
      toaster.update(toastId, { title: "Invalid OTP", description: error?.response?.data?.message || "OTP incorrect.", type: "error" });
    }
  };
  return (
    <Center minH="80vh" bg="gray.50" p={4}>
      <Box
        w={["90%", "400px"]} // Responsive width: mobile 90%, desktop 400px
        p={6} // Padding thoda kam kiya
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <Tabs.Root defaultValue="login" colorScheme="teal">
          <Center>
            <Tabs.List mb={6} justifyContent="center">
              <Tabs.Trigger value="login">Login</Tabs.Trigger>
              <Tabs.Trigger value="register">Sign Up</Tabs.Trigger>
            </Tabs.List>
          </Center>

          {/* LOGIN TAB */}
          <Tabs.Content value="login">
            {!isOtpStep ? (
              <>
                <Heading
                  mb={6}
                  textAlign="center"
                  fontWeight="semibold"
                  fontSize="xl"
                >
                  Welcome Back
                </Heading>

                <VStack gap={4}>
                  <Box width="100%">
                    <Text mb={1} fontSize="sm">
                      Email Address
                    </Text>
                    <Input
                      type="email"
                      placeholder="yourname@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </Box>

                  <Box width="100%">
                    <Text mb={1} fontSize="sm">
                      Password
                    </Text>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </Box>

                  <Link
                    color="teal.600"
                    fontSize="sm"
                    alignSelf="flex-end"
                    href="#"
                  >
                    Forgot Password?
                  </Link>

                  <Button width="100%" colorScheme="teal" onClick={handleLogin}>
                    Login
                  </Button>

                  <Text fontSize="sm" textAlign="center">
                    Don't have an account?{" "}
                    <Text as="span" color="teal.600">
                      Sign Up
                    </Text>
                  </Text>
                </VStack>
              </>
            ) : (
              <>
                {/* OTP UI */}
                <Heading mb={6} textAlign="center" fontWeight="semibold" fontSize="xl">
                  Enter OTP
                </Heading>
                <VStack gap={4}>
                  <Input
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <Button width="100%" colorScheme="teal" onClick={handleVerifyOtp}>
                    Verify OTP
                  </Button>
                  <Text fontSize="sm" color="gray.500">
                    OTP sent to: {loginEmail}
                  </Text>
                </VStack>
              </>)}
          </Tabs.Content>
          {/* SIGNUP TAB */}
          <Tabs.Content value="register">
            <Heading
              mb={6}
              textAlign="center"
              fontWeight="semibold"
              fontSize="xl"
            >
              Create Account
            </Heading>

            <VStack gap={4}>
              <Box width="100%">
                <Text mb={1} fontSize="sm">
                  Email Address
                </Text>
                <Input
                  type="email"
                  placeholder="yourname@example.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </Box>

              <Box width="100%">
                <Text mb={1} fontSize="sm">
                  Password
                </Text>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </Box>

              <Button width="100%" colorScheme="teal" onClick={handleRegister}>
                Register
              </Button>

              <Text fontSize="sm" textAlign="center">
                Already have an account?{" "}
                <Text as="span" color="teal.600">
                  Login
                </Text>
              </Text>
            </VStack>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Center>
  );
}
