//jshint esversion: 6


import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { CardSection, Input } from './common';

class EmployeeForm extends Component {
    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label="Name:"
                        placeholder="Jane Doe"
                        value={this.props.name}
                        onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        label="Position:"
                        placeholder="Waitress/Server/Hostess/Bartender"
                        value={this.props.position}
                        onChangeText={value => this.props.employeeUpdate({ prop: 'position', value })}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        label="Wages:"
                        value={this.props.wage}
                        onChangeText={value => this.props.employeeUpdate({ prop: 'wage', value })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Email:"
                        placeholder="user@gmail.com"
                        value={this.props.email}
                        onChangeText={value => this.props.employeeUpdate({ prop: 'email', value })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone:"
                        placeholder="555-555-5555"
                        value={this.props.phone}
                        onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
                    />
                </CardSection>
            
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={styles.pickerTextStyle}>Shift:</Text>
                            <Picker selectedValue={this.props.shift} onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}>
                                <Picker.Item color='#f9a812' label="Monday" value="Monday" />
                                <Picker.Item color='#f9a812' label="Tuesday" value="Tuesday" />
                                <Picker.Item color='#f9a812' label="Wednesday" value="Wednesday" />
                                <Picker.Item color='#f9a812' label="Thursday" value="Thursday" />
                                <Picker.Item color='#f9a812' label="Friday" value="Friday" />
                                <Picker.Item color='#f9a812' label="Saturday" value="Saturday" />
                                <Picker.Item color='#f9a812' label="Sunday" value="Sunday" />
                            </Picker>
                </CardSection>

                <CardSection>
                    <Input 
                        label="Time:"
                        placeholder="6:00 A.M."
                        value={this.props.time}
                        onChangeText={value => this.props.employeeUpdate({ prop: 'time', value })}
                    />
                </CardSection>
            </View>
        ) 
    }
}    



const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
        color: '#f9a812'
    },
    timeTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
        color: '#f9a812'
    }
};

const mapStateToProps = (state) => {
    const { name, phone, shift, time, email, position, wages } = state.employeeForm;

    return { name, phone, shift, time, email, position, wages }
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);