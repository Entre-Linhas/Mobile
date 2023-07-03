import { NativeBaseProvider, StorageManager, ColorMode, } from "native-base";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let getTheming = await AsyncStorage.getItem("@color-mode");
      NavigationBar.setBackgroundColorAsync(getTheming == "dark" ? "#27272a" : "#ffffff");
      NavigationBar.setButtonStyleAsync(getTheming == "light" ? "dark" : "light");
      StatusBar.setBarStyle(getTheming == "dark" ? "light-content" : "dark-content");

      return getTheming === "dark" ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  },
  set: async (theme: ColorMode) => {
    try {
      await AsyncStorage.setItem("@color-mode", theme || "light");
      NavigationBar.setBackgroundColorAsync(theme == "dark" ? "#27272a" : "#ffffff");
      NavigationBar.setButtonStyleAsync(theme == "light" ? "dark" : "light")
      StatusBar.setBarStyle(theme == "dark" ? "light-content" : "dark-content");
      console.log("Tema: " + theme);
    } catch (e) {
      console.log(e);
    }
  },
};