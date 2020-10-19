const CosmosClient = require('@azure/cosmos').CosmosClient

const client = new CosmosClient(process.env.COSMOS_API_PRI_STR)
const database = client.database('dbisti')
const container = database.container('dbname')

module.exports = async function (context, req) {
  try {
    const first = req.body.first
    const last = req.body.last

    if (first && last) {
      const payload = {
        name: `${first} ${last}`
      }

      await container.items.create(payload)
      context.res = {
        status: 200,
        body: {
            name: payload.name
        }
      }
    } else {
      context.res = {
        status: 400,
        body: {
            message: "Required body not found"
        }
      }
    }
  } catch (err) {
    context.res = {
      status: 500,
      body: err.message
    }
  }
}
