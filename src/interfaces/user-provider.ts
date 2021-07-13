import { GetUserByUsernameParams } from "./params/get-user-by-username-params";
import { GetUserParams } from "./params/get-user-params";
import { ListUsersByUsernameParams } from "./params/list-users-by-username";
import { ListUsersParams } from "./params/list-users-params";
import { Provider } from "./provider";
import { TwitterResponse } from "./twitter-response";
import { User } from "./users/user";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface UserProvider extends Provider {
    /**
     * Get a single user by id
     */
    getUser(params: GetUserParams): Promise<TwitterResponse<User | undefined>>;

    /**
     * Get a single user by username
     */
    getUserByUsername(
        params: GetUserByUsernameParams
    ): Promise<TwitterResponse<User | undefined>>;

    /**
     * List users by given username(s)
     */
    listUsersByUsername(
        params: ListUsersByUsernameParams
    ): Promise<TwitterResponse<User[]>>;

    /**
     * List users by given id(s)
     */
    listUsers(params: ListUsersParams): Promise<TwitterResponse<User[]>>;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { UserProvider };

// #endregion Exports
