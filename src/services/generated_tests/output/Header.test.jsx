import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../components/Header/Header.jsx';

describe('Header', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });
});
