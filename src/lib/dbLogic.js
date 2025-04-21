import axios from "axios";

// Funciton to save a score to the database
export async function saveScore(score) {
  try {
    const response = await axios.post("/api/save-score", { score });
    return response.data.message; // e.g., "Score saved"
  } catch (error) {
    console.error("Error saving score:", error);
  }
}

// Function to get user top 5 high scores (deletes scores not in top 5)
export async function getHighscores() {
  try {
    const response = await axios.get("/api/highscores");
    return {
      scores: response.data.scores || [],
      message: response.data.message || "Top scores retrieved",
    };
  } catch (error) {
    console.error("Error fetching high scores:", error);
  }
}

// Function to get top 10 all-time top scores
export async function getLeaderboard() {
  try {
    const response = await axios.get("/api/leaderboard");
    return {
      scores: response.data.scores || [],
      message: response.data.message || "All-time top scores retrieved",
    };
  } catch (error) {
    console.error("Error fetching leaderboard scores:", error);
    return {
      scores: [],
      message: "Failed to retrieve leaderboard scores",
    };
  }
}
