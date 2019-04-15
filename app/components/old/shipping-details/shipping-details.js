import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Logo from './../logo/logo';
import { Actions } from 'react-native-router-flux';

// import * as firebase from 'firebase';
// import firebase from 'react-native-firebase';

export default class ShippingDetails extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            index: this.props.index,
            house_number: '',
            pin_code: '',
            street_address: '',
        };

    }

    addShippingDetails = () => {

        if (this.state.house_number && this.state.pin_code && this.state.street_address) {
            // firebase.database().ref('vehicles/' + this.props.index+'/status')
        }

        firebase.database().ref('vehicles/' + this.props.index + '/shipping_details/').set({
            house_number: this.state.house_number,
            pin_code: this.state.pin_code,
            street_address: this.state.street_address

        }).then(function (result) {
            Actions.TAGS();
        })
    }

    render() {
        console.log(this.props.index)
        return (
            <ScrollView style={styles.container}>
                <View style={styles.logoContainer}>
                    {/* <Logo></Logo> */}
                </View>

                <View style={styles.formContainer}>

                    <Text style={styles.linkStyling}
                        onPress={() => { Actions.REGISTER() }}>
                        Please provide the shipping details
                    </Text>

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="House Number" value={this.state.house_number}
                        onChangeText={(text) => this.setState({ house_number: text })}
                    />

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Street Address" value={this.state.street_address}
                        onChangeText={(text) => this.setState({ street_address: text })}
                    />

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Pin Code" value={this.state.pin_code}
                        onChangeText={(text) => this.setState({ pin_code: text })}
                    />

                    <TouchableOpacity style={[styles.buttonContainer, styles.buttonSuccess]}
                        onPress={this.addShippingDetails}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // color: 'yellow',
        flex: 1,
        backgroundColor: 'white',
        // marginBottom: 10
    },
    inputStyle: {
        marginTop: 30,
        padding: 2,
        borderColor: '#d6d7da',
        height: 30,
        borderBottomWidth: 1
    },
    formContainer: {
        // borderBottomWidth: 1,
        borderColor: 'whitesmoke',
        marginTop: 20,
        margin: 20,
        paddingBottom: 40
        // marginBottom:40,
    },
    socialFormContainer: {
        // borderBottomWidth: 1,
        // borderColor: '#d6d743',
        margin: 10,
        borderWidth: 0
    },
    linkStyling: {
        marginTop: 20,
    },
    buttonContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#707E9A',
        marginTop: 40,
        height: 60,
        backgroundColor: '#707E9A',
        borderRadius: 2,
    },
    buttonSuccess: {
        backgroundColor: 'green',
    },
    uploadButton: {
        color: 'black',
        backgroundColor: 'white',
    },
    uploadText: {
        color: 'black',
    },
    buttonText: {
        color: '#ffffff'
    },
    logoContainer: {

    }
});
