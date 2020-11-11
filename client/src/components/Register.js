import React, { Component } from 'react';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirm: "",
            isAdmin: false,
            errorMessage: "",
            hasError: false
        }

        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.editCredentials = this.editCredentials.bind(this);
    }

    onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            if(this.state.password !== this.state.confirm){
                this.setState({
                    hasError: true,
                    errorMessage: "Password and Confirm Password does not match."
                })
                console.log("Password and Confirm Password does not match.");
                return null;
            }
            const body = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                isAdmin: this.state.isAdmin
            }
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const resJson = await response.json();
            if(resJson.message != null){
                this.setState({
                    hasError: true,
                    errorMessage: resJson.message
                })
            } else {
                window.location.href = "/login";
            }
        } catch (err) {
            console.error(err);
        }
    }

    editCredentials = e => {
        if(e.target.name === "username"){
            this.setState({
                username: e.target.value
            })
        }
        if(e.target.name === "email"){
            this.setState({
                email: e.target.value
            })
        }
        if(e.target.name === "password"){
            this.setState({
                password: e.target.value
            })
        }
        if(e.target.name === "confirm"){
            this.setState({
                confirm: e.target.value
            })
        }
        if(e.target.name === "demoAdmin"){
            if(e.target.checked === true){
                this.setState({
                    isAdmin: true
                })
            }
            if(e.target.checked === false){
                this.setState({
                    isAdmin: false
                })
            }
        }
    }

    render(){
        console.log(this.state);
        return(
            <div className="container border rounded bg-dark">
                <form className="form p-3 text-left" onSubmit={this.onSubmitForm}>
                <h2>User Register</h2>
                <input type="checkbox" name="demoAdmin" onChange={this.editCredentials}/> Demo Admin
                {this.state.hasError === true ? <div class="alert alert-danger" role="alert" style={{fontSize: "90%"}}>{this.state.errorMessage}</div> : null}
                <hr/>
                    <div className="container row my-2">
                        <label className="col-2">Username</label>
                        <input className="col-9 offset-1 form-control" name="username" value={this.state.username} onChange={this.editCredentials} placeholder="Username" required/>
                    </div>
                    <div className="container row my-2">
                        <label className="col-2">Email</label>
                        <input type="email" className="col-9 offset-1 form-control" name="email" value={this.state.email} onChange={this.editCredentials} placeholder="example@mail.com" required/>
                    </div>
                    <div className="container row my-2">
                        <label className="col-2">Password</label>
                        <input type="password" className="col-9 offset-1 form-control" name="password" value={this.state.password} onChange={this.editCredentials} placeholder="********" required/>
                    </div>
                    <div className="container row my-2">
                        <label className="col-2">Confirm</label>
                        <input type="password" className="col-9 offset-1 form-control" name="confirm" value={this.state.confirm} onChange={this.editCredentials} placeholder="********" required/>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success w-25 my-3 font-weight-bold">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;