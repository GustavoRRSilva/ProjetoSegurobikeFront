"use client";
import { useState } from "react";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Garantir que o componente foi montado no cliente

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      setLoading(false);

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();
      const user = data.user;
      console.log(user);
      // Armazena as informações do usuário no localStorage
      localStorage.setItem("user", user.user_id);
      window.location.href = "/user";
      // Verifique se o componente foi montado antes de navegar
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen bg-background flex justify-center items-center flex-col">
      <div className="p-20 rounded-lg flex flex-col items-center justify-center bg-foreground max-h-max border-green-500 border-2">
        <h2 className="text-white text-2xl font-bold">
          Seja bem-vindo ao seguBike!
        </h2>
        <p className="my-1 text-white">Digite sua conta abaixo</p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-100">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 p-2 rounded w-80"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 p-2 rounded w-80"
          />
          <input
            type="submit"
            value={loading ? "Carregando..." : "Enviar"}
            className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-700 duration-1000 hover:duration-1000 w-full"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default App;
