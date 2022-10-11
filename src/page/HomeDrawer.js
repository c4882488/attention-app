import React,{ useEffect } from "react";
import {
  StyleSheet,
  Linking,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import { Actions } from "react-native-router-flux";
import Setting from "../../assets/svg/setting1.svg";
import Info from "../../assets/svg/info.svg";
import Home from "../../assets/svg/home.svg";
import Flie from "../../assets/svg/file.svg";
import Video from "../../assets/svg/video.svg";
import Close from "../../assets/svg/closeDrawer.svg";

function HomeDrawer() {
  // const handleOpen = (e)=>{
  //   Actions.currentScene === "home" ? Actions.push({e}) : Actions.home();
  // }
  const handleOpenHome = () => {
    Actions.home()
  }

  const handleOpenRecdors = () => {
    Actions.push("Records");
  }

  const handleOpenAbout = () => {
    Actions.push("About");
  };

  const handleOpenFiles = () => {
    Actions.push("Files");
  }
  const handleOpenTest = () => {
    Actions.push("Test");
  };

  useEffect(()=>{
    // console.log(Actions.currentScene);
  },[]);

  return (
    <View style={styles.drawer}>
      <View style={styles.drawTitleView}>
        <Text style={styles.drawTitleText}>Attention</Text>
        <TouchableOpacity onPress={() => Actions.drawerClose()}>
          <Close black="#ffffff" width="30" />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <TouchableOpacity
        onPress={() => {
          handleOpenHome();
        }}
        style={[styles.drawerItemView, styles.drawerItemHome]}
      >
        <View style={styles.drawerItemIcon}>
          <Home black="#ffffff" />
        </View>
        <Text style={styles.drawerItemText}>首頁</Text>
      </TouchableOpacity>
      {/* <View style={styles.divider} /> */}
      <TouchableOpacity
        onPress={() => {
          handleOpenRecdors();
        }}
        style={styles.drawerItemView}
      >
        <View style={styles.drawerItemIcon}>
          <Video black="#ffffff" />
        </View>
        <Text style={styles.drawerItemText}>紀錄</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleOpenFiles();
        }}
        style={styles.drawerItemView}
      >
        <View style={styles.drawerItemIcon}>
          <Flie black="#ffffff" />
        </View>
        <Text style={styles.drawerItemText}>儲存(no)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          handleOpenTest();
        }}
        style={styles.drawerItemView}
      >
        <View style={styles.drawerItemIcon}>
          <Flie black="#ffffff" />
        </View>
        <Text style={styles.drawerItemText}>測試</Text>
      </TouchableOpacity>

      <TouchableOpacity
        //   onPress={this.handleOpenMap}
        style={styles.drawerItemView}
      >
        <View style={styles.drawerItemIcon}>
          <Setting black="#ffffff" />
        </View>
        <Text style={styles.drawerItemText}>設定(個人資料、機器)</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        onPress={() => {
          handleOpenAbout();
        }}
        style={styles.drawerItemView}
      >
        <View style={styles.drawerItemIcon}>
          <Info black="#ffffff" />
        </View>
        <Text style={styles.drawerItemText}>關於我們</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    // backgroundColor: "#999",
  },
  drawTitleView: {
    marginTop: 40,
    paddingVertical: 3,
    paddingHorizontal: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    // borderWidth: 0.5,
    // paddingHorizontal:10,
    // paddingVertical: 20,
    // borderColor: "#fff",
    // borderRadius: 5,
  },
  drawTitleText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
    marginHorizontal: 6,
  },
  cancelImage: {
    width: 20,
    height: 20,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#DDD",
  },
  drawerItemView: {
    marginTop: 10,
    marginRight: 10,
    flexDirection: "row",
    padding: 15,
    paddingLeft: 25,
  },
  drawerItemHome: {
    backgroundColor: "#4E5468",
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
  },
  drawerItemText: {
    fontSize: 15,
    color: "#fff",
    marginHorizontal: 15,
  },
  drawerItemIcon:{
    alignSelf: "center",
  },
});

export default HomeDrawer;