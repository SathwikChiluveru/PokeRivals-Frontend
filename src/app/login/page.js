"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from 'next/head'; 
import { GoogleLogin } from "@react-oauth/google";
import {
    Box,
    Flex,
    Text,
    Heading,
    Stack,
    Image,
    useToast,
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Textarea,
} from "@chakra-ui/react";

export default function Login() {
    const toast = useToast();
    const router = useRouter();

    const [isNewUser, setIsNewUser] = useState(false); // To control the modal visibility
    const [userName, setUserName] = useState(""); // To store the username input
    const [description, setDescription] = useState(""); // To store the username input
    const [idToken, setIdToken] = useState(""); // Store the Google credentials
    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal control

    // Google login
    const handleGoogleLogin = async (credentialResponse) => {
        console.log(credentialResponse);
        const idToken = credentialResponse.credential;
        setIdToken(idToken); // Save the credentials for registration later

        // Send the ID token to the backend
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    credentials: idToken,
                }),
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Login successful:", data);
            console.log("User role:", data.role);

            // Case 1: User is already registered
            toast({
                title: "Login Success",
                description: `Welcome ${data.username}!`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });

            // Redirect to admin dashboard
            if (data.role === "ADMIN") {
                router.push("/admin-home");
            }
            // Redirect to player dashboard
            else if (data.role === "PLAYER") {
                router.push("/find-tournament");
            }
        } catch (error) {
            console.error("Login failed", error);

            // Open the modal for new user registration
            setIsNewUser(true);
            onOpen();
        }
    };

    // Case 2: User is not registered
    const handleRegistration = async () => {
        console.log(userName);
        console.log(idToken);

        try {
            const response = await fetch("http://localhost:8080/player", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    player: {
                        username: userName,
                        description: description,
                    },
                    credentials: idToken,
                }),
            });

            if (!response.ok) {
                throw new Error(`Registration failed: ${response.statusText}`);
            }

            // Since backend returns plain text, use response.text() to parse
            const message = await response.text();

            toast({
                title: "Registration Successful",
                description: message,
                status: "success",
                duration: 9000,
                isClosable: true,
            });

            router.push("/find-tournament");
        } catch (error) {
            console.error("Registration failed", error);
            toast({
                title: "Registration Failed",
                description: "Please try again.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Stack maxH={"100vh"} direction={{ base: "column", md: "row" }} bg="white">
                <Flex flex={1} w={"full"}>
                    <Image
                        alt={"Login Image"}
                        objectFit={"cover"}
                        width={"inherit"}
                        minH={"83.5vh"}
                        src={"/PokeRegistration.png"}
                    />
                </Flex>

                <Flex p={5} flex={1} align={"center"} justify={"center"}>
                    <Stack spacing={3} w={"full"} maxW={"md"}>
                        <Box align={"center"} justify={"center"} mb={8}>
                            <Image
                                src={"/PokeLogo.png"}
                                alt={"Login Image"}
                                width={"400px"}
                                height={"auto"}
                            />
                        </Box>

                        <Heading fontSize={"4xl"} align={"center"} color="black" mb={10}>
                            Login
                        </Heading>

                        <Text fontSize={"sm"} color={"gray.600"} textAlign={"center"}>
                            Admin | Players
                        </Text>

                        {/* Google login */}
                        <Flex justify="center" align="center">
                            <GoogleLogin onSuccess={handleGoogleLogin} useOneTap />

                            {/* Modal for new user registration */}
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader color="black">
                                        Looks like you do not have an account...
                                    </ModalHeader>
                                    <ModalBody color="black">
                                        <p>Do you want to register as a player?</p>
                                        <Input
                                            placeholder="Enter your username"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            mt={4}
                                        />
                                        <Textarea
                                            placeholder="Enter your description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            mt={4}
                                            size="sm"
                                        />
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme="blue" onClick={handleRegistration}>
                                            Register!
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Flex>
                    </Stack>
                </Flex>
            </Stack>
        </>
    );
}