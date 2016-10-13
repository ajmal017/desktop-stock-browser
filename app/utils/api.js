const googleLookup = (stockSymbol, exchange) => `https://www.google.com/finance/info?&q=${exchange}:${stockSymbol}`;
const yahooLookup = (stockSymbol, range) => `http://chartapi.finance.yahoo.com/instrument/1.0/${stockSymbol}/chartdata;type=quote;range=${range}/json`;
const symbolLookup = (query) => `http://d.yimg.com/aq/autoc?query=${query}&region=US&lang=en-US`;

export default {
  googleLookup,
  yahooLookup,
  symbolLookup,
};
