import { useEffect, useState } from "react";
import * as Location from "expo-location";
import styled from "styled-components";
import { StyleSheet, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, MapMarker } from "react-native-maps";
import type { ParamListBase } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { api } from "../api";
import type { Notepad } from "../types";
import screens from "../screens.json";
import Toast from "react-native-root-toast";

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
`;

const initialNotepads: Notepad[] = [];

type Coords = {
  latitude: number | null;
  longitude: number | null;
};

const initialRegion = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const notepadIcon = require("../../assets/icon.png");

function delay(seconds) {
  console.log("delay called");
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function Home({ navigation, route }: NativeStackScreenProps<any>) {
  console.log("Home called");
  const coords = route.params?.coords;
  const [notepads, setNotepads] = useState(initialNotepads);
  const [region, setRegion] = useState(initialRegion);
  console.log(region);
  console.log(notepads);

  useEffect(() => {
    console.log("uE1 started");
    Location.requestForegroundPermissionsAsync().then(async (response) => {
      if (response.status === "granted") {
        await delay(2);
        const position = await Location.getCurrentPositionAsync();
        setRegion({
          ...region,
          ...position.coords,
        });
      } else {
        Toast.show("This app requires geolocation permission!");
      }
      console.log("uE1 finished");
    });

    const unsubscribe = navigation.addListener("focus", async () => {
      const { data } = await api.get<Notepad[]>("/notepads");
      setNotepads(data);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("uE2 started");
    if (
      coords !== undefined &&
      coords.latitude !== null &&
      coords.longitude !== null
    ) {
      setRegion({
        ...region,
        ...coords,
      });
      console.log("uE2 True");
    }
    console.log("uE2 False");
  }, [coords]);

  return (
    <Container>
      {console.log(styles.map, PROVIDER_GOOGLE, region, notepads)}
      <MapView
        onLongPress={(event) => {
          const coords = event.nativeEvent.coordinate;
          navigation.navigate(screens.createNotepad, {
            coords,
          });
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation>
        {notepads
          .filter(
            ({ latitude, longitude }) => latitude !== null && longitude !== null
          )
          .map(({ latitude, longitude, id }) => (
            <MapMarker
              onPress={() => {
                navigation.navigate(screens.viewNotepad, {
                  id,
                });
              }}
              key={id}
              coordinate={{
                latitude,
                longitude,
              }}>
              <Image
                source={notepadIcon}
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                }}
              />
            </MapMarker>
          ))}
      </MapView>
    </Container>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
