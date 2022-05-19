<?php

class Index extends Controller {

    function __construct()
    {
        parent::__construct();
        $this->view->js = array();
        $this->view->css = array();
    }

    function index() {

        $this->view->title = "Home";
        array_push($this->view->js, "views/index/app.vue.js");
        array_push($this->view->css, "views/index/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

}