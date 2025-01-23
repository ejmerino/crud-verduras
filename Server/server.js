const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');  
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de GitHub
const GITHUB_OWNER = 'ejmerino';  
const GITHUB_REPO = 'verdurasjson';  
const GITHUB_FILE = 'verduras.json';  
const GITHUB_TOKEN = 'defaulttoken'; //Cambiar por el toker generado en GitHub (No subido por temas de seguirdad)  

// Función para obtener el archivo JSON desde GitHub
const getGitHubFileContent = async () => {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
  });

  const jsonContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
  
  // Aseguramos que el contenido sea un arreglo
  let data;
  try {
    data = JSON.parse(jsonContent);
    if (!Array.isArray(data)) {
      data = [];  // Si no es un array, inicializamos como un array vacío
    }
  } catch (error) {
    console.error("Error al parsear el JSON", error);
    data = [];  // Si hay error en el parseo, inicializamos como un array vacío
  }

  return data;
};

// Función para actualizar el archivo JSON en GitHub
const updateGitHubFile = async (data) => {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE}`;
  const currentFile = await axios.get(url, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
  });
  const currentSHA = currentFile.data.sha;
  const newContent = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');

  await axios.put(
    url,
    {
      message: 'Actualizar verdura',
      content: newContent,
      sha: currentSHA,
    },
    {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    }
  );
};

// Endpoint para leer el archivo JSON
app.get('/verduras', async (req, res) => {
  try {
    const data = await getGitHubFileContent();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos de GitHub' });
  }
});

// Endpoint para agregar una nueva verdura (POST)
app.post('/verduras', async (req, res) => {
    try {
      const newVerdura = req.body;  // Recibir la nueva verdura
      const data = await getGitHubFileContent();  // Obtener datos actuales
  
      // Aseguramos que data sea un array antes de hacer push
      if (Array.isArray(data)) {
        // Añadir la nueva verdura
        data.push(newVerdura);  // Añadir al final del array
  
        // Actualizar el archivo en GitHub
        await updateGitHubFile(data);
  
        res.json({ message: 'Verdura añadida exitosamente', newVerdura });
      } else {
        res.status(400).json({ error: 'El archivo JSON no es un arreglo' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar datos en GitHub' });
    }
  });
  

// Endpoint para actualizar una verdura (PUT)
app.put('/verduras', async (req, res) => {
  try {
    const updatedVerdura = req.body;
    const data = await getGitHubFileContent();

    // Aseguramos que data sea un array antes de buscar
    if (Array.isArray(data)) {
      // Buscar la verdura por ID
      const index = data.findIndex(verdura => verdura.id === updatedVerdura.id);
      if (index !== -1) {
        // Actualizar la verdura
        data[index] = updatedVerdura;

        // Actualizar el archivo en GitHub
        await updateGitHubFile(data);

        res.json({ message: 'Verdura actualizada exitosamente' });
      } else {
        res.status(404).json({ error: 'Verdura no encontrada' });
      }
    } else {
      res.status(400).json({ error: 'El archivo JSON no es un arreglo' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar datos en GitHub' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
