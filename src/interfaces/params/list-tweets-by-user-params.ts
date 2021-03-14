import { RequestParameters } from "twitter-v2";
import { BaseParams, RawBaseParams } from "./base-params";
import { ExcludeParams, RawExcludeParams } from "./exclude-params";
import { RawTimeFilterParams, TimeFilterParams } from "./time-filter-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListTweetsByUserParams
    extends BaseParams,
        ExcludeParams,
        TimeFilterParams {
    max_results?: number;
    pagination_token?: string;
    since_id?: string;
    until_id?: string;
    userId: string;
}

/**
 * Interface representing what the /users/:id/tweets endpoint expects directly
 */
interface RawListTweetsByUserParams
    extends RequestParameters,
        RawBaseParams,
        RawExcludeParams,
        RawTimeFilterParams {
    max_results: string;
    pagination_token: string;
    since_id: string;
    until_id: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListTweetsByUserParams, RawListTweetsByUserParams };

// #endregion Exports
