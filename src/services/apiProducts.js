import axios from "axios";

export async function getProducts() {
  const ERP_API_TOKEN = import.meta.env.VITE_ERP_API_TOKEN;
  const ERP_API_URL = import.meta.env.VITE_ERP_API_URL;

  try {
    console.log(`http://${ERP_API_URL}/Product/GetBySku/UTT-31-032012-00`);
    console.log(ERP_API_TOKEN);

    const res = await axios.get(
      `http://${ERP_API_URL}/Product/GetBySku/UTT-31-032012-00`,
      {
        headers: {
          Authorization: `Bearer ${ERP_API_TOKEN}`,
        },
      },
    );

    const filteredResults = [
      {
        twr_GIDNumer: res.data.twr_GIDNumer,
        twr_Kod: res.data.twr_Kod,
        twr_Nazwa: res.data.twr_Nazwa,
        twr_Typ: res.data.twr_Typ,
        twr_Nazwa1: res.data.twr_Nazwa1,
        twr_Katalog: res.data.twr_Katalog,
        twr_Ean: res.data.twr_Ean,
        twr_Kategoria: res.data.twr_Kategoria,
        twr_KategoriaId: res.data.twr_KategoriaId,
        twr_kraj: res.data.twr_kraj,
        twr_Sww: res.data.twr_Sww,
        twr_Jm: res.data.twr_Jm,
        twr_PCN: res.data.twr_PCN,
        twr_grupaPod: res.data.twr_grupaPod,
        twr_stawkaPod: res.data.twr_stawkaPod,
        twr_GrupaPodSpr: res.data.twr_GrupaPodSpr,
        twr_StawkaPodSpr: res.data.twr_StawkaPodSpr,
        twr_Waga: res.data.twr_Waga,
        twr_WJm: res.data.twr_WJm,
        twr_WagaBrutto: res.data.twr_WagaBrutto,
        twr_WJmBrutto: res.data.twr_WJmBrutto,
        twr_ObjetoscL: res.data.twr_ObjetoscL,
        twr_Wcenniku: res.data.twr_Wcenniku,
        tap_Status: res.data.tap_Status,
        tap_ZapowiedzDataOd: res.data.tap_ZapowiedzDataOd,
        dataModyfikacji: res.data.dataModyfikacji,
        producent: res.data.producent,
        marka: res.data.marka,
      },
    ];

    return filteredResults;
  } catch (err) {
    console.error(err);
  }
}
