export const environment = {
  production: false,
  urlApi: "https://snippet-share-api.azurewebsites.net",
  authConfig: {
      domain: "snippetshare.eu.auth0.com",
      clientId: "QNXZMRVESsbPlWdiAnXSh8nGHST2n5XJ",
      audience: "https://snippet-share-api.azurewebsites.net/",
      redirectUri : window.location.origin
  }
};
