// const env = import.meta.env.VITE_API_HOST;

// Product services
export async function getProduct(productId) {
  try {
    const response = await fetch(
      "https://nexufy.azurewebsites.net/api/product/" + productId,
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

export async function getAllProducts(){
  try {
    const res = await fetch(
      "https://nexufy.azurewebsites.net/api/products/all",{
        headers:{
          accept:"application/json"
        }
      }
    );
    if(!res.ok){
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  }catch(error){
    console.error("Failed to fetch products:",error);
    throw error;
  }
}

export async function postProduct(newProduct, token) {
  try {
    const response = await fetch(
      "http://nexufy.azurewebsites.net/api/products" ,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(newProduct)
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
}

// Comments services
export async function getComments(productId) {
  try {
    const response = await fetch(
      "http://nexufy.azurewebsites.net/api/rating-comments/product/" + productId,
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
    const response = await fetch("http://nexufy.azurewebsites.net/api/rating-comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error("Error en el envío del comentario");
    }
  } catch (error) {
    console.log("Failed to send Comment ", error);
  }
}

