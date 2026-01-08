// pages/Dashboard.tsx
import {
  Box,
  Button,
  Heading,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import "../../src/styles/Navbar.css"
import PlantCard from "../components/ui/plant-card.tsx";
import data from "../../data.tsx"
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import HeroSection from "../components/ui/HeroSection.tsx";
import InfoSection from "../components/ui/InfoSection.tsx";
import GetinTouch from "../components/ui/GetinTouch.tsx";
import FAQSection from "../components/ui/FAQSection.tsx";
import SocialConnect from "../components/ui/SocialConnect.tsx";
import FeaturesSection from "../components/ui/FeatureSection.tsx";
import ArticlesSection from "../components/ui/ArticlesSection.tsx";
import ContactFormSection from "../components/ui/ContactFormSection.tsx";
import axios from "axios";
import { useMemo } from "react";
import { useDisclosure } from "@chakra-ui/react";
import PlantFormDialog from "../components/ui/PlantFormDialog";
import { useEffect } from "react";
export default function Dashboard() {
  const navigate = useNavigate();


const { open, onOpen, onClose } = useDisclosure();
const [selectedPlant, setSelectedPlant] = useState(null);

const userId = useMemo(() => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub;
  } catch {
    return null;
  }
}, []);

  const [marketPosts, setMarketPosts] = useState([]);
 useEffect(() => {
  const fetchMarketplacePreview = async () => {
    try {
      const res = await axios.get("http://localhost:3000/plants");

      // 🔥 FILTER OUT MY POSTS
      const othersPosts = res.data.filter(
        (post) =>
          !userId ||
          !post.user ||
          String(post.user._id) !== String(userId)
      );

      setMarketPosts(othersPosts.slice(0, 6));
    } catch (err) {
      console.error("MARKET PREVIEW ERROR:", err);
    }
  };

  fetchMarketplacePreview();
}, [userId]);


 
  return (
    <Box >
     <HeroSection
      title="Welcome to Plant Disease Detection System With AI"
      subtitle="Detect plant diseases instantly and connect with the marketplace community to buy and sell plants easily."
      />
 <InfoSection
      heading="Plant Disease Detection System with AI"
      description=" Our website is a smart plant care platform designed to help users maintain healthy plants using modern technology.
                The system provides AI-based plant disease detection, where users can upload plant leaf images and receive disease predictions
                to support early identification and prevention. Along with disease detection, the platform offers informative plant-related articles
                that help users understand plant care, common diseases, and best farming practices. The website also includes a plant marketplace,
                allowing users to add posts, view products, and explore plant-related items shared by the community. Users can create and view
                posts to exchange knowledge and promote interaction among plant lovers. Additionally, the Contact Us feature enables users to
                communicate with the platform for inquiries, feedback, or support. Overall, the platform combines artificial intelligence,
                knowledge sharing, and community engagement to provide a complete and user-friendly solution for smart and sustainable plant care."
      image="/plant-home.jpg"
    />
      <Box textAlign="center" my={16}>
        <Heading mb={6} textAlign="center">
          Ready to Start?
        </Heading>
        <Button colorScheme="green" size="lg">
          Upload Your Plant Now
        </Button>
      </Box>

      <FeaturesSection features={data.features} />



      <Heading textAlign="center" mb={6}>
        Marketplace
      </Heading>

<SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
  {marketPosts.map((post) => (
    <PlantCard
      key={post._id}
      post={post}
      isMyPost={false}
      onView={(post) => {
        setSelectedPlant(post);
        onOpen(); // 🔥 dialog open
      }}
    />
  ))}
</SimpleGrid>


  <Flex justify="center" mb={16}>
    <Button
      size="lg"
      bg="green.500"
      color="white"
      _hover={{ bg: "green.600" }}
      onClick={() => navigate("/market-place")}
    >
      View More Ads
    </Button>
  </Flex>
  <PlantFormDialog
  isOpen={open}
  onClose={onClose}
  mode="view"
  plant={selectedPlant}
/>

      <GetinTouch/>
        <ArticlesSection limit={3} />           
    <ContactFormSection/>
        <FAQSection/>
       <SocialConnect/>
    </Box>
    
  );
  <>
  </>
}
