import { RequestParameters } from "twitter-v2";
import { BaseParams, RawBaseParams } from "./base-params";

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
