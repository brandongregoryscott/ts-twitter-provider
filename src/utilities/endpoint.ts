// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

/** @hidden */
const Endpoint = {
    tweet(id: string): string {
        return `tweets/${id}`;
    },
    tweets(): string {
        return "tweets";
    },
    user(id: string): string {
        return `users/${id}`;
    },
    usersBy(): string {
        return "users/by";
    },
    userByUsername(username: string): string {
        return `users/by/username/${username}`;
    },
    userMentions(id: string): string {
        return `users/${id}/mentions`;
    },
    userTweets(id: string): string {
        return `users/${id}/tweets`;
    },
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Endpoint };

// #endregion Exports
