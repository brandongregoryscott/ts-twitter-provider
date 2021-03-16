# ts-twitter-provider

![build status](https://github.com/brandongregoryscott/ts-twitter-provider/workflows/ts-twitter-provider/badge.svg)
[![codecov](https://codecov.io/gh/brandongregoryscott/ts-twitter-provider/branch/main/graph/badge.svg)](https://codecov.io/gh/brandongregoryscott/ts-twitter-provider)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A typed wrapper around the Twitter V2 API

_Package is in development and API is subject to change._

---

## Getting started

This package is installed via npm or yarn

```shell
# npm
npm install --save ts-twitter-provider

# yarn
yarn add ts-twitter-provider
```

From there you can import the variety of modules.

```typescript
import { TwitterProvider, Tweet } from "ts-twtter-provider";
```

## Supported API

| Endpoint                                                                                                                                        | Method                | Params                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`/2/tweets`](https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets)                                         | `listTweets`          | ✅ expansions<br/> ✅ ids<br/> ✅ media.fields<br/> ✅ place.fields<br/> ✅ poll.fields<br/> ✅ tweet.fields<br/> ✅ user.fields                                                                                                                             |
| [`/2/tweets/:id`](https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets-id)                                  | `getTweet`            | ❌ expansions<br/> ❌ media.fields<br/> ❌ place.fields<br/> ❌ poll.fields<br/> ❌ tweet.fields<br/> ❌ user.fields                                                                                                                                         |
| [`/2/users/:id/tweets`](https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets)                   | `listTweetsByUser`    | ✅ end_time<br/> ✅ exclude<br/> ✅ expansions<br/> ✅ max_results<br/> ✅ media.fields<br/> ✅ pagination_token<br/> ✅ place.fields<br/> ✅ poll.fields<br/> ✅ since_id<br/> ✅ start_time<br/> ✅ tweet.fields<br/> ✅ until_id<br/> ✅ user.fields<br/> |
| [`/2/users/:id/mentions`](https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-mentions)               | `listMentionsByUser`  | ✅ end_time<br/> ❌ exclude<br/> ✅ expansions<br/> ✅ max_results<br/> ❌ media.fields<br/> ✅ pagination_token<br/> ❌ place.fields<br/> ✅ poll.fields<br/> ✅ since_id<br/> ✅ start_time<br/> ✅ tweet.fields<br/> ✅ until_id<br/> ✅ user.fields<br/> |
| [`/2/users`](https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users)                                            | `listUsers`           | ❌ expansions<br/> ❌ ids<br/> ❌ tweet.fields<br/> ❌ user.fields<br/>                                                                                                                                                                                      |
| [`/2/users/:id`](https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-id)                                     | `getUser`             | ❌ expansions<br/> ❌ tweet.fields<br/> ❌ user.fields<br/>                                                                                                                                                                                                  |
| [`/2/users/by`](https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by)                                      | `listUsersByUsername` | ❌ expansions<br/> ❌ tweet.fields<br/> ❌ user.fields<br/> ❌ usernames<br/>                                                                                                                                                                                |
| [`/2/users/by/username/:username`](https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by-username-username) | `getUserByUsername`   | ❌ expansions<br/> ❌ tweet.fields<br/> ❌ user.fields<br/>                                                                                                                                                                                                  |
