"use client"

import { Box, Button, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";

const teams = [
  { name: "Rocket", logo: "/rocketlogo.png", bgColor: "#d16363" },
  { name: "Aqua", logo: "/aqualogo.png", bgColor: "#e3eef9" },
  { name: "Magma", logo: "/magmalogo.png", bgColor: "#6a5b65" },
  { name: "Galactic", logo: "/galacticlogo.png", bgColor: "#ffe082" },
];

const TeamSelectionPage = () => {
  return (
    <Box h="100%" bg="white">
      <Box position="relative" h="100vh">
        <Heading
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          zIndex="1"
          color="black"
          size="xl"
          mt={4}
        >
          Choose Your Team
        </Heading>

        {/* Team Selection Boxes */}
        <Flex h="100%">
          {teams.map((team, index) => (
            <VStack
              key={index}
              bg={team.bgColor}
              w="25%" // Dividing into four sections evenly
              h="100%"
              justify="center"
              spacing={6}
            >
              <Text fontWeight="bold" fontSize="xl" color="black">
                {team.name}
              </Text>
              <Image src={team.logo} alt={`${team.name} Logo`} boxSize="100px" />
              <Button colorScheme="blue">Join Team</Button>
            </VStack>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default TeamSelectionPage;
