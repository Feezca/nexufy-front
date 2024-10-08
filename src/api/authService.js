export async function loginService(formData) {
  try {
    const response = await fetch(
      "https://nexufy.azurewebsites.net/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data.message && data.message.includes("suspended")) {
        throw new Error("Este usuario está suspendido.");
      }
      throw new Error(data.message || "Error al loguearse");
    }

    return data;
  } catch (error) {
    console.log("Failed connection to auth login", error);
    throw error;
  }
}

export async function registerService(formData) {
  try {
    const response = await fetch(
      "https://nexufy.azurewebsites.net/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    console.log("Failed connection to auth register", error);
    throw error;
  }
}
