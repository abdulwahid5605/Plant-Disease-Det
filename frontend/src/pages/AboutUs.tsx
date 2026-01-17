import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Button,
} from "@chakra-ui/react";
import data from "../../data.tsx"
import HeroSection from "../components/ui/HeroSection.tsx";
import InfoSection from "../components/ui/InfoSection.tsx";
import GetinTouch from "../components/ui/GetinTouch.tsx";
import FeaturesSection from "../components/ui/FeatureSection.tsx";
import FAQSection from "../components/ui/FAQSection.tsx";

export default function AboutUs() {
    // Team members
    const team = [
        { name: "Ali Khan", role: "Founder & CEO", src: "https://ricimelion.pk/cdn/shop/files/AldericThreePieceSuit.webp?v=1737306793" },
        { name: "Sara Ahmed", role: "CTO", src: "https://mogusuit.com/cdn/shop/collections/1530625038127128.png?v=1667976131" },
        { name: "Usman Tariq", role: "Lead Designer", src: "https://m.media-amazon.com/images/I/715Yo+YX5wL._AC_SL1500_.jpg" },
    ];

    return (
        <Box bg="gray.50" >
            <HeroSection
            title="Welcome to Plant Disease Detection System With AI"
            subtitle="We use artificial intelligence to help farmers and plant lovers detect diseases early and grow healthier plants."
            />
                <Box mb={20} >
                <InfoSection
                        heading="Who we are ?"
                        description="PlantApp is a smart agriculture platform designed to support plant owners, farmers, and gardeners through AI-powered
                                    disease detection and modern plant care solutions. Our goal is to simplify plant health management and promote 
                                    sustainable farming practices using accessible technology.
                                    With our AI-based image analysis, users can quickly identify potential plant diseases by uploading a photo and 
                                    receiving instant, reliable insights. This early detection helps prevent crop loss and ensures healthier plant growth.
                                    PlantApp goes beyond disease detection by offering a trusted plant marketplace where users can buy and sell plants and 
                                    farming resources with confidence. In addition, our educational articles and guides provide valuable knowledge on plant 
                                    health, soil care, pest control, and sustainable agriculture.
                                    By bringing together technology, education, and community, PlantApp creates a complete ecosystem focused on healthier 
                                    plants and a more sustainable future. "
                        image="/plant-about.avif"
                />
                
            </Box>

        <FeaturesSection
  features={data?.features || []}
/>

            <Box>
            <GetinTouch/>

            </Box>

            <Box my={16} px={8}>
                <Heading mb={6} textAlign="center">
                    Meet the Team
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} textAlign="center">
                    {team.map((member, idx) => (
                        <Box key={idx} bg="white" borderRadius="md" shadow="md" overflow="hidden">
                            {/* Full Image */}
                            <Box>
                                <img
                                    src={member.src}
                                    alt={member.name}
                                    style={{
                                        width: "100%",
                                        height: "400px",
                                        objectFit: "cover",
                                        objectPosition: "top"
                                    }}
                                />
                            </Box>
                            {/* Name & Role */}
                            <Box p={4}>
                                <Heading size="md" mt={2}>{member.name}</Heading>
                                <Text>{member.role}</Text>
                            </Box>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
            <Box>
                <FAQSection/>
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
    );
}
