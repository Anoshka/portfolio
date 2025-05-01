import { render } from '@testing-library/react';
import Card from '../../../components/Card/Card.jsx';

describe('Card', () => {
  test('renders without crashing', () => {
    render(<Card />);
  });
});
