import React, { useState } from "react";
import { StyleSheet, View, Button } from 'react-native';
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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookDisplay } from './components/BookDisplay'
import { NavigationContainer } from "@react-navigation/native";
import { ChapterContainer } from "./components/ChapterContainer";
import { backgroundColor } from "styled-system";

// Define the config
export const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export const HomeView = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [bookList, setBookList] = useState(null);

  const fetchData = (text) => {
    const url = 'https://brif-backend.herokuapp.com/get-sum'
    //const url  = 'http://localhost:5000/get-sum'
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        title: text
      })
    }).then(response => response.json())
      .then(data => setBookList(data))
      .then(books => console.log("Received data for Book List: " + JSON.stringify(bookList[0])))
      .catch(error => console.log(error))
      .then(l => { return l });
  }

  return (
    <NativeBaseProvider>
    <View>
      <Center
        //_dark={{ bg: "blueGray.900" }}
        //_light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
        pt={20}
      >
        <VStack space={5} alignItems='center' width='100%' flex={1}>
          <View style={{top: 20, right: 5}}>
          </View>
          <View style={styles.container}>
          {searchText ? null : <NativeBaseIcon/>}
          <Heading size="lg">Welcome to brif</Heading>
          {/* Search */}
          <VStack
            space={5}
            p={5}
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
                _hover={{ bg: 'white', borderWidth: 1 }}
                borderWidth="1"
                borderColor="#000"
                _web={{
                  _focus: { style: { boxShadow: 'none' }, bg: 'gray.200' },
                }}
                onChangeText={(text) => {
                  setSearchText(text);
                  fetchData(text);
                }}
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

          
            <Flex direction='row' flexWrap='wrap' justifyContent='space-between' px={20} >
              {!searchText ?
                <HStack space={2} alignItems="center">
                  <Text>Search for a book to get its summary.</Text>
                </HStack>
                :
                !bookList ?  
                <Text>Loading...</Text> : 
                <ScrollView style={{flexWrap: 'wrap', flex: 2}}>
                <View style={styles.buttonContainer}>
                {bookList.map((book) => (
                  <BookContainer book={book} navigation={navigation} />
                ))}
                </View>
                </ScrollView> 
              }
            </Flex>
          </View>
        </VStack>
      </Center>
      </View>
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
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Book" component={BookDisplay} />
        <Stack.Screen name="Chapters" component={ChapterContainer}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export const BookContainer = (props) => {
  const navigation = props.navigation;
  const book = props.book;
  const navigateTo = book.chaps ? 'Chapters' : 'Book';
  return (
    <Pressable onPress={() => navigation.navigate(navigateTo, {book: book})}>
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
              margin: 10,
            }}
          >
            <HStack alignItems="flex-start">
              <Text fontSize={12} color="cyan.50" fontWeight="medium">
                {book.name}
              </Text>
              <Spacer />
              <Text fontSize={10} color="cyan.100">
                {/*added 1 month ago*/}
                {book.year}
              </Text>
            </HStack>
            <Text color="cyan.50" mt="3" fontWeight="medium" fontSize={20}>
              {book.name}
            </Text>
            <Text mt="2" fontSize={14} color="cyan.100">
            {book.chaps ? "Chapterwise summary of " : "Summary of "}{book.name}!
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


const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    marginHorizontal: 20,
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: 'teal',
  },
  input: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer:{
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10
  },
});
