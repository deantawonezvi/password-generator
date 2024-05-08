import React, { useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  extendTheme,
  Grid,
  Slider, SliderFilledTrack, SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import './App.css';
import { FaRegCopy } from 'react-icons/fa';
import { IoMdArrowForward } from 'react-icons/io';

const theme = extendTheme({
  colors: {
    teal: {
      500: '#a4ffaf',
    },
  },
});

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bg={'#131218'}>
        <Grid minH="100vh" p={3} placeItems="center">

          <VStack spacing={8} width={["100%", "80%", "60%", "40%", "30%"]}  align="start">
            <Box width="100%" textAlign="center">
              <Text fontSize='2xl' color={'#82808d'} fontFamily={'JetBrainsMono Bold'}>Password Generator</Text>
            </Box>
            <Box bg={'#24232b'} w='100%' p={4} color='white' fontFamily={'JetBrainsMono Bold'}>
              <FaRegCopy />
            </Box>
            <VStack bg={'#24232b'} w="100%" p={4} color="white" align="start" padding={5}>
              <br />
              <Slider aria-label="slider-ex-1" colorScheme='teal' defaultValue={30}>
                <SliderTrack bg={'black'}>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <br />
              <Checkbox colorScheme="green" color="white"
                        fontFamily={'JetBrainsMono Bold'} paddingY={1}>Include Uppercase letters</Checkbox>
              <Checkbox colorScheme="green"  color="white"
                        fontFamily={'JetBrainsMono Bold'} paddingY={1}>Include Lowercase letters</Checkbox>
              <Checkbox colorScheme="green" color="white"
                        fontFamily={'JetBrainsMono Bold'} paddingY={1}>Include Numbers</Checkbox>
              <Checkbox colorScheme="green" color="white"
                        fontFamily={'JetBrainsMono Bold'} paddingY={1}>Include Symbols</Checkbox>
              <br />
              <Button rightIcon={<IoMdArrowForward />} color={'black'} colorScheme="teal" width="100%"
                      fontFamily={'JetBrainsMono Bold'} borderRadius={0} padding={7} _hover={{ bg: 'teal.500' }}>
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
