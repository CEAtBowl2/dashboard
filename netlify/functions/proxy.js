const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const url = "https://script.google.com/macros/s/AKfycbyqwucpIri6CO3iLhJzJljja3g0VBOYZOfvSOuNisP_4MT45xjZPHyUrXYLjnBL8nk/exec";

  try {
    const response = await fetch(url);
    const data = await response.text(); // ou response.json() si ton script renvoie du JSON
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Optionnel si ton site est sur le même domaine Netlify
        "Content-Type": "application/json",
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erreur de proxy", error: error.message }),
    };
  }
};
