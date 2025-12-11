# 📝 Notes App — Next.js + PostgreSQL + Markdown

A full-stack notes application with Markdown support.

## Tech Stack
- Next.js (App Router)
- Prisma ORM
- PostgreSQL
- JWT Authentication (Access + Refresh)
- Zustand

---

## 🚀 Features
- Create, edit, delete notes
- Markdown formatting
- Authentication (Login / Register)
- Protected routes
- PostgreSQL database

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your/repository.git
cd repository
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
BASE_URL="http://localhost:3000"
DATABASE_URL="postgresql://youruser:yourpassword@dbhost:port/dbname"
ACCESS_SECRET="your_access_secret_here"
REFRESH_SECRET="your_refresh_secret_here"
```

### 4. Run Prisma migrations
```bash
npx prisma migrate dev
```

### 5. Start dev server
```bash
npm run dev
```

---


---

## ✨ Basic Markdown Guide

### Headings
```md
# Heading 1
## Heading 2
### Heading 3
```

### Text Formatting
```md
**Bold**
*Italic*
~~Strikethrough~~
`Inline code`
```

### Lists
```md
- Item
- Item
- Item
```

```md
1. First
2. Second
3. Third
```

### Links & Images
```md
[Link](https://example.com)
![Image](https://example.com/image.png)
```

### Blockquotes
```md
> This is a quote
```

### Code Blocks
```md
```js
console.log("Hello world");
```


