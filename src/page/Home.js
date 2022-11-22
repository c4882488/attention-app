import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import React from "react";
import WarningsCircle from "../component/WarningsCircle";
import WarningsTitle from "../component/WarningsTitle";
import InfoBar from "../component/InfoBar";
import SlideUpScreen from "../component/SlideUpScreen";
import TestLocation from "../component/TestLocation"
// import Counter from "../component/TestCounter";
// import Ibeacons from "../Ibeacon";
import MqttCore from "../MqttCore";
import { useEffect } from "react";
import { changeStatus } from "../model/statusSlice";
import { statusColors } from "../../assets/colors/colors";

export default function App() {
  const dispatch = useDispatch();
  const statue = useSelector((state) => state.status);
  const phoneConnec = useSelector((state) => state.phoneConnec);

  useEffect(() => {
    console.log(phoneConnec);
    if(phoneConnec.location == 1 && phoneConnec.mqtt == 1){
      dispatch(
        changeStatus({
          title: "執行中...",
          color: statusColors.zeroState,
          img: 0,
        })
      );
    }else{
      dispatch(
        changeStatus({
          title:
            phoneConnec.location == 0
              ? "連接失敗 code:i01"
              : "連接失敗 code:w01",
          color: statusColors.unconnect,
          img: -1,
        })
      );
    }
  }, [phoneConnec]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InfoBar />
        <TestLocation />
        <MqttCore />
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

