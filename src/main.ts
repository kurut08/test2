import app from './app';

const port = 3005;

app.listen(port, () => {
    console.log(`os-status-backend API is listening at http://localhost:${port}`);
});