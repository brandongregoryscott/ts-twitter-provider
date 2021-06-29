// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

/** @hidden */
const Endpoint = {
    tweet: (id: string): string => `tweets/${id}`,
    tweets: (): string => "tweets",
    user: (id: string): string => `users/${id}`,
    users: (): string => "users",
    usersBy: (): string => "users/by",
    userByUsername: (username: string): string =>
        `users/by/username/${username}`,
    userMentions: (id: string): string => `users/${id}/mentions`,
    userTweets: (id: string): string => `users/${id}/tweets`,
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Endpoint };

// #endregion Exports
