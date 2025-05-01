import { render } from '@testing-library/react';
import Timeline from '../../../components/Timeline/Timeline.jsx';

describe('Timeline', () => {
  test('renders without crashing', () => {
    render(<Timeline />);
  });
});
