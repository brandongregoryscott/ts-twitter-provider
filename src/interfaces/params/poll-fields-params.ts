import { PollFields } from "../../enums/poll-fields";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface PollFieldsParams {
    pollFields?: PollFields[];
}

/** @hidden */
interface RawPollFieldsParams {
    "poll.fields": string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { PollFieldsParams, RawPollFieldsParams };

// #endregion Exports
