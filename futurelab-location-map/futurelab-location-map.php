<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function static_futurelab_location_map_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'static_futurelab_location_map_block_init' );

function my_block_enqueue_google_maps() {
	
    if ( has_block( 'create-block/futurelab-location-map' ) ) {
        wp_enqueue_script(
            'google-maps',
            //'https://maps.googleapis.com/maps/api/js?key={YOUR-API-MAP-KEY}&callback=initMapLocationMapInit',
			'https://maps.googleapis.com/maps/api/js?key={YOUR-API-MAP-KEY}&loading=async',
            array(),
            null,
            array()
        );
    }
}
//add_action( 'wp_enqueue_scripts', 'my_block_enqueue_google_maps' );
