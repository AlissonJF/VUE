
<?php

class Gantt extends Controller {

    function __construct() {
        parent::__construct();
		$this->view->js = array();
		$this->view->css = array();
    }

    function index()
    {
        $this->view->title = " Gantt";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/gantt/app.vue.js");
        array_push($this->view->css, "views/gantt/app.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }

    function example()
    {
        $this->model->example();
    }
}