import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";

export default class PetList extends Component {
  constructor(props) {
    super(props);
    this.retrievePets = this.retrievePets.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePet = this.setActivePet.bind(this);
    this.removeAllPets = this.removeAllPets.bind(this);

    this.state = {
      pets: [],
      currentPet: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrievePets();
  }


  retrievePets() {
    PetDataService.getAll()
      .then(response => {
        this.setState({
          pets: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePets();
    this.setState({
      currentPet: null,
      currentIndex: -1
    });
  }

  setActivePet(pet, index) {
    this.setState({
      currentPet: pet,
      currentIndex: index
    });
  }

  removeAllPets() {
    PetDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
     const {pets, currentPet, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nema searchu she"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Pets List</h4>

          <ul className="list-group">
            {pets &&
              pets.map((pet, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePet(pet, index)}
                  key={index}
                >
                  {pet.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPets}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPet ? (
            <div>
              <h4>Pet</h4>
              <div>
                <label>
                  <strong>Name</strong>
                </label>{" "}
                {currentPet.name}
              </div>
              <div>
                <label>
                  <strong>Age</strong>
                </label>{" "}
                {currentPet.age}
              </div>
              <div>
                <label>
                  <strong>Type</strong>
                </label>{" "}
                {currentPet.type}
              </div>
              <div>
                <label>
                  <strong>Gender</strong>
                </label>{" "}
                {currentPet.gender}
              </div>


              <Link
                to={"/pets/" + currentPet.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Pet...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}