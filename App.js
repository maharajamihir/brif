import React, { useState } from "react";
import { TouchableOpacity, View, Button } from 'react-native';
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
  ScrollView,
  Spacer,
  Pressable,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { bookList } from './model/bookData';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookDisplay } from './components/BookDisplay'
import { NavigationContainer } from "@react-navigation/native";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export const HomeView = ({ navigation }) => {
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
                <BookContainer book={book} navigation={navigation}/>
              ))
            }
          </Flex>
          <ToggleDarkMode />
        </VStack>
      </Center>
    </NativeBaseProvider>
  );

}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="Home"
          component={HomeView}
        //options={{ headerShown: false }}
        />
        <Stack.Screen name="Book" component={BookDisplay} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}


export const BookContainer = (props) => {
  const navigation = props.navigation;
  const book = props.book;
  return (
    <Pressable onPress={() => navigation.navigate('Book', book)}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            bg={isPressed ? "cyan.900" : isHovered ? "cyan.800" : "cyan.700"}
            p="5"
            rounded="8"
            w="200"
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
          >
            <HStack alignItems="flex-start">
              <Text fontSize={12} color="cyan.50" fontWeight="medium">
                {book.author}
              </Text>
              <Spacer />
              <Text fontSize={10} color="cyan.100">
                {/*added 1 month ago*/}
                {book.year}
              </Text>
            </HStack>
            <Text color="cyan.50" mt="3" fontWeight="medium" fontSize={20}>
              {book.title}
            </Text>
            <Text mt="2" fontSize={14} color="cyan.100">
              Unlock powerfull time-saving tools for creating email delivery and
              collecting marketing data
            </Text>
          </Box>
        )
      }}
    </Pressable>
  );
};

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
