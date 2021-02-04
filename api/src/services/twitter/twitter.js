const Twit = require('twit')

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_PUBLIC,
  consumer_secret: process.env.TWITTER_CONSUMER_PRIVATE,
  access_token: process.env.TWITTER_ACCESS_PUBLIC,
  access_token_secret: process.env.TWITTER_ACCESS_PRIVATE,
})

export const writeTweet = (input) => {
  T.post(
    'statuses/update',
    {
      status: `💰 Hey @MrBeastYT , ${input.firstName} ${input.lastName} is RICHER than you. They paid $${input.amount} to put their name on https://imrichandicanproveit.com/ 💰`,
    },
    function (err, data, _response) {
      console.log(data)
    }
  )
}
