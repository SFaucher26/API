const client = require("./connexion.js");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/jeux", (req, res) => {
  client.query(`SELECT * FROM jeux`, (err, result) => {
    if (!err) {
      res.status(200).send(result.rows);
    } else {
      res.status(500).send(err.message);
    }
  });
  client.end;
});

app.get("/jeux/:id", (req, res) => {
  client.query(`SELECT * FROM jeux WHERE id=${req.params.id}`, (err, data) => {
    if (!err) {
      if (data.rows.length === 0) {
        res.status(404).send(data.rows[0]);
      } else {
        res.status(200).send(err.message);
      }
    } else {
      res.status(500).send(err.message);
    }
  });
  client.end;
  //console.log(req.params);
});

app.post("/jeux", (req, res) => {
  const jeu = req.body;
  let insertQuery = `INSERT INTO jeux (name, release_date) 
                       VALUES('${jeu.name}', '${jeu.release_date}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Inséré avec succès");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

app.delete("/jeux/:id", (req, res) => {
  let insertQuery = `DELETE FROM jeux WHERE id=${req.params.id}`;

  client.query(insertQuery, (err, result) => {
    !err
      ? result.rowCount === 0
        ? res.status(404).send("déjà supprimé")
        : res.status(204).send("supprimé avec succès")
      : res.send(err.message);

    // if(!err){
    //     if(result.rowCount === 0){
    //         res.send('déjà supprimé')
    //     }
    //     res.send('Supprimé avec succès')
    // }else{
    //     res.send(err.message)
    // }
  });
  client.end;
});

client.connect();

app.listen(port, "localhost", () => {
  console.log(`server is listening on port"  ${port}`);
});
