"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  List,
  ListItem,
  Badge,
} from "@chakra-ui/react";
import { AddIcon, EmailIcon } from "@chakra-ui/icons";

export default function AddAdmin() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [invitedPeople, setInvitedPeople] = useState([]);
  const toast = useToast();
  const router = useRouter();

  // Combined fetch invited admins with useEffect
  useEffect(() => {
    const loadInvitedAdmins = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/me/invitee', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch invited admins');
        }

        const admins = await response.json();
        setInvitedPeople(admins); // Set the invited people
      } catch (error) {
        console.error("Error fetching invited admins:", error);
        setInvitedPeople([]); // Default to empty list on failure
      }
    };

    loadInvitedAdmins();
  }, []); // Load invited admins on component mount

  // Handle inviting a new admin
  const handleInvite = async (e) => {
    e.preventDefault();
    setIsInviting(true);

    try {
      const response = await fetch('http://localhost:8080/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }), // Send both username and email
      });

      if (!response.ok) {
        throw new Error('Failed to invite admin');
      }

      const result = await response.json();
      toast({
        title: "Invitation Sent",
        description: result.message || "Invitation sent successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Add the new invite to the list
      setInvitedPeople([
        ...invitedPeople,
        { id: String(Date.now()), email, username, isactive: false },
      ]);

      setEmail("");
      setUsername("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to send invitation",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="white">
      <Container maxW="container.xl" py={8}>
        <Button onClick={() => router.back()} colorScheme="blue" mb={10}>
          Back
        </Button>

        <VStack spacing={8} align="stretch" color="black">
          <Box bg="white" shadow="md" borderRadius="lg" p={6}>
            <Heading size="lg" mb={4}>
              Invite Admin
            </Heading>

            <form onSubmit={handleInvite}>
              <VStack my={5}>
                <Input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  mb={3}
                />
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </VStack>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isInviting}
                loadingText="Inviting"
                leftIcon={<AddIcon />}
              >
                Invite Admin
              </Button>
            </form>
          </Box>

          <Box bg="white" shadow="md" borderRadius="lg" p={6}>
            <Heading size="lg" mb={4}>
              People I Invited
            </Heading>

            <List spacing={5}>
              {invitedPeople.map((person) => (
                <ListItem key={person.id} mb={8}>
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text fontWeight="bold">{person.email}</Text>
                      <Badge colorScheme={person.isactive ? "green" : "yellow"}>
                        {person.isactive ? "Active" : "Waiting for confirmation"}
                      </Badge>
                    </Box>
                    <Button
                      leftIcon={<EmailIcon />}
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => console.log(`Resend invitation to ${person.email}`)}
                    >
                      Resend link email
                    </Button>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
}