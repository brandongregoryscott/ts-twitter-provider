import { RequestParameters } from "twitter-v2";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface PagingParams {
    max_results?: number;
    pagination_token?: string;
}

/** @hidden */
interface RawPagingParams extends RequestParameters {
    max_results: string;
    pagination_token: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { PagingParams, RawPagingParams };

// #endregion Exports
