import React from 'react'
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";

function About() {
    return (
      <View style={styles.content}>
        {/* <StatusBar style="light" translucent={true} backgroundColor="#353945" /> */}
        <Text color="#fff">我們是ㄍ科大</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  homeBar: {
    backgroundColor: "#161515",
    elevation: 0,
  },
  subPageBar: {
    backgroundColor: "#353945",
    elevation: 0,
  },
  whiteText: {
    color: "#fff",
  },
  content: {
    alignItems: "center",
    // justifyContent: "center",
    flex: 1,
    backgroundColor: "#3C4254",
    margin: 20,
    marginVertical: 10,
    borderRadius: 35,
    padding: 20,
  },
});

export default About;