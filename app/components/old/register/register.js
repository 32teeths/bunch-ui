import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Logo from './../logo/logo';

import { Actions } from 'react-native-router-flux';


// import * as firebase from 'firebase';
import styles from '../../styles/forms'


export default class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showPass: true,
            press: false
        };

        this.submitForm = this.submitForm.bind(this);

        this.googleLogin = this.googleLogin.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);

    }

    submitForm() {
        // Logic for login the user

        // this.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        //     alert(JSON.stringify(error));

        // });

    }

    googleLogin() {

    }

    facebookLogin() {

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Logo></Logo>
                </View>

                {/* Form Begins */}

                {/* <Label text="Username or Email" /> */}
                <View style={styles.formContainer}>

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Email" value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                    />

                    {/* <Label text="Username or Email" /> */}
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={this.submitForm}>
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </TouchableOpacity>

                    <Text style={styles.linkStyling}
                        onPress={() => { Actions.LOGIN() }}>
                        Already Regsitered ? Login
            </Text>

                </View>

                <View style={styles.socialFormContainer}>

                    <TouchableOpacity style={[styles.buttonContainer, styles.googleLogin]}
                        onPress={this.googleLogin}>
                        <Text style={styles.buttonText}>Google</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.buttonContainer}
                    onPress={this.submitForm}>
                    <Text style={styles.buttonText}>Facebook</Text>
                </TouchableOpacity> */}

                </View>






                {/* Form Ends */}

                {/* Google Login */}

                {/* Google Login Ends */}

                {/* Facebook Login */}

                {/* Facebook Login Ends */}
            </ScrollView>
        );
    }
}

