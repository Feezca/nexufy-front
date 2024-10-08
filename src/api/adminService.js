export async function registerAdminUser(formData, token) {
  try {
    const response = await fetch(
      "http://nexufy.azurewebsites.net/api/auth/register-admin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Error al registrarse");
    }
    return {};
  } catch (error) {
    console.log("Error al registrar usuario por admin", error);
    throw error;
  }
}

export async function suspendCustomer(id, days, token) {
  try {
    const response = await fetch(
      `http://nexufy.azurewebsites.net/api/superadmin/customers/suspend/${id}?days=${days}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Error al suspender al usuario");
    }
  } catch (error) {
    console.log("Error al suspender usuario", error);
    throw error;
  }
}

export async function unsuspendCustomer(id, token) {
  try {
    const response = await fetch(
      `http://nexufy.azurewebsites.net/api/superadmin/customers/unsuspend/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        errorData || "Error al levantar la suspensión del cliente"
      );
    }
    return {};
  } catch (error) {
    console.log("Error al levantar la suspensión del cliente", error);
    throw error;
  }
}

export async function deleteCustomer(id, token) {
  try {
    const response = await fetch(
      `http://nexufy.azurewebsites.net/api/superadmin/customers/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(id),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Error al eliminar el cliente");
    }
    return {};
  } catch (error) {
    console.log("Error al eliminar el cliente", error);
    throw error;
  }
}
