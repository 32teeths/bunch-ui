/**
 * 
 * Component that list years with months
 * 
 */

import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';

import { Actions } from 'react-native-router-flux';

import commonStyles from './../../styles/common';

export default class CustomSelect extends Component {

    constructor(props) {

        super(props);

        this.state = {
            selected: props.selected
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps) {
            this.setState({ selected: nextProps.selected });
        }
    }

    render() {

        const { options = [], chooseCategory } = this.props;

        const {selected} = this.state;

        console.log(selected,options);

        return (
            <View style={styles.selectContainer}>
                {
                    options.map((option) => {
                        return (<TouchableOpacity onPress={() => chooseCategory(`${option.c_id}`, `${option.name}`)} style={[styles.containerBorder, selected == option.c_id ? { borderColor: '#008000' } : { borderColor: '#dde8ec' }]}>
                            <View>
                                <Text style={styles.fontStyle}>

                                    {
                                        selected != option.c_id ?
                                            <FontAwesome style={[styles.cardIconStyle]}>
                                                {Icons['longArrowUp']}
                                            </FontAwesome> : null
                                    }

                                    {option.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    selectContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    containerBorder: {
        // width: '45%',
        backgroundColor: '#ecf4f7',
        paddingLeft: 15,
        paddingRight: 15,
        padding: 8,
        borderRadius: 100,
        // height: 100,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        // borderRadius: 2,
        // borderColor: '#eee',
        // borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 0.1
    },
    fontStyle: {
        textTransform: 'capitalize',
        // fontSize: 16,
        // color: '#444A45',
        // fontWeight: '500'
    }

})
