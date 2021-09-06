const app = require('./app')

port = 8080
host = '0.0.0.0'

app.listen(port, host, () => {
    console.log(`Now server listens on PORT: ${port}`);
});
