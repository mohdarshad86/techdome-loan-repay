import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from "react-router";
import axios from 'axios'

const SignUp = () => {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const nevigate = useNavigate();

    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmpassword, setConfirmPassword] = useState()


    const submitHandler = async () => {
        if (!name || !email || !phone || !password || !confirmpassword) {
            toast({
                title: "Please Fill all the mendatory Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post("http://localhost:3001/api/user",
                {
                    name,
                    email,
                    password,
                    phone
                },
                config);

            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            nevigate("/profile");
            window.location.reload();
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };


    return <VStack spacing='5px'>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter Your Name'
                onChange={(e) => setName(e.target.value)}
            />

        </FormControl>
        <FormControl id='phone' isRequired>
            <FormLabel>Phone</FormLabel>
            <Input placeholder='Enter Your Phone'
                onChange={(e) => setPhone(e.target.value)}
            />

        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your Email'
                onChange={(e) => setEmail(e.target.value)}
            />

        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                    type={show ? "text" : 'password'}
                    placeholder='Enter Your Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input
                    type={show ? "text" : 'password'}
                    placeholder='Enter Your Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button
            colorScheme='blue'
            width='100%'
            style={{ marginTop: 15 }}
            onClick={submitHandler}
        >
            SignUp
        </Button>
    </VStack>
}

export default SignUp