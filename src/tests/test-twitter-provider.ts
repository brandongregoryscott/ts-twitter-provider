import dotenv from "dotenv";
import { TwitterProvider } from "../twitter-provider";

// Load API keys from .env
dotenv.config();

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const TestTwitterProvider = new TwitterProvider({
    consumer_key: process.env.CONSUMER_KEY!,
    consumer_secret: process.env.CONSUMER_SECRET!,
});

// #endregion Constants

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TestTwitterProvider };

// #endregion Exports
