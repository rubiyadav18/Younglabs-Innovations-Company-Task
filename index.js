const mongoose = require("mongoose");
const express = require('express')
const app = express()
const db ="Add your mongodb url here"

app.use(express.json())
const port = 3000


mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user',require('./routes/user'))
app.use('/book',require('./routes/book'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



