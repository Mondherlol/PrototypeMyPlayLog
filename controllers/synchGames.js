const apiConfig = {
  url: 'https://api.igdb.com/v4/games/',
  method: 'post',
  headers: {
    Authorization: 'Bearer vu57a9n1nj1dlgr80z91knet3puvmj',
    'Client-ID': '6jv4rs9l9dyzch8x0tiyziccpv6wat',
    'Content-Type': 'text/plain',
  },
}

exports.getGameByName = (name) => {
  const data = `fields name, cover; search "${name}"; limit 20; `
  const config = { ...apiConfig, data }

  axios(config)
    .then((response) => {
      if (response.data.length < 1) {
        console.log('Aucun resultat.')
        res.status(200).end('Pas de resultat.')
        return
      }
      const cover = response.data[0].cover ? game.cover : 1402
      const coverConfig = {
        ...apiConfig,
        url: 'https://api.igdb.com/v4/covers/',
        data: `fields url, image_id;  where id=(${cover}); limit 1;`,
      }

      axios(coverConfig)
        .then((resCov) => {
          //   response.data.forEach((game) => {
          //     let cover = resCov.data.find((cov) => cov.id === game.cover) || null
          //     if (cover != null) {
          //       game.cover =
          //         'https://' +
          //         cover.url.substring(2).replace('t_thumb', 't_cover_big')
          //     }
          //   })
          let actualCover = resCov.data[0]
          if (cover != null)
            game.cover =
              'https://' +
              actualCover.url.substring(2).replace('t_thumb', 't_cover_big')
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
