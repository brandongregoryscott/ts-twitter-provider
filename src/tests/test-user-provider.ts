import { UserProvider } from "../user-provider";
import { TestUtils } from "./test-utils";

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const TestUserProvider = new UserProvider(TestUtils.credentials);

// #endregion Constants

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TestUserProvider };

// #endregion Exports
