import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
            hasError: false
        }

        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.editCredentials = this.editCredentials.bind(this);
    }

    onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {
                email: this.state.email,
                password: this.state.password
            }
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const resJson = await response.json();
            if(resJson === "Email and Password is incorrect."){
                this.setState({
                    hasError: true,
                    errorMessage: resJson
                })
                return null;
            } else {
                localStorage.setItem("token", resJson.token);
                window.location.href = "/dashboard";
            }
            
        } catch (err) {
            console.error(err);
        }
    }

    editCredentials = e => {
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
    }

    render(){
        console.log(this.state);
        return(
            <div className="container border rounded bg-dark">
                <form className="form p-3 text-left" onSubmit={this.onSubmitForm}>
                <h2>User Login</h2>
                {this.state.hasError === true ? <div className="alert alert-danger" role="alert" style={{fontSize: "90%"}}>{this.state.errorMessage}</div> : null}
                <hr/>
                    <div className="container row my-2">
                        <label className="col-2">Email</label>
                        <input type="email" className="col-10 form-control" name="email" value={this.state.email} onChange={this.editCredentials} placeholder="Enter email address here" required/>
                    </div>
                    <div className="container row my-2">
                        <label className="col-2">Password</label>
                        <input type="password" className="col-10 form-control" name="password" value={this.state.password} onChange={this.editCredentials} placeholder="********" required/>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary w-25 my-3 font-weight-bold">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;