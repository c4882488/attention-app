import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../model/counterSlice'
import { View, Text, TouchableOpacity, Button } from "react-native-ui-lib";

export default function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <View>
        <Button onPress={() => dispatch(increment("ss"))} label={"Press"} />
        <Text>{count}</Text>
        <Button onPress={() => dispatch(decrement())} label={"decrement"} />
      </View>
    </>
  );
}