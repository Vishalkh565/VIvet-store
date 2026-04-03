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

/** Returns the specific variant GID matching the selected size, or falls back to first variant */
async function getVariantId(handle: string, size?: string): Promise<string | null> {
  const data = await gql(`
    query getVariants($handle: String!) {
      product(handle: $handle) {
        variants(first: 50) {
          nodes {
            id
            title
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  `, { handle });

  const variants = data?.data?.product?.variants?.nodes || [];
  if (variants.length === 0) return null;

  if (size && size !== "One Size") {
    const match = variants.find((v: any) => 
      v.title === size || 
      v.selectedOptions.some((opt: any) => opt.name.toLowerCase() === "size" && opt.value.toLowerCase() === size.toLowerCase()) ||
      v.selectedOptions.some((opt: any) => opt.value.toLowerCase() === size.toLowerCase())
    );
    if (match) return match.id;
  }

  return variants[0]?.id ?? null;
}

/**
 * Creates a Shopify cart from CartItems and returns the checkout URL.
 * Returns null if the cart cannot be created (e.g. product not found on Shopify).
 */
export async function createShopifyCheckout(
  items: CartItem[],
  discountCode?: string
): Promise<string | null> {
  // Fetch Shopify variant IDs in parallel using product.shopifyHandle (= actual Shopify handle) and the selected size
  const variantIds = await Promise.all(
    items.map((item) => getVariantId(item.product.shopifyHandle, item.size))
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

  const input: any = { lines };
  if (discountCode && discountCode.trim() !== "") {
    input.discountCodes = [discountCode.trim()];
  }

  const data = await gql(
    `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { checkoutUrl }
        userErrors { field message }
      }
    }
  `,
    { input }
  );

  return data?.data?.cartCreate?.cart?.checkoutUrl ?? null;
}
