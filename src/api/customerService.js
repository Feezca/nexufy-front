// Get products by customer service
export async function getProductsByCustomerId(customerId, token) {
  try {
    const response = await fetch(
      `https://nexufy-2.onrender.com/api/customer/${customerId}/products`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const text = await response.text();
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function getCustomerById(customerId, token) {
  try {
    const response = await fetch(
      `https://nexufy-2.onrender.com/api/customer/${customerId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch customer:", error);
    throw error;
  }
}

export async function getAllCustomers(token) {
  try {
    const response = await fetch(
      "https://nexufy-2.onrender.com/api/customer/all",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw error;
  }
}

export async function updateCustomerProfile(customerId, token, profileData) {
  try {
    const response = await fetch(
      `https://nexufy-2.onrender.com/api/customer/profile/${customerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

