import faker from "faker";
import { TweetFields } from "../../enums/tweet-fields";
import { TimeFilterParams } from "../../interfaces/params/time-filter-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testStartTimeReturnsTweetsOnOrAfterDate = <
    TParams extends TimeFilterParams
>(
    options: TestOptions<TParams>
) =>
    test.each([faker.date.past(1), faker.date.past(1).toISOString()])(
        "given start_time %p, returns tweets on or after that date",
        async (start_time) => {
            // Arrange
            const { method } = options;
            const params = Object.assign(options.params, {
                start_time,
                fields: [TweetFields.CreatedAt],
            });

            // Act
            const result = await method(TestTwitterProvider)(params);

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
            result.data.forEach((tweet) => {
                expect(tweet.created_at).toBeDefined();
                expect(
                    new Date(tweet.created_at!) >= new Date(start_time)
                ).toBe(true);
            });
        }
    );

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testStartTimeReturnsTweetsOnOrAfterDate };

// #endregion Exports
