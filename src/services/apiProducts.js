import axios from "axios";
import { calculateNetPrice } from "../utils/helpers";

const ERP_API_TOKEN = import.meta.env.VITE_ERP_API_TOKEN;
const ERP_API_URL = import.meta.env.VITE_ERP_API_URL;

export async function getProducts() {
  try {
    const res = await axios.get(
      `http://${ERP_API_URL}/Product/GetAll?limit=50&page=1`,
      {
        headers: {
          Authorization: `Bearer ${ERP_API_TOKEN}`,
        },
      },
    );

    const filteredResults = await res.data.map((el) => ({
      twr_Ean: el.twr_Ean,
      twr_Katalog: el.twr_Katalog,
      twr_Kod: el.twr_Kod,
      twr_Nazwa: el.twr_Nazwa,
      twr_kraj: el.twr_kraj,
      twr_GIDNumer: el.twr_GIDNumer,
    }));

    return filteredResults;
  } catch (err) {
    console.error(err);
  }
}

export async function getPrice(id) {
  try {
    const res = await axios.get(
      `http://${ERP_API_URL}/Pricelist/GetForProduct/${id}`,
      {
        headers: {
          Authorization: `Bearer ${ERP_API_TOKEN}`,
        },
      },
    );

    const detalicPrice = await res.data.find(
      (item) => item.tcN_Nazwa.trim() === "DETALICZNA",
    );

    const detalicPriceVat = calculateNetPrice(detalicPrice.twC_Wartosc);

    console.log(calculateNetPrice(54.99));

    return detalicPriceVat;
  } catch (err) {
    console.error(err);
  }
}
