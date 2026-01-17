import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Card,
} from "@chakra-ui/react";
import data from "../../data";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const article = data.articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <Flex justify="center" align="center" py={10} px={4}>
        <Card.Root maxW="800px" w="100%" p={6}>
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
      <Card.Root maxW="85vw" w="100%">
        <Card.Body p={0}>
          <Flex direction={{ base: "column", md: "row" }} minH="70vh">
            <Box flex="1">
              <Image
                src={article.image}
                alt={article.title}
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Box>

            <Box flex="1" p={6}>
              <Heading mb={4}>{article.title}</Heading>
              <Text mb={6}>{article.excerpt}</Text>

              <Button colorScheme="green" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </Box>
          </Flex>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
