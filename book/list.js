const { listBooks } = require('./model/index')
const { sendResponse } = require('./helpers')

module.exports.handler = async event => {
  try {
    const list = await listBooks()
    return sendResponse(200, list)
  } catch (error) {
    return sendResponse(500, { message: 'Unexpected error' })
  }
}
