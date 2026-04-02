declare namespace JSX {
  interface IntrinsicElements {
    'shopify-store': any;
    'shopify-context': any;
    'shopify-list-context': any;
    'shopify-data': any;
    'shopify-media': any;
    'shopify-money': any;
    'shopify-cart': any;
    'shopify-variant-selector': any;
  }
}

// Allow shopify-loading-placeholder as a valid attribute on any HTML element
declare namespace React {
  interface HTMLAttributes<T> {
    'shopify-loading-placeholder'?: string;
    'shopify-attr--disabled'?: string;
    'shopify-attr--href'?: string;
    'shopify-add-to-cart'?: string;
    'shopify-buy-now'?: string;
  }
}
