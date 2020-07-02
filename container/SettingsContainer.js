import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import firebaseDb from "../firebaseDb";
import Button from "../component/Button";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from "expo-image-picker";
import Fire from "../Fire";

const { Navigation } = require('react-native-navigation');
const firebase = require("firebase");
require("firebase/firestore");

export default class SettingsContainer extends Component {
    state = {
        userAvatar: null,
        userEmail: null
    };

    componentDidMount() {
        firebaseDb
            .firestore()
            .collection("users")
            .doc(firebaseDb.auth().currentUser.email)
            .get()
            .then(doc => {
                this.setState({ userAvatar: doc.get("avatar") })
                this.setState({ userEmail: doc.get("email") })
            });
    }

    getCameraPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if (status != "granted") {
                alert("We need permission to access your camera roll")
            }
        }
    }

    handlePickAvatar = async () => {
        this.getCameraPermission().then(r => { console.log("obtained permission to photo library") });

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 1]
        })

        if (!result.cancelled) {
            this.setState({ userAvatar: result.uri });
            console.log("image set to: " + this.state.userAvatar);
        }

        await Fire.shared.updateProfilePic(this.state.userAvatar, this.state.userEmail);
    }

    handleSignOut = () => {
        firebaseDb.auth().signOut().then(() =>
            console.log("signed out")
        );
        this.props.navigation.navigate('Log In')
    }

    handleExpiry = () => { }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.avatarPlaceHolder, { alignSelf: 'center' }]} onPress={this.handlePickAvatar}>
                    <Image style={styles.avatar} source={this.state.userAvatar ? { uri: this.state.userAvatar } : require("../assets/dummy-avatar.jpg")} />
                </TouchableOpacity>
                <View style={styles.form}>
                    <Button
                        onPress={this.handlePickAvatar}
                        style={styles.button}
                    >
                        <Text>Change Profile Picture</Text>
                    </Button>
                    <Button
                        onPress={this.handleSignOut}
                        style={styles.button}
                    >
                        <Text>Sign Out</Text>
                    </Button>
                    <Button onPress={this.handleExpiry} style={styles.button}>
                        <Text>Check Expiring products</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: 'center'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        marginTop: "20%"
    },
    logo: {
        marginTop: "20%",
        width: 270,
        height: 110,
        resizeMode: "contain",
        alignSelf: 'center'
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    avatarPlaceHolder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: "20%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        position: 'absolute'
    },
})