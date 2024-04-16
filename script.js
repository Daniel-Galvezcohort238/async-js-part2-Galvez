class FetchAPI {
  constructor() {
    console.log('FETCH API~~~~~~~~~~~~~~~~~~~~~~~~~-------------------------------------------------------------')

    const fetchPromise = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
          
    console.log(fetchPromise);
          
    fetchPromise.then((response) => {
      console.log(`Received response: ${response.status}`);
      console.log(response);
    });
          
      console.log("Started request…");
  }
}

class ChainingPromises {
  constructor() {
    console.log('CHAINING PROMISES----------------------------------------------------------------------------')
    this.checkingStatusCode();
  }

  gettingDataFromJSON() {
    const fetchPromise = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    
    fetchPromise.then((response) => {
      const jsonPromise = response.json();
      jsonPromise.then((data) => {
        for (let i = 0; i < 12; i++) {
          console.log(data[i].name);
        }
      });
    });
    
  }

  rewrittenCode() {
    const fetchPromise = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    
    fetchPromise
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < 12; i++) {
          console.log(data[i].name);
        }
      });
    
  }

  checkingStatusCode() {
    const fetchPromise = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    
    fetchPromise
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        for (let i = 0; i < 12; i++) {
          console.log(data[i].name);
        }
      });
    
  }
}


class CatchingErrors {
  constructor() {
    console.log('CATHING ERRORS--------------------------------------------------------------------------')

    const fetchPromise = fetch(
      "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    
    fetchPromise
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data[0].name);
      })
      .catch((error) => {
        console.error(`Could not get products: ${error}`);
      });
    
  }
}

class CombiningMultiplePromises {
  constructor() {
    console.log('COMBINING MULTIPLE PROMISES--------------------------------------------------------------')

    this.promiseAny();
  }

  promiseAllExample1() {
    const fetchPromise1 = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    const fetchPromise2 = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
    );
    const fetchPromise3 = fetch(
      "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
    );
    
    Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
      .then((responses) => {
        for (const response of responses) {
          console.log(`${response.url}: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error(`Failed to fetch: ${error}`);
      });
    
  }

  badlyFormedURL() {
    const fetchPromise1 = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    const fetchPromise2 = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
    );
    const fetchPromise3 = fetch(
      "bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
    );
    
    Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
      .then((responses) => {
        for (const response of responses) {
          console.log(`${response.url}: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error(`Failed to fetch: ${error}`);
      });
    
  }

  promiseAny() {
    const fetchPromise1 = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    const fetchPromise2 = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
    );
    const fetchPromise3 = fetch(
      "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
    );
    
    Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
      .then((response) => {
        console.log(`${response.url}: ${response.status}`);
      })
      .catch((error) => {
        console.error(`Failed to fetch: ${error}`);
      });
    
  }
}

class AsyncAndAwait {
  constructor() {
    console.log('ASYNC AND AWAIT------------------------------------------------------------------------------');

    async function myFunction() {
      //this is an asynchronous function
    }; myFunction();

    this.correctedFunction();

  }

  awaitKeyword() {
    async function fetchProducts() {
      try {
        // after this line, our function will wait for the `fetch()` call to be settled
        // the `fetch()` call will either return a Response or throw an error
        const response = await fetch(
          "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        // after this line, our function will wait for the `response.json()` call to be settled
        // the `response.json()` call will either return the parsed JSON object or throw an error
        const data = await response.json();
        console.log(data[0].name);
      } catch (error) {
        console.error(`Could not get products: ${error}`);
      }
    }
    
    fetchProducts();    
    
  }

  faultyFunction() {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Could not get products: ${error}`);
      }
    }
    
    const promise = fetchProducts();
    console.log(promise[0].name); // "promise" is a Promise object, so this will not work. The async keyword forces the function to always return a promise object.
  }

  correctedFunction() {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        console.log(response)
        return data;
      } catch (error) {
        console.error(`Could not get products: ${error}`);
      }
    }
    
    const promise = fetchProducts();
    promise.then((data) => console.log(data[0].name));
    
  }

  awaitOutsideAnAsynFunction() {
    // try {
    //   // using await outside an async function is only allowed in a module
    //   const response = await fetch(
    //     "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    //   );
    //   if (!response.ok) {
    //     throw new Error(`HTTP error: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   console.log(data[0].name);
    // } catch (error) {
    //   console.error(`Could not get products: ${error}`);
    // }
    
  }
}

class RunClassesSynchronously {
  constructor() {
    this.actualMethod()
  }

  async actualMethod() {
    
    await this.fetchAPIMethod()
    await this.chainingPromisesMethod()
    await this.catchingErrorsMethod()
    await this.combiningMultiplePromisesMethod()
    await this.asyncAndAwaitMethod()
    
  }
  
  async fetchAPIMethod() {
    let fetchAPI = new FetchAPI();

  }

  async chainingPromisesMethod() {
    let chainingPromises = new ChainingPromises();

  }

  async catchingErrorsMethod() {
    let catchingErrors = new CatchingErrors();

  }

  async combiningMultiplePromisesMethod() {
    let combiningMultiplePromises = new CombiningMultiplePromises();

  }

  async asyncAndAwaitMethod() {
    let asyncAndAwait = new AsyncAndAwait();

  }

}

const runClassesSynchronously = new RunClassesSynchronously()