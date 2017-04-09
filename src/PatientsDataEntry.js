import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import InputBox from './components/InputBox';

export default class PatientsDataEntry extends Component {

  constructor(){
    super();
    this.state = {
        patientsData: [],
        firstName: "",
        lastName: "",
        age: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        textInformation: ""
    }
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeTextInformation = this.onChangeTextInformation.bind(this);
    this.onSubmitValues = this.onSubmitValues.bind(this);
  }

  onSubmitValues() {
    var tempArray = [];
    if(this.state.patientsData.length) {
      tempArray = this.state.patientsData.slice();
    }
    tempArray.push({firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, dateOfBirth: this.state.dateOfBirth, gender: this.state.gender, phone: this.state.phone, textInformation: this.state.textInformation});
    console.log(tempArray);
    firebase.database().ref('patientsData').set(tempArray);
    this.setState ({
      firstName: "",
      lastName: "",
      age: "",
      dateOfBirth: "",
      gender: "",
      phone: "",
      textInformation: ""
    });
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
    this.getData();
  }

  getData() {
    firebase.database().ref('patientsData').once("value").then(val => {
      console.log(val.val());
      this.setState({
        patientsData: val.val() || [],
      })
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeAge(e) {
    if ((/^[0-9]?[0-9]{1}$|^100$/).test(e.target.value) || e.target.value === "") {
      this.setState({
        age: e.target.value
      });
    }
  }

  onChangeDateOfBirth(e) {
    this.setState({
      dateOfBirth: e.target.value
    });
  }


  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  onChangePhone(e) {
    if ((/^[0-9]{1,10}$/).test(e.target.value) || e.target.value === "") {
      this.setState({
        phone: e.target.value
      });
    }
  }

  onChangeTextInformation(e) {
    this.setState({
      textInformation: e.target.value
    });
  }

  render() {
    var disableSubmit = true;
    if (this.state.firstName && this.state.lastName && this.state.age && this.state.dateOfBirth && this.state.gender !== "" && this.state.phone && this.state.textInformation) {
      disableSubmit = false;
    }
    var disabled = true
    if((/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/).test(this.state.dateOfBirth)) {
      disabled = false;
      console.log(disabled);
    }
    var disableButton = true;
    if(!disabled && !disableSubmit) {
      disableButton = false;
    }
    return (
      <div className="App">
        <h2 className="App-header">Enter Patient Details</h2>
        <div className="form-container">
          <InputBox onChangeField={this.onChangeFirstName.bind(this)} fieldValue={this.state.firstName} label="First Name" placeholder="Enter First Name" />
          <InputBox onChangeField={this.onChangeLastName.bind(this)} fieldValue={this.state.lastName} label="Last Name" placeholder="Enter Last Name" />
          <InputBox onChangeField={this.onChangeAge.bind(this)} fieldValue={this.state.age} label="Age" placeholder="Enter Age" />
          <InputBox onChangeField={this.onChangeDateOfBirth.bind(this)} fieldValue={this.state.dateOfBirth} label="Date of Birth" placeholder="DD-MM-YYYY" />
          <div className="container">
            <div className="labelContainer">
              <label>
                Gender
              </label>
            </div>
            <div className="inputContainer">
              <select name="list" id="gender" style={{width: "214px", borderRadius: "8px", padding: "5px", outline: "none"}} value={this.state.gender} onChange={this.onChangeGender.bind(this)}>
                 <option value="">Select Gender</option>
                 <option value="M">Male</option>
                 <option value="F">Female</option>
                 <option value="O">Other</option>
              </select>
            </div>
          </div>
          <InputBox onChangeField={this.onChangePhone.bind(this)} fieldValue={this.state.phone} label="Phone Number" placeholder="Enter Phone" />
          <div className="container">
            <div className="labelContainer">
              <label>
                Patient Information
              </label>
            </div>
            <div className="inputContainer">
              <textarea style={{width: "203px", resize: "none", borderRadius: "8px", padding: "5px", outline: "none"}} rows="3" cols="50" onChange={this.onChangeTextInformation.bind(this)} value={this.state.textInformation} placeholder="Enter Patient Information">
              </textarea>
            </div>
          </div>
          <div className="buttonContainer">
            <button style={{borderRadius: "10px", outline: "none", cursor: "pointer"}} onClick={this.onSubmitValues} disabled={disableButton}>
              Submit
            </button>
          </div>
          <div>
            <a style={{textDecoration: "none", color: "white"}} href="/list">Patients Directory</a>
          </div>
        </div>
      </div>
    );
  }
}
