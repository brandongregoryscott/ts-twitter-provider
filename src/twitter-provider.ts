import { ListTweetsParams } from "./interfaces/params/list-tweets-params";
import { Tweet } from "./interfaces/tweets/tweet";
import Twitter from "twitter-v2";
import { ParamMapper } from "./utilities/param-mapper";
import { TwitterResponse } from "./interfaces/twitter-response";
import { CredentialsArgs } from "twitter-v2/src/Credentials";
import { Endpoint } from "./utilities/endpoint";
import { ListTweetsByUserParams } from "./interfaces/params/list-tweets-by-user-params";
import { ListMentionsByUserParams } from "./interfaces/params/list-mentions-by-user-params";
import { GetTweetParams } from "./interfaces/params/get-tweet-params";

class TwitterProvider {
    // -----------------------------------------------------------------------------------------
    // #region Public Members
    // -----------------------------------------------------------------------------------------

    /**
     * Reference to the underlying Twitter client if direct access is required
     */
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
            ParamMapper.toGetTweetParams(params)
        );

    /**
     * List mentions by given userId
     */
    public listMentionsByUser = (
        params: ListMentionsByUserParams
    ): Promise<TwitterResponse<Tweet[]>> =>
        this.client.get(
            Endpoint.userMentions(params.userId),
            ParamMapper.toListMentionsByUserParams(params)
        );

    /**
     * List tweets by given id(s)
     */
    public listTweets = (
        params: ListTweetsParams
    ): Promise<TwitterResponse<Tweet[]>> =>
        this.client.get(
            Endpoint.tweets(),
            ParamMapper.toListTweetsParams(params)
        );

    /**
     * List tweets by given userId
     */
    public listTweetsByUser = (
        params: ListTweetsByUserParams
    ): Promise<TwitterResponse<Tweet[]>> =>
        this.client.get(
            Endpoint.userTweets(params.userId),
            ParamMapper.toListTweetsByUserParams(params)
        );

    // #endregion Public Methods
}

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TwitterProvider };

// #endregion Exports
