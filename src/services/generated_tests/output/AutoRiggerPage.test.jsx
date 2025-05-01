import { render } from '@testing-library/react';
import AutoRiggerPage from '../../../pages/AutoRiggerPage/AutoRiggerPage.jsx';

describe('AutoRiggerPage', () => {
  test('renders without crashing', () => {
    render(<AutoRiggerPage />);
  });
});
