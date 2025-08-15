<?php
/**
 * Plugin Name: FL Location Map Block
 * Description: Creates an location map information section.
 * Version: 1.0.0
 * Text Domain: futurelab-location-map-block
 * 
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * 
 */



class FutureLabLocationMapBlock
{


	public function __construct()
	{
		$this->init();
	}
	
	public function init()
	{
		include_once __DIR__ . '/futurelab-location-map/futurelab-location-map.php';
	}
	
}

function flLocationMapBlockInit()
{
	new FutureLabLocationMapBlock();
}

flLocationMapBlockInit();
