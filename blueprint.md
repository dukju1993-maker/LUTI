# AI Skin Match - Blueprint

## Overview

**AI Skin Match** is a mobile-first web application designed to provide users with personalized skincare recommendations. Users can upload a photo of their face, and the app will analyze their skin to provide scores for various metrics like pores, wrinkles, and acne. Based on these scores, the app will recommend cosmetic treatments and clinics specializing in those treatments.

## Implemented Features

### Core
- **Skin Diagnosis:** Mock analysis of user-uploaded photos to generate skin scores.
- **Treatment Recommendation:** Rule-based engine to suggest treatments based on skin analysis results.
- **Hospital Recommendation:** Heuristic-based system to recommend clinics based on treatment recommendations and user preferences.
- **Booking System:** Allows users to request appointments with recommended clinics.

### Frontend
- **Landing Page:** Introduces the app and prompts users to start the skin analysis.
- **Photo Upload Page:** Allows users to upload a photo for analysis.
- **Results Page:** Displays the skin analysis results, including scores and charts.
- **Treatment Recommendations Page:** Lists recommended treatments with details.
- **Hospital Recommendations Page:** Shows a list of recommended clinics with an option to book.
- **My Page:** User profile page with diagnosis and booking history.

### Backend (Mock)
- **/api/diagnoses:** Mock endpoint to simulate skin analysis.
- **/api/recommendations/treatments:** Mock endpoint to recommend treatments based on diagnosis.
- **/api/recommendations/hospitals:** Mock endpoint to recommend hospitals based on treatments.
- **/api/bookings:** Mock endpoint to handle booking requests.

### Styling
- **Design:** Modern, clean, and mobile-first design suitable for the beauty/dermatology industry.
- **Layout:** Responsive layout with a focus on user experience.
- **Typography:** Clear and readable fonts.
- **Color Scheme:** Soft and appealing color palette.

## Current Plan

The current plan is to build the initial version of the AI Skin Match web application. This includes creating the frontend pages, implementing the mock backend logic, and styling the application to meet the specified requirements.

### Steps:
1.  **Create the basic HTML structure** for the application in `index.html`.
2.  **Style the application** using modern CSS in `style.css`.
3.  **Implement the frontend logic** and mock backend in `main.js`.
4.  **Create the necessary pages** as web components.
5.  **Ensure the application is responsive** and works well on mobile devices.
6.  **Add basic routing** to navigate between pages.
