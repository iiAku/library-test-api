# Welcome to library-test-api 👋

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> A book library test api

## Install

```sh
yarn install
```

## Usage

```sh
Required
- Node.js 10+
- Yarn or npm
- Serverless npm install serverless -g
```

You can run service and function locally this way

- `serverless invoke local -f FUNCTION_NAME -p book/events/EVENT_NAME.json -s STAGE`

eg: `serverless invoke local -f add -p book/events/add.json -s dev`

You can add, delete, edit documents you can also tweak json

- Add a book to the library: POST /book/add

`serverless invoke local -f add -p book/events/add.json -s dev`

- Update book details: POST book/{bookUuid}/update

`serverless invoke local -f update -p book/events/update.json -s dev`

- Delete a book from the library: POST /book/{bookUuid}/delete

`serverless invoke local -f delete -p book/events/delete.json -s dev`

- Get all books: GET /books

`serverless invoke local -f list -s dev`

- Get book details: GET /book/{bookUuid}

`serverless invoke local -f details -p book/events/details.json -s dev`

You can deploy service when your AWS credentials are set

```
export AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
export AWS_DEFAULT_REGION=YOUR_AWS_DEFAULT_REGION
```

Then run `serverless deploy`

This will automatically create database and deploy your functions

You'll get url endpoint, you'll also be able to hit your function with expected method and body with postman or any other tool that let you send requests

Using json body for POST request when a body is provided

Service is also deployed, endpoints are the following:

endpoints:

- /POST https://na04t9vesl.execute-api.us-east-1.amazonaws.com/dev/book/add
- /POST https://na04t9vesl.execute-api.us-east-1.amazonaws.com/dev/book/{bookUuid}/update
- /POST https://na04t9vesl.execute-api.us-east-1.amazonaws.com/dev/book/{bookUuid}/delete
- /GET https://na04t9vesl.execute-api.us-east-1.amazonaws.com/dev/books
- /GET https://na04t9vesl.execute-api.us-east-1.amazonaws.com/dev/book/{bookUuid}

## Author

👤 **Yoann Gendrey**

- Website: https://iiaku.com
- Github: [@iiAku](https://github.com/iiAku)
- LinkedIn: [@https:\/\/www.linkedin.com\/in\/yoann-gendrey-2336a374\/](https://linkedin.com/in/https://www.linkedin.com/in/yoann-gendrey-2336a374/)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
