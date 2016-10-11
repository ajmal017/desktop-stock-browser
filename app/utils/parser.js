const parseGoogleData = (data) => JSON.parse(data.substring(3))[0];
const parseYahooData = (data) => JSON.parse(data.split(/\(|\)/)[1]);
const parseSymbolLookupData = (data) => JSON.parse(data);

export default {
  parseGoogleData,
  parseYahooData,
  parseSymbolLookupData,
};

