import { render } from '@testing-library/react';
import Footer from '../../../components/Footer/Footer.jsx';

describe('Footer', () => {
  test('renders without crashing', () => {
    render(<Footer />);
  });
});
