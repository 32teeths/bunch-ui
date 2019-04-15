import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Logo from './../logo/logo';
import { Actions } from 'react-native-router-flux';

// import * as firebase from 'react-native-firebase';
import styles from '../../styles/forms'

import GLOBAL from './../../global';

// import auth from 'reac';

// import firebase from 'react-native-firebase';


// import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

// GoogleSignin.configure({
//     iosClientId: GLOBAL.AUTH.GOOGLE_CLIENTID,
// }).then(() => {
//     // you can now call currentUserAsync()
// });


export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: 'admin@passme.com',
            password: '123456',
        };

        // this.submitForm = this.submitForm.bind(this);

        // this.googleLogin = this.googleLogin.bind(this);
        // this.facebookLogin = this.facebookLogin.bind(this);

    }



    submitForm() {

        // firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        //     // alert(JSON.stringify(error));

        // }).then(function (result) {
        //     Actions.pop();
        //     // alert(JSON.stringify(result));
        // })
    }

    googleLogin() {

        // GoogleSignin.signIn()
        //     .then((user) => {
        //         console.log(user);
        //         Actions.LANDING()
        //         this.setState({ user: user });
        //     })
        //     .catch((err) => {
        //         console.log('WRONG SIGNIN', err);
        //     })
        //     .done();

        // this.firebase.auth().signInWithPopup(this.provider).then(function (result) {
        //     // This gives you a Google Access Token. You can use it to access the Google API.
        //     var token = result.credential.accessToken;
        //     // The signed-in user info.
        //     var user = result.user;
        //     alert(result);
        //     // ...
        // }).catch(function (error) {
        //     // Handle Errors here.
        //     alert(error);

        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // The email of the user's account used.
        //     var email = error.email;
        //     // The firebase.auth.AuthCredential type that was used.
        //     var credential = error.credential;
        //     // ...
        // });

    }

    facebookLogin() {

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* <View style={styles.logoContainer}>
                    <Logo></Logo>
                </View> */}

                {/* Form Begins */}

                {/* <Label text="Username or Email" /> */}
                <View style={styles.formContainer}>

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Email" value="salim"
                        onChangeText={(text) => this.setState({ email: text })}
                    />

                    {/* <Label text="Username or Email" /> */}
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <TouchableOpacity style={[styles.buttonContainer, styles.buttonPrimary]}
                        onPress={this.submitForm}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                    <Text style={styles.linkStyling}
                        onPress={() => { Actions.REGISTER() }}>
                        New User ? Register
                </Text>

                </View>

                <View style={styles.socialFormContainer}>



                    <TouchableOpacity style={[styles.buttonContainer, styles.googleLogin]}
                        onPress={() => Actions.s_tab()}>
                        <Text style={styles.textWhite}>Google</Text>
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
