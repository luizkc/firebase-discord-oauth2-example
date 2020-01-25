# Discord OAuth2 Flow with Firebase

Firebase provides great structure to create your own authentication system. However, the default providers list for external log-ins (oAuth2) is limited.

I'm a big fan of Discord and so here is a sample Firebase app that uses the Discord oAuth2 to create users in our Firebase Authentication and our Firestore database.

Please read the **Disclaimer** below if you have any issues.

If you need any help or assistance, feel free to reach me on Discord at `Creed Bratton#7146` or open an issue/pull request here on GitHub.

#### A brief summary of the process:

1.  User heads to `/api/login` and is redirected to Discord
2.  User signs in with their Discord credentials and authorizes our app
3.  Discord returns the user information to our `/api/auth` callback URI
4.  Using the information returned, we create Firebase user object in the Authentication tab
5.  A document in a Firestore database is also created inside a `users` collection

# How to Run

#### Setting up Discord

1.  Go to the [Discord Developer Portal](https://discordapp.com/developers/applications/)
2.  Create an application
3.  Make note of your `Client ID` and `Client Secret`
4.  Go into the OAuth2 tab and add the following redirect URI: `https://us-central1-<project-id>.cloudfunctions.net/api/auth` and **hit save!**
5.  Make note of the scopes you want from the bottom of the page

#### Setting Up Firebase

1.  Go to the [Firebase Console](https://console.firebase.google.com)
2.  Create your project and head to the `Authentcation` tab
3.  Enable Email/Password authentication
4.  Go to the `Database` tab and enable `Firestore Cloud` storage, more info on how to do this [here](https://firebase.google.com/docs/firestore/quickstart)
5.  Click the settings gear next to _Project Overview_ and select _Web_, add a nickname and get your `Config` object. If you are unsure what to do, follow the steps linked [here](https://support.google.com/firebase/answer/7015592?hl=en).

#### Setting up our Code

1.  Open the `info.js` folder inside the `functions` folder and replace all information in there with the information you got from Discord/Firebase
2.  Open the `.firebasesrc` file and fill in your project name. Note: if you do not see this file you must enable the visibility of hidden files on your operating system
3.  CD into the `functions` folder and say `npm install` to install al necessary packages
4.  Make sure you have Firebase Tools installed globally by saying `npm install -g firebase-tools`
5.  Inside your project directory say `firebase deploy`
6.  You should be prompted to login with Google, make sure you use the same account you used to setup your Firebase project in the steps above
7.  Your project should be live! Go to `https://us-central1-<project-id>.cloudfunctions.net/api/login` to see it in action
8.  Head over to Firebase and check out your users being added to the `Authentication` Tab
9.  Head over to your Firestore Database and notice how we store additional user information that the Firebase authentication system does not let us store, for example, a user's profile picture, joined servers, and more.

#### Disclaimer

This is my first Firebase project, pardon me if any conventions are improperly setup. If you see any issues that should be fixed please create an issue or open a pull request so I can fix them. Please send any suggestions to improve the security, flow or anything about this project.

#### To-Do

Integrate proper Firebase sign in and sign out using custom tokens and Firebase Admin.
