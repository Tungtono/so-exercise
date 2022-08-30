import { Router, Request, Response } from 'express';
import { readFile } from 'fs/promises';

export const repos = Router();

const apiUrl: string = 'https://api.github.com/users/silverorange/repos';
const filePath: string = `${__dirname}/../../data/repos.json`;
let mergedData: any[] = [];

const fetchApiData = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    mergedData = mergedData.concat(data);
  } catch (err) {
    console.log(err);
  }
};

const readJsonFile = async (path: string) => {
  try {
    const rawData = await readFile(path, 'utf8');
    mergedData = mergedData.concat(JSON.parse(rawData));
  } catch (err) {
    console.log(err);
  }
};

fetchApiData(apiUrl);
readJsonFile(filePath);

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json(mergedData);
});
