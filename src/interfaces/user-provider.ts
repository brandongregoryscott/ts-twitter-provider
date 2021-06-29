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
    getUser(params: GetUserParams): Promise<TwitterResponse<User | undefined>>;

    getUserByUsername(
        params: GetUserByUsernameParams
    ): Promise<TwitterResponse<User | undefined>>;

    listUsersByUsername(
        params: ListUsersByUsernameParams
    ): Promise<TwitterResponse<User[]>>;

    listUsers(params: ListUsersParams): Promise<TwitterResponse<User[]>>;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { UserProvider };

// #endregion Exports
