import * as React from 'react';

type ShopifyElements = {
  'shopify-store': React.HTMLAttributes<HTMLElement> & { 'store-domain'?: string; 'public-access-token'?: string };
  'shopify-context': React.HTMLAttributes<HTMLElement> & { id?: string; type?: string; 'wait-for-update'?: boolean };
  'shopify-list-context': React.HTMLAttributes<HTMLElement> & { query?: string; type?: string; first?: string | number };
  'shopify-data': React.HTMLAttributes<HTMLElement> & { query?: string };
  'shopify-media': React.HTMLAttributes<HTMLElement> & { query?: string; width?: number | string; height?: number | string; layout?: string };
  'shopify-money': React.HTMLAttributes<HTMLElement> & { query?: string };
  'shopify-cart': React.HTMLAttributes<HTMLElement> & { id?: string };
  'shopify-variant-selector': React.HTMLAttributes<HTMLElement>;
};

declare global {
  namespace JSX {
    interface IntrinsicElements extends ShopifyElements {}
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ShopifyElements {}
  }
}
