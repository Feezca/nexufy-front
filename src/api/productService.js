// Product services
export async function getProduct(productId) {
  try {
    const response = await fetch(
      "https://nexufy-2.onrender.com/api/products/" + productId, // Actualizado para /api/products/
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const res = await fetch(
      "https://nexufy-2.onrender.com/api/products", // Actualizado para /api/products si /all no existe
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function postProduct(newProduct, token) {
  try {
    const response = await fetch(
      "https://nexufy-2.onrender.com/api/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json(); // Devuelve la respuesta si necesitas procesarla
  } catch (error) {
    console.error("Failed to post product:", error);
    throw error;
  }
}

// Comments services
export async function getComments(productId) {
  try {
    const response = await fetch(
      "https://nexufy-2.onrender.com/api/rating-comments/product/" + productId, // Verificar que el endpoint en el backend es correcto
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    throw error;
  }
}

export async function postComments(commentData) {
  try {
    const response = await fetch(
      "https://nexufy-2.onrender.com/api/rating-comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }
    );

    if (!response.ok) {
      throw new Error("Error en el envío del comentario");
    }
    return await response.json(); // Devuelve la respuesta si necesitas procesarla
  } catch (error) {
    console.log("Failed to send Comment ", error);
    throw error;
  }
}

