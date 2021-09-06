const app = require('./app')

const port = 8080;
const host = '0.0.0.0';

app.listen(port, host, () => {
    console.log(`Now server listens on PORT: ${port}`);
});
