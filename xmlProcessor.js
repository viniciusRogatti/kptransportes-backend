const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const xmlDirectory = path.join(__dirname, 'uploads'); // Caminho absoluto para o diretório de uploads
const processXML = require('./xmlParser');

// Verificar se existem arquivos no diretório inicialmente
const initialFiles = fs.readdirSync(xmlDirectory);
if (initialFiles.length === 0) {
  console.log('Não há arquivos XML para processar. Encerrando o processo.');
  process.exit(0);
}

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
    process.exit(1); // Encerrar o processo em caso de erro no watcher
  })
  .on('close', () => {
    console.log('Watcher encerrado. Todos os arquivos processados.');
    process.exit(0); // Encerrar o processo quando não houver mais arquivos para processar
  });

function processNextFile() {
  if (filesToProcess.length === 0) {
    watcher.close(); // Encerrar o watcher quando não houver mais arquivos para processar
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
