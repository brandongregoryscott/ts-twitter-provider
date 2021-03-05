import { RequestParameters } from "twitter-v2";
import { BaseParams, RawBaseParams } from "./base-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListTweetsByUserParams extends BaseParams {
    end_time?: string | Date;
    // exclude?: "retweets" | "replies";
    max_results?: number;
    pagination_token?: string;
    since_id?: string;
    start_time?: string | Date;
    until_id?: string;
    userId: string;
}

/**
 * Interface representing what the /users/:id/tweets endpoint expects directly
 */
interface RawListTweetsByUserParams extends RequestParameters, RawBaseParams {
    end_time: string;
    max_results: string;
    pagination_token: string;
    since_id: string;
    start_time: string;
    until_id: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListTweetsByUserParams, RawListTweetsByUserParams };

// #endregion Exports
