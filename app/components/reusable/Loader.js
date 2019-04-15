/*
    Loader component used in almost all screens.
*/
import React, { Component } from 'react';
import { View, Image, ActivityIndicator, Platform } from 'react-native'

export default class Loader extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View>
                    <ActivityIndicator
                        color='#383838'
                        size={Platform.OS == 'ios' ? 'large' : 40}
                    />
                </View>
            </View>
        );
    }
}