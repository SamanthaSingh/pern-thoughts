const express = require('express');
const cors = require('cors');
const pool = require('./db');
const Filter = require('bad-words');

const app = express();
const port = process.env.PORT || 5000;
const filter = new Filter();

app.use(cors());
app.use(express.json());

app.post('/thought', async (req, res) => {
    try {
        const author = filter.clean(req.body.author);
        const thought = filter.clean(req.body.thought);
        const newThought = await pool.query("INSERT INTO thoughts (author, thought) VALUES ($1, $2) RETURNING *",
        [author, thought]);
        res.json(newThought);
    } catch (err) {
        console.error(err.message);
    }
})

app.get('/', async (req, res) => {
    try {
        const allThoughts = await pool.query("SELECT * FROM thoughts");
        res.json(allThoughts.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.get("/thought/:id", async(req,res) => {
  try {
    const { id } = req.params;
    const thought = await pool.query("SELECT * FROM thoughts WHERE thought_id = $1", [id]);
    res.json(thought.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

app.put("/thought/:id", async(req,res) => {
    try {
      const { id } = req.params;
      const author = filter.clean(req.body.author);
      const thought = filter.clean(req.body.thought);
      const updateThought = await pool.query("UPDATE thoughts SET author = $1, thought = $2  WHERE thought_id = $3", [author, thought, id]);
      res.json("Thought was updated!");
    } catch (err) {
      console.error(err.message);
    }
  })
  
  app.delete("/thought/:id", async(req,res) => {
    try {
      const { id } = req.params;
      const deleteThought = await pool.query("DELETE FROM thoughts WHERE thought_id = $1", [id]);
      res.json("Thought was deleted!");
    } catch (err) {
      console.error(err.message);
    }
  })

app.listen(port, ()=> {
    console.log(`Server is working on port:${port}`);
})

