import React from 'react';
import { Stylesheet, Text, View, ScrollView, TextInput, TouchableOpacity, Picker, Item } from 'react-native';
// import Logo from './../logo/logo';

import { Actions } from 'react-native-router-flux';


// import * as firebase from 'firebase';
import formStyles from '../../../../styles/forms';


export default class PublishNotice extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showPass: true,
            press: false
        };

    }


    render() {
        return (
            <ScrollView style={formStyles.container}>



                <View style={formStyles.formContainer}>

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


                        {/* whome to send */}
                        {/* <View style={formStyles.sectionPadding}>

                            <Text style={[formStyles.labelStyle, formStyles.elementPadding]}>
                                to
                            </Text>

                            <Picker
                                selectedValue={this.state.language}
                                style={{ height: 50, width: 100 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ language: itemValue })
                                }>
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>

                        </View>
 */}





                        {/* <Text style={formStyles.linkStyling}
                        onPress={() => { Actions.LOGIN() }}>
                        Already Regsitered ? Login
                    </Text> */}

                    {/* </View> */}

                    <TouchableOpacity style={formStyles.buttonContainer}
                        onPress={this.submitForm}>
                        <Text style={formStyles.buttonText}>Add</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        );
    }
}

