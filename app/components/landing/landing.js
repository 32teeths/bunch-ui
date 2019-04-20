import React from 'react';
import {
    Image, StyleSheet, Button, Modal, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Picker, Animated, Easing
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Placeholder from 'rn-placeholder';

import OptionsCard from './elements/options-card/options-card';
import NoticeBar from './elements/notice-bar/notice-bar';

import { GetData } from './../../utils/http.utils';
import { Notify, Core, SetStore, GetStore, RemoveStore } from './../../utils/core.utils';
import { getAccessToken, setPermission, removePermission } from '../../config/AccessToken';

// import detailIcon from './../../assets/images/details.png'

// iconImage = require('../../assets/images/icons/tag/tag_white.png');


import Loader from '../reusable/Loader';
import GLOBAL from './../../global';

// import FlashMessage from "react-native-flash-message";


import commonStyles from './../../styles/common';

/**
 * Landing of CareTaker App
 *
 * @export
 * @class Landing
 * @extends {React.Component}
 */
export default class Landing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            circlePosition: new Animated.Value(-500),

            activeUser: {},
            isLoading: true,
            page: 'tags',
            currentUser: {},
            vehicleModal: false,
            vehicles: {},
            token: '',
            permissions: '',
        }
    }

    loadVehicle = () => {
    }

    componentDidMount() {

        // bring down the circle
        this.expandCirlce();
    }

    /**
     * 
     * Expand Circle 
     */
    expandCirlce = () => {
        Animated.timing(
            this.state.circlePosition,
            {
                toValue: -300,
                duration: 700,
                easing: Easing.easing
            }
        ).start();
    }

    /**
     *
     *
     * @memberof Landing
     */
    getData = async () => {
        const result = await Get({ url: '/apartments' });
    }

    render() {

        // return null;

        const { isLoading, activeUser = {}, circlePosition } = this.state;

        let r_maintainance = {
            caption: 'Support',
            subHeading: 'Raise an issue',
            icon: 'yelp',
            image: require('./../../assets/images/support.png'),
            component: 'SUPPORT',
            style: {
                color: '#10b879',
                backgroundColor: 'black'
            }
        }, r_accounts = {
            caption: 'Summary',
            subHeading: 'Of March',
            image: require('./../../assets/images/accounts.png'),
            icon: 'creditCard',
            component: 'ACCOUNT',
            style: {
                color: '#9b25ff'
            }
        }, r_board = {
            caption: 'Help',
            subHeading: 'Call for help',
            image: require('./../../assets/images/people.png'),
            icon: 'users',
            component: 'BOARD',
            style: {
                color: '#fcd122'
            }

        }, r_apartment = {
            image: require('./../../assets/images/apartment.png'),

            caption: 'Apartment',
            subHeading: 'Know the community',
            icon: 'building',
            component: 'APARTMENT',
            style: {
                color: '#fe3586'
            }

        }, r_notice = {
            image: require('./../../assets/images/todo.png'),

            caption: 'To Do',
            subHeading: 'Clear the work',
            icon: 'archive',
            component: 'NOTICE',
            style: {
                color: '#10b879'
            }
        }, r_rentals = {
            image: require('./../../assets/images/rent.png'),

            caption: 'Rentals',
            subHeading: 'Record a collection',

            icon: 'archive',
            component: 'RENTALS',
            style: {
                color: '#10b879'
            }
        };


        let options = [];
        // ACCORDING TO PEMISSION PUSH THE PAGE TO OPTION:-

        options.push(r_maintainance)

        options.push(r_accounts)

        options.push(r_rentals)

        options.push(r_notice)

        options.push(r_board)

        options.push(r_apartment);

        return (
            <ScrollView style={[commonStyles.container, commonStyles.page]}>

                {/* Circle Shape */}
                <Animated.View style={[styles.CircleShapeView, { left: circlePosition, top: circlePosition }]}>
                </Animated.View>

                {/* Circle Shape Ends */}

                <View style={[commonStyles.containerPadding]}>

                    {/* Landing Apartment Name */}

                    {/* Placeholder Line */}
                    <Placeholder.Line
                        style={{ marginBottom: 22 }}
                        width="60%"
                        textSize={22}
                        onReady={!isLoading}>

                        <View style={[navbarStyles.navBar, isLoading ? commonStyles.marginTop : null]}>

                            {/* Apartment Name */}
                            <View style={[navbarStyles.headerTitle, commonStyles.flex]}>

                                {/* Apartment Name */}
                                <Text style={navbarStyles.apartmentName}>
                                    {isLoading ? null : activeUser.apartment['name']}
                                </Text>
                                {/* Apartment Name Ends */}

                                {/* Caret Icon */}
                                <Text style={[commonStyles.iconStyle, commonStyles.paddingLeft]}>
                                    <FontAwesome style={[]}>
                                        {Icons['caretDown']}
                                    </FontAwesome>
                                </Text>
                                {/* Caret Icon Ends */}

                            </View>
                            {/* Apartment Name Ends */}

                            {/* Notification Icon */}
                            <View style={navbarStyles.rightWrapper}>
                                <TouchableOpacity
                                    onPress={() => { Actions.ADDVEHICLE() }}>
                                    <Text style={navbarStyles.bellIconText}>
                                        {/* Add New */}
                                        <FontAwesome className={styles.noticeIcon} type={'FAR'}>
                                            {Icons['bar']}
                                        </FontAwesome>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/* Notification Icon Ends */}

                        </View>
                    </Placeholder.Line>
                    {/* Placeholder line ends */}

                    {/* Landing Apartment Name Ends */}

                    {/* Hero Section */}
                    <View style={styles.hero}>

                        {/* Header Title */}
                        <View style={commonStyles.heroMain}>
                            <Text style={[commonStyles.heroText, commonStyles.primaryText]}>
                                {isLoading ? 'Fetching Details' : 'Hello ' + activeUser.first_name || 'mate'}
                            </Text>
                        </View>
                        {/* Header Title Ends */}

                        {/* Header Title */}
                        {/* Placeholder Line */}
                        <Placeholder.Line
                            style={{ marginTop: 22 }}
                            width="60%"
                            textSize={22}
                            onReady={!isLoading}>

                            <View style={[commonStyles.heroSecondary, commonStyles.marginTop]}>
                                <Text style={[commonStyles.heroSecondaryHeading, commonStyles.secondaryText]}>
                                    Hope you are having a good day
                                </Text>
                            </View>

                        </Placeholder.Line>
                        {/* Header Title Ends */}

                    </View>
                    {/* Hero Section Ends */}

                    {/* Notice Bar */}
                    {/* <NoticeBar /> */}
                    {/* Notice Bar Ends */}

                </View>

                {/* , styles.bgSmoke */}
                <View style={[commonStyles.containerPadding]}>

                    {/* Notice Alert Section Ends */}

                    {/* Options Heading Section */}
                    <View style={styles.optionsHeadingSection}>

                        {/* Header Title */}
                        <View style={styles.optionsHeading}>
                            <Text style={[commonStyles.subHeading]}>
                                {isLoading ? 'Loading' : options.length} Options
                            </Text>
                        </View>
                        {/* Header Title Ends */}

                        {/* Header Title */}
                        <View style={styles.optionsSecondaryHeading}>
                            <Text>
                                {/* Prestige Group */}
                            </Text>
                        </View>
                        {/* Header Title Ends */}

                    </View>
                    {/* Options Heading Ends */}

                    <Placeholder.ImageContent
                        size={60}
                        animate="fade"
                        lineNumber={4}
                        lineSpacing={5}
                        lastLineWidth="30%"
                        onReady={!isLoading}>

                        {/* Options Tabs */}
                        <View style={styles.optionsSection}>

                            {/* Iterating Options */}
                            {
                                options.map((option, key) => <OptionsCard style={option.style} key={key} index={key} option={option} />)
                            }
                            {/* Iterating Options Ends*/}

                        </View>
                        {/* Options Tabs Ends */}

                    </Placeholder.ImageContent>

                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({

    // Container Styles
    container: {
        flex: 1,
        paddingTop: 10,
    },
    // Container Styles Ends

    // Heading Styes

    // Option Styling
    optionsSection: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    CircleShapeView: {
        position: 'absolute',
        // left: -250,
        // top: -250,
        width: 550,
        height: 550,
        borderRadius: 550 / 2,
        backgroundColor: '#e2fbff'
        // backgroundColor:'#cef9ff'
        // backgroundColor: '#91f2ff'
        // backgroundColor: '#00BCD4'
    },
});


/**
 * Styles for the navbar
 */
const navbarStyles = {
    navBar: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
        borderColor: '#c3c3c3',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    apartmentName: {
        fontSize: 20,
        fontWeight: '500',
        // color: 'green'
    },

    rightWrapper: {
        // marginTop: 20,
        marginRight: 25,
    },
    bellIconText: {
        fontSize: 25,
        color: '#2d4e27'
        // color: 'lightgray'
        // color:'#F4F7F5'

    },
}