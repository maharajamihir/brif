import React, { useState } from "react";
import { View } from 'react-native';
import {
  Box,
  Divider,
  Input,
  Icon,
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
  Flex,
  Spacer,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { BookContainer } from './components/BookContainer';
import { bookList } from './model/bookData';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  const [searchText, setSearchText] = useState(null);

  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <VStack space={5} alignItems="center" width='80%'>
          <NativeBaseIcon />
          <Heading size="lg">Welcome to brif</Heading>

          {/* Search */}
          <VStack
            space={5}
            width="100%"
            divider={
              <Box px="2">
                <Divider />
              </Box>
            }>
            <VStack width="100%" space={5} alignItems="center">
              <Input
                placeholder="Search"
                color='black'
                variant="filled"
                width="100%"
                bg="gray.100"
                borderRadius="10"
                py="1"
                px="2"
                placeholderTextColor="gray.500"
                _hover={{ bg: 'gray.200', borderWidth: 0 }}
                borderWidth="0"
                _web={{
                  _focus: { style: { boxShadow: 'none' } },
                }}
                onChangeText={setSearchText}
                InputLeftElement={
                  <Icon
                    ml="2"
                    size="5"
                    color="gray.500"
                    as={<Ionicons name="ios-search" />}
                  />
                }
              />
            </VStack>
          </VStack>

          <Flex direction='row' flexWrap='wrap' justifyContent='space-between' padding={10} >
            {!searchText ?
              <HStack space={2} alignItems="center">
                <Text>Search for a book to get its summary.</Text>
              </HStack>

              :
              bookList.map((book) => (
                <BookContainer author={book.author} title={book.title} year={book.year} />
              ))

            }
          </Flex>
          <ToggleDarkMode />
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
