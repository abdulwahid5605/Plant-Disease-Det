import { Box, Flex, HStack, Text, Link as ChakraLink } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg="gray.800"
      color="white"
      px={6}
      py={6}
      boxShadow="inner"
      // position="fixed"     
      bottom={0}           
      width="100%"         
      zIndex={10}          
      marginTop={4}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Text fontSize="sm">&copy; {new Date().getFullYear()} PlantApp. All rights reserved.</Text>
      </Flex>
    </Box>
  );
}
