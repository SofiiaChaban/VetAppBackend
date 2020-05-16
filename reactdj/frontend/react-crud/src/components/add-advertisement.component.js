import React, { Component } from "react";
import AdvertisementDataService from "../services/advertisement.service";

export default class AddPet extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDoctor = this.onChangeDoctor.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeFreetime= this.onChangeFreetime.bind(this);
    this.onChangeCity= this.onChangeCity.bind(this);
    this.onChangeType= this.onChangeType.bind(this);

    this.saveAdvertisement = this.saveAdvertisement.bind(this);
    this.newAdvertisement = this.newAdvertisement.bind(this);

    this.state = {
      id: null,
      title: "",
      doctor: "",
      phone: "",
      email: "",
      freetime:"",
      city:"",
      type:"",
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDoctor(e) {
    this.setState({
      doctor: e.target.value
    });
  }

  onChangeEmail(e){
      this.setState({
          email: e.target.value
      });
  }

  onChangePhone(e){
      this.setState({
          phone: e.target.value
      });
  }

  onChangeFreetime(e){
      this.setState({
          freetime: e.target.value
      });
  }
   onChangeCity(e){
      this.setState({
          city: e.target.value
      });
  }
 onChangeType(e){
      this.setState({
          type: e.target.value
      });
  }
  saveAdvertisement() {
    var data = {
      title: this.state.title,
      doctor: this.state.doctor,
      phone: this.state.phone,
      email: this.state.email,
      freetime: this.state.freetime,
      city:this.state.city,
      type:this.state.type,
    };
    AdvertisementDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          doctor: response.data.doctor,
          phone: response.data.phone,
          email: response.data.email,
          freetime: response.data.freetime,
          city: response.data.city,
          type: response.data.type,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newAdvertisement() {
    this.setState({
      id: null,
      title: "",
      doctor: "",
      phone: "",
      email: "",
      freetime:"",
      city:"",
      type:"",
      submitted: false
    });
  }

  render() {
       return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newAdvertisement}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="doctor">Doctor</label>
              <input
                type="text"
                className="form-control"
                id="doctor"
                required
                value={this.state.doctor}
                onChange={this.onChangeDoctor}
                name="doctor"
              />
            </div>

               <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                required
                value={this.state.phone}
                onChange={this.onChangePhone}
                name="phone"
              />
            </div>

               <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

               <div className="form-group">
              <label htmlFor="freetime">Freetime</label>
              <input
                type="text"
                className="form-control"
                id="freetime"
                required
                value={this.state.freetime}
                onChange={this.onChangeFreetime}
                name="freetime"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="freetime"
                required
                value={this.state.city}
                onChange={this.onChangeCity}
                name="city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">TYpe</label>
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

            <button onClick={this.saveAdvertisement} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}