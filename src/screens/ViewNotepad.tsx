import { useEffect, useState, useContext } from "react";
import { View, Button } from "react-native";
import styled from "styled-components/native";
import type { ParamListBase } from "@react-navigation/native";
import { Title } from "../components/Title";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { api } from "../api";
import type { Notepad } from "../types";
import screens from "../screens.json";
import Toast from "react-native-root-toast";

const initialNotepad: Notepad = {
  id: 0,
  title: "",
  subtitle: "",
  created_at: "",
  content: "",
  latitude: null,
  longitude: null,
};

const IdText = styled.Text`
  color: #121212;
  font-size: 14px;
`;

const DateText = styled.Text`
  color: #121212;
  font-size: 14px;
  margin-top: 8px;
`;

const Subtitle = styled.Text`
  font-size: 18px;
  color: #212121;
  margin-bottom: 8px;
`;

const Content = styled.Text`
  font-size: 16px;
  color: #212121;
`;

const Container = styled.View`
  flex: 1;
`;

const Coords = styled.Text`
  color: #212121;
  font-size: 14px;
  margin-top: 8px;
`;

export function ViewNotepad({
  navigation,
  route,
}: NativeStackScreenProps<any>) {
  const [notepad, setNotepad] = useState(initialNotepad);
  const id = route.params.id;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const { data } = await api.get<Notepad>(`/notepads/${id}`);
      setNotepad(data);
    });

    return unsubscribe;
  }, [id]);

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 8,
        }}>
        <Button
          title="Deletar"
          color="#831917"
          onPress={async () => {
            const { data } = await api.delete(`/notepads/${id}`);
            if (data.success) {
              Toast.show(
                "Note sucessfuly sent to the depths of hell!Ok, that was a little extreme, but the note is gone"
              );
              navigation.navigate(screens.notepadList);
            } else {
              Toast.show("Oops, something went wrong. Porbably your fault");
            }
          }}
        />
        <Button
          title="Editar"
          color="#212121"
          onPress={async () => {
            navigation.navigate(screens.editNotepad, {
              id,
            });
          }}
        />

        <Button
          title="Check on the map"
          color="#212121"
          onPress={() => {
            navigation.navigate(screens.home, {
              coords: {
                latitude: notepad.latitude,
                longitude: notepad.longitude,
              },
            });
          }}
        />
      </View>
      <IdText>#{id}</IdText>
      <DateText>{new Date(notepad.created_at).toLocaleDateString()}</DateText>
      <Title>{notepad.title}</Title>
      <Subtitle>{notepad.subtitle}</Subtitle>
      <Content>{notepad.content}</Content>
      <Coords>
        Latitude: {notepad.latitude} Longitude: {notepad.longitude}
      </Coords>
    </Container>
  );
}
