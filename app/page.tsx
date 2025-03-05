'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import {
  MdSearch,
  MdCompareArrows,
  MdClose,
  MdCheckCircleOutline,
} from 'react-icons/md';

interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  region: string;
  population: number;
  area: number;
  gdp?: number;
  flags: {
    png: string;
    alt: string;
  };
}

const restLink = new RestLink({
  uri: 'https://restcountries.com/v3.1/',
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

const GET_COUNTRIES = gql`
  query GetCountries {
    countries @rest(type: "[Country]", path: "all") {
      name {
        common
        official
      }
      cca3
      region
      population
      area
      flags {
        png
        alt
      }
    }
  }
`;

const CountriesTable: React.FC = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const processedCountries: Country[] = useMemo(() => {
    if (!data?.countries) return [];
    return data.countries.map((country: Country) => ({
      ...country,
      gdp: Math.floor(country.population * 0.5 + Math.random() * 100000000),
    }));
  }, [data?.countries]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white-900"></div>
          <div className="mt-4 text-xl font-semibold">Loading countries...</div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <div className="text-xl font-semibold">Error: {error.message}</div>
      </div>
    );
  }

  const filteredCountries = processedCountries.filter((country) => {
    const term = searchTerm.toLowerCase();
    return (
      country.name.common.toLowerCase().includes(term) ||
      country.cca3.toLowerCase().includes(term) ||
      country.region.toLowerCase().includes(term)
    );
  });

  const handleRowClick = (country: Country) => {
    router.push(`/country/${encodeURIComponent(country.name.common)}`);
  };

  const toggleSelectCountry = (event: React.MouseEvent, country: Country) => {
    event.stopPropagation();
    setSelectedCountries((prev) => {
      if (prev.some((c) => c.cca3 === country.cca3)) {
        return prev.filter((c) => c.cca3 !== country.cca3);
      } else {
        if (prev.length < 2) {
          return [...prev, country];
        }
        return prev;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
          <span className="text-blue-600">Global</span> Explorer
        </h1>
        <p className="text-lg text-gray-600 mt-3">
          Explore the world's countries and compare them.
        </p>
      </header>
      <div className="container mx-auto px-4">
        {/* Top controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search countries..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdSearch className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <p className="text-sm text-gray-600">
              <span className="font-medium">
                {selectedCountries.length}/2
              </span>{' '}
              countries selected
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={selectedCountries.length !== 2}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdCompareArrows className="mr-2 h-5 w-5" />
              Compare
            </button>
          </div>
        </div>
        {/* Table container */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-blue-200">
              <tr>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Pick
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Flag
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Population
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCountries.map((country) => (
                <tr
                  key={country.cca3}
                  onClick={() => handleRowClick(country)}
                  className="hover:bg-gray-100 transition duration-200 cursor-pointer"
                >
                  <td className="px-2 py-2">
                    <button
                      onClick={(e) => toggleSelectCountry(e, country)}
                      className={`flex items-center justify-center w-6 h-6 rounded-full ${
                        selectedCountries.some((c) => c.cca3 === country.cca3)
                          ? 'bg-blue-500'
                          : 'bg-gray-200'
                      } ${
                        !selectedCountries.some((c) => c.cca3 === country.cca3) &&
                        selectedCountries.length >= 2
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                      disabled={
                        !selectedCountries.some((c) => c.cca3 === country.cca3) &&
                        selectedCountries.length >= 2
                      }
                    >
                      {selectedCountries.some((c) => c.cca3 === country.cca3) && (
                        <MdCheckCircleOutline className="text-white" />
                      )}
                    </button>
                  </td>
                  <td className="px-2 py-2">
                    <img
                      src={country.flags.png}
                      alt={country.flags.alt}
                      className="w-10 h-6 object-contain rounded"
                    />
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {country.name.common}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {country.region}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {country.population.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCountries.length === 0 && (
          <div className="p-4 text-center text-gray-600">
            No countries found for "{searchTerm}"
          </div>
        )}
      </div>

      {/* Comparison Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300">
          <div
            className="absolute inset-0 bg-black opacity-60 transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-white rounded-lg shadow-2xl z-10 max-w-4xl w-full mx-4 transform transition-all duration-300">
            <div className="flex justify-between items-center bg-blue-50 border-b border-gray-300 px-6 py-4 rounded-t-lg">
              <h2 className="text-2xl font-bold text-gray-800">
                Country Comparison
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
              >
                <MdClose className="h-6 w-6 text-blue-700" />
              </button>
            </div>
            <div className="px-6 py-6">
              <div className="flex flex-col md:flex-row justify-around">
                {selectedCountries.map((country) => (
                  <div
                    key={country.cca3}
                    className="w-full md:w-1/2 p-6 border border-gray-300 rounded-lg shadow-md"
                  >
                    <div className="text-center">
                      <img
                        src={country.flags.png}
                        alt={country.flags.alt}
                        className="w-24 h-16 object-contain mx-auto rounded"
                      />
                      <h3 className="text-xl font-semibold mt-4 text-gray-800">
                        {country.name.common}
                      </h3>
                    </div>
                    <div className="mt-6 space-y-3 text-center">
                      <p className="text-gray-600">
                        <span className="font-medium">Population:</span>{' '}
                        {country.population.toLocaleString()}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Area:</span>{' '}
                        {country.area.toLocaleString()} km²
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">GDP:</span>{' '}
                        {country.gdp?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-10 text-center text-gray-500 text-sm bg-blue-100 p-4 rounded-md">
        &copy; {new Date().getFullYear()} Global Explorer. All rights reserved.
      </footer>
    </div>
  );
};

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <CountriesTable />
    </ApolloProvider>
  );
}
