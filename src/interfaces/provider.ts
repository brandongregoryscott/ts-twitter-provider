import Twitter from "twitter-v2";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface Provider {
    /**
     * Reference to the underlying Twitter client if direct access is required
     */
    client: Twitter;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Provider };

// #endregion Exports
