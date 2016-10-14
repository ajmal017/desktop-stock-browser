const POSITIVE_COLOR = '#01CE67';
const NEGATIVE_COLOR = '#F38493';
const NEUTRAL_COLOR = 'rgba(255, 255, 255, 0.7)';

// Takes in value, returns color of text associated with value
const deduceColor = (value) => {
  if (value > 0) return POSITIVE_COLOR;
  if (value < 0) return NEGATIVE_COLOR;
  return NEUTRAL_COLOR;
};

// Adds some decimals to a dollar amount
const parseDollarAmount = (dollarAmountString) => dollarAmountString.toFixed(2);

// Splits a dollar string into decimal, full amount
const splitDollarAmount = (dollarAmountString) => dollarAmountString.split('.');

// buttons for various ranges to be chosen
const rangeButtons = [
  '1d',
  '5d',
  '1m',
  '3m',
  '1y',
  '5y',
  'my'
];

export default {
  deduceColor,
  parseDollarAmount,
  splitDollarAmount,
  rangeButtons,
};
