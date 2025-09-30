<?php

class AvaliaFile extends Controller
{

    function __construct()
    {
        parent::__construct();
        $this->view->js = array();
        $this->view->css = array();
    }

    function index()
    {
        $this->view->title = "Avaliação do Arquivo";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/avaliaFile/app.vue.js");
        array_push($this->view->css, "views/avaliaFile/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function avaliaFile()
    {
        $this->model->avaliaFile();
    }

}