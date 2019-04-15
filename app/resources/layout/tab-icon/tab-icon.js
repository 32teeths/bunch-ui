import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class TabIcon extends React.Component {
    render() {

        let { activeTintColor, focused } = this.props;

        var iconImage;

        switch (this.props.title) {
            case 'Home':
                iconImage = 'hSquare';
                // iconImage = require('../../assets/images/icons/tag/tag_white.png');
                break;

            case 'Tags':
                iconImage = 'tags';
                // iconImage = require('../../assets/images/icons/tag/tag_white.png');
                break;
            case 'Trips':
                iconImage = 'suitcase';
                // iconImage = require('../../assets/images/icons/trips/trips_white.png');
                break;
            case 'Updates':
                iconImage = 'bell';
                // iconImage = require('../../assets/images/icons/updates/bell_white.png');
                break;
            case 'Profile':
                iconImage = 'user';
                // iconImage = require('../../assets/images/icons/accounts/person_white.png');
                break;

            default:
                break;
        }

        return (
            <View style={styles.container}>
                <Text style={[styles.iconText, focused ? styles.activeTab : styles.tab]}>
                    <FontAwesome className={styles.icon}>{Icons[iconImage]}</FontAwesome>
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // marginLeft:10,
        // alignItems: 'flex-start',
    },
    activeTab: {
        color:'#3a3a3a'
        // color:'white'
        // color:'#536C99'
        // color: '#1A3DEC'
    },
    tab: {
        color: 'lightgray'
    },
    iconText: {
        // color: 'brown',
        // margin: 5,
        fontSize: 26,
        // textAlign: 'left'
    },
    icon: {
        // color: 'red'
    }
});
