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

## Auth0 Signup

```javascript
{
  displayName: 'volume4.schalk@gmail.com',
  id: 'auth0|5ec917be368bc60c0af0f6dd',
  user_id: 'auth0|5ec917be368bc60c0af0f6dd',
  provider: 'auth0',
  name: {},
  emails: [ { value: 'volume4.schalk@gmail.com' } ],
  picture: 'https://s.gravatar.com/avatar/44391f94143d129bdfdcd8b52aa51674?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fvo.png',
  nickname: 'volume4.schalk',
  _json: {
    sub: 'auth0|5ec917be368bc60c0af0f6dd',
    nickname: 'volume4.schalk',
    name: 'volume4.schalk@gmail.com',
    picture: 'https://s.gravatar.com/avatar/44391f94143d129bdfdcd8b52aa51674?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fvo.png',
    updated_at: '2020-05-23T12:31:58.971Z',
    email: 'volume4.schalk@gmail.com',
    email_verified: false
  },
  _raw: '{"sub":"auth0|5ec917be368bc60c0af0f6dd","nickname":"volume4.schalk","name":"volume4.schalk@gmail.com","picture":"https://s.gravatar.com/avatar/44391f94143d129bdfdcd8b52aa51674?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fvo.png","updated_at":"2020-05-23T12:31:58.971Z","email":"volume4.schalk@gmail.com","email_verified":false}'
}
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

## Useful links

* https://indiehackers.com/
* https://getmakerlog.com/
* https://stackingthebricks.com/
* Create radius maps https://radiusmap.traveltimeplatform.com/
