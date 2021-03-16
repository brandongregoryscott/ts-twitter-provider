import faker from "faker";
import { PagingParams } from "../../interfaces/params/paging-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testMaxResultsReturnsUpToCount = <TParams extends PagingParams>(
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
