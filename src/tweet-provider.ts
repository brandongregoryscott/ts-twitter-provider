import Twitter from "twitter-v2";
import { CredentialsArgs } from "twitter-v2/build/Credentials";
import { TwitterResponse } from "./interfaces/twitter-response";
import { TweetProvider as TweetProviderInterface } from "./interfaces/tweet-provider";
import { Endpoint } from "./utilities/endpoint";
import { GetTweetParams } from "./interfaces/params/get-tweet-params";
import { Tweet } from "./interfaces/tweets/tweet";
import { TweetParamMapper } from "./utilities/tweet-param-mapper";
import { ListMentionsByUserParams } from "./interfaces/params/list-mentions-by-user-params";
import { ListTweetsByUserParams } from "./interfaces/params/list-tweets-by-user-params";
import { ListTweetsParams } from "./interfaces/params/list-tweets-params";

class TweetProvider implements TweetProviderInterface {
    // -----------------------------------------------------------------------------------------
    // #region Public Members
    // -----------------------------------------------------------------------------------------

    public readonly client: Twitter;

    // #endregion Public Members

    // -----------------------------------------------------------------------------------------
    // #region Constructor
    // -----------------------------------------------------------------------------------------

    constructor(credentials: CredentialsArgs) {
        this.client = new Twitter(credentials);
    }

    // #endregion Constructor

    // -----------------------------------------------------------------------------------------
    // #region Public Methods
    // -----------------------------------------------------------------------------------------

    public getTweet = (
        params: GetTweetParams
    ): Promise<TwitterResponse<Tweet | undefined>> =>
        this.client.get(
            Endpoint.tweet(params.id),
            TweetParamMapper.toGetTweetParams(params)
        );

    public listMentionsByUser = (
        params: ListMentionsByUserParams
    ): Promise<TwitterResponse<Tweet[]>> =>
        this.client.get(
            Endpoint.userMentions(params.id),
            TweetParamMapper.toListMentionsByUserParams(params)
        );

    public listTweets = (
        params: ListTweetsParams
    ): Promise<TwitterResponse<Tweet[]>> =>
        this.client.get(
            Endpoint.tweets(),
            TweetParamMapper.toListTweetsParams(params)
        );

    public listTweetsByUser = (
        params: ListTweetsByUserParams
    ): Promise<TwitterResponse<Tweet[]>> =>
        this.client.get(
            Endpoint.userTweets(params.id),
            TweetParamMapper.toListTweetsByUserParams(params)
        );

    // #endregion Public Methods
}

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TweetProvider };

// #endregion Exports
