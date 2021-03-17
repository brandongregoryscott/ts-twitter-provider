import { RequestParameters } from "twitter-v2";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface IdFilterParams {
    since_id?: string;
    until_id?: string;
}

/** @hidden */
interface RawIdFilterParams extends RequestParameters {
    since_id: string;
    until_id: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { IdFilterParams, RawIdFilterParams };

// #endregion Exports
