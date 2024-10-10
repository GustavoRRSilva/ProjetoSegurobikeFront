"use client";
import { useEffect } from "react";

const App = () => {

  // useEffect para verificar o usuário no localStorage ao carregar o componente
  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      // Se o usuário estiver logado, redireciona para /user
      window.location.href = '/user';
    } else {
      // Se não houver usuário logado, redireciona para /login
      window.location.href = '/login';
    }
  }, []);

  // Como estamos redirecionando, não precisa renderizar nada
  return null;
};

export default App;
