import { TwitterProvider } from "../twitter-provider";
import { TestUtils } from "./test-utils";

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const TestTwitterProvider = new TwitterProvider(TestUtils.credentials);

// #endregion Constants

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TestTwitterProvider };

// #endregion Exports
