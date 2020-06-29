const express = require("express");
const morgan = require("morgan");
const pool = require("./db");

const app = express();

app.use(morgan("short"));
app.use(express.json());

//Routes

app.get("/", function (req, res) {
  res.send("<h1>Hello World</h1>");
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT title, description, status FROM todo"
    );
    res.json(allTodos.rows);
  } catch (err) {
    console.error(error.message);
  }
});

//get todo

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(error.message);
  }
});

//create todo

app.post("/todos", async (req, res) => {
  try {
    //await
    const { description, title, status } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, title, status) VALUES ($1,$2,$3) RETURNING *",
      [description, title, status]
    );

    res.json(newTodo);
  } catch (err) {
    console.error(error.message);
  }
});

//update todo

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description, title, status } = req.body;
  try {
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, title = $2, status = $3  WHERE todo_id = $4",
      [description, title, status, id]
    );
    res.json("Todo was updated!");
  } catch (error) {
    console.error(error.message);
  }
});

//delete todo

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json("Todo was deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

//Server Listen Port

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});
