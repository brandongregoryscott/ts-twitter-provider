import { RequestParameters } from "twitter-v2";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface TimeFilterParams {
    end_time?: string | Date;
    start_time?: string | Date;
}

/** @hidden */
interface RawTimeFilterParams extends RequestParameters {
    end_time: string;
    start_time: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TimeFilterParams, RawTimeFilterParams };

// #endregion Exports
