/**
 * 
 * Additional Util Methods required for the app
 * 
 */

// import { showMessage, hideMessage } from "react-native-flash-message";
import React, { Component } from 'react';
import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';



type AlertType = 'info' | 'warn' | 'error' | 'success'

export type DropdownType = {
    alertWithType: (type: AlertType, title: string, message: string) => void
}

export class Core {
    static dropDown: DropdownType

    static set(key, value) {
        AsyncStorage.setItem('key', value);
    }

    static get(key) {
        return AsyncStorage.getItem(key);
    }

    static remove = (key) => {
        AsyncStorage.removeItem(key);
    }

    // static setPermission = (permission) => {
    //     // AsyncStorage.setItem('permission',permission);
    //     AsyncStorage.setItem('permission', JSON.stringify(permission))
    // }

    // static getPermission = () => {
    //     // return AsyncStorage.getItem('permission');
    //     return AsyncStorage.getItem('permission');
    // }


    static setDropDown(dropDown: DropdownType) {
        this.dropDown = dropDown
    }

    // static setBottomSheet(bottomsheet) {
    //     this.bottomsheet = bottomsheet;
    // }

    static alert(type: AlertType, title: string, message: string) {
        this.dropDown.alertWithType(type, title, message)
    }

    // static openBottomSheet() {
    //     this.bottomsheet.render(<Text>Hello</Text>)
    //     this.bottomsheet.open();
    // }
}

export function Notify({ message = 'Sucess', type = 'success', description = 'Hello' }) {
    // showMessage({ message, type, description });
    Core.alert(type, message, description);
}

// export function OpenBottomSheet() {
//     Core.openBottomSheet();
// }



export async function SetStore(key, value) {
    AsyncStorage.setItem(key, value);
}

export async function GetStore(key) {
    return AsyncStorage.getItem(key);
}

export async function RemoveStore(key) {
    AsyncStorage.removeItem(key);
}