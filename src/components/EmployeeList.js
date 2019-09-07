// jshint esversion: 6
/*jshint ignore: start */

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, ScrollView } from 'react-native';
import { employeesFetch, logoutUser } from '../actions';
import ListItem from './ListItem';
import LogoutForm from './LogoutForm';


class EmployeeList extends Component {

    /* will render employee list to screen */
    componentWillMount() {
        this.props.employeesFetch();

        this.createDataSource(this.props);
    }

    /*  nextProps are the next set of props that this component 
        will be rendered with
        this.props is still the old set of props
     */
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }   

    createDataSource({ employees }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(employees);
    }

    renderRow(employee) {
        return <ListItem employee={employee} />
    }

    render () {
        return (
            <ScrollView style={{ backgroundColor: '#551505' }}>
                    <ListView 
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                    <LogoutForm />
            </ScrollView>    
        )
    }
}



// function will collect all employee objects and put into an array

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    });
    return { employees };
};

export default connect(mapStateToProps, { employeesFetch, logoutUser })(EmployeeList);