# 📥 In-voi-tations!📥

A MERN stack app that allows you to manage and send invites by email and text message (SMS) to your friends!

![Invoitations Demo Gif](Invoitations.gif)

## Instructions
1. Make sure Node.js and npm is installed.
2. Set up a MongoDB database and obtain a connection string.
3. Obtain an API key for SendGrid and Abstract API's email validation API (Make sure to setup a verfied sender email for SendGrid).
4. Sign up for Twilio SMS API and note down your account SID and Auth token.
5. Obtain a Twilio phone number and note it down (including country code).
5. In the project directory, run `npm install` to install project dependencies.
6. In the project's server directory, run `npm install` again for server dependencies.
7. In the same directory, create a file for the app environment named `.env` with the following contents: 
````
INVITATIONS_DB_URI=[Insert MongoDB connection string here]
SENDGRID_API_KEY=[Insert SendGrid API key here]
SENDGRID_VERIFIED_SENDER=[Insert SendGrid verified sender here]
ABSTRACT_API_KEY=[Insert Abstract API email validation API key here]
TWILIO_ACCOUNT_SID=[Insert Twilio Account SID here]
TWILIO_AUTH_TOKEN=[Insert Twilio Auth Token here]
TWILIO_NUMBER=[Insert Twilio Number here]
PORT=5000
USER=[Insert your name here]
````
8. In the project directory, run `npm start` to start the application.
9. In the project's server directory, run `nodemon index` to start the back-end.
10. Visit [http://localhost:3000](http://localhost:3000) in your browser and follow the in-app instructions to send invitations to your friends!

## Technologies Used 💻

**Frameworks**: React, Node.js, Express, MongoDB, Bootstrap\
**APIs**: Twilio SendGrid API ✉️, Abstract API email validation API ✉️, Twilio SMS API 📟


## Roadmap 🚘

- ~~Add feature to send invites by SMS. 📟~~
- Add feature to accept voice input for sending invitations to an event using only the event name and names of friends. 🎤

