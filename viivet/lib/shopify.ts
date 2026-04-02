import { CartItem } from "@/components/CartDrawer";

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_TOKEN!;
const API = `https://${DOMAIN}/api/2024-10/graphql.json`;

async function gql(query: string, variables?: unknown) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

/** Returns the first variant GID for a product handle */
async function getVariantId(handle: string): Promise<string | null> {
  const data = await gql(`
    query getVariant($handle: String!) {
      product(handle: $handle) {
        variants(first: 1) {
          nodes { id }
        }
      }
    }
  `, { handle });
  return data?.data?.product?.variants?.nodes?.[0]?.id ?? null;
}

/**
 * Creates a Shopify cart from CartItems and returns the checkout URL.
 * Returns null if the cart cannot be created (e.g. product not found on Shopify).
 */
export async function createShopifyCheckout(
  items: CartItem[]
): Promise<string | null> {
  // Fetch Shopify variant IDs in parallel using product.shopifyHandle (= actual Shopify handle)
  const variantIds = await Promise.all(
    items.map((item) => getVariantId(item.product.shopifyHandle))
  );

  const lines = items
    .map((item, idx) =>
      variantIds[idx]
        ? { quantity: item.qty, merchandiseId: variantIds[idx] as string }
        : null
    )
    .filter(Boolean) as { quantity: number; merchandiseId: string }[];

  // If no lines could be resolved, fall back to store homepage
  if (lines.length === 0) return null;

  const data = await gql(
    `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { checkoutUrl }
        userErrors { field message }
      }
    }
  `,
    { input: { lines } }
  );

  return data?.data?.cartCreate?.cart?.checkoutUrl ?? null;
}
