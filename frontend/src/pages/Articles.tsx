import {
    Box,
    Heading,
    SimpleGrid,
    Image,
    Card,
    Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import articles from "../../data.tsx"


export default function ArticlesPage() {
    return (
        <Box maxW="1200px" mx="auto" px={6} py={8}>
            <Heading mb={6} textAlign="center">
                Latest Articles
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
                {articles.map((article) => (
                    <Card.Root key={article.id} boxShadow="md" _hover={{ boxShadow: "xl" }}>
                        <Image
                            src={article.image}
                            alt={article.title}
                            height="180px"
                            w="100%"
                            objectFit="cover"
                        />

                        <Card.Body gap={3}>
                            <Card.Title>{article.title}</Card.Title>
                            <Card.Description>{article.excerpt}</Card.Description>

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
