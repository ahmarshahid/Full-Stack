import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Products.css'; // Include custom CSS file for extra styling

const Products = ({ user, setUser }) => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
    });
    const [error, setError] = useState('');
    const [editProduct, setEditProduct] = useState(null);
    const navigate = useNavigate();

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
            } catch (error) {
                setError('Error fetching products.');
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Handle Create Product
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/products', newProduct);
            setProducts([...products, response.data]);
            setNewProduct({
                name: '',
                description: '',
                price: '',
                category: '',
            });
        } catch (error) {
            setError('Error creating product.');
            console.error('Error creating product:', error);
        }
    };

    // Handle Update Product
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/products/${editProduct._id}`, editProduct);
            const updatedProducts = products.map((product) =>
                product._id === editProduct._id ? response.data : product
            );
            setProducts(updatedProducts);
            setEditProduct(null); // Reset edit form
        } catch (error) {
            setError('Error updating product.');
            console.error('Error updating product:', error);
        }
    };

    // Handle Delete Product
    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            setProducts(products.filter((product) => product._id !== productId));
        } catch (error) {
            setError('Error deleting product.');
            console.error('Error deleting product:', error);
        }
    };

    // Handle Input Change for Create/Update
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editProduct) {
            setEditProduct((prevState) => ({ ...prevState, [name]: value }));
        } else {
            setNewProduct((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    // Handle Logout
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/signin');
    };

    return (
        <Container className="mt-5 bg-dark text-light p-4 rounded">
            <h2 className="text-center mb-4" style={{ color: 'white' }}>Manage Your Products</h2>

            {/* Logout Button */}
            <Button variant="danger" onClick={handleLogout} className="mb-4 float-end rounded-3">
                Signout
            </Button>

            {/* Error Message */}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {/* Product Create Form */}
            <div className="form-section p-4 mb-4 shadow-sm rounded bg-secondary">
                <h3 className="mb-3" >Add a New Product</h3>
                <Form onSubmit={handleCreateProduct}>
                    <Form.Group controlId="productName" className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            placeholder="Enter product name"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="productDescription" className="mb-3">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            placeholder="Enter product description"
                            required
                        />
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="productPrice" className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    placeholder="Enter price"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="productCategory" className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="category"
                                    value={newProduct.category}
                                    onChange={handleInputChange}
                                    placeholder="Enter category"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit" variant="success" className="w-100">
                        Add Product
                    </Button>
                </Form>
            </div>

            {/* Products List */}
            <h3 className="mt-4 mb-3" style={{ color: 'white' }}>Product List</h3>
            <Row>
                {products.length ? (
                    products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
                            <Card className="h-100 shadow-sm bg-secondary text-light">
                                <Card.Body>
                                    <Card.Title className="product-title" style={{ color: 'black' }}>
                                        {product.name}
                                    </Card.Title>
                                    <Card.Text style={{ color: 'black' }}>
                                        {product.description}
                                    </Card.Text>
                                    <Card.Text className="fw-bold" style={{ color: '#ffd700' }}>
                                        Price: ${product.price}
                                    </Card.Text>
                                    <Card.Text className="text-muted" style={{ color: '#d3d3d3' }}>
                                        Category: {product.category}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button variant="warning" onClick={() => setEditProduct(product)}>
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteProduct(product._id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-muted">No products available.</p>
                )}
            </Row>

            {/* Edit Product Form */}
            {editProduct && (
                <div className="form-section p-4 mt-4 shadow-sm rounded bg-secondary">
                    <h3>Edit Product</h3>
                    <Form onSubmit={handleUpdateProduct}>
                        <Form.Group controlId="editProductName" className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editProduct.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="editProductDescription" className="mb-3">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={editProduct.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="editProductPrice" className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={editProduct.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="editProductCategory" className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="category"
                                        value={editProduct.category}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit" variant="primary" className="w-100">
                            Update Product
                        </Button>
                    </Form>
                </div>
            )}
        </Container>
    );
};

export default Products;
