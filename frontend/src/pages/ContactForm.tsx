"use client";

import {
    Box,
    Heading,
    Button
  
} from "@chakra-ui/react";
import HeroSection from "../components/ui/HeroSection.tsx";
import InfoSection from "../components/ui/InfoSection.tsx";
import GetinTouch from "../components/ui/GetinTouch.tsx";
import FAQSection from "../components/ui/FAQSection.tsx";
import SocialConnect from "../components/ui/SocialConnect.tsx";
import ContactFormSection from "../components/ui/ContactFormSection.tsx";

export default function ContactForm() {
    

    return (
        <Box>
             <HeroSection
            title="Welcome to Plant Disease Detection System With AI"
            subtitle="Have questions or need support? Get in touch with our team—we're here to help you."
            />
            <InfoSection
                heading="Contact Us "
                description="Have a question, suggestion, or need assistance? We’re here to help. Whether you want to learn more about PlantApp,
                 need support with plant disease detection, marketplace features, or have feedback to share, feel free to reach out to us. 
                 Our team is always happy to connect and support you on your journey toward smarter and healthier plant care. "
                image="/plant-contact.avif"
            />
            <ContactFormSection
                title="Contact With The Team"
                image="/plant-disease-contactus.jpeg"
                />
            <GetinTouch/>
              <Box textAlign="center" my={16}>
                            <Heading mb={6} textAlign="center">
                                Ready to Start?
                            </Heading>
                            <Button colorScheme="green" size="lg">
                                Upload Your Plant Now
                            </Button>
                </Box>
            <Box>
                <FAQSection/>
            </Box>

            <Box>
                <SocialConnect/>
            </Box>
        </Box>
    );
}
