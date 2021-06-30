import dotenv from "dotenv";
import { User } from "../interfaces/users/user";
import faker from "faker";

// Load API keys from .env
dotenv.config();

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const credentials = {
    consumer_key: process.env.CONSUMER_KEY!,
    consumer_secret: process.env.CONSUMER_SECRET!,
};

const users: Record<
    "brandonscott" | "bscottoriginals" | "twitterdev",
    Pick<User, "id" | "username">
> = {
    brandonscott: {
        id: "730217167195648000",
        username: "soakthroughyou",
    },
    bscottoriginals: {
        id: "953649053631434752",
        username: "bscottoriginals",
    },
    twitterdev: {
        id: "2244994945",
        username: "twitterdev",
    },
};

// #endregion Constants

const TestUtils = {
    // -----------------------------------------------------------------------------------------
    // #region Public Members
    // -----------------------------------------------------------------------------------------

    credentials,
    users,

    // #endregion Public Members

    // -----------------------------------------------------------------------------------------
    // #region Public Functions
    // -----------------------------------------------------------------------------------------

    fakeUsername(): string {
        return `${faker.random.uuid()}`.slice(0, 14).replace(/-/g, "_");
    },

    // #endregion Public Functions
};

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TestUtils };

// #endregion Exports
