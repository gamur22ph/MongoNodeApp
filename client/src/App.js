import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Products from './components/Products';
import Buy from './components/Buy';
import Restock from './components/Restock';
import CreateProduct from './components/CreateProduct';
import Error404 from './components/Error404';
import Error403 from './components/Error403';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      isLoading: true,
      isAuthenticated: false
    }

    this.authorize = this.authorize.bind(this);
  }

  authorize = async () => {
    try {
      const response = await fetch("/api/protected", {
        method: "GET",
        headers: {"token": localStorage.getItem("token")},
      })
      const resJson = await response.json();
      if(resJson === "Not Authorized"){
        console.log("Not Authorized");
        this.setState({isLoading: false});
        return null;
      }
      this.setState({
        user: resJson,
        isAuthenticated: true,
        isLoading: false
      })
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount = async() => {
    await this.authorize();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar isAuthenticated={this.state.isAuthenticated} isLoading={this.state.isLoading} user={this.state.user}/>
          <header className="App-header"> 
              <Switch>
                <Route exact path="/" render={props => <Home />}/>
                <Route exact path="/login" render={props => this.state.isLoading === true ? <Loading {...props}/> : this.state.isAuthenticated === false ? <Login {...props}/> : <Redirect to="/dashboard"/>}/>
                <Route exact path="/register" render={props => this.state.isLoading === true ? <Loading {...props}/> : this.state.isAuthenticated === false ? <Register {...props}/> : <Redirect to="/dashboard"/>}/>
                <Route exact path="/dashboard" render={props => this.state.isLoading === true ? <Loading {...props}/> : this.state.isAuthenticated === true ? <Dashboard {...props}/> : <Redirect to="/login"/>}/>
                <Route exact path="/products" render={props => this.state.isLoading === true ? <Loading {...props}/> : <Products {...props} user={this.state.user}/>}/>
                <Route exact path="/products/create" render={props => this.state.isLoading === true ? <Loading {...props}/> : this.state.user.isAdmin === true ? <CreateProduct {...props}/> : <Redirect to="/error403"/>}/>
                <Route exact path="/products/buy/:id" render={props => this.state.isLoading === true ? <Loading {...props}/> : <Buy {...props}/>}/>
                <Route exact path="/products/restock/:id" render={props => this.state.isLoading === true ? <Loading {...props}/> : this.state.user.isAdmin === true ? <Restock {...props}/> : <Redirect to="/error403"/>}/>
                <Route exact path="/error403" render={props => <Error403/>}/>
                <Route exact path="*" render={props => <Error404/>}/>
              </Switch>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
