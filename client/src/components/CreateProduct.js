import React, { Component } from 'react';

class CreateProduct extends Component {
    constructor(props){
        super(props);
        this.state={
            name: "",
            description: "",
            quantity: "",
            cost: "",
            hasError: false,
            errorMessage: ""
        }

        this.handleCredentials = this.handleCredentials.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleCredentials = (e) => {
        if(e.target.name === "name"){
            this.setState({
                name: e.target.value
            })
        }
        if(e.target.name === "description"){
            this.setState({
                description: e.target.value
            })
        }
        if(e.target.name === "quantity"){
            this.setState({
                quantity: e.target.value
            })
        }
        if(e.target.name === "cost"){
            this.setState({
                cost: e.target.value
            })
        }
    }

    handleCreate = async(e) => {
        e.preventDefault();
        try {
            const body = {
                name: this.state.name,
                description: this.state.description,
                quantity: this.state.quantity,
                cost: this.state.cost
            }
            await fetch("/api/products/", {
                method: "POST",
                headers: {"Content-Type": "application/json", "token": localStorage.getItem("token")},
                body: JSON.stringify(body)
            })
            window.location.href = "/products";
        } catch (err) {
            console.error(err);
        }
    }
    
    render() {
        return (
            <div className="container border rounded bg-dark">
                <form className="form p-3 text-left" onSubmit={this.handleCreate}>
                <h2>Create a Product</h2>
                {this.state.hasError === true ? <div className="alert alert-danger" role="alert" style={{fontSize: "90%"}}>{this.state.errorMessage}</div> : null}
                <hr/>
                    <div className="container row my-2">
                        <label className="col-2">Name</label>
                        <input className="col-10 form-control" name="name" value={this.state.name} onChange={this.handleCredentials} placeholder="Enter product name" required/>
                    </div>
                    <div className="container row my-2">
                        <label className="col-2">Description</label>
                        <input className="col-10 form-control" name="description" value={this.state.description} onChange={this.handleCredentials} placeholder="Enter product description" required/>
                    </div>
                    <div className="container row my-2">
                        <label className="col-2">Quantity</label>
                        <input type="number" className="col-10 form-control" name="quantity" value={this.state.password} onChange={this.handleCredentials} placeholder="Enter product quantity" required/>
                    </div>
                    <div className="container row my-2">
                        <label className="col-2">Cost</label>
                        <input type="number" className="col-10 form-control" name="cost" value={this.state.cost} onChange={this.handleCredentials} placeholder="Enter product cost in php" required/>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary w-25 my-3 font-weight-bold">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateProduct;