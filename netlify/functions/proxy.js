const fetch = require("node-fetch");

const GAS_URL = "https://script.google.com/macros/s/AKfycbxxBRy3c-pXakbwyL6PYvloU1IlVJme0pI_bXAMUp9OV4sh0g1LACbQGdSULnnQRKs/exec";

exports.handler = async function (event) {
  const qs = event.queryStringParameters || {};
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Réponse CORS au préflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors, body: "" };
  }

  try {
    const op = qs.proxy || ""; // ex: ?proxy=set&row=..&col=..&value=..

    // --- NOUVEAU: écriture dans la sheet via action=set
    if (op === "set") {
      const row = qs.row;
      const col = qs.col;
      const value = qs.value || "";
      const url = `${GAS_URL}?action=set&row=${encodeURIComponent(row)}&col=${encodeURIComponent(col)}&value=${encodeURIComponent(value)}`;

      const res = await fetch(url, { method: "GET" });
      const text = await res.text();
      return { statusCode: 200, headers: cors, body: text }; // doit renvoyer "ok"
    }

    // --- GET par défaut: récupérer les commandes (lecture)
    if (event.httpMethod === "GET") {
      const res = await fetch(GAS_URL);
      const data = await res.text();
      return {
        statusCode: 200,
        headers: { ...cors, "Content-Type": "application/json" },
        body: data,
      };
    }

    // --- POST: relayer le POST (création de commande)
    if (event.httpMethod === "POST") {
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: event.body,
      });
      const text = await res.text();
      return { statusCode: 200, headers: cors, body: text };
    }

    return { statusCode: 405, headers: cors, body: "Method Not Allowed" };
  } catch (error) {
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ message: "Erreur proxy", error: error.message }),
    };
  }
};
