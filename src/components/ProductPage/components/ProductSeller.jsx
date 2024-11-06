import React, { useContext, useEffect, useState } from "react";
import img from "../../../assets/img/undraw_factory_dy0a-removebg-preview.png";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";
import { ThemeContext } from "../../themes/ThemeContext";
import useLanguage from "../../themes/useLanguage"; // Importar el hook useLanguage
import { getCustomerById } from "../../../api/customerService";

const ProductSeller = ({ customerId }) => {
  const { user } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext);
  const { t } = useLanguage(); // Usar el hook useLanguage para obtener las traducciones

  const [seller, setSeller] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchSeller = async () => {
      try {
        const response = await getCustomerById(customerId, token);
        setSeller(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSeller();
  }, [customerId]);

  return (
    <div
      className={`container rounded border border-dark-subtle border-2 mb-4 p-4 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ height: "auto", position: "relative", overflow: "hidden" }}
    >
      <div
        className={`position-absolute w-100 h-100 top-0 left-0 ${
          darkMode ? "bg-dark" : "bg-light"
        }`}
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          zIndex: -1,
        }}
      />

      <div className="d-flex">
        <div className="d-flex w-100 flex-column justify-content-between">
          <p className={`fw-semibold ${darkMode ? "text-light" : "text-dark"}`}>
            {t.sellerInformation}
          </p>
          {user ? (
            <div className="d-flex flex-column flex-lg-row justify-content-between">
              <div>
                <p
                  className={`fs-3 fw-medium ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  {seller?.name} {seller?.lastname}
                </p>

                <p
                  className={`fw-semibold ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  {t.contactedTimes.replace("{count}", "25")}
                </p>
                <p
                  className={`fw-semibold ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  {t.salesMade.replace("{count}", "20")}
                </p>
                <p
                  className={`fw-semibold ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  {t.shipsNationwide}
                </p>

                <a
                  href=""
                  className={`fw-semibold ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  {t.viewMoreProducts}
                </a>
              </div>
              <img
                src={img}
                style={{ height: "auto" }}
                className="mx-auto d-none d-lg-block"
                alt="Imagen del vendedor"
              />
            </div>
          ) : (
            <div className="d-flex h-100 flex-column justify-content-center">
              <p className={darkMode ? "text-light" : "text-dark"}>
                {t.mustLoginToSeeSellerInfo}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MemoizedFooter = React.memo(ProductSeller);

export default MemoizedFooter;
