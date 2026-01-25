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
import data from "../../data.tsx";
import SocialConnect from "../components/ui/SocialConnect.tsx";

const AIDisease = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const formatDiseaseName = (name: string) => name.replace(/_/g, " ");

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDetect = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3000/plant/detect", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Disease detection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <HeroSection
        title="AI Plant Disease Detection System"
        subtitle="Upload a plant image and let our artificial intelligence identify diseases instantly, helping you protect your crops and plants."
      />

      <Box mb={20}>
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
        <Heading mb={6}>Ready to Start?</Heading>

        <Input
          type="file"
          accept="image/*"
          display="none"
          id="plant-upload"
          onChange={handleImageChange}
        />

        <label htmlFor="plant-upload">
          <Button colorScheme="green" size="lg" as="span">
            Upload Your Plant Now
          </Button>
        </label>

        {image && (
          <Button
            mt={4}
            colorScheme="teal"
            onClick={handleDetect}
            loading={loading}
          >
            Detect Disease
          </Button>
        )}
        {result && (
          <Box
            mt={8}
            maxW="md"
            mx="auto"
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="green.600">
              Detection Result
            </Heading>

            {preview && (
              <Image
                src={preview}
                alt="Uploaded plant"
                borderRadius="md"
                mb={4}
                maxH="200px"
                mx="auto"
              />
            )}

            <Text fontSize="lg" fontWeight="bold">
              Disease
            </Text>

            <Badge colorScheme="red" fontSize="1em" px={3} py={1} mt={2}>
              {formatDiseaseName(result.disease)}
            </Badge>

            <Text mt={5} fontWeight="bold">
              Confidence: {result.confidence}%
            </Text>

            {/* ✅ Chakra UI v3 Progress */}
            <Progress.Root
              value={result.confidence}
              max={100}
              mt={3}
            >
              <Progress.Track
                bg="gray.200"
                borderRadius="md"
                h="10px"
              >
                <Progress.Range
                  bg={
                    result.confidence > 80
                      ? "green.500"
                      : result.confidence > 50
                        ? "yellow.400"
                        : "red.500"
                  }
                />
              </Progress.Track>
            </Progress.Root>

            <Badge
              mt={4}
              colorScheme={result.confidence > 80 ? "green" : "yellow"}
              fontSize="0.9em"
              px={3}
              py={1}
            >
              {result.confidence > 80 ? "High Confidence" : "Moderate Confidence"}
            </Badge>
          </Box>
        )}

      </Box>

      <FeaturesSection features={data.features} />

      <Box>
        <GetinTouch />
      </Box>
      <Box my={16}>
        <SocialConnect />
      </Box>

      {/* HERO */}
    </Box>
  );
};

export default AIDisease;
