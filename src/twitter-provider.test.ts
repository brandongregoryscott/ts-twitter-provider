import { TwitterProvider } from "./twitter-provider";
import dotenv from "dotenv";

/**
 * Writing integration tests for ease of development until the API is further fleshed out.
 * The suite expects API keys from a .env file
 */
describe("TwitterProvider", () => {
    // -----------------------------------------------------------------------------------------
    // #region Setup
    // -----------------------------------------------------------------------------------------

    // Load API keys from .env
    dotenv.config();

    const setupSut = () =>
        new TwitterProvider({
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
        });

    // #endregion Setup

    // -----------------------------------------------------------------------------------------
    // #region getTweets
    // -----------------------------------------------------------------------------------------

    describe("getTweets", () => {
        test("given a valid id, it returns a tweet", async () => {
            // Arrange
            const sut = setupSut();

            // Act
            const result = await sut.getTweets({
                ids: "1326691582758760450",
            });

            // Assert
            expect(result.data).toHaveLength(1);
        });
    });

    // #endregion getTweets
});
