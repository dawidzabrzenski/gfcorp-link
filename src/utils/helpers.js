export function calculateNetPrice(detalicPrice) {
  const netPrice = detalicPrice / 1.23;

  const roundedNetPrice = Math.round(netPrice * 100) / 100;

  return roundedNetPrice.toFixed(2);
}
