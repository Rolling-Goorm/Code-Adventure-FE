const path = require('path');
const { generateApi } = require('swagger-typescript-api');

// Swagger URL
const swaggerUrl = 'http://118.67.128.223:8080/v3/api-docs';

// Output directory
const outputDir = path.resolve(__dirname, '../src/api');

generateApi({
  name: 'ApiClient.ts',
  url: swaggerUrl,
  output: outputDir,
  httpClientType: 'axios', // or "fetch"
  defaultResponseAsSuccess: true,
})
  .then(() => {
    console.log('API client generated successfully');
  })
  .catch((err) => {
    console.error('Error generating client:', err);
  });
