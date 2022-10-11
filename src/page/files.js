import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import FilesListItem from "../component/FilesListItem";

function About() {
  return (
    <View style={styles.content}>
      <ScrollView>
        <Text color="#fff" style={styles.title}>
          今天
        </Text>
        <View style={styles.contentFilesList}>
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
        </View>
        <Text color="#fff" style={styles.title}>
          昨天
        </Text>
        <View style={styles.contentFilesList}>
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
        </View>
        <Text color="#fff" style={styles.title}>
          2022/07/17
        </Text>
        <View style={styles.contentFilesList}>
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
          <FilesListItem />
        </View>
      </ScrollView>
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
    // alignItems: "center",
    // justifyContent: "center",
    flex: 1,
    backgroundColor: "#3C4254",
    margin: 20,
    marginVertical: 10,
    borderRadius: 35,
    padding: 20,
    paddingVertical: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 14,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  contentFilesList: {
    flexDirection: "row",
    // flex: 1,
    flexWrap: "wrap",
  },
});

export default About;
