// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

/** @hidden */
const Endpoint = {
    tweet(id: string) {
        return `tweets/${id}`;
    },
    tweets() {
        return "tweets";
    },
    user(id: string) {
        return `users/${id}`;
    },
    userByUsername(username: string) {
        return `users/by/username/${username}`;
    },
    userMentions(userId: string) {
        return `users/${userId}/mentions`;
    },
    userTweets(userId: string) {
        return `users/${userId}/tweets`;
    },
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Endpoint };

// #endregion Exports
