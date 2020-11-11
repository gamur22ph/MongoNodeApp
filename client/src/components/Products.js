import React, { Component, Fragment } from 'react';

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            buyModal: false
        }
    
        this.getProducts = this.getProducts.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    getProducts = async() => {
        try {
            const response = await fetch("/api/products");
            const resJson = await response.json();
            this.setState({
                products: resJson
            })
        } catch (err) {
            console.error(err);
        }
    }

    handleDelete = async(e) => {
        try {
            const response = await fetch(`api/products/${e.target.name}`, {
                method: "DELETE",
                headers: {"token": localStorage.getItem("token")}
            })
            const resJson = await response.json();
            console.log(resJson);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount = async () => {
        this.getProducts();
    }

    render() {
        return (
            <div className="container-fluid">
                Products
                {this.props.user.isAdmin === true ? <a className="btn btn-primary mx-3 my-2" href="/products/create">Create a product</a> : null}
                <table className="table table-striped text-left">
                    <thead>
                        <tr className="row">
                            <th className="col-3">Name</th>
                            <th className="col-4">Description</th>
                            <th className="col-1">Quantity</th>
                            <th className="col-1">Cost</th>
                            <th className="col-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(product => {
                            return (
                                <tr key={product._id} className="row">
                                    <td className="col-3">{product.name}</td>
                                    <td className="col-4">{product.description}</td>
                                    <td className="col-1">{product.quantity}</td> 
                                    <td className="col-1">{product.cost}Php</td>
                                    <td className="col-3">
                                        <div className="btn-group text-right d-flex" role="group">
                                            <div className="container ml-auto">
                                                <a className="btn btn-primary mx-1" href={`products/buy/${product._id}`}>Buy</a>
                                                {this.props.user.isAdmin === true ? 
                                                    <Fragment>
                                                        <a className="btn btn-warning mx-1" href={`products/restock/${product._id}`}>Restock</a>
                                                        <button className="btn btn-danger mx-1" name={product._id} onClick={this.handleDelete}>Delete</button>
                                                    </Fragment>
                                                : null}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Products;