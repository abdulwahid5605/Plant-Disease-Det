// pages/Dashboard.tsx
import { Box, Heading, Center } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Center minH="80vh">
      <Box textAlign="center">
        <Heading fontSize="4xl" mb={4}>
          Welcome to Plant Disease Detection
        </Heading>
        <Heading fontSize="xl" color="gray.600">
          Monitor, Detect, and Manage Plant Health Efficiently
        </Heading>
      </Box>
    </Center>
  );
}
