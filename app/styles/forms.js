
import { StyleSheet } from 'react-native';
import GLOBAL from './../global'

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GLOBAL.COLORS.WHITE,
        marginBottom: 10
    },

    sectionPadding: {
        padding: 10
    },
    elementPadding: {
        padding: 5
    },

    formHeading: {
        fontWeight: 'bold',
        fontSize: 20
    },
    formSubHeading: {
        fontSize: 16,
        color: GLOBAL.COLORS.SECONDARY
    },

    labelStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: GLOBAL.COLORS.LABELCOLOR

    },

    inputStyle: {
        fontSize: 18,
        marginTop: 10,
        padding: 2,
        paddingBottom: 10,
        borderColor: GLOBAL.COLORS.BORDER,
        // height: 30,
        borderBottomWidth: 1
    },

    formInputs: {
        borderBottomWidth: 3,
        marginBottom: 10

    },

    formContainer: {
        // borderBottomWidth: 1,
        // borderColor: GLOBAL.COLORS.LIGHTBORDER,
        marginTop: 20,
        // margin: 20,
        marginBottom: 0,
        flex: 1,
        flexDirection: 'column'
        // paddingBottom: 40
    },
    socialFormContainer: {
        margin: 10,
        borderWidth: 0
    },
    linkStyling: {
        marginTop: 20,
    },
    buttonContainer: {
        width: 120,
        height: 45,

        backgroundColor: GLOBAL.COLORS.PRIMARY,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // borderWidth: 1,
        // borderColor: GLOBAL.COLORS.SECONDARY,
        marginTop: 20,
        borderRadius: 8,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: GLOBAL.COLORS.WHITE
    },

    buttonPrimary: {
        backgroundColor: GLOBAL.COLORS.PRIMARY,

    },
    googleLogin: {
        marginTop: 5,
        backgroundColor: GLOBAL.COLORS.DANGER,
        borderWidth: 0

    },
    textWhite: {
        color: GLOBAL.COLORS.WHITE
    },
    logoContainer: {

    }
});