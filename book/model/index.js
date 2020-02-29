const { v4: uuid } = require('uuid')

const { getUpdateParams, apply } = require('../helpers')

class Book {
  constructor(name, releaseDate, authorName) {
    this.uuid = uuid()
    this.name = name
    this.releaseDate = releaseDate
    this.authorName = authorName
  }

  save() {
    return apply('put', {
      TableName: process.env.TABLE,
      Item: {
        uuid: uuid(),
        name: this.name,
        releaseDate: this.releaseDate,
        authorName: this.authorName
      }
    })
  }

  delete() {
    return apply('delete', {
      TableName: process.env.TABLE,
      Key: {
        uuid: this.uuid
      }
    })
  }

  update(fieldNames) {
    const { UpdateExpression, ExpressionAttributeValues, ExpressionAttributeNames } = getUpdateParams(fieldNames, this)
    return apply('update', {
      TableName: process.env.TABLE,
      Key: {
        uuid: this.uuid
      },
      ExpressionAttributeNames,
      UpdateExpression,
      ExpressionAttributeValues,
      ReturnValues: 'UPDATED_NEW'
    })
  }
}

const getBook = bookUuid => {
  return apply('get', {
    TableName: process.env.TABLE,
    Key: {
      uuid: bookUuid
    }
  })
}

const listBooks = () => apply('scan', { TableName: process.env.TABLE })

module.exports = { Book, getBook, listBooks }
