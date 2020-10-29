import React, { useEffect, useState } from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {

    const response = await api.post('repositories', {
        title: `${Date.now()} - GoStack`,
        url:"https://github.com/ViniciusRodrigues11/gostack-conceitos-reactjs",
        techs: [
          "nodejs",
          "react",
          "javascript"
        ]
      
    })

    const repository = response.data

    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))

  }

  useEffect(() => {
    console.log('oi')
    api.get('repositories').then((repository) => {
      setRepositories(repository.data)
    })

  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
