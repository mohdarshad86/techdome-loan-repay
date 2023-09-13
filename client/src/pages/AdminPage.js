import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Divider,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AdminPage = () => {
  const [allLoans, setAllLoans] = useState([]);

  const navigate = useNavigate();

  let userInfo = localStorage.getItem('userInfo');
  userInfo = JSON.parse(userInfo);
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  const getAllUsers = async () => {
    const response = await axios.get(`${BASE_URL}/api/loan/allUser`, config);
    setAllLoans(response.data);
  }

  const updateLoan = (loanId) => {
    const updatedLoans = allLoans.map((loan) => {
      if (loan._id === loanId) {
        loan.status = 'APPROVED';
        return loan;
      }
      else return loan
    });

    setAllLoans(updatedLoans);
  }

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, [])

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    navigate('/')
  }

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="xl">
          Admin Page
        </Heading>
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
            All Loans
          </Heading>
          {allLoans.map((loan) => (
            <LoanDetails key={loan._id} loan={loan} userInfo={userInfo} updateLoan={updateLoan} />
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

export default AdminPage;

const LoanDetails = ({ loan, userInfo, updateLoan }) => {

  const handleApproveLoan = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const response = await axios.put(`${BASE_URL}/api/loan/approve/${loan._id}`, {}, config);

    if (response) updateLoan(loan._id)
  }

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Text>Name: {loan.userId.name}</Text>
      <Text>Email: {loan.userId.email}</Text>
      <Text>Amount: ${loan.amountRequired}</Text>
      <Text>Term: {loan.loanTerm} weeks</Text>
      <Text>Status: {loan.status}</Text>
      {
        loan && loan.status === 'PENDING' && <Button colorScheme="teal" size="sm" onClick={handleApproveLoan}>
          Approve Loan
        </Button>}
    </Box>
  )
}