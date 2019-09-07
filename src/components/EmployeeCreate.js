//jshint esversion: 6

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from  'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { Button, CardSection } from '../components/common';
import EmployeeForm from './EmployeeForm';


class EmployeeCreate extends Component {
    
    onButtonPress() {
        const { name, phone, shift, time, email, wage, position } = this.props;

        this.props.employeeCreate({ name, phone, shift: shift || 'Monday', time, email, wage, position });
    }

    render() {
        return (
            <View>
                <EmployeeForm  {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create 
                    </Button>
                </CardSection>
           </View>
        );
    }
}



const mapStateToProps = (state) => {
    const { name, phone, shift, time, email, wage, position } = state.employeeForm;

    return { name, phone, shift, time, email, wage, position };
};

export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);