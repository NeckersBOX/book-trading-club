import Express from 'express';

let app = new Express ();
let counter = 0;

app.get ('/', (req, res) => {
  counter++;

  res.writeHead (200, { 'Content-Type': 'application/json' });
  res.end (JSON.stringify ({ counter: counter }));
});

app.get ('*', (req, res) => res.status(404).send ('Not found'));

app.listen (process.env.PORT || 3000);
