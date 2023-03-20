import * as readthedocs from "../src/index";

jest.mock("readthedocs-search", () => {
    const initializeSearchAsYouType = jest.fn();
    return jest.fn(() => initializeSearchAsYouType);
});

jest.mock("doc-diff", () => {
    const compare = jest.fn();
    return jest.fn(() => compare);
});

test("setup() function is defined", () => {
    expect(readthedocs.setup).toBeDefined();
});
