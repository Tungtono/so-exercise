import { useState, useEffect } from 'react';
import { Repo } from '../../../api/src/models/Repo';
import { Commit } from '../../../api/src/models/Commit';
import { Octokit } from '@octokit/core';

export function RepoDEtails({ item }) {
  const [commits, setCommits] = useState<Commit[]>([]);

  const handleTitleClick = (e: React.MouseEvent) => {
    const octokit = new Octokit({ auth: '' });
    useEffect(() => {
      const owner = item.owner;
      const repo = item.name;

      const latestCommit = octokit.request(
        `GET /repos/{owner}/{repo}/commits`,
        { owner, repo }
      );

      setCommits(latestCommit);
    }, []);
  };
  return (
    <div className="repo-info" onClick={(e) => handleTitleClick(e)}>
      <div>Repo Name: {item.name}</div>
      <div>Description: {item.description}</div>
      <div>Number of forks: {item.forks_count}</div>
      <div>Created at: {item.created_at}</div>
    </div>
  );
}
