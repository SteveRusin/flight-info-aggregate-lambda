const CHUNK_SIZE = 1_000;

export function chunkify<T>(data: T[], chunkSize = CHUNK_SIZE): T[][] {
  const res: T[][] = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);

    res.push(chunk);
  }

  return res;
}
