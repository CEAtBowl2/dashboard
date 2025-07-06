const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const url = "https://script.google.com/macros/s/AKfycbzzyggb4yl21CPoscCDgsvquXCnzbs7ILda-F59jj2KUIh4hpzOg1-dnDMZ-1GJSA4/exec";

  try {
    const response = await fetch(url);
    const data = await response.json(); // ✅ attend un JSON, comme modifié dans ton code.gs

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // permet l'accès depuis Netlify
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // renvoie l’objet JSON tel quel
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "error", message: "Erreur de proxy", error: error.message }),
    };
  }
};
