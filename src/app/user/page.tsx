"use client";
import { EditOutlined } from "@ant-design/icons";
import Link from "next/link";

import { useEffect, useState } from "react";

interface User {
  user_id: number;
  user_fullname: string;
  user_age: number;
  user_birthday: string; // Formato "YYYY-MM-DD"
  user_cidade: string;
  user_data_validade: string; // Formato "YYYY-MM-DD"
  user_dono_cartao: string;
  user_email: string;
  user_estado: string;
  user_gender: string; // Pode ser "m" ou "f" para masculino ou feminino
  user_nome_rua: string;
  user_number: number; // Pode conter números e caracteres
  user_numero_cartao: string; // Número do cartão, pode ser um string para manter zeros à esquerda
  user_pais: string;
  user_plan: string; // Pode ser um identificador ou uma string representando o plano
}

// Interface para a bicicleta
interface Bike {
  bike_id: number;
  bike_model: string;
  bike_year: number;
  bike_user_id: number; // Referência ao user_id
}

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [bikes, setBikes] = useState<Bike[] | null>(null); //
  function obterPrimeiroNome(nomeCompleto: string) {
    // Divide o nome completo em partes e retorna a primeira
    const partes = nomeCompleto.trim().split(" ");
    return partes[0];
  }
  function obterUltimoNome(nomeCompleto: string) {
    // Divide o nome completo em partes e retorna a última
    const partes = nomeCompleto.trim().split(" ");
    return partes[partes.length - 1];
  }

  const formatarNumeroCelular = (numero: number) => {
    // Verifica se o número tem 11 dígitos
    const numeroStr = String(numero);

    // Formata o número
    const ddd = numeroStr.slice(0, 2);
    const parte1 = numeroStr.slice(2, 7);
    const parte2 = numeroStr.slice(7);

    return `(${ddd})${parte1}${parte2}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        // Verifica se o usuário está armazenado
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/users/${storedUser}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Erro ao buscar dados do usuário"); // Lança um erro se a resposta não for ok
          }

          const data = await response.json(); // Aguarda a conversão dos dados em JSON
          setUser(data.user);
          setBikes(data.bikes); // Faça o que precisar com os dados
        } catch (err) {
          console.error(err); // Loga o erro no console
        }
      } else {
        console.log("Usuário não encontrado no localStorage.");
      }
    };

    fetchData(); // Chama a função para buscar os dados
  }, []); // O array vazio significa que o useEffect será chamado apenas uma vez
  // Executa apenas uma vez na montagem do componente
  const handleEditClick = (bikeId: number) => {
    // Redireciona para a página de edição da bike com o ID passado
    window.location.href = `/bikes/update/${bikeId}`;
  };

  console.log(user, bikes);

  return (
    <div className="w-screen h-screen bg-background flex justify-center items-center flex-col px-4">
      {user ? (
        <div className="flex w-full gap-10 font-poppins">
          <div className=" bg-foreground rounded-md px-4 py-4 flex flex-col justify-center gap-1 text-left w-1/3 text-white text-xl font-semibold ">
            <div className="mx-auto flex flex-col gap-2 py-4 ">
              <img src="/images/img.svg" alt="img.svg" className="w-full " />
              <Link href="/changeinfosperfil">
                <EditOutlined />
              </Link>

              <h1 className="text-center text-4xl"> {user.user_fullname}</h1>
              <div className="m-auto w-full bg-button flex justify-center items-cemter font-medium px-4 py-2 gap-2 rounded-lg">
                <img src="/images/bike.svg" className="w-10 " />
                <p>Plano: {user.user_plan == "0" && "Gold"}</p>
              </div>
              <div className="flex gap-4  items-center font-medium">
                <img
                  src="/images/gmail.svg"
                  alt="gmsailImage"
                  className="w-6"
                ></img>
                <p>{user.user_email}</p>
              </div>
              <div className="flex gap-4 items-center  font-medium">
                <img
                  src="/images/location.svg"
                  alt="gmsailImage"
                  className="w-6"
                ></img>
                <p>{user.user_email}</p>
              </div>
              <div className="flex gap-4  items-center font-medium">
                <img
                  src="/images/cellphone.svg"
                  alt="gmsailImage"
                  className="w-5"
                ></img>
                <p>{formatarNumeroCelular(user.user_number)}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/3 justify-between">
            <div className="w-full ">
              <div className=" bg-foreground rounded-xl px-8 py-4 h-full gap-2 flex flex-col py-8 ">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-white   ">
                    Informações do usuario
                  </h2>
                  <Link href="/changeinfosperfil">
                    <EditOutlined className="text-white w-5 " />
                  </Link>
                </div>
                <div className="flex flex-col gap-1 mt-10">
                  <div className="font-medium	text-2xl flex justify-between text-white">
                    <p className="text-slate-100">Primeiro nome:</p>
                    <p>{obterPrimeiroNome(user.user_fullname)}</p>
                  </div>
                  <div className="font-medium	text-2xl flex justify-between text-white">
                    <p className="text-slate-100">Ultimo nome:</p>
                    <p>{obterUltimoNome(user.user_fullname)}</p>
                  </div>
                  <div className="font-medium	text-2xl flex justify-between text-white">
                    <p className="text-slate-100">Data de nascimento:</p>
                    <p>{user.user_birthday}</p>
                  </div>
                  <div />
                  <div className="font-medium	text-2xl flex justify-between text-white">
                    <p className="text-slate-100">Genero:</p>{" "}
                    <p>{user.user_gender == "m" ? "Masculino" : "Feminino"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full ">
              <div className=" bg-foreground rounded-xl px-8 py-4 h-full gap-2 flex flex-col py-8 ">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-white   ">
                    Informações do usuario
                  </h2>
                  <EditOutlined className="text-white w-5 " />
                </div>
                <div className="flex flex-col gap-1 justify-center mt-10">
                  <div className="font-medium	text-2xl flex justify-between text-white">
                    <p className="text-slate-100">Nome da rua:</p>
                    <p>{user.user_nome_rua}</p>
                  </div>
                  <div className="font-medium	text-2xl flex justify-between text-white">
                    <p className="text-slate-100">Número da casa:</p>
                    <p>{user.user_id}</p>
                  </div>
                  <div className="font-medium	text-2xl flex justify-between text-white">
                    <p className="text-slate-100">Cidade:</p>
                    <p>{user.user_cidade}</p>
                  </div>
                  <div />
                  <div className="font-medium	text-2xl flex justify-between text-white">
                    <p className="text-slate-100">Estado</p>
                    <p>{user.user_estado}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-foreground p-4 rounded-lg shadow-md max-w-md mx-auto w-1/3 h-1/2 m-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">
                Informações do Cartão
              </h2>
              <Link href="/changeinfosperfil">
                <EditOutlined className="text-white w-5 cursor-pointer hover:text-blue-400 transition duration-200 ease-in-out" />
              </Link>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg space-y-3 ">
              <p className="text-gray-400 font-light text-sm">Nome do dono:</p>
              <p className="text-white text-lg font-medium">
                {user.user_dono_cartao}
              </p>

              <p className="text-gray-400 font-light text-sm">
                Data de validade:
              </p>
              <p className="text-white text-lg font-medium">
                {user.user_data_validade}
              </p>

              <p className="text-gray-400 font-light text-sm">
                Número do cartão:
              </p>
              <p className="text-white text-lg font-medium">
                {user.user_numero_cartao}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Usuário não encontrado.</p>
      )}
      {bikes && bikes.length > 0 ? (
        <div className="bg-foreground w-full mt-2 rounded-xl p-4 font-semibold">
          <h2 className="text-3xl font-semibold text-white ">Bikes:</h2>
          <ul className="mt-4 flex gap-4 justify-center">
            {bikes.map((bike, index) => (
              <li
                key={bike.bike_id}
                className="bg-background max-w-max p-4 rounded-xl text-center text-white"
              >
                <div className="flex justify-center align-center gap-2">
                  <h2 className="font-semibold ">Modelo {index}</h2>
                  <EditOutlined onClick={() => handleEditClick(bike.bike_id)} />
                </div>
                <img
                  src="images/bikeImagem.svg"
                  alt="img da bike"
                  className="mt-2"
                />
                <p className="mt-2">
                  {bike.bike_model} - {bike.bike_year}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Nenhuma bike encontrada.</p>
      )}
    </div>
  );
}
