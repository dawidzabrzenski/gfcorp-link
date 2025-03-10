import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 5002;

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

const BASE_URL = "http://gfcsrvAPP2:5506/Product";
const BEARER_TOKEN = process.env.BEARER_TOKEN;
const PAGE_SIZE = 50;

let productsCache = [];
let lastSyncTime = new Date();

const formatDate = (date) => {
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd} ${HH}:${mm}`;
};

const fetchAllProducts = async () => {
  let page = 1;
  let hasMoreData = true;
  let fetchMorePages = true;
  let allProducts = [];

  while (fetchMorePages) {
    try {
      const { data } = await axios.get(`${BASE_URL}/GetAll`, {
        params: { page, limit: PAGE_SIZE, typ: 1, aktywny: 1 },
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });

      if (data.length === 0) {
        hasMoreData = false;
      }

      if (page === 5) {
        fetchMorePages = false;
      }

      allProducts = [...allProducts, ...data];
      console.log(`Strona produktów: ${page}`);
      page++;
    } catch (error) {
      console.error("Błąd pobierania wszystkich produktów:", error);
      hasMoreData = false;
    }
  }
  productsCache = allProducts;
  console.log(`Załadowano ${productsCache.length} produktów przy starcie.`);
};

const syncProducts = async () => {
  const now = new Date();
  const formattedLastSync = formatDate(lastSyncTime);
  const formattedNow = formatDate(now);
  console.log(
    `Synchronizuję produkty zmodyfikowane od: ${formattedLastSync} do: ${formattedNow}`,
  );

  let page = 1;
  let hasMoreData = true;
  let fetchMorePages = true;
  let newProducts = [];

  while (fetchMorePages) {
    try {
      const { data } = await axios.get(`${BASE_URL}/GetFiltered`, {
        params: {
          page,
          limit: PAGE_SIZE,
          dataModyfikacjiOd: formattedLastSync,
          dataModyfikacjiDo: formattedNow,
        },
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });

      if (data.length === 0) {
        hasMoreData = false;
      }

      if (page === 5) {
        fetchMorePages = false;
      } else {
        newProducts = [...newProducts, ...data];
        console.log(`Pobrano stronę ${page}, dodano ${data.length} produktów`);
        page++;
      }
    } catch (error) {
      console.error("Błąd synchronizacji produktów:", error);
      hasMoreData = false;
      fetchMorePages = false;
    }
  }

  newProducts.forEach((newProd) => {
    const index = productsCache.findIndex(
      (prod) =>
        String(prod.twr_GIDNumer).trim() ===
        String(newProd.twr_GIDNumer).trim(),
    );
    console.log(
      `Przetwarzam twr_GIDNumer: ${newProd.twr_GIDNumer}, index: ${index}`,
    );
    if (newProd.aktywny === 1) {
      if (index > -1) {
        console.log(`Aktualizuję istniejący produkt: ${newProd.twr_GIDNumer}`);
        productsCache[index] = newProd;
      } else {
        console.log(`Dodaję nowy produkt: ${newProd.twr_GIDNumer}`);
        productsCache.push(newProd);
      }
    } else {
      if (index > -1) {
        console.log(`Usuwam nieaktywny produkt: ${newProd.twr_GIDNumer}`);
        productsCache.splice(index, 1);
      }
    }
  });

  lastSyncTime = now;
  console.log("Wygenerowana data: " + lastSyncTime);
  console.log(
    `Synchronizacja zakończona. Przetworzono ${newProducts.length} produktów. Aktualnie cache zawiera ${productsCache.length} produktów.`,
  );
};

app.get("/products", (req, res) => {
  if (productsCache.length > 0) {
    res.json(productsCache);
  } else {
    res.status(404).json({ message: "Brak produktów w cache" });
  }
});

app.get("/products/:twr_Katalog", (req, res) => {
  const { twr_Katalog } = req.params;
  const filteredProducts = productsCache.filter(
    (product) => product.twr_GIDNumer && product.twr_GIDNumer == twr_Katalog,
  );

  if (filteredProducts.length > 0) {
    res.json(filteredProducts);
  } else {
    res.status(404).json({ message: "Produkt nie znaleziony" });
  }
});

fetchAllProducts().then(() => {
  app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
  });
});

// (0.5 minuty = 0.5 * 60 * 1000 ms)
setInterval(syncProducts, 0.5 * 60 * 1000);
