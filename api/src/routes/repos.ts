import { Router, Request, Response } from 'express';
import { readFile } from 'fs/promises';
import { Repo } from "../models/Repo";

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  let mergedData: Repo[] = [];
  const apiUrl: string = 'https://api.github.com/users/silverorange/repos';
  const filePath: string = `${__dirname}/../../data/repos.json`;

  const fetchApiData = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // mergedData = mergedData.concat(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const readJsonFile = async (path: string) => {
    try {
      const rawData = await readFile(path, 'utf8');
      // mergedData = mergedData.concat(JSON.parse(rawData));
      return JSON.parse(rawData);
    } catch (err) {
      console.log(err);
    }
  };

  const apiData = await fetchApiData(apiUrl);
  const jsonData = await readJsonFile(filePath);
  
  mergedData = mergedData.concat(apiData).concat(jsonData);

  const nonForkRepos = mergedData.filter((item) => item.fork === false);

  res.json(nonForkRepos);
});
