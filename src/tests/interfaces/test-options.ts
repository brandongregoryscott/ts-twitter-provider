import { Tweet } from "../../interfaces/tweets/tweet";
import { TwitterResponse } from "../../interfaces/twitter-response";
import { TwitterProvider } from "../../twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface TestOptions<TParams> {
    name?: string;
    method: (
        sut: TwitterProvider
    ) => (params: TParams) => Promise<TwitterResponse<Tweet[]>>;
    params: TParams;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TestOptions };

// #endregion Exports
