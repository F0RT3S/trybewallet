import React from "react";
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Table from "../components/Table";

describe('Componente Table', () => {
  it('Verifica se existe uma tabela', () => {
    renderWithRouterAndRedux(<Table />);

    const table = screen.getByRole("table")

    expect(table).toBeInTheDocument();

  });
});