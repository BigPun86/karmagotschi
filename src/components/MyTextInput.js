import React from "react";
import {TextInput} from "react-native";

export default function MyTextInput({setRef, focusNextItem, refKey, value, placeholder, onChangeText, keyboardType}) {
    return (
        <TextInput
            ref={setRef}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 4, borderRadius: 4, padding: 8 }}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onSubmitEditing={() => focusNextItem && focusNextItem(refKey)}

        />
    );
}
