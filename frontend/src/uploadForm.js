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
      const getBackendUrl = () => {
        const hostname = window.location.hostname;
        return `http://${hostname}:8000`;
      };

      const response = await axios.post(`${getBackendUrl()}/process`, formData);
      console.log(getBackendUrl())
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
    <div className='border-2 rounded-md p-4'>
      {isLoading && <p>Processando... Por favor, aguarde.</p>}
      {!isLoading && isCompleted && <p>{message}</p>}
      {!isLoading && !isCompleted && (
        <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <div className='flex- gap-2 items-center'>
              <label htmlFor="file-upload" className="text-sm font-orbitron">
                File:
              </label>

              <input
                id="file-upload"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                required
              />
              <label
                htmlFor="file-upload"
                className="font-orbitron text-[#22c55e] cursor-pointer inline-block px-2 py-1 border-2 hover:text-black text-sm font-semibold rounded-lg shadow hover:bg-white transition duration-200"
              >
                Choose file
              </label>
            </div>
            {file && (
              <p className="text-sm text-gray-600">Selected file: {file.name}</p>
            )}
          </div>


          <label className='flex gap-2 items-center'>
            Input language:
            <select className="rounded-sm text-black" value={inputLanguage} onChange={(e) => setInputLanguage(e.target.value)} required>
              <option value="">Select input language</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </label>

          <label className='flex gap-2 items-center'>
            Output format:
            <select className="rounded-sm text-black" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} required>
              {outputFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </label>

          <label className='flex gap-2 items-center'>
            Model type:
            <select className="rounded-sm text-black" value={modelType} onChange={(e) => setModelType(e.target.value)} required>
              {modelTypes.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </label>

          <label className='flex gap-2 items-center'>
            Method:
            <select className="rounded-sm text-black" value={actionType} onChange={(e) => setActionType(e.target.value)} required>
              {actionTypes.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </label>

          <label className='flex gap-2 items-center'>
            Device type:
            <select className="rounded-sm text-black" value={deviceType} onChange={(e) => setDeviceType(e.target.value)} required>
              {deviceTypes.map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
            </select>
          </label>

          <label className='flex gap-2 items-center'>
            Output path:
            <input
              type="text"
              className="rounded-sm text-black"
              value={outputDir}
              onChange={(e) => setOutputDir(e.target.value)}
              placeholder="Digite o caminho da pasta de saída"
              required
            />
          </label>

          <button className="text-[#22c55e] border-2 border-white shadow rounded-lg transition duration-200 p-2 font-orbitron hover:bg-white hover:text-black" type="submit">TRANSLATE</button>
        </form>
      )}
      {!isLoading && message && !isCompleted && <p>{message}</p>}
    </div>
  );
}

export default UploadForm;
