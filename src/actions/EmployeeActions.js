//jshint esversion: 6
import firebase from 'firebase';
import { EMPLOYEE_UPDATE, EMPLOYEE_CREATE, EMPLOYEES_FETCH_SUCCESS, EMPLOYEE_SAVE_SUCCESS } from './Types';
import { Actions } from 'react-native-router-flux';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

// will get access from database and reference user signing in
export const employeeCreate = ({ name, phone, shift, time, email, wage, position }) => {
    const { currentUser } = firebase.auth();

return (dispatch) => {
  firebase.database().ref(`/users/${currentUser. uid}/employees`)
    .push({ name, phone, shift, time, email, wage, position })
    .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });        
        Actions.employeeList({ type: 'reset' });
    });   
  };
};

// will fetch all employees in database
export const employeesFetch = () => {
const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
          dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};


// function will update and save employee info
export const employeeSave = ({ name, phone, shift, time, email, wage, position, uid }) => {
  const { currentUser } = firebase.auth();
  
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift, time, email, wage, position })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

//function will delete employee
export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        Actions.employeeList({ type: 'reset'});
      });
  };
};

