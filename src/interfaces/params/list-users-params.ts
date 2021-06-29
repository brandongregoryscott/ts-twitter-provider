import { RequestParameters } from "twitter-v2";
import { ArrayOrCsv } from "../../types/array-or-csv";
import { RawTweetFieldsParams, TweetFieldsParams } from "./tweet-fields-params";
import {
    RawUserExpansionsParams,
    UserExpansionsParams,
} from "./user-expansion-params";
import { RawUserFieldsParams, UserFieldsParams } from "./user-fields-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListUsersParams
    extends TweetFieldsParams,
        UserExpansionsParams,
        UserFieldsParams {
    ids: ArrayOrCsv<string>;
}

/**
 * @hidden
 * Interface representing what the /users endpoint expects directly
 */
interface RawListUsersParams
    extends RequestParameters,
        RawTweetFieldsParams,
        RawUserExpansionsParams,
        RawUserFieldsParams {
    ids: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListUsersParams, RawListUsersParams };

// #endregion Exports
