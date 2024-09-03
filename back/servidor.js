import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // Importar o middleware cors

const apiKey = 'RGAPI-01af871c-b036-42f3-9a88-f7c2cc40caf1';
const gameRegion = 'br1';
const accountRegion = 'americas';
const app = express();
const PORT = 3000;

// Habilitar CORS para todas as rotas
app.use(cors());

// Endpoint para obter o preço do Bitcoin
app.get('/api/bitcoin-price', async (req, res) => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao obter o preço do Bitcoin' });
    }
});

// Endpoint para obter resultados da Fórmula 1
app.get('/api/f1-results', async (req, res) => {
    try {
        const response = await fetch('http://ergast.com/api/f1/current/last/results.json');
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Conteúdo retornado:', errorText);  // Logar o conteúdo HTML
            throw new Error(`Erro ao acessar a API da Fórmula 1: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar resultados da F1:', error.message);
        res.status(500).json({ error: 'Falha ao procurar os resultados das corridas de F1' });
    }
});

// Endpoint para obter perfil no League of Legends
app.get('/api/riot-info', async (req, res) => {
    const { gameName, tagLine } = req.query;

    try {
        console.log('Recebido gameName:', gameName);
        console.log('Recebido tagLine:', tagLine);

        // Obter PUUID pelo Riot ID usando a região 'americas'
        const response1 = await fetch(`https://${accountRegion}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${apiKey}`);
        const data1 = await response1.json();

        console.log('Resposta da API Account-V1:', data1);

        if (response1.status === 404 || !data1.puuid) {
            throw new Error(`Riot ID ${gameName}#${tagLine} não encontrado.`);
        }

        const puuid = data1.puuid;

        // Obter Summoner Info pelo PUUID usando a região 'br1'
        const response2 = await fetch(`https://${gameRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`);
        const data2 = await response2.json();

        console.log('Resposta da API Summoner-V4:', data2);

        if (!data2.summonerLevel) {
            throw new Error('Informações do invocador não encontradas.');
        }

        res.json({
            puuid: puuid,
            summonerID: data2.id,
            accountId: data2.accountId,
            profileIconId: data2.profileIconId,
            summonerLevel: data2.summonerLevel
        });
    } catch (error) {
        console.error('Erro ao buscar informações:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});