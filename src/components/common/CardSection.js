//jshint esversion: 6

import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    );
}

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#551505',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#f9a812',
        position: 'relative'
    }
};

export { CardSection };