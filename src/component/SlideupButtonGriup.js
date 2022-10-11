import React,{ useState } from "react";
import { StyleSheet, BackHandler } from "react-native";
import { View,Text, TouchableOpacity } from "react-native-ui-lib";
import Spotify from "../../assets/svg/spotify.svg";
import Close from "../../assets/svg/close.svg";
import Line from "../../assets/svg/line.svg";
import * as Linking from "expo-linking";
import DialogModel from "./DialogModel";

function SlideupButtonGriup() {
  const [visible, setVisible] = useState(false);
  const OpenApp = () => {
    Linking.openURL("spotify://");
  }
  const CloseApp = () => {
    BackHandler.exitApp();
  }
  const CloseDialog = () => {setVisible(pre=>!pre)}

    return (
      <View style={styles.buttonGroup}>
        <View style={styles.svgbutton}>
          <TouchableOpacity
            onPress={() => {
              OpenApp();
            }}
          >
            <Spotify height={45} />
          </TouchableOpacity>
        </View>
        <View style={styles.svgbutton}>
          <Line />
        </View>
        <View style={styles.svgbutton}>
          <TouchableOpacity
            onPress={() => {
              CloseDialog();
            }}
          >
            <Close height={41} />
          </TouchableOpacity>
        </View>

        <DialogModel
          visible={visible}
          moreButton={true}
          CloseApp={CloseApp}
          CloseDialog={CloseDialog}
          title="提醒視窗"
          body="您確定要離開嗎？"
        />
      </View>
    );
}

const styles = StyleSheet.create({
  buttonGroup: {
    // marginVertical: 20,
    marginBottom:23,
    marginTop:24,
    flexDirection: "row",
    alignItems: "center",
  },
  svgbutton: {
    flex: 0.22,
    alignItems: "center",
  },
});

export default SlideupButtonGriup;