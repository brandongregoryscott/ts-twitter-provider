import { Endpoint } from "./enums/endpoint";
import { ListTweetsParams } from "./interfaces/tweets/list-tweets-params";
import { Tweet } from "./interfaces/tweets/tweet";
// @ts-expect-error
import Twitter from "twitter-v2";
import { ParamMapper } from "./utilities/param-mapper";
import { TwitterResponse } from "./interfaces/twitter-response";
import { Credentials } from "./interfaces/credentials";

class TwitterProvider {
    // -----------------------------------------------------------------------------------------
    // #region Public Members
    // -----------------------------------------------------------------------------------------

    /**
     * Reference to the underlying Twitter client if direct access is required
     *
     * @type {Twitter}
     * @memberof TwitterProvider
     */
    public readonly client: Twitter;

    // #endregion Public Members

    // -----------------------------------------------------------------------------------------
    // #region Constructor
    // -----------------------------------------------------------------------------------------

    constructor(credentials: Credentials) {
        this.client = new Twitter(credentials);
    }

    // #endregion Constructor

    // -----------------------------------------------------------------------------------------
    // #region Public Methods
    // -----------------------------------------------------------------------------------------

    public getTweets(
        params: ListTweetsParams
    ): Promise<TwitterResponse<Tweet[]>> {
        return this.client.get(
            Endpoint.Tweets,
            ParamMapper.mapListTweetParams(params)
        );
    }

    // #endregion Public Methods
}

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TwitterProvider };

// #endregion Exports
