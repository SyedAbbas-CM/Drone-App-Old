import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Modal } from "react-native";
import { Colors } from "@/Theme/Variables";

const VeroLoader = () => {
    return(
        <Modal transparent={true}>
                <View style={styles.modalContainer}>
                        <ActivityIndicator size="large" color={Colors.grey} />
                </View>
            </Modal>
    );
    }

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default VeroLoader;