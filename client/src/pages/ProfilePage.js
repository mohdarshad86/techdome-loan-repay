import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Divider,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import LoanForm from '../componets/LoanForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Payments from '../componets/Payments';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Profile = () => {
  const [loans, setLoans] = useState([])
  const [isLoanFormOpen, setIsLoanFormOpen] = useState(false);

  const navigate = useNavigate();

  let userInfo = localStorage.getItem('userInfo');
  userInfo = JSON.parse(userInfo);
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  const getLoans = async () => {

    const response = await axios.get(`${BASE_URL}/api/loan/user`, config);
    setLoans(response.data);
  }

  const addLoan = (loan) => {
    setLoans([...loans, loan])
  }

  const updateLoan = (newLoan) => {
    const updatedLoans = loans.map((loan) => loan._id === newLoan._id ? newLoan : loan);
    setLoans(updatedLoans);
  }

  useEffect(() => {
    getLoans()
    // eslint-disable-next-line
  }, [])


  const openLoanForm = () => {
    setIsLoanFormOpen(true);
  };

  const closeLoanForm = () => {
    setIsLoanFormOpen(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    navigate('/')
  }

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="xl">
          {userInfo.name}'s Profile
        </Heading>
        <Button colorScheme="teal" onClick={openLoanForm}>
          Apply for Loan
        </Button>
      </Flex>
      <VStack spacing={4} align="stretch">
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            User Details
          </Heading>
          <Text>Name: {userInfo.name}</Text>
          <Text>Email: {userInfo.email}</Text>
          <Button colorScheme="teal" size="sm" mt={4} onClick={handleLogOut}>
            LogOut
          </Button>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Your Loans
          </Heading>
          {loans.map((loan) => (
            <Payments
              key={loan._id}
              loan={loan}
              userInfo={userInfo}
              updateLoan={updateLoan} />
          ))}
        </Box>
        <Modal isOpen={isLoanFormOpen} onClose={closeLoanForm} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Apply for Loan</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <LoanForm
                userInfo={userInfo}
                closeLoanForm={closeLoanForm}
                addLoan={addLoan}
              />
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default Profile;
