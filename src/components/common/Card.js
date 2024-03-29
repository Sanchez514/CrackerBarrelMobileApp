//jshint esversion:6
/* jshint ignore: start */

import React from 'react';
import { View } from 'react-native';

//functional component
const Card = (props) => {
    return (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    )
};

const styles = {
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#f9a812',
        borderBottom: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10, 
     

    }
};


export { Card };