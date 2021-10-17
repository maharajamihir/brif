import React from 'react';
import { Heading, NativeBaseProvider, Center, Text } from 'native-base';

export const BookDisplay = ({ route, navigation }) => {

  const { book } = route.params;
  return (
    <NativeBaseProvider>
       <Center
            //_dark={{ bg: "blueGray.900" }}
            //_light={{ bg: "blueGray.50" }}
            px={10}
            //flex={1}
            >
        <Heading>{book.name}</Heading>
        <Text>
         {book.sum} 
       </Text>
      </Center>
    </NativeBaseProvider>
  );
}
