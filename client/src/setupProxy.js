const proxy = require('http-proxy-middleware')
 
// module.exports = function(app) {
//   app.use(proxy('/api/', { target: 'http://localhost:3002/' }))
// }

module.exports = function(app) {
  app.use(proxy('/api/', { target: 'https://aqueous-coast-92529.herokuapp.com/' }))
}