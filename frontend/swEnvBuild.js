require('dotenv').config(); // make sure you have '.env' file in pwd
const fs = require('fs');

fs.writeFileSync('./public/swenv.js',
`
const process = {
  env: {
    VITE_APP_FCM_API_KEY: '${import.meta.env.VITE_APP_FCM_API_KEY}',
    VITE_APP_AUTH_DOMAIN: '${import.meta.env.VITE_APP_AUTH_DOMAIN}',
    VITE_APP_PROJECT_ID: '${import.meta.env.VITE_APP_PROJECT_ID}',
    VITE_APP_STORAGE_BUCKET: '${import.meta.env.VITE_APP_STORAGE_BUCKET}',
    VITE_APP_MESSAGING_SENDER_ID: '${import.meta.env.VITE_APP_MESSAGING_SENDER_ID}',
    VITE_APP_APP_ID: '${import.meta.env.VITE_APP_APP_ID}',
  }
}
`);