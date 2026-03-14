import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKey = 'Stor:TimeBubble:@1.0.0'

export const SaveObject = async (key, value) => {
    return await SaveStorage(key, JSON.stringify(value))
}

export const ReadObject = async (key) => {
    return JSON.parse( await ReadStorage(key))
}

export const SaveStorage = async (key, value) => {
    return await AsyncStorage.setItem(`${ storageKey }::${ key }`, value)
} 

export const ReadStorage = async (key) => {
    return await AsyncStorage.getItem(`${ storageKey }::${ key }`)
}