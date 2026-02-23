# Flashfix™ Turnover Marketplace

Flashfix™ is an AI-powered, logistics platform designed to streamline the property turnover process for property managers and service providers. It features role-based dashboards, AI-generated repair audits, a real-time job marketplace, and a full administrative backend for operations management.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **AI Integration:** Google Gemini API for generating repair audits and parsing inbound requests.
- **UI Components:** Built with `lucide-react` for icons and `recharts` for data visualization.
- **Deployment:** Configured for Vercel.

---

## Deployment to Vercel

This project is optimized for deployment on the [Vercel](https://vercel.com/) platform. Follow these steps to deploy your own instance from a GitHub repository.

### Step 1: Fork the Repository

First, create your own copy of this project by forking the repository on GitHub.

### Step 2: Import Project to Vercel

1.  Go to your Vercel dashboard and click **"Add New... > Project"**.
2.  Select **"Import Git Repository"** and connect the GitHub repository you just forked.

### Step 3: Configure the Project

1.  **Framework Preset:** Vercel should automatically detect that this is a static site. If prompted, select **"Other"**. No build command or output directory is needed.
2.  **Environment Variables:** This is the most important step. You must provide your Google Gemini API key.
    - Go to the **Settings** tab of your new Vercel project.
    - Navigate to the **Environment Variables** section.
    - Add a new variable with the following key and your secret value:
      - **Key:** `API_KEY`
      - **Value:** `Your-Google-Gemini-API-Key`

### Step 4: Deploy

After configuring the environment variable, navigate to the **Deployments** tab and trigger a new deployment. Vercel will build and deploy your application. Once complete, it will be live at your Vercel-provided URL.

The included `vercel.json` file automatically handles the routing configuration required for this single-page application to work correctly.
