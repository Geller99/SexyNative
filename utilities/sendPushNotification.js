
/*
    this method accepts the token, along with a string for the setup joke

    then makes a post request to the api endpoint

*/

export const sendPushNotification = async ({ expoPushToken, setup }) => {
  // push notification object
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Joke",
    body: setup,
  };

  // trigger expo notification backend, feed in the push notification object which will be sent to the user's device
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};
