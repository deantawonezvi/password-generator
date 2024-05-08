import React, { useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  Grid,
  Slider, SliderFilledTrack, SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import './App.css';
import { FaRegCopy } from 'react-icons/fa';
import { IoMdArrowForward } from 'react-icons/io';
import { theme } from './theme';



function App() {

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bg={'#131218'}>
        <Grid minH="100vh" p={3} placeItems="center">

          <VStack spacing={8} width={["100%", "80%", "60%", "40%", "30%"]}  align="start">
            <Box width="100%" textAlign="center">
              <Text fontSize='2xl' color={'#82808d'} >Password Generator</Text>
            </Box>
            <Box bg={'#24232b'} w='100%' p={4} color='white' >
              <FaRegCopy />
            </Box>
            <VStack bg={'#24232b'} w="100%" p={4} color="white" align="start" padding={5}>
              <br />
              <Slider aria-label="slider-ex-1" colorScheme='teal' defaultValue={10}>
                <SliderTrack bg={'#18171f'} borderRadius={0} height={1.5}>
                  <SliderFilledTrack borderRadius={0} />
                </SliderTrack>
                <SliderThumb boxSize={5} />
              </Slider>
              <br />
              <Checkbox colorScheme="green" color="white"
                         paddingY={1}>Include Uppercase letters</Checkbox>
              <Checkbox colorScheme="green"  color="white"
                         paddingY={1}>Include Lowercase letters</Checkbox>
              <Checkbox colorScheme="green" color="white"
                         paddingY={1}>Include Numbers</Checkbox>
              <Checkbox colorScheme="green" color="white"
                         paddingY={1}>Include Symbols</Checkbox>
              <br />
              <Button rightIcon={<IoMdArrowForward />} color={'black'} colorScheme="teal" width="100%"
                      borderRadius={0} padding={7} _hover={{ bg: 'teal.500' }}>
                GENERATE
              </Button>
            </VStack>

          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
