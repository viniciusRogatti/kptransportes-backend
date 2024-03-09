const chokidar = require('chokidar');
const path = require('path');
const xmlDirectory = './uploads';
const processXML = require('./xmlParser');

// Configurar o watcher para monitorar a pasta "uploads" para novos arquivos .xml
const watcher = chokidar.watch(xmlDirectory, {
  ignored: /(^|[\/\\])\../, // Ignorar arquivos ocultos e outros arquivos não .xml
  persistent: true,
});

let filesToProcess = [];
let isProcessing = false;

watcher
  .on('add', (filePath) => {
    // Verifique se o arquivo é um arquivo XML
    if (path.extname(filePath) === '.xml') {
      filesToProcess.push(filePath);
      if (!isProcessing) {
        processNextFile();
      }
    }
  })
  .on('error', (error) => {
    console.error('Erro no watcher:', error);
  });

function processNextFile() {
  if (filesToProcess.length === 0) {
    return;
  }

  const filePath = filesToProcess.shift();
  isProcessing = true;
  processXML(filePath, () => {
    isProcessing = false;
    setTimeout(processNextFile, 100); // Agende a próxima leitura após 100 milissegundos
  });
}

console.log('Aguardando novos arquivos XML em', xmlDirectory);
