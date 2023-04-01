// use that file to list all news source aggregators including API's

export const newsSupplier = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};

export const coinData = () => {
  return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
};