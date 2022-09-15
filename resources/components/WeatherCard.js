import React from "react";
import { Box, Text, Flex, HStack, Spinner } from "@chakra-ui/react";
import { AdaptiveIcon } from "./AdaptiveIcon.js";

const WeatherCard = (props) => {
  return props.loading ? (
    <Box textAlign="center">
      <Spinner size="xl" />
    </Box>
  ) : (
    <Box>
      <Flex
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        paddingX={15}
        paddingBottom="1ex"
      >
        <AdaptiveIcon boxSize={10} weather={props.weatherDesc} />
        <Text>{`${props.weatherDesc}`}</Text>
        <Text fontWeight={10}>
          {`${props.tempCurrent}°${props.isImperial ? "F" : "C"}`}
        </Text>
        <HStack>
          <Text fontWeight={10}>
            {`High: ${props.tempMax}°${props.isImperial ? "F" : "C"}`}
          </Text>
          <Text color="#F7FAFC" fontWeight={10}>
            {`Low: ${props.tempMin}°${props.isImperial ? "F" : "C"}`}
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default WeatherCard;
