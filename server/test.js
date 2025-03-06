import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

const BASE_URL = "http://gfcsrvAPP2:5506/Product/GetAll";
const PAGE_SIZE = 5000;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

const fetchAllProducts = async () => {
  let page = 1;
  let allProducts = [];
  let hasMoreData = true;

  while (hasMoreData) {
    try {
      const { data } = await axios.get(BASE_URL, {
        params: { typy: 1, aktywny: 1, page, limit: PAGE_SIZE },
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });

      if (data.length === 0) {
        hasMoreData = false;
      } else {
        allProducts = [...allProducts, ...data];
        console.log(page);
        page++;
      }
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
      break;
    }
  }

  return allProducts;
};

app.get("/products", async (req, res) => {
  try {
    const products = await fetchAllProducts();

    const filteredData = products.filter(
      (item) => item.twr_Katalog && item.twr_Katalog.includes("1132350630"),
    );

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: "Błąd pobierania produktów" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
