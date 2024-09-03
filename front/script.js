document.getElementById('obter-preco-bitcoin').addEventListener('click', function() {
    fetch('http://localhost:3000/api/bitcoin-price')
    .then(response => response.json())
    .then(data => {
        document.getElementById('coingecko-saida').textContent = `Preço do Bitcoin: $${data.bitcoin.usd}`;
    })
    .catch(error => console.error('Erro:', error));
});

document.getElementById('obter-resultados-f1').addEventListener('click', function() {
    fetch('http://localhost:3000/api/f1-results')
    .then(response => response.json())
    .then(data => {
        if (data && data.MRData && data.MRData.RaceTable && data.MRData.RaceTable.Races && data.MRData.RaceTable.Races.length > 0) {
            const resultados = data.MRData.RaceTable.Races[0].Results;
            const saida = resultados.map(result => `${result.Driver.familyName} (${result.Constructor.name}) - Posição: ${result.position}`).join('<br>');
            document.getElementById('f1-saida').innerHTML = saida;
        } else {
            document.getElementById('f1-saida').textContent = 'Nenhum dado de corrida disponível.';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('f1-saida').textContent = 'Falha ao buscar os resultados da corrida.';
    });
});

document.getElementById('obter-informacoes').addEventListener('click', function() {
    const gameName = document.getElementById('game-name').value.trim();
    const tagLine = document.getElementById('tag-line').value.trim();

    if (!gameName || !tagLine) {
        document.getElementById('saida').textContent = 'Por favor, insira um Riot ID válido (gameName e tagLine).';
        return;
    }

    console.log('Enviando gameName:', gameName);
    console.log('Enviando tagLine:', tagLine);

    fetch(`http://localhost:3000/api/riot-info?gameName=${encodeURIComponent(gameName)}&tagLine=${encodeURIComponent(tagLine)}`)
    .then(response => response.json())
    .then(data => {
        console.log('Resposta recebida do backend:', data);
        if (data.error) {
            document.getElementById('saida').textContent = 'Erro ao buscar informações: ' + data.error;
        } else {
            const tabela = `
                <table border="1" cellpadding="5" cellspacing="0">
                    <tr>
                        <th>PUUID</th>
                        <td>${data.puuid}</td>
                    </tr>
                    <tr>
                        <th>ID do Invocador</th>
                        <td>${data.summonerID}</td>
                    </tr>
                    <tr>
                        <th>ID da Conta</th>
                        <td>${data.accountId}</td>
                    </tr>
                    <tr>
                        <th>ID do Ícone de Perfil</th>
                        <td>${data.profileIconId}</td>
                    </tr>
                    <tr>
                        <th>Nível do Invocador</th>
                        <td>${data.summonerLevel}</td>
                    </tr>
                </table>
            `;
            document.getElementById('saida').innerHTML = tabela;
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('saida').textContent = 'Falha ao buscar informações do invocador.';
    });
});
