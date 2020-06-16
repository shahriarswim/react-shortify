const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const yup = require('yup');
const monk = require('monk');
const { nanoid } = require('nanoid');

require('dotenv').config();

const db = monk(process.env.MONGO_URL);
const urls = db.get('urls');
urls.createIndex('slug');

const app = express();
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// db schema
const schema = yup.object().shape({
  slug: yup
    .string()
    .trim()
    .matches(/[\w\-]/i),
  url: yup.string().url().required(),
});

app.get('/', (req, res) => res.send('Server is up and running! 😎'));

app.get('/:id', async (req, res) => {
  const { id: slug } = req.params;

  try {
    const url = await urls.findOne({ slug });

    if (url) {
      res.redirect(url.url);
    } else {
      res.redirect(`/?error=${slug} in use.`);
    }
  } catch (error) {
    res.redirect(`/?error=Link not found.`);
  }
});

app.post('/url', async (req, res, next) => {
  let { slug, url } = req.body;

  try {
    await schema.validate({
      slug,
      url,
    });

    if (!slug) {
      slug = nanoid(5).toLowerCase();
    } else {
      const existingSlug = await urls.findOne({ slug });

      if (existingSlug) {
        throw new Error('Slug in use 😅');
      }
    }

    const dbInsertData = {
      slug,
      url,
    };

    const dbInsert = await urls.insert(dbInsertData);
    res.json(dbInsert);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '☕️' : error.stack,
  });
});

// server port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
