import React from 'react';
import { Stylesheet, Text, View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
// import Logo from './../logo/logo';

import { Actions } from 'react-native-router-flux';
import Placeholder from 'rn-placeholder';
import FontAwesome, { Icons } from 'react-native-fontawesome';
// import ImagePicker from 'react-native-image-picker';

import MonthSelectorCalendar from 'react-native-month-selector';
import RBSheet from "react-native-raw-bottom-sheet";
import moment from 'moment';

import CustomSelect from './../../../../resources/custom-select/custom-select';


// import * as firebase from 'firebase';
import formStyles from './../../../../styles/forms';
import commonStyles from './../../../../styles/common';

import { CreateExpense } from './../../../../utils/business.utils';
import { Notify, GetStore } from './../../../../utils/core.utils';

export default class AddExpense extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // category: '',
            catogory_name: 0,
            formBody: {
                isLoading: false,
                category: '',
                description: '',
                month: moment().format('YYYY-MM'),
                amount: '',
                token: '',
                // photo: null,
                // image_id: '',
                sal_test: false,
                test: 0,
                activeMonth: moment()
            },
        };
    }

    componentDidMount = () => {

    }

    // getToken = async () => {

    //     await GetStore('token').then((token) => {
    //         if (token != null) {
    //             this.setState({ token: 'Token ' + token, isLoading: false });
    //         } else {
    //             this.setState({ isLoading: false });
    //             Notify({ message: 'Info', description: 'Token Expired, Login Again ', type: 'danger' });

    //             Actions.LOGIN();

    //         }
    //     });
    // }

    selectBox = (e, n) => {
        this.setState({ catogory_name: `${e}` })
        this.updateForm('category', `${n}`)
    }

    changeMonth = (activeMonth) => {
        // console.log("moment sa",moment(this.state.activeMonth).format('YYYY-MM'));
        // this.setState({ month: moment(this.state.activeMonth).format('YYYY-MM') })
        this.setState({ activeMonth })
        this.updateForm('month', moment(activeMonth).format('YYYY-MM'));

        // Update the ledger

        this.monthSelector.close();
    }

    // IMAGE UPLOAD MODULE 

    // handleChoosePhoto = () => {
    //     const options = {
    //         noData: true,
    //     };
    //     ImagePicker.launchImageLibrary(options, response => {
    //         if (response.uri) {
    //             console.log("response", response);
    //             this.setState({ photo: response });
    //         }
    //     });
    // };

    // takeImage = () => {
    //     const options = {
    //         noData: true,
    //     };
    //     ImagePicker.launchCamera(options, response => {
    //         if (response.uri) {
    //             console.log("response", response);
    //             this.setState({ photo: response });
    //         }
    //     });
    // };

    // IMAGE UPLOAD MODULE ENDS
    /**
     * 
     */
    updateForm = (field, value) => {
        let { formBody } = this.state;
        formBody[field] = value;
        this.setState({ formBody });
    }

    submitForm = async () => {
        // Validating
        if (!this.state.formBody.description.trim() || !this.state.formBody.amount.trim()) {
            Notify({ message: 'Fill Field', description: 'Please Fill All the Fields', type: 'error' });
            return true;
        } else if (!this.state.formBody.category.trim()) {
            Notify({ message: 'Category', description: 'Please Select Any category', type: 'error' });
            return true;
        }

        const { formBody } = this.state;
        this.setState({ isLoading: true });

        const response = await CreateExpense({ formBody });
        this.setState({ isLoading: false });
        if (response.status == 'success') {

            Notify({ message: 'Success', description: 'Expense Created', type: 'success' });
            Actions.pop();
            setTimeout(() => {
                Actions.refresh({
                    notice_added: true
                });
            }, 0);

        } else {

        }
        console.log(result);

    }

    render() {
        const { isLoading, activeMonth, catogory_name } = this.state;
        const { formBody } = this.state;

        let options = [
            {
                name: 'other',
                c_id: '1'
            }, {
                name: 'maintenance',
                c_id: '2'
            }, {
                name: 'water',
                c_id: '3'
            }, {
                name: 'electricity',
                c_id: '4'
            }];


        return (
            <ScrollView style={[commonStyles.container, commonStyles.containerPadding]}>

                {/* Form Begins */}

                <View style={formStyles.formContainer}>
                    <View>
                        <TouchableOpacity onPress={() => Actions.pop()} style={[commonStyles.backButtonContainer]}>
                            <Text style={[commonStyles.backButtonStyle]}><FontAwesome>{Icons.chevronLeft}</FontAwesome></Text>
                        </TouchableOpacity>
                    </View>
                    {/* Form Heading */}
                    <View style={formStyles.sectionPadding}>
                        <Text style={formStyles.formHeading}>
                            enter expense details
                        </Text>
                    </View>


                    {/* Form SubHeading */}
                    <View style={formStyles.sectionPadding}>
                        <Text style={formStyles.formSubHeading}>
                            fill in the necessary details to have your expense
                            created
                        </Text>
                    </View>
                    {/* Form SubHeading Ends */}
                </View>


                <Placeholder.ImageContent
                    // style={{ marginBottom: 22, marginTop: 10 }}

                    // style={{ marginTop: 100 ,paddingBottom: 100 }}
                    size={60}
                    animate="fade"
                    lineNumber={4}
                    lineSpacing={5}
                    lastLineWidth="30%"
                    onReady={!isLoading}>

                    {/* Form Fields */}
                    <View style={formStyles.formContainer}>


                        {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity style={formStyles.buttonContainer}
                                    onPress={this.takeImage}>
                                    <Text style={formStyles.buttonText}>Take Image</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[formStyles.buttonContainer, { width: 30, marginLeft: 10 }]}
                                    onPress={this.handleChoosePhoto}>
                                    <Text style={formStyles.buttonText}>...</Text>
                                </TouchableOpacity>
                            </View>
                            {photo && (
                                <View>
                                    <Image
                                        source={{ uri: photo.uri }}
                                        style={{ width: 130, height: 80 }}
                                    />
                                </View>
                            )}
                        </View> */}

                        <View style={formStyles.sectionPadding}>
                            <Text style={[formStyles.labelStyle, formStyles.elementPadding]}>
                                title
    </Text>

                            <TextInput
                                style={[formStyles.inputStyle]}
                                value={this.state.email}
                                placeholder="title of expense"
                                onChangeText={(text) => { this.updateForm('description', text) }}
                                value={formBody.description}
                            />
                        </View>
                        {/* Title of expense ends */}

                        {/* amount of expense */}
                        <View style={formStyles.sectionPadding}>

                            <Text style={[formStyles.labelStyle, formStyles.elementPadding]}>
                                amount
    </Text>

                            <TextInput
                                style={[formStyles.inputStyle]}
                                value={this.state.email}
                                placeholder="amount spend"
                                onChangeText={(text) => { this.updateForm('amount', text) }}
                                value={formBody.amount}
                            />
                        </View>
                        {/* amount of expense ends */}

                        <View style={[styles.monthSection]}>
                            <Button
                                title={moment(activeMonth).format('MMMM')}
                                onPress={() => {
                                    this.monthSelector.open();
                                }}
                            />
                        </View>
                        {/* Form Heading Ends */}


                        {/* Category Selector */}
                        <CustomSelect selected={catogory_name} options={options} chooseCategory={this.selectBox} />
                        {/* Category Selector Ends */}



                        <TouchableOpacity style={formStyles.buttonContainer}
                            onPress={this.submitForm}>
                            <Text style={formStyles.buttonText}>Add</Text>
                        </TouchableOpacity>

                    </View>


                </Placeholder.ImageContent>

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

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerBorder: {
        width: '45%',
        height: 100,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#eee',
        // borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1
    },
    fontStyle: {
        fontSize: 16,
        // color: '#444A45',
        fontWeight: '500'
    },
    monthSection: {
        alignItems: 'center',
        flexDirection: 'row',
    }
});

