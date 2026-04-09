const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🎌 Otaku Anime Platform API',
      version: '1.0.0',
      description:
        'Production-ready REST API for the Otaku Anime Platform — browse anime, manage characters, and authenticate users.',
      contact: {
        name: 'Otaku API',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token obtained from /api/auth/login',
        },
      },
    },
    security: [],
  },
  apis: ['./src/routes/*.js'], // Scan route files for JSDoc annotations
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * Register Swagger UI on the given Express app.
 * Available at GET /api-docs
 * @param {import('express').Application} app
 */
const setupSwagger = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: 'Otaku API Docs',
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );

  // Serve raw JSON spec
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`📖 Swagger UI available at http://localhost:${process.env.PORT || 3000}/api-docs`);
};

module.exports = setupSwagger;
