import {
    ListTweetsByUserParams,
    RawListTweetsByUserParams,
} from "./list-tweets-by-user-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListTweetsByUsernameParams
    extends Omit<ListTweetsByUserParams, "id"> {
    username: string;
}

/**
 * @hidden
 * Interface representing what the /users/:id/tweets endpoint expects directly
 */
interface RawListTweetsByUsernameParams extends RawListTweetsByUserParams {}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListTweetsByUsernameParams, RawListTweetsByUsernameParams };

// #endregion Exports
