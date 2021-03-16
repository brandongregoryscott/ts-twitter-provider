import { TweetFields } from "../../enums/tweet-fields";
import { BaseParams } from "../../interfaces/params/base-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testFieldsReturnsRequestedFields = <TParams extends BaseParams>(
    options: Omit<TestOptions<TParams>, "name">
) =>
    test.each([
        [TweetFields.Lang, TweetFields.Id],
        `${TweetFields.Lang},${TweetFields.Id}`,
    ])(
        "given fields %p, it returns tweets with those included fields",
        async (fields) => {
            // Arrange
            const { method } = options;
            const params = Object.assign(options.params, { fields });

            // Act
            const result = await method(TestTwitterProvider)(params);

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
            expect(result.data[0].lang).toBeDefined();
        }
    );

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testFieldsReturnsRequestedFields };

// #endregion Exports
