import faker from "faker";
import { TweetFields } from "../../enums/tweet-fields";
import { ListMentionsByUserParams } from "../../interfaces/params/list-mentions-by-user-params";
import { ListTweetsByUserParams } from "../../interfaces/params/list-tweets-by-user-params";
import { TestOptions } from "../interfaces/test-option";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testEndTimeReturnsTweetsOnOrBeforeDate = <
    TParams = ListTweetsByUserParams | ListMentionsByUserParams
>(
    options: TestOptions<TParams>
) =>
    test.each([faker.date.past(1), faker.date.past(1).toISOString()])(
        "given end_time %p, returns tweets before or on that date",
        async (end_time) => {
            // Arrange
            const { method } = options;
            const params = Object.assign(options.params, {
                end_time,
                fields: [TweetFields.CreatedAt],
            });

            // Act
            const result = await method(TestTwitterProvider)(params);

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
            result.data.forEach((tweet) => {
                expect(tweet.created_at).toBeDefined();
                expect(new Date(tweet.created_at!) <= new Date(end_time)).toBe(
                    true
                );
            });
        }
    );

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testEndTimeReturnsTweetsOnOrBeforeDate };

// #endregion Exports
