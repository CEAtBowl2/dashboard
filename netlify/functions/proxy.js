const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const url = "https://docs.google.com/spreadsheets/d/TON_ID/export?format=csv";

  try {
    const response = await fetch(url);
    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/csv",
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur lors de la récupération des données." })
    };
  }
};
