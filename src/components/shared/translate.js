function translate(key) {
    switch (key) {
        case "DIAMONDS": return "Ruutu"
        case "HEARTS": return "Hertta"
        case "SPADES": return "Pata"
        case "CLUBS": return "Risti"
        case "PLAY_CARD": return "Pelaa kortti"
        case "CUT": return "Nosta"
        case "DEAL": return "Jaa"
        case "DISCARD": return "Tyhjennä"
        case "SET_VALTTI": return "Aseta valtti"
        default: return "***puuttuva käännös***"
      }
}

export default translate