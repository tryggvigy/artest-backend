const btoa = require('btoa');
const fetch = require('node-fetch');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const apiTokenURL = process.env.SPOTIFY_ACCESS_TOKEN_URL;

async function fetchAccessToken() {
    // encodes client id and secret to base64
    const authParam = btoa(`${clientId}:${clientSecret}`);
    const tokenResponse = await fetch(apiTokenURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${authParam}`,
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        }),
    });

    // jsonify the api response and return the access token
    const tokenVal = await tokenResponse.json();

    return tokenVal;
}

module.exports = fetchAccessToken;
