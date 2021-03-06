import { useState, ComponentProps } from "react";
import { StyleSheet, TextInput, Button  } from "react-native";
import axios from "axios";

import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootTabScreenProps } from "../types";
import { Text, View, useThemeColor } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import { backendUrl } from "../components/utils";

const lookIfOnline = async (navigation: any) => {
    await axios.get(backendUrl + "/api/").catch(() => {
        navigation.navigate("NotFound");
    });
}

const search = async (name: string, navigation: any) => {
    const response = await axios.get(backendUrl + "/api/cities/find?param=" + name.toLowerCase().replace(/\s/g, '')).catch(() => {});
    if (!response) {
        alert ("La ville '" + name + "' n'existe pas");
        return;
    }
    await AsyncStorage.setItem("city", JSON.stringify(response.data[0]));
    navigation.navigate("Modal")
}

const Icon = (props: { name: ComponentProps<typeof MaterialIcons>["name"]; color: string; style : any ; size: number}) => {
    return <MaterialIcons {...props} />;
}

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
    lookIfOnline(navigation);
    const color = useThemeColor({}, "text");
    const [text, setText] = useState("");
    return (
        <View style={styles.container}>
            <Icon name="search" color={color} style={styles.icon} size={150} />
            <Text style={styles.title}>Choix de la ville</Text>
            <TextInput onChangeText={setText} value={text} style={useColorScheme() == "dark" ? styles.inputDark: styles.inputLight} />
            <Button title="Rechercher" onPress={async () => await search(text, navigation)} />
        </View>
    );
}
export default TabOneScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 40,
        fontWeight: "normal",
    },
    icon: {
        marginBottom: 50,
    },
    inputLight: {
        marginTop: 100,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        minWidth: "80%"
      },
      inputDark: {
        marginTop: 100,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "white",
        padding: 10,
        minWidth: "80%",
        color: "white"
      }
});
