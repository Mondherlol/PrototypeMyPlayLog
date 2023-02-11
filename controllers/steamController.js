var axios = require('axios')

//Clé d'API
const steamKey = 'D63A16F7FA7B56526DC376DB41F30F8D'

//steamId pour tester :  76561198285816248

exports.getSteamUser = (req, res, next) => {
  var config = {
    method: 'get',
    url: `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamKey}&steamids=${req.params.steamId}`,
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
          url: `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamKey}&steamid=${req.params.steamId}&format=json&include_appinfo=true`,
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
