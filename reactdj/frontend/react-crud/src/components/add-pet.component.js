import React, { Component } from "react";
import PetDataService from "../services/pet.service"
export default class AddPet extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);

    this.savePet = this.savePet.bind(this);
    this.newPet = this.newPet.bind(this);

    this.state = {
      currentPet: {
        id: null,
        name: "",
        age: "",
        type: "",
        gender: "",
      },
      message: ""
    };
  }

 onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }


  savePet() {
    var data = {
      name: this.state.name,
      age: this.state.age,
      type: this.state.type,
      gender: this.state.gender,
    };
    PetDataService.create(data)
      .then(response => {
        this.setState({
            name: response.data.name,
            age: response.data.age,
            type: response.data.type,
            gender: response.data.gender,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPet() {
    this.setState({
      id: null,
        name: "",
        age: "",
        type: "",
        gender: "",

      submitted: false
    });
  }

  render() {
       return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPet}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                required
                value={this.state.age}
                onChange={this.onChangeAge}
                name="age"
              />
            </div>

               <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                required
                value={this.state.type}
                onChange={this.onChangeType}
                name="type"
              />
            </div>

               <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                className="form-control"
                id="gender"
                required
                value={this.state.gender}
                onChange={this.onChangeGender}
                name="gender"
              />
            </div>

            <button onClick={this.savePet} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}