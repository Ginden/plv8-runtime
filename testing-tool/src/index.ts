import { Client } from 'pg';

const basePort = 22400;

const versions = [
  //10, 11, 12,
  13];

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

    await client.query(`CREATE EXTENSION IF NOT EXISTS plv8`, []);

    console.log((await client.query(`SELECT plv8_version()`)).rows[0]);

    await client.query(`
    CREATE OR REPLACE FUNCTION plv8_test() RETURNS JSON AS $$
    ${code}
    $$ LANGUAGE plv8 IMMUTABLE STRICT;
    `);

    console.log(JSON.stringify((await client.query(`
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

