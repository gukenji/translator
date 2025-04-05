import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [inputLanguage, setInputLanguage] = useState('');
  const [outputFormat, setOutputFormat] = useState('srt');
  const [modelType, setModelType] = useState('small');
  const [methodType, setmethodType] = useState('translate');
  const [deviceType, setDeviceType] = useState('cpu');
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [message, setMessage] = useState('');
  const [subtitlePath, setSubtitlePath] = useState('');
  const [originalVideoPath, setOriginalVideoPath] = useState('');
  const [embeddedVideoPath, setEmbeddedVideoPath] = useState('');
  const [options, setOptions] = useState({
    generateFile: false,
    embedSubtitle: false,
  });
  const [publicPath, setPublicPath] = useState('');
  const languages = ['en', 'pt', 'es', 'fr', 'de', 'it', 'nl', 'ru', 'zh', 'ja', 'ko', 'ar', 'tr', 'pl', 'ro', 'hu', 'el', 'cs', 'sk', 'uk', 'hi', 'th', 'vi', 'id', 'he', 'sv', 'no', 'fi', 'da'];

  const outputFormats = ['txt', 'vtt', 'srt', 'tsv', 'json'];

  const modelTypes = ['tiny', 'small', 'base', 'medium', 'turbo', 'large'];

  const methodTypes = ['translate', 'transcribe'];

  const deviceTypes = ['cuda', 'cpu'];

  const getBackendUrl = () => {
    const hostname = window.location.hostname;
    return `http://${hostname}:8000`;
  };

  const clearProcess = () => {
    setFile(null);
    setInputLanguage('');
    setOutputFormat('srt');
    setModelType('small');
    setmethodType('translate');
    setDeviceType('cpu');
    setIsLoading(false);
    setIsCompleted(false);
    setMessage('');
    setSubtitlePath('');
    setOriginalVideoPath('');
    setEmbeddedVideoPath('');
    setPublicPath('');
  }

  const downloadEmbeddedVideo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${getBackendUrl()}/download?filepath=${embeddedVideoPath}`, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      console.log(url)
      const link = document.createElement('a');
      console.log(link)
      link.href = url;
      link.setAttribute('download', embeddedVideoPath.split('/').pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
    catch (error) {
      console.error('Error while embedding subtitle:', error);
    }
  }

  const downloadSubtitle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${getBackendUrl()}/download?filepath=${subtitlePath}`, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', subtitlePath.split('/').pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error while downloading subtitle:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setIsCompleted(false);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('input_language', inputLanguage);
    formData.append('output_format', outputFormat);
    formData.append('model_type', modelType);
    formData.append('method', methodType);
    formData.append('device_type', deviceType);
    formData.append('embed_subtitle', options.embedSubtitle);

    try {
      const response = await axios.post(`${getBackendUrl()}/process`, formData);
      setIsLoading(false);
      setIsCompleted(true);
      setSubtitlePath(response.data.subtitle_path);
      setOriginalVideoPath(response.data.original_video_path);
      setEmbeddedVideoPath(response.data.embedded_video_path);
      setPublicPath(response.data.public_path);
      setMessage(`Processing completed successfully!`);
    } catch (error) {
      console.error('Error while sending data:', error);
      setIsLoading(false);
      setIsCompleted(false);
      setMessage('An error occurred during processing. Please try again.');
    }
  };

  return (

    <div className='border-2 rounded-md p-4 flex flex-col gap-2'>
      {subtitlePath && <span onClick={clearProcess} class="border-2 hover:border-[#22c55e] rounded-full cursor-pointer material-symbols-outlined self-end text-md hover:text-[#22c55e] transition-colors">
        home
      </span>
      }
      {isLoading && <p>Processing... please, wait.</p>}
      {!isLoading && isCompleted &&
        <div>
          <div className='flex flex-col gap-2 items-center'>
            <p className='pb-2'>{message}</p>
            {embeddedVideoPath && (
              <>
                <video
                  className="w-full max-w-md rounded-lg shadow"
                  controls
                >
                  <source src={`${getBackendUrl()}${publicPath}`} type="video/mp4" />
                </video>
                <button onClick={downloadEmbeddedVideo} className="w-1/2 text-[#22c55e] border-2 border-white shadow rounded-lg transition duration-200 p-2 font-orbitron hover:bg-white hover:text-black" type="submit">
                  DOWNLOAD SUBTITLED VIDEO
                </button>
              </>
            )}
            <button onClick={downloadSubtitle} className="w-1/2 text-[#22c55e] border-2 border-white shadow rounded-lg transition duration-200 p-2 font-orbitron hover:bg-white hover:text-black" type="submit">DOWNLOAD SUBTITLE</button>
          </div>
        </div>
      }
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
            <select className="rounded-sm text-black" value={methodType} onChange={(e) => setmethodType(e.target.value)} required>
              {methodTypes.map((method) => (
                <option key={method} value={method}>
                  {method}
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
            <input
              type="checkbox"
              checked={options.embedSubtitle}
              onChange={(e) =>
                setOptions({ ...options, embedSubtitle: e.target.checked })
              }
            />
            embed subtitles in the video
          </label>
          <button className="text-[#22c55e] border-2 border-white shadow rounded-lg transition duration-200 p-2 font-orbitron hover:bg-white hover:text-black" type="submit">TRANSLATE</button>
        </form>
      )}
    </div>
  );
}

export default UploadForm;
