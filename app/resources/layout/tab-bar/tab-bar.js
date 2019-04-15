import React from 'react';
import { StyleSheet, Button, Modal, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';


// import logo from './../../assets/images/logo.png';

import FontAwesome, { Icons, IconTypes } from 'react-native-fontawesome';


export default class TabBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <View style={navBarStyles.navBar}>
                <View style={navBarStyles.leftWrapper}>
                    <Text style={navBarStyles.tabHeading}>
                        asdf
                        {/* {title.scene.route.params.title} */}
                    </Text>
                </View>
            </View>
        );
    }
}

export const TagsNavBar = (title) => {
    return (
        <View style={navBarStyles.navBar}>
            <View style={navBarStyles.leftWrapper}>
                {/* Header Title */}
                <View style={navBarStyles.headerTitle}>
                    <Text style={navBarStyles.tabHeading}>
                        {title.scene.route.params.title}
                    </Text>
                </View>
                {/* Header Title Ends */}
                <View style={navBarStyles.subHeadingWrapper}>
                    <Text style={navBarStyles.tabSubHeading}>
                        Linked {title.scene.route.params.title}
                    </Text>
                </View>
            </View>
            <View style={navBarStyles.rightWrapper}>
                <TouchableOpacity
                    onPress={() => { Actions.ADDVEHICLE() }}>
                    <Text style={navBarStyles.addNewText}>
                        Add New
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

/**
 * 
 * Custom Navbar that will be used for each routes
 * 
 * @param  {} title
 */
export const CustomNavBar = (title) => {
    return (
        <View style={CustomNavBarStyles.navBar}>
            <Text style={CustomNavBarStyles.tabHeading}>
                {title.scene.route.params.title}
            </Text>
        </View>
    );
}

/**
 * 
 * Custom Navbar styles
 * 
 * @param  {} title
 */
const CustomNavBarStyles = {
    navBar: {
        flexDirection: 'row',
        height: 100,
        paddingTop: 40,
        paddingLeft: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        // borderBottomWidth: 1,
        // borderColor: '#c3c3c3'
    },
    tabHeading: {
        // fontSize: 18,
        fontWeight: 'bold',
        color: '#0e12a7',
        fontSize: 30,
        // color: 'navyblue'
    },
}



const styles = {
    logo: {

        height: 30,
        // flex:1,
        width: 30
    }
}


const landingStyles = {
    navBar: {
        flexDirection: 'row',
        // height: 100,
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        // borderBottomWidth: 1,
        borderColor: '#c3c3c3'
    },
    centerWrapper: {
        // textAlign:'center'
    }

}


const navBarStyles = {
    navBar: {
        flexDirection: 'row',
        height: 100,
        paddingTop: 40,
        paddingLeft: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        // borderBottomWidth: 1,
        // borderColor: '#c3c3c3'
    },
    headerTitle: {
    },
    rightWrapper: {
        marginTop: 20,
        marginRight: 20,
    },
    addNewText: {
        fontSize: 18,
        color: '#9a6607'
    },
    tabHeading: {
        fontSize: 40,
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
