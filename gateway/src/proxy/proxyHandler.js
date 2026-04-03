const httpProxy = require("http-proxy");

// Create proxy instances
const proxies = {};

function writeProxyBody(proxyReq, req) {
  // Express body parsers consume the request stream; restream body for proxied writes.
  if (!req.body || !Object.keys(req.body).length) {
    return;
  }

  const contentType = proxyReq.getHeader("Content-Type") || "";
  let bodyData;

  if (contentType.includes("application/json")) {
    bodyData = JSON.stringify(req.body);
  } else if (contentType.includes("application/x-www-form-urlencoded")) {
    bodyData = new URLSearchParams(req.body).toString();
  } else {
    return;
  }

  proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
  proxyReq.write(bodyData);
}

function createProxy(serviceUrl) {
  if (!proxies[serviceUrl]) {
    proxies[serviceUrl] = httpProxy.createProxyServer({
      target: serviceUrl,
      changeOrigin: true,
      ws: true,
      proxyTimeout: 15000,
      timeout: 15000,
    });

    proxies[serviceUrl].on("error", (err, req, res) => {
      console.error(`Proxy error for ${serviceUrl}:`, err.message);
      if (!res.headersSent) {
        res.status(503).json({
          message: "Service unavailable",
          error: err.message,
        });
      }
    });

    proxies[serviceUrl].on("proxyReq", (proxyReq, req) => {
      if (["POST", "PUT", "PATCH"].includes(req.method)) {
        writeProxyBody(proxyReq, req);
      }
    });
  }
  return proxies[serviceUrl];
}

/**
 * Proxy request to target service
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {string} serviceUrl - Target service URL
 * @param {string} pathPrefix - Path prefix to strip (e.g., '/order-service')
 */
function proxyRequest(req, res, serviceUrl, pathPrefix) {
  const proxy = createProxy(serviceUrl);

  // Remove the service prefix from the path before proxying
  const originalPath = req.originalUrl || req.url;
  if (pathPrefix) {
    req.url = req.url.replace(pathPrefix, "");
  }

  // Log the proxy request
  console.log(
    `[PROXY] ${req.method} ${originalPath} -> ${serviceUrl}${req.url}`,
  );

  proxy.web(req, res);
}

module.exports = {
  proxyRequest,
  createProxy,
};
