import { UserExpansions } from "../../enums/user-expansions";
import { ArrayOrCsv } from "../../types/array-or-csv";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface UserExpansionsParams {
    expansions?: ArrayOrCsv<UserExpansions>;
}

/** @hidden */
interface RawUserExpansionsParams {
    expansions: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { UserExpansionsParams, RawUserExpansionsParams };

// #endregion Exports
