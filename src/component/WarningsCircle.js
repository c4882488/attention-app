import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { BoxShadow } from "react-native-shadow";
import { Shadow } from "react-native-shadow-2";
import { Dimensions } from "react-native";
import Locations from "../../assets/svg/location.svg";
import EchoIcon from "../unit/EchoIcon";

const windowHeight = Dimensions.get("window").width * 0.7;

function WarningsCircle(props) {
  const [breathing, setBreathing] = useState(20);
  const [breathingState, setBreathingState] = useState(true);
  const interval = useRef();
  const { img, color, circleColor } = props.statue;

  useEffect(() => {
    interval.current = setInterval(() => {
      if (breathingState) {
        setBreathing((pre) => pre + 0.5);
      } else {
        setBreathing((pre) => pre - 0.5);
      }
    }, 17);
    return () => {
      clearInterval(interval.current);
    };
  }, [breathingState]);
  useEffect(() => {
    if (breathing < 15) {
      setBreathingState(true);
    }
    if (breathing > 60) {
      setBreathingState(false);
    }
  }, [breathing]);

  return (
    <Shadow
      distance={breathing}
      startColor={color + "70"}
      endColor={"#00000020"}
    >
      <View style={[styles.circle, { borderColor: circleColor }]}>
        <View style={styles.insideCircle}>
          <EchoIcon img={img} />
        </View>
      </View>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
  },
  circle: {
    width: windowHeight,
    height: windowHeight,
    borderRadius: 999999,
    borderWidth: windowHeight / 10 / 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  insideCircle: {
    width: "100%",
    height: "100%",
    borderColor: "#353945",
    backgroundColor: "#000",
    // backgroundColor: "#000161515",
    borderRadius: 999999,
    borderWidth: windowHeight / 10 / 4,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WarningsCircle;
