import React from 'react';
import { StyleSheet, Text, View } from "react-native";

function WarningsTitle(props) {
  const { title, color } = props.statue;
    return (
      <View style={[styles.warningsBar,{borderColor: color,}]}>
        <Text style={styles.warningsText}>{title}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  warningsBar: {
    marginTop: 80,
    backgroundColor: "#353945",
    color: "#fff",
    width: 260,
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    paddingVertical: 8,
  },
  warningsText: {
    color: "#fff",
    fontSize: 20,
    letterSpacing: 3,
  },
});


export default WarningsTitle;