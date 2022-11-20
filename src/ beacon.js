import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from "react-redux";
import { changeStatus } from "./model/statusSlice";
import { statusColors } from "../assets/colors/colors";
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Button,
} from "react-native";
import { DeviceEventEmitter, TouchableOpacity } from "react-native";
import Beacons from "react-native-beacons-manager";

export default function App() {
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App ACCESS_FINE_LOCATION Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the ACCESS_FINE_LOCATION");
      } else {
        console.log("ACCESS_FINE_LOCATION permission denied");
      }
    } catch (err) {
      console.warn(err);
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: "Cool Photo App ACCESS_COARSE_LOCATION Permission",
          message:
            "Cool Photo App needs access to your ACCESS_COARSE_LOCATION " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the ACCESS_COARSE_LOCATION");
      } else {
        console.log("ACCESS_COARSE_LOCATION permission denied");
      }
    } catch (err) {
      console.warn(err);
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: "Cool Photo App BLUETOOTH_SCAN Permission",
          message:
            "Cool Photo App needs access to your BLUETOOTH_SCAN " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the BLUETOOTH_SCAN");
      } else {
        console.log("BLUETOOTH_SCAN permission denied");
      }
    } catch (err) {
      console.warn(err);
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: "Cool Photo App BLUETOOTH_SCAN Permission",
          message:
            "Cool Photo App needs access to your BLUETOOTH_SCAN " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the BLUETOOTH_SCAN");
      } else {
        console.log("BLUETOOTH_SCAN permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: "Cool Photo App ACCESS_BACKGROUND_LOCATION Permission",
          message:
            "Cool Photo App needs access to your ACCESS_BACKGROUND_LOCATION " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the ACCESS_BACKGROUND_LOCATION");
      } else {
        console.log("ACCESS_BACKGROUND_LOCATION permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const dispatch = useDispatch();
  const statue = useSelector((state) => state.status);

  // uuid: 'CBBFE0E2-F7F3-4206-84E0-84CBB3D09DFC',
  const [region, setRegion] = useState({
    uuid: null,
    identifier: 'Estimotes',
  });

  const ibeaconStart = async () => {
    await Beacons.startRangingBeaconsInRegion(region);
    console.log(`Beacons ranging started succesfully!`);
    DeviceEventEmitter.addListener('beaconsDidRange', data => {
      const uuid = "b0702880-a295-a8ab-f734-031a98a512de";
      console.log("Found beacons!", data.beacons);
      data.beacons.map((beacon)=>{
        if (beacon.uuid === uuid && beacon.minor === 1000) {
         Back2();
        }
        if (beacon.uuid === uuid && beacon.minor === 1001) {
          Back();
        }
      });
    });
  };
  const Back = () => {
    dispatch(
      changeStatus({
        title: "執行中...",
        color: statusColors.zeroState,
        img: 0,
      })
    );
  }
  const Back2 = () => {
    dispatch(
      changeStatus({
        title: "注意路口行人",
        color: statusColors.error,
        img: 30,
      })
    );
  };

  const onPress = () => {
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
  };

  useEffect(() => {
    requestPermission();
    Beacons.detectIBeacons();
    (async () => {
      try {
        ibeaconStart();
      } catch (err) {
        console.log(`Beacons ranging not started, error: ${err}`);
      }
    })();

    return () => {
      (async () => {
        await Beacons.stopRangingBeaconsInRegion(region);
      })();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.paragraph}>change</Text>
      </TouchableOpacity>
      {/* <Ibeacons /> */}
      <Text>Open up App.js to start working on your app!sss</Text>
      <Button title="request permissions" onPress={requestPermission} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
