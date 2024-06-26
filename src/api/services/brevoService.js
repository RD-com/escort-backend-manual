require("dotenv").config();

const brevoHeaders = new Headers();

brevoHeaders.append("accept", "application/json");
brevoHeaders.append("api-key", process.env.BREVO_API);
brevoHeaders.append("content-type", "application/json");

const createContact = async (name, email) => {
  try {
    const raw = JSON.stringify({
      attributes: {
        FNAME: name,
      },
      updateEnabled: false,
      email: email,
      emailBlacklisted: false,
      smsBlacklisted: false,
    });

    const brevoRequestOptions = {
      method: "POST",
      headers: brevoHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("https://api.brevo.com/v3/contacts", brevoRequestOptions)
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    return true;
  } catch (error) {
    return false;
  }
};

const addContactToList = async (email, listId) => {
  try {
    const listRaw = JSON.stringify({
      emails: [email],
    });

    const brevoListRequestOptions = {
      method: "POST",
      headers: brevoHeaders,
      body: listRaw,
      redirect: "follow",
    };

    await fetch(
      `https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`,
      brevoListRequestOptions
    )
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { createContact, addContactToList };
