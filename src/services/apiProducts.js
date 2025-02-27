import axios from "axios";
import { calculateNetPrice } from "../utils/helpers";

const ERP_API_TOKEN = import.meta.env.VITE_ERP_API_TOKEN;
const ERP_API_URL = import.meta.env.VITE_ERP_API_URL;

export async function getProducts() {
  try {
    const res = await axios.get(
      `http://${ERP_API_URL}/Product/GetAll?page=740&limit=50`,
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

    return detalicPriceVat.replace(".", ",");
  } catch (err) {
    console.error(err);
  }
}

export async function getQuantity(id) {
  try {
    const res = await axios.get(
      `http://${ERP_API_URL}/Resource/Get?TwrNumer=${id}`,
      {
        headers: {
          Authorization: `Bearer ${ERP_API_TOKEN}`,
        },
      },
    );

    if (!Array.isArray(res.data) || res.data.length === 0) {
      return {
        twr_IloscSell: 0,
        twr_IloscMag: 0,
        twr_IloscRez: 0,
      };
    }

    const filteredQuantityTable = await res.data.find(
      (item) => item.mag_kod.trim() === "M1",
    );

    if (!filteredQuantityTable) {
      return {
        twr_IloscSell: 0,
        twr_IloscMag: 0,
        twr_IloscRez: 0,
      };
    }

    console.log(filteredQuantityTable);

    const filteredQuantity = {
      twr_IloscSell: filteredQuantityTable.ilosc_do_sprzedazy,
      twr_IloscMag: filteredQuantityTable.ilosc_magazynowa,
      twr_IloscRez: filteredQuantityTable.ilosc_rezerwacji,
    };

    console.log(filteredQuantity);

    return filteredQuantity;
  } catch (err) {
    console.error(err);
  }
}
