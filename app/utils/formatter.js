const rangeMapping = {
  '1d': 4,
};

const parseStockRangeData = (range, data) => {
  const modValue = rangeMapping[range];
  return data.reduce((totalObject, each, index) => {
    if (index % modValue === 0) {
      return Object.assign({}, totalObject, {
        value: totalObject.value.concat(each.open),
        time: totalObject.time.concat(each.Timestamp)
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
