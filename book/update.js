const isUUID = require('is-uuid')
const { Book } = require('./model/index')
const { parseBody, sendResponse } = require('./helpers')

module.exports.handler = async event => {
  const { pathParameters } = event
  const body = parseBody(event)
  if (!pathParameters || !body) {
    return sendResponse(400, { message: 'BAD_REQUEST' })
  }
  const { bookUuid } = pathParameters
  if (!bookUuid || !isUUID.v4(bookUuid)) {
    return sendResponse(400, {
      message: 'BAD_REQUEST',
      description: 'wrong parameter'
    })
  }
  const fieldsToUpdate = []
  const storedBook = new Book()
  storedBook.uuid = bookUuid
  if (body.name) {
    storedBook.name = body.name
    fieldsToUpdate.push('name')
  }
  if (body.releaseDate) {
    storedBook.releaseDate = new Date(body.releaseDate).getTime() / 1000
    fieldsToUpdate.push('releaseDate')
  }
  if (body.authorName) {
    storedBook.authorName = body.authorName
    fieldsToUpdate.push('authorName')
  }
  if (fieldsToUpdate.length > 0) {
    try {
      await storedBook.update(fieldsToUpdate)
      return sendResponse(200)
    } catch (error) {
      return sendResponse(500, { message: 'Unexpected error' })
    }
  }
  return sendResponse(400, { message: 'BAD_REQUEST' })
}
