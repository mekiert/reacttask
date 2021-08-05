import React from "react";
import {fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GithubUserSearchBar from "./GithubUserSearchBar";
import i18n from "../../i18n/i18n";

describe('GithubUserSearchBar', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        fetch.mockClear();
    })

    it('should return empty string in input is untouched', () => {
        const onSearch = jest.fn();
        const rendered = render(<GithubUserSearchBar onSearch={onSearch}/>);
        fireEvent.click(rendered.getByText(i18n.search));
        expect(onSearch).toBeCalledTimes(1);
        expect(onSearch).lastCalledWith('');
    });

    it('should return string that was written in the input', () => {
        const usernameToFind = "superuser";
        const onSearch = jest.fn();
        const rendered = render(<GithubUserSearchBar onSearch={onSearch}/>);
        userEvent.type(rendered.getByPlaceholderText(i18n.searchGithubUsers), usernameToFind);
        fireEvent.click(rendered.getByText(i18n.search));
        expect(onSearch).toBeCalledTimes(1);
        expect(onSearch).lastCalledWith(usernameToFind);
    });
})