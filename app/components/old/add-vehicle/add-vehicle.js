import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Logo from './../logo/logo';
import { Actions } from 'react-native-router-flux';
var ImagePicker = require('react-native-image-picker');


// import * as firebase from 'firebase';
// import firebase from 'react-native-firebase';


export default class AddVehicle extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            reg_no: '',
            vehicle_name: '',
            uploading: false,
            fileUploads: []
        };

        // this.vehicles = firebase.database().ref('/vehicles');

        // this.images = firebase.storage().ref().child('images' + Math.round(Math.random() * 1000) + '.jpg');
    }

    /**
     * Add Vehicle to firebase and navigate to shipping details
     *
     * @memberof AddVehicle
     */
    addVehicle = async () => {
        var ref = await this.vehicles.push({
            reg_no: this.state.reg_no,
            created_at: new Date(),
            status: 0,
            vehicle_name: this.state.vehicle_name,
            images: this.state.fileUploads
        }).key;

        Actions.SHIPPINGDETAILS({ index: ref });
    }

    /**
     * Select image from gallery and upload to firebase
     *
     * @memberof AddVehicle
     */
    uploadRC = () => {

        // File Uploads from the state
        let { fileUploads } = this.state;

        // More info on all the options is below in the README...just some common use cases shown here
        var options = {
            title: 'Select Avatar',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Facebook' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {

            this.setState({ uploading: true });

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {

                // Upload an entry to fileUploads
                let index = fileUploads.push({ uri: response.uri });


                // Upload the file to firebase
                let uploadProgress = this.images.putFile(response.uri);

                uploadProgress.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {

                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed();

                    fileUploads[index - 1].progress = progress;

                    this.setState({ fileUploads });

                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }

                }, (error) => {

                }, (result) => {

                    fileUploads[index - 1].upload = true;
                    fileUploads[index - 1].file = result;

                    this.setState({ fileUploads });

                });
            }
        });
    }

    render() {

        const { uploading, fileUploads } = this.state;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.logoContainer}>
                    {/* <Logo></Logo> */}
                </View>


                {/* Form Begins */}

                {/* <Label text="Username or Email" /> */}
                <View style={styles.formContainer}>

                    <Text style={styles.linkStyling}
                        onPress={() => { Actions.REGISTER() }}>
                        Please fill details about the vehicle
                    </Text>

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Registration Number" value={this.state.reg_no}
                        onChangeText={(text) => this.setState({ reg_no: text })}
                    />

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Vehicle Name" value={this.state.vehicle_name}
                        onChangeText={(text) => this.setState({ vehicle_name: text })}
                    />

                    {/* File Upload List */}
                    <View style={styles.uploadList}>


                        {
                            fileUploads.length ?
                                <View style={styles.subHeadingWrapper}>
                                    <Text style={styles.tabSubHeading}>
                                        Attached Files
                            </Text>
                                </View>
                                : null
                        }


                        {/* File Uploads */}
                        {
                            fileUploads.map((upload) => {
                                return (<View style={styles.uploadBar}>
                                    <View style={styles.uploadLeft}>
                                        {/* Image Thumbnail */}
                                        <Image source={upload.downLoadUrl} style={styles.uploadAvatar} />
                                        {/* Image Thumbnail Ends */}
                                    </View>
                                    <View style={styles.uploadRight}>
                                        {
                                            upload.upload ?
                                                <Text style={styles.uploadProgress}>
                                                    Uploaded
                                                </Text>
                                                :
                                                <Text style={styles.uploadProgress}>
                                                    Uploading : {upload.progress} %
                                                    <ActivityIndicator size="small" color="#00ff00" />
                                                </Text>
                                        }
                                    </View>
                                </View>)
                            })
                        }
                        {/* File Uploads Ends */}
                    </View>
                    {/* File Upload List Ends */}

                    {/* File Upload Button */}
                    {
                        fileUploads.length == 0 ?
                            <TouchableOpacity style={[styles.buttonContainer, styles.uploadButton]}
                                onPress={this.uploadRC}>
                                <Text style={[styles.buttonText, styles.uploadText]}>Upload RC</Text>
                            </TouchableOpacity>
                            : null
                    }
                    {/* File Upload Ends */}

                    {/* If there is one uploaded file , show a link  */}

                    {/* File Upload Button */}
                    {
                        fileUploads.length != 0 ?
                            <TouchableOpacity style={[styles.uploadButton]}
                                onPress={this.uploadRC}>
                                <Text style={[styles.buttonText, styles.uploadText]}>Upload More</Text>
                            </TouchableOpacity>
                            : null
                    }
                    {/* File Upload Ends */}

                    {/* File Upload LInk Ends */}

                    <Text style={styles.linkStyling}
                        onPress={() => { Actions.REGISTER() }}>
                        Upload multiple documents for easy verification
                    </Text>

                    <TouchableOpacity style={[styles.buttonContainer, styles.buttonSuccess]}
                        onPress={this.addVehicle}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        );
    }
}

// onPress={() => { Actions.SHIPPINGDETAILS() }}>

const styles = StyleSheet.create({
    container: {
        // color: 'yellow',
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 7,
        margin: 10,
        borderWidth: 1,
        borderColor: '#d2d2d2'
    },
    uploadAvatar: {
        height: 100,
        width: 100

    },
    inputStyle: {
        marginTop: 30,
        padding: 2,
        borderColor: '#d6d7da',
        height: 30,
        borderBottomWidth: 1
    },
    formContainer: {
        // borderBottomWidth: 1,
        borderColor: 'white',
        marginTop: 20,
        margin: 20,
        paddingBottom: 40,
        flex: 1,
        flexDirection: 'column'
        // marginBottom:40,
    },
    uploadList: {
        marginTop: 20,
        marginBottom: 4

    },
    subHeadingWrapper: {
        paddingTop: 5,
        // borderBottomWidth: 1,
        paddingBottom: 10,
        // paddingLeft: 10,
        color: '#114f80'
    },
    tabSubHeading: {
        color: '#114f80'

    },
    uploadBar: {
        borderWidth: 1,
        borderColor: '#d6d7da',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10

    },
    socialFormContainer: {
        // borderBottomWidth: 1,
        // borderColor: '#d6d743',
        margin: 10,
        borderWidth: 0
    },
    linkStyling: {
        marginTop: 20,
    },
    buttonContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#707E9A',
        marginTop: 40,
        height: 60,
        backgroundColor: '#707E9A',
        borderRadius: 2,
    },
    buttonSuccess: {
        backgroundColor: 'green',
    },
    uploadButton: {
        color: 'black',
        backgroundColor: 'white',
    },
    uploadText: {
        color: 'black',
    },
    buttonText: {
        color: '#ffffff'
    },
    logoContainer: {

    }
});
