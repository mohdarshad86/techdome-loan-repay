import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const LoanForm = ({ userInfo, closeLoanForm, addLoan }) => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmitLoan = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const data = {
      amountRequired: amount,
      loanTerm: term
    }

    const response = await axios.post(`${BASE_URL}/api/loan/create`, data, config);
    addLoan(response.data.loan)
    if (response) closeLoanForm();
    
  };

  return (
    <Box>
      <Heading as="h2" size="xl" mb={6}>
        Loan Application
      </Heading>
      <form onSubmit={handleSubmitLoan}>
        <FormControl>
          <FormLabel>Amount Required</FormLabel>
          <Input
            type="number"
            placeholder="Enter loan amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Loan Term (in weeks)</FormLabel>
          <Input
            type="number"
            placeholder="Enter loan term"
            value={term}
            onChange={handleTermChange}
            required
          />
        </FormControl>
        <Button mt={6} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default LoanForm;
