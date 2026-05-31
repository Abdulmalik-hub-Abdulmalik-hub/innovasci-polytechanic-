// =====================================================
// COMPREHENSIVE COUNTRIES DATA - All Countries of the World
// InnovaSci AI Labs Polytechnic - Admissions System
// =====================================================

export interface Country {
  id: string;
  name: string;
  code: string;
  phoneCode: string;
  continent: string;
  states?: State[];
}

export interface State {
  id: string;
  name: string;
  capital?: string;
  lgas?: LocalGovernmentArea[];
}

export interface LocalGovernmentArea {
  id: string;
  name: string;
}

// All countries of the world
export const allCountries: Country[] = [
  // Africa
  { id: 'ng', name: 'Nigeria', code: 'NG', phoneCode: '+234', continent: 'Africa' },
  { id: 'gh', name: 'Ghana', code: 'GH', phoneCode: '+233', continent: 'Africa' },
  { id: 'ke', name: 'Kenya', code: 'KE', phoneCode: '+254', continent: 'Africa' },
  { id: 'tz', name: 'Tanzania', code: 'TZ', phoneCode: '+255', continent: 'Africa' },
  { id: 'za', name: 'South Africa', code: 'ZA', phoneCode: '+27', continent: 'Africa' },
  { id: 'eg', name: 'Egypt', code: 'EG', phoneCode: '+20', continent: 'Africa' },
  { id: 'et', name: 'Ethiopia', code: 'ET', phoneCode: '+251', continent: 'Africa' },
  { id: 'dz', name: 'Algeria', code: 'DZ', phoneCode: '+213', continent: 'Africa' },
  { id: 'ma', name: 'Morocco', code: 'MA', phoneCode: '+212', continent: 'Africa' },
  { id: 'tn', name: 'Tunisia', code: 'TN', phoneCode: '+216', continent: 'Africa' },
  { id: 'ug', name: 'Uganda', code: 'UG', phoneCode: '+256', continent: 'Africa' },
  { id: 'cm', name: 'Cameroon', code: 'CM', phoneCode: '+237', continent: 'Africa' },
  { id: 'sn', name: 'Senegal', code: 'SN', phoneCode: '+221', continent: 'Africa' },
  { id: 'ci', name: "Côte d'Ivoire", code: 'CI', phoneCode: '+225', continent: 'Africa' },
  { id: 'bf', name: 'Burkina Faso', code: 'BF', phoneCode: '+226', continent: 'Africa' },
  { id: 'ml', name: 'Mali', code: 'ML', phoneCode: '+223', continent: 'Africa' },
  { id: 'ne', name: 'Niger', code: 'NE', phoneCode: '+227', continent: 'Africa' },
  { id: 'bj', name: 'Benin', code: 'BJ', phoneCode: '+229', continent: 'Africa' },
  { id: 'tg', name: 'Togo', code: 'TG', phoneCode: '+228', continent: 'Africa' },
  { id: 'lr', name: 'Liberia', code: 'LR', phoneCode: '+231', continent: 'Africa' },
  { id: 'sl', name: 'Sierra Leone', code: 'SL', phoneCode: '+232', continent: 'Africa' },
  { id: 'gw', name: 'Guinea-Bissau', code: 'GW', phoneCode: '+245', continent: 'Africa' },
  { id: 'gn', name: 'Guinea', code: 'GN', phoneCode: '+224', continent: 'Africa' },
  { id: 'gm', name: 'Gambia', code: 'GM', phoneCode: '+220', continent: 'Africa' },
  { id: 'mr', name: 'Mauritania', code: 'MR', phoneCode: '+222', continent: 'Africa' },
  { id: 'mw', name: 'Malawi', code: 'MW', phoneCode: '+265', continent: 'Africa' },
  { id: 'zm', name: 'Zambia', code: 'ZM', phoneCode: '+260', continent: 'Africa' },
  { id: 'zw', name: 'Zimbabwe', code: 'ZW', phoneCode: '+263', continent: 'Africa' },
  { id: 'bw', name: 'Botswana', code: 'BW', phoneCode: '+267', continent: 'Africa' },
  { id: 'na', name: 'Namibia', code: 'NA', phoneCode: '+264', continent: 'Africa' },
  { id: 'mz', name: 'Mozambique', code: 'MZ', phoneCode: '+258', continent: 'Africa' },
  { id: 'ao', name: 'Angola', code: 'AO', phoneCode: '+244', continent: 'Africa' },
  { id: 'cd', name: 'DR Congo', code: 'CD', phoneCode: '+243', continent: 'Africa' },
  { id: 'cg', name: 'Republic of the Congo', code: 'CG', phoneCode: '+242', continent: 'Africa' },
  { id: 'ga', name: 'Gabon', code: 'GA', phoneCode: '+241', continent: 'Africa' },
  { id: 'cf', name: 'Central African Republic', code: 'CF', phoneCode: '+236', continent: 'Africa' },
  { id: 'td', name: 'Chad', code: 'TD', phoneCode: '+235', continent: 'Africa' },
  { id: 'sd', name: 'Sudan', code: 'SD', phoneCode: '+249', continent: 'Africa' },
  { id: 'ss', name: 'South Sudan', code: 'SS', phoneCode: '+211', continent: 'Africa' },
  { id: 'er', name: 'Eritrea', code: 'ER', phoneCode: '+291', continent: 'Africa' },
  { id: 'dj', name: 'Djibouti', code: 'DJ', phoneCode: '+253', continent: 'Africa' },
  { id: 'so', name: 'Somalia', code: 'SO', phoneCode: '+252', continent: 'Africa' },
  { id: 'bi', name: 'Burundi', code: 'BI', phoneCode: '+257', continent: 'Africa' },
  { id: 'rw', name: 'Rwanda', code: 'RW', phoneCode: '+250', continent: 'Africa' },
  { id: 'mu', name: 'Mauritius', code: 'MU', phoneCode: '+230', continent: 'Africa' },
  { id: 'sc', name: 'Seychelles', code: 'SC', phoneCode: '+248', continent: 'Africa' },
  { id: 'km', name: 'Comoros', code: 'KM', phoneCode: '+269', continent: 'Africa' },
  { id: 'mg', name: 'Madagascar', code: 'MG', phoneCode: '+261', continent: 'Africa' },

  // Asia
  { id: 'in', name: 'India', code: 'IN', phoneCode: '+91', continent: 'Asia' },
  { id: 'pk', name: 'Pakistan', code: 'PK', phoneCode: '+92', continent: 'Asia' },
  { id: 'bd', name: 'Bangladesh', code: 'BD', phoneCode: '+880', continent: 'Asia' },
  { id: 'lk', name: 'Sri Lanka', code: 'LK', phoneCode: '+94', continent: 'Asia' },
  { id: 'np', name: 'Nepal', code: 'NP', phoneCode: '+977', continent: 'Asia' },
  { id: 'bt', name: 'Bhutan', code: 'BT', phoneCode: '+975', continent: 'Asia' },
  { id: 'mv', name: 'Maldives', code: 'MV', phoneCode: '+960', continent: 'Asia' },
  { id: 'af', name: 'Afghanistan', code: 'AF', phoneCode: '+93', continent: 'Asia' },
  { id: 'ir', name: 'Iran', code: 'IR', phoneCode: '+98', continent: 'Asia' },
  { id: 'iq', name: 'Iraq', code: 'IQ', phoneCode: '+964', continent: 'Asia' },
  { id: 'sa', name: 'Saudi Arabia', code: 'SA', phoneCode: '+966', continent: 'Asia' },
  { id: 'ae', name: 'United Arab Emirates', code: 'AE', phoneCode: '+971', continent: 'Asia' },
  { id: 'kw', name: 'Kuwait', code: 'KW', phoneCode: '+965', continent: 'Asia' },
  { id: 'qa', name: 'Qatar', code: 'QA', phoneCode: '+974', continent: 'Asia' },
  { id: 'bh', name: 'Bahrain', code: 'BH', phoneCode: '+973', continent: 'Asia' },
  { id: 'om', name: 'Oman', code: 'OM', phoneCode: '+968', continent: 'Asia' },
  { id: 'ye', name: 'Yemen', code: 'YE', phoneCode: '+967', continent: 'Asia' },
  { id: 'jo', name: 'Jordan', code: 'JO', phoneCode: '+962', continent: 'Asia' },
  { id: 'lb', name: 'Lebanon', code: 'LB', phoneCode: '+961', continent: 'Asia' },
  { id: 'sy', name: 'Syria', code: 'SY', phoneCode: '+963', continent: 'Asia' },
  { id: 'il', name: 'Israel', code: 'IL', phoneCode: '+972', continent: 'Asia' },
  { id: 'tr', name: 'Turkey', code: 'TR', phoneCode: '+90', continent: 'Asia' },
  { id: 'cn', name: 'China', code: 'CN', phoneCode: '+86', continent: 'Asia' },
  { id: 'jp', name: 'Japan', code: 'JP', phoneCode: '+81', continent: 'Asia' },
  { id: 'kr', name: 'South Korea', code: 'KR', phoneCode: '+82', continent: 'Asia' },
  { id: 'kp', name: 'North Korea', code: 'KP', phoneCode: '+850', continent: 'Asia' },
  { id: 'mn', name: 'Mongolia', code: 'MN', phoneCode: '+976', continent: 'Asia' },
  { id: 'tw', name: 'Taiwan', code: 'TW', phoneCode: '+886', continent: 'Asia' },
  { id: 'hk', name: 'Hong Kong', code: 'HK', phoneCode: '+852', continent: 'Asia' },
  { id: 'mo', name: 'Macau', code: 'MO', phoneCode: '+853', continent: 'Asia' },
  { id: 'th', name: 'Thailand', code: 'TH', phoneCode: '+66', continent: 'Asia' },
  { id: 'vn', name: 'Vietnam', code: 'VN', phoneCode: '+84', continent: 'Asia' },
  { id: 'mm', name: 'Myanmar', code: 'MM', phoneCode: '+95', continent: 'Asia' },
  { id: 'kh', name: 'Cambodia', code: 'KH', phoneCode: '+855', continent: 'Asia' },
  { id: 'la', name: 'Laos', code: 'LA', phoneCode: '+856', continent: 'Asia' },
  { id: 'my', name: 'Malaysia', code: 'MY', phoneCode: '+60', continent: 'Asia' },
  { id: 'sg', name: 'Singapore', code: 'SG', phoneCode: '+65', continent: 'Asia' },
  { id: 'id', name: 'Indonesia', code: 'ID', phoneCode: '+62', continent: 'Asia' },
  { id: 'ph', name: 'Philippines', code: 'PH', phoneCode: '+63', continent: 'Asia' },
  { id: 'bn', name: 'Brunei', code: 'BN', phoneCode: '+673', continent: 'Asia' },
  { id: 'tl', name: 'Timor-Leste', code: 'TL', phoneCode: '+670', continent: 'Asia' },

  // Europe
  { id: 'gb', name: 'United Kingdom', code: 'GB', phoneCode: '+44', continent: 'Europe' },
  { id: 'ie', name: 'Ireland', code: 'IE', phoneCode: '+353', continent: 'Europe' },
  { id: 'fr', name: 'France', code: 'FR', phoneCode: '+33', continent: 'Europe' },
  { id: 'de', name: 'Germany', code: 'DE', phoneCode: '+49', continent: 'Europe' },
  { id: 'it', name: 'Italy', code: 'IT', phoneCode: '+39', continent: 'Europe' },
  { id: 'es', name: 'Spain', code: 'ES', phoneCode: '+34', continent: 'Europe' },
  { id: 'pt', name: 'Portugal', code: 'PT', phoneCode: '+351', continent: 'Europe' },
  { id: 'nl', name: 'Netherlands', code: 'NL', phoneCode: '+31', continent: 'Europe' },
  { id: 'be', name: 'Belgium', code: 'BE', phoneCode: '+32', continent: 'Europe' },
  { id: 'ch', name: 'Switzerland', code: 'CH', phoneCode: '+41', continent: 'Europe' },
  { id: 'at', name: 'Austria', code: 'AT', phoneCode: '+43', continent: 'Europe' },
  { id: 'pl', name: 'Poland', code: 'PL', phoneCode: '+48', continent: 'Europe' },
  { id: 'cz', name: 'Czech Republic', code: 'CZ', phoneCode: '+420', continent: 'Europe' },
  { id: 'sk', name: 'Slovakia', code: 'SK', phoneCode: '+421', continent: 'Europe' },
  { id: 'hu', name: 'Hungary', code: 'HU', phoneCode: '+36', continent: 'Europe' },
  { id: 'ro', name: 'Romania', code: 'RO', phoneCode: '+40', continent: 'Europe' },
  { id: 'bg', name: 'Bulgaria', code: 'BG', phoneCode: '+359', continent: 'Europe' },
  { id: 'gr', name: 'Greece', code: 'GR', phoneCode: '+30', continent: 'Europe' },
  { id: 'hr', name: 'Croatia', code: 'HR', phoneCode: '+385', continent: 'Europe' },
  { id: 'si', name: 'Slovenia', code: 'SI', phoneCode: '+386', continent: 'Europe' },
  { id: 'rs', name: 'Serbia', code: 'RS', phoneCode: '+381', continent: 'Europe' },
  { id: 'ba', name: 'Bosnia and Herzegovina', code: 'BA', phoneCode: '+387', continent: 'Europe' },
  { id: 'mk', name: 'North Macedonia', code: 'MK', phoneCode: '+389', continent: 'Europe' },
  { id: 'al', name: 'Albania', code: 'AL', phoneCode: '+355', continent: 'Europe' },
  { id: 'me', name: 'Montenegro', code: 'ME', phoneCode: '+382', continent: 'Europe' },
  { id: 'xk', name: 'Kosovo', code: 'XK', phoneCode: '+383', continent: 'Europe' },
  { id: 'ua', name: 'Ukraine', code: 'UA', phoneCode: '+380', continent: 'Europe' },
  { id: 'ru', name: 'Russia', code: 'RU', phoneCode: '+7', continent: 'Europe' },
  { id: 'by', name: 'Belarus', code: 'BY', phoneCode: '+375', continent: 'Europe' },
  { id: 'md', name: 'Moldova', code: 'MD', phoneCode: '+373', continent: 'Europe' },
  { id: 'se', name: 'Sweden', code: 'SE', phoneCode: '+46', continent: 'Europe' },
  { id: 'no', name: 'Norway', code: 'NO', phoneCode: '+47', continent: 'Europe' },
  { id: 'dk', name: 'Denmark', code: 'DK', phoneCode: '+45', continent: 'Europe' },
  { id: 'fi', name: 'Finland', code: 'FI', phoneCode: '+358', continent: 'Europe' },
  { id: 'is', name: 'Iceland', code: 'IS', phoneCode: '+354', continent: 'Europe' },
  { id: 'ee', name: 'Estonia', code: 'EE', phoneCode: '+372', continent: 'Europe' },
  { id: 'lv', name: 'Latvia', code: 'LV', phoneCode: '+371', continent: 'Europe' },
  { id: 'lt', name: 'Lithuania', code: 'LT', phoneCode: '+370', continent: 'Europe' },

  // North America
  { id: 'us', name: 'United States', code: 'US', phoneCode: '+1', continent: 'North America' },
  { id: 'ca', name: 'Canada', code: 'CA', phoneCode: '+1', continent: 'North America' },
  { id: 'mx', name: 'Mexico', code: 'MX', phoneCode: '+52', continent: 'North America' },
  { id: 'gt', name: 'Guatemala', code: 'GT', phoneCode: '+502', continent: 'North America' },
  { id: 'bz', name: 'Belize', code: 'BZ', phoneCode: '+501', continent: 'North America' },
  { id: 'hn', name: 'Honduras', code: 'HN', phoneCode: '+504', continent: 'North America' },
  { id: 'sv', name: 'El Salvador', code: 'SV', phoneCode: '+503', continent: 'North America' },
  { id: 'ni', name: 'Nicaragua', code: 'NI', phoneCode: '+505', continent: 'North America' },
  { id: 'cr', name: 'Costa Rica', code: 'CR', phoneCode: '+506', continent: 'North America' },
  { id: 'pa', name: 'Panama', code: 'PA', phoneCode: '+507', continent: 'North America' },
  { id: 'cu', name: 'Cuba', code: 'CU', phoneCode: '+53', continent: 'North America' },
  { id: 'jm', name: 'Jamaica', code: 'JM', phoneCode: '+1', continent: 'North America' },
  { id: 'ht', name: 'Haiti', code: 'HT', phoneCode: '+509', continent: 'North America' },
  { id: 'do', name: 'Dominican Republic', code: 'DO', phoneCode: '+1', continent: 'North America' },
  { id: 'pr', name: 'Puerto Rico', code: 'PR', phoneCode: '+1', continent: 'North America' },
  { id: 'tt', name: 'Trinidad and Tobago', code: 'TT', phoneCode: '+1', continent: 'North America' },
  { id: 'bb', name: 'Barbados', code: 'BB', phoneCode: '+1', continent: 'North America' },
  { id: 'bs', name: 'Bahamas', code: 'BS', phoneCode: '+1', continent: 'North America' },
  { id: 'lc', name: 'Saint Lucia', code: 'LC', phoneCode: '+1', continent: 'North America' },
  { id: 'vc', name: 'Saint Vincent and the Grenadines', code: 'VC', phoneCode: '+1', continent: 'North America' },
  { id: 'gd', name: 'Grenada', code: 'GD', phoneCode: '+1', continent: 'North America' },
  { id: 'ag', name: 'Antigua and Barbuda', code: 'AG', phoneCode: '+1', continent: 'North America' },
  { id: 'dm', name: 'Dominica', code: 'DM', phoneCode: '+1', continent: 'North America' },
  { id: 'kn', name: 'Saint Kitts and Nevis', code: 'KN', phoneCode: '+1', continent: 'North America' },

  // South America
  { id: 'br', name: 'Brazil', code: 'BR', phoneCode: '+55', continent: 'South America' },
  { id: 'ar', name: 'Argentina', code: 'AR', phoneCode: '+54', continent: 'South America' },
  { id: 'cl', name: 'Chile', code: 'CL', phoneCode: '+56', continent: 'South America' },
  { id: 'co', name: 'Colombia', code: 'CO', phoneCode: '+57', continent: 'South America' },
  { id: 'pe', name: 'Peru', code: 'PE', phoneCode: '+51', continent: 'South America' },
  { id: 've', name: 'Venezuela', code: 'VE', phoneCode: '+58', continent: 'South America' },
  { id: 'ec', name: 'Ecuador', code: 'EC', phoneCode: '+593', continent: 'South America' },
  { id: 'bo', name: 'Bolivia', code: 'BO', phoneCode: '+591', continent: 'South America' },
  { id: 'py', name: 'Paraguay', code: 'PY', phoneCode: '+595', continent: 'South America' },
  { id: 'uy', name: 'Uruguay', code: 'UY', phoneCode: '+598', continent: 'South America' },
  { id: 'gy', name: 'Guyana', code: 'GY', phoneCode: '+592', continent: 'South America' },
  { id: 'sr', name: 'Suriname', code: 'SR', phoneCode: '+597', continent: 'South America' },

  // Oceania
  { id: 'au', name: 'Australia', code: 'AU', phoneCode: '+61', continent: 'Oceania' },
  { id: 'nz', name: 'New Zealand', code: 'NZ', phoneCode: '+64', continent: 'Oceania' },
  { id: 'pg', name: 'Papua New Guinea', code: 'PG', phoneCode: '+675', continent: 'Oceania' },
  { id: 'fj', name: 'Fiji', code: 'FJ', phoneCode: '+679', continent: 'Oceania' },
  { id: 'ws', name: 'Samoa', code: 'WS', phoneCode: '+685', continent: 'Oceania' },
  { id: 'to', name: 'Tonga', code: 'TO', phoneCode: '+676', continent: 'Oceania' },
  { id: 'vu', name: 'Vanuatu', code: 'VU', phoneCode: '+678', continent: 'Oceania' },
  { id: 'ki', name: 'Kiribati', code: 'KI', phoneCode: '+686', continent: 'Oceania' },
  { id: 'sb', name: 'Solomon Islands', code: 'SB', phoneCode: '+677', continent: 'Oceania' },
  { id: 'pw', name: 'Palau', code: 'PW', phoneCode: '+680', continent: 'Oceania' },
  { id: 'mh', name: 'Marshall Islands', code: 'MH', phoneCode: '+692', continent: 'Oceania' },
  { id: 'fm', name: 'Federated States of Micronesia', code: 'FM', phoneCode: '+691', continent: 'Oceania' },
  { id: 'nc', name: 'New Caledonia', code: 'NC', phoneCode: '+687', continent: 'Oceania' },
  { id: 'pf', name: 'French Polynesia', code: 'PF', phoneCode: '+689', continent: 'Oceania' },
];

// Search countries by name
export function searchCountries(query: string): Country[] {
  const lowerQuery = query.toLowerCase();
  return allCountries.filter(country => 
    country.name.toLowerCase().includes(lowerQuery) ||
    country.code.toLowerCase().includes(lowerQuery)
  );
}

// Get country by ID
export function getCountryById(countryId: string): Country | undefined {
  return allCountries.find(c => c.id === countryId);
}

// Get country by code
export function getCountryByCode(code: string): Country | undefined {
  return allCountries.find(c => c.code.toLowerCase() === code.toLowerCase());
}

// Get countries by continent
export function getCountriesByContinent(continent: string): Country[] {
  return allCountries.filter(c => c.continent === continent);
}

// Get all continents
export function getAllContinents(): string[] {
  return [...new Set(allCountries.map(c => c.continent))];
}