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
import {BookContainer, config} from '../App'

export const theme = extendTheme({ config });

export const ChapterContainer = ({ route, navigation }) => {
  const { colorMode, toggleColorMode } = useColorMode();
    const { book } = route.params;

    return (
      <NativeBaseProvider>
        <View>
            <Center
            //_dark={{ bg: "blueGray.900" }}
            //_light={{ bg: "blueGray.50" }}
            p={10}
            flex={1}
            >
                <VStack space={5} alignItems='center' width='100%' flex={1}>
                    <Heading size="lg">{book.name} chapter wise!</Heading>
                    <VStack width="100%" space={5} alignItems="center">
                    <Flex direction='row' flexWrap='wrap' justifyContent='space-between' padding={10} >
                        
                        <ScrollView style={{flexWrap: 'wrap', flex: 2}}>
                        <View style={styles.buttonContainer}>
                        {book.chaps.map((book) => (
                            <BookContainer book={book} navigation={navigation} />
                        ))}
                        </View>
                        </ScrollView> 
                        
                    </Flex>
                    </VStack>
                </VStack>
            </Center>
        </View>
      </NativeBaseProvider>
    );
  
  }

  const styles = StyleSheet.create({
    container:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
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
