import React, { useEffect } from 'react';
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../componets/Authentication/Login';
import SignUp from '../componets/Authentication/SignUp';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const nevigate = useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (userInfo && userInfo.role === 'Admin') {
      nevigate('/admin')
    }
    else if (userInfo && userInfo.role === 'Customer') {
      nevigate('/profile')
    }
    else {
      nevigate('/')
    }
  }, [nevigate]);

  return <Container maxW="xl" centerContent>
    <Box
      display="flex"
      justifyContent="centre"
      p={3}
      bg={"white"}
      w={"100%"}
      m="40px 0 15px 0"
      borderRadius="1g"
      borderWidth="1px"
    >
      <Text fontSize="4xl" fontWeight='bold' fontFamily="work sans" color="black" marginLeft="160px">Loan APP</Text>
    </Box>
    <Box bg='white' w='100%' p={4} borderRadius='1g' borderWidth='1px'>
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList mb='1em'>
          <Tab width='50%'>Login</Tab>
          <Tab width='50%'>SignUp</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </Container>
}

export default HomePage