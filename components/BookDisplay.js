import React from 'react';
import { Heading, NativeBaseProvider, Center, Text } from 'native-base';

export const BookDisplay = ({ route, navigation }) => {

  const { author, title, year } = route.params;
  return (
    <NativeBaseProvider>
      <Center >
        <Heading> {title} - {author} </Heading>
        <Text>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </Text>
      </Center>
    </NativeBaseProvider>
  );
}
