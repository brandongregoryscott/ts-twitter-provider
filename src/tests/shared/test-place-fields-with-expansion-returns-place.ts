import { PlaceFields } from "../../enums/place-fields";
import { TweetExpansions } from "../../enums/tweet-expansions";
import { BaseParams } from "../../interfaces/params/base-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testPlaceFieldsWithExpansionReturnsPlace = <TParams extends BaseParams>(
    options: Omit<TestOptions<TParams>, "name">
) => {
    const { method } = options;
    test.each([
        [PlaceFields.Country, PlaceFields.Name],
        `${PlaceFields.Country},${PlaceFields.Name}`,
    ])(
        `given placeFields %p and '${TweetExpansions.GeoPlaceId}', it returns place`,
        async (placeFields) => {
            // Arrange
            const ids = ["1136048014974423040"];
            const params = Object.assign(options.params, {
                expansions: [TweetExpansions.GeoPlaceId],
                placeFields,
            });

            // Act
            const result = await method(TestTwitterProvider)(params);

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
            expect(result.data[0].geo).toBeDefined();

            expect(result.includes?.places).toBeDefined();
            expect(result.includes?.places?.length).toBeGreaterThanOrEqual(1);

            const place = result.includes?.places?.[0]!;
            expect(place.country).toBeDefined();
            expect(place.name).toBeDefined();
        }
    );
};

// #endregion Shard Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testPlaceFieldsWithExpansionReturnsPlace };

// #endregion Exports
