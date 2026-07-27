# Project-Specific Rules: Pakistan Jewellery Lead-Generation Website

## Tech Stack
*   **Backend:** Laravel (version ^12.0)
*   **Frontend:** React 19 (TypeScript)
*   **Routing:** Inertia.js (Crucial Integration)
*   **Styling:** Tailwind CSS (v4)
*   **UI Components:** shadcn/ui (Inspired by `satnaing-shadcn-admin` style template)
*   **Database:** MySQL

## Architecture Layers
*   **React (UI)** -> Presentational and interactive component layers.
*   **Inertia.js** -> Page routing and prop data bridging.
*   **Laravel Controller** -> Thin endpoints that hand off logic to Services.
*   **Service Layer** -> Holds all business logic (notifications, calculations, routing).
*   **Repository Layer** -> Holds all database queries and Eloquent relationships.
*   **MySQL** -> Persistance layer.

## Coding Rules
*   **TypeScript Everywhere:** Do not write any `.js` or `.jsx` frontend files. Use `.ts` and `.tsx` with strict typing. Avoid `any`.
*   **Thin Controllers:** Keep controllers minimal. Use Form Requests for request validation, and defer all business actions to the Service layer.
*   **Business Logic in Services:** Do not write calculations, routing algorithms, or notifications inside controllers or models.
*   **Database Logic in Repositories:** Do not place queries directly in controllers. Keep all queries isolated in Repositories.
*   **Form Requests:** Always create validation classes (e.g., `php artisan make:request ...`).
*   **SOLID Principles:** Ensure Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.
*   **Follow PSR-12:** Maintain PHP coding standards.
*   **Meaningful Commits:** Write clean, informative Git commit messages.
