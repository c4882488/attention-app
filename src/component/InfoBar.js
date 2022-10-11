import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Weather from "../../assets/svg/weather.svg";
// import * as Battery from 'expo-battery';
import moment from "moment";

function InfoBar() {
  // const [power, setPower] = useState(0);
  // const subscription = useRef();

  //   const subscribe = async () => {
  //     const BatteryStateEvent = await Battery.getBatteryStateAsync();;
  //     setPower(BatteryStateEvent);
  //     console.log(BatteryStateEvent);
  //     subscription = Battery.addBatteryStateListener((BatteryStateEvent) => {
  //       setPower(BatteryStateEvent.batteryState);
  //       console.log("batteryLevel changed!", BatteryStateEvent.batteryState);
  //     }).current;
  //   };

  // useEffect(() => {
  //   subscribe();
  //   return ()=>{
  //     subscription.remove().current;
  //     subscription = null;
  //   }
  // }, []);
  const [times, setTimes] = useState(moment().format("hh:mm"));
  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      setTimes(moment().format("hh:mm"));
    }, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, [times]);

  return (
    <View style={styles.infoBar}>
      <Text style={styles.infoClock}>{times}</Text>
      <View style={styles.infoContent}>
      <View style={styles.infoSkyIcon}>
        <Weather />
      </View>
      <Text style={styles.infoText}>
        天氣晴
      </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBar: {
    marginBottom: 90,
    alignItems: "center",
  },
  infoClock: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 8,
  },
  infoText: {
    color: "#fff",
    fontSize: 19,
    letterSpacing: 3,
  },
  infoContent: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  infoSkyIcon: {
    // marginHorizontal:6
    marginRight:7,
  },
});

export default InfoBar;
