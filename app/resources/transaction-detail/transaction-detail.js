/**
 * 
 * Component that list years with months
 * 
 */

import React, { Component } from 'react';

import { Image ,StyleSheet, ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import { Actions } from 'react-native-router-flux';

import commonStyles from './../../styles/common';

export default class TransactionDetail extends Component {

    constructor(props) {

        super(props);

        console.log(props);

        this.state = {
            // record: props.month
        }
    }

    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps);
    }

    render() {

        const { record } = this.props;

        return (
            <ScrollView style={[styles.transactionDetail]}>

                {/* Table Heading Section */}

                <View style={[commonStyles.tableHeader]}>

                    <View style={[styles.tableTitle]}>
                        <Text style={[commonStyles.sectionHeading, styles.tableHeading]}>
                            Details
                        </Text>
                    </View>

                    <View style={[styles.tableAction]}>
                        {/* <Text onPress={() => { Actions.ADDEXPENSE() }} style={[styles.actionHeading]}>
                            Add Expense
                        </Text> */}
                    </View>
                </View>

                {/* Table Heading Section */}


                {/* Glance Section */}
                <View style={[styles.glanceSection]}>
                    {/* <Image
                        style={{width: 50, height: 50}}
                        source={{uri: '../../assets/images/logo.png'}}
                    /> */}
                    <View style={[styles.glanceCard]}>
                        <Image style={styles.img}
                            source={require('../../assets/images/cash.png')}
                        />
                        <View style={styles.subCard}>
                            <Text style={[styles.cardHead]}>
                                DONE
                            </Text>
                            <Text style={[styles.cardHead]}>
                                $1234
                            </Text>
                        </View>
                    </View>
                </View>
                {/* sub heading */}

                <View style={styles.detailSection}>
                    <Text style={[commonStyles.sectionHeading, styles.detailHeading]}>
                        Payment Details
                    </Text>
                    <View style={[styles.detailContent]}>
                        <Text style={[commonStyles.secondaryText]}>
                            Amount_currency
                        </Text>
                        <Text style={[commonStyles.boldText, commonStyles.primaryText]}>
                            USD
                        </Text>
                    </View>
                    <View style={[styles.detailContent]}>
                        <Text style={[commonStyles.secondaryText]}>
                            Category
                        </Text>
                        <Text style={[commonStyles.boldText, commonStyles.primaryText]}>
                            maintenance
                        </Text>
                    </View>
                    <View style={[styles.detailContent]}>
                        <Text style={[commonStyles.secondaryText]}>
                            Created_at
                        </Text>
                        <Text style={[commonStyles.boldText, commonStyles.primaryText]}>
                            2019-04-01T20:27:02.616691Z
                        </Text>
                    </View>
                    <View style={[styles.detailContent]}>
                        <Text style={[commonStyles.secondaryText]}>
                            Description
                        </Text>
                        <Text style={[commonStyles.boldText, commonStyles.primaryText]}>
                            testtin11
                        </Text>
                    </View>
                    <View style={[styles.detailContent]}>
                        <Text style={[commonStyles.secondaryText]}>
                            Id
                        </Text>
                        <Text style={[commonStyles.boldText, commonStyles.primaryText]}>
                            13
                        </Text>
                    </View>
                    <View style={[styles.detailContent]}>
                        <Text style={[commonStyles.secondaryText]}>
                            Month
                        </Text>
                        <Text style={[commonStyles.boldText, commonStyles.primaryText]}>
                            2019-03
                        </Text>
                    </View>
                    <View style={[styles.detailContent]}>
                        <Text style={[commonStyles.secondaryText]}>
                            Updated_at
                        </Text>
                        <Text style={[commonStyles.boldText, commonStyles.primaryText]}>
                            2019-04-01T20:27:02.632515Z
                        </Text>
                    </View>
                </View>
                <View style={styles.detailSection}>
                    <Text style={[commonStyles.sectionHeading, styles.detailHeading]}>
                        Story Information
                    </Text>
                    <View style={[styles.detailContent]}>
                        <Text style={[commonStyles.secondaryText]}>
                            Store name
                        </Text>
                        <Text style={[commonStyles.boldText, commonStyles.primaryText]}>
                            hiiiii
                        </Text>
                    </View>
                    <View style={[styles.detailContent]}>
                        <Text style={[commonStyles.secondaryText]}>
                            Store address
                        </Text>
                        <Text style={[commonStyles.boldText, commonStyles.primaryText]}>
                            hiiiii
                        </Text>
                    </View>
                </View>
            </ScrollView>

        )
    }
}


const styles = StyleSheet.create({
    transactionDetail: {
        flexDirection: 'column',

        flex: 1,
        // width:'100%',
        padding: 10,
        // alignItems:'baseline',
        // justifyContent:'flex-start'
    },
    // Table Section

    cardAmount: {
        fontWeight: 'bold',
        fontSize: 16,
        // flex:1,
        // alignItems:'flex-end'
    },


    tableBody: {
        marginTop: 4

    },
    tableHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tableHeading: {
    },
    actionHeading: {
        color: 'gray',
    },
    glanceSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    },
    glanceCard: {
        borderRadius: 6,
        padding: 10,
        // marginTop: -200,
        // width: '90%',
        backgroundColor: '#6477fc',
        height: 120,
        shadowOffset: { width: 5, height: 5, },
        // shadowColor: 'red',
        shadowOpacity: 0.1,

        flex: 1,
        flexDirection: 'row',

        // justifyContent: 'space-around',

    },
    detailHeading: {
        fontSize: 16,
    },
    detailSection: {
        flex: 1
    },
    detailContent: {
        flex: 1,
        fontSize: 13,
        color: 'grey',
        borderBottomWidth: 0.5,
        borderRadius: 3,
        borderColor: '#d6d7da',
        padding: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    img: {
        width: 50,
        height: 50,
        marginTop: 25,
        marginLeft:20
    },
    cardHead:{
        fontSize:20,
        color:'white',
        marginLeft:10
    },
    subCard:{
        flex:1,
        justifyContent:'space-around',
        flexDirection:'column'
    }
})
