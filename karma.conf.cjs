// Karma configuration
module.exports = function(config) {
  config.set({
    // Base path que será usada para resolver todos los patrones (ej. archivos, exclude)
    basePath: '',

    // Frameworks a usar
    // Frameworks disponibles: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine', 'webpack'],

    // Lista de archivos / patrones a cargar en el navegador
    files: [
      'src-react/**/*.spec.jsx'
    ],

    // Lista de archivos / patrones a excluir
    exclude: [
      'node_modules/**'
    ],

    // Preprocesar archivos coincidentes antes de servirlos al navegador
    // Preprocesadores disponibles: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'src-react/**/*.spec.jsx': ['webpack']
    },

    // Configuración de Webpack
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
            type: 'asset/resource'
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx', '.json']
      },
      devtool: 'inline-source-map'
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    // Reportes de resultados de pruebas
    // Posibles valores: 'dots', 'progress'
    // Reporteros disponibles: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress', 'coverage'],

    // Configuración de cobertura de código
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    // Puerto del servidor web
    port: 9876,

    // Habilitar / deshabilitar colores en la salida (reporteros y logs)
    colors: true,

    // Nivel de logging
    // Posibles valores: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Habilitar / deshabilitar observación de archivos y ejecución de pruebas cuando cambien
    autoWatch: true,

    // Navegadores de inicio
    // Navegadores disponibles: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // Si true, Karma captura navegadores, ejecuta las pruebas y sale
    singleRun: false,

    // Nivel de concurrencia
    // Cuántos navegadores deben iniciarse simultáneamente
    concurrency: Infinity
  })
}
