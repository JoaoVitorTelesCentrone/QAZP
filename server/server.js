const express = require('express');
const app = express()

app.get("/api", (req, res) => { 
    res.json({"users": ["use1", "use2", "use3"]})
})

app.listen(5000, () => {console.log("Server on")}) 