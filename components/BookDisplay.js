import React from 'react';
import { Heading, NativeBaseProvider, Center, Text } from 'native-base';

export const BookDisplay = ({ route, navigation }) => {

  const { name, sum} = route.params;
  return (
    <NativeBaseProvider>
      <Center >
        <Heading>{name}</Heading>
        <Text>
         {sum} 
       </Text>
      </Center>
    </NativeBaseProvider>
  );
}
