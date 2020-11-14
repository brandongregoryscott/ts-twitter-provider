// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface Tweet {
    id: string;
    text: string;

    created_at?: string;
    author_id?: string;
    conversation_id?: string;
    in_reply_to_user_id?: string;
    referenced_tweets?: Tweet[];
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Tweet };

// #endregion Exports
