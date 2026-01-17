"use client";

import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Card } from "@chakra-ui/react";
import data from "../../../data";

interface ArticlesSectionProps {
  title?: string;
  limit?: number; // 🔥 kitne articles show karne hain
}

export default function ArticlesSection({
  title = "Latest Articles",
  limit = 3,
}: ArticlesSectionProps) {
  const articlesToShow = data.articles.slice(0, limit);
const truncateText = (text: string, length = 100) => {
  return text.length > length
    ? text.substring(0, length) + "..."
    : text;
};

  return (
    <Box  py={8} px={10}>
      <Heading mb={14} mt={10} fontSize={"30px"} textAlign="center">
        {title}
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={12}>
        {articlesToShow.map((article) => (
          <Card.Root
            key={article.id}
            boxShadow="md"
            _hover={{ boxShadow: "xl" }}
          >
            <Image
              src={article.image}
              alt={article.title}
              height="350px"
              w="100%"
              objectFit="cover"
            />

            <Card.Body gap={3}>
              <Card.Title>{article.title}</Card.Title>
            <Card.Description>
  {truncateText(article.excerpt, 100)}
</Card.Description>

              <Link to={`/articles/${article.id}`}>
                <Button
                  variant="solid"
                  colorScheme="green"
                  w="fit-content"
                  mt={2}
                >
                  Read More
                </Button>
              </Link>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Box>
  );
}
