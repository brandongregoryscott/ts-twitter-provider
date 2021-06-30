import { BaseParams } from "../../interfaces/params/base-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";
import { TestUtils } from "../test-utils";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testMediaFieldsWithoutExpansionReturnsMedia = <
    TParams extends BaseParams
>(
    options: Omit<TestOptions<TParams>, "name">
) => {
    const { method } = options;
    test("given mediaFields without specifying expansions, it returns media", async () => {
        // Arrange
        const params = Object.assign(options.params, {
            expansions: [], // <-- Intentionally not sending through TweetExpansions.AttachmentMediaKeys
            mediaFields: TestUtils.allMediaFields,
        });

        // Act
        const result = await method(TestTwitterProvider)(params);

        // Assert
        expect(result.data.length).toBeGreaterThanOrEqual(1);
        const tweet = result.data[0];

        expect(tweet.attachments).toBeDefined();
        expect(tweet.attachments?.media_keys?.length).toBeGreaterThanOrEqual(1);

        expect(result.includes).toBeDefined();
        expect(result.includes?.media?.length).toBeGreaterThanOrEqual(1);

        const attachment = result.includes?.media?.[0]!;
        expect(attachment.media_key).toBeDefined();
        expect(attachment.type).toBeDefined();
        expect(attachment.width).toBeDefined();
        expect(attachment.height).toBeDefined();
    });
};

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testMediaFieldsWithoutExpansionReturnsMedia };

// #endregion Exports
