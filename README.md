# 🥂 MixHaus 🍸

**A modern cocktail discovery app built using TypeScript, React (Next.js), and TailwindCSS.**  
Crafted by Halle Broadnax, Brian Cassriel, Kalin Richardson, and Daniel Min for SE320, applying Agile principles, software design patterns, TDD, and other factors from the course.

---

## 🚀 Features
- 🔍 **Live Search:** Search for cocktails by name using TheCocktailDB API.
- 🍹 **Filter by Type:** Filter drinks by category or alcoholic content via a strategy pattern.
- 📄 **Detailed Drink View:** Click on a drink to view ingredients, instructions, glass type, if it is 21+, and images.
- 💡 **Animated UI:** Motion effects and hover states using Tailwind and React.
- 📊 **Responsive Layout:** Clean design across all screen sizes.

---

## 🧠 Architecture

MixHaus uses a modular **MVVM-inspired structure** with clear separation of concerns:

- **View (UI):** Built with React components and styled with Tailwind.
- **ViewModel (Logic):** Filters, search hierarchy, and interaction logic.
- **Model (Data):** Interfaces and classes for `Drink`, API responses, and strategy types.

---

## 🧩 Design Patterns Used

- **Strategy Pattern** – Used to encapsulate filtering strategies like `AlcoholFilterStrategy` and `CategoryFilterStrategy`.
- **Observer Pattern** – Implemented via a `LogoObserver` for dynamic UI reactions to scroll and user interaction.
- **Singleton Pattern** – Used to ensure only a single instance of the `Database`.

---

## 🧪 Testing

- **Framework:** `Jest`
- **Methodology:** Test-Driven Development (TDD)
- **Coverage:** Unit tests for filter strategies and database processing

---

## 🛠️ Tech Stack

| Technology            | Usage                          |
|----------------------|---------------------------------|
| **Next.js**          | Frontend framework & routing   |
| **TypeScript**       | Type safety & clarity          |
| **Tailwind CSS**     | Responsive styling & UI        |
| **Jest**             | Testing framework              |
| **TheCocktailDB API**| External drink data source     |

---

## 📐 Agile Process

- ✅ **6 Sprints** completed using Jira to track Epics, Stories, and Tasks
- 📊 **MoSCoW prioritization** and **Fibonacci estimation** to scope work
- 📅 Daily stand-ups, rotating Scrum Masters
- 🔄 Sprint Reviews and Retrospectives documented per cycle

---

## 🧩 Jira & Artifacts

- 📊 **[Jira Board]** ADD HERE!
- 📑 **Epics & User Stories:** Tracked and maintained in Jira
- ✅ Acceptance Criteria defined for each story
- 🎥 Sprint demo presentations held in class

---

## 💬 Individual Contributions

| Name               | Key Contributions                                                                 |
|--------------------|------------------------------------------------------------------------------------|
| **Kalin Richardson** | Drink detail UI, category display, search logic, visual polish                   |
| **Brian Cassriel**     | Database API connections & formatting, filter strategy system (includes tests)                |
| **Halle Broadnax**   | Home page layout, search bar UI & functionality, search results layout                  |
| **[Teammate 4]**     | Contributions here                |

---

## 🧾 How to Run Locally

```bash
git clone https://github.com/your-org/MixHaus.git
cd MixHaus
npm install
npm run dev
```

Then, open your browser and navigate to `http://localhost:3000`.

---

## 📸 Screenshots

> Insert screenshots: ADD HERE!
> - Homepage with search and filters
> - Drink detail view
> - Filter interaction examples

---

## 📚 Lessons Learned

- 💡 How to implement common design patterns in real apps
- 🚀 Scaling frontend logic cleanly with TypeScript and Next.js
- 🤝 Working collaboratively in agile sprints
- 🧪 Test-driven development and coverage discipline
- 🌐 Connecting to and transforming data from real-world APIs
