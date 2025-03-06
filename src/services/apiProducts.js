import axios from "axios";
import { calculateNetPrice } from "../utils/helpers";

const ERP_API_TOKEN = import.meta.env.VITE_ERP_API_TOKEN;
const ERP_API_URL = import.meta.env.VITE_ERP_API_URL;

export async function getProductsLocal() {
  try {
    const res = await axios.get(`http://localhost:5002/products`);

    console.log(res.data);

    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getProducts(
  page = 1,
  prodName,
  prodCode,
  dataPerPage = 50,
  columnVisibility,
) {
  const API_URL =
    !prodName && !prodCode
      ? `${ERP_API_URL}/Product/GetAll?page=${page}&limit=${dataPerPage}&typy=1`
      : `${ERP_API_URL}/Product/GetAll?page=${page}&limit=${dataPerPage}&typy=1` +
        (prodCode ? `&kodLike=${prodCode}` : "") +
        (prodName ? `&nazwaLike=${prodName}` : "");

  console.log(API_URL);

  try {
    const res = await axios.get(`http://${API_URL}`, {
      headers: {
        Authorization: `Bearer ${ERP_API_TOKEN}`,
      },
    });

    const filteredResults = res.data
      .filter((el) => el && typeof el === "object")
      .map((el) => {
        const filteredItem = Object.keys(el)
          .filter((key) => columnVisibility?.[key])
          .reduce((acc, key) => {
            acc[key] = el[key];
            return acc;
          }, {});

        filteredItem.twr_GIDNumer = el?.twr_GIDNumer ?? "N/A";

        return filteredItem;
      });

    return filteredResults;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getProductsPrices(productIds, columnVisibility) {
  if (!productIds || productIds.length === 0) return {};

  try {
    const priceMap = {};
    const chunkSize = 20;
    const chunks = [];
    for (let i = 0; i < productIds.length; i += chunkSize) {
      chunks.push(productIds.slice(i, i + chunkSize));
    }

    for (const chunk of chunks) {
      const promises = chunk.map(async (id) => {
        try {
          const res = await axios.get(
            `http://${ERP_API_URL}/Pricelist/GetForProduct/${id}`,
            { headers: { Authorization: `Bearer ${ERP_API_TOKEN}` } },
          );
          const detalicPrice = res.data.find(
            (item) => item?.tcN_Nazwa?.trim() === "DETALICZNA",
          );
          priceMap[id] = detalicPrice
            ? calculateNetPrice(detalicPrice.twC_Wartosc).replace(".", ",") +
              " PLN"
            : "N/A";
        } catch (err) {
          console.error(`Error fetching price for ${id}:`, err);
          priceMap[id] = "Error";
        }
      });
      await Promise.all(promises);
    }

    return priceMap;
  } catch (err) {
    console.error("Error fetching prices in batch:", err);
    throw err;
  }
}

export async function getProductsQuantities(productIds) {
  if (!productIds || productIds.length === 0) return {};

  try {
    const quantityMap = {};
    const chunkSize = 25;
    const chunks = [];
    for (let i = 0; i < productIds.length; i += chunkSize) {
      chunks.push(productIds.slice(i, i + chunkSize));
    }

    for (const chunk of chunks) {
      const promises = chunk.map(async (id) => {
        try {
          const res = await axios.get(
            `http://${ERP_API_URL}/Resource/Get?TwrNumer=${id}`,
            { headers: { Authorization: `Bearer ${ERP_API_TOKEN}` } },
          );
          if (!Array.isArray(res.data) || res.data.length === 0) {
            quantityMap[id] = {
              twr_IloscSell: 0,
              twr_IloscMag: 0,
              twr_IloscRez: 0,
            };
            return;
          }
          const filteredQuantityTable = res.data.find(
            (item) => item?.mag_kod?.trim() === "M1",
          );
          if (!filteredQuantityTable) {
            quantityMap[id] = {
              twr_IloscSell: 0,
              twr_IloscMag: 0,
              twr_IloscRez: 0,
            };
          } else {
            quantityMap[id] = {
              twr_IloscSell: filteredQuantityTable.ilosc_do_sprzedazy,
              twr_IloscMag: filteredQuantityTable.ilosc_magazynowa,
              twr_IloscRez: filteredQuantityTable.ilosc_rezerwacji,
            };
          }
        } catch (err) {
          console.error(`Error fetching quantity for ${id}:`, err);
          quantityMap[id] = {
            twr_IloscSell: "Error",
            twr_IloscMag: "Error",
            twr_IloscRez: "Error",
          };
        }
      });
      await Promise.all(promises);
    }

    return quantityMap;
  } catch (err) {
    console.error("Error fetching quantities in batch:", err);
    throw err;
  }
}
