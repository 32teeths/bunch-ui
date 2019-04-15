import React from 'react';
import { StyleSheet, Button, Modal, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

// import firebase from 'react-native-firebase';

import GLOBAL from './../../global';

export default class Trips extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
    }

    signOut() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tripItem}>
                    <View style={styles.tripDetail}>

                        <View style={styles.tripType}>
                            <View style={styles.tripTypeTextWrapper}>
                                <Text style={styles.typeText}>IN</Text>
                            </View>

                        </View>
                        <View style={styles.tripVenue}>
                            <Text style={styles.venueName}>Bagmane Tech Park</Text>
                            <Text style={styles.entryTime}>12:30 pm , March 1</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.tripItem}>
                    <View style={styles.tripDetail}>

                        <View style={styles.tripType}>
                            <View style={styles.tripTypeTextWrapper}>
                                <Text style={[styles.typeText,styles.typeOut]}>OUT</Text>
                            </View>

                        </View>
                        <View style={styles.tripVenue}>
                            <Text style={styles.venueName}>Si Apartments</Text>
                            <Text style={styles.entryTime}>12:30 am , March 2</Text>
                        </View>
                    </View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
    tripItem: {
        backgroundColor: 'white',
        height: 80,
        borderRadius: 2,
        marginBottom: 4,
        width: '100%',
        borderWidth: 1,
        borderColor: '#d2d1d1',
    },
    tripDetail: {
        flex: 1,
        flexDirection: 'row'
    },
    tripType: {
        flex: 0.3,
    },
    tripTypeTextWrapper: {
        height:80,
        padding:2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    typeText: {
        backgroundColor: '#c7ffc6',
        color: '#10771e',
        padding:4,
        borderWidth:1,
        borderColor:'gray',
        borderRadius:3,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        fontSize: 13
    },
    typeOut:{
        backgroundColor: '#ffc6c6',
        color: '#771010',

    },
    tripVenue:{
        paddingTop:20
    },
    entryTime:{
        color:'brown'
    }
});
