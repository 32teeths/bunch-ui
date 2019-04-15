import React from 'react';

// Core
import { Image, StyleSheet, Button, Modal, Text, View, ScrollView, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

// External Libraries
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Placeholder from 'rn-placeholder';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import RBSheet from "react-native-raw-bottom-sheet";
// Custom Components
import CardListing from './../../resources/card-listing/card-listing';
import ProgressiveImage from './../../resources/progressive-image/progressive-image';

// Util Methods
import { getPermission, getAccessToken } from '../../config/AccessToken';

import { GetSupport } from './../../utils/business.utils';
import { GetStore, SetStore, Notify } from './../../utils/core.utils';

// import Loader from '../reusable/Loader';
import SupportDetail from './../../resources/support-detail/support-detail';

// Common Styles
import commonStyles from './../../styles/common';

export default class Support extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            supportTicket: {},
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
            Notify({ message: 'Info', description: 'Maintenance Ticket added Succesfully', type: 'success' });
        }
    }

    getToken = async () => {
        await GetStore('token').then((token) => {
            if (token != null) {
                this.setState({ token: 'Token ' + token });
                this.getPerm();
            } else {
                this.errorMessage('Something went wrong, Please try again.');
            }
        });
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

    showDetails = (supportTicket) => {

        console.log(supportTicket);
        this.expenseRecord.open(supportTicket);

        this.setState({ supportTicket });

        // this.expenseRecord.setNativeProps({ month: '2018-12' });
    }

    /**
     * Get the transaction history of the month
     * Method returns 
     */
    getTransactions = async (activeMonth) => {
        return await GetSupport({ month: activeMonth });
    }

    errorMessage(msg) {
        alert(msg)
    }

    create_new() {
        // if (this.state.permission) {
        return (<View style={[styles.tableAction]}>
            <Text onPress={() => { Actions.CREATETICKET() }} style={[styles.actionHeading]}>
                Create New
                </Text>
        </View>);
        // }
    }

    handleLoadMore = () => {
        console.log("hello");
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.getMaintainenceList();
        })
    };

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderHeader = () => {
        return (
            <View>
                <View>
                    <TouchableOpacity onPress={() => Actions.pop()} style={[commonStyles.backButtonContainer]}>
                        <Text style={[commonStyles.backButtonStyle]}><FontAwesome>{Icons.chevronLeft}</FontAwesome></Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.tableHeader, commonStyles.pageHeader]}>
                    <View style={[styles.tableTitle, commonStyles.pageTitle]}>

                        <Text style={[commonStyles.sectionHeading, styles.tableHeading]}>
                            Requests
                    </Text>
                        {/* <Text style={[[styles.subText, commonStyles.secondaryText, commonStyles.smallText]]}>
                        raised
                    </Text> */}

                    </View>

                    {this.create_new()}
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

                        let image;

                        if (entry.category == 'electrical') {
                            image = require('./../../assets/images/categories/electrical.png');
                        } else if (entry.category == 'general') {
                            image = require('./../../assets/images/categories/general.png');
                        } else if (entry.category == 'plumbing') {
                            image = require('./../../assets/images/categories/plumbing.png');
                        } else if (entry.category == 'mechanical') {
                            image = require('./../../assets/images/categories/mechanical.png');
                        }

                        return <Image source={image} style={{ width: 30, height: 30 }} />
                },
                cardHeader: (entry) => {
                    return (
                        entry.description
                    )
                },
                cardCategory: (entry) => {
                    return <View style={[commonStyles.label]}><Text style={[commonStyles.expenseLabel]}>{entry.category}</Text></View>;
                },
                cardSubDetail: (entry) => {
                    return 'Raised by ' + entry.created_by.first_name;
                },
                cardAmount: (entry) => {
                    return (
                        <Text style={[commonStyles.secondaryText, styles.transactionDate, commonStyles.smallText]}>
                            {moment(entry.created_at).format('DD/MM/YY')}
                        </Text>
                    )
                }
            }
        }

        const { supportTicket } = this.state;

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


                    {/* Transaction Detail Bottom Sheet */}
                    <RBSheet
                        ref={ref => {
                            this.expenseRecord = ref;
                        }}
                        height={700}
                        duration={350}
                        closeOnSwipeDown={true}
                        customStyles={{
                            container: {
                                // justifyContent: "flex-start",
                                // alignItems: "flex-start"
                            }
                        }}
                    >
                        <SupportDetail record={supportTicket} />

                    </RBSheet>
                    {/* Transaction Detail Bottom Sheet Ends */}


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

    subText: {
        marginLeft: 10,
    },

    imageContainer: {
        flex: 1
    },

    // Table Section

    cardAmount: {
        // fontWeight: 'bold',
        // fontSize: 16,
        // flex:1,
        // alignItems:'flex-end'
    },


    tableBody: {
        // marginTop: 100

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
    }

    // Table Section Ends


})