const isUUID = require('is-uuid')

const { getBook } = require('./model/index')
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
  try {
    const bookDetailsItem = await getBook(bookUuid)
    if ('Item' in bookDetailsItem) {
      return sendResponse(200, bookDetailsItem.Item)
    }
    return sendResponse(404, { message: 'Book not found' })
  } catch (error) {
    return sendResponse(500, { message: 'Unexpected error' })
  }
}
