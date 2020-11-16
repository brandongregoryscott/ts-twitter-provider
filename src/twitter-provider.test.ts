import { TwitterProvider } from "./twitter-provider";
import dotenv from "dotenv";
import { TweetFields } from "./enums/tweet-fields";

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
    // #region listTweets
    // -----------------------------------------------------------------------------------------

    describe("listTweets", () => {
        test("given a valid id, it returns a tweet", async () => {
            // Arrange
            const ids = "1326691582758760450";
            const sut = setupSut();

            // Act
            const result = await sut.listTweets({ ids });

            // Assert
            expect(result.data).toHaveLength(1);
        });

        test("given array of valid ids, it returns multiple tweets", async () => {
            // Arrange
            const ids = ["1326691582758760450", "1327657800667947008"];
            const sut = setupSut();

            // Act
            const result = await sut.listTweets({ ids });

            // Assert
            expect(result.data).toHaveLength(ids.length);
        });

        test("given comma separated string of valid ids, it returns multiple tweets", async () => {
            // Arrange
            const ids = "1326691582758760450,1327657800667947008";
            const sut = setupSut();

            // Act
            const result = await sut.listTweets({ ids });

            // Assert
            expect(result.data).toHaveLength(ids.split(",").length);
        });

        test("given list of fields, it returns tweets with those included fields", async () => {
            // Arrange
            const ids = "1141796911684476929";
            const sut = setupSut();

            // Act
            const result = await sut.listTweets({
                ids,
                fields: [TweetFields.Lang],
            });

            // Assert
            expect(result.data).toHaveLength(1);
            expect(result.data[0].lang).not.toBeUndefined();
        });
    });

    // #endregion listTweets
});
