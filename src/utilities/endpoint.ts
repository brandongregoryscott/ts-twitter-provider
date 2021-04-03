// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

const Endpoint = {
    tweet(id: string) {
        return `tweets/${id}`;
    },
    tweets() {
        return "tweets";
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
