import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import React from "react";
import Formulario from "./Formulario";
import { act } from "react-dom/test-utils";

describe("o comportamento do Formulario.tsx", () => {
  test("quando o input está vazio, novos participantes não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // encontrar o botão
    const botao = screen.getByRole("button");

    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument();

    // garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled();
  });

  test("adicionar um participante caso exista um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // encontrar o botão
    const botao = screen.getByRole("button");

    // Inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });

    // Clicar no botão de submeter
    fireEvent.click(botao);

    // Garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();

    // Garantir que o input não tenha um valor
    expect(input).toHaveValue("");
  });

  test("nomes duplicados não podem ser adicionados na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // encontrar o botão
    const botao = screen.getByRole("button");

    // Inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });

    // Clicar no botão de submeter
    fireEvent.click(botao);

    // Inserir o mesmo valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });

    // Clicar no botão de submeter
    fireEvent.click(botao);

    const mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos!"
    );
  });

  test("a mensagem de erro deve sumir após os timers", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // encontrar o botão
    const botao = screen.getByRole("button");

    // Inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });

    // Clicar no botão de submeter
    fireEvent.click(botao);

    // Inserir o mesmo valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });

    // Clicar no botão de submeter
    fireEvent.click(botao);

    let mensagemDeErro = screen.queryByRole("alert");

    expect(mensagemDeErro).toBeInTheDocument();

    // esperar N segundos
    act(() => {
      jest.runAllTimers();
    });
    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeNull();
  });
});
