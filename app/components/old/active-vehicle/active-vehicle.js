import React from 'react';
import { StyleSheet, Button, Modal, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

// import firebase from 'react-native-firebase';
// 
import GLOBAL from './../../global';

import styles from './../../styles/page';

export default class ActiveVehicle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicle: {
                ...props.vehicle
            }
        }
    }

    render() {

        const status = {
            0: 'requested',
            1: 'data',
            2: 'active'
        }

        const { vehicle } = this.state;

        return (
            <View style={styles.container}>
                {/* Top Section */}
                <View style={styles.topSection}>

                    {/* Top Left */}
                    <View style={styles.topLeft}>
                        <View style={styles.imageTag}>
                        </View>
                    </View>
                    {/* Top Left Ends */}

                    {/* Top Left */}
                    <View style={styles.topRight}>

                        {/* Right Sectino */}
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

                                <Text style={[styles.createdAt, styles.textInline]}>{vehicle.created_at}</Text>
                            </View>
                            {/* Status Ends */}
                        </View>
                        {/* Right Section Ends */}

                    </View>
                    {/* Top Left Ends */}

                </View>
                {/* Top Section Ends */}

                {/* Middle Section */}
                {/* Middle Section Ends */}

                {/* Last Section */}
                {/* Last Section Ends */}
            </View>
        );
    }
}

