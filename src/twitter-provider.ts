import { ListTweetsParams } from "./interfaces/params/list-tweets-params";
import { Tweet } from "./interfaces/tweets/tweet";
import Twitter from "twitter-v2";
import { TwitterResponse } from "./interfaces/twitter-response";
import { ListTweetsByUserParams } from "./interfaces/params/list-tweets-by-user-params";
import { ListMentionsByUserParams } from "./interfaces/params/list-mentions-by-user-params";
import { GetTweetParams } from "./interfaces/params/get-tweet-params";
import { User } from "./interfaces/users/user";
import { GetUserParams } from "./interfaces/params/get-user-params";
import { GetUserByUsernameParams } from "./interfaces/params/get-user-by-username-params";
import { ListTweetsByUsernameParams } from "./interfaces/params/list-tweets-by-username-params";
import { CredentialsArgs } from "twitter-v2/build/Credentials";
import { ListUsersByUsernameParams } from "./interfaces/params/list-users-by-username";
import { ListUsersParams } from "./interfaces/params/list-users-params";
import { TwitterProvider as TwitterProviderInterface } from "./interfaces/twitter-provider";
import { UserProvider } from "./user-provider";
import { TweetProvider } from "./tweet-provider";

class TwitterProvider implements TwitterProviderInterface {
    // -----------------------------------------------------------------------------------------
    // #region Public Members
    // -----------------------------------------------------------------------------------------

    /**
     * Reference to the underlying Twitter client if direct access is required
     */
    public readonly client: Twitter;

    // #endregion Public Members

    // -----------------------------------------------------------------------------------------
    // #region Private Members
    // -----------------------------------------------------------------------------------------

    private readonly tweetProvider: TweetProvider;
    private readonly userProvider: UserProvider;

    // #endregion Private Members

    // -----------------------------------------------------------------------------------------
    // #region Constructor
    // -----------------------------------------------------------------------------------------

    constructor(credentials: CredentialsArgs) {
        this.client = new Twitter(credentials);
        this.userProvider = new UserProvider(credentials);
        this.tweetProvider = new TweetProvider(credentials);
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
        this.tweetProvider.getTweet(params);

    /**
     * Get a single user by id
     */
    public getUser = (
        params: GetUserParams
    ): Promise<TwitterResponse<User | undefined>> =>
        this.userProvider.getUser(params);

    /**
     * Get a single user by username
     */
    public getUserByUsername = (
        params: GetUserByUsernameParams
    ): Promise<TwitterResponse<User | undefined>> =>
        this.userProvider.getUserByUsername(params);

    /**
     * List mentions by given user id
     */
    public listMentionsByUser = (
        params: ListMentionsByUserParams
    ): Promise<TwitterResponse<Tweet[]>> =>
        this.tweetProvider.listMentionsByUser(params);

    /**
     * List tweets by given id(s)
     */
    public listTweets = (
        params: ListTweetsParams
    ): Promise<TwitterResponse<Tweet[]>> =>
        this.tweetProvider.listTweets(params);

    /**
     * List tweets by given user id
     */
    public listTweetsByUser = (
        params: ListTweetsByUserParams
    ): Promise<TwitterResponse<Tweet[]>> =>
        this.tweetProvider.listTweetsByUser(params);

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
     * List users by given username(s)
     */
    public listUsersByUsername = (
        params: ListUsersByUsernameParams
    ): Promise<TwitterResponse<User[]>> =>
        this.userProvider.listUsersByUsername(params);

    /**
     * List users by given id(s)
     */
    public listUsers = (
        params: ListUsersParams
    ): Promise<TwitterResponse<User[]>> => this.userProvider.listUsers(params);

    // #endregion Public Methods
}

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TwitterProvider };

// #endregion Exports
