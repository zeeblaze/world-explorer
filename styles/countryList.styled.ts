import styled, { keyframes } from 'styled-components';

export const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #3b82f6, #6366f1);
  color: white;
`;

export const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Spinner = styled.div`
  width: 5rem;
  height: 5rem;
  border-top: 4px solid white;
  border-bottom: 4px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingText = styled.div`
  margin-top: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const ErrorContainer = styled(LoadingContainer)`
  background: linear-gradient(to right, #ef4444, #ec4899);
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2.5rem 0;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  letter-spacing: -0.025em;
`;

export const TitleSpan = styled.span`
  color: #2563eb;
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  margin-top: 0.75rem;
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

/* Top Controls */
export const TopControls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;
  &:focus {
    border-color: transparent;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  padding-left: 0.75rem;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

export const SelectedText = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

export const CompareButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* Table Styles */
export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #bfdbfe;
`;

export const Th = styled.th`
  padding: 0.25rem 0.25rem 0.75rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TableBody = styled.tbody`
  background-color: #ffffff;
  tr {
    border-bottom: 1px solid #e5e7eb;
  }
`;

export const TableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f3f4f6;
  }
`;

export const Td = styled.td`
  padding: 0.5rem;
`;

export const TextTd = styled(Td)`
  font-size: 0.875rem;
  color: #111827;
`;

export const FlagImage = styled.img`
  width: 2.5rem;
  height: 1.5rem;
  object-fit: contain;
  border-radius: 0.25rem;
`;

/* Pick Button in Table */
export interface PickButtonProps {
  $selected: boolean;
  $disabledPick: boolean;
}

export const PickButton = styled.button<PickButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background-color: ${(props) => (props.$selected ? '#3b82f6' : '#e5e7eb')};
  opacity: ${(props) => (!props.$selected && props.$disabledPick ? 0.5 : 1)};
  cursor: ${(props) =>
    !props.$selected && props.$disabledPick ? 'not-allowed' : 'pointer'};
  border: none;
`;

/* No Results */
export const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: #4b5563;
`;

/* Pagination Controls */
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

export const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PaginationInfo = styled.span`
  font-size: 0.875rem;
  color: #374151;
`;

/* Modal Styles */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  transition: opacity 0.3s;
`;

export const ModalBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  transition: opacity 0.3s;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-width: 64rem;
  width: 100%;
  margin: 1rem;
  transform: translate(0);
  transition: all 0.3s;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eff6ff;
  border-bottom: 1px solid #d1d5db;
  padding: 1rem 1.5rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
`;

export const CloseButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: #dbeafe;
  border: none;
  transition: background-color 0.3s;
  &:hover {
    background-color: #bfdbfe;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const ModalContentFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const CountryCard = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 50%;
  }
  padding: 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const CardHeader = styled.div`
  text-align: center;
`;

export const ModalFlagImage = styled.img`
  width: 6rem;
  height: 4rem;
  object-fit: contain;
  margin: 0 auto;
  border-radius: 0.25rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1rem;
  color: #1f2937;
`;

export const CardBody = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  & > p + p {
    margin-top: 0.75rem;
  }
`;

export const CardText = styled.p`
  color: #4b5563;
`;

export const CardLabel = styled.span`
  font-weight: 500;
`;

/* Footer */
export const Footer = styled.footer`
  margin-top: 2.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  background-color: #dbeafe;
  padding: 1rem;
  border-radius: 0.375rem;
`;
