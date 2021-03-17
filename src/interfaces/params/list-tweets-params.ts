import { RequestParameters } from "twitter-v2";
import { ArrayOrCsv } from "../../types/array-or-csv";
import { BaseParams, RawBaseParams } from "./base-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListTweetsParams extends BaseParams {
    ids: ArrayOrCsv<string>;
}

/**
 * @hidden
 * Interface representing what the /tweets endpoint expects directly
 */
interface RawListTweetsParams extends RequestParameters, RawBaseParams {
    ids: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListTweetsParams, RawListTweetsParams };

// #endregion Exports
