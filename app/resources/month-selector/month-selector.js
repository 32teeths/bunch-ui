/**
 * 
 * Component that list years with months
 * 
 */

import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import { Actions } from 'react-native-router-flux';

import commonStyles from './../../styles/common';

export default class CardListing extends Component {

    constructor(props) {

        super(props);

        this.state = {
        }
    }

    componentWillReceiveProps = (nextProps) => {
    }

    render() {

        const { listing = [], configuration = {} } = this.state;

        return (
            <View style={[styles.monthSelector]}>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    monthSelector: {

    }
})
