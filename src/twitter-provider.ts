import { ListTweetsParams } from "./interfaces/params/list-tweets-params";
import { Tweet } from "./interfaces/tweets/tweet";
import Twitter from "twitter-v2";
import { TweetParamMapper } from "./utilities/tweet-param-mapper";
import { TwitterResponse } from "./interfaces/twitter-response";
import { Endpoint } from "./utilities/endpoint";
import { ListTweetsByUserParams } from "./interfaces/params/list-tweets-by-user-params";
import { ListMentionsByUserParams } from "./interfaces/params/list-mentions-by-user-params";
import { GetTweetParams } from "./interfaces/params/get-tweet-params";
import { User } from "./interfaces/users/user";
import { GetUserParams } from "./interfaces/params/get-user-params";
import { UserParamMapper } from "./utilities/user-param-mapper";
import { GetUserByUsernameParams } from "./interfaces/params/get-user-by-username-params";
import { ListTweetsByUsernameParams } from "./interfaces/params/list-tweets-by-username-params";
import { CredentialsArgs } from "twitter-v2/build/Credentials";
import { ListUsersByUsernameParams } from "./interfaces/params/list-users-by-username";

class TwitterProvider {
    // -----------------------------------------------------------------------------------------
    // #region Public Members
    // -----------------------------------------------------------------------------------------

    /**
     * Reference to the underlying Twitter client if direct access is required
     */
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

    /**
     * Get a single tweet by id
     */
    public getTweet = (
        params: GetTweetParams
    ): Promise<TwitterResponse<Tweet | undefined>> =>
        this.client.get(
            Endpoint.tweet(params.id),
            TweetParamMapper.toGetTweetParams(params)
        );

    /**
     * Get a single user by id
     */
    public getUser = (
        params: GetUserParams
    ): Promise<TwitterResponse<User | undefined>> =>
        this.client.get(
            Endpoint.user(params.id),
            UserParamMapper.toGetUserParams(params)
        );

    /**
     * Get a single user by username
     */
    public getUserByUsername = (
        params: GetUserByUsernameParams
    ): Promise<TwitterResponse<User | undefined>> =>
        this.client.get(
            Endpoint.userByUsername(params.username),
            UserParamMapper.toGetUserByUsernameParams(params)
        );

    /**
     * List mentions by given id
     */
    public listMentionsByUser = (
        params: ListMentionsByUserParams
    ): Promise<TwitterResponse<Tweet[]>> =>
        this.client.get(
            Endpoint.userMentions(params.id),
            TweetParamMapper.toListMentionsByUserParams(params)
        );

    /**
     * List tweets by given id(s)
     */
    public listTweets = (
        params: ListTweetsParams
    ): Promise<TwitterResponse<Tweet[]>> =>
        this.client.get(
            Endpoint.tweets(),
            TweetParamMapper.toListTweetsParams(params)
        );

    /**
     * List tweets by given user id
     */
    public listTweetsByUser = (
        params: ListTweetsByUserParams
    ): Promise<TwitterResponse<Tweet[]>> =>
        this.client.get(
            Endpoint.userTweets(params.id),
            TweetParamMapper.toListTweetsByUserParams(params)
        );

    /**
     * List tweets by given username
     */
    public listTweetsByUsername = async (
        params: ListTweetsByUsernameParams
    ): Promise<TwitterResponse<Tweet[]>> => {
        const { username } = params;
        const { data: user } = await this.getUserByUsername({ username });

        if (user == null) {
            throw new Error(`User '${username}' not found.`);
        }

        const { id } = user;
        return this.listTweetsByUser({ ...params, id });
    };

    /**
     * List users by given id(s)
     */
    public listUsersByUsername = async (
        params: ListUsersByUsernameParams
    ): Promise<TwitterResponse<User>> =>
        this.client.get(
            Endpoint.usersBy(),
            UserParamMapper.toListUsersByUsernameParams(params)
        );

    // #endregion Public Methods
}

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TwitterProvider };

// #endregion Exports
