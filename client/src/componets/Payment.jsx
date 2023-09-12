import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'

const Payment = ({ isRepaymentsModalOpen, closeRepaymentsModal, loan, userInfo, updateLoan }) => {

    const handlePayLoan = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      console.log(config);
      const response = await axios.post(`http://localhost:3001/api/loan/repay/${loan._id}`, { amount: loan.amountRequired }, config);
      console.log(response.data);
      updateLoan(response.data.loan);
    }
  
    return (
      <Modal isOpen={isRepaymentsModalOpen} onClose={closeRepaymentsModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scheduled Repayments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loan.scheduledRepayments.map((payment) => (
              <Box key={payment._id} p={4} borderWidth="1px" borderRadius="md">
                <Text>Amount: ${payment.amount}</Text>
                <Text>Due Date: {new Date(payment.date).toDateString()}</Text>
                <Text>Status: {payment.status}</Text>
                {payment && payment.status === 'PENDING' &&
                  <Button colorScheme="teal" size="sm" onClick={handlePayLoan}>
                    Pay Now
                  </Button>
                }
              </Box>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={closeRepaymentsModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

export default Payment