import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Alert, Platform } from 'react-native';

import Logo from './../logo/logo';
import { Actions } from 'react-native-router-flux';

// import * as firebase from 'react-native-firebase';
import formStyles from '../../styles/forms'

import commonStyles from './../../styles/common';

import Loader from '../reusable/Loader';
import { setAccessToken } from '../../config/AccessToken';

import { Core, SetStore } from './../../utils/core.utils';

import Placeholder from 'rn-placeholder';

import GLOBAL from './../../global';

class Otp extends Component {

    constructor(props) {

        super(props);

        this.state = {
            phone_number: this.props.phone_number,
            otp: '654321',
            isLoading: true,
            wrongNumber: false // variable maintained to show an error if the number not found
        }
    }

    componentDidMount() {

        // Validate the phone_number 
        // this.validateMobile();
        this.setState({ isLoading: false });

    }

    /**
     * 
     * 
     */
    validateMobile = () => {
        const { phone_number } = this.props;

        let formBody = {
            phone_number: phone_number
        };


        var object = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-Apartment-Id': 1

            },
            body: JSON.stringify(formBody)
        };

        var url = GLOBAL.API.API_BASE_URL + 'otp';

        fetch(url, object)
            .then(res => res.json())
            .then(res => {

                this.setState({ isLoading: false });

                if (res.status == 'success') {
                    // Actions.otp({ phone: this.state.phone_number });

                    this.setState({ isLoading: false });


                } else {
                    this.setState({ wrongNumber: true });

                    this.setState({ isLoading: false });



                    this.errorMessage('Number not found');
                }
            })
            .catch(error => {
                this.setState({ isLoading: false });
                this.errorMessage('Something Went Wrong,Please try again.');
            });
    }

    validateForm = () => {
        const { otp } = this.state;
        if (otp.trim()) {
            console.log(otp);
            this.submitForm();
        } else {
            Alert.alert(
                "OTP verification failed",
                "Please Enter OTP",
                [
                    { text: 'OK', style: 'cancel' },
                ],
                { cancelable: false }
            );
            return 0;
        }
    }

    submitForm() {

        Actions.main_tab()

        // Api Check for login should happen here
    }

    errorMessage(msg) {
        alert(msg)
    }

    render() {

        const { isLoading, wrongNumber, phone_number } = this.state;

        return (
            <ScrollView style={[commonStyles.container, commonStyles.containerPadding]}>

                <View style={[commonStyles.outline]}>

                    {/* Hero Section */}
                    <View style={commonStyles.hero}>

                        {/* Header Title */}
                        <View style={commonStyles.heroMain}>
                            <Text style={[commonStyles.heroText, commonStyles.primaryText]}>
                                {isLoading ? 'Verifying' : 'Verify'} your number
                            </Text>
                        </View>
                        {/* Header Title Ends */}

                        {/* Header Title */}
                        <View style={commonStyles.heroSecondary}>
                            <Text style={[commonStyles.heroSecondaryHeading, commonStyles.secondaryText]}>
                                We've sent an OTP to {phone_number}
                            </Text>
                        </View>
                        {/* Header Title Ends */}


                    </View>
                    {/* Hero Section Ends */}
                </View>

                <View style={[commonStyles.outline]}>
                    {/* Placeholder content during api call  */}


                    <Placeholder.ImageContent
                        size={60}
                        animate="fade"
                        lineNumber={4}
                        lineSpacing={5}
                        lastLineWidth="30%"
                        onReady={!isLoading}
                    >

                        {
                            this.state.isLoading ?
                                <Text style={commonStyles.loadingText}>
                                    Verifying phone number
                            </Text>
                                :
                                <View>
                                    <View style={[formStyles.formContainer, loginStyles.formContainer]}>

                                        {/* OTP */}
                                        <View style={[]}>
                                            <Text style={[formStyles.labelStyle, formStyles.elementPadding]}>
                                                OTP
                                            </Text>

                                            <TextInput
                                                keyboardType='phone-pad'
                                                style={formStyles.inputStyle}
                                                value={this.state.otp}
                                                placeholder="Enter the otp"
                                                onChangeText={(text) => this.setState({ otp: text })}
                                            // value={otp}
                                            />
                                        </View>
                                        {/* OTP ends */}

                                        <TouchableOpacity style={[formStyles.buttonContainer, formStyles.buttonPrimary]}
                                            onPress={() => this.validateForm()}>
                                            <Text style={formStyles.buttonText}>
                                                Submit
                                        </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }

                    </Placeholder.ImageContent>

                    {
                        wrongNumber ?
                            <Text style={commonStyles.dangerText}>
                                The Number you have entered is not registred with us.
                                                </Text> : null
                    }

                </View>
            </ScrollView>
        );
    }
}

const loginStyles = StyleSheet.create({
    formContainer: {
        marginTop: 10
    }
});




export default Otp;



