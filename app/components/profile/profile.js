import React, { Component } from 'react';
import { Image, StyleSheet, Button, Modal, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

// import firebase from 'react-native-firebase';
import FontAwesome, { Icons } from 'react-native-fontawesome';


import { PostData } from './../../utils/http.utils';
import { Core, RemoveStore } from './../../utils/core.utils';

import profile from './../../assets/images/profile.jpg';

import commonStyles from './../../styles/common';

import GLOBAL from './../../global';


export default class Profile extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            activeUser: {}
        }
    }

    componentDidMount = async () => {

        const result = await Core.get('activeUser');
        this.setState({ activeUser: JSON.parse(result) });

        console.log(this.state.activeUser);
        // this.unsubscriber = firebase.auth().onAuthStateChanged((currentUser) => {
        //     this.setState({ currentUser });
        // });
    }


    logOut = async () => {
        const result = await PostData({ url: 'me/logout' })
        if (result.status) {
            RemoveStore('token');
            Actions.root();
        }
    }

    render() {

        const { activeUser } = this.state;

        console.log(activeUser);

        return (
            <ScrollView style={[styles.scrollContainer, styles.container, commonStyles.page]}>
                <View style={[commonStyles.containerPadding, commonStyles.container]}>

                    <View style={styles.userBox}>
                        <View style={styles.userName}>
                            <Text style={[styles.name, commonStyles.heroText]}>
                                {activeUser.first_name} {activeUser.last_name}
                            </Text>
                            <Text style={[commonStyles.secondaryText]}>Edit Profile</Text>
                        </View>
                        <View style={styles.userImage}>
                            <Image resizeMode="contain" style={styles.profile} source={profile} />
                        </View>
                    </View>



                    <View style={[styles.controls]}>
                        <TouchableOpacity style={[styles.buttonContainer]}>

                            <Text style={styles.controlLabel}>Terms</Text>

                            <FontAwesome style={styles.controlIcon}>
                                {Icons['listAlt']}
                            </FontAwesome>

                        </TouchableOpacity>
                    </View>




                    <TouchableOpacity style={[styles.buttonContainer]}
                        onPress={() => { }}>

                        <Text style={styles.controlLabel}>Contact</Text>

                        <FontAwesome style={styles.controlIcon}>
                            {Icons['phone']}
                        </FontAwesome>

                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonContainer]}
                        onPress={() => { }}>

                        <Text style={styles.controlLabel}>Settings</Text>

                        <FontAwesome style={styles.controlIcon}>
                            {Icons['gear']}
                        </FontAwesome>

                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonContainer]}
                        onPress={() => { }}>

                        <Text style={styles.controlLabel}>Documents</Text>

                        <FontAwesome style={styles.controlIcon}>
                            {Icons['filesO']}
                        </FontAwesome>

                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonContainer]}
                        onPress={() => { }}>

                        <Text style={styles.controlLabel}>Bank Accounts</Text>

                        <FontAwesome style={styles.controlIcon}>
                            {Icons['money']}
                        </FontAwesome>

                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonContainer]}
                        onPress={this.logOut}>

                        <Text style={styles.controlLabel}>Log Out</Text>

                        <FontAwesome style={styles.controlIcon}>
                            {Icons['signOut']}
                        </FontAwesome>

                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.buttonContainer]}
                        onPress={() => { }}>
                        <Text style={styles.buttonText}>About Us</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: -30,
        // marginTop: 30,
        flex: 1,
        flexDirection: 'column'
    },

    // Profile Section
    profile: {
        width: 100,
        height: 200,
        flex: 1,
        borderRadius: 50
    },
    // Profile Section Ends

    // Controls Section

    controlLabel: {
        fontSize: 18

    },
    controlIcon: {
        fontSize: 20

    },

    buttonText: {
    },

    alerts: {
        flex: 1,

    },
    userBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginBottom:20
        // height:30,

    },
    controls: {
        marginTop: -30,

        // marignTop:'-10',
        // padding:10
    },
    buttonContainer: {
        // padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 2,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        // marginTop: 40,
        height: 60,
        // marginBottom:10,
        // backgroundColor: '#707E9A',
        // borderRadius: 2,
    },
});
