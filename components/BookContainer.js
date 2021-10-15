import React from "react";
import { Text, Icon, Box, Pressable, gradColors, Center, Heading, Example, HStack, Spacer, Flex } from "native-base";
export const BookContainer = (props) => {
  return (
    <Pressable>
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
                {props.author}
              </Text>
              <Spacer />
              <Text fontSize={10} color="cyan.100">
                added 1 month ago
              </Text>
            </HStack>
            <Text color="cyan.50" mt="3" fontWeight="medium" fontSize={20}>
              {props.title}
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
