export const countries = [
  { country: "ID", flag: "🇮🇩", country_name: "Indonesia" },
  { country: "US", flag: "🇺🇸", country_name: "United States" },
  { country: "JP", flag: "🇯🇵", country_name: "Japan" },
  { country: "CN", flag: "🇨🇳", country_name: "China" },
  { country: "IN", flag: "🇮🇳", country_name: "India" },
  { country: "GB", flag: "🇬🇧", country_name: "United Kingdom" },
  { country: "DE", flag: "🇩🇪", country_name: "Germany" },
  { country: "FR", flag: "🇫🇷", country_name: "France" },
  { country: "RU", flag: "🇷🇺", country_name: "Russia" },
  { country: "BR", flag: "🇧🇷", country_name: "Brazil" },
  { country: "CA", flag: "🇨🇦", country_name: "Canada" },
  { country: "AU", flag: "🇦🇺", country_name: "Australia" },
  { country: "KR", flag: "🇰🇷", country_name: "South Korea" },
  { country: "SA", flag: "🇸🇦", country_name: "Saudi Arabia" },
  { country: "ZA", flag: "🇿🇦", country_name: "South Africa" },
  { country: "IT", flag: "🇮🇹", country_name: "Italy" },
  { country: "ES", flag: "🇪🇸", country_name: "Spain" },
  { country: "MX", flag: "🇲🇽", country_name: "Mexico" },
  { country: "TR", flag: "🇹🇷", country_name: "Turkey" },
  { country: "AR", flag: "🇦🇷", country_name: "Argentina" },
  { country: "NG", flag: "🇳🇬", country_name: "Nigeria" },
  { country: "EG", flag: "🇪🇬", country_name: "Egypt" },
  { country: "TH", flag: "🇹🇭", country_name: "Thailand" },
  { country: "MY", flag: "🇲🇾", country_name: "Malaysia" },
  { country: "VN", flag: "🇻🇳", country_name: "Vietnam" },
  { country: "PH", flag: "🇵🇭", country_name: "Philippines" },
  { country: "PK", flag: "🇵🇰", country_name: "Pakistan" },
  { country: "BD", flag: "🇧🇩", country_name: "Bangladesh" },
  { country: "IR", flag: "🇮🇷", country_name: "Iran" },
  { country: "IQ", flag: "🇮🇶", country_name: "Iraq" },
  { country: "IL", flag: "🇮🇱", country_name: "Israel" },
  { country: "UA", flag: "🇺🇦", country_name: "Ukraine" },
  { country: "PL", flag: "🇵🇱", country_name: "Poland" },
  { country: "SE", flag: "🇸🇪", country_name: "Sweden" },
  { country: "NO", flag: "🇳🇴", country_name: "Norway" },
  { country: "FI", flag: "🇫🇮", country_name: "Finland" },
  { country: "DK", flag: "🇩🇰", country_name: "Denmark" },
  { country: "NL", flag: "🇳🇱", country_name: "Netherlands" },
  { country: "CH", flag: "🇨🇭", country_name: "Switzerland" },
  { country: "BE", flag: "🇧🇪", country_name: "Belgium" },
  { country: "PT", flag: "🇵🇹", country_name: "Portugal" },
  { country: "GR", flag: "🇬🇷", country_name: "Greece" },
  { country: "CZ", flag: "🇨🇿", country_name: "Czech Republic" },
  { country: "AT", flag: "🇦🇹", country_name: "Austria" },
  { country: "HU", flag: "🇭🇺", country_name: "Hungary" },
  { country: "SG", flag: "🇸🇬", country_name: "Singapore" },
  { country: "NZ", flag: "🇳🇿", country_name: "New Zealand" },
  { country: "KE", flag: "🇰🇪", country_name: "Kenya" },
  { country: "ET", flag: "🇪🇹", country_name: "Ethiopia" },
];

const countriesByCode = Object.fromEntries(
  countries.map((country) => {
    return [
      country.country,
      { flag: country.flag, country_name: country.country_name },
    ];
  })
);

export function getCountry(countryCode: string):
  | {
      flag: string;
      country_name: string;
    }
  | undefined {
  return countriesByCode[countryCode];
}
