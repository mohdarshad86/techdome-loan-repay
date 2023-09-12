import { Box, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import Payment from './Payment';

const Payments =  ({ loan, userInfo, updateLoan }) => {
    const [isRepaymentsModalOpen, setIsRepaymentsModalOpen] = useState(false);
    const openRepaymentsModal = () => {
      setIsRepaymentsModalOpen(true);
    };
  
    const closeRepaymentsModal = () => {
      setIsRepaymentsModalOpen(false);
    };
  
  
  
    return (
      <Box p={4} borderWidth="1px" borderRadius="md">
        <Text>Amount: ${loan.amountRequired}</Text>
        <Text>Term: {loan.loanTerm} weeks</Text>
        <Text>Status: {loan.status}</Text>
        {
          loan && loan.status === 'APPROVED' && <Button colorScheme="teal" size="sm" onClick={openRepaymentsModal}>
            Loan Repayment
          </Button>}
        <Payment
          isRepaymentsModalOpen={isRepaymentsModalOpen}
          closeRepaymentsModal={closeRepaymentsModal}
          loan={loan}
          userInfo={userInfo}
          updateLoan={updateLoan}
        />
      </Box>
    )
  }

export default Payments


