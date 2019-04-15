

import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Placeholder from 'rn-placeholder';

import commonStyles from './../../styles/common';

export default class CardListing extends Component {

    constructor(props) {

        super(props);

        this.state = {
            listing: props.listing,
            configuration: props.configuration,
            isLoading: true,
            fix: 2
        }
    }

    /**
     * On mount trigger the getData prop to 
     * get the data 
     */
    componentDidMount() {
        console.log('hello world', this.state);
        this.setState({ fix: 1 });
        setTimeout(() => {
            this.setState({ fix: 2 });
        }, 5000);
        this.makeRequest();
    }

    makeRequest = async () => {
        const { getData } = this.props;

        const response = await getData();
        console.log(response);
        if (response) {

            this.setState({ isLoading: false, listing: response.results })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.fix != 1) {
            console.log("whh");
            this.makeRequest();
            if (nextProps) {
                this.setState({ ...nextProps });
            }
        }
    }

    renderCard = (item) => {

        const { configuration = {} } = this.state;
        const { layout } = configuration;
        const { onPress } = this.props;

        return (
            <View style={[styles.glanceCard]}>
                <TouchableOpacity onPress={() => onPress(item)} style={[styles.to]}>
                    <View style={[styles.tableCard, commonStyles.tableCard]}>

                        {/* Card Icon */}
                        <View style={[styles.cardIcon]}>
                            {layout.cardIcon(item)}
                        </View>
                        {/* Card Icon Ends */}

                        {/* Card Details */}
                        <View style={[styles.cardDetails]}>

                            {/* Card Header */}
                            <View style={[styles.transactionNameView]}>
                                <Text style={[commonStyles.darkText, styles.transactionName]}>
                                    {layout.cardHeader(item)}
                                </Text>
                            </View>

                            {/* Card Header */}

                            {/* Card Category */}
                            <View style={[styles.transactionCategory]}>
                                {/* <Text style={[commonStyles.secondaryText, styles.transactionDate]}> */}
                                {layout.cardCategory && layout.cardCategory(item)}
                                {/* </Text> */}
                            </View>
                            {/* Card Category Ends */}


                            {/* Card Subdetail */}
                            <View style={[styles.transactionDateView]}>
                                <Text style={[commonStyles.secondaryText, styles.transactionDate, commonStyles.smallText]}>
                                    {layout.cardSubDetail(item)}
                                </Text>
                            </View>
                            {/* Card Subdetail */}

                        </View>
                        {/* Card Details Ends */}

                        {/* Card Amount */}
                        <View style={[styles.cardAmountView]}>
                            {
                                layout.cardAmount(item)
                            }
                        </View>
                        {/* Card Amount Ends */}

                    </View>
                </TouchableOpacity>
            </View>
        )

    }

    render() {

        const { listing = [], isLoading } = this.state;
        const { header } = this.props;

        return (

            <View style={[styles.tableContent]}>

                {/* Header */}
                {header && header()}
                {/* Header Ends */}

                <Text style={[commonStyles.listingCount, isLoading ? commonStyles.marginBottom : null]}>
                    {isLoading ? 'Loading' : listing.length} records
                </Text>

                {/* Iterate the listing with the configuration in configuration */}
                <Placeholder.ImageContent
                    style={{ marginTop: 10 }}
                    size={60}
                    animate="fade"
                    lineNumber={4}
                    lineSpacing={5}
                    lastLineWidth="30%"
                    onReady={!isLoading}>

                    <FlatList
                        data={listing}
                        // ListHeaderComponent={header}
                        // ListFooterComponent={this.renderFooter}
                        renderItem={({ item }) => this.renderCard(item)}
                        // keyExtractor={(item) => `${item.id}`}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        // onRefresh={this.handleRefresh}
                        // refreshing={this.state.refreshing}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={1}
                    />

                </Placeholder.ImageContent>

            </View>
        )
    }
}


const styles = StyleSheet.create({


    // Table Content
    tableContent: {
        // marginTop:100,
        // padding:10,
        // height: 100,
        // backgroundColor: 'whitesmoke',
        flex: 1,
        flexDirection: 'column',
        // marginTop:100,

    },

    tableCard: {
        // height: 100,

        padding: 10,
        flex: 1,
        justifyContent: 'space-around',

        flexDirection: 'row',
        // borderWidth: .5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        // shadowOpacity: 0.20,
        // shadowRadius: 1.41,

        // elevation: 1,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 0.1,


        // borderColor: 'grey',
        backgroundColor: 'white',
        borderRadius: 6

    },
    cardIcon: {
        flexBasis: '18%',
        justifyContent: 'center',
        // alignItems:'center'
        // borderWidth:1
    },
    cardIconStyle: {
        color: 'green',
        fontSize: 20
    },
    cardDetails: {
        flexBasis: '65%',
        // shadowOffset: { width: 1, height: 4 },
        // borderWidth:1

    },

    transactionCategory: {
        marginTop: 5,
        alignItems: 'baseline'
        //   flex:1  
    },
    cardAmountView: {
        // alignContent:'flex-end',
        // flexBasis: '20%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,


        // borderWidth:1
    },

    transactionNameView: {

    },
    transactionName: {
        // fontWeight: 'bold',
        marginBottom: 4

    },
    transactionDate: {
        fontSize: 8
    },
    transactionDateView: {
        marginTop: 5

    },
    to: {
        color: 'white'
    },
    glanceCard: {
        borderRadius: 6,
        padding: 4,
        // marginTop: -50,
        // width: '90%',
        // backgroundColor: 'white',
        // height: 120,
        // shadowOffset: { width: 5, height: 5, },
        // shadowColor: 'gray',
        // shadowOpacity: 0.1,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 7,
        // },
        // shadowOpacity: 0.23,
        // shadowRadius: 4.61,

        // elevation: 10,
        // flex: 1,
        // flexDirection: 'row',

        // justifyContent: 'space-around',

    }
    // Table Content Ends

})
