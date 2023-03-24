import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  const testPlnToUsd = [
    { pln: '1', result: '$0.29' },
    { pln: '20', result: '$5.71' },
    { pln: '100', result: '$28.57' },
    { pln: '345', result: '$98.57' },
  ];

  const testUsdToPln = [
    { usd: '1', result: 'PLN 3.50' },
    { usd: '20', result: 'PLN 70.00' },
    { usd: '100', result: 'PLN 350.00' },
    { usd: '345', result: 'PLN 1,207.50' },
  ];

  const testPlnToPln = [
    { pln: '1', result: 'PLN 1.00' },
    { pln: '20', result: 'PLN 20.00' },
    { pln: '100', result: 'PLN 100.00' },
    { pln: '345', result: 'PLN 345.00' },
  ];
  for (const PlnToUsd of testPlnToUsd) {
    it('should render from PLN without crashing', () => {
      render(<ResultBox from='PLN' to='USD' amount={parseInt(PlnToUsd.pln)} />);
      const result = screen.getByTestId('result');
      expect(result).toHaveTextContent((PlnToUsd.pln = PlnToUsd.result));
    });
    cleanup();
  }

  for (const UsdToPln of testUsdToPln) {
    it('should render from USD without crashing', () => {
      render(<ResultBox from='USD' to='PLN' amount={parseInt(UsdToPln.usd)} />);
      const result = screen.getByTestId('result');
      expect(result).toHaveTextContent((UsdToPln.usd = UsdToPln.result));
    });
    cleanup();
  }

  for (const PlnToPln of testPlnToPln) {
    it('should render PlnToPln without crashing', () => {
      render(<ResultBox from='PLN' to='PLN' amount={parseInt(PlnToPln.pln)} />);
      const result = screen.getByTestId('result');
      expect(result).toHaveTextContent((PlnToPln.pln = PlnToPln.result));
    });
    cleanup();
  }

  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={parseInt('-10')} />);
    const result = screen.getByTestId('result');
    expect(result).toHaveTextContent('Wrong value...');
  });
});
