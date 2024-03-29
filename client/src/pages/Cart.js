import React, { useState, useEffect } from 'react';
import {useAuth} from "../components/AuthContext.js"
import { useNavigate } from 'react-router-dom';
import AuthWarning from '../components/warning.js';

const Cart = () => {

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { authToken, userId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authToken || !userId) {
      setIsLoading(false); // Ensures that loading state is updated if no authToken or userId
      return;
    }
  
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3001/orders?uid=${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
  
        const data = await response.json();
        const loadedProducts = data.orders.filter(order => order.pid) // Ensure we only include orders with a product
          .map(order => ({
            ...order.pid,
            quantity: order.quantity,
            size: order.size ? order.size: "N/A"
          }));
          
        setProducts(loadedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchOrders();
  }, [authToken, userId]);
  

  const filteredOrders = products.filter(product => 
    product && 
    product.productImage && 
    product.price !== undefined && 
    product.quantity !== undefined && 
    product.size !== undefined &&
    product.name
  );

  const subtotal = filteredOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
  const total = (subtotal + (0.0925 * subtotal)).toFixed(2);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  useEffect(() => {
    document.title = 'View Order History';
  })

  if (isLoading) {
    return <div>Loading your wishlist...</div>; // Or any other loading indicator you prefer
  }

  return (

    <div>{!authToken && <AuthWarning letter='c' />}
    <div id="page-container">
      <div id="et-boc" class="et-boc">
        <div id="et-main-area">
          <div id="main-content">
            <article id="post-8" class="post-8 page type-page status-publish hentry">
              <div class="entry-content">
                <div class="et-l et-l--post">
                  <div class="et_builder_inner_content et_pb_gutters3 product">
                    <div class="et_pb_section et_pb_section_0 et_pb_with_background et_section_regular">
                      <div class="et_pb_row et_pb_row_0">
                        <div
                          class="et_pb_column et_pb_column_4_4 et_pb_column_0 et_pb_css_mix_blend_mode_passthrough et-last-child">
                          <div
                            class="et_pb_module et_pb_post_title et_pb_post_title_0 et_pb_bg_layout_light et_pb_text_align_left et_pb_text_align_center-tablet">
                            <div class="et_pb_title_container">
                              <h1 class="entry-title">Order History</h1>
                              <p style={{ fontSize: '20px', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'left', marginTop: '10px' }}>Click on an item to view order details...</p>
                              {products.length === 0 && (
                                <p style={{ fontSize: '18px', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'left', marginTop: '10px', color: 'red' }}>Looks like you haven't made any orders yet.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="et_pb_section et_pb_section_1 et_pb_equal_columns et_pb_with_background et_section_specialty">
                      <div class="et_pb_row et_pb_gutters1">
                        <div
                          class="et_pb_column et_pb_column_2_3 et_pb_column_1 et_pb_specialty_column et_pb_css_mix_blend_mode_passthrough">
                          <div class="et_pb_row_inner et_pb_row_inner_0">
                            <div
                              class="et_pb_column et_pb_column_4_4 et_pb_column_inner et_pb_column_inner_0 et-last-child">
                              <div
                                class="et_pb_module et_pb_divider et_pb_divider_0 et_pb_divider_position_ et_pb_space et_multi_view__hover_selector"
                                data-et-multi-view='{"schema":{"classes":{"desktop":{"add":["et_pb_divider"],"remove":["et_pb_divider_hidden"]},"tablet":{"remove":["et_pb_divider"],"add":["et_pb_divider_hidden"]},"phone":{"remove":["et_pb_divider","et_pb_divider_hidden"]}}},"slug":"et_pb_divider"}'>
                                <div class="et_pb_divider_internal"></div>
                              </div>
                            </div>
                          </div>
                          <div class="et_pb_row_inner et_pb_row_inner_1">
                            <div class="et_pb_column et_pb_column_2_9 et_pb_column_inner et_pb_column_inner_1">
                              <div
                                class="et_pb_module et_pb_blurb et_pb_blurb_0 et_clickable et_pb_text_align_left et_pb_text_align_center-tablet et_pb_blurb_position_top et_pb_bg_layout_light">
                                <div class="et_pb_blurb_content">
                                  <div class="et_pb_main_blurb_image">
                                    <span class="et_pb_image_wrap"><span
                                      class="et-waypoint et_pb_animation_off et_pb_animation_off_tablet et_pb_animation_off_phone et-pb-icon et-pb-icon-circle et-animated">✔</span></span>
                                  </div>
                                  <div class="et_pb_blurb_container">
                                    <h4 class="et_pb_module_header">
                                      <span>Step 1/3</span>
                                    </h4>
                                    <div class="et_pb_blurb_description">
                                      <p>Shop</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="et_pb_column et_pb_column_2_9 et_pb_column_inner et_pb_column_inner_2">
                              <div
                                class="et_pb_module et_pb_blurb et_pb_blurb_1 et_pb_text_align_center et_pb_blurb_position_top et_pb_bg_layout_light">
                                <div class="et_pb_blurb_content">
                                  <div class="et_pb_main_blurb_image">
                                    <span class="et_pb_image_wrap"><span
                                      class="et-waypoint et_pb_animation_off et_pb_animation_off_tablet et_pb_animation_off_phone et-pb-icon et-pb-icon-circle et-animated">✔</span></span>
                                  </div>
                                  <div class="et_pb_blurb_container">
                                    <h4 class="et_pb_module_header">
                                      <span>Step 2/3</span>
                                    </h4>
                                    <div class="et_pb_blurb_description">
                                      <p>order</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="et_pb_column et_pb_column_2_9 et_pb_column_inner et_pb_column_inner_3 et-last-child">
                              <div
                                class="et_pb_module et_pb_blurb et_pb_blurb_2 et_clickable et_pb_text_align_right et_pb_text_align_center-tablet et_pb_blurb_position_top et_pb_bg_layout_light">
                                <div class="et_pb_blurb_content">
                                  <div class="et_pb_main_blurb_image">
                                    <span class="et_pb_image_wrap"><span
                                      class="et-waypoint et_pb_animation_off et_pb_animation_off_tablet et_pb_animation_off_phone et-pb-icon et-pb-icon-circle et-animated"></span></span>
                                  </div>
                                  <div class="et_pb_blurb_container">
                                    <h4 class="et_pb_module_header">
                                      <span>Step 3/3</span>
                                    </h4>
                                    <div class="et_pb_blurb_description">
                                      <p>ON ITS WAY!</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="et_pb_row_inner et_pb_row_inner_2">
                            <div
                              class="et_pb_column et_pb_column_4_4 et_pb_column_inner et_pb_column_inner_4 et-last-child">
                              <div
                                class="et_pb_with_border et_pb_module et_pb_wc_cart_notice et_pb_wc_cart_notice_0 woocommerce et_pb_fields_layout_fullwidth et_pb_bg_layout_ et_pb_text_align_left">
                                <div class="et_pb_module_inner">
                                  <div class="woocommerce-notices-wrapper"></div>
                                </div>
                              </div>
                              <div
                                class="et_pb_with_border et_pb_module et_pb_wc_cart_products et_pb_wc_cart_products_0 woocommerce-cart woocommerce et_pb_woo_custom_button_icon et_pb_row_layout_default">
                                <div class="et_pb_module_inner">
                                  <form class="woocommerce-cart-form" action="placeholder/" method="post">
                                    <table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents"
                                      cellspacing="0">
                                      <thead>
                                        <tr>
                                          <th class="product-remove">
                                            <span class="screen-reader-text">Remove
                                              item</span>
                                          </th>
                                          <th class="product-thumbnail">
                                            <span class="screen-reader-text">Thumbnail
                                              image</span>
                                          </th>
                                          <th class="product-name">Product</th>
                                          <th class="product-price">Price</th>
                                          <th class="product-quantity">Quantity</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {filteredOrders.map((product) => (
                                          <tr class="woocommerce-cart-form__cart-item cart_item">
                                            {/* Remove Product Button */}
                                            <td class="product-remove">
                                              <a script=""
                                                class="remove"
                                                data-product_id="8506" data-product_sku="">×</a>
                                            </td>

                                            {/* Image */}
                                            <td class="product-thumbnail">
                                            <a><img fetchpriority="high"
                                              /* <a href={`/item/${item.product._id}`}><img fetchpriority="high" */
                                                decoding="async" width="300" height="300"
                                                src={`http://localhost:3001/${product.productImage}.png`}
                                                class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                                alt="" /></a>
                                            </td>

                                            {/* Name */}
                                            <td class="product-name" data-title="Product">
                                              <a href="#" onClick={(e) => {
                                                e.preventDefault(); // Prevent the default anchor link behavior
                                                handleProductClick(product);
                                              }}>
                                                {product.name}
                                              </a>
                                            </td>
                                            {/* Price*/}
                                            <td class="product-price" data-title="Price">
                                              <span class="woocommerce-Price-amount amount"><bdi><span
                                                class="woocommerce-Price-currencySymbol">$</span>{product.price.toFixed(2)}</bdi></span>
                                            </td>

                                            {/* Amount */}
                                            <td class="product-quantity" data-title="Quantity">
                                              <div class="quantity">
                                                <div className='AMT'>
                                                  {product.quantity}
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        ))}

                                      </tbody>
                                    </table>
                                  </form>
                                  <div class="cart-collaterals"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="et_pb_column et_pb_column_1_3 et_pb_column_2 et_pb_css_mix_blend_mode_passthrough et_pb_column_single">
                          <div
                            class="et_pb_with_border et_pb_module et_pb_wc_cart_totals et_pb_wc_cart_totals_0 woocommerce-cart et_pb_woo_custom_button_icon">
                            <div class="et_pb_module_inner">
                            <div class="cart_totals">
                              <h2>Order details</h2>
                              <table cellspacing="0" class="shop_table shop_table_responsive">
                                <tbody>
                                  <tr class="cart-extra-info">
                                    <th>Name</th>
                                    <td data-title="ID" style={{ color: 'white', fontWeight: 'bold' }}>
                                      {selectedProduct ? selectedProduct.name : 'N/A'}
                                    </td>
                                  </tr>
                                  <tr class="cart-extra-info">
                                    <th>Size</th>
                                    <td data-title="Size" style={{ color: 'white', fontWeight: 'bold' }}>
                                      {selectedProduct ? selectedProduct.size : 'N/A'}
                                    </td>
                                  </tr>
                                  <tr class="cart-extra-info">
                                    <th>Quantity</th>
                                    <td data-title="Quantity" style={{ color: 'white', fontWeight: 'bold' }}>
                                      {selectedProduct ? selectedProduct.quantity : 'N/A'}
                                    </td>
                                  </tr>
                                  <tr class="cart-subtotal">
                                    <th>Price</th>
                                    <td data-title="Price" style={{ color: 'white', fontWeight: 'bold' }}>
                                      {selectedProduct ? `$${selectedProduct.price.toFixed(2)}` : 'N/A'}
                                    </td>
                                  </tr>
                                  <tr class="order-total">
                                    <th>Total</th>
                                    <td data-title="Total" style={{ color: 'white', fontWeight: 'bold' }}>
                                      {selectedProduct ? `$${(selectedProduct.quantity * selectedProduct.price).toFixed(2)}` : 'N/A'}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                                <div class="wc-proceed-to-checkout">
                                  <a href="/" class="checkout-button button alt wc-forward">
                                    Continue shopping</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Cart
