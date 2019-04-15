
import { StyleSheet } from 'react-native';
import GLOBAL from './../global'

module.exports = StyleSheet.create({

    // Page layout 
    outline: {
        margin: 10,
        flexDirection: 'column',

        // justifyContent: 'flex-end',
        flex: 1,
        backgroundColor: GLOBAL.COLORS.WHITE,
        marginBottom: 10
    },
    // Page layout Ends

    // Page Common Styles
    flex: {
        flex: 1,
        flexDirection: 'row'
    },
    flexCorner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'


    },
    page: {
        // padding: 10,
        // backgroundColor:'white'
        // backgroundColor: '#ecf2ed',
        backgroundColor: 'white'
        // backgroundColor:'#D9DEE2'
        // backgroundColor:'#E3E9EE' // silver

    },

    // Page Header Styling
    pageHeader:{

    },
    pageTitle:{
        flex:1,
        flexDirection:'row',
        alignItems:'baseline'
        // justifyContent:
    },

    container: {
        paddingTop: 10
        // padding: 30
    },
    containerPadding: {
        padding: 20,
    },

    // Page Common Styles ends


    // Card Common Styles

    cardShadow: {
        // shadowOffset: { width: 5, height: 5, },
        // shadowColor: 'black',
        // shadowOpacity: 0.2,
        shadowRadius: 10,
        backgroundColor: 'white',
        // borderWidth: 1,
        // borderColor: 'black',
        // borderRadius: 5

    },

    borderStyle: {
        borderWidth: 1,
        // borderColor:'gray',

        // borderColor:GLOBAL.COLORS.SECONDARY,

        borderColor: '#eaeaea',
        // backgroundColor:'black'
        // borderColor:'#e2e2e2'
    },

    // Card Common Styles ends

    // Form Styling



    // Form Styling ends

    // Letters and spacing
    currency: {
        fontSize: 10,
        color: GLOBAL.COLORS.LABELCOLOR

    },

    tableHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    tableCard: {
        padding: 18,
        // height: 50,
        // backgroundColor: 'whitesmoke',
        marginTop: 10,
        // width: '100%',

    },
    listingCount: {
        fontSize: 12,
        fontWeight: '100',
        marginBottom:10

    },
    iconStyle: {
        // margin: 2,
        fontWeight: '100',
        // paddingLeft: 10,
        fontSize: 20,
        color: GLOBAL.COLORS.LINKCOLOR
        // paddingRig
        // marginLeft: 5,
        // marginRight: 5

    },
    primaryText: {
        // color: '#0e12a7',
        // color: '#2d4e27'
    },
    secondaryText: {
        // color: 'gray',
        color: GLOBAL.COLORS.SECONDARY
    },
    dangerText: {
        color: 'brown'
    },
    heroSecondaryHeading: {
        // margin: 5,
        fontSize: 18
    },

    label: {

        borderRadius:4,
        // margin:10,
        padding:4,

        paddingLeft: 6,
        paddingRight: 6,
        // backgroundColor: 'aliceblue',
        backgroundColor:'#ecf4f7',
        color:'#1a1b1b'

    },
    expenseLabel: {
        // color:'blue'
        fontSize:10,
        textTransform:'capitalize',

        // padding: 4,

    },
    incomeLabel:{
        // backgroundColor:'aliceblue'
    },

    // hero Styl Ends

    boldText:{
        fontWeight:'700'
    },  

    darkText: {
        color: 'black'
    },

    marginTop: {
        marginTop: 20
    },
    marginBottom: {
        marginBottom: 20
    },
    paddingLeft: {
        paddingLeft: 20
    },

    // Letters and spacing ends


    // Headings and Subheadings

    // Hero Styles

    smallText:{
        fontSize:10

    },
    hero: {
        flex: 1,
        flexDirection: 'column'

    },
    heroMainLoader: {
        width: 100,
        height: 40,
        backgroundColor: 'whitesmoke'

    },
    heroText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },


    // hero Styl Ends

    subHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },

    button: {
    },

    sectionHeading: {
        // marginTop: 25,
        // marginBottom: 15,
        fontSize: 28,
        fontWeight: 'bold',
        // color: '#0e12a7',
        // font
    },
    textGreen: {
        color: 'green'
    },
    textRed: {
        color: 'brown'
    },
    backButtonContainer:{
        width: '15%'
    },
    backButtonStyle: {
        fontSize: 15,
        color: '#000'
    }

});