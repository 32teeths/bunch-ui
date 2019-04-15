import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, Button, TouchableOpacity, Picker, Item, Image } from 'react-native';
// import Logo from './../logo/logo';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import ImagePicker from 'react-native-image-picker';
// import commonStyles from './../../styles/common';
import { Actions } from 'react-native-router-flux';
import GLOBAL from '../../global';
import { getAccessToken } from '../../config/AccessToken';
import { AddNotice } from '../../utils/business.utils';
import { Notify, GetStore } from '../../utils/core.utils';
import Placeholder from 'rn-placeholder';

// import * as firebase from 'firebase';
import formStyles from '../../styles/forms';
import commonStyles from './../../styles/common';


export default class CreateNotice extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            token: '',
            isLoading: false,
        };
    }

    componentDidMount() {
        // this.getToken();
    }


    submitForm = async () => {
        if (!this.state.title.trim() || !this.state.description.trim()) {
            Notify({ message: 'Fill Field', description: 'Please Fill All the Fields', type: 'error' });
            return true;
        }

        const { formBody } = {
            formBody: { title: this.state.title, message: this.state.description }
        };
        this.setState({ isLoading: true });

        const response = await AddNotice({ formBody });
        this.setState({ isLoading: false });
        if (response.status == "success") {
            Actions.pop();
            setTimeout(() => {
                Actions.refresh({
                    notice_added: true
                });
            }, 0);
        } else {
            Actions.pop();
            setTimeout(() => {
                Actions.refresh({
                    not_added: true
                });
            }, 0);
        }
    }

    errorMsg(e) {
        alert(e);
    }

    render() {
        const { photo, isLoading } = this.state;
        return (
            <ScrollView style={[commonStyles.container, commonStyles.containerPadding]}>

                <View style={formStyles.formContainer}>
                    <View>
                        <TouchableOpacity onPress={() => Actions.pop()} style={[commonStyles.backButtonContainer]}>
                            <Text style={[commonStyles.backButtonStyle]}><FontAwesome>{Icons.chevronLeft}</FontAwesome></Text>
                        </TouchableOpacity>
                    </View>
                    {/* Form Heading */}
                    <View style={formStyles.sectionPadding}>
                        <Text style={formStyles.formHeading}>
                            publish a notice accross
                        </Text>
                    </View>
                    {/* Form Heading Ends */}

                    {/* Form SubHeading */}
                    <View style={formStyles.sectionPadding}>
                        <Text style={formStyles.formSubHeading}>
                            fill in the necessary details regarding your notice
                        </Text>
                    </View>
                    {/* Form SubHeading Ends */}
                </View>

                {/* Form Fields */}
                <View style={formStyles.formContainer}>
                    <Placeholder.ImageContent
                        style={{ marginTop: 10, marginBottom: 30 }}
                        size={70}
                        animate="fade"
                        lineNumber={4}
                        lineSpacing={5}
                        lastLineWidth="60%"
                        onReady={!isLoading}>
                        {/* Form Begins */}
                        {/* <View style={formStyles.formInputs}> */}

                        {/* amount of expense */}
                        <View style={formStyles.sectionPadding}>

                            <Text style={[formStyles.labelStyle, formStyles.elementPadding]}>
                                Title
                            </Text>

                            <TextInput
                                style={[formStyles.labelStyle, formStyles.elementPadding]}
                                value={this.state.title}
                                placeholder="description of the notice"
                                onChangeText={(text) => this.setState({ title: text })}
                            />
                            <Text style={[formStyles.labelStyle, formStyles.elementPadding]}>
                                description
                            </Text>
                            <TextInput
                                style={[formStyles.labelStyle, formStyles.elementPadding]}
                                value={this.state.description}
                                placeholder="description of the notice"
                                onChangeText={(text) => this.setState({ description: text })}
                            />
                        </View>

                        <TouchableOpacity style={formStyles.buttonContainer}
                            onPress={() => { this.submitForm() }}>
                            <Text style={formStyles.buttonText}>Add</Text>
                        </TouchableOpacity>

                    </Placeholder.ImageContent>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    fontStyle: {
        fontSize: 16,
        // color: '#444A45',
        fontWeight: '500'
    }
});