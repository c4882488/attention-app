import React, { useEffect } from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet,ScrollView } from "react-native";
import { DateTimePicker,View, Text, TouchableOpacity } from "react-native-ui-lib";
import ExecutionListItem from "../component/ExecutionListItem";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Left from '../../assets/svg/left.svg';
import Right from '../../assets/svg/right.svg';
import moment from "moment";
import axios from "axios";

function Records() {

  const [newUser, setNewUser] = React.useState({
    birthday: new Date().toLocaleString("zh-Hans-CN", {
      timeZone: "Asia/Taipei",
    }),
  });
  const [data, setData] = React.useState({});

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: new Date(newUser.birthday),
      onChange: handleBirthChange,
      mode: "date",
      is24Hour: false,
    });
  };
  
  const handleBirthChange = (event, newValue) => {
    setNewUser({
      ...newUser,
      birthday: newValue.toLocaleDateString("zh-TW", {
        timeZone: "Asia/Taipei",
      }),
    });
  };
  const handleChangeDate = (e) =>{
    let changeDate = new Date(newUser.birthday)
    changeDate.setDate(changeDate.getDate() + e);
    changeDate=changeDate.toLocaleDateString();
    setNewUser({
      ...newUser,
      birthday: changeDate,
    });
  }
  
  // TODO:ID還沒做修改
  const getUserActivities = () =>{
    axios
      .get(
        "http://192.168.137.239/www/Project_back/public/api/activitys?filters=user_id:1&date=" +
          moment(newUser.birthday).format("YYYY-MM-DD") +
          "," +
          moment(newUser.birthday).format("YYYY-MM-DD"),
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
        } else {
          setData({});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getUserActivities();
  }, [newUser]);

  useEffect(() => {
    // console.log(Object.keys(data).length);
  }, [data]);
  
  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            handleChangeDate(-1);
          }}
        >
          <Left width="10" black="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.InputGroup} onPress={showMode}>
          <View style={styles.textPadding}>
            <Text style={[styles.formTextInput, styles.formDate]}>
              {moment(newUser.birthday).format("YYYY/MM/DD")}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleChangeDate(+1);
          }}
        >
          <Right width="10" black="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.executionList}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  whiteText: {
    color: "#fff",
  },
  content: {
    flex: 1,
    backgroundColor: "#3C4254",
    margin: 20,
    marginVertical: 10,
    borderRadius: 35,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  centerText: {
    alignSelf: "center",
  },
  datePicker: {
    color: "#fff",
    alignItems: "center",
    alignSelf: "center",
    width: "10%",
  },
  executionList: {
    width: "100%",
  },
  InputGroup: {
    marginVertical: 10,
    marginHorizontal: 15,
    paddingTop: 0,
    paddingBottom: 0,
    padding: 30,
  },
  textPadding: {
    borderRadius: 25,
    overflow: "hidden",
    borderColor: "#fff",
    borderWidth: 1,
  },
  formTextInput: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  formDate: {
    fontSize: 15,
    marginHorizontal: 45,
    color: "#fff",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});


export default Records;