import React from 'react';
import { Image, StyleSheet, Button, Modal, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';

import AddVehicleModal from './../add-vehicle/add-vehicle'

// import firebaseApp from './../../utils/firebase-init';

// import { Image } from 'react-native';
// import firebase from 'react-native-firebase';

// import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import GLOBAL from './../../global';

import VehicleDetail from './../vehicle-detail/vehicle-detail';

export default class Landing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            page: 'tags',
            currentUser: {},
            vehicleModal: false,
            vehicles: {}
        }
    }

    componentDidMount() {

        // this.unsubscriber = firebase.auth().onAuthStateChanged((currentUser) => {
        //     this.setState({ currentUser });

        //     this.loadVehicles();
        // });
    }

    loadVehicles = async () => {

        // const ref = firebase.database().ref('/vehicles')

        // ref.once('value', this.setVehicles);

    }

    setVehicles = (snapshot) => {
        const vehicles = snapshot.val();
        console.log(vehicles);
        this.setState({ vehicles: vehicles, loading: false });
    }

    addVehicle = () => {
        this.setState({ vehicleModal: true });
    }

    // dismissAddVehicle() {
    //     this.setState({ vehicleModal: false });
    // }

    signOut() {
        // firebase.auth().signOut().then(function () {
        //     this.setState({ currentUser: {} });
        // }, function (error) {

        // })
        // GoogleSignin.signOut()
        //     .then(() => {
        //         this.setState({ currentUser: {} });
        //         console.log('out');
        //     })
        //     .catch((err) => {

        //     });

    }

    render() {
        const { vehicles, loading } = this.state;

        let keys = {};

        if (vehicles) {
            keys = Object.keys(vehicles);
        }

        const vehicle = {
            reg_no: 'MH AJ 1020',
            vehicle_name: 'Maruti Ritz',
            status: 2,
            fileUploads: [{ image: 'download' }]
        }

        return (

            <ScrollView style={styles.container}>

                {/* <VehicleDetail vehicle={vehicle}>
                </VehicleDetail>
 */}
                {
                    loading ?
                        // Loading Text
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loadingText}>
                                Loading Vehicles
                                <ActivityIndicator style={styles.loader} />
                            </Text>
                        </View>
                        // Loading Text Ends
                        :
                        // List of Vehicles
                        <View style={styles.vehicleList}>
                            {
                                keys && keys.length &&
                                keys.map((key, index) => (
                                    <VehicleDetail vehicle={vehicles[key]} key={key} index={key}>
                                    </VehicleDetail>
                                ))
                            }
                        </View>
                    // Vehicle List Ends
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        padding: 20,
    },
    loadingText: {
        fontSize: 20,
        color: '#9c9c9c'
    },
    loader: {
        paddingLeft: 10,
    },
    container: {
        backgroundColor:'white',
        flex: 1,
        padding: 10,
        paddingTop: 30,
        // marginTop: 10
    },
    tabContainer: {
    },
    tabStyle: {
    },
    formContainer: {
        borderBottomWidth: 1,
        backgroundColor: 'white',
        borderColor: 'whitesmoke',
        marginTop: 20,
        margin: 20,
        paddingBottom: 40
    },
    inputStyle: {
        marginTop: 30,
        padding: 2,
        borderColor: '#d6d7da',
        height: 30,
        borderBottomWidth: 1
    },
    socialFormContainer: {
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
    googleLogin: {
        marginTop: 5,
        backgroundColor: '#dd4b39',
        borderWidth: 0
    },
    buttonText: {
        color: '#ffffff'
    },
    logoContainer: {
    },
    vehicleItem: {
        backgroundColor: 'white',
        height: 80,
        // borderRadius: 2,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 4,
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray'
    },
});
