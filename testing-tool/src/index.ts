import { Client } from 'pg';

const basePort = 22400;

const versions = [
  //10, 11, 12,
  13];

async function query(client: Client, query: string, params?: any[]) {
  console.log({ query: query.trim(), params });
  return client.query(query, params);
}

(async () => {
  const [, , code] = process.argv;
  if (!code) {
    throw new Error('Empty code');
  }
  for (const version of versions.reverse()) {
    console.log(`Executing against PostgreSQL ${version}`);
    const connectionPort = basePort + version;
    const client = new Client({
      password: 'foo',
      user: 'foo',
      port: connectionPort
    });
    await client.connect();

    await query(client, `CREATE EXTENSION IF NOT EXISTS plv8`, []);

    console.log((await query(client, `SELECT plv8_version()`)).rows[0]);

    await query(client, `
    CREATE OR REPLACE FUNCTION plv8_test() RETURNS JSON AS $$
    ${code}
    $$ LANGUAGE plv8 IMMUTABLE STRICT;
    `);

    console.log(JSON.stringify((await query(client, `
      SELECT plv8_test()
    `)).rows[0].plv8_test, null, 0));

    await client.end();

  }

})()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exitCode = 1;
  });

