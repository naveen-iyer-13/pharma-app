import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

export default class PatientsList extends Component {
  constructor(){
    super();
    this.state = {
        patientsData: [],
        filterName: "",
        status: "HIDDEN",
        message: ""
    }
    this.onChangeFilter = this.onChangeFilter.bind(this);
  }

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyCJ_EfRh1J4wOjExZ0r8f6goxe2j5z3zhE",
      authDomain: "patientsdata-19fb4.firebaseapp.com",
      databaseURL: "https://patientsdata-19fb4.firebaseio.com",
      projectId: "patientsdata-19fb4",
      storageBucket: "patientsdata-19fb4.appspot.com",
      messagingSenderId: "198303456127"
    };
    firebase.initializeApp(config);
    this.setState({
      status: "LOADING"
    })
    this.getData();
  }

  getData() {
    firebase.database().ref('patientsData').once("value").then(val => {
      console.log(val.val());
      var message;
      if(val.val()) {
        message = "";
      }
      else {
        message = "No Data Found";
      }
      this.setState({
        patientsData: val.val() || [],
        status: "READY",
        message: message
      })
    });
  }

  onChangeFilter(e) {
    this.setState({
      filterName: e.target.value
    });
  }

  render() {
    var tempArray = [];
    if(this.state.filterName) {
      tempArray = this.state.patientsData.slice();
      var filterName = this.state.filterName;
      tempArray = tempArray.filter(function (row) {
        return row.firstName.toLowerCase().includes(filterName.toLowerCase());
      });
    }
    else {
      tempArray = this.state.patientsData;
    }
    tempArray = tempArray.map(function(item) {
      if (item.gender === "M") {
        item.genderData = "Male"
      }
      else if (item.gender === "F") {
        item.genderData = "Female"
      }
      else {
        item.genderData = "Other"
      }
      return item;
    })
    var table = tempArray.map(function(row,i) {
      return (
        <tr key={i}>
          <td>{row.firstName}</td>
          <td>{row.lastName}</td>
          <td>{row.age}</td>
          <td>{row.dateOfBirth}</td>
          <td>{row.genderData}</td>
          <td>{row.phone}</td>
          <td>{row.textInformation}</td>
        </tr>
      );
    })
    var tableData;
    if(this.state.status === "LOADING") {
      var loading = (
        <div>Loading Data</div>
      )
    }
    else {
      if (this.state.patientsData) {
        tableData = (
          <div>
            <div style={{display: "inline-block", float: "right", padding: "5px 0px"}}>
              <div style={{display: "inline-block", padding: "5px"}}>
                Filter By Name
              </div>
              <div style={{display: "inline-block"}}>
                <input onChange={this.onChangeFilter}  value={this.state.filterName} type="text"/>
              </div>
            </div>
            <table className="patientsList">
              <thead>
                <tr>
                  <th style={{width: "120px"}}>First Name</th>
                  <th style={{width: "120px"}}>Last Name</th>
                  <th style={{width: "120px"}}>Age</th>
                  <th style={{width: "120px"}}>Date of Birth</th>
                  <th style={{width: "120px"}}>Gender</th>
                  <th style={{width: "120px"}}>Phone</th>
                  <th style={{width: "120px"}}>Patient Info</th>
                </tr>
              </thead>
              <tbody>
               {table}
              </tbody>
            </table>
            <div style={{padding: "20px"}}>
              <a style={{textDecoration: "none", color: "black", fontWeight: "bold"}} href="/">Back to Data Entry Page</a>
            </div>
          </div>
        )
      }
      else {
        tableData = <div>{this.state.message}</div>
      }
    }
    return (
      <div className="tableContainer">
        <h2>Patients Data</h2>
        {loading}
        {tableData}
     </div>
    );
  }
}
