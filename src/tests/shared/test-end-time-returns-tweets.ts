import faker from "faker";
import { TweetFields } from "../../enums/tweet-fields";
import { TimeFilterParams } from "../../interfaces/params/time-filter-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testEndTimeReturnsTweetsOnOrBeforeDate = <
    TParams extends TimeFilterParams
>(
    options: Omit<TestOptions<TParams>, "name">
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
