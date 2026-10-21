export type Country = {
  iso: string;
  name: string;
  dial: string;
  example: string;
};

export const COUNTRIES: Country[] = [
  { iso: "US", name: "United States", dial: "1", example: "202 555 0123" },
  { iso: "CA", name: "Canada", dial: "1", example: "416 555 0199" },
  { iso: "GB", name: "United Kingdom", dial: "44", example: "20 7946 0958" },
  { iso: "DE", name: "Germany", dial: "49", example: "30 123456" },
  { iso: "FR", name: "France", dial: "33", example: "1 23 45 67 89" },
  { iso: "RU", name: "Russia", dial: "7", example: "495 123 4567" },
  { iso: "JP", name: "Japan", dial: "81", example: "3 1234 5678" },
  { iso: "CN", name: "China", dial: "86", example: "10 1234 5678" },
  { iso: "IN", name: "India", dial: "91", example: "11 2345 6789" },
  { iso: "BR", name: "Brazil", dial: "55", example: "11 91234 5678" },
  { iso: "AU", name: "Australia", dial: "61", example: "2 1234 5678" },
  { iso: "KR", name: "South Korea", dial: "82", example: "2 312 3456" },
  { iso: "MX", name: "Mexico", dial: "52", example: "55 1234 5678" },
  { iso: "ZA", name: "South Africa", dial: "27", example: "21 123 4567" },
];

export function getCountry(iso: string): Country {
  return COUNTRIES.find((country) => country.iso === iso) ?? COUNTRIES[0];
}

export function countryOptions(selectedIso: string): string {
  return COUNTRIES.map((country) => {
    const selected = country.iso === selectedIso ? " selected" : "";
    return `<option value="${country.iso}"${selected}>${country.name} (+${country.dial})</option>`;
  }).join("");
}

/** Groups digits as the user types. The country code stays outside this field. */
export function formatNationalNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 14);
  return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}

export function toInternational(iso: string, national: string): string {
  const country = getCountry(iso);
  const formatted = formatNationalNumber(national);
  return formatted ? `+${country.dial} ${formatted}` : "";
}

export function parsePhone(value: string): { iso: string; national: string } {
  const match = value.trim().match(/^\+(\d{1,3})\s*(.*)$/);
  if (!match) {
    return { iso: "US", national: formatNationalNumber(value) };
  }

  const country =
    COUNTRIES.find((item) => item.dial === match[1]) ?? COUNTRIES[0];

  return {
    iso: country.iso,
    national: formatNationalNumber(match[2]),
  };
}
