"use client";

import { useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Button,
  Heading,
  Text,
  Grid,
  HStack,
  VStack,
  IconButton
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import SearchBar from "@/components/searchBar";

const users = [
  { name: "John Doe", username: "@Johndoe123", level: 30 },
  { name: "John Doe", username: "@Johndoe345", level: 30 },
  { name: "John Doe", username: "@Johndoe456", level: 30 },
  { name: "John Doe", username: "@Johndoe567", level: 30 },
  { name: "John Doe", username: "@Johndoe678", level: 30 },
  { name: "John Doe", username: "@Johndoe123", level: 30 },
  { name: "John Doe", username: "@Johndoe345", level: 30 },
  { name: "John Doe", username: "@Johndoe456", level: 30 },
  { name: "John Doe", username: "@Johndoe567", level: 30 },
  { name: "John Doe", username: "@Johndoe678", level: 30 },
];

const friends = [
  { name: "John Doe", username: "@Johndoe123", level: 30 },
  { name: "John Doe", username: "@Johndoe345", level: 30 },
  { name: "John Doe", username: "@Johndoe456", level: 30 },
  { name: "John Doe", username: "@Johndoe567", level: 30 },
  { name: "John Doe", username: "@Johndoe678", level: 30 },
  { name: "John Doe", username: "@Johndoe123", level: 30 },
  { name: "John Doe", username: "@Johndoe345", level: 30 },
  { name: "John Doe", username: "@Johndoe456", level: 30 },
  { name: "John Doe", username: "@Johndoe567", level: 30 },
  { name: "John Doe", username: "@Johndoe678", level: 30 },
];

const UserItem = ({ name, username, level }) => {
  return (
    <Box maxW="90%" mx="auto">
      <Flex align="center" justify="space-between" mt={5}>
        <HStack>
          <Avatar />
          <VStack align="start">
            <Text color="black" fontWeight="bold">{name}, Lvl {level}</Text>
            <Text fontSize="sm" color="gray.500">{username}</Text>
          </VStack>
        </HStack>
      </Flex>
    </Box>
  );
};

const FriendItem = ({ name, username, level }) => {
  return (
    <Box maxW="90%" mx="auto">
      <Flex align="center" justify="space-between" mt={5}>
        <HStack>
          <Avatar />
          <VStack align="start">
            <Text color="black" fontWeight="bold">{name}, Lvl {level}</Text>
            <Text fontSize="sm" color="gray.500">{username}</Text>
          </VStack>
        </HStack>
        <IconButton icon={<AddIcon />} aria-label="Add Friend" />
      </Flex>
    </Box>
  );
};

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <Stack
      minH={"100vh"}
      bgImage="/TopupBG.png"
      bgSize="cover"
      bgPosition="center"
    >
      <Flex p="50px">
        <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%" h="100%">
          <Flex
            bg="rgba(255, 255, 255, 0.8)"
            p={10}
            borderRadius="2xl"
            boxShadow="md"
            mb={6}
            gap={3}
            direction="column"
            justify="center"  
            align="center"
            color="black"
          >
            <Avatar size="2xl" name="John Doe" />
            <Flex align="center" mt={4}>
              <Heading size="lg" fontWeight="bold">
                John Doe
              </Heading>
              <EditIcon ml={2} boxSize={6} />
            </Flex>

            <Text mt={5} fontSize="xl">
              Username: Johndoe234
            </Text>
            <Text fontSize="xl">Level: 30</Text>
            <Text fontSize="xl">Tournament won: 100</Text>

            <Stack spacing={6} mt={8} direction="row">
              <Button colorScheme="teal" size="lg">
                Save
              </Button>
              <Button variant="outline" size="lg">
                Cancel
              </Button>
            </Stack>
          </Flex>

          <Flex
            bg="rgba(255, 255, 255, 0.8)"
            p={10}
            borderRadius="2xl"
            boxShadow="md"
            mb={6}
            gap={3}
            direction="column"
          >
            <Tabs size="md" variant="enclosed">
              <TabList>
                <Tab
                 _selected={{ color: "white", bg: "blue.500" }} 
                 _hover={{ color: "black" }}
                 color="black"
                >Add Friends</Tab>
                <Tab
                 _selected={{ color: "white", bg: "blue.500" }} 
                 _hover={{ color: "black" }}
                 color="black"
                >Friend Lists</Tab>
              </TabList>
              <TabPanels>
              <TabPanel>
                  <Box mb={4}>
                    <SearchBar />
                  </Box>
                  <Box
                    maxH="400px" 
                    overflowY="auto"
                  >
                    {users.map((user, index) => (
                      <FriendItem
                        key={index}
                        name={user.name}
                        username={user.username}
                        level={user.level}
                      />
                    ))}
                  </Box>
                </TabPanel>

                <TabPanel>
                  <Box
                      maxH="400px" 
                      overflowY="auto"
                    >
                      {friends.map((user, index) => (
                        <UserItem
                          key={index}
                          name={user.name}
                          username={user.username}
                          level={user.level}
                        />
                      ))}
                    </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>

          </Flex>
        </Grid>
      </Flex>
    </Stack>
  );
};

export default ProfilePage;