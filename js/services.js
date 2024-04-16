function htmlGeneratorForArtists(artistsArr) {
  let html = '';
  for(let artist of artistsArr) {
    const artistHtml = `<div class="artist-card" id="${artist.id}">
      <a href="${artist.URL}">
        <img src="${artist.artistImage}" alt="${artist.name}">
        <div class="card-title-container">
          <div class="card-title">
            ${artist.name}
          </div>
        </div>
      </a>
    </div>`;
    html = html.concat(artistHtml);
  }
  return html;
}

// document.querySelector('.artists-container').innerHTML = htmlGeneratorForArtists(homePageArtists);

function createCardsFromArray(data, sectionKeyword) {
  let container = document.querySelector(`.${sectionKeyword}s-container`)
  // let container = document.querySelector(`.songs-container`)
  let delay = 0.5
  let animationType = true
  const animLeft = 'summon-left'
  const animRight = 'summon-right'
  for(let cardData of data) {
    const card = document.createElement('div')
    card.setAttribute('class', `${sectionKeyword}-card`)
    card.style.animation = `0.5s ease ${delay}s forwards ${animationType ? animLeft : animRight}`
    delay = delay + 0.5
    animationType = !animationType

    const link = document.createElement('a')
    link.setAttribute('href', cardData.url)
    card.appendChild(link)

    const img = document.createElement('img')
    img.setAttribute('src', cardData.image)
    img.setAttribute('alt', cardData.name)
    link.appendChild(img)

    const cardTitleContainer = document.createElement('div')
    cardTitleContainer.setAttribute('class', 'card-title-container')
    const cardTitle = document.createElement('div')
    cardTitle.setAttribute('class', 'card-title')
    const name = document.createTextNode(cardData.name)
    cardTitle.appendChild(name)
    cardTitleContainer.appendChild(cardTitle)
    link.appendChild(cardTitleContainer)
    
    container.appendChild(card)
  }
}


function songElements(data) {

  let lyricsContainer = document.querySelector('.lyrics')
  const lyricsParagraph = document.createElement('p')
  const lyrics = document.createTextNode(data.lyrics)
  lyricsParagraph.appendChild(lyrics)
  
  lyricsContainer.appendChild(lyricsParagraph)
}

export {createCardsFromArray, songElements}