export async function registerByAdminService (formData)  {
    try {
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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