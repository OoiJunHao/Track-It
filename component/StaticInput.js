import React, { Component, useState } from "react";
import { TextInput, Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";



export const StaticInput = props => (
    <View style={props.style}>
        <Text style={styles.inputTitle}>{props.children}</Text>
        <TextInput style={styles.input} autoCapitalize="none" onChangeText={props.onChangeText} value={props.value} />
    </View>
)

export const StaticPasswordInput = props => (
    <View style={props.style}>
        <Text style={styles.inputTitle}>{props.children}</Text>
        <TextInput style={styles.input} autoCapitalize="none" secureTextEntry onChangeText={props.onChangeText} value={props.value} />
    </View>
)

export const StaticEmailInput = props => (
    <View style={props.style}>
        <Text style={styles.inputTitle}>{props.children}</Text>
        <TextInput style={styles.input} autoCapitalize="none" keyboardType="email-address" onChangeText={props.onChangeText} value={props.value} />
    </View>
)

export const FieldInput = props => (
    <View style={props.style}>
        <Text style={styles.inputTitle}>{props.children}</Text>
        <TextInput style={styles.input} onChangeText={props.onChangeText} value={props.value} />
    </View>
)

export const DatePicker = props => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        hideDatePicker();
    };

    return (
        <View style={props.style}>
            <Text style={styles.inputTitle}>Date</Text>
            <TouchableOpacity style={styles.input} value={props.value} onPress={showDatePicker}>
                <Text style={styles.input, { marginTop: 10 }}>{(props.date != 0 ? (new Date(props.date)).toDateString() : "")}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm, props.onChange}
                onCancel={hideDatePicker}
            />
        </View>)

}


const styles = StyleSheet.create({
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161f3d"
    }
})
