# HND 68 Timetable App

![HND 68 Timetable Hero Image](public/images/hero-timetable.png?height=400&width=800&query=abstract%20geometric%20pattern%20with%20teal%20and%20cyan%20colors)

## Overview

The HND 68 Timetable App is a personalized class schedule viewer designed for HND 68 students. It provides real-time Myanmar time updates and allows students to easily navigate their daily and weekly classes, as well as view assignment details.

## Features

*   **Real-time Myanmar Clock**: Displays the current time and date in Myanmar.
*   **Daily Schedule Preview**: Shows today's and tomorrow's classes at a glance.
*   **Interactive Day Navigator**: Easily switch between days of the week to view specific schedules.
*   **Dynamic Timetable Periods**: Supports multiple semester periods, allowing for easy switching between different timetables.
*   **Assignment Tracking**: View details and deadlines for all assignments.
*   **Feedback Form**: A dedicated page to send suggestions or report bugs.
*   **Responsive Design**: Optimized for both desktop and mobile devices.
*   **Dark Mode**: Toggle between light and dark themes for comfortable viewing.

## Technologies Used

*   **Next.js**: React framework for building performant applications.
*   **React**: JavaScript library for building user interfaces.
*   **Tailwind CSS**: A utility-first CSS framework for rapid styling.
*   **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
*   **Lucide React**: A collection of beautiful and customizable open-source icons.
*   **Nodemailer**: For sending feedback emails.
*   **Zod**: For schema validation.

## Installation and Setup

To run this project locally, follow these steps:

1.  **Clone the repository**:
    \`\`\`bash
    git clone https://github.com/Orgpg/hnd-68-timetable.git
    cd hnd-68-timetable
    \`\`\`

2.  **Install dependencies**:
    \`\`\`bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    \`\`\`

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root of your project and add the following environment variables for email functionality:
    \`\`\`
    ZOHO_MAIL_USER=your_zoho_email@example.com
    ZOHO_MAIL_PASS=your_zoho_password
    ZOHO_MAIL_HOST=smtp.zoho.com
    ZOHO_MAIL_PORT=465
    \`\`\`
    Replace the placeholder values with your actual Zoho Mail credentials.

4.  **Run the development server**:
    \`\`\`bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    \`\`\`

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

*   **Home**: View the current day's schedule and navigate to other sections.
*   **Assignments**: Check assignment details and deadlines.
*   **Feedback**: Submit suggestions or report issues to the developer.

## Project Structure

\`\`\`
hnd-68-timetable/
├── app/
│   ├── actions/          # Server Actions for data mutations (e.g., feedback submission)
│   ├── assignments/      # Assignments page
│   ├── feedback/         # Feedback page
│   ├── layout.tsx        # Root layout for the application
│   └── page.tsx          # Main dashboard page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── assignment-card.tsx
│   ├── daily-schedule-preview.tsx
│   ├── daily-timetable-view.tsx
│   ├── feedback-form.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── mobile-sidebar.tsx
│   └── myanmar-clock.tsx
├── lib/
│   ├── assignments/      # Assignment data
│   ├── timetable/        # Timetable data and logic
│   ├── types.ts          # TypeScript type definitions
│   └── utils/            # Utility functions (e.g., date formatting)
├── public/               # Static assets (images, favicons)
└── ...                   # Other configuration files (tailwind.config.ts, tsconfig.json, etc.)
\`\`\`

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any bugs, please feel free to open an issue or submit a pull request on the GitHub repository.

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For any inquiries or support, please contact:
Wai Phyo Aung - info@waiphyoaung.dev

---

![Gusto College Logo](public/gusto-college-logo.png)
