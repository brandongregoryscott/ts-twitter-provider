import { RequestParameters } from "twitter-v2";
import { BaseParams, RawBaseParams } from "./base-params";
import { ExcludeParams, RawExcludeParams } from "./exclude-params";
import { IdFilterParams, RawIdFilterParams } from "./id-filter-params";
import { PagingParams, RawPagingParams } from "./paging-params";
import { RawTimeFilterParams, TimeFilterParams } from "./time-filter-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListMentionsByUserParams
    extends BaseParams,
        ExcludeParams,
        TimeFilterParams,
        IdFilterParams,
        PagingParams {
    userId: string;
}

/**
 * @hidden
 * Interface representing what the /users/:id/mentions endpoint expects directly
 */
interface RawListMentionsByUserParams
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

export { ListMentionsByUserParams, RawListMentionsByUserParams };

// #endregion Exports
