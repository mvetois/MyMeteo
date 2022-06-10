import { useState } from "react";
import { ComponentProps } from "react";
import { StyleSheet, TextInput, SafeAreaView, Button  } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, useThemeColor } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import axios from "axios";

const search = async (name: string) => {
    const response = await axios.get("http://mymeteo.mvetois.fr:5000/api/cities/find?param=" + name.toLowerCase().replace(/\s/g, '')).catch(() => {});
    if (!response) {
        alert ("La ville '" + name + "' n'existe pas");
        return;
    }
    alert (response.data[0].name);
}

const Icon = (props: { name: ComponentProps<typeof MaterialIcons>["name"]; color: string; style : any ; size: number}) => {
    return <MaterialIcons {...props} />;
}

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
    const color = useThemeColor({}, "text");
    const [text, setText] = useState("");

    return (
        <View style={styles.container}>
            <Icon name="search" color={color} style={styles.icon} size={150} />
            <Text style={styles.title}>Choix de la ville</Text>
            <TextInput onChangeText={setText} value={text} style={useColorScheme() == "dark" ? styles.inputDark: styles.inputLight} />
            <Button title="Rechercher" onPress={async () => await search(text)} />
            {/* <Button title="Go to Modal" onPress={() => navigation.navigate("Modal")} /> */}
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
