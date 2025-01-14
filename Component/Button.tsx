import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps{
    onPress: () => void;
    label: string;
}

export function Button(props : ButtonProps) : React.ReactNode{
    return(
        <View style={{backgroundColor : 'green', padding : 5, width : 'max-content'}}>
            <TouchableOpacity onPress={props.onPress}>
                <Text style={{color : 'white'}}>{props.label}</Text>
            </TouchableOpacity>
        </View>
    )
}