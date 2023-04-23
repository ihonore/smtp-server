import mysql from 'mysql';

export class DatabaseController {
  establishDbConnection(req, res) {

    const { host, user, password, database, query } = req.body;

    const connection = mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to database:', err);
        res.status(500).json({ error: 'Error connecting to database' });
        return;
      }

      connection.query(query, (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Error executing query, Please make sure your SQL query is Valid' });
          return;
        }

        res.json({ results });
      });
    });

  }
}