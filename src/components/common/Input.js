//jshint esversion: 6

import React from 'react';
import { TextInput, View, Text } from 'react-native';



const Input = ({ label, value, onChangeText, placeholder, secureTextEntry}) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={[containerStyle]}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}                        
                placeholderTextColor='#f9a812'
                autoCorrect={false}
                style={inputStyle}
                onChangeText={onChangeText}
                value={value}
            />
        
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#f9a812',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
        
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        color: '#f9a812'
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}

export { Input };