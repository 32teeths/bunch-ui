import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Alert, Platform } from 'react-native';

import Logo from './../logo/logo';
import { Actions } from 'react-native-router-flux';

// import * as firebase from 'react-native-firebase';
import formStyles from '../../styles/forms'

import commonStyles from '../../styles/common';

import Loader from '../reusable/Loader';

import { getAccessToken } from '../../config/AccessToken';
import { Core, GetStore, SetStore } from './../../utils/core.utils';

import GLOBAL from './../../global';

import Placeholder from 'rn-placeholder';

import { PostData } from './../../utils/http.utils';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {

            phone_number: '+919880722243',
            isLoading: false
        }
    }

    componentDidMount() {
        // On mount find the auth status      
        this.authStatus();
    }

    /**
     * 
     */
    authStatus = () => {
        // get token from async storage

        console.log('%c Step 1' + ': Verifying for any existing token', 'color: brown');
        console.log('Token');

        GetStore('token').then((token) => {

            console.log(token);

            this.setState({ isLoading: false });

            if (token != null) {
                // this.setState({ isLoading: true });
                this.setState({ isLoading: false });

                Actions.main_tab()
            } else {
                this.setState({ isLoading: false });
            }
        });
    }

    validateForm = () => {
        const { phone_number } = this.state;
        if (phone_number.trim()) {
            this.submitForm();
        } else {
            Alert.alert(
                "Login failed",
                "Please fill fields",
                [
                    { text: 'OK', style: 'cancel' },
                ],
                { cancelable: false }
            );
            return 0;
        }
    }

    /**
     * Pass the phonu number to otp screen 
     */
    submitForm = async () => {
        // this.setState({ isLoading: true });

        // 
        const { phone_number } = this.state;

        Actions.otp({ phone_number: phone_number });
    }

    errorMessage(msg) {
        alert(msg)
    }


    render() {

        const { isLoading, phone_number } = this.state;

        return (

            <ScrollView style={[commonStyles.container, commonStyles.containerPadding]}>

                <Placeholder.ImageContent
                    size={60}
                    animate="fade"
                    lineNumber={4}
                    lineSpacing={5}
                    lastLineWidth="30%"
                    onReady={!isLoading}
                >

                    <View style={[commonStyles.outline]}>

                        {/* <View style={styles.logoContainer}> */}
                        <Logo></Logo>
                        {/* </View> */}

                        {/* Hero Section */}
                        <View style={commonStyles.hero}>

                            {/* Header Title */}
                            <View style={commonStyles.heroMain}>
                                <Text style={[commonStyles.heroText, commonStyles.primaryText]}>
                                    Welcome,
                                </Text>
                            </View>
                            {/* Header Title Ends */}

                            {/* Header Title */}
                            <View style={commonStyles.heroSecondary}>
                                <Text style={[commonStyles.heroSecondaryHeading, commonStyles.secondaryText]}>
                                    Please enter your mobile number registered with us.
                                </Text>
                            </View>
                            {/* Header Title Ends */}

                        </View>
                        {/* Hero Section Ends */}

                        {/* Form Begins */}
                        <View style={[formStyles.formContainer]}>

                            {/* Phone Number */}
                            <View style={[]}>
                                <Text style={[formStyles.labelStyle, formStyles.elementPadding]}>
                                    Phone Number
                                </Text>

                                <TextInput
                                    keyboardType={'phone-pad'}
                                    style={formStyles.inputStyle}
                                    value={this.state.email}
                                    placeholder="Enter your phone number"
                                    onChangeText={(text) => this.setState({ phone_number: text })}
                                    value={phone_number}
                                />
                            </View>
                            {/* Phone Number ends */}

                            <TouchableOpacity style={[formStyles.buttonContainer, formStyles.buttonPrimary]}
                                onPress={() => this.validateForm()}>
                                <Text style={formStyles.buttonText}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Placeholder.ImageContent>
            </ScrollView>
        );
    }
}

export default Login;

const loginStyles = StyleSheet.create({
});

