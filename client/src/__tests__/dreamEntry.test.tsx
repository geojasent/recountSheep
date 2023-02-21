import React from 'react';
import * as ReactDOM from 'react-dom';
import DreamEntry from '../pages/DreamEntry';
import { PeopleInput } from '../components/PeopleInput';
import { render, fireEvent } from '@testing-library/react';
describe('DreamEntry page test', () => {
    let container: HTMLDivElement;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    });

    it('People input renders correctly', () => {
        const numPeople = ['jj'];
        function updateFields(people: Partial<Array<string>>) {}
        ReactDOM.render(<PeopleInput {...numPeople} updateFields={updateFields} />, container);
        expect();
    });
});
