// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface Tweet {
    author_id?: string;
    conversation_id?: string;
    created_at?: string;
    id: string;
    in_reply_to_user_id?: string;
    referenced_tweets?: Tweet[];
    text: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Tweet };

// #endregion Exports
