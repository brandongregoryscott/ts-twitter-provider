import { RequestParameters } from "twitter-v2";
import { ArrayOrCsv } from "../../types/array-or-csv";
import {
    RawTweetExpansionsParams,
    TweetExpansionsParams,
} from "./tweet-expansions-params";
import { RawTweetFieldsParams, TweetFieldsParams } from "./tweet-fields-params";
import {
    RawUserExpansionsParams,
    UserExpansionsParams,
} from "./user-expansion-params";
import { RawUserFieldsParams, UserFieldsParams } from "./user-fields-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListUsersByUsernameParams
    extends TweetFieldsParams,
        UserExpansionsParams,
        UserFieldsParams {
    usernames: ArrayOrCsv<string>;
}

/**
 * @hidden
 * Interface representing what the /users/by endpoint expects directly
 */
interface RawListUsersByUsernameParams
    extends RequestParameters,
        RawTweetFieldsParams,
        RawUserExpansionsParams,
        RawUserFieldsParams {
    usernames: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListUsersByUsernameParams, RawListUsersByUsernameParams };

// #endregion Exports
