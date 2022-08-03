import React from "react";
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Componente Header', () => {
  it('Verifica se aparece o email de login na tela', () => {
    const mockState = {
      user: {
        email: 'teste@gmail.com',
      }
    }

    renderWithRouterAndRedux(<Header />, {
      initialState: mockState
    });

    const email = screen.getByText("Olá, teste@gmail.com");

    expect(email).toBeInTheDocument()
  })

  it('Verifica se o texto BRL é exibido na tela', () => {
    renderWithRouterAndRedux(<Header />)

    const currency = screen.getByText("BRL")

    expect(currency).toBeInTheDocument();
  })
})
