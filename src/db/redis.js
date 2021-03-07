const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

client.on('error', err => {
  console.log(err)
})
function set(key, value) {
  if (typeof value === 'object'){
    value = JSON.stringify(value)
  }
  client.set(key, value, redis.print)
}
function get(key) {
  return new Promise((resolve,reject) => {
    client.get(key, (err, reply) => {
      if (err) {
        reject(err)
        return
      }
      if (reply == null) {
        resolve(null)
        return
      }
      try {
        resolve(
          JSON.parse(reply)
        )
      } catch(e) {
        resolue(reply)
      }
    })
  })
}
module.exports = {
  set,
  get
}
