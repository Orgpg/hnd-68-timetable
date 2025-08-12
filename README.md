# 📚 HND 68 Timetable App

![Hero](public/hero.png)

> A personalized, real-time Myanmar timetable app for HND 68 students.

[![Next.js](https://img.shields.io/badge/Built%20With-Next.js-blue)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20With-Tailwind%20CSS-teal)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Overview

**HND 68 Timetable** သည် HND 68 ကျောင်းသားများအတွက် စိတ်ကြိုက်အတန်းဇယားကြည့်ရှုရန် Web App တစ်ခုဖြစ်ပြီး၊ မြန်မာစံတော်ချိန်အတိုင်း real-time နဲ့ ပြသပေးနိုင်ပါသည်။ 

---

## ✨ Features

- 🕐 **Real-time Myanmar Clock** – မြန်မာစံတော်ချိန်ကို Live ပြသခြင်း
- 📆 **Daily Schedule Preview** – ယနေ့နဲ့မနက်ဖြန် အတန်းဇယား မြင်သာခြင်း
- 📅 **Interactive Day Navigator** – နေ့အလိုက် အတန်းကြည့်ရှုနိုင်ခြင်း
- 🔁 **Dynamic Semester Timetables** – Semester များအလိုက်အလွယ်တကူ ပြောင်းလဲနိုင်ခြင်း
- 📝 **Assignment Tracker** – Assignments များ၏ အချိန်ဇယားနှင့်အသေးစိတ်
- 📩 **Feedback Form** – စိတ်ခံစားချက်များပေးပို့နိုင်သော Form
- 📱 **Responsive Design** – မည်သည့် Device မှမဆို ပြည့်စုံအောင်ဖြစ်
- 🌗 **Dark Mode** – မျက်စိအေးအောင် Theme ပြောင်းနိုင်ခြင်း

---

## 🧰 Tech Stack

| Technology     | Description |
|----------------|-------------|
| **Next.js**    | React Framework |
| **React**      | UI Library |
| **Tailwind CSS** | Utility-first CSS Framework |
| **shadcn/ui**  | UI Components based on Radix UI |
| **Lucide React** | Icon Pack |
| **Nodemailer** | Email Sending |
| **Zod**        | Schema Validation |

---

## 🚀 Installation

```bash
# 1. Clone the repository
git clone https://github.com/Orgpg/hnd-68-timetable.git
cd hnd-68-timetable

# 2. Install dependencies
npm install   # or yarn / pnpm

# 3. Setup Environment Variables
cp .env.example .env.local
```

`.env.local` ထဲမှာ Zoho Mail credentials ထည့်ပါ:

```
ZOHO_MAIL_USER=your_zoho_email@example.com
ZOHO_MAIL_PASS=your_zoho_password
ZOHO_MAIL_HOST=smtp.zoho.com
ZOHO_MAIL_PORT=465
```

```bash
# 4. Run the app
npm run dev

# Visit: http://localhost:3000
```

---

## 🧭 Usage Guide

| Page        | Purpose |
|-------------|---------|
| **Home**    | ယနေ့အတန်းဇယားနှင့်အခြား Tab များသို့ရောက်နိုင်ခြင်း |
| **Assignments** | Assignments အသေးစိတ်ကြည့်ရှုခြင်း |
| **Feedback**    | App ပြဿနာများ/အကြံပြုချက်များပေးပို့ခြင်း |

---

## 📁 Project Structure

```txt
hnd-68-timetable/
├── app/
│   ├── actions/              # Server Actions
│   ├── assignments/          # Assignments Page
│   ├── feedback/             # Feedback Page
│   ├── layout.tsx            # Main Layout
│   └── page.tsx              # Dashboard Page
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── daily-schedule-preview.tsx
│   ├── feedback-form.tsx
│   └── myanmar-clock.tsx
├── lib/
│   ├── assignments/          # Assignment Data
│   ├── timetable/            # Timetable Data & Logic
│   └── utils/                # Utilities (e.g. Timezone)
├── public/                   # Static Assets
└── ...
```

---

## 🙌 Contributing

သင့်မှာ bug report၊ UI improvement၊ နောက်ထပ် feature များရှိပါက welcome ပါသည်။ GitHub 上 issue တင်ခြင်း သို့မဟုတ် pull request ဖြင့် ပံ့ပိုးနိုင်ပါတယ်။

---

## 📝 License

Distributed under the MIT License. See [`LICENSE`](https://opensource.org/licenses/MIT) for more information.

---

## 📬 Contact

**Wai Phyo Aung**  
📧 Email: [info@waiphyoaung.dev](mailto:info@waiphyoaung.dev)

---

![Gusto College Logo](public/gusto-college-logo.png)
