import {
  formatNationalNumber,
  parsePhone,
  toInternational,
} from "./phone";

describe("international phone", () => {
  it("groups a national number without a country code", () => {
    expect(formatNationalNumber("2025550123")).toBe("202 555 012 3");
  });

  it("builds an international number from the selected country", () => {
    expect(toInternational("GB", "2079460958")).toBe("+44 207 946 095 8");
  });

  it("splits a stored international number back into country and national part", () => {
    expect(parsePhone("+81 3 1234 5678")).toEqual({
      iso: "JP",
      national: "312 345 678",
    });
  });
});
