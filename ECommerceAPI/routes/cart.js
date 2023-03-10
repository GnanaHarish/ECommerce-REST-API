const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const updatedCart = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedCart);
    }
    catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted");
    }
    catch (err) {
        res.status(500).json(err);
    }
})


// //GET A Product
// router.get("/find/:id", async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         res.status(200).json(product);
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// })

//GET ALL Product
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    }
    catch (err) {
        res.status(500).json(500);
    }
})

module.exports = router

