require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');

const app = express();
const publicPath = path.join(__dirname, 'public');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));

app.get('/api/userList/:currentUser', (req, res, next) => {
  const { currentUser } = req.params;
  const params = [currentUser];
  const sql = `
  select "u"."userId",
         "u"."userName",
         "u"."imageUrl",
         "u"."userDescription",
         "t"."tags"
    from "user" as "u"
    left join lateral (
      select json_agg("t") as "tags"
      from (
        select "t".*
          from "userTags"
          join "tags" as "t" using ("tagId")
         where  "userTags"."userId" = "u"."userId"
      ) as "t"
    ) as "t" on true
    where NOT "userId" = $1
  `;
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/user/:userId', (req, res, next) => {
  const params = [Number(req.params.userId)];
  const sql = `
  select "u"."userId",
         "u"."userName",
         "u"."imageUrl",
         "u"."userDescription",
         "t"."tags"
    from "user" as "u"
    left join lateral (
      select json_agg("t") as "tags"
      from (
        select "t".*
          from "userTags"
          join "tags" as "t" using ("tagId")
         where  "userTags"."userId" = "u"."userId"
      ) as "t"
    ) as "t" on true
    where "userId" = $1
  `;
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      res.json(entry);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
