import { Box, Heading, SimpleGrid, Text, Icon } from "@chakra-ui/react";

interface FeatureItem {
  id: number | string;
  title: string;
  description: string;
  icon: any;
}

interface FeaturesSectionProps {
  heading?: string;
  features: FeatureItem[];
}

const FeaturesSection = ({
  heading = "Our Features",
  features,
}: FeaturesSectionProps) => {
  return (
    <Box mb={16} px={8}>
      <Heading mb={6} textAlign="center">
        {heading}
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
        {features.map((feature) => (
          <Box
            key={feature.id}
            p={6}
            bg="white"
            borderRadius="md"
            shadow="md"
            textAlign="center"
            transition="all 0.2s"
            _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
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

            <Text color="gray.600">
              {feature.description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FeaturesSection;
