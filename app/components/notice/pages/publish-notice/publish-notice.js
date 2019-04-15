import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, Button, TouchableOpacity, Picker, Item, Image } from 'react-native';
// import Logo from './../logo/logo';
import ImagePicker from 'react-native-image-picker';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Actions } from 'react-native-router-flux';
import GLOBAL from './../../../../global';
import { getAccessToken } from '../../../../config/AccessToken';
import { Notify, GetStore } from './../../../../utils/core.utils';
import Placeholder from 'rn-placeholder';

// import * as firebase from 'firebase';
import formStyles from '../../../../styles/forms';
import commonStyle from '../../../../styles/common';
import commonStyles from '../../../../styles/common';


export default class PublishNotice extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            description: '',
            catogory_name: '',
            showPass: true,
            press: false,
            token: '',
            photo: null,
            image_id: '',
            isLoading: true,
            category: 0
        };
    }

    componentDidMount() {
        this.getToken();
    }

    getToken = async () => {

        await GetStore('token').then((token) => {
            if (token != null) {
                this.setState({ token: 'Token ' + token, isLoading: false });
            } else {
                this.setState({ isLoading: false });
                Notify({ message: 'Info', description: 'Token Expired, Login Again ', type: 'danger' });

                Actions.LOGIN();

            }
        });
    }

    selectBox = (e, n) => {
        this.setState({ category: `${e}`, catogory_name: `${n}` })
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                console.log("response", response);
                this.setState({ photo: response });
            }
        });
    };

    takeImage = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchCamera(options, response => {
            if (response.uri) {
                console.log("response", response);
                this.setState({ photo: response });
            }
        });
    };

    submitForm() {
        console.log('image uploaded', this.state.image_id);

        let formBody = { category: this.state.catogory_name, description: this.state.description, image_id: this.state.image_id };

        var object = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.token,
                'Cache-Control': 'no-cache',
                'X-Apartment-Id': 1
            },
            body: JSON.stringify(formBody)
        };
        // console.log('object',object);
        // return true;

        var url = GLOBAL.API.API_BASE_URL + 'maintenance_tickets';

        fetch(url, object)
            .then(res => res.json())
            .then(res => {
                console.log('finale_result', res);
                // this.setState({ isLoading: false });
                if (res.status == 'success') {
                    Actions.pop();
                    setTimeout(() => {
                        Actions.refresh({
                            notice_added: true
                        });
                    }, 0);
                    this.setState({ isLoading: false });
                    // Actions.pop();
                } else {
                    // this.setState({ wrongNumber: true });

                    this.setState({ isLoading: false });

                    Notify({ message: 'Something went wrong', description: 'Please try again later', type: 'error' });
                    // this.errorMessage('Number not found');
                }
            })
            .catch(error => {
                this.setState({ isLoading: false });
                Notify({ message: 'Something went wrong', description: 'Please try again later', type: 'error' });
            });
    }

    uploadImage = () => {

        // Validating
        if (this.state.photo == null) {
            Notify({ message: 'Select Image', description: 'Please select image', type: 'error' });
            return true;
        } else if (!this.state.description.trim()) {
            Notify({ message: 'Fill Field', description: 'Please Fill All the Fields', type: 'error' });
            return true;
        } else if (!this.state.catogory_name.trim()) {
            Notify({ message: 'Category', description: 'Please Select Any category', type: 'error' });
            return true;
        }
        // Validation Ends
        this.setState({ isLoading: true });

        let formData = new FormData();
        const { uri } = this.state.photo;
        const { fileName } = this.state.photo;
        const { type } = this.state.photo;

        formData.append("image", {
            uri: `${uri}`,
            type: `${type}`, // or file.type
            name: `${fileName}`
        });
        // formData.append('test','new')

        let options = {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': this.state.token,
                'Cache-Control': 'no-cache',
                'X-Apartment-Id': 1
            }
        };
        var url = GLOBAL.API.API_BASE_URL + 'maintenance_tickets/images';
        console.log(url);
        console.log(options);
        fetch(url, options)
            .then(res => {
                console.log(res);
                if (res.ok == true) {
                    this.setState({ image_id: JSON.parse(res._bodyText).id });
                    this.submitForm();
                } else {
                    this.errorMsg("Image formate not supported.");
                    return false;
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ isLoading: false });
                this.errorMsg("Something went wrong, Please try again Later");
                return false;
            });
    }

    errorMsg(e) {
        alert(e);
    }

    render() {
        let options = [
            {
                name: 'general',
                c_id: '1'
            }, {
                name: 'plumbing',
                c_id: '2'
            }, {
                name: 'mechanical',
                c_id: '3'
            }, {
                name: 'electrical',
                c_id: '4'
            }];
        const { photo, isLoading } = this.state;
        return (
            <ScrollView style={[commonStyle.container, commonStyle.containerPadding]}>

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

                        {/* Title of expense */}
                        <View style={formStyles.sectionPadding}>
                            <Text style={[formStyles.labelStyle, formStyles.elementPadding]}>
                                title
                            </Text>

                            <TextInput
                                style={[formStyles.labelStyle, formStyles.elementPadding]}
                                value={this.state.email}
                                placeholder="title of notice"
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </View>
                        {/* Title of expense ends */}

                        {/* amount of expense */}
                        <View style={formStyles.sectionPadding}>

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
                        {/* amount of expense ends */}


                        {/* Title of expense */}
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 20 }}>
                            {
                                options.map((option) => {
                                    return (<TouchableOpacity onPress={() => this.selectBox(`${option.c_id}`, `${option.name}`)} style={[styles.containerBorder, this.state.category == option.c_id ? { borderColor: '#5960AE' } : { borderColor: '#fff' }]}>
                                        <View>
                                            <Text style={styles.fontStyle}>
                                                {option.name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        {/* Title of expense ends */}

                        {/* Image adding */}
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
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
                        </View>
                      
                        <TouchableOpacity style={formStyles.buttonContainer}
                            onPress={() => { this.uploadImage() }}>
                            <Text style={formStyles.buttonText}>Add</Text>
                        </TouchableOpacity>

                    </Placeholder.ImageContent>
                </View>
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
    }
});