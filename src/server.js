import Express from 'express';

let app = new Express ();
let counter = 0;

app.get ('*', (req, res) => {
  counter++;

  res.writeHead ({ 'Content-Type': 'application/json' });
  res.end (JSON.stringify ({ counter: counter }));
});

app.listen (process.env.PORT || 3000);
