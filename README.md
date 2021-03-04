# ts-twitter-provider

[![Build Status](https://travis-ci.org/brandongregoryscott/ts-twitter-provider.svg?branch=main)](https://travis-ci.org/brandongregoryscott/ts-twitter-provider)
[![codecov](https://codecov.io/gh/brandongregoryscott/ts-twitter-provider/branch/main/graph/badge.svg)](https://codecov.io/gh/brandongregoryscott/ts-twitter-provider)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A typed wrapper around the Twitter V2 API

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

| Endpoint                                                                                                                      | Method             | Params                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`/2/tweets`](https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets)                       | `listTweets`       | ✅ expansions <br/> ✅ ids <br/> ✅ media.fields <br/> ❌ place.fields <br/> ✅ poll.fields <br/> ✅ tweet.fields <br/> ❌ user.fields                                                                                                                                    |
| [`/2/users/:id/tweets`](https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets) | `listTweetsByUser` | ❌ end_time<br /> ❌ exclude<br /> ✅ expansions<br /> ❌ max_results<br /> ✅ media.fields<br /> ❌ pagination_token<br /> ❌ place.fields<br /> ✅ poll.fields<br /> ❌ since_id<br /> ❌ start_time<br /> ✅ tweet.fields<br /> ❌ until_id<br /> ❌ user.fields<br /> |
