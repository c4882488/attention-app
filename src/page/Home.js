import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import React from "react";
import WarningsCircle from "../component/WarningsCircle";
import WarningsTitle from "../component/WarningsTitle";
import InfoBar from "../component/InfoBar";
import SlideUpScreen from "../component/SlideUpScreen";
import TestLocation from "../component/TestLocation"
import Counter from "../component/TestCounter";
import Ibeacons from "../ beacon"

export default function App() {
  const statue = useSelector((state) => state.status);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InfoBar />
        <TestLocation />
        {/* <Ibeacons /> */}
        {/* <Counter /> */}
        <WarningsCircle statue={statue} />
        <WarningsTitle statue={statue} />
      </View>
      <SlideUpScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -140,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#161515",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
});

