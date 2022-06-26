import { useState, useEffect, ComponentProps } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image } from "react-native";
import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View } from "../components/Themed";
import { capitalize, weatherCode, Weather, City, windDir, backendUrl } from "../components/utils";

const checkStorage = async () : Promise<any> => {
    const city = await AsyncStorage.getItem("city");

    if (city)
        return JSON.parse(city);
    return undefined;
}

const getWeather = async (code: number) : Promise<Weather | {}> => {
    const response = await axios.get(backendUrl + "/api/cities/weather?code=" + code).catch(() => {});
    if (!response)
        return ({});
    return (response.data);
}

const ModalScreen = () => {
    const [city, setCity] = useState({} as City);
    const [weather, setWeather] = useState({} as Weather);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading)
            checkStorage().then((c) => setCity(c));
        if (isLoading && city?.code)
            getWeather(city.code).then((w) => setWeather(w as Weather)).finally(() => setIsLoading(false));
    });
    return (
        <View style={styles.container}>
            {weather ? <Image source={{ uri: weatherCode(weather?.data?.current_weather?.weathercode) }} style={styles.image} /> : <></> }

            <Text style={styles.title}>{city ? capitalize(weather?.city?.name): "Test"}</Text>

            {weather ?
                <View>
                    <Text>Département : {weather?.city?.nameDpt}</Text>
                    <Text> </Text>
                    <Text>{weather?.city?.codePst?.length <= 1 ? "Code postal :" : "Code postaux :"}</Text>
                    <Text>{weather?.city?.codePst.map(x => x + " ")} </Text>
                    <Text> </Text>
                    <Text>Température : {weather?.data?.current_weather?.temperature} °C</Text>
                    <Text>Vent : {weather?.data?.current_weather?.windspeed} Km/h</Text>
                    <Text>Direction : {windDir(weather?.data?.current_weather?.winddirection)}</Text>
                </View>
            : <></> }

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
        fontSize: 40,
        fontWeight: "bold",
    },
    image : {
        width: 100,
        height: 100
    },
    bold: {
        fontWeight: "bold"
    }
});
