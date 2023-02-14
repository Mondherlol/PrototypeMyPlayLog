const psn = require('psn-api')

function cleanNames(names) {
  return names.map((name) => {
    name = name.toLowerCase()
    name = name.replace('trophies', '')
    name = name.replace(/\n/g, '')
    // Supprime les caractères spéciaux à l'exception des tirets et apostrophes
    name = name.replace(/[^-\w\s']/gi, '')
    return name.trim()
  })
}

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
    games = cleanNames(games)
    res.status(200).json({ Games: games })
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
    // const response = await psn.getUserTitles(authorization, userID)
    const response = await getUserTrophiesEarnedForTitle(
      authorization,
      userId,
      'NPWR25088_00', // Red Dead Redemption
      'all',
      { npServiceName: 'trophy' }
    )
    console.log(response)
    res.status(200).json(response)
  } catch (err) {
    res.status(401).json(err)
  }
}
