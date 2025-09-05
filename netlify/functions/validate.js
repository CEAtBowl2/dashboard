// netlify/functions/validate.js
const fetch = require("node-fetch");

exports.handler = async (event) => {
  const VALIDATE_URL = process.env.APPS_SCRIPT_VALIDATE_URL; // your ?action=valider
  if (!VALIDATE_URL) {
    return { statusCode: 500, body: "Missing APPS_SCRIPT_VALIDATE_URL env var" };
  }

  try {
    const { queryStringParameters } = event;
    const qs = new URLSearchParams(queryStringParameters || {}).toString();
    const url = qs ? `${VALIDATE_URL}?${qs}` : VALIDATE_URL;

    const r = await fetch(url);
    const text = await r.text();
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: text
    };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
