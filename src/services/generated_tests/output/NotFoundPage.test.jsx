import { render } from '@testing-library/react';
import NotFoundPage from '../../../pages/NotFoundPage/NotFoundPage.jsx';

describe('NotFoundPage', () => {
  test('renders without crashing', () => {
    render(<NotFoundPage />);
  });
});
