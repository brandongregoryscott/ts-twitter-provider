import { RequestParameters } from "twitter-v2";
import { BaseParams, RawBaseParams } from "./base-params";
import { ExcludeParams, RawExcludeParams } from "./exclude-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListMentionsByUserParams extends BaseParams, ExcludeParams {
    userId: string;
    end_time?: string | Date;
    start_time?: string | Date;
}

/**
 * Interface representing what the /users/:id/mentions endpoint expects directly
 */
interface RawListMentionsByUserParams
    extends RequestParameters,
        RawBaseParams,
        RawExcludeParams {
    end_time: string;
    start_time: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListMentionsByUserParams, RawListMentionsByUserParams };

// #endregion Exports
