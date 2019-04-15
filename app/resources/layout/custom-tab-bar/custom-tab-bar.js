
import React from 'react';
import { StyleSheet, Button, Modal, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';


// import logo from './../../assets/images/logo.png';

import FontAwesome, { Icons, IconTypes } from 'react-native-fontawesome';


import commonStyles from './../../../styles/common';


export const CustomTabBar = (props) => {

    return (
        <View style={[tabBarStyles.container]}>

            <View style={tabBarStyles.centerWrapper}>
                {/* Header Title */}
                <View style={tabBarStyles.headerTitle}>
                    <Text style={tabBarStyles.apartmentName}>
                        Home
                    </Text>
                </View>
                {/* Header Title Ends */}
            </View>


            <View style={tabBarStyles.rightWrapper}>
                <TouchableOpacity
                    onPress={() => { Actions.ADDVEHICLE() }}>
                    <Text style={tabBarStyles.bellIconText}>
                        {/* Add New */}
                        <FontAwesome className={tabBarStyles.noticeIcon} type={'FAR'}>
                            {Icons['bellO']}
                        </FontAwesome>
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}


const tabBarStyles = {

    container:{
        // backgroundColor: '#ecf2ed',

        // backgroundColor:'white',
        // margin:10,
        // flex:1,
        height:40,
        flexDirection:'row'
    }


}
