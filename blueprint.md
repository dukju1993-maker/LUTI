# LUTI - Blueprint

## Overview

**LUTI** (Look Up To It) is a premium, mobile-first web application designed to provide users with personalized skincare recommendations and medical aesthetic clinic matching. Users can upload a photo of their face, and the app will provide a detailed AI-driven skin diagnosis, recommending specific treatments (like Ultherapy, Potenza, etc.) and matching them with top-tier clinics.

## Implemented Features (Phase 1)

### Core
- **Skin Diagnosis:** Mock analysis of user-uploaded photos to generate skin scores.
- **Treatment Recommendation:** Rule-based engine to suggest treatments based on skin analysis results.
- **Hospital Recommendation:** Heuristic-based system to recommend clinics based on treatment recommendations and user preferences.
- **Booking System:** Allows users to request appointments with recommended clinics.
- **Service Introduction (Workflow):** Clickable section on the landing page that reveals the step-by-step LUTI workflow.

### Frontend
- **Landing Page:** Introduces the app and prompts users to start the skin analysis.
- **Photo Upload Page:** Allows users to upload a photo for analysis.
- **Results Page:** Displays the skin analysis results, including radar charts and grades.
- **Treatment Recommendations Page:** Lists recommended treatments with details and badges.
- **Hospital Recommendations Page:** Shows a list of recommended clinics with an option to book.
- **My Page:** User profile page with history.

### Backend (Mock)
- **/api/diagnoses:** Mock endpoint to simulate skin analysis.
- **/api/recommendations/treatments:** Mock endpoint to recommend treatments based on diagnosis.
- **/api/recommendations/hospitals:** Mock endpoint to recommend hospitals based on treatments.
- **/api/bookings:** Mock endpoint to handle booking requests.

## Current Plan (Phase 2: UI/UX & Branding Enhancement)

The current focus is on elevating the user experience through a premium "Glossy & Medical" aesthetic, leveraging modern CSS features and refined layout.

### Design Principles:
1.  **Vibrant & Energetic:** Using `oklch` color spaces for more perceptual uniformity and vibrance.
2.  **Depth & Texture:** Multi-layered drop shadows for a "lifted" card feel and subtle noise textures for a premium touch.
3.  **Expressive Typography:** High-contrast font sizes (hero text vs. captions) to guide the user's attention.
4.  **Interactive Feedback:** Glow effects and smooth transitions for buttons and cards.
5.  **Component-Based:** Refined Web Components using Shadow DOM for better encapsulation where appropriate.

### Steps:
1.  **Update `style.css`** with modern CSS (Baseline features):
    - Implement Cascade Layers (`@layer`) for better style management.
    - Use `oklch()` for a premium color palette.
    - Add multi-layered shadows and subtle gradients.
    - Implement Container Queries for responsive treatment/hospital cards.
2.  **Refine `index.html`**:
    - Add high-quality web fonts (Inter/Montserrat).
    - Improve the initial landing page layout.
3.  **Enhance `main.js`**:
    - Update Web Components with improved markup and interactive elements.
    - **Added Drag & Drop / File Selection for Photo Upload.**
    - Add animations and transitions between pages.
    - Implement better data visualization for skin diagnosis.
4.  **CI/CD Setup**:
    - **GitHub Actions established for automatic deployment to GitHub Pages on every push to `main`.**
5.  **Final Polish**:
    - Ensure accessibility (A11Y) standards.
    - Verify responsiveness across different mobile screen sizes.
