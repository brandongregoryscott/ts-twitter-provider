import { RequestParameters } from "twitter-v2";
import { BaseParams, RawBaseParams } from "./base-params";
import { ExcludeParams, RawExcludeParams } from "./exclude-params";
import { IdFilterParams, RawIdFilterParams } from "./id-filter-params";
import { PagingParams, RawPagingParams } from "./paging-params";
import { RawTimeFilterParams, TimeFilterParams } from "./time-filter-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListTweetsByUserParams
    extends BaseParams,
        ExcludeParams,
        TimeFilterParams,
        IdFilterParams,
        PagingParams {
    id: string;
}

/**
 * @hidden
 * Interface representing what the /users/:id/tweets endpoint expects directly
 */
interface RawListTweetsByUserParams
    extends RequestParameters,
        RawBaseParams,
        RawExcludeParams,
        RawTimeFilterParams,
        RawIdFilterParams,
        RawPagingParams {}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListTweetsByUserParams, RawListTweetsByUserParams };

// #endregion Exports
