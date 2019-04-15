
import React from 'react';
import { StyleSheet, Button, Modal, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';


import logo from './../../../assets/images/logo.png';

import FontAwesome, { Icons, IconTypes } from 'react-native-fontawesome';


import commonStyles from './../../../styles/common';




export const PageHeader = (title) => {
    return (
        <View style={[navbarStyles.navBar, commonStyles.page]}>

            <View style={navbarStyles.leftWrapper}>
                {/* Header Title */}
                <View style={navbarStyles.headerTitle}>
                    <Text style={[navbarStyles.leftArrow]}>
                        <FontAwesome style={[styles.cardIconStyle]}>
                            {Icons['longArrowLeft']}
                        </FontAwesome>
                    </Text>
                </View>
                {/* Header Title Ends */}
            </View>


            {/* {
                true ? null : */}
            <View style={navbarStyles.centerWrapper}>
                {/* Header Title */}
                <View style={navbarStyles.headerTitle}>
                    <Text style={navbarStyles.apartmentName}>
                        {/* k */}
                        {/* Prestige Group */}
                        {/* {title.scene.route.params.title} */}
                    </Text>
                </View>
                {/* Header Title Ends */}
            </View>
            {/* } */}


            {/* {
                true ? null : */}
            <View style={navbarStyles.rightWrapper}>
                <TouchableOpacity
                    onPress={() => { Actions.ADDVEHICLE() }}>
                    <Text style={navbarStyles.closeIconText}>
                        {/* Add New */}
                        {/* <FontAwesome type={'FAR'}>
                            {Icons['times']}
                        </FontAwesome> */}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* } */}

        </View>


    );
}

const styles = {

}

const navbarStyles = {


    // Left Arrow Styling
    cardIconStyle: {



        fontWeight: 'bold',
    },

    leftArrow: {
        fontSize:20,
    },
    // Left Arrow Styling Ends


    logo: {
        height: 25,
        // flex:1,
        width: 25
    },
    closeIconText: {
        fontWeight: '100',
        fontSize: 25,
        // color: '#2d4e27'
        // color: 'lightgray'
        // color:'#F4F7F5'

    },
    navBar: {
        flexDirection: 'row',
        // height: 100,
        // paddingTop: 40,
        // paddingLeft: 20,
        // paddingRight: 20,
        // backgroundColor:'#2d4e27',
        // backgroundColor: 'white',
        // backgroundColor: '#F7F8F9',
        // justifyContent: 'space-between',
        // borderBottomWidth: 1,
        borderColor: '#c3c3c3',
        flexDirection: 'row',
        // height: 100,
        paddingTop: 40,
        paddingLeft: 20,
        // backgroundColor: 'white',
        // backgroundColor: '#F4F7F5',
        // backgroundColor: '#2d4e27',
        // backgroundColor:'#ecf2ed',


        justifyContent: 'space-between',
        // borderBottomWidth: 1,
        // borderColor: '#c3c3c3'

    },
    centerWrapper: {
        // textAlign:'center'
    },
    headerTitle: {
    },
    rightWrapper: {
        // marginTop: 20,
        marginRight: 25,
    },
    addNewText: {
        fontSize: 18,
        color: '#9a6607'
    },
    apartmentName: {
        fontSize: 20,
        // fontWeight: 'bold',
        // color: 'green'
    },
    tabHeading: {
        // fontSize: 40,
        // color: 'navyblue'
    },
    subHeadingWrapper: {
        paddingTop: 20
    },
    tabSubHeading: {
        paddingTop: 5,
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingLeft: 10,
        color: '#114f80'
    }
}
