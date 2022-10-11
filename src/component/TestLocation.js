import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Platform, Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from "expo-task-manager";
import {getFlatternDistance} from '../unit/LonLatTransform';
import axios from 'axios';
import datas from "../../assets/Datas/data";
import kData from "../../assets/Datas/KaohsiungData";
import {EspToWsg} from "../../src/unit/EpsToWgs";
import useLocation from "../../src/unit/useLocation";
import * as Speech from "expo-speech";
import { changeStatus } from "../model/statusSlice";
import { statusColors } from "../../assets/colors/colors";
import moment from "moment";
import "moment-timezone";
// import moment from "moment-timezone";

export default function App() {
  const dispatch = useDispatch();
  const [trafficeData, setTrafficeData] = useState(kData);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const statue = useSelector((state) => state.status);

  const {
    into: LocationInto,
    statusMsg: LocationStatus,
    handleIntoChange: handleIntoChange,
    handleLocationChange: handleLocationChange,
  } = useLocation("");

  const LOCATION_TASK_NAME = "TASK_FETCH_LOCATION";

  const requestPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 0.1, // minimum change (in meters) betweens updates
        deferredUpdatesInterval: 1, // minimum interval (in milliseconds) between updates
        // foregroundService is how you get the task to be updated as often as would be if the app was open
        foregroundService: {
          notificationTitle: "Using your location",
          notificationBody:
            "To turn off, go back to the app and switch something off.",
        },
      });
    }
  };

  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    // console.log("Location task ran");
    if (error) {
      setErrorMsg(error);
      return;
    }
    if (data) {
      const { locations } = data;
      setLocation(locations);
    }
  });

  useEffect(() => {
    (async () => {
      requestPermissions();
    })();
    return () => {
      // Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION).then(
      //   (value) => {
      //     if (value) {
      Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      //     }
      //   }
      // );
    };
  }, []);

  const onPress = ()=>{
    console.log(statue.title);
    if (statue.title === "執行中...") {
      dispatch(
        changeStatus({
          title: "注意路口行人",
          color: statusColors.error,
          img: 30,
        })
      );
    } else {
      dispatch(
        changeStatus({
          title: "執行中...",
          color: statusColors.zeroState,
          img: 0,
        })
      );
    }
  }

  //經緯度判斷程式
  const checkLocationAPI = async () => {
    let latitude = location[0]["coords"]["latitude"];
    let longitude = location[0]["coords"]["longitude"];
    fetch(
      "https://revgeocode.search.hereapi.com/v1/revgeocode?lang=zh-TW&at=" +
        latitude +
        "," +
        longitude +
        "&apikey=4BGnZGTJtVr7PJN5kjWe8ScA8rVhjpSb6ZCxwpBV5ts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setAddress(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //交通事故API
  const TransportationAccidentsAPI = async () => {
    const PostData = {
      Area: "ALL",
      Calculation: "CBI",
      City: "臺北市",
      Cyear: "111",
      Month: "ALL",
    };
    axios
      .post("https://roadsafety.tw/api/AccLocCbiAjax", PostData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // TODO:ID還沒做修改
  const addActivitys = (title, description) => {
    moment.tz.guess();
    moment.locale("zh-tw");
    moment.tz.setDefault("Asia/Taipei");
    // console.log(moment.locale("zh-tw"));

    console.log(moment().format("YYYY-MM-DD hh:mm:ss"));
    const PostData = {
      title: title,
      description: description,
      time: moment().format("YYYY-MM-DD hh:mm:ss"),
      status: "warning",
      user_id: 1,
    };
    axios
      .post(
        "http://192.168.50.186/www/Project_back/public/api/activitys",
        PostData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(PostData);
        console.log(error);
      });
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    // text = JSON.stringify(location);
    text = "connect success";
  }
  useEffect(() => {
    if (location) {
      let lat = location[0]["coords"]["latitude"];
      let lon = location[0]["coords"]["longitude"];
      // console.log(trafficeData);
      if (LocationInto) {
        handleLocationChange({ lat: lat, lon: lon });
        if (LocationStatus) {
          // console.log(LocationStatus);
          Speech.speak(LocationStatus);
          dispatch(
            changeStatus({
              title: LocationStatus,
              color: statusColors.warning,
              img: 20,
            })
          );
        }
        if (LocationStatus == "警告解除") {
          dispatch(
            changeStatus({
              title: "執行中...",
              color: statusColors.zeroState,
              img: 0,
            })
          );
        }
      } else {
        trafficeData.forEach((item) => {
          let result = EspToWsg(item.wkt);
          let count = getFlatternDistance(lat, lon, result[1], result[0]);
          if (count >= 500 && count <= 550) {
            Speech.speak("前方500m危險路口請減速慢行");
            handleIntoChange(item);
            addActivitys(
              "危險路口",
              "靠近" + item.city + item.crossRoadArea + item.rdname
            );
            dispatch(
              changeStatus({
                title: "前方500m危險路口",
                color: statusColors.warning,
                img: 20,
              })
            );
          }
        });
      }
      // checkLocationAPI();
      // TransportationAccidentsAPI();
    }
  }, [location, LocationStatus]);

  useEffect(() => {
    if (address) {
      // checkLocationAPI();
      // TransportationAccidentsAPI();
    }
  }, [address]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.paragraph}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    },
    paragraph: {
        color: '#fff',
    }
});