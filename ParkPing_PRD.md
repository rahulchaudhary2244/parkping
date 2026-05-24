# Product Requirements Document (PRD)

## Product Name
**ParkPing** (working title)

---

# 1. Problem Statement

In crowded urban areas, vehicles are frequently:
- parked incorrectly,
- blocking exits,
- left with headlights on,
- or causing inconvenience.

Today, vehicle owners either:
- expose their personal phone numbers publicly,
- or remain unreachable.

This creates:
- privacy risks,
- spam/scam exposure,
- frustration,
- and unnecessary conflict.

The product aims to provide a privacy-first way for anyone to contact a vehicle owner without revealing personal identity or phone numbers.

Core principle:

> “Reach the owner, not their identity.”

---

# 2. Product Vision

Create a trusted QR-based communication platform that allows anonymous, secure, and instant contact between strangers and vehicle owners.

---

# 3. Goals

## Primary Goals
- Allow vehicle owners to be contacted anonymously
- Prevent public sharing of personal phone numbers
- Reduce parking conflicts
- Provide instant communication without app installs

## Secondary Goals
- Build subscription/sticker business
- Create trust-based parking ecosystem
- Expand into fleet and apartment partnerships

---

# 4. Target Users

## Primary Users
### Vehicle Owners
- Car owners
- Bike owners
- Apartment residents
- Office commuters

## Secondary Users
### People needing to contact vehicle owner
- Neighbors
- Security guards
- Parking staff
- Apartment residents
- Delivery workers

---

# 5. User Stories

## Vehicle Owner

### Registration
- As a vehicle owner, I want to register my vehicle so that others can contact me anonymously.

### QR Management
- As a vehicle owner, I want to generate/link a QR code so I can place it on my vehicle.

### Notifications
- As a vehicle owner, I want to receive alerts so I can move my vehicle when needed.

### Privacy
- As a vehicle owner, I do not want my phone number exposed publicly.

## Scanner/User

### Quick Contact
- As someone blocked by a vehicle, I want to quickly notify the owner so the issue can be resolved fast.

### No Signup
- As a scanner, I do not want to create an account.

---

# 6. MVP Scope

## Included in MVP

### Public QR Landing Page
- QR scan opens webpage
- Display vehicle nickname/type
- Show masked vehicle license plate for scanner validation (e.g., `MH 12 ** 1234`)
- Show action buttons:
  - Move vehicle
  - Headlights ON
  - Emergency

### Owner Dashboard
- Login with OTP
- Add/manage vehicles
- Link/manage physical QR stickers (supporting sticker transfer/re-assignment)
- Notification settings
- Pause alerts

### Notification System
- WebSockets/In-app alerts (primary if dashboard is open)
- Browser push notifications (PWA Service Worker)
- SMS & WhatsApp fallback (secondary, triggered if web push fails or isn't acknowledged in 30 seconds)

### Privacy & Anti-Spam Features
- No public phone number exposure
- Frictionless anonymous requests for scanners (no login/OTP required)
- Risk-based invisible CAPTCHA protection (e.g., Cloudflare Turnstile or Google reCAPTCHA v3)
- Rate limiting:
  - Max 1 alert per 5 minutes per scanner IP/Device for a specific vehicle
  - Max 3 alerts total per 15 minutes for a specific vehicle across all scanners

### QR Code Generation
- Unique QR slug per physical sticker
- Dynamic routing: QR sticker can be linked/unlinked from different vehicles over its lifecycle

## Excluded from MVP
- Native mobile apps
- Live anonymous voice calls
- AI chatbot
- GPS tracking
- Vehicle recovery
- Community features
- NFC support
- Fleet dashboards

---

# 7. Functional Requirements

## Authentication
- Users can login using mobile OTP.

## Vehicle & Sticker Management
- Users must add:
  - vehicle name (nickname)
  - vehicle type
  - vehicle number (license plate - mandatory for validation, kept masked publicly)
- System links a unique QR code slug to each vehicle.
- Users can download QR as image/PDF.
- **Ownership Transfer**: Owners can unlink a QR code from their vehicle to transfer the physical sticker to a new owner. If a new owner attempts to claim a sticker that is still linked, the system triggers an approval request to the original owner's registered phone.

## Public QR Page
- QR scan opens mobile-friendly webpage.
- Public page shows:
  - vehicle nickname
  - vehicle type
  - masked license plate
  - predefined action buttons
- Users can send anonymous alerts.

## Notifications
- Vehicle owner receives instant notification.
- Supported channels:
  - WebSocket (active browser session)
  - Push notification (Service Worker)
  - SMS / WhatsApp fallback (for background delivery verification)

## Security
- System must prevent spam using:
  - Invisible CAPTCHA
  - IP and vehicle-level rate limiting
  - Cooldowns
- Vehicle owner can temporarily disable/mute alerts.

---

# 8. Non-Functional Requirements

## Performance
- QR page load < 2 seconds

## Availability
- 99% uptime target for MVP

## Security
- HTTPS mandatory
- Encrypted user data
- No public phone exposure

## Scalability
- Architecture should support 100k+ QR scans/month

---

# 9. Technical Architecture

## Frontend
- Next.js
- Tailwind CSS
- PWA support (Service Worker for background Web Push)

## Backend
Initial:
- Next.js API routes

Future:
- NestJS

## Database
- PostgreSQL

## Hosting
- Vercel
- Railway

## APIs

### SMS & Fallback Delivery
- MSG91 / Textlocal
- WhatsApp Business API

### Payments
- Razorpay

---

# 10. Suggested Database Schema

## Users

```sql
id (UUID, PK)
phone (VARCHAR, Unique)
created_at (TIMESTAMP)
```

## Vehicles

```sql
id (UUID, PK)
user_id (UUID, FK -> Users)
vehicle_name (VARCHAR)
vehicle_type (VARCHAR)
vehicle_number (VARCHAR, Unique)
created_at (TIMESTAMP)
```

## QR Stickers (Decoupled Mapping)

```sql
id (UUID, PK)
qr_slug (VARCHAR, Unique)
vehicle_id (UUID, FK -> Vehicles, Nullable)
status (VARCHAR) -- 'unlinked', 'active', 'suspended'
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

## Alerts

```sql
id (UUID, PK)
vehicle_id (UUID, FK -> Vehicles)
alert_type (VARCHAR)
sender_ip (VARCHAR)
created_at (TIMESTAMP)
```

---

# 11. UX Flow

## Vehicle Owner Flow

```text
Register → Add Vehicle → Link QR Sticker → Attach Sticker to Vehicle
```

## Scanner Flow

```text
Scan QR → Open Webpage → Tap Alert Button → Owner Receives WebSocket/Push/SMS Notification
```

---

# 12. Monetization

## Phase 1
Free QR generation

Premium:
- custom stickers
- reflective stickers

## Phase 2
Subscription:
- multiple vehicles
- call masking
- theft mode

## Phase 3
Enterprise:
- apartment societies
- fleets
- offices

---

# 13. Risks

## Major Risks
- QR scam perception
- low adoption
- notification abuse
- sticker durability
- trust deficit

## Mitigation
- verified branding
- HTTPS everywhere
- anti-spam controls (CAPTCHA + rate limit)
- simple UI
- clear privacy messaging

---

# 14. Success Metrics

## MVP Metrics
- QR scans/day
- active users
- alert delivery success rate
- repeat usage
- sticker conversion rate

---

# 15. Launch Plan

## Phase 1
Closed beta:
- friends
- apartment complexes
- bike groups

## Phase 2
Public launch:
- Instagram reels
- local partnerships
- societies

## Phase 3
Scale:
- fleets
- dealerships
- parking providers

---

# 16. Future Roadmap

## Future Features
- anonymous calling
- NFC tags
- tow alerts
- multilingual support
- fleet management
- emergency mode
- AI assistant
- parking integrations
