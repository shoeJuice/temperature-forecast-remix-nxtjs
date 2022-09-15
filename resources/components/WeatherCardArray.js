import React from "react";
import { Box, Stack, useMediaQuery, Text, Spinner } from "@chakra-ui/react";
import MiniCard from "./MiniCard";

const WeatherCardArray = (props) => {
  const [fList, setfList] = React.useState([]);
  const [isPhoneDisplay] = useMediaQuery("(max-width: 420px)");
  const [isSurfaceDuo] = useMediaQuery(
    "only screen and (-webkit-min-device-pixel-ratio: 2.5)"
  );

  const initializeList = () => {
    setfList(props.sourceArray);
  };

  React.useEffect(() => {
    //getTemp()
    initializeList();
  }, [props.sourceArray, props.isLoading]);

  return props.sourceArray ? (
    <Stack
      textAlign="center"
      justifyContent="center"
      divider={isPhoneDisplay || isSurfaceDuo ? <></> : <></>}
      borderTop="1px solid white"
      borderBottom={isPhoneDisplay ? "none" : "1px solid white"}
      direction={
        isPhoneDisplay
          ? "column"
          : props.isLandscapeMode
          ? "row"
          : { base: "column", sm: "column", md: "row" }
      }
    >
      {Array.isArray(fList) ? (
        fList.map((id, key) =>
          key == 5 ? (
            <MiniCard
              isImperial={props.isImperial}
              key={key}
              needsDivider={false}
              temperature={id.tempMax}
              weather={id.weather.main}
              min={id.tempMin}
              day={id.parseDate()}
            />
          ) : (
            <MiniCard
              isImperial={props.isImperial}
              key={key}
              needsDivider={true}
              temperature={id.tempMax}
              weather={id.weather.main}
              min={id.tempMin}
              day={id.parseDate()}
            />
          )
        )
      ) : (
        <Text>Loading</Text>
      )}
    </Stack>
  ) : (
    <Box textAlign="center">
      <Spinner marginX="auto" />
    </Box>
  );
};

export default WeatherCardArray;
