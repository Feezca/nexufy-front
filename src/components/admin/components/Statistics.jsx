import React, { useState, useEffect, useMemo, useContext } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import {
  fetchStats,
  downloadCustomerReport,
  downloadProductReport,
} from "../../../api/statisticService";
import useLanguage from "../../themes/useLanguage";
import { ThemeContext } from "../../themes/ThemeContext";

// Importar herramientas para tooltips
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";

const Statistics = () => {
  const { darkMode } = useContext(ThemeContext);
  const { t } = useLanguage();

  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [customerRegistrationsByMonth, setCustomerRegistrationsByMonth] =
    useState([]);
  const [productsByMonth, setProductsByMonth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    tooltipOpen: tooltipOpenCustomers,
    tooltipLeft: tooltipLeftCustomers,
    tooltipTop: tooltipTopCustomers,
    tooltipData: tooltipDataCustomers,
    showTooltip: showTooltipCustomers,
    hideTooltip: hideTooltipCustomers,
  } = useTooltip();

  const {
    tooltipOpen: tooltipOpenProducts,
    tooltipLeft: tooltipLeftProducts,
    tooltipTop: tooltipTopProducts,
    tooltipData: tooltipDataProducts,
    showTooltip: showTooltipProducts,
    hideTooltip: hideTooltipProducts,
  } = useTooltip();

  const monthMap = useMemo(
    () => ({
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
    }),
    [t]
  );

  const defaultMonths = useMemo(
    () => [
      t.months.AUGUST,
      t.months.SEPTEMBER,
      t.months.OCTOBER,
      t.months.NOVEMBER,
    ],
    [t]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const data = await fetchStats(token);
        setTotalCustomers(data.totalCustomers || 0);
        setTotalProducts(data.totalProducts || 0);

        const filledCustomerData = defaultMonths.map(
          (month) =>
            data.customerRegistrationsByMonth?.[
              Object.keys(monthMap).find((key) => monthMap[key] === month)
            ] || 0
        );
        const filledProductData = defaultMonths.map(
          (month) =>
            data.productsByMonth?.[
              Object.keys(monthMap).find((key) => monthMap[key] === month)
            ] || 0
        );

        setCustomerRegistrationsByMonth(filledCustomerData);
        setProductsByMonth(filledProductData);
      } catch (error) {
        setError(error.message || t.errorFetchingData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [monthMap, defaultMonths, t]);

  const handleDownloadReport = async (type) => {
    try {
      const token = localStorage.getItem("accessToken");
      let blob;
      let filename;

      if (type === "customer") {
        blob = await downloadCustomerReport(token);
        filename = "customer_report.pdf";
      } else if (type === "product") {
        blob = await downloadProductReport(token);
        filename = "product_report.pdf";
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      setError(error.message || t.errorDownloadingReport);
    }
  };

  const margin = { top: 20, right: 20, bottom: 40, left: 60 };
  const xMax = 300;
  const yMax = 200;
  const width = xMax + margin.left + margin.right;
  const height = yMax + margin.top + margin.bottom;

  const maxCustomers = useMemo(
    () => Math.max(...customerRegistrationsByMonth, 1),
    [customerRegistrationsByMonth]
  );
  const maxProducts = useMemo(
    () => Math.max(...productsByMonth, 1),
    [productsByMonth]
  );

  const generateTicks = (maxValue) => {
    const ticks = [];
    for (let i = 1; i <= maxValue; i++) {
      ticks.push(i);
    }
    return ticks;
  };

  const xScale = useMemo(
    () =>
      scaleBand({
        domain: defaultMonths,
        range: [0, xMax],
        padding: 0.4,
      }),
    [defaultMonths, xMax]
  );

  const yScaleCustomer = useMemo(
    () =>
      scaleLinear({
        domain: [0, maxCustomers],
        range: [yMax, 0],
      }),
    [maxCustomers, yMax]
  );

  const yScaleProduct = useMemo(
    () =>
      scaleLinear({
        domain: [0, maxProducts],
        range: [yMax, 0],
      }),
    [maxProducts, yMax]
  );

  if (loading) return <p>{t.loadingStatistics}</p>;
  if (error)
    return (
      <div
        className={`p-3 mb-3 rounded ${
          darkMode ? "bg-danger-dark text-white" : "bg-danger text-white"
        }`}
      >
        <p>{`${t.error}: ${error}`}</p>
        <button
          onClick={() => window.location.reload()}
          className={`btn btn-${darkMode ? "light" : "secondary"} btn-sm`}
        >
          {t.retry}
        </button>
      </div>
    );

  return (
    <div
      className={`container mx-3 h-100 mb-0 ${
        darkMode ? "bg-dark" : "bg-light"
      }`}
    >
      <h2
        className={`fs-4 mb-4 ${
          darkMode ? "text-white" : "text-body-tertiary"
        }`}
      >
        {t.statistics}
      </h2>

      <div
        className="w-100 p-3 py-2 d-flex justify-content-around bg-dark-subtle rounded mb-4"
      >
        <div className="d-flex flex-column w-50 align-items-start ms-2">
          <p
            className="text-body-tertiary fw-semibold"
          >
            {t.totalRegisteredCustomers}
          </p>
          <p className="fs-1 text-dark">{totalCustomers}</p>
        </div>
        <div className="d-flex w-50 flex-column align-items-start">
          <p
             className="text-body-tertiary fw-semibold"
          >
            {t.totalPublishedProducts}
          </p>
          <p className="fs-1 text-dark">{totalProducts}</p>
        </div>
      </div>

      <div className="w-100 d-flex flex-column flex-md-row">
        <div
          className={`w-100 ${
            darkMode ? "bg-dark text-white" : "bg-light text-dark"
          } rounded p-3 me-md-1 mb-3 mb-md-0`}
          style={{ position: "relative" }}
        >
          <h3
            className={`fs-4 mb-3 ${
              darkMode ? "text-white" : "text-body-tertiary"
            }`}
          >
            {t.customersRegisteredPerMonth}
          </h3>
          <svg width={width} height={height}>
            <Group top={margin.top} left={margin.left}>
              {customerRegistrationsByMonth.map((d, i) => (
                <React.Fragment key={`bar-customer-${i}`}>
                  <Bar
                    x={xScale(defaultMonths[i])}
                    y={yScaleCustomer(d)}
                    width={xScale.bandwidth()}
                    height={yMax - yScaleCustomer(d)}
                    fill={
                      darkMode
                        ? "rgba(75, 192, 192, 0.8)"
                        : "rgba(75, 192, 192, 0.6)"
                    }
                    onMouseMove={(event) => {
                      const coords = localPoint(
                        event.target.ownerSVGElement,
                        event
                      );
                      const tooltipLeft = coords.x + margin.left;
                      const tooltipTop = coords.y + margin.top;
                      showTooltipCustomers({
                        tooltipData: { month: defaultMonths[i], value: d },
                        tooltipLeft,
                        tooltipTop,
                      });
                    }}
                    onMouseLeave={() => {
                      hideTooltipCustomers();
                    }}
                  />

                  <Text
                    x={xScale(defaultMonths[i]) + xScale.bandwidth() / 2}
                    y={yScaleCustomer(d) + 15}
                    fill={darkMode ? "white" : "black"}
                    fontSize={12}
                    textAnchor="middle"
                  >
                    {d}
                  </Text>
                </React.Fragment>
              ))}
              <AxisBottom
                scale={xScale}
                top={yMax}
                label={t.monthsLabel}
                tickLabelProps={() => ({
                  fill: darkMode ? "#FFFFFF" : "#333333",
                  fontSize: 12,
                  textAnchor: "middle",
                })}
              />
              <AxisLeft
                scale={yScaleCustomer}
                label={t.clientsRegistered}
                tickValues={generateTicks(maxCustomers)}
                tickLabelProps={() => ({
                  fill: darkMode ? "#FFFFFF" : "#333333",
                  fontSize: 12,
                  textAnchor: "end",
                })}
              />
            </Group>
          </svg>
          {/* Tooltip para Clientes */}
          {tooltipOpenCustomers && (
            <TooltipWithBounds
              top={tooltipTopCustomers}
              left={tooltipLeftCustomers}
              style={{
                ...defaultStyles,
                backgroundColor: "rgba(0,0,0,0.9)",
                color: "white",
              }}
            >
              <div>
                <strong>{tooltipDataCustomers.month}</strong>
              </div>
              <div>
                {t.clientsRegistered}: {tooltipDataCustomers.value}
              </div>
            </TooltipWithBounds>
          )}
          <div className="d-flex justify-content-end mt-2">
            <button
              className={`btn btn-outline-${
                darkMode ? "light" : "secondary"
              } btn-sm`}
              onClick={() => handleDownloadReport("customer")}
            >
              {t.downloadCustomerReport}
            </button>
          </div>
        </div>

        <div
          className={`w-100 ${
            darkMode ? "bg-dark text-white" : "bg-light text-dark"
          } rounded p-3`}
          style={{ position: "relative" }}
        >
          <h3
            className={`fs-4 mb-3 ${
              darkMode ? "text-white" : "text-body-tertiary"
            }`}
          >
            {t.productsPublishedPerMonth}
          </h3>
          <svg width={width} height={height}>
            <Group top={margin.top} left={margin.left}>
              {productsByMonth.map((d, i) => (
                <React.Fragment key={`bar-product-${i}`}>
                  <Bar
                    x={xScale(defaultMonths[i])}
                    y={yScaleProduct(d)}
                    width={xScale.bandwidth()}
                    height={yMax - yScaleProduct(d)}
                    fill={
                      darkMode
                        ? "rgba(153, 102, 255, 0.8)"
                        : "rgba(153, 102, 255, 0.6)"
                    }
                    onMouseMove={(event) => {
                      const coords = localPoint(
                        event.target.ownerSVGElement,
                        event
                      );
                      const tooltipLeft = coords.x + margin.left;
                      const tooltipTop = coords.y + margin.top;
                      showTooltipProducts({
                        tooltipData: { month: defaultMonths[i], value: d },
                        tooltipLeft,
                        tooltipTop,
                      });
                    }}
                    onMouseLeave={() => {
                      hideTooltipProducts();
                    }}
                  />

                  <Text
                    x={xScale(defaultMonths[i]) + xScale.bandwidth() / 2}
                    y={yScaleProduct(d) + 15}
                    fill={darkMode ? "white" : "black"}
                    fontSize={12}
                    textAnchor="middle"
                  >
                    {d}
                  </Text>
                </React.Fragment>
              ))}
              <AxisBottom
                scale={xScale}
                top={yMax}
                label={t.monthsLabel}
                tickLabelProps={() => ({
                  fill: darkMode ? "#FFFFFF" : "#333333",
                  fontSize: 12,
                  textAnchor: "middle",
                })}
              />
              <AxisLeft
                scale={yScaleProduct}
                label={t.productsPublished}
                tickValues={generateTicks(maxProducts)}
                tickLabelProps={() => ({
                  fill: darkMode ? "#FFFFFF" : "#333333",
                  fontSize: 12,
                  textAnchor: "end",
                })}
              />
            </Group>
          </svg>

          {tooltipOpenProducts && (
            <TooltipWithBounds
              top={tooltipTopProducts}
              left={tooltipLeftProducts}
              style={{
                ...defaultStyles,
                backgroundColor: "rgba(0,0,0,0.9)",
                color: "white",
              }}
            >
              <div>
                <strong>{tooltipDataProducts.month}</strong>
              </div>
              <div>
                {t.productsPublished}: {tooltipDataProducts.value}
              </div>
            </TooltipWithBounds>
          )}
          <div className="d-flex justify-content-end mt-2">
            <button
              className={`btn btn-outline-${
                darkMode ? "light" : "secondary"
              } btn-sm`}
              onClick={() => handleDownloadReport("product")}
            >
              {t.downloadProductReport}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
