import { render } from '@testing-library/react';
import TechArtPage from '../../../pages/TechArtPage/TechArtPage.jsx';

describe('TechArtPage', () => {
  test('renders without crashing', () => {
    render(<TechArtPage />);
  });
});
