import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



import AddAdvertisement from "./components/add-advertisement.component";
import Advertisement from "./components/advertisement.component";
import AdvertisementList from "./components/adverisement-list.component";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import PetList from "./components/pet-list.component";
import Pet from "./components/pet.component";
import AddPet from "./components/add-pet.component";



class App extends Component{
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-primary">
            <a href="/advertisments" className="navbar-brand">
              VetFinder
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href={"/advertisments"} className="nav-link">
                  Advertisements
                </a>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add Advertisment
                </Link>
              </li>
               <li className="nav-item">
                <Link to={"/pets"} className="nav-link">
                  Pets
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/addPet"} className="nav-link">
                  Add Pet
                </Link>
              </li>
               <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
               <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Sign up
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/advertisments"]} component={AdvertisementList} />
              <Route exact path="/add" component={AddAdvertisement} />
              <Route path="/advertisments/:id" component={Advertisement} />
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={SignUp}/>
              <Route path="/pets" component={PetList}/>
              <Route path="/addPet" component={AddPet}/>
              <Route path="/pets/:id" component={Pet}/>



            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
