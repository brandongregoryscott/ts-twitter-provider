import faker from "faker";
import { ListMentionsByUserParams } from "../../interfaces/params/list-mentions-by-user-params";
import { ListTweetsByUserParams } from "../../interfaces/params/list-tweets-by-user-params";
import { TestOptions } from "../interfaces/test-option";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testMaxResultsReturnsUpToCount = <
    TParams = ListTweetsByUserParams | ListMentionsByUserParams
>(
    options: TestOptions<TParams>
) => {
    const { method } = options;
    const name =
        options.name ?? "given max_results, returns up to count of tweets";
    test(name, async () => {
        // Arrange
        const max_results = faker.random.number({ min: 5, max: 100 });
        const params = Object.assign(options.params, { max_results });

        // Act
        const result = await method(TestTwitterProvider)(params);

        // Assert
        expect(result.data.length).toBeLessThanOrEqual(max_results);
    });
};

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testMaxResultsReturnsUpToCount };

// #endregion Exports
