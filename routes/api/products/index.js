const express = require('express');
const router = express.Router();
const Products = require('../../../models/Products');
const mongoose = require('mongoose');
const authorization = require('../../../middlewares/authorization');

// Get all Products
router.get("/", async(req, res) => {
    try {
        const getProducts = await Products.find();
        if(getProducts == null){
            return res.json({ErrorMessage: "Item/s Not Found"});
        }
        return res.json(getProducts);
    } catch (err) {
        console.error(err);
    }
})
// Get a specific Product
router.get("/:id", async(req, res) => {
    try {
        const getProduct = await Products.findOne({_id: req.params.id});
        if(getProduct == null){
            return res.json({ErrorMessage: "Item Not Found"});
        }
        return res.json(getProduct);
    } catch (err) {
        console.error(err);
    }
})

// Add Product
router.post("/", async(req, res) => {
    try {
    const {name, description, quantity, cost} = req.body;
    const product = new Products({
        name: name,
        description: description,
        quantity: quantity,
        cost: cost
    })
    await product.save();
    return res.json({message: "Insertion Successful"});
    } catch (err) {
        console.error(err);
    }
})

// Edit Product
router.put("/edit/:id", authorization, async(req, res) => {
    try {
        const product = await Products.findByIdAndUpdate({_id: req.params.id}, {
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            cost: req.quantity.cost
        })
        return res.json({message: "Successfully Edited the product"});
    } catch (err) {
        console.error(err);
    }
})

// Buy Product
router.patch("/buy/:id", async(req, res) => {
    try {
        const product = await Products.findOne({_id: req.params.id});
        if(req.body.quantity <= 0){
            return(res.json({ErrorMessage: "Select an Amount."}));
        }
        if(product.quantity < req.body.quantity){
            return(res.json({ErrorMessage: "Can't Exceed Limit"}));
        }
        await Products.updateOne({_id: req.params.id}, {
            $inc: { quantity: -req.body.quantity }
        })
        return res.json({message: "Successful Transaction"});
    } catch (err) {
        console.error(err);
    }
})

// Restock Product
router.patch("/restock/:id", authorization, async(req, res) => {
    try {
        if(req.body.quantity <= 0){
            return(res.json({ErrorMessage: "Select an Amount."}));
        }
        console.log(req.body.quantity)
        const product = await Products.updateOne({_id: req.params.id}, {
            $inc: {
                quantity: req.body.quantity
            }
        })
        if(product.nModified === 1){
            console.log("Success")
            return res.json({message: "Successful Transaction"});
        } else {
            return res.json({message: "Nothing Changed"});
        }
    } catch (err) {
        console.error(err);
    }
})

router.delete("/:id", authorization, async(req, res) => {
    try {
        await Products.deleteOne({_id: req.params.id});
        return res.json({message: "Successfully Deleted the item"});
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;
