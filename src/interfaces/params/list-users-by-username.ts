import { RequestParameters } from "twitter-v2";
import { ArrayOrCsv } from "../../types/array-or-csv";
import {
    RawTweetExpansionsParams,
    TweetExpansionsParams,
} from "./tweet-expansions-params";
import { RawTweetFieldsParams, TweetFieldsParams } from "./tweet-fields-params";
import { RawUserFieldsParams, UserFieldsParams } from "./user-fields-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListUsersByUsernameParams
    extends UserFieldsParams,
        TweetFieldsParams,
        TweetExpansionsParams {
    usernames: ArrayOrCsv<string>;
}

/**
 * @hidden
 * Interface representing what the /users/by endpoint expects directly
 */
interface RawListUsersByUsernameParams
    extends RequestParameters,
        RawUserFieldsParams,
        RawTweetFieldsParams,
        RawTweetExpansionsParams {
    usernames: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListUsersByUsernameParams, RawListUsersByUsernameParams };

// #endregion Exports
