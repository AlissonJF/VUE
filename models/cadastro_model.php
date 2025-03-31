<?php

require_once("util/param.php");

class Cadastro_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getBoletim()
    {
        $post = json_decode(file_get_contents('php://input'));

        $result = $this->db->select("SELECT * FROM ESCOLA.TESTE");

        if (count($result) > 0) {
            exit(json_encode(array("code" => 1, "msg" => "Busca realizada com sucesso.", "dados" => $result)));
        } else {
            exit(json_encode(array("code" => 0, "msg" => "Não foi possível encontrar nenhum registro.")));
        }
    }
}