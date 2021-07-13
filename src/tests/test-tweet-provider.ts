import { TweetProvider } from "../tweet-provider";
import { TestUtils } from "./test-utils";

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const TestTweetProvider = new TweetProvider(TestUtils.credentials);

// #endregion Constants

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TestTweetProvider };

// #endregion Exports
