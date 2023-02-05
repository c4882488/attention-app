import React from 'react'
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { statusColors } from "../../assets/colors/colors";

function ExecutionListItem(props) {
  const { status, time, title } = props.data;
  const color = statusColors[status].color;
    return (
      <View style={styles.contentListItem}>
        <View
          style={[styles.contentListItemColor, { backgroundColor: color }]}
        ></View>
        <Text style={styles.contentListItemTitle}>{title}</Text>
        <Text style={styles.contentListItemContent}>{time}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  contentListItem: {
    height: "100%",
    flexDirection: "row",
    marginVertical: 7,
    flex: 1,
    flexDirection: "row",
  },
  contentListItemContent: {
    color: "#838d99",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 0.6,
    fontSize: 12,
  },
  contentListItemColor: {
    width: 5,
    height: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 11,
  },
  contentListItemTitle: {
    color: "#fff",
    flex: 0.5,
    marginRight: 10,
    overflow: "hidden",
  },
});

export default ExecutionListItem;