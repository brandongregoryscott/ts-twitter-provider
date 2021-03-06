# ts-twitter-provider

[![v2](https://img.shields.io/endpoint?url=https%3A%2F%2Ftwbadges.glitch.me%2Fbadges%2Fv2)](https://developer.twitter.com/en/docs/twitter-api)
![build status](https://github.com/brandongregoryscott/ts-twitter-provider/actions/workflows/build.yaml/badge.svg)
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

From there you can import the main class, `TwitterProvider`, and related types.

```typescript
import { TwitterProvider, Tweet } from "ts-twtter-provider";

// Instantiate a TwitterProvider using API key values from the environment or other configuration location
const provider = new TwitterProvider({
    consumer_key: process.env.CONSUMER_KEY!,
    consumer_secret: process.env.CONSUMER_SECRET!,
});

// Somewhere in an async function...
const response = await provider.listTweetsByUser({
    id: "953649053631434752",
});

const tweets: Tweet[] = response.data;
```

Full documentation can be found on the [GitHub Pages site](https://brandongregoryscott.github.io/ts-twitter-provider) for this repo.

### Features

### Automatic expansions when required

This package adds an additional 'safe-guard' for interacting with the Twitter V2 endpoints and their parameters. For example, when requesting [`MediaFields`](https://brandongregoryscott.github.io/ts-twitter-provider/enums/mediafields.html) values such as `height`, `preview_image_url`, etc., you would normally need to pass [`TweetExpansions.AttachmentsMediaKeys`](https://brandongregoryscott.github.io/ts-twitter-provider/enums/tweetexpansions.html#attachmentsmediakeys) to expand the media object. By preprocessing the params that you request, each request that requires a specific `expansions` value to be passed along will be automatically added if not provided.

```ts
const response = await provider.getTweet({
    id,
    expansions: undefined, // <-- Despite not specifying TweetExpansions.AttachmentMediaKeys, it will be added to the request
    mediaFields: [MediaFields.Height, MediaFields.Type, MediaFields.Width],
});
```

### Additional utility functions

There are certain endpoints that consumers might benefit from that do not exist in the Twitter V2 API.
For example, there is no single endpoint to retrieve tweets from a specific user by their username.
By wrapping up API calls to `users/by/username/:username` and `users/:id/tweets`, we can easily
expose a function that does this work for you - supply a username, get that user's tweets!

```ts
// Somewhere in an async function...
const { data: tweets } = await provider.listTweetsByUsername({
    username: "TwitterDev",
});
```

## Supported API

Below is a table of the currently supported API endpoints and methods available from the `TwitterProvider`. If you don't see a method/endpoint implemented yet, please check the open [issues](https://github.com/brandongregoryscott/ts-twitter-provider/issues) or open a new one.

<details>
<summary>Click to expand table</summary>

| Endpoint                                                                                                                                        | Method                                                                                                                              | Params                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`/2/tweets`](https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets)                                         | [`listTweets`](https://brandongregoryscott.github.io/ts-twitter-provider/classes/twitterprovider.html#listtweets)                   | ✅ expansions<br/> ✅ ids<br/> ✅ media.fields<br/> ✅ place.fields<br/> ✅ poll.fields<br/> ✅ tweet.fields<br/> ✅ user.fields                                                                                                                             |
| [`/2/tweets/:id`](https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets-id)                                  | [`getTweet`](https://brandongregoryscott.github.io/ts-twitter-provider/classes/twitterprovider.html#gettweet)                       | ✅ expansions<br/> ✅ media.fields<br/> ✅ place.fields<br/> ✅ poll.fields<br/> ✅ tweet.fields<br/> ✅ user.fields                                                                                                                                         |
| [`/2/users/:id/tweets`](https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets)                   | [`listTweetsByUser`](https://brandongregoryscott.github.io/ts-twitter-provider/classes/twitterprovider.html#listtweetsbyuser)       | ✅ end_time<br/> ✅ exclude<br/> ✅ expansions<br/> ✅ max_results<br/> ✅ media.fields<br/> ✅ pagination_token<br/> ✅ place.fields<br/> ✅ poll.fields<br/> ✅ since_id<br/> ✅ start_time<br/> ✅ tweet.fields<br/> ✅ until_id<br/> ✅ user.fields<br/> |
| [`/2/users/:id/mentions`](https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-mentions)               | [`listMentionsByUser`](https://brandongregoryscott.github.io/ts-twitter-provider/classes/twitterprovider.html#listmentionsbyuser)   | ✅ end_time<br/> ✅ exclude<br/> ✅ expansions<br/> ✅ max_results<br/> ✅ media.fields<br/> ✅ pagination_token<br/> ✅ place.fields<br/> ✅ poll.fields<br/> ✅ since_id<br/> ✅ start_time<br/> ✅ tweet.fields<br/> ✅ until_id<br/> ✅ user.fields<br/> |
| [`/2/users`](https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users)                                            | [`listUsers`](https://brandongregoryscott.github.io/ts-twitter-provider/classes/twitterprovider.html#listusers)                     | ✅ expansions<br/> ✅ ids<br/> ✅ tweet.fields<br/> ✅ user.fields<br/>                                                                                                                                                                                      |
| [`/2/users/:id`](https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-id)                                     | [`getUser`](https://brandongregoryscott.github.io/ts-twitter-provider/classes/twitterprovider.html#getuser)                         | ✅ expansions<br/> ✅ tweet.fields<br/> ✅ user.fields<br/>                                                                                                                                                                                                  |
| [`/2/users/by`](https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by)                                      | [`listUsersByUsername`](https://brandongregoryscott.github.io/ts-twitter-provider/classes/twitterprovider.html#listusersbyusername) | ✅ expansions<br/> ✅ tweet.fields<br/> ✅ user.fields<br/> ✅ usernames<br/>                                                                                                                                                                                |
| [`/2/users/by/username/:username`](https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by-username-username) | [`getUserByUsername`](https://brandongregoryscott.github.io/ts-twitter-provider/classes/twitterprovider.html#getuserbyusername)     | ✅ expansions<br/> ✅ tweet.fields<br/> ✅ user.fields<br/>                                                                                                                                                                                                  |

</details>
