const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440, // Establecer el ancho del viewport
    viewportHeight: 900, // Establecer la altura del viewport
  },
})
