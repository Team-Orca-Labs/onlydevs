const { pool } = require("./db");

class Match {
  createTable() {
    const query = `CREATE TABLE IF NOT EXISTS matches (
      id SERIAL PRIMARY KEY, 
      person1 INT NOT NULL REFERENCES users (id), 
      person2 INT NOT NULL REFERENCES users (id), 
      date_match TIMESTAMP)`;

    return pool.query(query);
  }

  async seed() {}

  //gets all previous matches
  getPrevMatch(selfId, otherId) {
    const query = `SELECT * FROM matches
    WHERE person2 = $1
    AND person1 = $2`;

    return pool.query(query, [selfId, otherId]);
  }

  //
  getAlreadyLiked(selfId, otherId) {
    //see all users you have liked
    const query = "SELECT * FROM matches WHERE person1 = $1 AND person2 = $2";

    return pool.query(query, [selfId, otherId]);
  }

  match(selfId, otherId) {
    //shows all users who liked you back
    const query = `UPDATE matches
    SET date_match = NOW()
    WHERE person2 = $1
    AND person1 = $2`;

    return pool.query(query, [selfId, otherId]);
  }

  create(selfId, otherId) {
    //adds a row into the matches table with two people who liked each other
    const query = `INSERT INTO matches (
        person1,
        person2
      )
      VALUES ($1, $2)`;
    return pool.query(query, [selfId, otherId]);
  }
  //selects all matches where the specified user is involved in the match
  getMatches(id) {
    const query = `SELECT * FROM matches
    WHERE date_match IS NOT NULL
    AND (person1 = $1 OR person2 = $1)`;

    return pool.query(query, [id]);
  }

  getLikedBy(id) {
    const query = `SELECT * FROM matches 
    WHERE date_match IS NULL
    AND person2 = $1`;

    return pool.query(query, [id]);
  }

  getLiked(id) {
    const query = `SELECT * FROM matches 
    WHERE date_match IS NULL
    AND person1 = $1`;

    return pool.query(query, [id]);
  }
}

const MatchModel = new Match();

module.exports = {
  MatchModel,
};
