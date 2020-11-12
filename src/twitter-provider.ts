import Twitter, { Credentials, CredentialsConstructorArgs } from "twitter-v2";
import { Endpoint } from "./enums/endpoint";
import { ListTweetsParams } from "./interfaces/tweets/list-tweets-params";
import { TwitterResponse } from "./interfaces/twitter-response";
import { Tweet } from "./interfaces/tweets/tweet";

class TwitterProvider {
    private _client: Twitter;

    constructor(credentials: CredentialsConstructorArgs) {
        this._client = new Twitter(credentials);
    }

    public getTweets(
        params: ListTweetsParams
    ): Promise<TwitterResponse<Tweet[]>> {
        return this._client.get(Endpoint.Tweets, params);
    }
}

export { TwitterProvider };
