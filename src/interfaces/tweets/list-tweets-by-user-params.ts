import { RequestParameters } from "twitter-v2";
import { MediaFieldsParams, RawMediaFieldsParams } from "./media-fields-params";
import {
    RawTweetExpansionsParams,
    TweetExpansionsParams,
} from "./tweet-expansions-params";
import { TweetFieldsParams, RawTweetFieldsParams } from "./tweet-fields-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListTweetsByUserParams
    extends TweetFieldsParams,
        TweetExpansionsParams,
        MediaFieldsParams {
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
        RawTweetFieldsParams,
        RawTweetExpansionsParams,
        RawMediaFieldsParams {
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
