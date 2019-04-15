import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import moment from "moment";

export default class Maintenance_card extends Component {

    render() {

        return (
            <View style={{
                flex: 1, backgroundColor: '#ffffffff', justifyContent: 'center',
                alignItems: 'center', marginHorizontal: 3, marginVertical: 3, paddingHorizontal: 40,
                paddingVertical: 10,
                borderWidth: 1,
                // borderColor:'gray',

                // borderColor:GLOBAL.COLORS.SECONDARY,

                borderColor: '#eaeaea',
            }}>

                <View style={{ width: '100%' }}>

                    <View style={{}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#000000' }}>
                            {this.props.description}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: '100%' }}>
                            <Text style={{
                                color: '#000000', fontSize: 13,
                                marginTop: 4
                            }}>
                                {moment(this.props.created_at).format("YYYY-MM-DD")}
                            </Text>
                        </View>
                    </View>

                    <View style={{}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#000000' }}>
                            {this.props.category}
                        </Text>
                    </View>


                </View>
            </View>

        );
    }
};