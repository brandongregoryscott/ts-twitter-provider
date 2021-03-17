import { MediaFields } from "../../enums/media-fields";
import { TweetExpansions } from "../../enums/tweet-expansions";
import { BaseParams } from "../../interfaces/params/base-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const ALL_MEDIA_FIELDS = [
    MediaFields.Height,
    MediaFields.MediaKey,
    MediaFields.Type,
    MediaFields.Width,
];

// #endregion Constants

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testMediaFieldsWithExpansionReturnsMedia = <TParams extends BaseParams>(
    options: Omit<TestOptions<TParams>, "name">
) => {
    const { method } = options;
    test.each([ALL_MEDIA_FIELDS, ALL_MEDIA_FIELDS.join()])(
        `given mediaFields %p and '${TweetExpansions.AttachmentsMediaKeys}', it returns media`,
        async (mediaFields) => {
            // Arrange
            const params = Object.assign(options.params, {
                expansions: [TweetExpansions.AttachmentsMediaKeys],
                mediaFields,
            });

            // Act
            const result = await method(TestTwitterProvider)(params);

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
            const tweet = result.data[0];

            expect(tweet.attachments).toBeDefined();
            expect(
                tweet.attachments?.media_keys?.length
            ).toBeGreaterThanOrEqual(1);

            expect(result.includes).toBeDefined();
            expect(result.includes?.media?.length).toBeGreaterThanOrEqual(1);

            const attachment = result.includes?.media?.[0]!;
            expect(attachment.media_key).toBeDefined();
            expect(attachment.type).toBeDefined();
            expect(attachment.width).toBeDefined();
            expect(attachment.height).toBeDefined();
        }
    );
};

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testMediaFieldsWithExpansionReturnsMedia };

// #endregion Exports
