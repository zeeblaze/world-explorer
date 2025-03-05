'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { MdArrowBack, MdHome, MdLocationOn, MdPeople, MdLandscape, MdFlag } from 'react-icons/md';

import {
  LoadingContainer,
  Spinner,
  LoadingText,
  ErrorContainer,
  ErrorText,
  NotFoundContainer,
  NotFoundText,
  ErrorIcon,
  PageContainer,
  Container,
  BackButton,
  ContentCard,
  Title,
  GridContainer,
  ImageWrapper,
  FlagImage,
  CoatOfArmsContainer,
  CoatOfArmsTitle,
  CoatOfArmsImage,
  DetailsContainer,
  DetailRow,
  IconWrapper,
  Label,
  CenterColumn,
} from '@/styles/countryPage.styled';

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
      <LoadingContainer>
        <CenterColumn>
          <Spinner />
          <LoadingText>Loading country details...</LoadingText>
        </CenterColumn>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>Error: {error.message}</ErrorText>
      </ErrorContainer>
    );
  }

  const country: CountryDetail = data?.countries ? data.countries[0] : null;

  if (!country) {
    return (
      <NotFoundContainer>
        <div>
          <ErrorIcon />
          <NotFoundText>Country not found.</NotFoundText>
        </div>
      </NotFoundContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
        <BackButton onClick={() => router.back()}>
          <MdArrowBack style={{ marginRight: '8px' }} />
          Back to Countries
        </BackButton>
        <ContentCard>
          <Title>{country.name.official}</Title>
          <GridContainer>
            <ImageWrapper>
              <FlagImage src={country.flags.png} alt={country.flags.alt} />
              {country.coatOfArms?.png && (
                <CoatOfArmsContainer>
                  <CoatOfArmsTitle>Coat of Arms</CoatOfArmsTitle>
                  <CoatOfArmsImage src={country.coatOfArms.png} alt="Coat of Arms" />
                </CoatOfArmsContainer>
              )}
            </ImageWrapper>
            <DetailsContainer>
              <DetailRow>
                <IconWrapper>
                  <MdHome />
                </IconWrapper>
                <p>
                  <Label>Common Name:</Label> {country.name.common}
                </p>
              </DetailRow>
              {country.capital && country.capital.length > 0 && (
                <DetailRow>
                  <IconWrapper>
                    <MdLocationOn />
                  </IconWrapper>
                  <p>
                    <Label>Capital:</Label> {country.capital[0]}
                  </p>
                </DetailRow>
              )}
              <DetailRow>
                <IconWrapper>
                  <MdPeople />
                </IconWrapper>
                <p>
                  <Label>Population:</Label> {country.population.toLocaleString()}
                </p>
              </DetailRow>
              <DetailRow>
                <IconWrapper>
                  <MdLandscape />
                </IconWrapper>
                <p>
                  <Label>Area:</Label> {country.area.toLocaleString()} km²
                </p>
              </DetailRow>
              <DetailRow>
                <IconWrapper>
                  <MdFlag />
                </IconWrapper>
                <p>
                  <Label>Region:</Label> {country.region}
                </p>
              </DetailRow>
            </DetailsContainer>
          </GridContainer>
        </ContentCard>
      </Container>
    </PageContainer>
  );
};

export default function CountryPage() {
  return (
    <ApolloProvider client={client}>
      <CountryPageContent />
    </ApolloProvider>
  );
}
