//esse arquivo precisa ser em tsx, para poder compilar o tailwind!
export default function InfoHash(key: string): string {
    switch (key) {
      case "text":
        return "Texto"
      case "image":
        return "imagem"
      case "textinfo":
        return "Informação chave"
      default:
        return "desconhecido" 
    }
  }
  