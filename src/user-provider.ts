import Twitter from "twitter-v2";
import { CredentialsArgs } from "twitter-v2/build/Credentials";
import { GetUserByUsernameParams } from "./interfaces/params/get-user-by-username-params";
import { GetUserParams } from "./interfaces/params/get-user-params";
import { ListUsersByUsernameParams } from "./interfaces/params/list-users-by-username";
import { ListUsersParams } from "./interfaces/params/list-users-params";
import { TwitterResponse } from "./interfaces/twitter-response";
import { UserProvider as UserProviderInterface } from "./interfaces/user-provider";
import { User } from "./interfaces/users/user";
import { Endpoint } from "./utilities/endpoint";
import { UserParamMapper } from "./utilities/user-param-mapper";

class UserProvider implements UserProviderInterface {
    // -----------------------------------------------------------------------------------------
    // #region Public Members
    // -----------------------------------------------------------------------------------------

    public readonly client: Twitter;

    // #endregion Public Members

    // -----------------------------------------------------------------------------------------
    // #region Constructor
    // -----------------------------------------------------------------------------------------

    constructor(credentials: CredentialsArgs) {
        this.client = new Twitter(credentials);
    }

    // #endregion Constructor

    // -----------------------------------------------------------------------------------------
    // #region Public Methods
    // -----------------------------------------------------------------------------------------

    public getUser = (
        params: GetUserParams
    ): Promise<TwitterResponse<User | undefined>> =>
        this.client.get(
            Endpoint.user(params.id),
            UserParamMapper.toGetUserParams(params)
        );

    public getUserByUsername = (
        params: GetUserByUsernameParams
    ): Promise<TwitterResponse<User | undefined>> =>
        this.client.get(
            Endpoint.userByUsername(params.username),
            UserParamMapper.toGetUserByUsernameParams(params)
        );

    public listUsersByUsername = async (
        params: ListUsersByUsernameParams
    ): Promise<TwitterResponse<User[]>> =>
        this.client.get(
            Endpoint.usersBy(),
            UserParamMapper.toListUsersByUsernameParams(params)
        );

    public listUsers = async (
        params: ListUsersParams
    ): Promise<TwitterResponse<User[]>> =>
        this.client.get(
            Endpoint.users(),
            UserParamMapper.toListUsersParams(params)
        );

    // #endregion Public Methods
}

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { UserProvider };

// #endregion Exports
