const Product = require('../models/product');

// Création d'un produit
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir tous les produits
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Rechercher des produits
exports.searchProducts = async (req, res) => {
    const { query, page = 1, limit = 10 } = req.query;
    try {
        const products = await Product.find({ $text: { $search: query } })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Pagination des produits
exports.paginateProducts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const products = await Product.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};