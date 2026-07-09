/* GET /.netlify/functions/referrer-suggestions
   Returns the most frequent "who shared this with you" names as a JSON
   array, for the datalist suggestions on the landing page. Names are
   aggregated by submission-created.js; anything email-like or with
   digits is filtered out before it's ever stored. */

const { getStore, connectLambda } = require("@netlify/blobs");

function titleCase(s) {
  return s.toLowerCase().replace(/(^|\s|-)\S/g, function (c) { return c.toUpperCase(); });
}

exports.handler = async function (event) {
  var headers = {
    "content-type": "application/json",
    "cache-control": "public, max-age=300"
  };
  try {
    connectLambda(event); // required in Lambda-compat functions before getStore
    var store = getStore("referrers");
    var counts = (await store.get("counts", { type: "json" })) || {};
    var top = Object.keys(counts)
      .sort(function (a, b) { return counts[b] - counts[a]; })
      .slice(0, 8)
      .map(titleCase);
    return { statusCode: 200, headers: headers, body: JSON.stringify(top) };
  } catch (e) {
    return { statusCode: 200, headers: headers, body: "[]" };
  }
};
