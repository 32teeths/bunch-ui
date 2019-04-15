import { AsyncStorage } from 'react-native';

export const getAccessToken = () => {
    return AsyncStorage.getItem('accToken');
}

// Set Access Token
export const setAccessToken = (accToken) => {
    AsyncStorage.setItem('accToken', accToken);
}

export const removeAccessToken = () =>{
    AsyncStorage.removeItem('accToken');
}

export const removePermission = () =>{
    AsyncStorage.removeItem('permission');
}

export const setPermission = (permission) => {
    // AsyncStorage.setItem('permission',permission);
    AsyncStorage.setItem('permission', JSON.stringify(permission))
}

export const getPermission = () => {
    // return AsyncStorage.getItem('permission');
    return AsyncStorage.getItem('permission');
}