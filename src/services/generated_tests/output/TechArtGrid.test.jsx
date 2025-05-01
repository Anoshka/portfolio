import { render } from '@testing-library/react';
import TechArtGrid from '../../../components/TechArtGrid/TechArtGrid.jsx';

describe('TechArtGrid', () => {
  test('renders without crashing', () => {
    render(<TechArtGrid />);
  });
});
