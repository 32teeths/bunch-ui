import React from 'react';

// Core
import { Image, StyleSheet, Button, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';

// Externa Libraries
import { Actions } from 'react-native-router-flux';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import RBSheet from "react-native-raw-bottom-sheet";
import moment from 'moment';
import MonthSelectorCalendar from 'react-native-month-selector';
import Placeholder from 'rn-placeholder';

// Custom Components
import CardListing from './../../resources/card-listing/card-listing';
import TransactionDetail from './../../resources/transaction-detail/transaction-detail';

// Util methods
import { GetLedger, GetExpense, GetTransactions } from './../../utils/business.utils';

// CommonStyles
import formStyles from './../../styles/forms';
import commonStyles from './../../styles/common';

export default class Account extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isLoading: true,
            activeMonth: moment(),
            transaction: {},
            monthSummary: 'someValue',
            expense: {}
        };
    }

    componentDidMount = () => {

        var { height, width } = Dimensions.get('window');

        console.log(height, width);

        this.getLedger(this.state.activeMonth);
    }

    /**
     * Get the Ledger of the month 
     * Has data for the glance content
     */
    getLedger = async (activeMonth) => {
        // console.log(activeMonth);
        const monthSummary = await GetLedger({ month: activeMonth });
        // console.log(monthSummary);
        this.setState({ monthSummary, isLoading: false });
    }

    /**
     * Get the transaction history of the month
     * Method returns 
     */
    getTransactions = async (activeMonth) => {
        return await GetTransactions({ month: activeMonth });
    }

    changeMonth = (activeMonth) => {
        // console.log(month);
        this.setState({ activeMonth, isLoading: true })

        // Update the ledger
        this.getLedger(activeMonth);

        this.monthSelector.close();
    }

    showDetails = (transaction) => {

        this.expenseRecord.open(transaction);

        this.setState({ transaction });

        // this.expenseRecord.setNativeProps({month:'2018-12'});
    }

    header = () => {
        return (

            <View style={[commonStyles.tableHeader]} >

                {/* Table Heading Section */}
                <View style={[styles.tableTitle]}>
                    <Text style={[commonStyles.sectionHeading, styles.tableHeading]}>
                        History
                     </Text>
                </View>

                <View style={[styles.tableAction]}>
                    <Text onPress={() => { Actions.ADDEXPENSE() }} style={[styles.actionHeading]}>
                        Add Expense
                     </Text>
                </View>
                {/* Table Heading Section */}

            </View>
        )
    }

    render() {

        const { isLoading, monthSummary = {}, expense = {}, activeMonth, transaction } = this.state;

        // configuration for the card listing        
        const listingConfiguration = {
            apiConfig: {

            },
            layout: {
                cardIcon: (entry) => {

                    let image;

                    if (entry.source_type == 'income') {
                        return <View style={[commonStyles.label]}><Text style={[commonStyles.expenseLabel]}>103</Text></View>;

                    } else if (entry.source_type == 'expense') {

                        let image;

                        if (entry.source.category == 'electrical') {
                            image = require('./../../assets/images/categories/electrical.png');
                        } else if (entry.source.category == 'general') {
                            image = require('./../../assets/images/categories/general.png');
                        } else if (entry.source.category == 'plumbing') {
                            image = require('./../../assets/images/categories/plumbing.png');
                        } else if (entry.source.category == 'mechanical') {
                            image = require('./../../assets/images/categories/mechanical.png');
                        }

                        return <Image source={image} style={{ width: 30, height: 30 }} />
                    }
                },
                cardHeader: (entry) => {

                    if (entry.source_type == 'income') {
                        if (entry.source.source_type == "rent_transaction") {
                            return <Text>Rent received from  {entry.source.source.created_by.first_name}</Text>
                        } else {
                            // return {entry.source.source_type };
                        }
                    } else if (entry.source_type == 'expense') {
                        return <Text>{entry.source.description} by {entry.source.created_by.first_name}</Text>;
                    }
                },
                cardCategory: (entry) => {
                    if (entry.source_type != 'income') {
                        return <View style={[commonStyles.label]}><Text style={[commonStyles.expenseLabel]}>{entry.source.category}</Text></View>;
                    } else if (entry.source_type == 'expense') {
                        return <Text style={[commonStyles.label, commonStyles.incomeLabel]}>{entry.category}</Text>;
                    }
                },
                cardSubDetail: (entry) => {
                    if (entry.source_type == 'income') {
                        if (entry.source.source_type == "rent_transaction") {
                            return <Text>{moment(entry.source.source.created_at).format('MMMM Do YYYY')}</Text>;
                        } else {
                            // return entry.source.source_type;
                        }
                    } else if (entry.source_type == 'expense') {
                        return <Text>{moment(entry.source.created_at).format('MMMM Do YYYY')}</Text>;
                    }
                },
                cardAmount: (entry) => {


                    if (entry.source_type == 'income') {
                        if (entry.source.source_type == "rent_transaction") {
                            return (
                                <Text style={[styles.cardAmount, commonStyles.textGreen]} >
                                    {Number.parseInt(entry.source.source.amount)}
                                </Text>
                            )
                        } else {
                            return (
                                <Text style={[styles.cardAmount, commonStyles.textGreen]} >
                                    {Number.parseInt(entry.source.amount)}
                                </Text>
                            )
                        }
                    } else {
                        return (
                            <Text style={[styles.cardAmount, commonStyles.textRed]} >
                                {Number.parseInt(entry.source.amount)}
                            </Text>
                        )
                    }
                }
            }
        }

        // Data for transaction history
        return (

            // Element Wrapper
            <ScrollView style={[commonStyles.outline]}>

                <View style={[styles.containerPadding]}>
                    <View>
                        <TouchableOpacity onPress={() => Actions.pop()} style={[commonStyles.backButtonContainer]}>
                            <Text style={[commonStyles.backButtonStyle]}><FontAwesome>{Icons.chevronLeft}</FontAwesome></Text>
                        </TouchableOpacity>
                    </View>
                    {/* Page header and Controls */}
                    <View style={[commonStyles.flexCorner]}>

                        {/* Header Title */}
                        <View style={commonStyles.heroMain}>
                            <Text style={[commonStyles.heroText, commonStyles.primaryText]}>
                                Accounts
                            </Text>
                        </View>
                        {/* Header Title Ends */}

                        {/* Month Selector */}
                        <View style={[styles.monthSection]}>
                            <Button
                                title={moment(activeMonth).format('MMMM')}
                                onPress={() => {
                                    this.monthSelector.open();
                                }}
                            />
                            <Text style={[commonStyles.iconStyle]}>
                                <FontAwesome style={[]}>
                                    {Icons['caretDown']}
                                </FontAwesome>
                            </Text>
                        </View>
                        {/* Month Selector Ends */}

                    </View>
                    {/* Page header and Controls Ends */}


                    {/* Balance and Month */}

                    <View style={[styles.sectionSplit, styles.balanceContainer]}>

                        {/* Left Part */}
                        <View style={[styles.balanceSection]}>

                            {/* Balance Heading */}
                            <View style={[styles.balanceHeadingSection]}>
                                <Text style={[styles.balanceHeading, commonStyles.secondaryText]}>
                                    Current Balance
                                </Text>
                            </View>
                            {/* Balance Heading Ends */}

                            {/* Balance Amount */}
                            {/* Placeholder Line */}
                            <Placeholder.Line
                                style={{ marginBottom: 22, marginTop: 10 }}
                                width="40%"
                                textSize={42}
                                onReady={!isLoading}>

                                {
                                    monthSummary ?
                                        <View style={[commonStyles.flex, styles.balanceAmountSection]}>
                                            <Text style={[styles.balanceAmount]}>
                                                {monthSummary.opening_balance}
                                            </Text>

                                            <Text style={[commonStyles.currency]}>
                                                {monthSummary.opening_balance_currency}
                                            </Text>

                                        </View> : null
                                }

                            </Placeholder.Line>
                            {/* Balance Amount Ends */}

                            {/* Balance Info */}
                            <View style={[styles.balanceInfoSection]}>
                                <Text style={[styles.balanceInfo]}>
                                    {!isLoading ? moment(monthSummary.created_at).format('MMMM Do YYYY') : null}
                                </Text>
                            </View>
                            {/* Balance Info Ends */}

                        </View>
                        {/* Left Part Ends */}

                    </View>

                    {/* Balance and Month Ends */}

                </View>
                {/* Page header and Controls Ends */}

                {/* Top Section */}
                {/* Top Section Ends */}

                {/* Below Section */}

                <View style={[styles.containerPadding, styles.belowSection]}>

                    {/* Glance Section */}

                    <Placeholder.ImageContent
                        // style={{ marginBottom: 22, marginTop: 10 }}

                        // style={{ marginTop: 100 ,paddingBottom: 100 }}
                        size={60}
                        animate="fade"
                        lineNumber={4}
                        lineSpacing={5}
                        lastLineWidth="30%"
                        onReady={!isLoading}>

                        {/* Glance Section */}
                        <View style={[styles.glanceSection]}>

                            {/* Glance Card */}
                            <View style={[styles.glanceCard]}>

                                {/* Income */}
                                <View style={[styles.incomeSection, styles.amountDetail]}>
                                    <View style={[commonStyles.flex, styles.amountTitle]}>
                                        <FontAwesome style={[styles.circle, commonStyles.textGreen]}>
                                            {Icons['circle']}
                                        </FontAwesome>
                                        <Text style={[commonStyles.secondaryText, styles.detailName]}>
                                            Income
                                        </Text>
                                    </View>

                                    <Text style={[commonStyles.primaryText, styles.detailAmount]}>
                                        ₹ {Number.parseInt(monthSummary.total_income)}
                                    </Text>

                                </View>

                                {/* Income Section*/}

                                {/* Expense */}

                                <View style={[styles.expenseSection, styles.amountDetail]}>

                                    <View style={[commonStyles.flex, styles.amountTitle]}>
                                        <FontAwesome style={[styles.circle, commonStyles.textRed]}>
                                            {Icons['circle']}
                                        </FontAwesome>
                                        <Text style={[commonStyles.secondaryText, styles.detailName]}>Expense</Text>
                                    </View>




                                    <Text style={[styles.detailAmount]}>
                                        ₹ {Number.parseInt(monthSummary.total_expense)}
                                    </Text>

                                </View>

                                {/* Expense Ends */}

                            </View>
                            {/* Glance Card Ends */}

                        </View>

                        {/* Glance Section Ends */}

                    </Placeholder.ImageContent>



                    {/* Glance Section Ends */}

                    {/* Transaction History */}

                    <View style={[styles.tableBody]}>

                        {/* Table Content */}
                        <CardListing
                            header={this.header}
                            getData={this.getTransactions}
                            onPress={(item) => { this.showDetails(item) }}
                            configuration={listingConfiguration}
                        />
                        {/* Table Content Ends */}

                    </View>

                    {/* Transaction History Ends */}

                </View>

                {/* Below Section Ends */}

                {/* Month Selector Bottom Sheet */}
                <RBSheet
                    ref={ref => {
                        this.monthSelector = ref;
                    }}
                    height={300}
                    duration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                >
                    <MonthSelectorCalendar
                        selectedDate={activeMonth}
                        onMonthTapped={this.changeMonth}
                    />
                </RBSheet>
                {/* Month Selector Bottom Sheet Ends */}


                {/* Transaction Detail Bottom Sheet */}
                <RBSheet
                    ref={ref => {
                        this.expenseRecord = ref;
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
        // height: 265,
    },

    monthSection: {
        alignItems: 'center',
        flexDirection: 'row',
    },


    // Balance Section
    balanceContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    balanceSection: {
        flex: 1,
    },
    balanceHeading: {
        fontSize: 16,
        marginBottom: 10
    },
    balanceAmount: {
        color: 'black',
        fontSize: 50,
        marginBottom: 4,
    },
    balanceAmountSection: {
        alignItems: 'baseline'
    },
    balanceInfo: {
    },
    belowSection: {
        // backgroundColor:'white',
        // flexBasis: '100%',
    },

    monthButton: {
    },




    // Top Section Ends


    // Glance Section
    circle: {
        fontSize: 8,
        padding: 10,
        paddingRight: 10,
        marginRight: 10
    },
    glanceSection: {
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'center'
        // padding:10
    },
    glanceCard: {
        borderRadius: 6,
        padding: 10,
        // marginTop: -50,
        // width: '90%',
        backgroundColor: 'lightblue',

        // backgroundColor: 'white',
        // height: 120,
        // shadowOffset: { width: 5, height: 5, },
        // shadowColor: 'gray',
        // shadowOpacity: 0.1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        flex: 1,
        flexDirection: 'row',

        justifyContent: 'space-around',

    },
    glanceCardContent: {
        // alignItems: 'center',


    },
    amountDetail: {
        // flex: 1,
        flexDirection: 'column',

        justifyContent: 'center',
        // alignItems: 'center',

    },
    amountTitle: {
        alignItems: 'center',
        justifyContent: 'flex-start'
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
    tableHeading: {
    },
    actionHeading: {
        color: 'gray',
    },

    // Table Section Ends


})