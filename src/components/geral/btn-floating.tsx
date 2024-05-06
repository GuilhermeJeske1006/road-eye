import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BtnFloating(props: {
    icon: string;
    Ionicons?: boolean;
    fn: (arg0: boolean) => void;
    bottom?: number;
    right?: number;
    left?: number;
    top?: number;

}) {
    return (
        <TouchableOpacity
            onPress={() => props.fn(true)}
            style={[styles.buttonOpenList, {
                bottom: props.bottom,
                right: props.right,
                left: props.left,
                top: props.top,
            }]}
        >
            {
                props.Ionicons ? (
                    <Ionicons
                        name={props.icon}
                        style={styles.iconMap}
                        size={30}
                        margin={20}
                    />
                ) :(
                    <Icon
                    name={props.icon}
                    style={styles.iconMap}
                    size={30}
                    margin={20}
                />
                )
            }
           
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonOpenList: {
        position: "absolute",
        backgroundColor: "white",
        borderRadius: 50,
    },

    iconMap: {
        color: "#EDB047",
    },
})