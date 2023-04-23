import mysql from 'mysql';

export class DatabaseController {
  establishDbConnection(req, res) {

    let { host, user, password, database, query, dbType } = req.body;

    if (dbType) dbType = dbType.toLowerCase();

    if (dbType == 'mysql' || dbType == 'mariadb' || !dbType) {

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
    } else if (dbType == 'postgresql') {
      //TO DO
      res.status(500).json({ error: 'PostegreSQL' });
    } else {
      res.status(500).json({ error: 'Database not supported, MySQL,MariaDB and PostgreSQL are currently supported DBs' });
    }


  }
}