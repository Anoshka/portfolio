import { render } from '@testing-library/react';
import LandingPage from '../../../pages/LandingPage/LandingPage.jsx';

describe('LandingPage', () => {
  test('renders without crashing', () => {
    render(<LandingPage />);
  });
});
