const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const url = "https://script.google.com/macros/s/AKfycbyf-spjWTmfGkT-xuCavz3heglHdFbXx2SUA_xSQk_GDaVPpD1cuwcokf3ht852gMQ/exec";

  try {
    const method = event.httpMethod;

    if (method === "GET") {
      const response = await fetch(url);
      const data = await response.text();
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: data,
      };
    }

    if (method === "POST") {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: event.body,
      });

      const data = await response.text();
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: data,
      };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erreur proxy", error: error.message }),
    };
  }
};


