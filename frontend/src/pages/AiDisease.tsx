import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  VStack,
  Image,
  Input,
  Progress,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import HeroSection from "../components/ui/HeroSection";
import InfoSection from "../components/ui/InfoSection";
import FeaturesSection from "../components/ui/FeatureSection";
import GetinTouch from "../components/ui/GetinTouch";
import data from "../../data.tsx"
import SocialConnect from "../components/ui/SocialConnect.tsx";

const AIDisease = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDetect = async () => {
    setLoading(true);
    setResult(null);

    // 🔴 TEMP MOCK (AI API baad me)
    setTimeout(() => {
      setResult({
        disease: "Leaf Blight",
        confidence: 92,
        advice: "Remove infected leaves and apply fungicide.",
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <Box>
         <HeroSection
            title="AI Plant Disease Detection System"
            subtitle="Upload a plant image and let our artificial intelligence identify diseases instantly, helping you protect your crops and plants."
            />

     <Box mb={20} >
                   <InfoSection
                    heading="Our AI Disease Detection System"
                    description="Our AI-powered plant disease detection system is designed to help farmers, gardeners, and plant enthusiasts identify plant
                     health issues quickly and accurately. By simply uploading a clear image of a plant leaf, our intelligent model analyzes visual patterns
                    and symptoms to detect possible diseases in seconds.
                    This early detection approach allows users to take timely preventive measures, reducing crop damage and improving overall plant health. 
                    The system is built to be user-friendly and accessible, making advanced agricultural technology available to everyone.
                     In addition to disease identification, our platform provides practical recommendations and treatment guidance to help users manage plant
                      diseases effectively. By combining artificial intelligence with modern agricultural knowledge, we aim to support sustainable farming and 
                      healthier plant growth."
                    image="/plant-aidisease.avif"
                    />

                    
    </Box>
     <Box textAlign="center" my={16}>
                            <Heading mb={6} textAlign="center">
                                Ready to Start?
                            </Heading>
                            <Button colorScheme="green" size="lg">
                                Upload Your Plant Now
                            </Button>
                </Box>

       <FeaturesSection
            features={data.features}
            />
    
                <Box>
                <GetinTouch/>
    
                </Box>
                <Box my={16}>
                <SocialConnect/>

                </Box>
    

      {/* HERO */}
      
    </Box>
  );
};

export default AIDisease;
