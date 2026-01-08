import {
    Box,
    Button,
    SimpleGrid,
    Heading,
    Image,
    Text,
    VStack,
    Input,
    Textarea,
    Dialog,
    Portal,
    CloseButton,
    Accordion,
    Flex,
} from "@chakra-ui/react";
import PlantCard from "../components/ui/plant-card";
import { useState } from "react";
import data from "../../data";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import MessageModal from "../components/modals/MessageModal";
import { useDisclosure } from "@chakra-ui/react";
import PlantFormDialog from "../components/ui/PlantFormDialog";




const MarketPlace = () => {

    const userId = useMemo(() => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const payload = JSON.parse(atob(base64));
            return payload.sub;
        } catch (err) {
            console.error("TOKEN DECODE ERROR", err);
            return null;
        }
    }, []);





    const navigate = useNavigate();
    const [view, setView] = useState("all"); // all | my
    const [messageModal, setMessageModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        type: "info",
    });
    const { open, onOpen, onClose } = useDisclosure();

    const [dialogMode, setDialogMode] = useState("create"); // create | edit | view
    const [selectedPlant, setSelectedPlant] = useState(null);




    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [posts, setPosts] = useState([])
    const [form, setForm] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const token = localStorage.getItem("token");

                const url =
                    view === "my"
                        ? "http://localhost:3000/plants/my"
                        : "http://localhost:3000/plants";

                const res = await axios.get(url, {
                    headers: {
                        ...(view === "my" && {
                            Authorization: `Bearer ${token}`,
                        }),
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                    },
                });
                console.log("TOKEN:", token);
                console.log("VIEW:", view);
                console.log("Posts", posts[0]);

                setPosts(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPlants();
    }, [view]);


    const handleAddPost = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:3000/plant",
                {
                    title: form.title,
                    price: Number(form.price),
                    image: form.image || "",
                    description: form.description || "",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // ✅ SUCCESS
            if (res.status === 200 || res.status === 201) {
                setIsDialogOpen(false); // 🔥 CLOSE dialog
                setForm({ title: "", price: "", image: "", description: "" });
            }

        } catch (err: any) {
            console.error(
                "POST ERROR:",
                err.response?.data || err.message
            );
            // ❌ DO NOTHING → dialog stays open
        }
    };

   const handleSubmitPlant = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("price", String(data.price));
    formData.append("quantity", String(data.quantity || 1));
    formData.append("description", data.description || "");
    formData.append("number", data.number || "");
    formData.append("email", data.email || "");
    formData.append("address", data.address || "");
    formData.append("plantAge", data.plantAge || "");

    if (data.image) {
      formData.append("image", data.image); // 🔥 FILE
    }

    if (dialogMode === "create") {
      await axios.post(
        "http://localhost:3000/plant",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // ❌ content-type mat likho
          },
        }
      );

      setMessageModal({
        isOpen: true,
        title: "Success",
        message: "Plant added successfully 🌱",
        type: "success",
      });
    }

    if (dialogMode === "edit" && selectedPlant?._id) {
      await axios.patch(
        `http://localhost:3000/plant/${selectedPlant._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessageModal({
        isOpen: true,
        title: "Updated",
        message: "Plant updated successfully 🌿",
        type: "success",
      });
    }

    onClose();
  } catch (err) {
    console.error(err);

    setMessageModal({
      isOpen: true,
      title: "Error",
      message: "Something went wrong. Please try again.",
      type: "error",
    });
  }
};



    const handleDeletePost = async (postId) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.delete(
                `http://localhost:3000/plant/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // ✅ API SUCCESS
            if (res.status === 200) {
                // remove from UI
                setPosts((prev) =>
                    prev.filter((p) => p._id !== postId)
                );

                // open success modal
                setMessageModal({
                    isOpen: true,
                    title: "Deleted Successfully",
                    message: "Plant has been deleted successfully ",
                    type: "success",
                });
            }
        } catch (error) {
            console.error("DELETE ERROR:", error);

            // ❌ API ERROR
            setMessageModal({
                isOpen: true,
                title: "Something went wrong",
                message: "Unable to delete plant. Please try again later.",
                type: "error",
            });
        }
    };

    const handleOpenCreate = () => {
        setDialogMode("create");
        setSelectedPlant(null);
        onOpen();
    };


    return (
        <>
            <Box>
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    h="80vh"
                    w="100%"
                    bgImage="url('/plant_disease_2.jpeg')"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    css={{ clipPath: "polygon(0 0, 100% 0, 100% 56%, 0% 100%)" }}
                // mb={20}
                >
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        w="100%"
                        h="100%"
                        bg="rgba(0, 0, 0, 0.5)"
                        zIndex={0}
                    />

                    <Flex direction="column" align="center" justify="center" textAlign="center" color="white" zIndex={1} px={4}>
                        <Heading size="3xl" mb={4}>
                            Welcome to Plant Disease Detection System With AI
                        </Heading>
                        <Text fontSize="xl" mb={6}>
                            Detect plant diseases instantly and connect with the marketplace
                            community to buy and sell plants easily.
                        </Text>
                        <Button
                            onClick={() =>
                                window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
                            }
                            colorScheme="green"
                            size="lg"
                            display="flex"
                            alignItems="center"
                            gap={3}
                            _focus={{ boxShadow: "none" }}
                        >
                            <Text fontWeight="bold">Scroll Down</Text>
                            <Box as="span" display="flex" alignItems="center" justifyContent="center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="7" y="2" width="10" height="20" rx="5" ry="5" />
                                    <line x1="12" y1="6" x2="12" y2="10" />
                                </svg>
                            </Box>
                        </Button>
                    </Flex>
                </Flex>
                <Flex
                    alignItems="center"
                    justify="space-between"
                    my={10}
                    mx={10}
                >
                    {/* LEFT */}
                    <Text>
                        {view === "my"
                            ? `My Post : ${posts.length}`
                            : `Total Posts: ${posts.length}`}
                    </Text>

                    {/* CENTER */}
                    <Heading>
                        {view === "my" ? "Market Place / My Posts" : "Market Place / All Post"}
                    </Heading>

                    {/* RIGHT BUTTONS */}
                    <Flex gap={3}>
                        <Button
                            variant={view === "all" ? "solid" : "outline"}
                            colorScheme="green"
                            onClick={() => setView("all")}
                        >
                            All Posts
                        </Button>

                        <Button
                            variant={view === "my" ? "solid" : "outline"}
                            colorScheme="green"
                            onClick={() => setView("my")}
                        >
                            My Posts
                        </Button>


                        <Button colorScheme="green" onClick={handleOpenCreate}>
                            + Add Post
                        </Button>

                    </Flex>
                </Flex>


                {posts.length === 0 && (
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        mt={20}
                        py={16}
                        borderRadius="lg"
                        bg="green.50"
                    >
                        <Heading size="md" color="green.700" mb={2}>
                            No Plants Available 🌱
                        </Heading>
                        <Text color="gray.600" textAlign="center" maxW="400px">
                            There are currently no plants listed in the marketplace.
                            Be the first to add one and help grow the community!
                        </Text>


                    </Flex>
                )}

                {posts.length > 0 &&
                    (
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mt={8}>
                            {posts.map((post) => (
                                <PlantCard
                                    key={post._id}
                                    post={post}
                                    isMyPost={
                                        userId &&
                                        post.user &&
                                        String(post.user._id) === String(userId)
                                    }
                                    onDelete={handleDeletePost}
                                    onView={(post) => {
                                        setDialogMode("view");
                                        setSelectedPlant(post);
                                        onOpen();
                                    }}
                                    onEdit={(post) => {
                                        setDialogMode("edit");
                                        setSelectedPlant(post);
                                        onOpen();
                                    }}
                                />
                            ))}
                        </SimpleGrid>


                    )}
                <Box mb={16} mt={12} px={8}>
                    <Heading mb={6} textAlign="center">
                        Frequently Asked Questions
                    </Heading>

                    <Flex direction={{ base: "column", md: "row" }} gap={8} borderRadius="md" shadow="xl" p={8} bg="white">
                        <Box flex={1}>
                            <Accordion.Root collapsible defaultValue={["b"]} gap={4}>
                                {data.faqItems.map((item, idx) => (
                                    <Accordion.Item key={idx} value={item.value}>
                                        <Accordion.ItemTrigger>
                                            <Flex
                                                p={4}
                                                bg="green.50"
                                                borderRadius="md"
                                                shadow="sm"
                                                cursor="pointer"
                                                _hover={{ shadow: "md", bg: "green.100" }}
                                                transition="all 0.2s"
                                                minW="100%"
                                                justify="space-between"
                                            >
                                                <Text fontWeight="semibold" color="green.900">
                                                    {item.title}
                                                </Text>
                                                <Accordion.ItemIndicator />
                                            </Flex>
                                        </Accordion.ItemTrigger>


                                        <Accordion.ItemContent>
                                            <Accordion.ItemBody>
                                                <Box p={4} mt={2} bg="green.50" borderRadius="md" shadow="sm">
                                                    {item.text}
                                                </Box>
                                            </Accordion.ItemBody>
                                        </Accordion.ItemContent>
                                    </Accordion.Item>
                                ))}
                            </Accordion.Root>
                        </Box>

                        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
                            <Box
                                bg="green.100"
                                borderRadius="xl"
                                p={6}
                                textAlign="center"
                                shadow="lg"
                                maxW="400px"
                            >
                                <Heading size="md" mb={4} color="green.900">
                                    Need More Help?
                                </Heading>
                                <Text mb={4}>
                                    Explore our tutorials, guides, and community forum to learn more about plant care and disease management.
                                </Text>
                                <Button colorScheme="green">Go to Resources</Button>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
                <Box textAlign="center" mb={16}>
                    <Heading mb={6} textAlign="center">
                        Ready to Start?
                    </Heading>
                    <Button colorScheme="green" size="lg">
                        Upload Your Plant Now
                    </Button>
                </Box>
            </Box>
            <MessageModal
                isOpen={messageModal.isOpen}
                onClose={() =>
                    setMessageModal((prev) => ({
                        ...prev,
                        isOpen: false,
                    }))
                }
                title={messageModal.title}
                message={messageModal.message}
                type={messageModal.type}
            />

            <PlantFormDialog
                isOpen={open}
                onClose={onClose}
                mode={dialogMode}
                plant={selectedPlant}
                onSubmit={handleSubmitPlant}
            />




        </>

    );
};

export default MarketPlace;