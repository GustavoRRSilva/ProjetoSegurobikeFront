"use client";
import { useEffect, useState } from "react";
import "./style.css";
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
  user_number: string; // Pode conter números e caracteres
  user_numero_cartao: string; // Número do cartão, pode ser um string para manter zeros à esquerda
  user_pais: string;
  user_plan: string; // Pode ser um identificador ou uma string representando o plano
}

export default function Change() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
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
            throw new Error("Erro ao buscar dados do usuário");
          }

          const data = await response.json();
          setUser(data.user);
          console.log(data.user);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log("Usuário não encontrado no localStorage.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/api/users/att/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // Envia o estado do usuário
      });

      setLoading(false);

      if (!response.ok) {
        throw new Error("Erro ao atualizar dados do usuário");
      }

      const updatedData = await response.json();
      setUser(updatedData.user); // Atualiza o estado com os dados atualizados
      console.log("Usuário atualizado com sucesso:", updatedData.user);
      window.location.href = "/user";
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  // Se o usuário ainda não foi carregado, mostra um indicador de carregamento
  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-screen min-h-screen bg-background flex justify-center items-center flex-col p-10">
      <form onSubmit={handleSubmit} className="form">
        <div>
          <img src="/images/img.svg" alt="img" className="w-full" />
          <label>Nome Completo:</label>
          <input
            type="text"
            value={user.user_fullname}
            onChange={(e) =>
              setUser({ ...user, user_fullname: e.target.value })
            }
          />
        </div>
        <div>
          <label>Idade:</label>
          <input
            type="number"
            value={user.user_age}
            onChange={(e) =>
              setUser({ ...user, user_age: parseInt(e.target.value) })
            }
          />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            value={user.user_birthday}
            onChange={(e) =>
              setUser({ ...user, user_birthday: e.target.value })
            }
          />
        </div>
        <div>
          <label>Cidade:</label>
          <input
            type="text"
            value={user.user_cidade}
            onChange={(e) => setUser({ ...user, user_cidade: e.target.value })}
          />
        </div>
        <div>
          <label>Validade do Cartão:</label>
          <input
            type="date"
            value={user.user_data_validade}
            onChange={(e) =>
              setUser({ ...user, user_data_validade: e.target.value })
            }
          />
        </div>
        <div>
          <label>Dono do Cartão:</label>
          <input
            type="text"
            value={user.user_dono_cartao}
            onChange={(e) =>
              setUser({ ...user, user_dono_cartao: e.target.value })
            }
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={user.user_email}
            onChange={(e) => setUser({ ...user, user_email: e.target.value })}
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            value={user.user_estado}
            onChange={(e) => setUser({ ...user, user_estado: e.target.value })}
          />
        </div>
        <div>
          <label>Gênero:</label>
          <select
            value={user.user_gender}
            onChange={(e) => setUser({ ...user, user_gender: e.target.value })}
          >
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
        <div>
          <label>Nome da Rua:</label>
          <input
            type="text"
            value={user.user_nome_rua}
            onChange={(e) =>
              setUser({ ...user, user_nome_rua: e.target.value })
            }
          />
        </div>
        <div>
          <label>Número do Telefone:</label>
          <input
            type="text"
            value={user.user_number}
            onChange={(e) => setUser({ ...user, user_number: e.target.value })}
          />
        </div>
        <div>
          <label>Número do Cartão:</label>
          <input
            type="text"
            value={user.user_numero_cartao}
            onChange={(e) =>
              setUser({ ...user, user_numero_cartao: e.target.value })
            }
          />
        </div>
        <div>
          <label>País:</label>
          <input
            type="text"
            value={user.user_pais}
            onChange={(e) => setUser({ ...user, user_pais: e.target.value })}
          />
        </div>
        <div>
          <label>Plano:</label>
          <input
            type="text"
            value={user.user_plan}
            onChange={(e) => setUser({ ...user, user_plan: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-700 duration-1000 hover:duration-1000 w-full mt-4"
        >
          {loading ? "Atualizando..." : "Atualizar"}
        </button>
      </form>
    </div>
  );
}
