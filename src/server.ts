import express from "express";
import cors from "cors";
import { pool } from "./db";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * HOME ROUTE
 */
app.get("/", (req, res) => {
  res.send("My Note API is working 🚀");
});

/**
 * CREATE NOTE
 */
app.post("/notes", async (req, res) => {
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );

    res.status(201).json({
      message: "Note created successfully",
      note: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating note",
    });
  }
});

/**
 * GET ALL NOTES
 */
app.get("/notes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notes ORDER BY id ASC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching notes",
    });
  }
});

/**
 * GET SINGLE NOTE
 */
app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM notes WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching note",
    });
  }
});

/**
 * UPDATE NOTE
 */
app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating note",
    });
  }
});

/**
 * DELETE NOTE
 */
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully",
      note: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting note",
    });
  }
});

/**
 * START SERVER
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});