const { Book } = require('./model/index')
const { parseBody, sendResponse } = require('./helpers')

module.exports.handler = async event => {
  const body = parseBody(event)
  if (!body) {
    return sendResponse(400, { message: 'BAD_REQUEST' })
  }
  const { name, releaseDate, authorName } = body
  if (!name || !releaseDate || !authorName) {
    return sendResponse(400, {
      message: 'BAD_REQUEST',
      description: 'missing parameters, expected (name, releaseDate, authorName)'
    })
  }
  const releaseDateTimestamp = new Date(releaseDate).getTime() / 1000
  if (typeof releaseDateTimestamp != 'number') {
    return sendResponse(400, {
      message: 'releaseDate format mismatch, expected aaaa/mm/dd'
    })
  }
  const newBook = new Book(name, releaseDateTimestamp, authorName)
  try {
    await newBook.save()
    return sendResponse(200, newBook)
  } catch (error) {
    return sendResponse(500, { message: 'Unexpected error' })
  }
}
