# RESTful API for koinX

## Technical Stack

-   **Framework**: ExpressJS
-   **Database**: MongoDB

## Project Structure

-   `src/`: Contains the source code for the API.
-   `config/`: Configuration files or scripts.
-   `controllers/`: Main Logic of Endpoint.
-   `routes/`: Inclueds routes.
-   `middlewares/`: Consists of middlewares.
-   `model/`: Consists of database schemas.
-   `utils/`: Consists of external utilities like types, interfaces etc.

## Setup Instructions

1. **Clone the repository:**

    ```bash
    https://github.com/jogeshgupta963/koinx.git
    cd ./koinx/server

    ```

2. **Environment Variables:**

    Already added for your convenience

3. **Database Setup:**

    Already setup

4. **Install dependencies(Optional, for running locally or testing):**

    ```bash
    npm install
    ```

## API Endpoints

### Authentication Endpoints

#### `POST /coin/value`

returns the price of coin(Bitcoin) in terms of another coin(Basic Attention Token(BAT)) on a date (12th January 2023).
request example

    {
        “fromCurrency”: “bitcoin”,
        “toCurrency”: “basic-attention-token”,
        “date”: “12-01-2023”
    }

#### `POST /coin/exchangeRate/{coin1Id}/{coin2Id}`

API that takes the Coingecko IDs of 2 cryptocurrencies and returns the price of one currency in another on a particular date.

#### `GET /coin/company/holdings/{coinId}`

Get the list of companies that hold a particular cryptocurrency.
