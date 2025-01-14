import React from "react";
import { TextInputProps, View, TextInput as TextInputRN } from "react-native";

export function TextInput(props : TextInputProps): React.ReactNode{
    return(
        <View style={{width : '100%', borderColor : 'black', borderWidth : 1}}>
            <TextInputRN {...props}/>
        </View>
    )
}