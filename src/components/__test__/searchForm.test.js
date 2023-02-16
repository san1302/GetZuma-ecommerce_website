/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen } from "@testing-library/react";
import SearchForm from "../searchForm";
import * as React from 'react';
import user from '@testing-library/user-event';
describe("SearchForm", () => {
  it("search form displays correctly on initial render", () => {
    const searchCategory = "";
    const searchTitle = "";
    const setSearchTitle = () => {};
    const setSearchCategory = () => {};
    render(
      <SearchForm
        searchCategory={searchCategory}
        searchTitle={searchTitle}
        setSearchCategory={setSearchCategory}
        setSearchTitle={setSearchTitle}
      />
    );
    const placeholder = screen.getByPlaceholderText("Search Category");
    const titleElement = screen.getByText("Title");
    const categoryElement = screen.getByText("Category");
    const dropdown = screen.getByRole("combobox");
    expect(titleElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
  });

  it("search form renders correctly on providing custom searchCategory", () => {
    const searchCategory = "dummyCategory";
    const searchTitle = "";
    const setSearchTitle = () => {};
    const setSearchCategory = () => {};

    render(
      <SearchForm
        searchCategory={searchCategory}
        searchTitle={searchTitle}
        setSearchCategory={setSearchCategory}
        setSearchTitle={setSearchTitle}
      />
    );

    const inputText = screen.getByDisplayValue("dummyCategory");
    expect(inputText).toBeInTheDocument();
  });

  it("search form renders correctly after selecting Title option from dropdown menu", () => {
      
      const searchCategory = "";
      const searchTitle = "";
      const setSearchTitle = jest.fn();
      const setSearchCategory = jest.fn();
      render(
        <SearchForm
          searchCategory={searchCategory}
          searchTitle={searchTitle}
          setSearchCategory={setSearchCategory}
          setSearchTitle={setSearchTitle}
        />
      );
      const dropdown = screen.getByRole("combobox");
       user.selectOptions(dropdown, ['Title']);
      expect(screen.getByRole('option', {name: "Title"}).selected).toBe(true);
  })
});
