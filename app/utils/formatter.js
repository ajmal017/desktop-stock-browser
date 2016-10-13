const rangeMapping = {
  '1d': 4,
  '5d': 4,
  '1m': 1,
  '3m': 1,
  '1y': 1,
  '5y': 1,
  my: 1,
};

const parseStockRangeData = (range, data) => {
  const modValue = rangeMapping[range];
  return data.reduce((totalObject, each, index) => {
    if (index % modValue === 0) {
      return Object.assign({}, totalObject, {
        value: totalObject.value.concat(each.open),
        time: totalObject.time.concat(each.Timestamp || each.Date)
      });
    }
    return totalObject;
  }, {
    value: [],
    time: [],
  });
};


export default {
  parseStockRangeData,
};
