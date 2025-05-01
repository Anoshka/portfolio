import { render } from '@testing-library/react';
import ResumePage from '../../../pages/ResumePage/ResumePage.jsx';

describe('ResumePage', () => {
  test('renders without crashing', () => {
    render(<ResumePage />);
  });
});
