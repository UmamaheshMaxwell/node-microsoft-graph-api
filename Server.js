const express = require("express")
const app = express();
const router = express.Router();
const config = require("./config")
const axios = require('axios');
const qs = require('qs');

const postData = {
    client_id: config.APP_ID,
    scope: config.MS_GRAPH_SCOPE,
    client_secret: config.APP_SECERET,
    grant_type: 'client_credentials'
};

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

router.get("/", (req, res)=>{
    axios.post(config.TOKEN_ENDPOINT, qs.stringify(postData))
    .then(response => {
        res.json(response.data)
    })
    .catch(error => {
        res.json({error})
    })
})

app.use("/api", router)

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server listening at PORT ${PORT}`)
})
