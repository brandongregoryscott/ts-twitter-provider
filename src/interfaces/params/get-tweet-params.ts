import { RequestParameters } from "twitter-v2";
import { BaseParams, RawBaseParams } from "./base-params";
import { ExcludeParams, RawExcludeParams } from "./exclude-params";
import { IdFilterParams, RawIdFilterParams } from "./id-filter-params";
import { PagingParams, RawPagingParams } from "./paging-params";
import { RawTimeFilterParams, TimeFilterParams } from "./time-filter-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface GetTweetParams extends BaseParams {
    id: string;
}

/**
 * @hidden
 * Interface representing what the /tweets/:id endpoint expects directly
 */
interface RawGetTweetParams extends RequestParameters, RawBaseParams {
    id: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { GetTweetParams, RawGetTweetParams };

// #endregion Exports
