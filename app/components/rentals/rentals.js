import React from 'react';

import { StyleSheet, Button, Modal, Text, View, ScrollView,TouchableOpacity } from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';
import RBSheet from "react-native-raw-bottom-sheet";
import { Actions } from 'react-native-router-flux';

import CardListing from './../../resources/card-listing/card-listing';
import TransactionDetail from './../../resources/transaction-detail/transaction-detail';

import moment from "moment";


import commonStyles from './../../styles/common';
import { getPermission, getAccessToken } from '../../config/AccessToken';

import { GetStore, SetStore, Notify } from './../../utils/core.utils';
import { GetSupport, GetNotice, GetRentals } from './../../utils/business.utils';

import GLOBAL from './../../global';

export default class Rentals extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            transaction: {},
            permission: false,
            token: '',
            isLoading: true,
            count: 1,
            apartment_id: 1,
            dataSource: [],
            page: 1,
            refreshing: true,
            noresult: true,
            fix: false,
            notice_added: false,
        };
    }

    componentDidMount() {
        // this.getToken();
        this.getPerm();
    }

    componentWillReceiveProps(e) {
        if (e.hasOwnProperty('notice_added')) {
            Notify({ message: 'Info', description: 'Ticket added Succesfully', type: 'success' });
        } else {
            Notify({ message: 'Info', description: 'Something Went Wrong', type: 'error' });
        }
    }


    getPerm = async () => {
        await getPermission().then((user) => {
            if (user != null) {
                let user_obj = JSON.parse(user);
                let permission = user_obj.permissions.map((res) => { return res.name; });
                if (permission.includes("list_maintenance_tickets"))
                    this.setState({ permission: true });
                // this.setState({ isLoading: false });


                this.getMaintainenceList();
            } else {
                // this.setState({ isLoading: false });
                this.errorMessage('Something went wrong, Please try again.');
            }
        })
    }

    /**
 * Get the transaction history of the month
 * Method returns 
 */
    getTransactions = async (activeMonth) => {
        return await GetRentals({ month: activeMonth });
    }


    errorMessage(msg) {
        alert(msg)
    }

    publish_notice() {
        if (this.state.permission) {
            return (<View style={[styles.tableAction]}>
                <Text onPress={() => { Actions.ADDRENTALS() }} style={[styles.actionHeading]}>
                    Add Rentals
                </Text>
            </View>);
        }
    }



    renderHeader = () => {
        return (
            <View>
                <View>
                    <TouchableOpacity onPress={() => Actions.pop()} style={[commonStyles.backButtonContainer]}>
                        <Text style={[commonStyles.backButtonStyle]}><FontAwesome>{Icons.chevronLeft}</FontAwesome></Text>
                    </TouchableOpacity>
                </View>
            <View style={[styles.tableHeader]}>

                <View style={[styles.tableTitle]}>

                    <Text style={[commonStyles.sectionHeading, styles.tableHeading]}>
                        Rent Transaction
                                </Text></View>

                {this.publish_notice()}
            </View>
            </View>
        );
    };

    showDetails = (transaction) => {

        this.rentalRecord.open(transaction);

        this.setState({ transaction });

        // this.expenseRecord.setNativeProps({month:'2018-12'});
    }

    render() {


        // configuration for the card listing        
        const listingConfiguration = {
            apiConfig: {

            },
            layout: {
                cardIcon: (entry) => {
                    return (
                        <FontAwesome style={[styles.cardIconStyle, entry.amount ? commonStyles.textGreen : commonStyles.textRed]}>
                            {entry.amount > 0 ? Icons['longArrowUp'] : Icons['longArrowDown']}
                        </FontAwesome>
                    )
                },
                cardHeader: (entry) => {
                    return (
                        entry.month
                    )
                },
                cardSubDetail: (entry) => {
                    return (
                        entry.status
                        // moment(entry.created_at).format('MMMM Do YYYY')
                    )

                },
                cardAmount: (entry) => {
                    return (
                        <Text style={[styles.cardAmount, entry > 0 ? styles.textGreen : styles.textRed, { fontSize: 14 }]}>
                            {entry.amount}
                        </Text>

                    )
                }
            }
        }

        const { isLoading, count, transaction } = this.state;

        return (
            <ScrollView style={[commonStyles.outline]}>

                <View style={[styles.containerPadding]}>

                    <View style={[styles.tableBody]}>

                        {/* Table Content */}
                        <CardListing
                            header={this.renderHeader}
                            getData={this.getTransactions}
                            onPress={(item) => { this.showDetails(item) }}
                            configuration={listingConfiguration}
                        />
                        {/* Table Content Ends */}

                    </View>
                </View>



                {/* Transaction Detail Bottom Sheet */}
                <RBSheet
                    ref={ref => {
                        this.rentalRecord = ref;
                    }}
                    height={700}
                    duration={250}
                    closeOnSwipeDown={true}
                    customStyles={{
                        container: {
                            // justifyContent: "flex-start",
                            // alignItems: "flex-start"
                        }
                    }}
                >
                    <TransactionDetail record={transaction} />

                </RBSheet>
                {/* Transaction Detail Bottom Sheet Ends */}

            </ScrollView>)


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
        // flexDirection: 'column',
        backgroundColor: 'white',
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

    // Table Section Ends


})