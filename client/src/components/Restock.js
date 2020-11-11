import React, { Component } from 'react';

class Restock extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: {},
            quantity: 1,
            itemFound: false,
            hasError: false,
            errorMessage: "",
        }
        this.handleRestock = this.handleRestock.bind(this);
        this.initializeRestock = this.initializeRestock.bind(this);
        this.handleCredentials = this.handleCredentials.bind(this);
    }

    handleCredentials = async(e) => {
        if(e.target.name === "quantity"){
            if(this.state.quantity <= 0){
                this.setState({
                    quantity: 1
                })
            } else {
                this.setState({
                    quantity: e.target.value
                })
            }
        }
    }
    
    handleRestock = async(e) => {
        e.preventDefault();
        try {
            const body = {
                quantity: this.state.quantity
            }
            console.log("working");
            const response = await fetch(`/api/products/restock/${this.props.match.params.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json", "token": localStorage.getItem("token")},
                body: JSON.stringify(body)
            })
            const resJson = await response.json();
            console.log(resJson);
            if(resJson.ErrorMessage != null){
                this.setState({
                    hasError: true,
                    errorMessage: resJson.ErrorMessage
                })
                return null;
            } else {
                window.location.href = "/products";
            }
        } catch (err) {
            console.error(err);
        }
    }

    initializeRestock = async () => {
        try {
            const response = await fetch(`/api/products/${this.props.match.params.id}`);
            const resJson = await response.json();
            if(resJson.ErrorMessage != null){
                return null;
            } else {
                this.setState({
                    item: resJson,
                    itemFound: true
                })
            }
        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount = () => {
        this.initializeRestock();
    }

    render(){
        return (
            <div className="container">
                { this.state.itemFound === true ?
                <form className="form bg-dark p-3" onSubmit={this.handleRestock}>
                    <h2>Restock {this.state.item.name}</h2>
                    <h4>Quantity: {this.state.item.quantity}</h4>
                    {this.state.hasError === true ? <div class="alert alert-danger">{this.state.errorMessage}</div> : null}
                    <hr/>
                    <div className="row">
                        <label className="col-3">How many:</label>
                        <input type="number" className="form-control col-6" name="quantity" value={this.state.quantity} onChange={this.handleCredentials}/>
                        <button type="submit" className="btn btn-primary col-2 mx-3">Confirm</button>
                    </div>
                </form>
                : <div>No Item Found</div>}
            </div>
        );
    }
}

export default Restock;