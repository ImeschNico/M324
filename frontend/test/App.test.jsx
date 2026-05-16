/* global describe, test, expect, beforeEach, afterEach, jest */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

beforeEach(() => {
    global.fetch = jest.fn((url) => {
        if (url === 'http://localhost:8080/') {
            return Promise.resolve({
                json: () => Promise.resolve([]),
            });
        }

        return Promise.resolve({
            json: () => Promise.resolve({}),
        });
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('App component', () => {
    test('renders heading', () => {
        render(<App />);
        const headingElement = screen.getByRole('heading', {
            name: /ToDo Liste/i,
        });
        expect(headingElement).toBeInTheDocument();
    });

    test('allows user to add a new task', () => {
        render(<App />);

        const inputElement = screen.getByLabelText(
            /Neue Aufgabe hinzufügen/i
        );
        const addButtonElement = screen.getByRole('button', {
            name: /Hinzufügen/i,
        });

        fireEvent.change(inputElement, {
            target: { value: 'Buy groceries' },
        });

        fireEvent.click(addButtonElement);

        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:8080/tasks',
            expect.objectContaining({
                method: 'POST',
            })
        );
    });

    // Zusätzlicher Test 1:
    test('renders priority dropdown', () => {
        render(<App />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toBeInTheDocument();
    });

    // Zusätzlicher Test 2:
    test('priority dropdown contains Hoch, Mittel and Tief', () => {
        render(<App />);

        expect(
            screen.getByRole('option', { name: 'Hoch' })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('option', { name: 'Mittel' })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('option', { name: 'Tief' })
        ).toBeInTheDocument();
    });
});