const AWS = require('aws-sdk')

const config = require('./config')
AWS.config.update({ region: config.region })
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const parseBody = event => {
  const { body } = event
  if (!body) {
    return
  }
  if (typeof body === 'object') {
    return body
  }
  try {
    return JSON.parse(body)
  } catch (error) {
    throw new Error('Error happened while parsing body')
  }
}

const sendResponse = (statusCode, body = {}) => ({
  statusCode,
  body: JSON.stringify(body)
})

const apply = (operation, params) => {
  if (config.allowedDbOperations.includes(operation)) {
    return new Promise((resolve, reject) => {
      dynamoDb[operation](params, (error, result) => {
        if (error) {
          reject(error)
        }
        if (result) {
          resolve(result)
        }
        resolve()
      })
    })
  }
}

const getUpdateParams = (updatedFieldNames, instance) => {
  const ExpressionAttributeValues = {}
  const ExpressionAttributeNames = updatedFieldNames.reduce((acc, updatedFieldName) => {
    acc[`#${updatedFieldName}`] = updatedFieldName
    return acc
  }, {})
  const allowedUpdateFieldNames = Object.keys(instance).slice(1)
  const UpdateExpression = [
    'SET',
    updatedFieldNames
      .filter(updatedFieldName => allowedUpdateFieldNames.includes(updatedFieldName))
      .map(updatedFieldName => {
        const key = ':' + updatedFieldName
        const value = instance[updatedFieldName]
        ExpressionAttributeValues[key] = value
        return `#${updatedFieldName}` + '=' + key
      })
      .join(', ')
  ].join(' ')
  return {
    ExpressionAttributeValues,
    UpdateExpression,
    ExpressionAttributeNames
  }
}

module.exports = { parseBody, sendResponse, getUpdateParams, apply }
