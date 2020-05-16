import React, { Component } from "react";
import PetDataService from "../services/pet.service";

export default class Pet extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);


    this.getPet = this.getPet.bind(this);
    this.updatePet = this.updatePet.bind(this);
    this.deletePet = this.deletePet.bind(this);

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

  componentDidMount() {
    this.getPet(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.name;

    this.setState(function(prevState) {
      return {
        currentPet: {
          ...prevState.currentPet,
          name: name
        }
      };
    });
  }

  onChangeAge(e) {
    const age = e.target.value;

    this.setState(prevState => ( {
        currentPet: {
          ...prevState.currentPet,
          age: age
        }
    }));
  }

  onChangeType(e) {
    const type = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPet: {
          ...prevState.currentPet,
          type: type
        }
      };
    });
  }

  onChangeGender(e) {
    const gender = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPet: {
          ...prevState.currentPet,
          gender: gender
        }
      };
    });
  }


  getPet(id) {
    PetDataService.get(id)
      .then(response => {
        this.setState({
          currentPet: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updatePet() {
    PetDataService.update(
      this.state.currentPet.id,
      this.state.currentPet
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The pet was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePet() {
    PetDataService.delete(this.state.currentPet.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/pets')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
     const { currentPet } = this.state;

    return (
      <div>
        {currentPet ? (
          <div className="edit-form">
            <h4>Pet</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentPet.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="doctor">Age</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  value={currentPet.age}
                  onChange={this.onChangeAge}
                />
              </div>
                <div className="form-group">
                <label htmlFor="phone">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  value={currentPet.type}
                  onChange={this.onChangeType}
                />
              </div>
                <div className="form-group">
                <label htmlFor="email">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  value={currentPet.gender}
                  onChange={this.onChangeGender}
                />
                </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePet}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePet}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Pet...</p>
          </div>
        )}
      </div>
    );
  }
}