import React, { useState } from "react";
import { StyleSheet, BackHandler } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  Dialog,
  PanningProvider,
} from "react-native-ui-lib";


function DialogModel(props) {
  const { title, body, CloseApp, moreButton, CloseDialog } = props;
  return (
    <Dialog
      visible={props.visible}
      onDismiss={() => {
        CloseDialog();
      }}
      panDirection={PanningProvider.Directions.DOWN}
    >
      <View backgroundColor="#FFFFFF" style={styles.dialogContent}>
        <View style={styles.dialogTitleGroup}>
          <Text style={styles.dialogTitle}>{title}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.dialogBody}>
          <Text style={styles.dialogBodyText}>{body}</Text>
        </View>
        {/* <View style={styles.divider} /> */}
        <View style={styles.dialogFooter}>
          {moreButton && (
            <TouchableOpacity
              style={styles.dialogButton}
              onPress={() => {
                CloseDialog();
                CloseApp();
              }}
            >
              <Text style={styles.dialogButtonText}>OK</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.dialogButton}
            onPress={() => {
              CloseDialog();
            }}
          >
            <Text style={styles.dialogButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialogContent: {
    backgroundColor: "#61677B",
    borderRadius: 30,
    margin: 25,
    elevation: 5,
    // paddingVertical: 10,
  },
  dialogTitle: {
    fontSize: 20,
    padding: 18,
    // paddingVertical: 13,
    paddingHorizontal: 20,
    letterSpacing: 4,
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#61677B",
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  dialogBody: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    margin: 7,
    marginHorizontal: 0,
  },
  dialogBodyText: {
    fontSize: 16,
    letterSpacing: 0.5,
    color: "#fff",
  },
  dialogFooter: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row-reverse",
  },
  dialogButton: {
    backgroundColor: "#3E82D0",
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 13,
    marginHorizontal: 5,
  },
  dialogButtonText: {
    color: "#e8e8e8",
  },
});

export default DialogModel;
