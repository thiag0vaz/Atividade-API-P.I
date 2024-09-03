# Atividade-API-P.I
1. Riot Games API - Account-V1
Descrição:
A API Account-V1 da Riot Games é usada para acessar informações de contas de jogadores em diferentes jogos da Riot, como League of Legends, Valorant, e outros. Com esta API, você pode obter informações relacionadas a um jogador, como o PUUID, gameName, e tagLine, a partir do Riot ID. Essa API é especialmente útil para identificar jogadores de forma única e global em todas as plataformas da Riot.

Exemplo de Uso:
Um caso de uso comum é obter o PUUID de um jogador a partir do seu Riot ID (formado por gameName e tagLine). O PUUID é um identificador global e persistente que pode ser utilizado para rastrear o jogador em todos os jogos e serviços da Riot.

Verbos Suportados:
GET

Endpoint Exemplo: https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}?api_key={apiKey}
------------------------------------------------------------------------------------------------------------------------------------------------------------------
2. Riot Games API - Summoner-V4
Descrição:
A API Summoner-V4 da Riot Games é usada para obter informações detalhadas sobre um invocador no League of Legends, com base em diferentes identificadores, como PUUID, Summoner ID, ou nome de invocador. Essa API retorna informações como o nível do invocador, o ID da conta, o ID do perfil de invocador, entre outros dados relevantes para o jogador.

Exemplo de Uso:
Após obter o PUUID usando a API Account-V1, você pode usar a API Summoner-V4 para recuperar informações detalhadas sobre o perfil do jogador no League of Legends. Esta API é particularmente útil para obter dados que são específicos de um servidor ou região, como o summonerID e o nível do invocador.

Verbos Suportados:
GET

Endpoint Exemplo: https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}?api_key={apiKey}

3. CoinGecko API
Descrição:
A API CoinGecko é uma API pública que fornece informações de preços de criptomoedas em tempo real. A CoinGecko API permite que você obtenha o preço de diversas criptomoedas em várias moedas fiat, bem como dados de mercado, volume de negociações, e muito mais. Esta API é amplamente utilizada por desenvolvedores para integrar dados financeiros e de criptomoedas em suas aplicações.

Exemplo de Uso:
Você pode usar a CoinGecko API para buscar o preço atual do Bitcoin em dólares americanos (USD). Esta API é ideal para qualquer aplicação que precise exibir preços atualizados de criptomoedas ou realizar cálculos com base nesses preços.

Verbos Suportados:
GET

Endpoint Exemplo: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd

