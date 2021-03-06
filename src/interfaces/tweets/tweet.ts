import { Attachments } from "./attachments";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface Tweet {
    id: string;
    text: string;

    // Additional fields
    author_id?: string;
    attachments?: Attachments;
    conversation_id?: string;
    created_at?: string;
    geo?: object;
    in_reply_to_user_id?: string;
    lang?: string;
    referenced_tweets?: Tweet[];
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Tweet };

// #endregion Exports
