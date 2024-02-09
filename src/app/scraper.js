const axios = require("axios");
const cheerio = require("cheerio");

export default function scraper(from, date) {
  const url = `http://localhost:3000/api/currencytables/?from=${from}&date=${date}#table-section`;

  return axios(url) // return the promise
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const firstRow = $("table tbody tr").first();
      let output;

      firstRow.each(function () {
        const currency = $(this).find("th a").text();
        const name = $(this).find("td").first().text();
        const unitsPerFrom = $(this).find("td").eq(1).text();
        const FromPerUnit = $(this).find("td").eq(2).text();

        output = unitsPerFrom;
      });

      return output; // return the output
    })
    .catch(console.error);
}
