import Twitter from "twitter-v2";
import { GetTweetParams } from "./params/get-tweet-params";
import { ListMentionsByUserParams } from "./params/list-mentions-by-user-params";
import { ListTweetsByUserParams } from "./params/list-tweets-by-user-params";
import { ListTweetsParams } from "./params/list-tweets-params";
import { Tweet } from "./tweets/tweet";
import { Provider } from "./provider";
import { TwitterResponse } from "./twitter-response";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface TweetProvider extends Provider {
    /**
     * Get a single tweet by id
     */
    getTweet(
        params: GetTweetParams
    ): Promise<TwitterResponse<Tweet | undefined>>;

    /**
     * List mentions by given user id
     */
    listMentionsByUser(
        params: ListMentionsByUserParams
    ): Promise<TwitterResponse<Tweet[]>>;

    /**
     * List tweets by given id(s)
     */
    listTweets(params: ListTweetsParams): Promise<TwitterResponse<Tweet[]>>;

    /**
     * List tweets by given user id
     */
    listTweetsByUser(
        params: ListTweetsByUserParams
    ): Promise<TwitterResponse<Tweet[]>>;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TweetProvider };

// #endregion Exports
