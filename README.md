# S.A.R.A-C - Sistema Automatizado de Relatos Artificiais - Continuo

O objetivo do S.A.R.A-C é produzir e manter várias "notícias" falsas usando inteligência artificial.

## Visão Geral

O S.A.R.A-C é uma extensão do projeto [S.A.R.A](https://github.com/B00TT3R/S.A.R.A) que visa conscientizar as pessoas sobre as capacidades das inteligências artificiais modernas. Ele permite a geração automática de notícias usando modelos de IA e oferece a opção de publicá-las automaticamente no Facebook e no Instagram, enquanto ainda mantém separadamente fatos de diversas noticias gerados por ele mesmo em forma de tópicos, assim como continua esses tópicos automaticamente. O backend é desenvolvido em Laravel, enquanto o frontend utiliza React e Tailwind. O projeto é direcionado a desenvolvedores interessados em geração de texto por IA. É importante observar que o uso do S.A.R.A-C deve estar dentro dos limites legais e éticos.

## Funcionamento

O projeto consiste na criação e manutenção de noticias falsas separadas em tópicos que serão regularmente postadas no Facebook e no Instagram. O backend do projeto é desenvolvido em PHP com o framework Laravel, enquanto o frontend é construído com ReactJS.

## Preparação

Para conseguir fazer o programa funcionar localmente, alguns passos devem ser seguidos.

1. Clonar o repositório do GitHub em [https://github.com/B00TT3R/S.A.R.A-C](https://github.com/B00TT3R/S.A.R.A-C)
2. Criar o arquivo `.ENV`, copiando o arquivo `.ENV.EXAMPLE` e então renomeando para `.ENV`
    1. No Windows PowerShell, isso pode ser feito com o seguinte comando:

        ```powershell
        cp .env.example .env
        ```

3. Conectar o banco de dados MySQL no arquivo `.ENV`, colocando as informações corretas nos campos `DB_*`
4. Configurar OpenAI
    1. Conectar uma chave válida do OpenAI no campo `OPENAI_KEY`
    2. Colocar um modelo válido de geração de texto por chat em `OPENAI_TEXT_MODEL`, é recomendável que suporte as funções do ChatGPT para continuar os tópicos, ex: `gpt-3.5-turbo-0613`
    3. Colocar um modelo de geração de imagem em `OPENAI_IMAGE_MODEL` (serve apenas para controle, o texto escrito não tem uma diferença real na geração)
    4. Definir se o sistema deve usar funções no campo `OPENAI_FUNCTIONS`, elas servem para criar novos tópicos e continuar eles com informações raiz.
    5. Definir o máximo de tópicos por IA (padrão é 10), no campo `MAX_AI_TOPICS`, isso define a quantidade máxima de tópicos por IA; ao atingir esse máximo, o sistema continuará criando, mas apagará o mais antigo.
5. Configurar Facebook
    1. Inserir um token de página válido, e sem tempo de expiração, no campo `FACEBOOK_TOKEN`; esse token deve possuir as seguintes permissões:
        1. public_profile
        2. pages_manage_posts
        3. pages_read_user_content
        4. pages_manage_metadata
        5. pages_read_engagement
        6. pages_show_list
        7. pages_manage_instant_articles
    2. Inserir o ID de uma página que está dentro da aplicação do token no campo `FACEBOOK_PAGE_ID`
6. Configurar Instagram
    1. Inserir um token de usuário válido e sem tempo de expiração no campo `INSTAGRAM_USER_TOKEN`; o token deve ter as seguintes permissões:
        1. instagram_basic
        2. instagram_content_publish
        3. pages_read_engagement
        4. pages_manage_metadata
        5. pages_read_user_content
        6. pages_manage_posts
        7. public_profile
    2. Inserir um ID de usuário válido no campo `INSTAGRAM_USER_ID`, pode ser obtido no Meta Business Suite.
7. Gerar a chave
    1. O projeto clonado não possui uma chave de aplicação (necessária para o funcionamento do Laravel), portanto, basta rodar em um terminal:

        ```powershell
        php artisan key:generate
        ```

8. Instalar dependências:
    1. Para instalar as dependências do composer, execute:

        ```powershell
        composer install
        ```

    2. Para instalar as dependências do node, execute:

        ```powershell
        npm install
        ```

9. Migrar bancos de dados
    1. Para migrar os bancos, o Laravel conta com as migrations nativas, para gerar a estrutura, execute:

        ```powershell
        php artisan migrate:fresh
        ```

10. Executar
    1. Para executar o servidor Laravel, abra uma instância do terminal e escreva:

        ```powershell
        php artisan serve
        ```

    2. Posteriormente, para executar o servidor de desenvolvimento node, execute:

        ```powershell
        npm run dev
        ```

11. Executar a geração constante (opcional)
    1. Esse passo serve apenas para executar a geração constante de notícias; caso isso seja desejado, execute no terminal:

        ```powershell
        php artisan schedule:work
        ```

    2. Essa função serve para simular um serviço CRON no terminal, mas caso o projeto esteja na rede, é mais recomendado configurar um CRON de acordo com o sistema utilizado para executar o seguinte comando a cada minuto:

        ```powershell
        php artisan schedule:run
        ```
## Mais informações
Para mais informações, consulte a [documentação](https://robust-flare-c4e.notion.site/S-A-R-A-C-63560a4b67414defa7f64d5e639d8c15?pvs=4).
