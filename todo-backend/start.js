const app =require("./server")
const dotenv = require("dotenv")
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });