import {
    Box,
    Heading,
    Button,
} from "@chakra-ui/react";
import data from "../../data.tsx"
import HeroSection from "../components/ui/HeroSection.tsx";
import InfoSection from "../components/ui/InfoSection.tsx";
import FAQSection from "../components/ui/FAQSection.tsx";
import SocialConnect from "../components/ui/SocialConnect.tsx";
import ArticlesSection from "../components/ui/ArticlesSection.tsx";


export default function ArticlesPage() {
    return (
        <Box >
             <HeroSection
            title="Welcome to Plant Disease Detection System With AI"
            subtitle="Learn expert tips, disease prevention methods, and best practices for healthy plant growth."
            />
            <InfoSection
                heading="Articles & Guides"
                description="Explore our collection of informative articles and practical guides designed to help plant owners, farmers, and 
                gardening enthusiasts make better decisions. From plant care tips and disease prevention to soil management, pest control, and 
                sustainable farming practices, our content is curated to provide clear, reliable, and easy-to-understand knowledge. Whether you 
                are a beginner or an experienced grower, these articles empower you with the insights needed to maintain healthier plants and achieve 
                better growth outcomes."
                image="/plant-home.jpg"
            />
           <ArticlesSection
            title="All Articles"
            limit={data.articles.length}
            />

            <Box textAlign="center" mb={16}>
                <Heading mb={6} textAlign="center">
                    Ready to Start?
                </Heading>
                <Button colorScheme="green" size="lg">
                    Upload Your Plant Now
                </Button>
            </Box>
        <FAQSection/>
        <SocialConnect/>

        </Box>
    );
}
