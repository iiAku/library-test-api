const isUUID = require('is-uuid')

const { Book } = require('./model/index')
const { sendResponse } = require('./helpers')

module.exports.handler = async event => {
  const { pathParameters } = event
  if (!pathParameters) {
    return sendResponse(400, { message: 'BAD_REQUEST' })
  }
  const { bookUuid } = pathParameters
  if (!bookUuid || !isUUID.v4(bookUuid)) {
    return sendResponse(400, {
      message: 'BAD_REQUEST',
      description: 'wrong parameter'
    })
  }
  const storedBook = new Book()
  storedBook.uuid = bookUuid
  try {
    const output = await storedBook.delete()
    return sendResponse(200)
  } catch (error) {
    return sendResponse(500, { message: 'Unexpected error' })
  }
}
