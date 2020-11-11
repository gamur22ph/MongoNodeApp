import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props){
        super(props);
        
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    render(){
        return(
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Systema</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="/products">Products</a>
                    </div>
                    {/* Login, Register and Logout Button */}
                    { this.props.isLoading === true ? null : this.props.isAuthenticated === true ?
                        <div className="navbar-nav ml-auto">
                            <div class="mx-3">
                                User: {this.props.user.username}<br/>
                                <u>{this.props.user.isAdmin === true ? "Admin": "Member"}</u>
                            </div>
                            <button className="btn btn-primary" onClick={this.handleLogout}>Logout</button>
                            
                        </div>
                     : 
                        <div className="navbar-nav ml-auto">
                            <a className="nav-item nav-link" href="/login">Login</a>
                            <a className="nav-item nav-link" href="/register">Register</a>
                        </div>
                    }
                </div>
            </nav>
        )
    }
}

export default Navbar;