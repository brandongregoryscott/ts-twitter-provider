import { RequestParameters } from "twitter-v2";

import { TweetFieldsParams, RawTweetFieldsParams } from "./tweet-fields-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListTweetsByUserParams extends TweetFieldsParams {
    end_time?: string;
    exclude?: "retweets" | "replies";
    max_results?: number;
    pagination_token?: string;
    since_id?: string;
    start_time?: string;
    until_id?: string;
    userId: string;
}

/**
 * Interface representing what the /users/:id/tweets endpoint expects directly
 */
interface RawListTweetsByUserParams
    extends RequestParameters,
        RawTweetFieldsParams {
    "media.fields"?: any;
    "place.fields"?: any;
    "poll.fields"?: any;
    "user.fields"?: any;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListTweetsByUserParams, RawListTweetsByUserParams };

// #endregion Exports
