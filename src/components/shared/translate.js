function translate(key) {
    switch (key) {
        case "DIAMONDS": return "Ruutu"
        case "HEARTS": return "Hertta"
        case "SPADES": return "Pata"
        case "CLUBS": return "Risti"
        case "PLAY_CARD": return "Pelaa kortti"
        case "FOLD": return "Mene pakkaan"
        case "CUT": return "Nosta"
        case "DEAL": return "Jaa"
        case "DISCARD": return "Tyhjennä"
        case "SPEAK": return "Puhu"
        case "PASS": return "Viitenä"
        case "CHANGE": return "Värjäisin"
        case "KEEP": return "Päältä"
        case "SPEAK_SUIT": return "Valitse valtti"
        case "ACE_OR_TWO_DECISION": return "Päätä hakki"
        case "ADJUST_PLAYERS_IN_GAME": return "Lisää/poista pelaajia"
        default: return "***puuttuva käännös***"
      }
}

export default translate