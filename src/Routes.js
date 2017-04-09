import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PatientsDataEntry from './PatientsDataEntry'
import PatientsList from './PatientsList'

export default function Routes(props) {
  return (
    <Router>
      <div>
        <Route exact path='/' component={PatientsDataEntry}/>
        <Route path='/list' component={PatientsList}/>
      </div>
    </Router>
  );
}
