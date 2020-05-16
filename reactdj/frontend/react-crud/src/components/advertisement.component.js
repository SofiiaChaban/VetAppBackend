import React, { Component } from "react";
import AdvertisementDataService from "../services/advertisement.service";

export default class Advertisement extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFreetime = this.onChangeFreetime.bind(this);
    this.onChangeDoctor = this.onChangeDoctor.bind(this);


    this.getAdvertisement = this.getAdvertisement.bind(this);
    this.updateAdvertisement = this.updateAdvertisement.bind(this);
    this.deleteAdvertisement = this.deleteAdvertisement.bind(this);

    this.state = {
      currentAdvertisement: {
        id: null,
        title: "",
        doctor: "",
        phone: "",
        email: "",
        freetime:"",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getAdvertisement(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAdvertisement: {
          ...prevState.currentAdvertisement,
          title: title
        }
      };
    });
  }

  onChangeDoctor(e) {
    const doctor = e.target.value;

    this.setState(prevState => ( {
        currentAdvertisement: {
          ...prevState.currentAdvertisement,
          doctor: doctor
        }
    }));
  }

  onChangePhone(e) {
    const phone = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAdvertisement: {
          ...prevState.currentAdvertisement,
          phone: phone
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAdvertisement: {
          ...prevState.currentAdvertisement,
          email: email
        }
      };
    });
  }

  onChangeFreetime(e) {
    const freetime = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAdvertisement: {
          ...prevState.currentAdvertisement,
          freetime: freetime
        }
      };
    });
  }

  getAdvertisement(id) {
    AdvertisementDataService.get(id)
      .then(response => {
        this.setState({
          currentAdvertisement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateAdvertisement() {
    AdvertisementDataService.update(
      this.state.currentAdvertisement.id,
      this.state.currentAdvertisement
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The advertisement was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAdvertisement() {
    AdvertisementDataService.delete(this.state.currentAdvertisement.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/advertisments')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
     const { currentAdvertisement } = this.state;

    return (
      <div>
        {currentAdvertisement ? (
          <div className="edit-form">
            <h4>Advertisement</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentAdvertisement.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="doctor">Doctor</label>
                <input
                  type="text"
                  className="form-control"
                  id="doctor"
                  value={currentAdvertisement.doctor}
                  onChange={this.onChangeDoctor}
                />
              </div>
                <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={currentAdvertisement.phone}
                  onChange={this.onChangePhone}
                />
              </div>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <inpupt
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentAdvertisement.email}
                  onChange={this.onChangeEmail}
                />
              </div>
                <div className="form-group">
                <label htmlFor="freetime">Freetime</label>
                <input
                  type="text"
                  className="form-control"
                  id="freetime"
                  value={currentAdvertisement.freetime}
                  onChange={this.onChangeFreetime}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteAdvertisement}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateAdvertisement}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Advertisement...</p>
          </div>
        )}
      </div>
    );
  }
}