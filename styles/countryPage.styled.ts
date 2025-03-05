import styled, { keyframes } from 'styled-components';
import { MdError } from 'react-icons/md';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #3b82f6, #6366f1);
  color: white;
`;

export const Spinner = styled.div`
  animation: ${spin} 1s linear infinite;
  border-radius: 50%;
  height: 80px;
  width: 80px;
  border-top: 4px solid white;
  border-bottom: 4px solid white;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
`;

export const LoadingText = styled.div`
  margin-top: 16px;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #ef4444, #ec4899);
  color: white;
`;

export const ErrorText = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f7fafc;
  text-align: center;
`;

export const NotFoundText = styled.p`
  margin-top: 16px;
  font-size: 1.25rem;
  color: #718096;
`;

export const ErrorIcon = styled(MdError)`
  color: #ef4444;
  font-size: 60px;
  margin: 0 auto;
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(to bottom right, #f7fafc, #edf2f7);
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #2563eb;
  }
`;

export const ContentCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 32px;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 24px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FlagImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 240px;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CoatOfArmsContainer = styled.div`
  margin-top: 16px;
  text-align: center;
`;

export const CoatOfArmsTitle = styled.h3`
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
`;

export const CoatOfArmsImage = styled.img`
  width: 160px;
  height: auto;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  color: #3b82f6;
  margin-right: 12px;
`;

export const Label = styled.span`
  font-weight: bold;
  color: #4a5568;
`;

export const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
