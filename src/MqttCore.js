import Paho from "paho-mqtt";

import { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View } from "react-native";

client = new Paho.Client("192.168.50.186", Number(8080), "/ws", "60");

function MqttCore() {

    const [value, setValue] = useState(0);

    function onMessage(message) {
    // console.log(message);
      if (message.destinationName === "Try/MQTT")
        setValue(message.payloadString);
    }

    useEffect(() => {
      client.connect({
        onSuccess: () => {
          console.log("Connected!");
          client.subscribe("Try/MQTT");
          client.onMessageArrived = onMessage;
        },
        onFailure: () => {
          console.log("Failed to connect!");
        },
      });
    }, []);

    // function changeValue(c) {
    //   const message = new Paho.Message((value + 1).toString());
    //   message.destinationName = "mqtt-async-test/value";
    //   c.send(message);
    // }

    return (
      <View>
        <Text>Value is: {value}</Text>
        {/* <Button
          onPress={() => {
            changeValue(client);
          }}
          title="Press Me"
        /> */}
      </View>
    );
}

export default MqttCore;