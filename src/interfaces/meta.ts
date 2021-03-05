// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface Meta {
    meta?: {
        newest_id: string;
        next_token: string;
        oldest_id: string;
        previous_token?: string;
        result_count: number;
    };
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Meta };

// #endregion Exports