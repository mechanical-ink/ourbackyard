# ourbackyard

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

Connecting people with local businesses

## Development Resources

- [Structured data](https://developers.google.com/search/reference/overview)
- [Query Documents - MongoDB](https://docs.mongodb.com/manual/tutorial/query-documents/)

Start local MongoDB

```
brew services start|stop|restart mongodb-community
```

## Infra

- [Database](https://cloud.mongodb.com/)
- [Auth](https://auth0.com)
- [Server IP] `165.22.20.27`

## Queries

### Find all individuals and businesses that have the same zipcode

```
{$or: [{"areaFilter": "0182"}, {"businessPostalCode": "0182"}] }
```

- https://docs.mongodb.com/manual/reference/operator/query/regex/
