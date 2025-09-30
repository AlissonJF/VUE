<?php

class AvaliaFile_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function avaliaFile()
    {
        $post = json_decode(file_get_contents('php://input'));

        // Caminho completo do Python
        $python = '"C:\Users\ti.lucas\AppData\Local\Microsoft\WindowsApps\python3.11.exe"';

        // Caminho do script Python
        $script = dirname(__DIR__) . "/views/avaliaFile/hash.py";

        // Dados para enviar
        $dados = [
            "texto" => $post->file
        ];

        $json = json_encode($dados);

        $descriptorspec = [
            0 => ["pipe", "r"],  // STDIN
            1 => ["pipe", "w"],  // STDOUT
            2 => ["pipe", "w"]   // STDERR
        ];

        $process = proc_open("$python $script", $descriptorspec, $pipes);

        if (is_resource($process)) {
            fwrite($pipes[0], $json);
            fclose($pipes[0]);

            $resultado = stream_get_contents($pipes[1]);
            fclose($pipes[1]);

            $erros = stream_get_contents($pipes[2]);
            fclose($pipes[2]);

            proc_close($process);

            if ($erros) {
                echo "Erro no Python: $erros"; exit;
            } else {
                $resposta = json_decode($resultado, true);
                echo "Mensagem do Python: " . $resposta["mensagem"]; exit;
            }
        }
        
        echo "Erro ao tentar processar a avaliação do arquivo!"; exit;
    }
}