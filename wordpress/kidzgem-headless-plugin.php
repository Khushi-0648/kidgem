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
 *
 * Newsletter signups and contact inquiries are now handled by the React app's
 * own /api/subscribe and /api/contact serverless functions via Resend, so
 * this plugin no longer needs (and no longer exposes) endpoints for them -
 * that removes an unauthenticated, unbounded wp_options write and an open
 * wp_mail() spam vector.
 */
add_action('rest_api_init', function() {
    // Direct Headless Order Endpoint
    register_rest_route('kidzgem/v1', '/order', array(
        'methods'  => 'POST',
        'callback' => 'kidzgem_handle_order',
        'permission_callback' => '__return_true'
    ));
});

function kidzgem_handle_order($request) {
    $params = $request->get_json_params();
    $order_id = 'KG-' . wp_rand(100000, 999999);

    if (!class_exists('WC_Order')) {
        return new WP_Error('woocommerce_inactive', 'WooCommerce is not active on this site.', array('status' => 503));
    }

    // Rate-limit per IP: this endpoint is intentionally unauthenticated
    // (guest checkout needs no login), so without a limit it could be
    // scripted to flood the store with junk orders.
    $client_ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field($_SERVER['REMOTE_ADDR']) : 'unknown';
    $rate_key = 'kidzgem_order_rl_' . md5($client_ip);
    $attempts = (int) get_transient($rate_key);
    if ($attempts >= 5) {
        return new WP_Error('rate_limited', 'Too many orders placed recently. Please try again in a few minutes.', array('status' => 429));
    }
    set_transient($rate_key, $attempts + 1, 10 * MINUTE_IN_SECONDS);

    $line_items = $params['line_items'] ?? array();
    if (empty($line_items) || !is_array($line_items)) {
        return new WP_Error('missing_line_items', 'At least one line item is required.', array('status' => 400));
    }

    $order = wc_create_order();

    // Add real products by ID so pricing is authoritative from WooCommerce,
    // never trusted from the client. Only items without a matching WC product
    // (e.g. local-catalog-only demo items) fall back to a client-supplied price.
    foreach ($line_items as $item) {
        $quantity = max(1, intval($item['quantity'] ?? 1));
        $product_id = intval($item['product_id'] ?? 0);
        $product = $product_id ? wc_get_product($product_id) : false;

        if ($product) {
            $order->add_product($product, $quantity);
        } else {
            $name = sanitize_text_field($item['name'] ?? 'KidzGem Item');
            $price = floatval($item['price'] ?? 0);
            $fee = new WC_Order_Item_Fee();
            $fee->set_name($name . ' x' . $quantity);
            $fee->set_amount($price * $quantity);
            $fee->set_total($price * $quantity);
            $order->add_item($fee);
        }
    }

    $billing = $params['billing_address'] ?? array();
    $order->set_address($billing, 'billing');
    $order->set_address($params['shipping_address'] ?? $billing, 'shipping');
    $order->set_payment_method(sanitize_text_field($params['payment_method'] ?? 'cod'));
    $order->set_customer_note(sanitize_textarea_field($params['customer_note'] ?? 'Headless React Order'));

    $order->calculate_totals();
    $order->update_status('processing', 'Placed via KidzGem Headless App');
    $order_id = $order->get_id();

    return rest_ensure_response(array(
        'success'  => true,
        'order_id' => $order_id,
        'total'    => $order->get_total(),
        'message'  => 'Order placed successfully in WooCommerce!'
    ));
}
