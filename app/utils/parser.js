const parseGoogleData = (data) => JSON.parse(data.substring(3))[0];
const parseYahooData = (data) => {
  const d = data.split(/\(|\)/);
  const e = d.slice(1, d.length - 1);
  return JSON.parse(e.join(''));
};
const parseSymbolLookupData = (data) => JSON.parse(data)
  .ResultSet
  .Result
  .filter((each) => each.exchDisp === 'NASDAQ' || each.exchDisp === 'NYSE');


export default {
  parseGoogleData,
  parseYahooData,
  parseSymbolLookupData,
};

