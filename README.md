# ChildSafe Journey

A modern school bus tracking system with real-time GPS monitoring, student attendance, and role-based dashboards for admins, drivers, and parents.

## Tech Stack

**Frontend**
- React 19 + TypeScript (strict mode)
- Vite 8
- React Router v7 (data mode)
- TanStack Query v5
- Axios with JWT interceptors
- Tailwind CSS v4 (CSS-first, dark mode via `class` strategy)
- Radix UI primitives (17 components)
- Framer Motion for animations
- React Hook Form + Zod validation
- Sonner for toasts
- Socket.IO client for real-time

**Architecture**
- Feature-first folder structure (`src/features/auth`, `src/features/admin`, etc.)
- Shared UI primitives in `src/components/ui/primitives/`
- Centralized types in `src/types/`
- API layer with axios interceptors for auth + 401 handling
- React Query for server state
- AuthContext with role-based redirects + socket connection

## Quick Start

```bash
# Frontend
cd Frontend
npm install
cp .env.example .env  # configure VITE_API_BASE_URL, VITE_SOCKET_URL
npm run dev
```

**Environment Variables**
```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

## Project Structure

```
Frontend/
├── src/
│   ├── app/
│   │   ├── providers/      # QueryProvider, AuthProvider, Toaster
│   │   └── router/         # React Router v7 data routes
│   ├── components/
│   │   ├── ui/primitives/  # 17 Radix-based components (CVA variants)
│   │   ├── ui/feedback/    # Toast, useToast hook
│   │   └── layout/         # AuthLayout
│   ├── features/
│   │   └── auth/           # Login/Register page + form
│   ├── context/
│   │   └── AuthContext.tsx # JWT auth + role redirects + socket
│   ├── services/
│   │   ├── api.client.ts   # Axios + interceptors
│   │   ├── auth.api.ts
│   │   ├── admin.api.ts
│   │   ├── driver.api.ts
│   │   ├── parent.api.ts
│   │   └── socket.client.ts
│   ├── types/              # 11 type files (bus, route, student, ride, etc.)
│   └── constants/
│       └── app.constants.ts # Routes, STORAGE_KEYS
```

## Available Scripts

```bash
npm run dev      # Start dev server (port 5173)
npm run build    # TypeScript + Vite production build
npm run lint     # oxlint (fast, Rust-based)
npm run preview  # Preview production build
```

## Authentication Flow

1. User logs in/registers via `/login` or `/register`
2. JWT stored in localStorage (`csj_auth_token`, `csj_auth_user`)
3. Axios interceptor attaches `Authorization: Bearer <token>`
4. AuthContext initializes socket connection on login
5. 401 responses trigger shared `clearAuthAndRedirect()` → logout + redirect
6. Role-based redirects: `admin` → `/admin`, `driver` → `/driver`, `parent_student` → `/parent`

## UI Primitives (17 components)

All in `src/components/ui/primitives/` with CVA variants + Framer Motion:

| Component | Radix Base | Variants |
|-----------|------------|----------|
| Button | - | default, outline, ghost, destructive, shimmer |
| Input | - | default, error |
| Select | @radix-ui/react-select | default |
| Checkbox | @radix-ui/react-checkbox | - |
| Card | - | default |
| Label | @radix-ui/react-label | - |
| Separator | @radix-ui/react-separator | - |
| FormField | - | - |
| Badge | - | default, destructive, outline |
| Avatar | @radix-ui/react-avatar | - |
| Tooltip | @radix-ui/react-tooltip | - |
| DropdownMenu | @radix-ui/react-dropdown-menu | - |
| Dialog | @radix-ui/react-dialog | - |
| Tabs | @radix-ui/react-tabs | - |
| Switch | @radix-ui/react-switch | - |
| AlertDialog | @radix-ui/react-dialog | - |
| HoverCard | @radix-ui/react-hover-card | - |
| Popover | @radix-ui/react-popover | - |
| Collapsible | @radix-ui/react-collapsible | - |

## Type Definitions

```
src/types/
├── auth.ts          # User, LoginRequest, RegisterRequest, AuthState
├── bus.ts           # Bus, CreateBusRequest, BusStatus
├── route.ts         # Route, RouteStop, CreateRouteRequest
├── student.ts       # Student, CreateStudentRequest
├── ride.ts          # RideSession, GpsLog, AttendanceLog
├── notification.ts  # Notification, NotificationEvent
├── socket.ts        # SocketEvents, LiveLocationData, EtaData
├── driver.ts        # DriverInfo
├── common.ts        # PaginatedResponse, ApiError
└── index.ts         # Barrel export
```

## Key Fixes Applied

| Issue | Fix |
|-------|-----|
| B1: AuthProvider before Router | RootLayout with Outlet wraps providers |
| B2: Radix Select + RHF | Controller wrapper on Select |
| M1: First/Last name overwrite | Split schema → firstName + lastName |
| M2: Hardcoded storage keys | STORAGE_KEYS.AUTH_TOKEN / AUTH_USER |
| M3: 401 bypasses logout | clearAuthAndRedirect() + auth:logout event |
| M4: Unused shimmer prop | Removed |
| M5: Fast refresh warnings | Split useToast hook from Toaster |
| M6: Silent localhost fallback | Throw in prod, warn in dev |

## Next Steps

- [ ] Admin dashboard (`/admin`) — bus management, driver assignment, routes
- [ ] Driver dashboard (`/driver`) — live ride, attendance marking
- [ ] Parent dashboard (`/parent`) — Mapbox live tracking, child status
- [ ] E2E tests with Playwright
- [ ] Unit tests with Vitest
- [ ] CI/CD pipeline

## License

MIT