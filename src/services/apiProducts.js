import axios from "axios";

export async function getProducts() {
  const ERP_API_TOKEN = import.meta.env.VITE_ERP_API_TOKEN;
  const ERP_API_URL = import.meta.env.VITE_ERP_API_URL;

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
      twr_GIDNumer: el.twr_GIDNumer,
      twr_Kod: el.twr_Kod,
      twr_Nazwa: el.twr_Nazwa,
      twr_Typ: el.twr_Typ,
      twr_Nazwa1: el.twr_Nazwa1,
      twr_Katalog: el.twr_Katalog,
      twr_Ean: el.twr_Ean,
      twr_Kategoria: el.twr_Kategoria,
      twr_KategoriaId: el.twr_KategoriaId,
      twr_kraj: el.twr_kraj,
      twr_Sww: el.twr_Sww,
      twr_Jm: el.twr_Jm,
      twr_PCN: el.twr_PCN,
      twr_grupaPod: el.twr_grupaPod,
      twr_stawkaPod: el.twr_stawkaPod,
      twr_GrupaPodSpr: el.twr_GrupaPodSpr,
      twr_StawkaPodSpr: el.twr_StawkaPodSpr,
      twr_Waga: el.twr_Waga,
      twr_WJm: el.twr_WJm,
      twr_WagaBrutto: el.twr_WagaBrutto,
      twr_WJmBrutto: el.twr_WJmBrutto,
      twr_ObjetoscL: el.twr_ObjetoscL,
      twr_Wcenniku: el.twr_Wcenniku,
      tap_Status: el.tap_Status,
      tap_ZapowiedzDataOd: el.tap_ZapowiedzDataOd,
      dataModyfikacji: el.dataModyfikacji,
      producent: el.producent,
      marka: el.marka,
    }));

    console.log(filteredResults);

    return filteredResults;
  } catch (err) {
    console.error(err);
  }
}
