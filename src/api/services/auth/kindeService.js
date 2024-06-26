const { jwtVerify } = require("@kinde-oss/kinde-node-express");
require("dotenv").config();

const your_domain = process.env.DB_DATABASE;
const client_id = process.env.CLERK_CLIENT_ID;
const client_secret = process.env.CLERK_CLIENT_SECRET;
const org = process.env.CLERK_ORG;

const jwtVerifier = jwtVerify("https://escogram.kinde.com", {
  audience: "",
});

const getAuthToken = async () => {
  try {
    const tokenResponse = await fetch(
      `https://${your_domain}.kinde.com/oauth2/token`,
      {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          audience: `https://${your_domain}.kinde.com/api`,
          grant_type: "client_credentials",
          client_id: client_id,
          client_secret: client_secret,
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to fetch token");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    return accessToken;
  } catch (error) {
    return false;
  }
};

const updateUserRole = async () => {
  try {
    const accessToken = await getAuthToken();

    const patchBodyData = {
      users: [
        {
          id: accountData.userId,
          roles: ["member"],
        },
      ],
    };

    const patchResponse = await fetch(
      `https://${your_domain}.kinde.com/api/v1/organizations/${org}/users`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(patchBodyData),
      }
    );

    if (!patchResponse.ok) {
      throw new Error("Failed to send PATCH request");
    }

    await patchResponse.json();
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  jwtVerifier,
  updateUserRole,
};
