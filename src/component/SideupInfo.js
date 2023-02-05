import React, { useEffect } from "react";
import { StyleSheet, } from "react-native";
import { View, Text, TouchableOpacity, Image } from "react-native-ui-lib";
import { Actions } from "react-native-router-flux";
import ExecutionListItem from './ExecutionListItem';
import FilesListItem from './FilesListItem';
import moment from "moment";
import axios from "axios";

function SideupInfo() {

  const [data, setData] = React.useState({});

  // TODO:ID還沒做修改
  const getUserActivities = () => {
    axios
      .get(
        "http://192.168.137.239/www/Project_back/public/api/activitys?filters=user_id:1&limit=6&date=" +
          moment(new Date()).format("YYYY-MM-DD") +
          "," +
          moment(new Date()).format("YYYY-MM-DD"),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(response.data.data);
        if (response.data.data.data.length > 0) {
          // console.log(response.data.data.data.length);
          setData(response.data.data);
          console.log(response.data.data);
        } else {
          setData({});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserActivities();
  }, []);

  return (
    <>
      <View style={styles.sideUpContent}>
        <View style={styles.contentTitleGroup}>
          <Text style={styles.contentTitle}>執行紀錄</Text>
          <TouchableOpacity
            style={styles.contentButton}
            onPress={() => {
              Actions.Records();
            }}
          >
            <Text color="#3E82D0">查看更多</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentList}>
          {Object.keys(data).length === 0 && (
            <Text style={[styles.whiteText, styles.centerText]}>沒有紀錄</Text>
          )}

          {Object.keys(data).length > 0 &&
            data.data.map((itemData) => (
              <ExecutionListItem
                key={itemData.id}
                id={itemData.id}
                data={itemData}
              />
            ))}

          {/* <ExecutionListItem
            data={{
              status: "zeroState",
              time: "2022-09-19 18:30:00",
              title: "開始執行",
            }}
          /> */}
        </View>
      </View>

      <View style={styles.sideUpContent}>
        <View style={styles.contentTitleGroup}>
          <Text style={styles.contentTitle}>行車紀錄</Text>
          <TouchableOpacity
            style={styles.contentButton}
            onPress={() => {
              Actions.Files();
            }}
          >
            <Text color="#3E82D0">查看更多</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.contentFilesList}>
            <FilesListItem />
            <FilesListItem />
            <FilesListItem />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sideUpContent: {
    marginBottom: 30,
    // margin:15,
    // marginVertical:10,
    marginHorizontal: 20,
    paddingVertical: 24,
    paddingHorizontal: 25,
    borderRadius: 30,
    backgroundColor: "#3C4254",
  },
  contentTitleGroup: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 18,
  },
  contentButton: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 0.2,
  },
  contentTitle: {
    fontSize: 17,
    flex: 0.8,
    color: "white",
  },
  contentListItem: {
    flexDirection: "row",
    marginVertical: 7,
    flex: 1,
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
  contentFilesList: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  FilesCar: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  contentFilesItem: {
    width: "32%",
    margin: 2,
  },
  contentFilesItemText:{
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default SideupInfo;