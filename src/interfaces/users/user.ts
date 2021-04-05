// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface User {
    id: string;
    name: string;
    username: string;

    // Additional fields
    created_at?: string;
    description?: string;
    entities?: object; // TODO
    location?: string;
    pinned_tweet_id?: string;
    profile_image_url?: string;
    protected?: boolean;
    public_metrics?: object; // TODO
    url?: string;
    verified?: boolean;
    withheld?: object; // TODO
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { User };

// #endregion Exports
