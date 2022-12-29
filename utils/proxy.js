exports = module.exports = exports = module.exports = exports = module.exports = function() {
  var mod = {
    httpAgent: typeof require !== "undefined" ? require("http-proxy-agent") : undefined,
    httpsAgent: typeof require !== "undefined" ? require("https-proxy-agent") : undefined,
    fetch: async function(proxyUrl, url, method, data, headers) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      if (!app.has(headers)) headers = {};
      if (!app.has(method)) method = "GET";
      var agent = new mod.httpsAgent(proxyUrl);
      if (config.api.log.url) console.log("VIA PROXY: " + proxyUrl + " > " + url + " " + method);
      if (!url.toLowerCase().split("http://").shift()) agent = mod.httpAgent(proxyUrl);
      var options = {
        method: method,
        agent: agent,
        headers: headers
      };
      if (app.has(data)) options.body = JSON.stringify(data);
      return await fetch(url, options);
    }
  };
  return mod;
}