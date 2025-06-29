import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProductManager = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", quantity: "", price: "" });
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/products/");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateInputs = () => {
        if (!form.name || !form.quantity || !form.price) {
            Swal.fire("All fields are required", "", "warning");
            return false;
        }
        if (Number(form.quantity) < 0 || Number(form.price) < 0) {
            Swal.fire("Quantity and Price cannot be negative", "", "error");
            return false;
        }
        const duplicate = products.find(
            (p) => p.name.trim().toLowerCase() === form.name.trim().toLowerCase()
        );
        if (duplicate) {
            Swal.fire("Product name already exists", "", "error");
            return false;
        }
        return true;
    };


    const addProduct = async () => {
        if (!validateInputs()) return;

        try {
            const res = await fetch("http://localhost:5000/api/products/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    quantity: Number(form.quantity),
                    price: Number(form.price),
                }),
            });

            if (res.ok) {
                setForm({ name: "", quantity: "", price: "" });
                fetchProducts();
                await Swal.fire("Product added", "", "success");
            } else {
                await Swal.fire("Failed to add product", "", "error");
            }
        } catch (err) {
            console.error("Add error:", err);
        }
    };

    const deleteProduct = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This product will be deleted",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    fetchProducts();
                    await Swal.fire("Deleted!", "", "success");
                } else {
                    await Swal.fire("Failed to delete", "", "error");
                }
            } catch (err) {
                console.error("Delete error:", err);
            }
        }
    };

    const editProduct = async (product) => {
        const { value: formValues } = await Swal.fire({
            title: "Edit Product",
            html:
                `<input id="swal-name" class="swal2-input" placeholder="Product Name" value="${product.name}">` +
                `<input id="swal-quantity" class="swal2-input" type="number" min="0" placeholder="Quantity" value="${product.quantity}">` +
                `<input id="swal-price" class="swal2-input" type="number" min="0" placeholder="Price" value="${product.price}">`,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById("swal-name").value;
                const quantity = Number(document.getElementById("swal-quantity").value);
                const price = Number(document.getElementById("swal-price").value);

                if (!name || quantity < 0 || price < 0) {
                    Swal.showValidationMessage("Invalid input (no negative numbers)");
                    return;
                }
                return { name, quantity, price };
            },
        });

        if (formValues) {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${product.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formValues),
                });
                if (res.ok) {
                    fetchProducts();
                    await Swal.fire("Product updated", "", "success");
                } else {
                    await Swal.fire("Failed to update", "", "error");
                }
            } catch (err) {
                console.error("Update error:", err);
            }
        }
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure you want to logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Logout",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            navigate("/");
            await Swal.fire("Logged out", "", "success");
        }
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalInventoryValue = filteredProducts.reduce(
        (acc, p) => acc + Number(p.price) * Number(p.quantity),
        0
    );

    return (
        <div style={styles.container}>
            <div style={styles.headerRow}>
                <h2 style={styles.heading}>Product Management</h2>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>

            <div style={styles.card}>
                <h3 style={styles.subHeading}>Add New Product</h3>
                <div style={styles.inputRow}>
                    <div style={styles.inputBox}>
                        <label>Product Name</label>
                        <input
                            style={styles.input}
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            placeholder="Enter product name"
                        />
                    </div>
                    <div style={styles.inputBox}>
                        <label>Quantity</label>
                        <input
                            style={styles.input}
                            name="quantity"
                            value={form.quantity}
                            onChange={handleInputChange}
                            type="number"
                            min="0"
                            placeholder="Enter quantity"
                        />
                    </div>
                    <div style={styles.inputBox}>
                        <label>Price (LKR)</label>
                        <input
                            style={styles.input}
                            name="price"
                            value={form.price}
                            onChange={handleInputChange}
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Enter price"
                        />
                    </div>
                    <button style={styles.addButton} onClick={addProduct}>
                        + Add Product
                    </button>
                </div>
            </div>

            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    marginBottom: "10px",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    width: "100%",
                    maxWidth: "300px",
                }}
            />


            <div style={styles.card}>
                <div style={styles.tableHeader}>
                    <h3 style={styles.subHeading}>Products List</h3>
                    <p style={{ fontSize: "14px" }}>
                        Total: {filteredProducts.length} product
                        {filteredProducts.length !== 1 ? "s" : ""}
                    </p>
                </div>

                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th}>PRODUCT NAME</th>
                            <th style={styles.th}>QUANTITY</th>
                            <th style={styles.th}>PRICE</th>
                            <th style={styles.th}>TOTAL VALUE</th>
                            <th style={styles.th}>ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredProducts.map((p, idx) => {
                            const price = Number(p.price);
                            const quantity = Number(p.quantity);
                            const total = price * quantity;

                            return (
                                <tr key={idx}>
                                    <td style={styles.td}>{p.name}</td>
                                    <td style={styles.td}>{quantity}</td>
                                    <td style={styles.td}>LKR {price.toFixed(2)}</td>
                                    <td style={styles.tdBold}>LKR {total.toFixed(2)}</td>
                                    <td style={styles.td}>
                                        <button style={styles.iconButton} onClick={() => editProduct(p)}>✏️</button>
                                        <button style={styles.iconButton} onClick={() => deleteProduct(p.id)}>🗑️</button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                <div style={styles.footerRow}>
                    <span>Showing {filteredProducts.length} of {products.length} products</span>
                    <strong>Total Inventory Value: LKR {totalInventoryValue.toFixed(2)}</strong>
                </div>
            </div>

            <footer style={styles.footer}>
                <span>© 2025 Product Management System</span>
                <div>
                    <a href="#" style={styles.footerLink}>Help</a> | <a href="#" style={styles.footerLink}>Settings</a>
                </div>
            </footer>
        </div>
    );
};

export default ProductManager;

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9fafb",
    },
    headerRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
        position: "relative",
    },

    heading: {
        fontSize: "22px",
        fontWeight: "bold",
    },
    logoutButton: {
        position: "absolute",
        right: 0,
        backgroundColor: "#ef4444",
        color: "#fff",
        padding: "8px 14px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
    },

    subHeading: {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "15px",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    inputRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "flex-end",
    },
    inputBox: {
        display: "flex",
        flexDirection: "column",
        flex: "1",
        minWidth: "200px",
    },
    input: {
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        marginTop: "5px",
    },
    addButton: {
        backgroundColor: "#0f172a",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        marginLeft: "auto",
    },
    tableHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
    },
    tableContainer: {
        maxHeight: "300px",
        overflowY: "auto",
        border: "1px solid #e2e8f0",
        borderRadius: "6px",
        marginBottom: "10px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        textAlign: "left",
        padding: "10px",
        backgroundColor: "#f1f5f9",
        fontSize: "13px",
        color: "#334155",
        fontWeight: "bold",
        position: "sticky",
        top: 0,
        zIndex: 1,
    },
    td: {
        padding: "10px",
        borderBottom: "1px solid #e2e8f0",
    },
    tdBold: {
        padding: "10px",
        borderBottom: "1px solid #e2e8f0",
        fontWeight: "bold",
    },
    iconButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        marginRight: "8px",
    },
    footerRow: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        fontSize: "14px",
    },
    footer: {
        paddingTop: "10px",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        fontSize: "13px",
        color: "#64748b",
    },
    footerLink: {
        color: "#0f172a",
        textDecoration: "none",
        marginLeft: "10px",
    },
};
