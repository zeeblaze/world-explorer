'use client';
import React, { useState, useMemo, useEffect } from 'react';
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
import {
  LoadingContainer,
  LoadingContent,
  Spinner,
  LoadingText,
  ErrorContainer,
  PageContainer,
  Header,
  Title,
  TitleSpan,
  Subtitle,
  ContentContainer,
  TopControls,
  SearchWrapper,
  SearchInput,
  IconWrapper,
  ControlsRight,
  SelectedText,
  CompareButton,
  TableContainer,
  StyledTable,
  TableHead,
  Th,
  TableBody,
  TableRow,
  Td,
  TextTd,
  FlagImage,
  PickButton,
  NoResults,
  PaginationContainer,
  PaginationButton,
  PaginationInfo,
  ModalOverlay,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalContentFlex,
  CountryCard,
  CardHeader,
  ModalFlagImage,
  CardTitle,
  CardBody,
  CardText,
  CardLabel,
  Footer,
} from '@/styles/countryList.styled';

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
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const processedCountries: Country[] = useMemo(() => {
    if (!data?.countries) return [];
    return data.countries.map((country: Country) => ({
      ...country,
      gdp: Math.floor(country.population * 0.5 + Math.random() * 100000000),
    }));
  }, [data?.countries]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const filteredCountries = processedCountries.filter((country) => {
    const term = searchTerm.toLowerCase();
    return (
      country.name.common.toLowerCase().includes(term) ||
      country.cca3.toLowerCase().includes(term) ||
      country.region.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredCountries.length / pageSize);
  const displayedCountries = filteredCountries.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

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
    <>
      {loading ? (
        <LoadingContainer>
          <LoadingContent>
            <Spinner />
            <LoadingText>Loading countries...</LoadingText>
          </LoadingContent>
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer>
          <LoadingText>Error: {error.message}</LoadingText>
        </ErrorContainer>
      ) : (
        <PageContainer>
          <Header>
            <Title>
              <TitleSpan>Global</TitleSpan> Explorer
            </Title>
            <Subtitle>
              Explore the world's countries and compare them.
            </Subtitle>
          </Header>
          <ContentContainer>
            {/* Top Controls */}
            <TopControls>
              <SearchWrapper>
                <SearchInput
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search countries..."
                />
                <IconWrapper>
                  <MdSearch size={20} color="#9ca3af" />
                </IconWrapper>
              </SearchWrapper>
              <ControlsRight>
                <SelectedText>
                  <strong>{selectedCountries.length}/2</strong> countries selected
                </SelectedText>
                <CompareButton
                  onClick={() => setIsModalOpen(true)}
                  disabled={selectedCountries.length !== 2}
                >
                  <MdCompareArrows size={20} style={{ marginRight: '0.5rem' }} />
                  Compare
                </CompareButton>
              </ControlsRight>
            </TopControls>
            {/* Table */}
            <TableContainer>
              <StyledTable>
                <TableHead>
                  <tr>
                    <Th>Pick</Th>
                    <Th>Flag</Th>
                    <Th>Name</Th>
                    <Th>Region</Th>
                    <Th>Population</Th>
                  </tr>
                </TableHead>
                <TableBody>
                  {displayedCountries.map((country) => {
                    const isSelected = selectedCountries.some(
                      (c) => c.cca3 === country.cca3
                    );
                    const pickDisabled = !isSelected && selectedCountries.length >= 2;
                    return (
                      <TableRow
                        key={country.cca3}
                        onClick={() => handleRowClick(country)}
                      >
                        <Td>
                          <PickButton
                            onClick={(e) => toggleSelectCountry(e, country)}
                            $selected={isSelected}
                            $disabledPick={pickDisabled}
                            disabled={pickDisabled}
                          >
                            {isSelected && <MdCheckCircleOutline color="white" />}
                          </PickButton>
                        </Td>
                        <Td>
                          <FlagImage
                            src={country.flags.png}
                            alt={country.flags.alt}
                          />
                        </Td>
                        <TextTd>{country.name.common}</TextTd>
                        <TextTd>{country.region}</TextTd>
                        <TextTd>
                          {country.population.toLocaleString()}
                        </TextTd>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </StyledTable>
            </TableContainer>
            {filteredCountries.length === 0 && (
              <NoResults>No countries found for "{searchTerm}"</NoResults>
            )}
            {filteredCountries.length > pageSize && (
              <PaginationContainer>
                <PaginationButton
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 0}
                >
                  Previous
                </PaginationButton>
                <PaginationInfo>
                  Page {currentPage + 1} of {totalPages}
                </PaginationInfo>
                <PaginationButton
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage + 1 >= totalPages}
                >
                  Next
                </PaginationButton>
              </PaginationContainer>
            )}
          </ContentContainer>
          {/* Comparison Modal */}
          {isModalOpen && (
            <ModalOverlay>
              <ModalBackdrop onClick={() => setIsModalOpen(false)} />
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Country Comparison</ModalTitle>
                  <CloseButton onClick={() => setIsModalOpen(false)}>
                    <MdClose size={24} color="#2563eb" />
                  </CloseButton>
                </ModalHeader>
                <ModalBody>
                  <ModalContentFlex>
                    {selectedCountries.map((country) => (
                      <CountryCard key={country.cca3}>
                        <CardHeader>
                          <ModalFlagImage
                            src={country.flags.png}
                            alt={country.flags.alt}
                          />
                          <CardTitle>{country.name.common}</CardTitle>
                        </CardHeader>
                        <CardBody>
                          <CardText>
                            <CardLabel>Population:</CardLabel>{' '}
                            {country.population.toLocaleString()}
                          </CardText>
                          <CardText>
                            <CardLabel>Area:</CardLabel>{' '}
                            {country.area.toLocaleString()} km²
                          </CardText>
                          <CardText>
                            <CardLabel>GDP:</CardLabel>{' '}
                            {country.gdp?.toLocaleString()}
                          </CardText>
                        </CardBody>
                      </CountryCard>
                    ))}
                  </ModalContentFlex>
                </ModalBody>
              </ModalContent>
            </ModalOverlay>
          )}
          <Footer>
            &copy; {new Date().getFullYear()} Global Explorer. All rights reserved.
          </Footer>
        </PageContainer>
      )}
    </>
  );
};

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <CountriesTable />
    </ApolloProvider>
  );
}
