"use client";
import { useState, useEffect } from "react";

export default function UpdateBike() {
  console.log(window.location.href);
  const [bikeId, setBikeId] = useState<string | null>(null); // Pega o ID da bike da URL
  const [bike, setBike] = useState({
    bike_model: "",
    bike_year: "",
  });

  useEffect(() => {
    const url = window.location.href;
    const id = url.split("/").pop(); // Extrai o último valor da URL, que é o bike_id
    setBikeId(id ? id : null);
  }, []);
  // Fetch dos dados da bike ao carregar a página
  useEffect(() => {
    const fetchBike = async () => {
      if (bikeId) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/bikes/${bikeId}/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Erro ao buscar dados da bike");
          }
          const data = await response.json();
          setBike({
            bike_model: data.bike_model,
            bike_year: data.bike_year,
          });

          console.log(data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchBike();
  }, [bikeId]);

  // Função para lidar com a atualização da bike
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/bikes/update/${bikeId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bike),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar bike");
      }

      alert("Bike atualizada com sucesso!");
      window.location.href = "/user"; // Redireciona para a lista de bikes ou outra página após o sucesso
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar a bike");
    }
  };

  const deleteBike = async () => {
    if (bikeId) {
      const confirmDelete = window.confirm(
        "Você tem certeza que deseja excluir esta bicicleta?"
      );
      if (confirmDelete) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/bikes/delete/${bikeId}/`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Erro ao excluir a bicicleta");
          }
          alert("Bicicleta excluída com sucesso!");
          window.location.href = "/user"; // Redireciona para a lista de bikes após a exclusão
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  // Função para lidar com a mudança nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBike((prevBike) => ({
      ...prevBike,
      [name]: value,
    }));
  };

  return (
    <div className="w-screen h-screen bg-background flex justify-center items-center flex-col">
      <div className="p-10 bg-white rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Atualizar Bike</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bike_model" className="block text-gray-700">
              Modelo da Bike
            </label>
            <input
              type="text"
              id="bike_model"
              name="bike_model"
              value={bike.bike_model}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bike_year" className="block text-gray-700">
              Ano da Bike
            </label>
            <input
              type="text"
              id="bike_year"
              name="bike_year"
              value={bike.bike_year}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
          >
            Atualizar
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-full mt-2"
            onClick={deleteBike}
          >
            Excluir
          </button>
        </form>
      </div>
    </div>
  );
}
