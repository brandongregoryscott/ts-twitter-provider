import { PollOption } from "./poll-option";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface Poll {
    id: string;
    options: PollOption[];
    duration_minutes: number;
    end_datetime: string;
    voting_status: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Poll };

// #endregion Exports
