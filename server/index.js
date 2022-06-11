require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const { createServer } = require('http');
const { Server } = require('socket.io');
const pg = require('pg');
const uploadsMiddleware = require('./uploads-middleware');
const argon2 = require('argon2');
const { ClientError } = require('./client-error.js');
const jwt = require('jsonwebtoken');

const app = express();
const server = createServer(app);
const io = new Server(server);
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
app.use(express.json());

app.post('/api/signin', (req, res, next) => {
  const { username, password } = req.body;
  const params = [username];
  const sql = `
    select "userId", "hashedPassword"
      from "user"
      where "username" = $1
  `;
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid username');
      }
      const { userId, hashedPassword } = user;
      argon2
        .verify(hashedPassword, password)
        .then(result => {
          if (!result) {
            throw new ClientError(401, 'invalid password');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.status(200).json({ token, user: payload });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

io.on('connection', socket => {
  const { toUser, fromUser } = socket.handshake.query;
  const roomId = [toUser, fromUser].sort().join('-');
  socket.join(roomId);
});

app.get('/api/userList', (req, res, next) => {
  const params = [5];
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
      res.status(200).json(result.rows);
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

app.get('/api/chat', (req, res, next) => {
  const sql = `
   select *
     from "chat"
    where ("recipientId" = $1 and "senderId" = $2)
       or ("recipientId" = $2 and "senderId" = $1)
    order by "createdAt" asc
  `;
  const params = [2, 5];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/messages', (req, res, next) => {
  const { fromUser, toUser, message } = req.body;
  const roomId = [fromUser, toUser].sort().join('-');
  const params = [fromUser, toUser, message];
  const sql = `
  insert into "chat" ("senderId", "recipientId", "messageContent")
       values ($1, $2, $3)
    returning *
  `;
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      res.sendStatus(201);

      io.to(roomId).emit('message', entry);
    })
    .catch(err => next(err));
});

app.post('/api/register', uploadsMiddleware, (req, res, next) => {
  const { username, password, firstName, lastName, age, city, userDescription } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'Username and password required');
  }
  argon2
    .hash(password)
    .then(hashed => {
      const url = `${req.file.filename}`;
      let params = [username, hashed, userDescription, firstName, lastName, age, city, url];
      let sql = `
        insert into "user" ("userName", "hashedPassword", "userDescription", "firstName", "lastName", "age", "city", "imageUrl")
        values ($1, $2, $3, $4, $5, $6, $7, $8)
        returning "userId"
        `;
      db.query(sql, params)
        .then(result => {
          const [user] = result.rows;
          const tagsInt = req.body.tagsId.map(entry => {
            return Number(entry);
          });
          params = [user.userId, tagsInt];
          sql = `
            insert into "userTags" ("userId" ,"tagId")
            select $1, unnest($2::int[])
            returning *
          `;
          db.query(sql, params)
            .then(() => {
              res.sendStatus(201);
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));

});

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  process.stdout.write(`\n\nlistening on port ${process.env.PORT}\n\n`);
});
