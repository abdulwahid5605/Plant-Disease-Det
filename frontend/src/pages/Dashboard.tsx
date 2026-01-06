// pages/Dashboard.tsx
import {
  Box,
  Accordion,
  Button,
  Heading,
  Flex,
  Text,
  VStack,
  Image,
  SimpleGrid,
  Icon,
  Card,
  Dialog,
  CloseButton,
  Textarea,
  Portal,
  Input,


} from "@chakra-ui/react";
import "../../src/styles/Navbar.css"
import { toaster } from "../components/ui/toaster";
import TextInput from "../components/ui/TextInput";
import TextAreaInput from "../components/ui/TextAreaInput";
import data from "../../data.tsx"
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

   const [posts, setPosts] = useState(data.marketplacePosts);
  
      const [form, setForm] = useState({
          title: "",
          price: "",
          image: "",
          description: "",
      });
  
      const handleAddPost = () => {
          if (!form.title || !form.price) return;
  
          setPosts([
              {
                  id: Date.now().toString(),
                  title: form.title,
                  price: Number(form.price),
                  image: form.image,
                  description: form.description,
              },
              ...posts,
          ]);
  
          setForm({ title: "", price: "", image: "", description: "" });
      };

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const GOOGLE_SHEET_URL: string = "https://script.google.com/macros/s/AKfycbz_BPwMa6IrGYmd8AHjVChTri3kuOvHdGCpjTDgH0cXtDf78qmT6fL0J_RKdQ1SPC34/exec";

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      toaster.create({
        title: "Missing Fields",
        description: "Name, Email, aur Message required hain.",
        type: "warning",
      });
      return;
    }

    const toastId = toaster.create({
      title: "Sending Message...",
      type: "loading",
    });

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: JSON.stringify({ name, email, subject, message }),
      });

      toaster.update(toastId, {
        title: "Message Sent",
        description: "Hum nay aap ka message receive kar liya hai.",
        type: "success",
      });

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toaster.update(toastId, {
        title: "Failed",
        description: "Message send nahi hua. Try again.",
        type: "error",
      });
    }
  };
  return (
    <Box >
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

      <Box mb={20} >
        <Box
          bg="green.100"
          borderRadius="none"
          shadow="xl"
          overflow="hidden"
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="stretch"
          >
            <Flex
              flex="1"
              direction="column"
              justify="center"
              p={{ base: 12, md: 24 }}
            >
              <Heading mb={8}>
                Plant Disease Detection System with AI
              </Heading>
              <Text fontSize="lg" color="gray.600" mb={8}>
                Our website is a smart plant care platform designed to help users maintain healthy plants using modern technology.
                The system provides AI-based plant disease detection, where users can upload plant leaf images and receive disease predictions
                to support early identification and prevention. Along with disease detection, the platform offers informative plant-related articles
                that help users understand plant care, common diseases, and best farming practices. The website also includes a plant marketplace,
                allowing users to add posts, view products, and explore plant-related items shared by the community. Users can create and view
                posts to exchange knowledge and promote interaction among plant lovers. Additionally, the Contact Us feature enables users to
                communicate with the platform for inquiries, feedback, or support. Overall, the platform combines artificial intelligence,
                knowledge sharing, and community engagement to provide a complete and user-friendly solution for smart and sustainable plant care.
              </Text>
            </Flex>
            <Box
              flex="1"
              minH={{ base: "300px", md: "70vh" }}
              bgImage="url('/plant-home.jpg')"
              bgSize="cover"
            />
          </Flex>
        </Box>
      </Box>

      <Box textAlign="center" mb={16}>
        <Heading mb={6} textAlign="center">
          Ready to Start?
        </Heading>
        <Button colorScheme="green" size="lg">
          Upload Your Plant Now
        </Button>
      </Box>

      <Box mb={16} px={8}>
        <Heading mb={6} textAlign="center">
          Our Features
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
          {data.features.map((feature) => (
            <Box
              key={feature.id}
              p={6}
              bg="white"
              borderRadius="md"
              shadow="md"
              textAlign="center"
            >
              <Icon
                as={feature.icon}
                w={10}
                h={10}
                color="green.500"
                mb={4}
              />
              <Heading size="md" mb={2}>
                {feature.title}
              </Heading>
              <Text>{feature.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>


      <Box>
        {/* <Flex
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
        </Flex> */}
        <Box py={4} px={8} bg="green.100">
          <Heading textAlign="center" mb={10}>
            Get in Touch
          </Heading>
          <Flex
            gap={6}
            justify="center"
            wrap="wrap"
          >
            {[
              { title: "Email Us", value: "support@plantapp.com" },
              { title: "Call Us", value: "+92 300 1234567" },
              { title: "Location", value: "Karachi, Pakistan" },
              { title: "Location", value: "Karachi, Pakistan" },
              { title: "Working Hours", value: "Mon – Fri, 9am – 6pm" },
            ].map((item, i) => (
              <Box
                key={i}
                bg="#F0FDF4"
                border="1px solid"
                borderColor="green.100"
                borderRadius="lg"
                p={6}
                w={{ base: "100%", md: "220px" }}
                textAlign="center"
                shadow="md"
              >
                <Heading size="sm" mb={2} color="green.700">
                  {item.title}
                </Heading>
                <Box fontSize="sm" color="gray.600">
                  {item.value}
                </Box>
              </Box>
            ))}
          </Flex>
          <Box px={8} py={16}>
            <Heading textAlign="center" mb={10}>
              How Can We Help You?
            </Heading>

            <Flex gap={6} justify="center" wrap="wrap">
              {[
                {
                  title: "Technical Support",
                  desc: "Facing issues with login, OTP, or uploads?",
                },
                {
                  title: "Marketplace Help",
                  desc: "Questions about buying or selling plants?",
                },
                {
                  title: "AI Detection Queries",
                  desc: "Need help understanding disease results?",
                },
              ].map((item, i) => (
                <Box
                  key={i}
                  bg="white"
                  borderRadius="lg"
                  shadow="md"
                  p={6}
                  maxW="320px"
                  textAlign="center"
                  _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
                  transition="all 0.2s"
                >
                  <Heading size="sm" mb={3} color="green.700">
                    {item.title}
                  </Heading>
                  <Box fontSize="sm" color="gray.600">
                    {item.desc}
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>
          <Box textAlign="center" px={8}>
            <Heading size="md" color="green.800" mb={2}>
              Fast Response Guarantee
            </Heading>
            <Box color="green.700">
              We usually respond within <b>24 hours</b>.
            </Box>
          </Box>

        </Box>
        <Heading mb={6} mt={12} textAlign="center">
          Latest Articles
        </Heading>

        <SimpleGrid mb={12} columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
          {data.articles.slice(0, 3).map((article) => (
            <Card.Root
              key={article.id}
              boxShadow="md"
              _hover={{ boxShadow: "xl" }}
            >
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

        {/* View All Articles Button */}
        <Box textAlign="center" mb={12}>
          <Link className="nav-link"
              to="/articles"
          >
            <Button
              size="lg"
              w="fit-content"
              colorScheme="green"
              variant="solid"
            >
              View All Articles
            </Button>
          </Link>
        </Box>

         <Flex
            alignItems="center"
            justify="center"
            mb={10}
            mx={10}
        
        >
            {/* <Text>Total Post</Text> */}
        
            <Heading >Market Place</Heading>
        
           
        </Flex>

         {/* ---------------- ALL POSTS GRID ---------------- */}
                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mt={6} mb={12}>
                        {posts.map((post) => (
                            <Box
                                key={post.id}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                boxShadow="md"
                                _hover={{ transform: "translateY(-4px)", transition: "0.3s" }}
                            >
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    h="200px"
                                    w="100%"
                                    objectFit="cover"
                                />
        
                                <VStack align="start" p={4} gap={2}>
                                    <Text fontWeight="bold">{post.title}</Text>
                                    <Text color="green.600" fontWeight="semibold">
                                        Rs {post.price}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600">
                                        {post.description}
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>

        <Flex
          height="100vh"
          bg="gray.50"
          direction={["column", "column", "row"]}
          padding={[4, 16]}
        >
          <Box position="relative" flex="1" display={["none", "none", "block"]}
            borderTopLeftRadius="lg" borderBottomLeftRadius="lg" overflow="hidden">
            <Image
              src="/plant-disease-contactus.jpeg"
              alt="Plant"
              w="100%"
              h="100%"
              objectFit="cover"

            />
            <Box
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bg="linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4))"
            />
          </Box>
          <Flex
            flex="1"
            align="center"
            justify="center"
            boxShadow="0 4px 20px rgba(0,0,0,0.3)"
            borderTopRadius="lg"
            borderBottomRightRadius="lg"
            p={[4, 8]}
          >
            <Box
              w="90%"
              maxW="500px"
              h={["auto", "auto", "100%"]}
              p={[0, 4]}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Heading mb={6} textAlign="center" fontSize="xl">
                Contact Us
              </Heading>
              <VStack gap={4} flex="1">
                <Box width="100%">
                  <TextInput
                    label="Full Name"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box width="100%">
                  <TextInput
                    label="Email Address"
                    placeholder="yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <Box width="100%">
                  <TextInput
                    label="Subject"
                    placeholder="Topic (optional)"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </Box>
                <Box width="100%" flex="1">
                  <TextAreaInput
                    label="Message"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                </Box>

                <Button
                  width="100%"
                  colorScheme="teal"
                  size="lg"
                  _hover={{ bg: "teal.600" }}
                  onClick={handleSubmit}
                >
                  Send Message
                </Button>
              </VStack>
            </Box>
          </Flex>
        </Flex>
        <Box mb={16} px={8}>
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
                        align="center"
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
        <Box mb={16} textAlign="center">
          <Heading mb={4}>Connect With Us</Heading>
          <Box color="gray.600" mb={6}>
            Follow us on social media for updates and tips
          </Box>

          <Flex justify="center" gap={6}>
            {["Facebook", "Instagram", "LinkedIn"].map((platform) => (
              <Box
                key={platform}
                px={6}
                py={3}
                border="1px solid"
                borderColor="green.200"
                borderRadius="full"
                cursor="pointer"
                _hover={{ bg: "green.50" }}
              >
                {platform}
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>








    </Box>
  );
}
