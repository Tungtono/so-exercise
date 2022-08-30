import { SyntheticEvent, useEffect, useState } from 'react';
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

  const sortedData = dataState.sort((a, b) =>
    b.created_at.localeCompare(a.created_at)
  );
  const handleLangFilter = (e: SyntheticEvent) => {
    const targetLang = e.currentTarget.innerHTML;
    const filteredData = dataState.filter(
      (item) => item.language === targetLang
    );
    setDataState(filteredData);
  };
  return (
    <div className="App">
      <header className="App-headre">SO Exercise</header>
      <div>
        {sortedData.map((item) => {
          return (
            <div key={item.id} className="repo">
              <div>Repo Name: {item.name}</div>
              <div>Description: {item.description}</div>
              <button onClick={(e) => handleLangFilter(e)}>
                {item.language}
              </button>
              <div>Number of forks: {item.forks_count}</div>
              <div>Created at: {item.created_at}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
