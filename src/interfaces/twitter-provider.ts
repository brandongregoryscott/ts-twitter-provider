import { ListTweetsByUsernameParams } from "./params/list-tweets-by-username-params";
import { TweetProvider } from "./tweet-provider";
import { Tweet } from "./tweets/tweet";
import { Provider } from "./provider";
import { TwitterResponse } from "./twitter-response";
import { UserProvider } from "./user-provider";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface TwitterProvider extends Provider, TweetProvider, UserProvider {
    /**
     * List tweets by given username
     */
    listTweetsByUsername(
        params: ListTweetsByUsernameParams
    ): Promise<TwitterResponse<Tweet[]>>;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TwitterProvider };

// #endregion Exports
