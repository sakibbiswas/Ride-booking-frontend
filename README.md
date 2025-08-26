# 🚖 Ride Management System – Frontend

A **production-ready, responsive, and role-based Ride Booking Platform** built with **React, Redux Toolkit, and RTK Query**. This app provides distinct experiences for **Riders**, **Drivers**, and **Admins** with secure JWT authentication and modern UI/UX.

---

## 🔗 Live Deployment

- **Frontend**: https://ride-frontend-one.vercel.app  
- **Backend**: https://ride-booking-nine.vercel.app



---

## 📖 Project Overview

The Ride Management System is a **full-stack Uber/Pathao-style platform** where Riders can book rides, Drivers can manage requests and earnings, and Admins can oversee the system.  

This repo contains the **Frontend (React + TypeScript)** code. The backend (Node/Express + MongoDB) is in a separate repository.

---

## ✨ Features

### Public
- Landing page with 5+ sections (Hero, How It Works, Highlights, Testimonials, Promotions).
- About Us, Features, Contact (validated form), FAQ (searchable).

### Authentication & Authorization
- JWT login/register with role selection (**Rider**, **Driver**, **Admin**).
- Persistent authentication & logout.
- Blocked/Suspended users redirected to status page.
- Driver “Offline Mode” → dashboard access but no ride requests.

### Rider
- Request rides (pickup, destination, fare estimate, payment).
- Ride history with filters/search.
- Ride details page with driver info and timeline.
- Profile update (name, phone, password).

### Driver
- Availability toggle (Online/Offline).
- Manage ride requests (Accept/Reject).
- Active ride management (Accepted → Completed).
- Earnings dashboard (charts).
- Ride history & profile management.

### Admin
- Manage users (block/unblock, approve/suspend drivers).
- Ride oversight with advanced filtering.
- Analytics dashboard (charts for rides, revenue, activity).
- Profile management.

### General UX
- Responsive UI with Tailwind CSS.
- Role-based navbar + profile dropdown.
- Loading skeletons, toasts, global error handling.
- SOS button (active rides only) to notify contacts or share location.

---

## 🧰 Technology Stack

- **Framework**: React 18 + TypeScript  
- **State Management**: Redux Toolkit + RTK Query  
- **Routing**: React Router 6  
- **Styling**: Tailwind CSS  
- **Charts**: Recharts  
- **Notifications**: react-hot-toast  
- **Maps**: Leaflet / react-leaflet (optional)  
- **Validation**: React Hook Form + Zod  

---

## ⚙️ Setup Instructions

### 1. Clone Repos
```bash
git clone https://github.com/sakibbiswas/Ride-booking-frontend
cd ride-frontend
