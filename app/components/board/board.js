import React from 'react';

import { Image, StyleSheet, Button, Modal, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';

import CardListing from './../../resources/card-listing/card-listing';

import commonStyles from './../../styles/common';

export default class Board extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            someKey: 'someValue'
        };
    }

    render() {

        // configuration for the card listing        
        const listingConfiguration = {
            cardIcon: (entry) => {
                return (
                    <FontAwesome style={[styles.cardIconStyle, entry.amount ? commonStyles.textGreen : commonStyles.textRed]}>
                        {entry.amount > 0 ? Icons['longArrowUp'] : Icons['longArrowDown']}
                    </FontAwesome>
                )
            },
            cardHeader: (entry) => {
                return (
                    entry.subject
                )
            },
            cardSubDetail: (entry) => {
                return (
                    entry.created_at
                )

            },
            cardAmount: (entry) => {
                return (
                    <Text style={[styles.cardAmount, entry > 0 ? styles.textGreen : styles.textRed]}>
                        {entry.amount}
                    </Text>

                )
            }
        }

        // Data for transaction history
        const transactionHistory = [
            {
                subject: 'Room 103 : Ashish',
                // amount: 3000,
                created_at: 'Oct 10,2018',
            }, {
                subject: 'Room 105 : Subin',
                // amount: -12000,
                created_at: 'Oct 20,2018'
            }, {
                subject: 'Pool Cleaning',
                // amount: -3400,
                created_at: 'Oct 20,2018'
            }, {
                subject: 'Room 102 : Maintainance',
                // amount: 3000,
                created_at: 'Oct 20,2018'
            }]

        return (

            // Element Wrapper
            <ScrollView style={[styles.elementWrapper]}>

                {/* Below Section */}

                <View style={[styles.belowSection]}>

                    {/* Transaction History */}

                    <View style={[styles.tableBody, styles.containerPadding]}>

                        {/* Table Heading Section */}

                        <View style={[styles.tableHeader]}>

                            <View style={[styles.tableTitle]}>

                                <Text style={[commonStyles.sectionHeading, styles.tableHeading]}>
                                    Apartments
                                </Text>

                            </View>

                            <View style={[styles.tableAction]}>
                                <Text style={[styles.actionHeading]}>
                                    Add Apartment
                                </Text>

                            </View>

                        </View>

                        {/* Table Heading Section */}

                        {/* Table Content */}

                        <CardListing listing={transactionHistory} configuration={listingConfiguration} />

                        {/* Table Content Ends */}

                    </View>

                    {/* Transaction History Ends */}

                </View>

                {/* Below Section Ends */}

            </ScrollView>
            // Element Wrapper Ends
        );
    }
}


const styles = StyleSheet.create({
    cardListing: {
        flex: 1
    },

    containerPadding: {
        padding: 20,
        backgroundColor: 'white'
    },
    elementWrapper: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        // justifyContent:'flex-start'
    },

    // Top Section
    topSection: {
        height: 265,
        // backgroundColor: '#7195EE',
        // borderRadius:6,
        backgroundColor: '#5566fe',
        // shadowOffset: { width: 5, height: 5, },
        // shadowColor: 'gray',
        // shadowOpacity: 0.1,

    },


    // Balance Section
    balanceContainer: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent:'center'
        alignItems: 'center',
        // flexBasis:'100%'

    },
    balanceSection: {
        flex: 1,
        // flexDirection:'column',
        // justifyContent:'space-around'
    },
    balanceHeading: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20
    },
    balanceAmount: {
        color: 'white',
        fontSize: 50,
        // fontWeight: 'bold',
        marginBottom: 4,
        // color: '#e5e7ff'
        // color: 'lightgreen'

    },
    balanceAmountSection: {
        // flex:1
    },
    balanceInfo: {
        color: '#9ba3ff'
    },
    belowSection: {
        // backgroundColor: 'white'
        backgroundColor: 'whitesmoke',
        // flex:1,
        flexBasis: '100%',
        // flexDirection:'row'

    },




    // Top Section Ends


    // Glance Section
    glanceSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    glanceCard: {
        borderRadius: 6,
        marginTop: -50,
        width: '90%',
        backgroundColor: 'white',
        height: 120,
        shadowOffset: { width: 5, height: 5, },
        shadowColor: 'gray',
        shadowOpacity: 0.1,
    },
    glanceCardContent: {
        flex: 1,
        flexDirection: 'row',

        justifyContent: 'space-around',
        // alignItems: 'center',


    },
    amountDetail: {
        // flex: 1,
        flexDirection: 'column',

        justifyContent: 'center',
        // alignItems: 'center',

    },
    detailName: {
        color: 'gray',
        // marginBot

    },
    detailAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20

    },
    // Glance Section Ends

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

    // Table Section Ends


})