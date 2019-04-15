import React from 'react';

import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import commonStyles from './../../../../styles/common';

import GLOBAL from './../../../../global';

export default class OptionsCard extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            option: props.option
        };
    }

    render() {

        const { index } = this.props;
        const { option } = this.state;

        return <TouchableOpacity key={index} onPress={Actions[option.component]} style={[styles.optionCard, commonStyles.borderStyle]}>
            <View style={styles.optionsTab}>

                <View style={styles.optionsIcon}>
                    {/* <Text style={[styles.optionIconFont, option.style]}> */}
                    <Image style={{ width: 30, height: 30 }} source={option.image} />
                    {/* </Text> */}
                </View>
                <View style={styles.optionsCaption}>
                    <Text style={styles.optionTabHeading}>
                        {option.caption}
                    </Text>
                    <Text style={[styles.optionTabSubHeading,commonStyles.smallText]}>
                        {option.subHeading}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>;
    }
}


const styles = StyleSheet.create({

    page: {
    },

    optionCard: {
        width: '45%',
        height: 140,
        margin: 8,
        // padding: 20,
        // backgroundColor: 'white',
        // backgroundColor:GLOBAL.COLORS.PRIMARY,
        // shadowOffset: { width: 5, height: 5, },
        // shadowColor: 'gray',
        // shadowOpacity: 0.1,
        borderRadius: 10,
        borderWidth: 10,
        borderColor: 'black',
        // width:100
        // flex: 1
    },
    optionsTab: {
        // borderColor:GLOBAL.COLORS.PRIMARY,
        // borderWidth:1,
        padding: 20,
        // flexDirection: 'column',
        flex: 1,
        // height:100,
        justifyContent: 'space-between',
        borderRadius: 10,
        width: '100%',
        // ba

        borderWidth: 5,
        borderColor: 'whitesmoke',

    },
    optionsCaption: {
        flex: 1,
        justifyContent: 'flex-end'
        // alignItems:'flex-end'
        // alignSelf:'flex-end'
    },
    optionTabHeading: {
        // alignSelf:'flex-end',
        fontSize: 14,
        color: '#303030'
        // color:'#3b9ed5'
        // color:'navyblue',
        // color: '#444A45',
        // fontWeight: '500'
    },
    optionTabSubHeading:{
        // color:'#3b9ed5',
        // color:'brown',
        // color:'#110F0D',
        fontSize:12,
        // marginTop:10,

    },

    optionIcon: {
        fontSize: 17,

        // color:'#1f3454'
        // color: '#444A45',

    },
    optionIconFont: {
        fontSize: 20,
        textAlign: 'left',
        // page: {
        // '0': 'red',
        // '1': 'blue',
        // '3': 'yellow'
        // }
        // color: '#444A45'
        // color: 'brown'
        // color: '#07167C',
        // color: '#1f3454'

    }
})




