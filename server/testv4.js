import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import pLimit from "p-limit";

dotenv.config();
const app = express();
const PORT = 5002;

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

const BASE_URL = "http://gfcsrvAPP2:5506";
const BEARER_TOKEN = process.env.BEARER_TOKEN;
const PAGE_SIZE = 5000;

const limit = pLimit(500);

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
  let allProducts = [];

  // Fetch all product pages
  while (hasMoreData) {
    try {
      const { data } = await axios.get(`${BASE_URL}/Product/GetAll`, {
        params: { page, limit: PAGE_SIZE, typ: 1, aktywny: 1 },
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });

      if (data.length === 0) {
        hasMoreData = false;
      } else {
        allProducts = [...allProducts, ...data];
        console.log(`Fetched product page: ${page}`);
        page++;
      }
    } catch (error) {
      console.error("Error fetching all products:", error);
      hasMoreData = false;
    }
  }

  // Set up concurrency limit and progress tracking
  const limit = pLimit(200); // Increased limit to 200 concurrent requests
  let processed = 0;
  const total = allProducts.length;

  // Fetch prices and quantities with progress indicator
  const productPromises = allProducts.map((product) =>
    limit(async () => {
      const twr_GIDNumer = product.twr_GIDNumer;

      try {
        // Fetch price list
        const priceListResponse = await axios.get(
          `${BASE_URL}/Pricelist/GetForProduct/${twr_GIDNumer}`,
          {
            headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
          },
        );
        const priceList = priceListResponse.data;

        // Fetch quantities
        const resourceResponse = await axios.get(
          `${BASE_URL}/Resource/Get?TwrNumer=${twr_GIDNumer}`,
          {
            headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
          },
        );
        const resources = resourceResponse.data;

        // Update progress
        processed++;
        if (processed % 5000 === 0) {
          console.log(`Processed ${processed} out of ${total} products`);
        }

        return {
          ...product,
          prices: priceList,
          quantities: resources,
        };
      } catch (error) {
        console.error(
          `Error fetching data for product ${twr_GIDNumer}:`,
          error,
        );

        // Update progress even if there's an error
        processed++;
        if (processed % 5000 === 0) {
          console.log(`Processed ${processed} out of ${total} products`);
        }

        // Return product with empty data on failure
        return {
          ...product,
          prices: [],
          quantities: [],
        };
      }
    }),
  );

  // Wait for all promises to resolve and store the results
  productsCache = await Promise.all(productPromises);
  console.log(
    `Loaded ${productsCache.length} products with prices and quantities at startup.`,
  );
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
  let newProducts = [];

  while (hasMoreData) {
    try {
      const { data } = await axios.get(`${BASE_URL}/Product/GetFiltered`, {
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
      } else {
        newProducts = [...newProducts, ...data];
        console.log(`Pobrano stronę ${page}, dodano ${data.length} produktów`);
        page++;
      }
    } catch (error) {
      console.error("Błąd synchronizacji produktów:", error);
      hasMoreData = false;
    }
  }

  const updatedProducts = await Promise.all(
    newProducts.map(async (newProd) => {
      const twr_GIDNumer = newProd.twr_GIDNumer;

      try {
        const priceListResponse = await axios.get(
          `${BASE_URL}/Pricelist/GetForProduct/${twr_GIDNumer}`,
          {
            headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
          },
        );
        const priceList = priceListResponse.data;

        const resourceResponse = await axios.get(
          `${BASE_URL}/Resource/Get?TwrNumer=${twr_GIDNumer}`,
          {
            headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
          },
        );
        const resources = resourceResponse.data;

        return {
          ...newProd,
          ceny: priceList,
          ilosc: resources,
        };
      } catch (error) {
        console.error(
          `Błąd pobierania danych dla produktu ${twr_GIDNumer}:`,
          error,
        );
        return {
          ...newProd,
          ceny: [],
          ilosc: [],
        };
      }
    }),
  );

  updatedProducts.forEach((updatedProd) => {
    const index = productsCache.findIndex(
      (prod) =>
        String(prod.twr_GIDNumer).trim() ===
        String(updatedProd.twr_GIDNumer).trim(),
    );
    if (updatedProd.aktywny === 1) {
      if (index > -1) {
        console.log(
          `Aktualizuję istniejący produkt: ${updatedProd.twr_GIDNumer}`,
        );
        productsCache[index] = updatedProd;
      } else {
        console.log(`Dodaję nowy produkt: ${updatedProd.twr_GIDNumer}`);
        productsCache.push(updatedProd);
      }
    } else {
      if (index > -1) {
        console.log(`Usuwam nieaktywny produkt: ${updatedProd.twr_GIDNumer}`);
        productsCache.splice(index, 1);
      }
    }
  });

  lastSyncTime = now;
  console.log("Wygenerowana data: " + lastSyncTime);
  console.log(
    `Synchronizacja zakończona. Przetworzono ${updatedProducts.length} produktów. Aktualnie cache zawiera ${productsCache.length} produktów.`,
  );
};

// app.get("/products", (req, res) => {
//   if (productsCache.length > 0) {
//     res.json(productsCache);
//   } else {
//     res.status(404).json({ message: "Brak produktów w cache" });
//   }
// });

app.get("/products", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortBy = req.query.sortBy || "twr_GIDNumer";
  const order = req.query.order || "asc";

  const filterLikeBy = req.query.filterLikeBy;
  const filterLike = req.query.filterLike;

  const filterBy = req.query.filterBy;
  const filter = req.query.filter;

  if (productsCache.length === 0) {
    return res.status(404).json({ message: "Brak produktów w cache" });
  }

  let filteredProducts = [...productsCache];

  if (filterLikeBy && filterLike) {
    filteredProducts = filteredProducts.filter((product) => {
      const value = String(product[filterLikeBy] || "");
      return value.toLowerCase().includes(filterLike.toLowerCase());
    });
  }

  if (filterBy && filter) {
    filteredProducts = filteredProducts.filter((product) => {
      const value = String(product[filterBy] || "");
      return value === filter;
    });
  }

  const sortedProducts = filteredProducts.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    }
  });

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const response = {
    page,
    limit,
    total: filteredProducts.length,
    totalPages: Math.ceil(filteredProducts.length / limit),
    data: paginatedProducts,
  };

  res.json(response);
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

setInterval(syncProducts, 2 * 60 * 1000);
