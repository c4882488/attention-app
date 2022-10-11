import React,{ useRef, useEffect } from 'react'
import {
  Dimensions,
  Animated,
  ScrollView,
  PanResponder,
  StyleSheet,
} from "react-native";
import Bar from "../../assets/svg/bar.svg";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import SlideupButtonGriup from './SlideupButtonGriup';
import SideupInfo from "./SideupInfo";

function SlideUpScreen() {
  const Height = Dimensions.get("window").height;
  const Width = Dimensions.get("window").width;
  const pan = useRef(new Animated.Value(Height - 40)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      // onPanResponderGrant: () => {
      //   pan.setOffset({
      //     x: pan.x._value + 100,
      //     y: pan.y._value,
      //   });
      // },
      onPanResponderMove: (e, gestureState) => {
        let role = gestureState.moveY
        if (gestureState.moveY > Height - 40) {
          role = Height - 40;
        }
        if (gestureState.moveY < Height / 5) {
          role = Height / 3;
        }
        Animated.spring(pan, {
          toValue:  role,
          duration: 80,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderRelease: (e, gestureState) => {
        let height = -gestureState.dy;
        if (gestureState.dy < 0 && height > Height / 5) {
          height = Height/3 ;
        }else{
          height = Height - 40;
        }
        Animated.spring(pan, {
          toValue: height,
          duration: 80,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.containera}>
      <Animated.View
        style={{
          top: pan,
          height: Height + 100,
          width: Width,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          backgroundColor: "#353945",
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.content}>
          <Bar fill="#6F799A" />
          <SlideupButtonGriup />
          <ScrollView style={styles.info}>
            <SideupInfo />
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  containera: {
    position: "absolute",
  },
  info: {
    marginBottom: 205,
    width: "100%",
  },
  content: {
    marginTop: 13,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

});

export default SlideUpScreen;