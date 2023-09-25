import mysql from 'mysql';

export class DatabaseController {
  establishDbConnection(req, res) {

<<<<<<< HEAD
    let { host, user, password, database, query, dbType,port } = req.body;
=======
    let { host, user, password, database, query, dbType, port } = req.body;
>>>>>>> c64be94fb493b149bd3c9a777dade0ef93375b80

    dbType?.toLowerCase();

    if (dbType == 'mysql' || dbType == 'mariadb' || !dbType) {

      const connection = mysql.createConnection({
        host,
        user,
        port,
        password,
        database,
        port: port ? port : undefined
      });
      console.log(connection.config);

      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to database:', err);
          res.status(500).json({ error: 'Error connecting to database' });
          return;
        }
        console.log('Connected to Database🔴')
        connection.query(query, (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error executing query, Please make sure your SQL query is Valid' });
            return;
          }
          // console.log(results)
          res.json({ results });
        });
      });
    } else if (dbType == 'postgresql') {
      //TO DO
      res.status(500).json({ error: 'PostegreSQL Not intagrated yet' });
    } else {
      res.status(500).json({ error: 'Database not supported, MySQL,MariaDB and PostgreSQL are currently supported DBs' });
    }


  }
}