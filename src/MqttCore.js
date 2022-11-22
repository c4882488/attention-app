import Paho from "paho-mqtt";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { changeMqtt } from "./model/phoneConnectSlice";
import { statusColors } from "./../assets/colors/colors";
import { changeStatus } from "./model/statusSlice";
import * as Speech from "expo-speech";
import { addActivitys } from "./unit/AddActivitys";

client = new Paho.Client("172.29.11.159", Number(8080), "/ws", "60");

function MqttCore() {
  const dispatch = useDispatch();
  // const [value, setValue] = useState(0);

  function onMessage(message) {
    const data = JSON.parse(message.payloadString);
    // console.log(data["code"]);
    if (message.destinationName === "Try/MQTT") {
      if (data["code"] == 0) {
        dispatch(
          changeStatus({
            title: "執行中...",
            color: statusColors.zeroState,
            img: 0,
          })
        );
      }
      if (data["code"] == 21) {
        Speech.speak("注意路口行人");
        dispatch(
          changeStatus({
            title: "注意路口行人",
            color: statusColors.warning,
            img: 21,
          })
        );
        addActivitys("注意路口行人", "靠近", "warning");
      }
      if (data["code"] == 30) {
        Speech.speak("行人警示");
        dispatch(
          changeStatus({
            title: "行人警示",
            color: statusColors.error,
            img: 30,
          })
        );
        addActivitys("行人警示", "靠近", "error");
      }
      if (data["code"] == 31) {
        Speech.speak("車輛警示");
        dispatch(
          changeStatus({
            title: "車輛警示",
            color: statusColors.error,
            img: 31,
          })
        );
        addActivitys("車輛警示", "靠近", "error");
      }
    }
    //   setValue(message.payloadString);
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        dispatch(changeMqtt(1));
        // console.log("Connected!");
        client.subscribe("Try/MQTT");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        // console.log("Failed to connect!");
        dispatch(changeMqtt(-1));
      },
    });
  }, []);

  // function changeValue(c) {
  //   const message = new Paho.Message((value + 1).toString());
  //   message.destinationName = "mqtt-async-test/value";
  //   c.send(message);
  // }

  return (
    <></>
    // <View>
    //     <Text>Value is: {value}</Text>
    //     {/* <Button
    //     onPress={() => {
    //         changeValue(client);
    //     }}
    //     title="Press Me"
    //     /> */}
    // </View>
  );
}

export default MqttCore;