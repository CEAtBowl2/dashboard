const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const url = "https://script.google.com/macros/s/AKfycbxNB0Hks1-Rpl0pcK1HixlQ2RA0L4VG-TowxhpBvXEbCzGzRuHf4jGuCz1_9mWzdNk/exec";

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
