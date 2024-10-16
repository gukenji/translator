from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)  # Permitir requisições CORS

@app.route('/process', methods=['POST'])
def process():
    # Obtenha o arquivo e os parâmetros do frontend
    file = request.files['file']
    input_language = request.form.get('input_language')
    output_format = request.form.get('output_format')
    model_type = request.form.get('model_type')
    action_type = request.form.get('action_type')
    device_type = request.form.get('device_type')  # Recebendo o tipo de dispositivo
    output_dir = request.form.get('output_dir')

    # Salvar o arquivo recebido
    # Extrair o nome do arquivo sem a extensão
    filename = file.filename  # Nome completo do arquivo, ex: 'TRADUZINDO.mp4'
    input_filename = os.path.splitext(filename)[0]  # 'TRADUZINDO', sem a extensão
    file.save(input_filename)

    # Construir o comando bash, incluindo o parâmetro device_type
    command = [
        'bash',
        'whisper-script.sh',
        input_filename,
        input_language,
        output_format,
        model_type,
        action_type,
        device_type,  # Passando o tipo de dispositivo para o script bash
        output_dir
    ]

    # Executar o comando e capturar saída e erros
    try:
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        print("Comando rodado com sucesso:")
        print(result.stdout)  # Verifique a saída padrão do comando bash
        print(result.stderr)  # Verifique a saída de erro, se houver
    except subprocess.CalledProcessError as e:
        print("Erro ao executar o comando:")
        print(e.stdout)  # Saída padrão no caso de erro
        print(e.stderr)  # Saída de erro no caso de erro
        return jsonify({'error': str(e)}), 500

    # Gerar o nome do arquivo de saída
    output_filename = f"{input_filename}.{output_format}"

    # Retornar o nome do arquivo como JSON
    return jsonify({"output_filename": output_filename})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
