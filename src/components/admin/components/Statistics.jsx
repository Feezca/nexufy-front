import React, { useContext, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  fetchStats,
  downloadCustomerReport,
  downloadProductReport,
} from "../../../api/statisticService";
import "chart.js/auto";
import { LanguageContext } from "../../themes/LanguageContext";
import translations from "../../themes/translations";

const Statistics = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [customerRegistrationsByMonth, setCustomerRegistrationsByMonth] =
    useState({});
  const [productsByMonth, setProductsByMonth] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  // Mapeo de los meses en inglés al idioma seleccionado
  const monthMap = {
    JANUARY: t.months.JANUARY,
    FEBRUARY: t.months.FEBRUARY,
    MARCH: t.months.MARCH,
    APRIL: t.months.APRIL,
    MAY: t.months.MAY,
    JUNE: t.months.JUNE,
    JULY: t.months.JULY,
    AUGUST: t.months.AUGUST,
    SEPTEMBER: t.months.SEPTEMBER,
    OCTOBER: t.months.OCTOBER,
    NOVEMBER: t.months.NOVEMBER,
    DECEMBER: t.months.DECEMBER,
  };

  const defaultMonths = [
    t.months.AUGUST,
    t.months.SEPTEMBER,
    t.months.OCTOBER,
    t.months.NOVEMBER,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const data = await fetchStats(token);
        console.log("Datos recibidos:", data); // Verifica la estructura de los datos

        setTotalCustomers(data.totalCustomers || 0);
        setTotalProducts(data.totalProducts || 0);

        // Mapea los meses de los registros de clientes
        const filledCustomerData = defaultMonths.map(
          (month) =>
            data.customerRegistrationsByMonth?.[
              Object.keys(monthMap).find((key) => monthMap[key] === month)
            ] || 0
        );
        // Mapea los meses de los registros de productos
        const filledProductData = defaultMonths.map(
          (month) =>
            data.productsByMonth?.[
              Object.keys(monthMap).find((key) => monthMap[key] === month)
            ] || 0
        );

        setCustomerRegistrationsByMonth(filledCustomerData);
        setProductsByMonth(filledProductData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadCustomerReport = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const blob = await downloadCustomerReport(token);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "customer_report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDownloadProductReport = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const blob = await downloadProductReport(token);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "product_report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      setError(error.message);
    }
  };

  const customerData = {
    labels: defaultMonths, // Usamos los meses por defecto en el idioma seleccionado
    datasets: [
      {
        label: t.clientsRegistered,
        data: customerRegistrationsByMonth,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const productData = {
    labels: defaultMonths, // Usamos los meses por defecto en el idioma seleccionado
    datasets: [
      {
        label: t.productsPublished,
        data: productsByMonth,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  if (loading) {
    return <p>{t.loadingStatistics}</p>;
  }

  if (error) {
    return (
      <div>
        <p>{`${t.error}: ${error}`}</p>
        <button onClick={() => window.location.reload()}>{t.retry}</button>
      </div>
    );
  }

  // Opciones para el gráfico de clientes
  const customerOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: t.monthsLabel,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
        title: {
          display: true,
          text: t.clientsRegistered,
        },
        min: 0,
        max: Math.max(...customerRegistrationsByMonth, 5),
      },
    },
    barThickness: 40,
    responsive: true,
  };

  // Opciones para el gráfico de productos
  const productOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: t.monthsLabel,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
        title: {
          display: true,
          text: t.productsPublished,
        },
        min: 0,
        max: Math.max(...productsByMonth, 5),
      },
    },
    barThickness: 40,
    responsive: true,
  };

  return (
    <div className="container mx-3 h-100 mb-0">
      <h2 className="text-body-tertiary fs-4">{t.statistics}</h2>
      <div className="w-100  p-3 py-2 d-flex justify-content-around bg-dark-subtle text-dark-emphasis rounded">
        <div className="d-flex flex-column w-50 align-items-start ms-2">
          <p className="fw-semibold text-body-tertiary">
            {t.totalRegisteredCustomers}
          </p>
          <p className="fs-1">{totalCustomers}</p>
        </div>
        <div className="d-flex w-50 flex-column align-items-start">
          <p className="fw-semibold text-body-tertiary">
            {t.totalPublishedProducts}
          </p>
          <p className="fs-1">{totalProducts}</p>
        </div>
      </div>
      <div className=" w-100 mt-2 d-flex">
        <div className=" w-50 bg-light rounded p-3 me-1">
          <h3 className="fs-4 text-body-tertiary">
            {t.customersRegisteredPerMonth}
          </h3>
          <div className="w-100 h-100 pe-4">
            <Bar data={customerData} options={customerOptions} />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleDownloadCustomerReport}
              >
                {t.downloadCustomerReport}
              </button>
            </div>
          </div>
        </div>
        <div className="w-50 bg-light rounded p-3">
          <h3 className="fs-4 text-body-tertiary">
            {t.productsPublishedPerMonth}
          </h3>
          <div className="w-100 h-100">
            <Bar data={productData} options={productOptions} />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-secondary btn-sm "
                onClick={handleDownloadProductReport}
              >
                {t.downloadProductReport}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
