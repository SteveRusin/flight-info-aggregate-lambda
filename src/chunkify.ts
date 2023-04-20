const CHUNK_SIZE = 1_000;

export function chunkify<T>(data: T[]): T[][] {
  const res: T[][] = [];

  for (let i = 0; i < data.length; i += CHUNK_SIZE) {
    const chunk = data.slice(i, i + CHUNK_SIZE);

    res.push(chunk);
  }

  return res;
}
