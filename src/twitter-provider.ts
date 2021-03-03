import { ListTweetsParams } from "./interfaces/params/list-tweets-params";
import { Tweet } from "./interfaces/tweets/tweet";
import Twitter from "twitter-v2";
import { ParamMapper } from "./utilities/param-mapper";
import { TwitterResponse } from "./interfaces/twitter-response";
import { CredentialsArgs } from "twitter-v2/src/Credentials";
import { Endpoint } from "./utilities/endpoint";
import { ListTweetsByUserParams } from "./interfaces/params/list-tweets-by-user-params";
import { Includes } from "./interfaces/includes";

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

    /**
     * List tweets by given id(s)
     */
    public listTweets(
        params: ListTweetsParams
    ): Promise<TwitterResponse<Tweet[]> & Includes> {
        return this.client.get(
            Endpoint.tweets(),
            ParamMapper.toListTweetsParams(params)
        );
    }

    /**
     * List tweets by given userId
     */
    public listTweetsByUser(
        params: ListTweetsByUserParams
    ): Promise<TwitterResponse<Tweet[]> & Includes> {
        return this.client.get(
            Endpoint.userTweets(params.userId),
            ParamMapper.toListTweetsByUserParams(params)
        );
    }

    // #endregion Public Methods
}

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TwitterProvider };

// #endregion Exports
