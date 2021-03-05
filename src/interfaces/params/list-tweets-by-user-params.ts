import { RequestParameters } from "twitter-v2";
import { BaseParams, RawBaseParams } from "./base-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListTweetsByUserParams extends BaseParams {
    // end_time?: string;
    // exclude?: "retweets" | "replies";
    max_results?: number;
    pagination_token?: string;
    since_id?: string;
    // start_time?: string;
    until_id?: string;
    userId: string;
}

/**
 * Interface representing what the /users/:id/tweets endpoint expects directly
 */
interface RawListTweetsByUserParams extends RequestParameters, RawBaseParams {
    since_id: string;
    until_id: string;
    max_results: string;
    pagination_token: string;
    "place.fields"?: any;
    "user.fields"?: any;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListTweetsByUserParams, RawListTweetsByUserParams };

// #endregion Exports
