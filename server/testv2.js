import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 5000;

const BASE_URL = "http://gfcsrvAPP2:5506/Product/GetAll";
const BEARER_TOKEN = process.env.BEARER_TOKEN;
const PAGE_SIZE = 5000;

let productsCache = [];

const fetchAllProducts = async () => {
  let page = 1;
  let hasMoreData = true;
  let allProducts = [];

  while (hasMoreData) {
    try {
      const { data } = await axios.get(BASE_URL, {
        params: { page, limit: PAGE_SIZE, typ: 1, aktywny: 1 },
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });

      if (data.length === 0) {
        hasMoreData = false;
      }

      allProducts = [...allProducts, ...data];
      console.log(`Strona produktów: ${page}`);
      page++;
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
      hasMoreData = false;
    }
  }

  productsCache = allProducts;
  console.log(`Załadowano ${productsCache.length} produktów.`);
};

app.get("/products/:twr_Katalog", (req, res) => {
  const { twr_Katalog } = req.params;
  const filteredProducts = productsCache.filter((product) =>
    product.twr_Katalog.includes(twr_Katalog),
  );

  if (filteredProducts.length > 0) {
    res.json(filteredProducts);
  } else {
    res.status(404).json({ message: "Produkt nie znaleziony" });
  }
});

fetchAllProducts().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
