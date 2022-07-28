module.exports = function axiosConfig(method, url, body, isBlob) {
  let axiosConfig = {
    method: method,
    url: url,
    // headers: { ...headers },
  };

  if (isBlob) axiosConfig.responseType = "blob";

  if (!method.toLowerCase() !== "get" && !!body)
    axiosConfig = { ...axiosConfig, data: body };
  return axiosConfig;
};
