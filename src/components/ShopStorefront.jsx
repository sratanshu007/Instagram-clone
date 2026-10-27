import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Star, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  X,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS_CATALOG, CURRENT_USER } from '../data/mockData';

export default function ShopStorefront({ 
  selectedProduct, 
  setSelectedProduct, 
  onPurchaseComplete 
}) {
  const [activeProduct, setActiveProduct] = useState(selectedProduct || null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(null);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleOpenCheckout = (product) => {
    setActiveProduct(product);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setOrderCompleted(false);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    setOrderCompleted(true);
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 }
    });

    if (onPurchaseComplete) {
      onPurchaseComplete(activeProduct);
    }
  };

  return (
    <div className="shop-container">
      {/* Hero Banner */}
      <div className="shop-hero">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <Sparkles size={16} color="var(--accent-pink)" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-pink)', letterSpacing: 0.5 }}>
              LUMINA CREATOR COMMERCE
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: 8 }}>
            Creator Storefront &amp; Shoppable Drops
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 520 }}>
            Buy authentic creator-designed merchandise, analog preset packs, and gear. Direct creator affiliate splits applied at checkout.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Affiliate Commission Pool</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-green)' }}>Up to 35%</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Supported by Meta Commerce Pay</div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="shop-grid">
        {PRODUCTS_CATALOG.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-box">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-commission-tag">
                Creator Earns: {product.creatorCommission}
              </div>
            </div>

            <div className="product-info">
              <div className="product-brand">{product.brand}</div>
              <h3 className="product-name">{product.name}</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontSize: 12.5, fontWeight: 700 }}>{product.rating}</span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>({product.reviewsCount} reviews)</span>
              </div>

              <div className="product-price-row">
                <span className="product-price">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="product-orig-price">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <button 
                className="buy-product-btn"
                onClick={() => handleOpenCheckout(product)}
              >
                Quick In-App Checkout
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Drawer / Modal */}
      {activeProduct && (
        <div className="modal-overlay" onClick={() => setActiveProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShoppingBag size={18} color="var(--accent-pink)" />
                <span>Instant Creator Checkout</span>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveProduct(null)}>
                <X size={20} />
              </button>
            </div>

            {orderCompleted ? (
              <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                <div style={{ 
                  width: 64, 
                  height: 64, 
                  borderRadius: '50%', 
                  background: 'var(--accent-green)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 16px',
                  color: '#fff'
                }}>
                  <Check size={36} strokeWidth={3} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Order Confirmed! 🎉</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>
                  Thank you for supporting <strong>{activeProduct.brand}</strong>. You've earned the creator <strong>{activeProduct.creatorCommission}</strong> in affiliate split.
                </p>
                <div style={{ background: 'var(--bg-secondary)', padding: 14, borderRadius: 10, fontSize: 13, marginBottom: 20 }}>
                  Order #LUM-{Math.floor(100000 + Math.random() * 900000)} • Confirmation sent to {CURRENT_USER.username}@lumina.app
                </div>
                <button 
                  className="buy-product-btn"
                  onClick={() => setActiveProduct(null)}
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <img 
                    src={activeProduct.image} 
                    alt={activeProduct.name} 
                    style={{ width: 90, height: 90, borderRadius: 10, objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--accent-pink)', fontWeight: 700 }}>
                      {activeProduct.brand}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, margin: '2px 0' }}>
                      {activeProduct.name}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>
                      ${activeProduct.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Size options */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>
                    SELECT OPTION / SIZE
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {activeProduct.sizes.map(size => (
                      <button
                        key={size}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 6,
                          border: `1.5px solid ${selectedSize === size ? 'var(--text-primary)' : 'var(--border-color)'}`,
                          background: selectedSize === size ? 'var(--bg-tertiary)' : 'transparent',
                          fontWeight: 700,
                          fontSize: 13
                        }}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Commission Split Badge */}
                <div style={{ 
                  background: 'rgba(16, 185, 129, 0.1)', 
                  border: '1px solid rgba(16, 185, 129, 0.25)', 
                  borderRadius: 8, 
                  padding: '10px 14px', 
                  fontSize: 12.5, 
                  color: 'var(--accent-green)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20
                }}>
                  <ShieldCheck size={18} />
                  <span>Verified Creator Affiliate Split: <strong>{activeProduct.creatorCommission}</strong> goes directly to creator</span>
                </div>

                {/* Summary */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 20, fontSize: 13 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                    <span>${activeProduct.price.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Creator In-App Shipping</span>
                    <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>FREE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 16, marginTop: 10 }}>
                    <span>Total Due</span>
                    <span>${activeProduct.price.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  className="buy-product-btn" 
                  style={{ background: 'var(--accent-gradient)', color: '#fff' }}
                  onClick={handleBuyNow}
                >
                  Pay with 1-Click Meta Pay • ${(activeProduct.price).toFixed(2)}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
