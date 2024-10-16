#!/bin/bash

INPUT_FILE=$1
INPUT_LANGUAGE=$2
OUTPUT_FORMAT=$3
MODEL_TYPE=$4
ACTION_TYPE=$5
DEVICE_TYPE=$6
OUTPUT_DIR=$7

echo "Rodando whisper com os seguintes parâmetros:"
echo "Arquivo de entrada: $INPUT_FILE"
echo "Linguagem: $INPUT_LANGUAGE"
echo "Formato de saída: $OUTPUT_FORMAT"
echo "Modelo: $MODEL_TYPE"
echo "Ação: $ACTION_TYPE"
echo "Dispositivo: $DEVICE_TYPE"
echo "Output Dir: $OUTPUT_DIR"


# Comando para executar o Whisper AI
# Ajuste este comando de acordo com como o Whisper AI é utilizado
whisper $INPUT_FILE --language $INPUT_LANGUAGE --output_format $OUTPUT_FORMAT --model $MODEL_TYPE --task $ACTION_TYPE --device $DEVICE_TYPE --output_dir $OUTPUT_DIR

# Verificar se o arquivo de saída foi criado
output_file="output_file.$OUTPUT_FORMAT"
if [ -f "$output_file" ]; then
    echo "Arquivo de saída gerado com sucesso: $output_file"
else
    echo "Erro: Arquivo de saída não foi encontrado."
fi