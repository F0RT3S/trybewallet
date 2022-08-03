import React from "react";
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from "../pages/Wallet";
import userEvent from "@testing-library/user-event";

describe('Componente Wallet', () => {
  it('Verifica se existe um input de adicionar valor na tela', () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId("value-input")
    expect(value).toBeInTheDocument();
  })

  it('Verifica se existe um input de adicionar descrição na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    
    const description = screen.getByTestId("description-input")
    expect(description).toBeInTheDocument();
  })

  it('Verifica se existe um input de tipos de moedas na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    
    const currency = screen.getByTestId("currency-input")
    expect(currency).toBeInTheDocument();
  })

  it('Verifica se existe um input de métodos de pagamento na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    
    const method = screen.getByTestId("method-input")
    expect(method).toBeInTheDocument();
  })

  it('Verifica se existe um input de categorias na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    
    const tag = screen.getByTestId("tag-input")
    expect(tag).toBeInTheDocument();
  })

  it('Verifica se o botão está habilitado', () => {
    renderWithRouterAndRedux(<Wallet />);

    const button = screen.getByRole('button', {
      name: 'Adicionar despesa'
    });

    expect(button).toHaveProperty('disabled', false);
  })

  it("Verifica se ao adicionar uma nova despesa o valor total é atualizado", () => {
    const mockState = {
      wallet: {
        currencies: [],
        expenses: [
          {
            id: 0,
            value: "10",
            description: "Bifinho",
            currency: "USD",
            method: "Dinheiro",
            tag: "Alimentação",
            exchangeRates: {
              USD: {
                ask: 2.510,  // SAUDADES
              }
            }
          },
        ],
      },
    };

    renderWithRouterAndRedux(<Wallet />, { 
      initialState: mockState,
    });

    const value = screen.getByTestId("total-field");
    const button = screen.getByRole("button", {
      name: "Adicionar despesa"
    } );

    userEvent.type(value, 10);
    userEvent.click(button);

    expect(value.innerHTML).toBe("25.10");
  });

})