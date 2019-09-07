//jshint esversion: 6

import _ from 'lodash';
import React, { Component } from 'react';
import { Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { CardSection, Button, Confirm } from './common';


class EmployeeEdit extends Component {
    state = { showModal: false};

   // function will take employee info you are trying to edit and render to screen
    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }

    //function will save employee info when save changed button pressed
    onButtonPress() {
        const { name, phone, shift, time, email, wage, position } = this.props;

        this.props.employeeSave({ name, phone, shift, time, email, wage, position,  uid: this.props.employee.uid });
    }

    //function will text employee with shift info when text button pressed
    onTextPress() {
        const { phone, shift, time } = this.props;

        Communications.text(phone, `Your upcoming shift is on ${shift} at ${time}`);
    }

    //function will fire employee when yes button pressed
    onAccept() {
        const { uid } = this.props.employee;

        this.props.employeeDelete({ uid });
    }

    //function will exit modal and not fire the employee on no button press
    onDecline() {
        this.setState({ showModal: false});
    }

    render() {
        return (
          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
            <ScrollView>

                <EmployeeForm />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        Fire Employee
                    </Button>
                </CardSection>

                <Confirm   visible={this.state.showModal} onAccept={this.onAccept.bind(this)} onDecline={this.onDecline.bind(this)}
                >
                    <Text style={styles.confirmStyle}>
                        Are you sure you want to fire this employee?
                    </Text>
                </Confirm>

            </ScrollView>
          </KeyboardAvoidingView>
        );
    }
}

const styles = {
    confirmStyle: {
        fontSize: 20,
        color: '#f9a812'
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift, time, email, wage, position } = state.employeeForm;

    return { name, phone, shift, time, email, wage, position };
}

export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);
