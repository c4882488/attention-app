import React from 'react';
import { StyleSheet, Text, View} from "react-native";
import {Actions, Drawer, Router, Tabs, Stack, Scene} from 'react-native-router-flux';
import Home from "./src/page/Home";
import Records from "./src/page/Records";
import HomeDrawer from "./src/page/HomeDrawer";
import About from "./src/page/About";
import Files from "./src/page/files"
import Test from "./src/page/Test"
import {LogBox} from "react-native";

LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"ColorPropType will be removed",
"Deprecation in 'createStackNavigator'"
])

const Route = () => {
  return (
    <Router>
      {/* <Tabs hideTabBar={true}> */}
      <Drawer
        contentComponent={HomeDrawer}
        drawerImage={require("./assets/svg/side.png")}
        style={{
          backgroundColor: "#353945",
        }}
        onDialogDismissed={() => {
          alert();
        }}
      >
        <Stack key="root" headerLayoutPreset="center">
          {/* HomePage */}
          <Scene
            drawer={true}
            key="home"
            component={Home}
            initial
            navigationBarStyle={styles.homeBar}
            titleStyle={styles.whiteText}
            title=" "
            rightButtonImage={require("./assets/svg/setting.png")}
            onRight={() => {
              alert("left");
            }}
          />
          {/* 紀錄 */}
          <Scene
            drawer={true}
            key="Records"
            component={Records}
            navigationBarStyle={styles.subPageBar}
            titleStyle={styles.whiteText}
            title="紀錄"
            back={true}
            backButtonImage={require("./assets/svg/back.png")}
            cardStyle={{
              backgroundColor: "#353945",
            }}
          />
          {/* 關於 */}
          <Scene
            drawer={true}
            key="About"
            component={About}
            navigationBarStyle={styles.subPageBar}
            titleStyle={styles.whiteText}
            title="關於我們"
            back={true}
            backButtonImage={require("./assets/svg/back.png")}
            cardStyle={{
              backgroundColor: "#353945",
            }}
          />
          {/* 檔案存檔 */}
          <Scene
            drawer={true}
            key="Files"
            component={Files}
            navigationBarStyle={styles.subPageBar}
            titleStyle={styles.whiteText}
            title="影片存檔"
            back={true}
            backButtonImage={require("./assets/svg/back.png")}
            cardStyle={{
              backgroundColor: "#353945",
            }}
          />
          {/* 測試 */}
          <Scene
            drawer={true}
            key="Test"
            component={Test}
            navigationBarStyle={styles.subPageBar}
            titleStyle={styles.whiteText}
            title="測試"
            back={true}
            backButtonImage={require("./assets/svg/back.png")}
            cardStyle={{
              backgroundColor: "#353945",
            }}
          />
        </Stack>
      </Drawer>

      {/* </Tabs> */}
    </Router>
  );
};

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
    justifyContent: "center",
  },
});

export default Route;
