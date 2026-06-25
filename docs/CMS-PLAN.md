# Client portal / project tracker plan

> **✅ Implemented 2026-06-24.** Core portal is built and the production build passes.
> - Delivery stages: `src/lib/projectStatus.js` (intake → in-progress → review → delivered → closed; legacy statuses mapped).
> - Admin creates a project for a client (auto-creates account + temp password): `POST /api/admin/create-client-project`, form in `AdminOrdersPage`.
> - Deliverables (Drive/URL link or self-hosted upload) + client download: `DeliverablesPanel` on `OrderDetailPage`.
> - Email on stage change + new deliverable: `POST /api/project/notify` (SMTP when configured).
> - Client view reframed as "Your Projects" in `Dashboard`.
> Remaining/optional: exercise flows against the cPanel Python backend; set `UPLOAD_DIR`/`UPLOAD_URL_PREFIX` for self-hosted uploads.

**Corrected scope (2026-06-24):** this is **not** a portfolio-project uploader.
The CMS exists solely to:

1. **Track** each client's active project + its status/stages.
2. **Notify** the client of progress and when deliverables are ready.
3. **Host deliverables on your own side** — Google Drive and/or cPanel — and hand
   the client a link/download, not a third-party SaaS.

Think: client logs in → sees their project, current stage, and a deliverables
list → gets an email when something changes.

**Build trigger:** after cPanel is configured and the public demo is "happy."
Auth UI stays gated behind `VITE_ENABLE_AUTH` until then.

---

## You already have ~70% of this

The current "orders" system IS the client portal — it's just dressed up as
e-commerce (Stripe, packages, voice tags). Reuse it; don't rebuild.

| Need | Already exists |
|------|----------------|
| Project record per client | `orders` table (`status`, `requirements`, `google_drive_folder_id`, timestamps) |
| Deliverable files | `order_files` table (`file_name`, `file_url`, `file_type`) |
| Client ↔ you messaging | `order_messages` + `OrderChat` component |
| Revision/feedback loop | `order_revisions` + `RevisionRequest` |
| Email notifications | `send_email_smtp` + `handle_message_notification` + `handle_revision_notification` |
| Client view | `src/pages/Dashboard.jsx`, `OrderDetailPage.jsx` |
| Admin view | `src/pages/admin/AdminOrdersPage.jsx`, `AdminDashboard.jsx` |
| Drive integration | `src/lib/googleDrive.js` (picker + `uploadToGoogleDrive`) |
| Auth + per-user data scoping | `/api/db/<table>` + bearer tokens (own rows only) |

---

## Reframe, don't rebuild

The cleanest path is a vocabulary + flow change, keeping the schema:

- "Order" → **Project** in all client-facing copy.
- Drop the payg/Stripe framing from the default flow (keep Stripe code dormant
  behind the P3 flag — don't delete).
- A project is created by **you** (admin) for a client, not bought via checkout.
- Status stages become delivery-focused:
  `intake → in-progress → review → delivered → closed`.

---

## Gaps to build (the actual work)

### 1. Admin: create/manage a project for a client
`AdminOrdersPage` already lists orders. Add an "Add project" form: pick/enter
client email, title, description, stage. Inserts into `orders` via `/api/db`.
*(Backend already supports insert; mostly UI.)*

### 2. Deliverable hosting — pick the lane
The `file_url` field is hosting-agnostic, so either works:

- **Google Drive (fastest):** `googleDrive.js` already uploads to a folder and
  returns a `webViewLink`. Store that link as `order_files.file_url`. Per-client
  isolation via `google_drive_folder_id` already on the order. No server storage.
- **cPanel (fully self-hosted):** add `POST /api/upload` (multipart) that writes
  to a **non-public** dir (e.g. `~/deliverables/<order_id>/`) and serves
  downloads through an auth-checked `GET /api/deliverable/<file_id>` so files
  aren't publicly guessable. Store the API path as `file_url`.

Recommendation: ship Drive first (almost done), add cPanel option later for
clients who want everything on your domain.

### 3. Admin: attach deliverable to a project
Button on the order/project detail → upload (Drive or cPanel) → insert
`order_files` row → trigger notification.

### 4. Client: deliverables list + download
On `OrderDetailPage`, render `order_files` for the project as a download list
with type/date. (Chat + revisions already render there.)

### 5. Notifications — extend what exists
`send_email_smtp` is wired. Add two triggers:
- **Status change:** when admin moves a project stage → email the client.
- **New deliverable:** when an `order_files` row is added → "Your files are
  ready" email with a link to the project. (Clone `handle_message_notification`.)

---

## Phased steps (one per session, all reversible)
1. Reframe copy order→project + delivery-focused statuses (frontend strings only).
2. Admin "create project for client" form (UI on `AdminOrdersPage`).
3. Deliverables list + download on `OrderDetailPage` (client-facing read).
4. Admin "attach deliverable" via Google Drive (reuse `googleDrive.js`).
5. Status-change + new-deliverable email notifications (backend).
6. *(Later)* cPanel self-hosted upload + auth-gated download endpoint.

Stripe/payments stay dormant under the existing P3 flag — not part of this.

---

## Decisions (locked 2026-06-24)
- **Hosting:** Both — Google Drive first (~1 session, reuses `googleDrive.js`),
  add cPanel self-hosted option later (auth-gated download endpoint).
- **Access:** Admin-created — Solomon creates the client's account + project and
  sends them a login. **Sign-up stays gated/closed to the public.**
- **Entry point:** Private URL shared per client — **no "Client login" link in
  the public nav.** Keep auth UI behind `VITE_ENABLE_AUTH`.

### What these decisions change in the build
- Step 2 ("create project for client") must also create/look up the **client
  account** by email (admin-only), since clients won't self-register.
- Public sign-up route stays disabled; login route reachable only by direct URL.
- Notifications (Step 5) double as the client's onboarding ("your project is
  live, here's your login").
