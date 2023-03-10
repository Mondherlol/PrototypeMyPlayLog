let hltb = require('howlongtobeat')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const apiConfig = {
  url: 'https://api.igdb.com/v4/games/',
  method: 'post',
  headers: {
    Authorization: process.env.IGDB_TOKEN,
    'Client-ID': process.env.IGDB_CLIENT_ID,
    'Content-Type': 'text/plain',
  },
}

exports.getGameById = (req, res) => {
  const id = req.params.id
  const data = `fields: name, cover, summary; where id=${id};`
  let config = { ...apiConfig, data }
  axios(config)
    .then((response) => {
      console.log(response.data[0].name)
      if (response.data[0].cover != undefined) {
        const cover = response.data[0].cover
        const coverConfig = {
          ...apiConfig,
          url: 'https://api.igdb.com/v4/covers/',
          data: `fields url, image_id; where id=${cover};`,
        }
        axios(coverConfig).then((resCov) => {
          const coverUrl = resCov.data[0].url
            .substring(2)
            .replace('t_thumb', 't_cover_big')
          response.data[0].cover = coverUrl
          res.status(200).json(response.data)
        })
      } else res.status(200).json(response.data)
    })
    .catch((err) => {
      res.send(err)
    })
}

exports.searchGame = (req, res) => {
  const name = req.params.name
  const data = `fields name, cover; search "${name}"; limit 25; `
  const config = { ...apiConfig, data }

  axios(config)
    .then((response) => {
      if (response.data.length < 1) {
        res.status(200).json(response.data)
        return
      }
      const covers = response.data.map((game) => {
        if (game.cover) return game.cover
        else return 1402
      })
      const coverConfig = {
        ...apiConfig,
        url: 'https://api.igdb.com/v4/covers/',
        data: `fields url, image_id;  where id=(${covers.join(
          ','
        )}); limit 25;`,
      }

      axios(coverConfig)
        .then((resCov) => {
          response.data.forEach((game) => {
            let cover = resCov.data.find((cov) => cov.id === game.cover) || null
            if (cover != null) {
              game.cover =
                'https://' +
                cover.url.substring(2).replace('t_thumb', 't_cover_big')
            }
          })
          res.status(200).json(response.data)
        })
        .catch((err) => {
          res.send(err)
        })
    })
    .catch((err) => {
      res.send(err)
    })
}

// function getTimeToComplete(name) {
//   let hltbService = new hltb.HowLongToBeatService()
//   hltbService.search(name).then((result) => console.log(result[0].gameplayMain))
// }
