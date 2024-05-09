import React, { useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider, Checkbox,
  Grid, HStack,
  Slider, SliderFilledTrack, SliderThumb,
  SliderTrack,
  Text, Tooltip,
  VStack,
} from '@chakra-ui/react';
import './App.css';
import { FaRegCopy } from 'react-icons/fa';
import { IoMdArrowForward } from 'react-icons/io';
import { theme } from './theme';



function App() {

  const [passwordLength, setPasswordLength] = useState(10);
  const [password, setPassword] = useState('');

  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const generatePassword = () => {
    const numbers = '0123456789';
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%^&*()_+=-';

    let passwordCharacters = '';

    if (includeUppercase) passwordCharacters += uppercaseLetters;
    if (includeLowercase) passwordCharacters += lowercaseLetters;
    if (includeNumbers) passwordCharacters += numbers;
    if (includeSymbols) passwordCharacters += symbols;

    let password = '';
    if (passwordCharacters === '') {
      return 'Please select at least one character type.';
    }
    for (let i = 0; i < passwordLength; i++) {
      const index = Math.floor(Math.random() * passwordCharacters.length);
      password += passwordCharacters[index];
    }

    return password;
  };

  function calculatePasswordStrength(password) {
    let strength = 0;

    if (/[A-Z]/.test(password)) strength++; // check for uppercase letters
    if (/[a-z]/.test(password)) strength++; // check for lowercase letters
    if (/\d/.test(password)) strength++; // check for numbers
    if (/\W/.test(password)) strength++; // check for symbols

    if (password.length > 10) strength++; // check for length

    switch (strength) {
      case 1: return 'EASY';
      case 2: return 'FAIR';
      case 3: return 'MEDIUM';
      case 4: return 'MEDIUM'
      case 5: return 'HARD';
      default: return '';
    }
  }

  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = async () => {
    try {
      if(!password) return;
      await navigator.clipboard.writeText(password);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy password: ', err);
    }
  }


      return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bg={'#131218'}>
        <Grid minH="100vh" p={3} placeItems="center">

          <VStack spacing={8} width={["100%", "80%", "60%", "40%", "30%"]}  align="start">
            <Box width="100%" textAlign="center">
              <Text fontSize='2xl' color={'#82808d'} >Password Generator</Text>
            </Box>
            <Box bg={'#24232b'} w='100%' p={5} color='white'>
              <HStack justifyContent="space-between">
                <Text fontSize='2xl' width={'90%'} textAlign='start'>{password}</Text>
                <Tooltip label={isCopied ? "Copied!" : "Copy to clipboard"}>
                  <Box onClick={() => copyToClipboard()}>
                    <FaRegCopy color={'#a4ffaf'} onClick={() => copyToClipboard()} />
                  </Box>
                </Tooltip>
              </HStack>
              {isCopied && <Text color={'#a4ffaf'}>Copied!</Text>}
            </Box>
            <VStack bg={'#24232b'} w="100%" p={4} color="white" align="start" padding={5}>
              <Box width={'100%'}>
                <HStack justifyContent="space-between">
                  <Text fontSize='md'>Character Length</Text>
                  <Text fontSize='3xl'>{passwordLength}</Text>
                </HStack>
              </Box>

              <br />
              <Slider aria-label="slider-ex-1" colorScheme='teal'
                      min={5} max={30}
                      value={passwordLength}
                      onChange={(val) => setPasswordLength(val)}>
                <SliderTrack bg={'#18171f'} borderRadius={0} height={1.5}>
                  <SliderFilledTrack borderRadius={0} />
                </SliderTrack>
                <SliderThumb boxSize={5} />
              </Slider>
              <br />
              <Checkbox colorScheme="teal" color="white"
                        paddingY={1} iconColor='black' iconSize='1rem'
                        isChecked={includeUppercase}
                        onChange={(e) => setIncludeUppercase(e.target.checked)}>
                Include Uppercase letters
              </Checkbox>
              <Checkbox colorScheme="teal"  color="white"
                        paddingY={1} iconColor='black' iconSize='1rem'
                        isChecked={includeLowercase}
                        onChange={(e) => setIncludeLowercase(e.target.checked)}>
                Include Lowercase letters
              </Checkbox>
              <Checkbox colorScheme="teal" color="white"
                        paddingY={1} iconColor='black' iconSize='1rem'
                        isChecked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}>
                Include Numbers
              </Checkbox>
              <Checkbox colorScheme="teal" color="white"
                        paddingY={1} iconColor='black' iconSize='1rem'
                        isChecked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}>
                Include Symbols
              </Checkbox>
              <br />
              <Box bg={'#18171f'} width={'100%'} padding={5}>
                <HStack justifyContent='space-between'>
                  <Text fontSize='sm' color={'#74737f'}>STRENGTH</Text>
                  <Text fontSize='xl' color={'white'}>{passwordStrength}</Text>
                </HStack>
              </Box>
              <br/>
              <Button rightIcon={<IoMdArrowForward />} color={'black'} colorScheme="teal" width="100%"
                      borderRadius={0} padding={7} _hover={{ bg: 'teal.500' }} onClick={() => {
                const newPassword = generatePassword();
                setPassword(newPassword);
                setPasswordStrength(calculatePasswordStrength(newPassword));
              }}>
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
