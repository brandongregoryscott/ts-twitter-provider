import { ListMentionsByUserParams } from "./params/list-mentions-by-user-params";
import { ListTweetsByUserParams } from "./params/list-tweets-by-user-params";
import { ListTweetsParams } from "./params/list-tweets-params";
import { Tweet } from "./tweets/tweet";
import { TwitterResponse } from "./twitter-response";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface TwitterProvider {
    listMentionsByUser(
        params: ListMentionsByUserParams
    ): Promise<TwitterResponse<Tweet[]>>;

    listTweets(params: ListTweetsParams): Promise<TwitterResponse<Tweet[]>>;

    listTweetsByUser(
        params: ListTweetsByUserParams
    ): Promise<TwitterResponse<Tweet[]>>;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TwitterProvider };

// #endregion Exports
