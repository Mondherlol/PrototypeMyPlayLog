const psn = require('psn-api')

exports.getUserInfo = async (req, res) => {
  const username = req.params.username
  try {
    //authorization
    const accessCode = await psn.exchangeNpssoForCode(process.env.MYNPSSO)
    const authorization = await psn.exchangeCodeForAccessToken(accessCode)

    const response = await psn.getProfileFromUserName(authorization, username)
    res.status(200).json(response)
  } catch (err) {
    res.status(401).json(err)
  }
}

exports.getUserGames = async (req, res) => {
  const username = req.params.username

  try {
    //authorization
    const accessCode = await psn.exchangeNpssoForCode(process.env.MYNPSSO)
    const authorization = await psn.exchangeCodeForAccessToken(accessCode)

    //get user Id with username
    const userID = await (
      await psn.getProfileFromUserName(authorization, username)
    ).profile.accountId

    //get all games
    const response = await psn.getUserTitles(authorization, userID)
    var games = [
      ...new Set(
        response.trophyTitles.map(({ trophyTitleName }) => trophyTitleName)
      ),
    ]
    res.status(200).json({ Games: games })

    //fama problem mayhotelekch esm el game ama esm trophies eli lgame samethom
    //kima fi apex yektebli "apex legens Trophies" w houni manajmch nrbot bil IGDB
    // se3at games yhabtou extensions eli houma mch mawjoudin fil IGDB
  } catch (err) {
    res.status(401).json(err)
  }
}

exports.getUserTrophies = async (req, res, next) => {
  const username = req.params.username

  try {
    //authorization
    const accessCode = await psn.exchangeNpssoForCode(process.env.MYNPSSO)
    const authorization = await psn.exchangeCodeForAccessToken(accessCode)

    //get user Id with username
    const userID = await (
      await psn.getProfileFromUserName(authorization, username)
    ).profile.accountId

    //get all Trophies with additional informations
    const response = await psn.getUserTitles(authorization, userID)
    res.status(200).json(response)
  } catch (err) {
    res.status(401).json(err)
  }
}
