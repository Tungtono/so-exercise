import { useEffect, useState } from 'react';
import { Repo } from '../../api/src/models/Repo';

export function App() {
  const [dataState, setDataState] = useState<Repo[]>([]);

  const baseUrl = 'http://localhost:4000/repos';

  const fetchData = async (url: string) => {
    const rawData = await fetch(url);
    const jsonData = await rawData.json();
    setDataState(jsonData);
  };

  useEffect(() => {
    fetchData(baseUrl);
  }, []);
  console.log(dataState);

  return (
    <div className="App">
      <header className="App-headre">SO Exercise</header>
      <div>
        {dataState.map((item) => {
          return (
            <div key={item.id} className="repo">
              <div>Repo Name: {item.name}</div>
              <div>Description: {item.description}</div>
              <button>{item.language}</button>
              <div>Number of forks: {item.forks_count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
