<?php
/**
 * Plugin Name:       Gsap Test
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gsaptest
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_gsaptest_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_gsaptest_block_init' );

function enqueue_gsap() {
	wp_enqueue_script( 'gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', [], 10, false );
}
add_action( 'init', 'enqueue_gsap' );

function admin_enqueue_gsap() {
	wp_enqueue_script( 'gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', [], 10, false );
}
add_action( 'admin_enqueue_scripts', 'admin_enqueue_gsap' );
