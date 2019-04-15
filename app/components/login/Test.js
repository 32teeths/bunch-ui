import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { GetStore, SetStore } from './../../utils/core.utils';

export default class Test extends React.Component {
    state = {
        photo: null,
        token: '',
        sal_test:1,
        test:0
    };

    selectBox = (e) => {
        this.setState({ test: `${e}`})
    }

    componentDidMount() {
        this.getToken();
    }

    getToken = async () => {
        await GetStore('token').then((token) => {
            if (token != null) {
                console.log(token)
                this.setState({ token: 'Token ' + token });
            } else {
                // this.errorMessage('Something went wrong, Please try again.');
                console.log('testng');
            }
        });
    }
    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log('response' , response)
            if (response.uri) {
                console.log("response",response);
                this.setState({ photo: response });
            }
        });
    };
    upload = () => {
        let formData = new FormData();
        const { uri } = this.state.photo;
        const { fileName } = this.state.photo;
        const { type } = this.state.photo;
        console.log(uri);
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

        var url = 'https://passmein-staging.herokuapp.com/api/v1/maintenance_tickets/images';

        fetch(url, options)
            .then(res => {
                if (res.ok == true){
                    this.setState({ imgae_id: JSON.parse(res._bodyText).id });
                }else{
                    
                }
            })
            // .then(res => res.json())
            // .then(res => {
            //     console.log(res)
            // })
            .catch(error => {
                console.log(error);
            });

    }
    uploads = () => {
        let formBody = { phone_number: '123', otp: '321' };
        var object = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-Apartment-Id': 1

            },
            body: JSON.stringify(formBody)
        };

        var url = 'http://192.168.0.176/image_caretaker/test.php';

        fetch(url, object)
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        let options = [
            {
                name: 'Other',
                c_id :'1'
            },{
                name: 'Maintenance',
                c_id: '2'
            },{
                name: 'Water',
                c_id: '3'
            },{
                name: 'Electricity',
                c_id: '4'
            }];
        const { photo } = this.state;
        return (
            this.state.sal_test ? 
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {photo && (
                    <Image
                        source={{ uri: photo.uri }}
                        style={{ width: 300, height: 300 }}
                    />
                )}
                <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
                <Button title="Upload" onPress={this.upload} />
                </View> : 
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'space-between',marginHorizontal:20}}>
                    {
                        options.map((option) => {
                            return (<TouchableOpacity onPress={() => this.selectBox(`${option.c_id}`)} style={[styles.containerBorder, this.state.test == option.c_id ? { borderColor: '#ddd' } : { borderColor: '#fff' }]}>
                                <View>
                                    <Text style={styles.fontStyle}>
                                        {option.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )})
                    }
                </View>
        );
    }
}

const styles = StyleSheet.create({
    containerBorder: {
        width:'45%' , 
        height: 100, 
        marginTop:20,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#eee',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1
    },
    fontStyle:{
        fontSize: 16,
        // color: '#444A45',
        fontWeight: '500'
    }
});

