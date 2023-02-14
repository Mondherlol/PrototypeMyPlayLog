var axios = require('axios')

//steamId pour tester :  76561198285816248

exports.getSteamUser = (req, res, next) => {
  var config = {
    method: 'get',
    url: `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAMKEY}&steamids=${req.params.steamId}`,
  }

  axios(config)
    .then(function (response) {
      let resultat = response.data.response.players
      if (resultat.length < 1)
        res.status(200).json({ message: 'Aucun resultat.' })
      else {
        let user = resultat[0]
        let pseudo = user.personaname
        let avatar = user.avatarfull
        console.log(pseudo)

        var configGames = {
          method: 'get',
          url: `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAMKEY}&steamid=${req.params.steamId}&format=json&include_appinfo=true`,
        }

        axios(configGames)
          .then((resGames) => {
            let games = resGames.data.response
            games.user = { pseudo: pseudo, avatar: avatar }
            res.status(200).json(games)
          })
          .catch((err) => {
            console.log(err)
            res.status(400).json(err)
          })
      }
    })
    .catch(function (error) {
      res.status(400).json(error)
    })
}
