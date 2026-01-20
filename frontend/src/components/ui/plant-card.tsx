import {
    Box,
    Image,
    Text,
    Button,
    VStack,
    Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import ConfirmModal from "../modals/ConfirmModal";
import { Tooltip } from "../ui/tooltip"; //

const formatPrice = (value: number | undefined) => {
    if (!value) return "";
    return value.toLocaleString("en-PK");
};


const PlantCard = ({ post, isMyPost, onDelete, onEdit, onView }) => {
    const navigate = useNavigate();
    const { open, onOpen, onClose } = useDisclosure();



    return (
        <>
            <Box
                bg="white"
                borderRadius="xl"
                overflow="hidden"
                maxW="360"
                mx="10%"
                my="4%"
                boxShadow="md"
                transition="all 0.25s ease"
                _hover={{
                    transform: "translateY(-6px)",
                    boxShadow: "xl",
                }}
            >
                {/* IMAGE */}
                <Box position="relative">
                  <Image
                    src={
                        post.image
                        ? `http://localhost:3000/uploads/${post.image}`
                        : "https://placehold.co/600x400"
                    }
                    h="320px"
                    w="100%"
                    objectFit="cover"
                    />


                    {/* PRICE */}
                    <Box
                        position="absolute"
                        top={3}
                        right={3}
                        bg="green.500"
                        color="white"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="sm"
                        fontWeight="bold"
                    >
                        Rs {formatPrice(post.price)}
                    </Box>
                </Box>

                {/* CONTENT */}
                <VStack align="stretch" spacing={8} p={6}>
                    <Text
                        fontWeight="500"
                        color="green.700"
                        fontSize="lg"
                        noOfLines={1}
                    >
                        Plant name:{" "}
                        <Box
                            as="span" color="black">
                            {post.title}
                        </Box>
                    </Text>

                    <Text
                        fontWeight="500"
                        color="green.700"
                        fontSize="lg"
                        noOfLines={1}
                    >
                        Phone Number :{" "}
                        <Box
                            as="span" color="black">
                            {post.number}
                        </Box>
                    </Text>

                    <Text
                        fontWeight="500"
                        color="green.700"
                        fontSize="lg"
                        noOfLines={1}
                    >
                        Location / Address :{" "}
                        <Box
                            as="span" color="black">
                            {post.address}
                        </Box>
                    </Text>

                    <Tooltip
                    content="Download the plant image from this post, then upload it on our AI Disease page to check for possible diseases."
                    showArrow
                    >
                    <Button
                        size="sm"
                        bg="gray.600"
                        color="white"
                        _hover={{ bg: "gray.800" }}
                        onClick={() => navigate(`/ai-disease`)}
                    >
                        🤖 AI Disease Check
                    </Button>
                    </Tooltip>


                    <Flex gap={2}>
                        <Button
                         size="sm"
                            flex={1}
                            bg="blue.500"
                            color="white"
                            _hover={{ bg: "blue.600" }}
                            onClick={() => onView(post)}
                        >
                            👁 View Details
                        </Button>


                        {/* 🔥 ONLY FOR MY POSTS */}
                        {isMyPost && (
                            <Flex gap={2}>
                                {isMyPost && (
                                    <Button
                                        size="sm"
                                        bg="orange.400"
                                        onClick={() => onEdit(post)}
                                    >
                                        ✏️ Edit
                                    </Button>
                                )}


                                <Button
                                    size="sm"
                                    bg="red.500"
                                    color="white"
                                    onClick={onOpen}
                                >
                                    🗑 Delete
                                </Button>


                            </Flex>
                        )}
                        {/* 🔥 CONFIRM MODAL */}





                        <Button
                        size="sm"
                        flex={1}
                        bg="green.500"
                        color="white"
                        _hover={{ bg: "green.600" }}
                        onClick={() =>
                            (window.location.href =
                            `mailto:${post.email}?subject=Interested in Plant&body=Hello, I am interested in your plant: ${post.title}`)
                        }
                        >
                        📩 Contact
                        </Button>


                    </Flex>
                </VStack>
            </Box>
            <ConfirmModal
                isOpen={open}
                onClose={onClose}
                title="Delete Plant"
                message="Are you sure you want to delete this plant? This action cannot be undone."
                confirmText="Delete"
                onConfirm={() => {
                    onDelete(post._id);   // 🔥 parent ko call
                    onClose();
                }}
            />

        </>
    );
};

export default PlantCard;
