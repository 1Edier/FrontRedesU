import React, { useState, useEffect } from "react";

function Inicio() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "" });

  // Fetch all products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://backredes.ddnsking.com/productos", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.description) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://backredes.ddnsking.com/productos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre: newProduct.name,
            precio: parseFloat(newProduct.price),
            descripcion: newProduct.description,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setProducts((prevProducts) => [...prevProducts, data.product]);
          setNewProduct({ name: "", price: "", description: "" });
        } else {
          console.error("Error adding product:", data.message);
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };

  const deleteProduct = async (id) => {
    console.log("Eliminando producto con ID:", id);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://backredes.ddnsking.com/productos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("Producto eliminado con éxito");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id_producto !== id)
        );
      } else {
        const data = await response.json();
        console.error("Error al eliminar el producto:", data.message);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
        backgroundColor: "#1e293b",
        color: "#f1f5f9",
      }}
    >
      <header
        style={{
          fontSize: "32px",
          fontWeight: "600",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Gestión de Productos
      </header>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={handleInputChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #64748b",
            width: "200px",
            backgroundColor: "#334155",
            color: "#f1f5f9",
          }}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newProduct.price}
          onChange={handleInputChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #64748b",
            width: "120px",
            backgroundColor: "#334155",
            color: "#f1f5f9",
          }}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={handleInputChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #64748b",
            width: "300px",
            backgroundColor: "#334155",
            color: "#f1f5f9",
          }}
        />
        <button
          onClick={addProduct}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0ea5e9",
            color: "#f1f5f9",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Agregar
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #64748b",
                padding: "12px",
                backgroundColor: "#0f172a",
                color: "#f1f5f9",
                textAlign: "left",
              }}
            >
              Nombre
            </th>
            <th
              style={{
                border: "1px solid #64748b",
                padding: "12px",
                backgroundColor: "#0f172a",
                color: "#f1f5f9",
                textAlign: "left",
              }}
            >
              Precio
            </th>
            <th
              style={{
                border: "1px solid #64748b",
                padding: "12px",
                backgroundColor: "#0f172a",
                color: "#f1f5f9",
                textAlign: "left",
              }}
            >
              Descripción
            </th>
            <th
              style={{
                border: "1px solid #64748b",
                padding: "12px",
                backgroundColor: "#0f172a",
                color: "#f1f5f9",
                textAlign: "center",
              }}
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id_producto}>
              <td
                style={{
                  border: "1px solid #64748b",
                  padding: "12px",
                  backgroundColor: "#1e293b",
                }}
              >
                {product.nombre}
              </td>
              <td
                style={{
                  border: "1px solid #64748b",
                  padding: "12px",
                  backgroundColor: "#1e293b",
                }}
              >
                ${parseFloat(product.precio).toFixed(2)}
              </td>
              <td
                style={{
                  border: "1px solid #64748b",
                  padding: "12px",
                  backgroundColor: "#1e293b",
                }}
              >
                {product.descripcion}
              </td>
              <td
                style={{
                  border: "1px solid #64748b",
                  padding: "12px",
                  backgroundColor: "#1e293b",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => deleteProduct(product.id_producto)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#ef4444",
                    color: "#f1f5f9",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inicio;
