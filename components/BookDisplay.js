import React from 'react';
import { Heading, NativeBaseProvider, Center, Text } from 'native-base';

export const BookDisplay = ({ route, navigation }) => {

  const { book } = route.params;
  return (
    <NativeBaseProvider>
      <Center >
        <Heading>{book.name}</Heading>
        <Text>
         {book.sum} 
       </Text>
      </Center>
    </NativeBaseProvider>
  );
}
