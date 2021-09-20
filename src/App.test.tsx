import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders add button', () => {
    render(<App />);
    const addButton = screen.getByText(/Amount/i);
    expect(addButton).toBeInTheDocument();
});
