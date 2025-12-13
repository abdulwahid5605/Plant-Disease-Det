import { useParams, useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Text, Image, Button, Card, CardBody } from "@chakra-ui/react";
import articles from "../../data.tsx";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <Flex justify="center" align="center" py={10} px={4}>
        <Card.Root maxW="800px" w="100%" p={6} boxShadow="xl">
          <Card.Body textAlign="center">
            <Heading mb={4}>Article Not Found</Heading>
            <Button colorScheme="green" onClick={() => navigate("/")}>
              Back to Articles
            </Button>
          </Card.Body>
        </Card.Root>
      </Flex>
    );
  }

  return (
    <Flex justify="center" align="center" py={8} px={4}>
      <Card.Root boxShadow="xl" borderRadius="md" >
        <CardBody p={0}>
          <Flex direction={{ base: "column", md: "row" }} minH="70vh" maxW="85vw" w="100%">
            {/* Left side - Image */}
            <Box flex="1">
              <Image
                src={article.image}
                alt={article.title}
                w="100%"
                h="100%"
                objectFit="cover"
                borderTopLeftRadius="md"
                borderBottomLeftRadius={{ base: "md", md: "md" }}
              />
            </Box>

            {/* Right side - Content */}
            <Box flex="1" p={6}>
              <Heading mb={4}>{article.title}</Heading>
              <Text fontSize="lg" color="gray.700" mb={6}>
                {article.excerpt}
              </Text>

              <Text mb={6}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac
                venenatis elit, eget dignissim quam. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis egestas.
              </Text>

              <Button colorScheme="green" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </Box>
          </Flex>
        </CardBody>
      </Card.Root>
    </Flex>
  );
}
