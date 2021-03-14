import { RequestParameters } from "twitter-v2";
import { BaseParams, RawBaseParams } from "./base-params";
import { ExcludeParams, RawExcludeParams } from "./exclude-params";
import { RawTimeFilterParams, TimeFilterParams } from "./time-filter-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListMentionsByUserParams
    extends BaseParams,
        ExcludeParams,
        TimeFilterParams {
    userId: string;
}

/**
 * Interface representing what the /users/:id/mentions endpoint expects directly
 */
interface RawListMentionsByUserParams
    extends RequestParameters,
        RawBaseParams,
        RawExcludeParams,
        RawTimeFilterParams {}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListMentionsByUserParams, RawListMentionsByUserParams };

// #endregion Exports
