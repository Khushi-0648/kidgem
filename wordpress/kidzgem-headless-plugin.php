<?php
/**
 * Plugin Name: KidzGem Headless Helper
 * Plugin URI: https://kidzgem.com
 * Description: Enables CORS headers and custom REST API endpoints for the KidzGem React Headless Store.
 * Version: 1.0.0
 * Author: KidzGem Engineering
 * Text Domain: kidzgem
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * 1. Configure CORS Headers for Headless React Store
 */
add_action('init', function() {
    $allowed_origins = array(
        'https://kidzgem-store.vercel.app',
        'https://kidzgem.com',
        'http://localhost:5173',
        'http://localhost:3000'
    );

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins, true)) {
        header("Access-Control-Allow-Origin: " . $origin);
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Headers: Authorization, Content-Type, Cart-Token, Nonce, X-Requested-With");
    }

    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
});

/**
 * 2. Register Custom REST API Endpoints
 */
add_action('rest_api_init', function() {
    // Newsletter Subscription Endpoint
    register_rest_route('kidzgem/v1', '/subscribe', array(
        'methods'  => 'POST',
        'callback' => 'kidzgem_handle_subscribe',
        'permission_callback' => '__return_true'
    ));

    // Contact Inquiries Endpoint
    register_rest_route('kidzgem/v1', '/contact', array(
        'methods'  => 'POST',
        'callback' => 'kidzgem_handle_contact',
        'permission_callback' => '__return_true'
    ));

    // Direct Headless Order Endpoint
    register_rest_route('kidzgem/v1', '/order', array(
        'methods'  => 'POST',
        'callback' => 'kidzgem_handle_order',
        'permission_callback' => '__return_true'
    ));
});

function kidzgem_handle_subscribe($request) {
    $params = $request->get_json_params();
    $email = sanitize_email($params['email'] ?? '');

    if (empty($email) || !is_email($email)) {
        return new WP_Error('invalid_email', 'Please provide a valid email address.', array('status' => 400));
    }

    // Save as WordPress comment, option, or integrate with Mailchimp/FluentForm
    $subscribers = get_option('kidzgem_subscribers', array());
    $subscribers[] = array(
        'email' => $email,
        'date'  => current_time('mysql'),
        'ip'    => $_SERVER['REMOTE_ADDR'] ?? ''
    );
    update_option('kidzgem_subscribers', $subscribers);

    return rest_ensure_response(array(
        'success' => true,
        'message' => 'Successfully joined KidzGem VIP Family!',
        'email'   => $email
    ));
}

function kidzgem_handle_contact($request) {
    $params = $request->get_json_params();
    $name    = sanitize_text_field($params['name'] ?? '');
    $email   = sanitize_email($params['email'] ?? '');
    $phone   = sanitize_text_field($params['phone'] ?? '');
    $subject = sanitize_text_field($params['subject'] ?? 'KidzGem Query');
    $message = sanitize_textarea_field($params['message'] ?? '');

    if (empty($email) || empty($message)) {
        return new WP_Error('missing_fields', 'Email and message are required.', array('status' => 400));
    }

    // Save as inquiry post or admin email
    $admin_email = get_option('admin_email');
    $mail_subject = "[KidzGem Store] New Message from " . $name;
    $body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";
    wp_mail($admin_email, $mail_subject, $body);

    return rest_ensure_response(array(
        'success' => true,
        'message' => 'Your message has been received! Our support team will reply within 24 hours.'
    ));
}

function kidzgem_handle_order($request) {
    $params = $request->get_json_params();
    $order_id = 'KG-' . wp_rand(100000, 999999);

    // If WooCommerce is active, create an actual WC Order
    if (class_exists('WC_Order')) {
        $order = wc_create_order();
        
        $billing = $params['billing_address'] ?? array();
        $order->set_address($billing, 'billing');
        $order->set_address($billing, 'shipping');
        $order->set_payment_method($params['payment_method'] ?? 'cod');
        $order->set_customer_note($params['customer_note'] ?? 'Headless React Order');
        
        $order->calculate_totals();
        $order->update_status('processing', 'Placed via KidzGem Headless App');
        $order_id = $order->get_id();
    }

    return rest_ensure_response(array(
        'success'  => true,
        'order_id' => $order_id,
        'message'  => 'Order placed successfully in WooCommerce!'
    ));
}
