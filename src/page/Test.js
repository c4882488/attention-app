import React,{ useEffect } from 'react';
import {
  StyleSheet,
  Linking,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";

function Test() {
    const [text, setText] = React.useState("");

    useEffect(() => {
        console.log("change"+text);
    },[text])
    return (
      <View>
        <Text>ddds</Text>
        <TouchableOpacity
            onPress={() => {
                setText("aaa")
            }}
        >
          <Text>Click me</Text>
        </TouchableOpacity>
      </View>
    );
}

export default Test;