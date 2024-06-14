const cors_anywhere = require('cors-anywhere')

const host = '0.0.0.0' // Permitir conexões de qualquer host
const port = 8080 // Porta para o servidor proxy

cors_anywhere
  .createServer({
    originWhitelist: [], // Permitir qualquer origem
    requireHeader: [],
    removeHeaders: [],
  })
  .listen(port, host, () => {
    console.log(
      `Servidor proxy CORS está em execução em http://${host}:${port}`,
    )
  })
