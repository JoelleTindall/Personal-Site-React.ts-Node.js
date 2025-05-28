const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use(express.urlencoded({ extended: true }));

app.post('/contact', (req, res) => {
    console.log('Received form data:', req.body);
    res.status(200).send('Form data received!');
});


app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});