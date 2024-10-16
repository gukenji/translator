import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [inputLanguage, setInputLanguage] = useState('');
  const [outputFormat, setOutputFormat] = useState('txt');
  const [modelType, setModelType] = useState('turbo');
  const [actionType, setActionType] = useState('transcribe');
  const [deviceType, setDeviceType] = useState('cpu');
  const [outputDir, setOutputDir] = useState('');  // String para o caminho da pasta de saída

  const [isLoading, setIsLoading] = useState(false);     // Estado de carregamento
  const [isCompleted, setIsCompleted] = useState(false); // Estado de conclusão
  const [message, setMessage] = useState('');            // Mensagem de erro ou sucesso

  // Lista de opções para input_language
  const languages = [
    'af', 'am', 'ar', 'as', 'az', 'ba', 'be', 'bg', 'bn', 'bo', 'br', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en', 'es', 'et', 'eu', 'fa', 'fi', 'fo', 'fr', 'gl', 'gu', 'ha', 'haw', 'he', 'hi', 'hr', 'ht', 'hu', 'hy', 'id', 'is', 'it', 'ja', 'jw', 'ka', 'kk', 'km', 'kn', 'ko', 'la', 'lb', 'ln', 'lo', 'lt', 'lv', 'mg', 'mi', 'mk', 'ml', 'mn', 'mr', 'ms', 'mt', 'my', 'ne', 'nl', 'nn', 'no', 'oc', 'pa', 'pl', 'ps', 'pt', 'ro', 'ru', 'sa', 'sd', 'si', 'sk', 'sl', 'sn', 'so', 'sq', 'sr', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'tk', 'tl', 'tr', 'tt', 'uk', 'ur', 'uz', 'vi', 'yi', 'yo', 'yue', 'zh'
  ];

  // Lista de opções para output_format
  const outputFormats = ['txt', 'vtt', 'srt', 'tsv', 'json', 'all'];

  // Lista de opções para model_type
  const modelTypes = ['turbo', 'large'];

  // Lista de opções para action_type
  const actionTypes = ['translate', 'transcribe'];

  // Lista de opções para device_type
  const deviceTypes = ['cuda', 'cpu'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetar estados
    setIsLoading(true);
    setIsCompleted(false);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('input_language', inputLanguage);
    formData.append('output_format', outputFormat);
    formData.append('model_type', modelType);
    formData.append('action_type', actionType);
    formData.append('device_type', deviceType);
    formData.append('output_dir', outputDir);  // Adicionando o diretório de saída como string

    try {
      const response = await axios.post('http://localhost:5000/process', formData);

      console.log(response.data.output_filename)
      // Atualizar estados após conclusão
      setIsLoading(false);
      setIsCompleted(true);
      setMessage(`Processamento concluído com sucesso! Verifique em ${outputDir}/${response.data.output_filename}`);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setIsLoading(false);
      setIsCompleted(false);
      setMessage('Ocorreu um erro durante o processamento. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      {isLoading && <p>Processando... Por favor, aguarde.</p>}
      {!isLoading && isCompleted && <p>{message}</p>}
      {!isLoading && !isCompleted && (
        <form onSubmit={handleSubmit}>
          <label>
            Arquivo:
            <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
          </label>
          <br />

          <label>
            Linguagem de Input:
            <select value={inputLanguage} onChange={(e) => setInputLanguage(e.target.value)} required>
              <option value="">Selecione a linguagem</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Formato de Output:
            <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} required>
              {outputFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Tipo de Modelo:
            <select value={modelType} onChange={(e) => setModelType(e.target.value)} required>
              {modelTypes.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Tipo de Ação:
            <select value={actionType} onChange={(e) => setActionType(e.target.value)} required>
              {actionTypes.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Tipo de Dispositivo:
            <select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} required>
              {deviceTypes.map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Pasta de Saída:
            <input
              type="text"
              value={outputDir}
              onChange={(e) => setOutputDir(e.target.value)}
              placeholder="Digite o caminho da pasta de saída"
              required
            />
          </label>
          <br />

          <button type="submit">Enviar</button>
        </form>
      )}
      {!isLoading && message && !isCompleted && <p>{message}</p>}
    </div>
  );
}

export default UploadForm;
