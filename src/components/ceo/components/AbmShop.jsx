import { useContext, useEffect, useState } from "react";
import { Button, Pagination, Spinner } from "react-bootstrap";
import { Navigate, useOutletContext, useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../../api/productService";
import { ThemeContext } from "../../themes/ThemeContext";
import useLanguage from "../../themes/useLanguage";
import CustomTable from "./CustomTable";
import SearchBar from "./SearchBar";
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa"; 
import Swal from "sweetalert2";
import useSearch from "../../../hooks/useSearch";

const AbmShop = () => {
  const { user } = useOutletContext();
  const { darkMode } = useContext(ThemeContext);
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery, setSearchQuery, filteredSearch, error } = useSearch(
    "",
    productos,
    null,
    "products"
  );
  const [activeDropdown, setActiveDropdown] = useState(null); // Estado para controlar el menú activo

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const products = await getAllProducts();
        setProductos(products);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const handleEdit = (id) => {
    const editPath = user.roles.includes("ROLE_SUPERADMIN")
      ? `/ceo/edit-product/${id}`
      : `/edit-product/${id}`;
    navigate(editPath);
  };

  const confirmDeleteProduct = (id) => {
    Swal.fire({
      title: t.confirmDeleteTitle,
      text: t.confirmDeleteMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t.delete,
      cancelButtonText: t.confirmDeleteCancelButton,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleConfirmDelete(id);
        Swal.fire(t.deleted, t.productDeletedMessage, "success");
      }
    });
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProductos((prevProductos) =>
        prevProductos.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDropdown = (id) => {
    console.log("Toggling dropdown for id:", id); // Verifica el id
    setActiveDropdown((prev) => (prev === id ? null : id));
  };
  

  const productColumns = [
    {
      header: t.productName,
      accessor: "name",
      render: (item) => item.name,
    },
    {
      header: t.price,
      accessor: "price",
      render: (item) => `$${item.price}`,
    },
    {
      header: t.category,
      accessor: "category",
      render: (item) => item.category,
    },
    {
      header: "",
      accessor: "actions",
      render: (item) => (
        <div className="btn-options" style={{ position: "relative", display: "inline-block" }}>
          <i 
          className="bi bi-three-dots"
            onClick={() => toggleDropdown(item.id)}
          />
          {activeDropdown === item.id && (
            <div
              className={`dropdown-menu ${darkMode ? "bg-dark text-light" : "bg-light"}`}
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                
                borderRadius: "4px",
              }}
            >
              <button
                className="dropdown-item"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                onClick={() => handleEdit(item.id)}
              >{t.edit}
              </button>
              <button
                className="dropdown-item"
                style={{ display: "flex", alignItems: "center", color:"red", gap: "0.5rem", }}
                onClick={() => confirmDeleteProduct(item.id)}
              > {t.delete}
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="grow" />
    </div>
  );
  return (
    <div
      className={`container shadow p-4 mb-3 mx-2 ${
        darkMode ? "bg-dark text-light" : "bg-light-subtle"
      }`}
      style={{ borderRadius: "20px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="fs-4 w-50 fw-semibold">{t.products}</p>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
        />
      </div>
      <CustomTable columns={productColumns} data={filteredSearch} />
    </div>
  );
};

export default AbmShop;
