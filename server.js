const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');

const app = express();

// Instantiate chatKit
const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:217dd4a1-d1ea-41ff-b37d-81696cfc7f00",
  key: "9cef2ed8-5001-4b94-adce-ee9b51f8211e:aVRV95jIecYN7lwBrs6vWP3/ldls9C1Q19/MtJCv4a8=",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Create user
app.post('/users', (req, res) => {
  const { username } = req.body;
  chatkit
    .createUser({ id: username, name: username })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      if (err.error === 'services/chatkit/user_already_exists') {
        res.status(200).send('User already exists');
      } else {
        res.status(err.status).json(err);
      }
    });
});

// authenticate pusher
app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});


const PORT = 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});