// use that file to list all news source aggregators including API's

export const newsSupplier = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  };