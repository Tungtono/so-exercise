import { Router, Request, Response } from 'express';

export const repos = Router();

const apiUrl = 'https://api.github.com/users/silverorange/repos';
let mergedData: any[] = [];

const fetchApiData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  mergedData = mergedData.concat(data);
};

fetchApiData(apiUrl);

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json(mergedData);
});
