import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import Logo from './../logo/logo';
import { Actions } from 'react-native-router-flux';

import ImageWrapper from './../../components/image-wrapper/image-wrapper';

import moment from 'moment';

// import * as firebase from 'firebase';
// import firebase from 'react-native-firebase';
// import { Image } from 'react-native';

export default class VehicleDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicle: this.props.vehicle,
            index: this.props.index
        };

        // this.vehicle = firebase.database().ref('/vehicles/' + this.props.index);
    }

    selectVehicle = () => {
        const { vehicle } = this.state;
        const { index } = this.props;

        if (vehicle.status == 0) {
            Actions.VEHICLE_INFO({ vehicle });
        } else if (vehicle.status == 1) {
            Actions.SHIPPINGDETAILS({ index });
        } else {
            Actions.ACTIVE_VEHICLE({ vehicle });
        }
    }

    deleteVehicle = async () => {

        var ref = await this.vehicle.remove();

    }

    render() {

        const status = {
            0: 'requested',
            1: 'data',
            2: 'active'
        }

        const { vehicle } = this.state;

        return (
            // Vehicle Detail wrapper
            <View style={[styles.vehicleDetailWrapper]}>
                <TouchableOpacity style={[styles.vehicleItem, styles.vehicleDetail, vehicle.status == 0 && styles.requested, vehicle.status == 1 && styles.data, vehicle.status == 2 && styles.active]} onPress={this.selectVehicle}>

                    {/* Outer Container */}
                    <View style={[styles.wrapper, vehicle.status == 0 && styles.requested, vehicle.status == 1 && styles.data, vehicle.status == 2 && styles.active]}>

                        {/* Left Section */}
                        <View style={styles.imageContainer}>

                            {/* Image of the car */}
                            {/* <ImageWrapper source={vehicle.image.downloadURL} /> */}
                            {/* Image of the car ends */}

                        </View>
                        {/* Left Section Ends */}

                        {/* Right Section */}
                        <View style={styles.textContainer}>

                            {/* Vehicle Name */}
                            <View style={[styles.textWrapper, styles.vehicleWrapper]}>
                                <Text style={styles.vehicleName}>{vehicle.vehicle_name}</Text>
                            </View>
                            {/* Name Ends */}

                            {/* Registration No */}
                            <View style={[styles.textWrapper, styles.regWrapper]}>
                                <Text style={styles.regNo}>{vehicle.reg_no}</Text>
                            </View>
                            {/* Registration No Ends */}

                            {/* Status  */}
                            <View style={[styles.textWrapper, styles.status]}>
                                {/* <View style={[styles.statusIndicator, vehicle.status == 0 && styles.statusRequested, vehicle.status == 1 && styles.statusData, vehicle.status == 2 && styles.statusActive]}> */}
                                <Text style={[styles.statusText, styles.textInline]}>{status[vehicle.status]}</Text>
                                {/* </View> */}

                                <Text style={[styles.createdAt, styles.textInline]}>
                                    {
                                        // vehicle.created_at 
                                        moment(vehicle.created_at).format('MMMM Do YYYY')
                                    }
                                </Text>
                            </View>
                            {/* Status Ends */}
                        </View>
                        {/* Right Section Ends */}

                    </View>
                    {/* Outer Ends */}
                    <View style={styles.deleteWrapper}>

                        <TouchableOpacity onPress={this.deleteVehicle}>
                            {/* <Text>Delete</Text> */}
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    vehicleDetailWrapper: {
        borderBottomWidth:1,
        borderColor:'#BCC2CE'
    },
    statusText: {
        backgroundColor: 'aliceblue',
        paddingTop: 2,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 2,
        fontSize: 12,
        // textTransform:'uppaercase'

    },
    uploadAvatar: {
        height: 60,
        width: 60
    },
    vehicleDetail: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderTopWidth: 1,

        // borderColor:'gray',
        // borderColor: '#f5f3f3',
        height: 110,
        // shadowOffset: { width: 5, height: 1 },
        // shadowOpacity: .1,
        // shadowRadius: 5,
        marginBottom: 8,
        padding: 10,
        // borderLeftWidth: 5,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0
    },
    imageContainer: {
        width: '25%',


    },
    textContainer: {
        paddingLeft: 20
    },
    deleteWrapper: {
        flexDirection: 'column',
        paddingRight: 10,
        alignItems: 'flex-end'
    },
    wrapper: {
        flex: 1,
        borderColor: '#d2d1d1',
        borderBottomColor: '#d2d1d1',
        flexDirection: 'row',
    },
    requested: {
        borderColor: '#ffe504',
    },
    data: {
        borderColor: 'orange',
    },
    active: {
        borderColor: 'green'
    },
    statusIndicator: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingBottom: 2,
        paddingRight: 10,
        borderRadius: 4,
    },
    statusRequested: {
        backgroundColor: '#ffe504',
    },
    statusData: {
        backgroundColor: 'orange',
    },
    statusActive: {
        backgroundColor: 'green'
    },
    regNo: {
        color: '#6d6d6d'
    },
    vehicleWrapper: {
        borderBottomWidth: 1,
        borderColor: '#d2d1d1',
    },
    regWrapper: {
        marginTop: 4
    },
    textWrapper: {
        paddingTop: 2,
        paddingBottom: 2
    },
    vehicleName: {
        color: '#0d1769',
        fontSize: 14,
        fontWeight: 'bold',
        paddingBottom: 2,
    },
    status: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    vehicleType: {
        flex: 0.3,
    },
    createdAt: {
        color: '#6f3333',
        marginLeft: 4
    }
});
