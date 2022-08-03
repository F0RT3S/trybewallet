import React from "react";
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"; 
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Página inicial', () => {
  it('Verifica se há um input de email e outro de senha na tela', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId("email-input")
    const password = screen.getByTestId("password-input")

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it ('Verifica se o botão é desabilitado sem um email e senha válida', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId("email-input")
    const password = screen.getByTestId("password-input")
    const button = screen.getByRole('button', {
      name: 'Entrar'
    });

    userEvent.type(email, 'teste@')
    expect(button).toHaveProperty('disabled', true);
    userEvent.type(password, '12345')
    expect(button).toHaveProperty('disabled', true);
  })

  it('Verifica se ao fazer o login é redirecionado para a página /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId("email-input")
    const password = screen.getByTestId("password-input")
    const button = screen.getByRole('button', {
      name: 'Entrar'
    });

    userEvent.type(email, 'teste@gmail.com');
    userEvent.type(password, 'T35T33T53T');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  })
})