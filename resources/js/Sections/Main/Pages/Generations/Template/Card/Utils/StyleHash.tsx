//esse arquivo precisa ser em tsx, para poder compilar o tailwind!
export default function StyleHashCase(key: string): { wrapper: string } {
    switch (key) {
      case "Requisição a openAI (imagem)":
        return {
            wrapper: "border-green-100 hover:shadow-green-200 " 
        }

      case "Requisição a openAI (texto)":
        return {
            wrapper: "border-green-100 hover:shadow-green-200 " 
        }

      case "Checagem de nome de pagina":
        return {
            wrapper: "border-blue-100 hover:shadow-blue-200 " 
        }

      case "Criação de post para facebook":
        return {
            wrapper: "border-blue-100 hover:shadow-blue-200 " 
        }

      default:
        return {
            wrapper: "bg-red-500" 
        }

    }
  }
  