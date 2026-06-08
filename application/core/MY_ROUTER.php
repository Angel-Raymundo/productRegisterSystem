<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Router extends CI_Router {

    protected function _set_default_controller() {
        if (empty($this->default_controller)) {
            show_error('Unable to determine what should be displayed. A default route has not been specified in the routing file.');
        }

        // Split the route string by slashes to safely check for directories
        $segments = explode('/', $this->default_controller);

        // Check if the first segment is a valid directory inside controllers
        if (is_dir(APPPATH.'controllers/'.$segments[0])) {
            
            $this->set_directory($segments[0]);
            
            // Set the class (controller file name). Fallback to 'welcome' if empty
            $class = isset($segments[1]) ? $segments[1] : 'welcome';
            $this->set_class($class);
            
            // Set the method (function name). Fallback to 'index' if empty
            $method = isset($segments[2]) ? $segments[2] : 'index';
            $this->set_method($method);
            
            return;
        }

        // Fallback to original framework logic if no folder matches
        parent::_set_default_controller();
    }
}