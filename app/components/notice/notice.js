import React from 'react';

import { Image, StyleSheet, Button, Modal, Text, View, ScrollView, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';
import Placeholder from 'rn-placeholder';

import CardListing from './../../resources/card-listing/card-listing';
import { Actions } from 'react-native-router-flux';
import moment from "moment";


import commonStyles from './../../styles/common';
import { getPermission, getAccessToken } from '../../config/AccessToken';

import { GetStore, SetStore, Notify } from './../../utils/core.utils';
import { GetSupport, GetNotice } from './../../utils/business.utils';

import Loader from '../reusable/Loader';
// import Maintenance_card from './Maintenance_card';

import GLOBAL from './../../global';

export default class Notice extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            someKey: 'someValue',
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
        }else{
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
        return await GetNotice({ month: activeMonth });
    }


    errorMessage(msg) {
        alert(msg)
    }

    publish_notice() {
        if (this.state.permission) {
            return (<View style={[styles.tableAction]}>
                <Text onPress={() => { Actions.CREATENOTICE() }} style={[styles.actionHeading]}>
                    Publish Notice
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
                        Notices
                                </Text></View>

                {this.publish_notice()}
            </View>
            </View>
        );
    };

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
                        entry.title
                    )
                },
                cardSubDetail: (entry) => {
                    return (
                        entry.message
                        // moment(entry.created_at).format('MMMM Do YYYY')
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
        }

        const { isLoading, count } = this.state;

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

            </ScrollView>)


        // <View style={[commonStyles.containerPadding]}>
        //     <FlatList
        //         data={this.state.dataSource}
        //         ListHeaderComponent={this.renderHeader}
        //         ListFooterComponent={this.renderFooter}
        //         renderItem={({ item }) => <Maintenance_card  {...item} />}
        //         // keyExtractor={(item) => `${item.id}`}
        //         contentContainerStyle={{ paddingBottom: 50 }}
        //         // onRefresh={this.handleRefresh}
        //         // refreshing={this.state.refreshing}
        //         onEndReached={this.handleLoadMore}
        //         onEndReachedThreshold={1}
        //     />
        // </View>

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