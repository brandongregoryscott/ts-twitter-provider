import { PlaceFields } from "../../enums/place-fields";
import { BaseParams } from "../../interfaces/params/base-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testPlaceFieldsWithoutExpansionReturnsPlace = <
    TParams extends BaseParams
>(
    options: Omit<TestOptions<TParams>, "name">
) => {
    const { method } = options;
    test(`given placeFields without specifying expansion, it returns place`, async () => {
        // Arrange
        const params = Object.assign(options.params, {
            expansions: [], // <-- Intentionally not sending through TweetExpansions.GeoPlaceId
            placeFields: [PlaceFields.Country, PlaceFields.Name],
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
    });
};

// #endregion Shard Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testPlaceFieldsWithoutExpansionReturnsPlace };

// #endregion Exports
