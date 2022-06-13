import { ComponentProps } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";


import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootTabScreenProps } from "../types";
import { useThemeColor } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";

const Icon = (props: { name: ComponentProps<typeof MaterialIcons>["name"]; color: string; style : any ; size: number}) => {
    return <MaterialIcons {...props} />;
}

export default function NotFoundScreen({ navigation }: RootStackScreenProps<"NotFound">) {
    const color = useThemeColor({}, "text");
    return (
        <View style={styles.container}>
            <Icon name="error" color={color} style={styles.icon} size={150} />
            <Text style={styles.title}>Une erreur est survenue, veuillez réessayer plus tard</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: "#2e78b7",
    },
    icon: {
        marginBottom: 50,
    },
});
