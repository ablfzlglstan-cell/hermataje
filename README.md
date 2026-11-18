# HERMITAGE Store – customer accounts fix

## Files
- `index.html`: storefront, customer login/register, guest checkout, password visibility and birth date fields.
- `worker.js`: API for admin/customer sessions, catalog state and orders.
- `schema.sql`: full schema for a fresh D1 database.
- `migration.sql`: run ONCE on the existing database created with the previous schema. Adds birth month/day columns without deleting data.
- `wrangler.toml`: existing Worker + D1 + Assets configuration.

## Existing D1 database upgrade
Because the existing database already has `customers` and `orders`, running `schema.sql` again will not add the new birth date columns. Open D1 > hermitage-db > Console and run the four statements in `migration.sql` once. Do not run them a second time.

## Worker secrets
Keep both as Worker **Secrets** in the Production environment (not `[vars]` in wrangler.toml):
- `SESSION_SECRET`: random secret text, at least 32 characters.
- `ADMIN_USERS`: the following JSON text (replace credentials):
  `[{"username":"nima","password":"REPLACE_WITH_A_NEW_LONG_PASSWORD"}]`

Do not put either secret in GitHub or wrangler.toml. Dashboard Worker Secrets persist across deployments when they are not redefined as plain vars in the Wrangler config. Use the same variable names exactly.

## Deploy
Replace the repository files with these files and let Cloudflare Worker Builds deploy. Verify the deployment is successful before testing.
