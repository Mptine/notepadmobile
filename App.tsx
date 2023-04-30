import { StyleSheet, Text, View, Image, Button } from "react-native";
import {
  NavigationContainer,
  NavigationRouteContext,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import screens from "./src/screens.json";
import { Home } from "./src/screens/Home";
import { CreateNotepad } from "./src/screens/CreateNotepad";
import { EditNote } from "./src/screens/EditNote";
import { ViewNotepad } from "./src/screens/ViewNotepad";
import { NotepadList } from "./src/screens/NotepadList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { api } from "./api";
import { useState, useEffect } from "react";
import { Loader } from "./src/components/Loader";
import { AppStateContext, initialAppStateContext } from "./src/AppStateContext";
import { RootSiblingParent } from "react-native-root-siblings";

const Drawer = createDrawerNavigator();

export default function App() {
  const [appState, setAppState] = useState(initialAppStateContext);

  useEffect(() => {
    const interceptorRequest = api.interceptors.request.use((config) => {
      setAppState({
        loading: true,
      });
      return config;
    });

    const interceptorResponse = api.interceptors.response.use((config) => {
      setAppState({
        loading: false,
      });
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptorRequest);
      api.interceptors.response.eject(interceptorResponse);
    };
  }, []);

  return (
    <RootSiblingParent>
      <AppStateContext.Provider value={appState}>
        <Loader loading={appState.loading} />
        <NavigationContainer>
          <Drawer.Navigator initialRouteName={screens.home}>
            <Drawer.Screen
              name={screens.home}
              component={Home}
              options={{
                drawerIcon({ color, size }) {
                  return <FontAwesome name="home" color={color} size={size} />;
                },
              }}
            />
            <Drawer.Screen
              name={screens.viewNotepad}
              component={ViewNotepad}
              options={{
                drawerItemStyle: {
                  display: "none",
                },
                drawerIcon({ size, color }) {
                  return (
                    <FontAwesome name="sticky-note" size={size} color={color} />
                  );
                },
              }}
            />
            <Drawer.Screen
              name={screens.createNotepad}
              component={CreateNotepad}
              options={{
                drawerIcon({ size, color }) {
                  return (
                    <MaterialIcons name="note-add" size={size} color={color} />
                  );
                },
              }}
            />
            <Drawer.Screen
              name={screens.editNotepad}
              component={EditNote}
              options={{
                drawerItemStyle: {
                  display: "none",
                },
                drawerIcon({ size, color }) {
                  return (
                    <MaterialCommunityIcons
                      name="note-edit"
                      size={size}
                      color={color}
                    />
                  );
                },
              }}
            />
            <Drawer.Screen
              name={screens.notepadList}
              component={NotepadList}
              options={{
                drawerIcon({ color, size }) {
                  return (
                    <FontAwesome name="list-alt" size={size} color={color} />
                  );
                },
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </AppStateContext.Provider>
    </RootSiblingParent>
  );
}
