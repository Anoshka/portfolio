import { render } from '@testing-library/react';
import WebDevGrid from '../../../components/WebDevGrid/WebDevGrid.jsx';

describe('WebDevGrid', () => {
  test('renders without crashing', () => {
    render(<WebDevGrid />);
  });
});
