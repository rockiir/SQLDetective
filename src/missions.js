export const missions = [
  {
    id: 1,
    location: "Global",
    description: {
      en: "Find all cities in the database.",
      pt: "Encontre todas as cidades no banco de dados."
    },
    solution: "SELECT * FROM cities",
    hints: [
      { en: "Use SELECT to retrieve data from the cities table.", pt: "Use SELECT para recuperar dados da tabela cities." },
      { en: "You don't need to filter anything yet. Just retrieve all rows.", pt: "Você não precisa filtrar nada ainda. Apenas recupere todas as linhas." }
    ]
  },
  {
    id: 2,
    location: "Tokyo",
    description: {
      en: "Carmen was last seen in Tokyo. Find all information about the city.",
      pt: "Carmen foi vista pela última vez em Tóquio. Encontre todas as informações sobre a cidade."
    },
    solution: "SELECT * FROM cities WHERE name = 'Tokyo'",
    hints: [
      { en: "Use SELECT to retrieve data from the cities table.", pt: "Use SELECT para recuperar dados da tabela cities." },
      { en: "Filter the results using WHERE to match the city name.", pt: "Filtre os resultados usando WHERE para corresponder ao nome da cidade." }
    ]
  },
  {
    id: 3,
    location: "Istanbul",
    description: {
      en: "Find all witnesses from Istanbul with high credibility (above 80).",
      pt: "Encontre todas as testemunhas de Istambul com credibilidade alta (acima de 80)."
    },
    solution: "SELECT * FROM witnesses WHERE city_id = 2 AND credibility > 80",
    hints: [
      { en: "Use SELECT to retrieve data from the witnesses table.", pt: "Use SELECT para recuperar dados da tabela witnesses." },
      { en: "Filter using WHERE to match the city_id and credibility.", pt: "Filtre usando WHERE para corresponder ao city_id e à credibilidade." }
    ]
  },
  {
    id: 4,
    location: "Cairo",
    description: {
      en: "Find all clues from Cairo, ordered by the most recent timestamp.",
      pt: "Encontre todas as pistas do Cairo, ordenadas pelo timestamp mais recente."
    },
    solution: "SELECT * FROM clues WHERE city_id = 3 ORDER BY timestamp DESC",
    hints: [
      { en: "Use SELECT to retrieve data from the clues table.", pt: "Use SELECT para recuperar dados da tabela clues." },
      { en: "Use ORDER BY to sort the results by timestamp in descending order.", pt: "Use ORDER BY para ordenar os resultados pelo timestamp em ordem decrescente." }
    ]
  },
  {
    id: 5,
    location: "Rio de Janeiro",
    description: {
      en: "Find all stolen artifacts and the cities where they were stolen.",
      pt: "Encontre todos os artefatos roubados e as cidades onde foram roubados."
    },
    solution: "SELECT a.name AS artifact, c.name AS city FROM artifacts a JOIN cities c ON a.city_id = c.id WHERE a.stolen = true",
    hints: [
      { en: "Use JOIN to combine data from the artifacts and cities tables.", pt: "Use JOIN para combinar dados das tabelas artifacts e cities." },
      { en: "Filter using WHERE to find only stolen artifacts.", pt: "Filtre usando WHERE para encontrar apenas artefatos roubados." }
    ]
  },
  {
    id: 6,
    location: "New York",
    description: {
      en: "Find cities with a population greater than 10 million.",
      pt: "Encontre cidades com população maior que 10 milhões."
    },
    solution: "SELECT name, population FROM cities WHERE population > 10000000",
    hints: [
      { en: "Use SELECT to retrieve data from the cities table.", pt: "Use SELECT para recuperar dados da tabela cities." },
      { en: "Filter using WHERE to find cities with population greater than 10 million.", pt: "Filtre usando WHERE para encontrar cidades com população maior que 10 milhões." }
    ]
  },
  {
    id: 7,
    location: "Paris",
    description: {
      en: "Find the most recent clue from each city.",
      pt: "Encontre a pista mais recente de cada cidade."
    },
    solution: "SELECT c.name AS city, cl.description, MAX(cl.timestamp) AS latest_clue FROM clues cl JOIN cities c ON cl.city_id = c.id GROUP BY c.name",
    hints: [
      { en: "Use JOIN to combine data from the clues and cities tables.", pt: "Use JOIN para combinar dados das tabelas clues e cities." },
      { en: "Use GROUP BY to group the results by city.", pt: "Use GROUP BY para agrupar os resultados por cidade." },
      { en: "Use MAX to find the most recent timestamp for each city.", pt: "Use MAX para encontrar o timestamp mais recente de cada cidade." }
    ]
  },
  {
    id: 8,
    location: "London",
    description: {
      en: "Find cities with more than one clue.",
      pt: "Encontre cidades com mais de uma pista."
    },
    solution: "SELECT c.name, COUNT(cl.id) AS clue_count FROM cities c JOIN clues cl ON c.id = cl.city_id GROUP BY c.name HAVING clue_count > 1",
    hints: [
      { en: "Use JOIN to combine data from the cities and clues tables.", pt: "Use JOIN para combinar dados das tabelas cities e clues." },
      { en: "Use GROUP BY to group the results by city.", pt: "Use GROUP BY para agrupar os resultados por cidade." },
      { en: "Use HAVING to filter cities with more than one clue.", pt: "Use HAVING para filtrar cidades com mais de uma pista." }
    ]
  },
  {
    id: 9,
    location: "Global",
    description: {
      en: "Find the average population of all cities.",
      pt: "Encontre a população média de todas as cidades."
    },
    solution: "SELECT AVG(population) AS average_population FROM cities",
    hints: [
      { en: "Use AVG to calculate the average population.", pt: "Use AVG para calcular a população média." },
      { en: "Use SELECT to retrieve the result.", pt: "Use SELECT para recuperar o resultado." }
    ]
  },
  {
    id: 10,
    location: "Global",
    description: {
      en: "Find cities with a population above the global average.",
      pt: "Encontre cidades com população acima da média global."
    },
    solution: "SELECT name, population FROM cities WHERE population > (SELECT AVG(population) FROM cities)",
    hints: [
      { en: "Use a subquery to calculate the global average population.", pt: "Use uma subconsulta para calcular a população média global." },
      { en: "Filter using WHERE to find cities with population above the average.", pt: "Filtre usando WHERE para encontrar cidades com população acima da média." }
    ]
  },
  {
    id: 11,
    location: "Global",
    description: {
      en: "Find the total number of stolen artifacts per city.",
      pt: "Encontre o número total de artefatos roubados por cidade."
    },
    solution: "SELECT c.name, COUNT(a.id) AS stolen_count FROM cities c JOIN artifacts a ON c.id = a.city_id WHERE a.stolen = true GROUP BY c.name",
    hints: [
      { en: "Use JOIN to combine data from the cities and artifacts tables.", pt: "Use JOIN para combinar dados das tabelas cities e artifacts." },
      { en: "Use GROUP BY to group the results by city.", pt: "Use GROUP BY para agrupar os resultados por cidade." },
      { en: "Use COUNT to count the number of stolen artifacts.", pt: "Use COUNT para contar o número de artefatos roubados." }
    ]
  },
  {
    id: 12,
    location: "Global",
    description: {
      en: "Find cities with names containing the word 'new'.",
      pt: "Encontre cidades com nomes que contenham a palavra 'new'."
    },
    solution: "SELECT * FROM cities WHERE name LIKE '%new%'",
    hints: [
      { en: "Use LIKE to search for partial matches in the city name.", pt: "Use LIKE para buscar correspondências parciais no nome da cidade." },
      { en: "Use '%new%' to find cities with 'new' anywhere in their name.", pt: "Use '%new%' para encontrar cidades com 'new' em qualquer parte do nome." }
    ]
  }
];