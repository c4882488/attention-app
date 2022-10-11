import React from 'react';
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity, Image } from "react-native-ui-lib";
import Player from "../../assets/svg/player.svg";

function FilesListItem() {
    return (
      <TouchableOpacity style={styles.contentFilesItem}>
        <Image
          source={require("../../assets/images/test1.jpg")}
          style={styles.FilesCar}
        />
        <View style={styles.contentFilesItemText}>
          <Player black="#ffffff" />
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  FilesCar: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  contentFilesItem: {
    width: "32%",
    margin: 2,
  },
  contentFilesItemText: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default FilesListItem;