import React, {Component} from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import firebaseDb from "../firebaseDb";
import Button from '../component/Button';

class LogInContainer extends Component {
    state = {
        name: '',
        password: ''
    };

    handleUpdateName = (name) => this.setState({ name });
    handleUpdateEmail = (email) => this.setState({ email });
    handleUpdatePassword = (password) => this.setState({ password });
    handleSignIn = (name, password) => firebaseDb
        .firestore()
        .collection('users')
        .where("name", "==", name)
        .where("password", "==", password)
        .get()
        .then((snapshot) => {
                if (snapshot.empty) {
                    console.log('No Such Account');
                    alert('No such account');
                }
                else {
                    console.log('Logging In');
                    this.setState({
                            name: '',
                            password: ''
                    });
                    this.props.navigation.navigate('Home');
                }})
        .catch(err => {
                console.log('Error getting documents', err);
            });

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
                console.log('dismissed keyboard');
            }}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <ScrollView contentContainerStyle={{
                        flex: 1
                    }}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('../assets/logo.png')}
                            />
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Username"
                                style={styles.input}
                                onChangeText={this.handleUpdateName}
                                value={this.state.name}
                                returnKeyType="next"
                                onSubmitEditing={() => this.passwordInput.focus()}
                            />
                            <TextInput
                                placeholder="Password"
                                style={[styles.input, {marginBottom: 25}]}
                                onChangeText={this.handleUpdatePassword}
                                value={this.state.password}
                                ref={(input) => this.passwordInput = input}
                                returnKeyType="go"
                                secureTextEntry
                            />
                            <Button
                                onPress={() => {
                                    Keyboard.dismiss();
                                    if (
                                        this.state.name.length &&
                                        this.state.password.length
                                    ) {
                                        this.handleSignIn(this.state.name, this.state.password);
                                    } else {
                                        alert('Please enter username and password');
                                    }
                                }}
                            >
                                <Text>Log In</Text>
                            </Button>
                            <Button onPress={() => {
                                Keyboard.dismiss();
                                this.props.navigation.navigate('Sign Up');
                            }}
                            >
                                <Text>Sign Up</Text>
                            </Button>
                        </View>
                    </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            </SafeAreaView>
    )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 270,
        height: 110,
        resizeMode: 'contain'
    },
    inputContainer: {
        padding: 20
    },
    input: {
        height: 40,
        width: 270,
        backgroundColor: '#d7dedc',
        marginBottom: 8,
        color: 'black',
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        marginBottom: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '700'
    }
});

export default LogInContainer