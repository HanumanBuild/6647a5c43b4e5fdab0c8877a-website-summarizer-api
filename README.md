# Website Summarizer API

This API takes in a website URL, fetches the HTML content of the page, extracts the main text content, and uses OpenAI to summarize the contents of the page.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB
- OpenAI API Key

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd website-summarizer-api
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key.
   - `MONGODB_URI`: The URI to connect to the MongoDB database.
   - `MONGODB_DBNAME`: The name of the MongoDB database to connect to.

## API Documentation

### Endpoints

#### Root Endpoint

- **URL**: `/`
- **Method**: `GET`
- **Description**: Returns a welcome message.

#### Summarize Endpoint

- **URL**: `/summarize`
- **Method**: `POST`
- **Description**: Accepts a website URL, fetches the HTML content, extracts the main text content, and uses OpenAI to summarize the contents of the page.
- **Request Body**:
  ```json
  {
    "url": "https://example.com"
  }
  ```
- **Response**:
  ```json
  {
    "summary": "This is the summarized content of the page."
  }
  ```

## Environment Variables

- `OPENAI_API_KEY`: This is the API key for accessing the OpenAI API. You can get it from the OpenAI website.
- `MONGODB_URI`: The URI to connect to the MongoDB database.
- `MONGODB_DBNAME`: The name of the MongoDB database to connect to.

## Running the Server

1. Start the server:
   ```sh
   node index.js
   ```

2. The server will be running on port 3000.

## Deployment

The repository is deployed at the following URL:
- `$WEBSITE_SUMMARIZER_API_URL`

## License

This project is licensed under the MIT License.
