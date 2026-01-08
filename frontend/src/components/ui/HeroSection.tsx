import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  showScrollButton?: boolean;
}

const HeroSection = ({
  title,
  subtitle,
  backgroundImage = "/plant_disease_2.jpeg",
  showScrollButton = true,
}: HeroSectionProps) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="80vh"
      w="100%"
      bgImage={`url('${backgroundImage}')`}
      bgSize="cover"
      bgRepeat="no-repeat"
      position="relative"
      css={{
        clipPath: "polygon(0 0, 100% 0, 100% 56%, 0% 100%)",
      }}
    >
      {/* DARK OVERLAY */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="rgba(0, 0, 0, 0.5)"
        zIndex={0}
      />

      {/* CONTENT */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        color="white"
        zIndex={1}
        px={4}
      >
        <Heading size="3xl" mb={4}>
          {title}
        </Heading>

        {subtitle && (
          <Text fontSize="xl" mb={6}>
            {subtitle}
          </Text>
        )}

        {showScrollButton && (
          <Button
            onClick={() =>
              window.scrollBy({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
            colorScheme="green"
            size="lg"
            display="flex"
            alignItems="center"
            gap={3}
            _focus={{ boxShadow: "none" }}
          >
            <Text fontWeight="bold">Scroll Down</Text>

            <Box as="span" display="flex" alignItems="center">
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
        )}
      </Flex>
    </Flex>
  );
};

export default HeroSection;
