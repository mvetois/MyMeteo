import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View } from "../components/Themed";
import { capitalize } from "../components/utils";

const checkStorage = async () : Promise<any> => {
    const city = await AsyncStorage.getItem("city");

    if (city)
        return JSON.parse(city);
    return undefined;
}

const getWeather = async (code: string) => {
    const response = await axios.get("https://mymeteo.mvetois.fr/api/cities/weather?code=" + code).catch(() => {});
    if (!response)
        return (undefined);
    return (response.data);
}

const ModalScreen = () => {
    const [city, setCity] = useState({});
    const [weather, setWeather] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkStorage().then((c) => setCity(c));
        if (isLoading && city?.code)
            getWeather(city.code).then((w) => setWeather(w)).finally(() => setIsLoading(false));
    });
    return (
            <View style={styles.container}>
            <Text style={styles.title}>{city ? capitalize(city.name): "Test"}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text>{city ? JSON.stringify(city) : ""}</Text>
            <Text>{weather ? JSON.stringify(weather) : ""}</Text>

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
    );
}
export default ModalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
