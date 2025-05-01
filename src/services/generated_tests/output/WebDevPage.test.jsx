import { render } from '@testing-library/react';
import WebDevPage from '../../../pages/WebDevPage/WebDevPage.jsx';

describe('WebDevPage', () => {
  test('renders without crashing', () => {
    render(<WebDevPage />);
  });
});
