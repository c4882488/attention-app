import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from "expo-navigation-bar";
import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./src/model/store";
import Routers from "./Router";
import * as Localization from "expo-localization";

// const store = configureStore();


export default function App() {
  // NavigationBar Setting
  // NavigationBar.setPositionAsync("absolute");
  Localization.timezone = "Asia/Taipei";
  NavigationBar.setBackgroundColorAsync("#353945");

  return (
    <>
      <Provider store={store}>
        <StatusBar style="light" translucent={true} backgroundColor="#161515" />
        <Routers />
      </Provider>
    </>
  );
}
