# S.A.R.A - Sistema Automatizado de Relatos Artificiais

S.A.R.A significa Sistema Automatizado de Relatos Artificiais.

O objetivo do S.A.R.A é produzir e manter uma "notícia" falsa usando inteligência artificial.

## Visão Geral

O S.A.R.A (Sistema Automatizado de Relatos Artificiais) é um projeto que visa conscientizar as pessoas sobre as capacidades das inteligências artificiais modernas. Ele permite a geração automática de notícias usando modelos de IA e oferece a opção de publicá-las automaticamente no Facebook. O backend é desenvolvido em Laravel, enquanto o frontend utiliza React e Tailwind. O projeto é direcionado a desenvolvedores interessados em geração de texto por IA. É importante observar que o uso do S.A.R.A deve estar dentro dos limites legais e éticos. Para obter mais informações e suporte, consulte a documentação do projeto.

## Funcionamento

O projeto consiste na criação e manutenção de uma notícia falsa que será regularmente postada no Facebook. O backend do projeto é desenvolvido em PHP com o framework Laravel, enquanto o frontend é construído com ReactJS.

# Preparação

Para conseguir fazer o programa funcionar localmente, siga os passos abaixo:

1. Clonar o repositório do GitHub:
- git clone https://github.com/B00TT3R/S.A.R.A

2. Criar o arquivo `.ENV`:
- Copie o arquivo `.ENV.EXAMPLE` e renomeie para `.ENV`.
- No Windows PowerShell, utilize o seguinte comando:
  ```
  cp .env.example .env
  ```

3. Conectar o banco de dados MySQL:
- No arquivo `.ENV`, preencha as informações corretas nos campos `DB_*`.

4. Configurar o OpenAI:
- No arquivo `.ENV`, configure as seguintes chaves:
  - `OPENAI_KEY`: insira uma chave válida do OpenAI.
  - `OPENAI_TEXT_MODEL`: coloque um modelo válido de geração de texto.
  - `OPENAI_TEXT_GEN_TYPE`: defina como "chat" ou "completion" (compatível com o modelo de geração de texto).
  - `OPENAI_IMAGE_MODEL`: coloque um modelo de geração de imagem (apenas para controle, o texto escrito não tem diferença real na geração).

5. Configurar o Facebook:
- No arquivo `.ENV`, preencha as seguintes chaves relacionadas ao Facebook:
  - `FACEBOOK_PAGE_TOKEN`: insira um token de página válido e sem tempo de expiração, com as seguintes permissões:
    1. public_profile
    2. pages_manage_posts
    3. pages_read_user_content
    4. pages_manage_metadata
    5. pages_read_engagement
    6. pages_show_list
    7. pages_manage_instant_articles
  - `FACEBOOK_PAGE_ID`: insira o ID de uma página presente na aplicação associada ao token.

6. Gerar a chave:
- No terminal, execute o seguinte comando:
  ```
  php artisan key:generate
  ```

7. Instalar dependências:
- Para instalar as dependências do Composer, execute:
  ```
  composer install
  ```
- Para instalar as dependências do Node, execute:
  ```
  npm install
  ```

8. Migrar bancos de dados:
- Para criar a estrutura do banco de dados, execute:
  ```
  php artisan migrate:fresh
  ```

9. Executar o servidor:
- No terminal, inicie o servidor Laravel com o seguinte comando:
  ```
  php artisan serve
  ```
- Em outra instância do terminal, execute o servidor de desenvolvimento Node:
  ```
  npm run dev
  ```

10. Executar a geração constante (opcional):
 - Caso deseje gerar notícias constantemente, execute no terminal:
   ```
   php artisan schedule:work
   ```
 - Essa função simula um serviço CRON no terminal. Se o projeto estiver em rede, é recomendado configurar um CRON de acordo com o sistema utilizado e executar o seguinte comando a cada minuto:
   ```
   php artisan schedule:run
   ```


## Documentação

Acesse a [documentação do projeto](https://robust-flare-c4e.notion.site/S-A-R-A-63932ca5038f4720a0d1c780ef31c0cf?pvs=4) para obter mais informações sobre sua utilização e funcionamento.

