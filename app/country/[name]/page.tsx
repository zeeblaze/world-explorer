'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import {
  MdError,
  MdFlag,
  MdLocationOn,
  MdPeople,
  MdLandscape,
  MdHome,
  MdArrowBack,
} from 'react-icons/md';

// Set up the RestLink with the REST Countries API base URI
const restLink = new RestLink({
  uri: 'https://restcountries.com/v3.1/',
});

// Create an Apollo Client instance that uses the RestLink
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

// The endpoint used will be:
//   https://restcountries.com/v3.1/name/{args.name}?fullText=true
const GET_COUNTRY = gql`
  query GetCountry($name: String!) {
    countries(name: $name) @rest(type: "Country", path: "name/{args.name}?fullText=true") {
      name {
        common
        official
      }
      population
      area
      region
      capital
      flags {
        png
        alt
      }
      coatOfArms {
        png
      }
    }
  }
`;

interface CountryDetail {
  name: {
    common: string;
    official: string;
  };
  population: number;
  area: number;
  region: string;
  capital?: string[];
  flags: {
    png: string;
    alt: string;
  };
  coatOfArms?: {
    png: string;
  };
}

const CountryPageContent: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const router = useRouter();

  // Execute the query using the provided country name.
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { name: decodeURIComponent(name as string) },
    skip: !name, // Skip if name is not defined.
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white"></div>
          <div className="mt-4 text-xl font-semibold">Loading country details...</div>
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

  const country: CountryDetail = data?.countries ? data.countries[0] : null;

  if (!country) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <MdError className="text-red-500 text-6xl mx-auto" />
          <p className="mt-4 text-xl text-gray-600">Country not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">
      <div className="container mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center mb-8 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
        >
          <MdArrowBack className="mr-2" />
          Back to Countries
        </button>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">
            {country.name.official}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center">
              <img
                src={country.flags.png}
                alt={country.flags.alt}
                className="w-full h-auto max-h-60 object-contain rounded-lg shadow-md"
              />
              {country.coatOfArms?.png && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Coat of Arms
                  </h3>
                  <img
                    src={country.coatOfArms.png}
                    alt="Coat of Arms"
                    className="w-40 h-auto object-contain rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
            <div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MdHome className="text-blue-500 mr-3" />
                  <p>
                    <span className="font-bold text-gray-700">Common Name:</span>{' '}
                    {country.name.common}
                  </p>
                </div>
                {country.capital && country.capital.length > 0 && (
                  <div className="flex items-center">
                    <MdLocationOn className="text-blue-500 mr-3" />
                    <p>
                      <span className="font-bold text-gray-700">Capital:</span>{' '}
                      {country.capital[0]}
                    </p>
                  </div>
                )}
                <div className="flex items-center">
                  <MdPeople className="text-blue-500 mr-3" />
                  <p>
                    <span className="font-bold text-gray-700">Population:</span>{' '}
                    {country.population.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center">
                  <MdLandscape className="text-blue-500 mr-3" />
                  <p>
                    <span className="font-bold text-gray-700">Area:</span>{' '}
                    {country.area.toLocaleString()} km²
                  </p>
                </div>
                <div className="flex items-center">
                  <MdFlag className="text-blue-500 mr-3" />
                  <p>
                    <span className="font-bold text-gray-700">Region:</span>{' '}
                    {country.region}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CountryPage() {
  return (
    <ApolloProvider client={client}>
      <CountryPageContent />
    </ApolloProvider>
  );
}
