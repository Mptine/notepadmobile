import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import type { ParamListBase } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NotepadItem } from "../components/NotepadItem";
import { api } from "../api";
import screens from "../screens.json";
import type { Notepad } from "../types";

const initialNotepads: Notepad[] = [];

export function NotepadList({
  navigation,
}: NativeStackScreenProps<ParamListBase>) {
  const [notepads, setNotepads] = useState(initialNotepads);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const { data } = await api.get<Notepad[]>("/notepads");
      setNotepads(data);
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <FlatList
        data={notepads}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => {
          return (
            <NotepadItem
              notepad={item}
              onPress={() => {
                navigation.navigate(screens.viewNotepad, {
                  id: item.id,
                });
              }}
            />
          );
        }}
      />
    </View>
  );
}
