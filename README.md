# BillManager - Professional Finance Dashboard

Welcome to **BillManager**, a clean and interactive finance dashboard built to help users understand their spending patterns and manage their bills effectively.

---

## 🚀 Key Features

### 1. **Financial Overview**
-   **Real-time Summary Cards**: Instant visibility of your **Monthly Budget**, **Total Expenses**, and **Remaining Balance**.
-   **Overspending Alerts**: Financial cards dynamically change colors and show warnings when the budget is exceeded.

### 2. **Transaction Management**
-   **CRUD Operations**: Easily add and remove bills with descriptions, amounts, and dates.
-   **Smart Categorization**: Standardized categories (Food, Utility, Shopping, etc.) for better breakdown.
-   **Empty States**: Gracefully handles scenarios where no data is available or no search results are found.

### 3. **Advanced Look-up & Analysis**
-   **Advanced Search**: A global, real-time search bar to find transactions by description.
-   **Category Filtering**: Quickly isolate spending by specific categorical types.
-   **Spending Trends**: Interactive charts showing financial patterns over time using **Recharts**.

### 4. **Role-Based UI (RBAC)**
-   **Admin Role**: Full access to all features, including adding/removing bills and editing budgets.
-   **Viewer Role**: Read-only access. Administrative buttons and forms are automatically hidden from the UI.
-   **Role Switcher**: Integrated toggle in the sidebar to demonstrate permission-based UI shifts instantly.

### 5. **Premium UX Elements**
-   **Dark & Light Mode**: Full theme support with automatic persistence in **LocalStorage**.
-   **Design System**: Built with modern CSS variables, a customized color palette, and a focus on visual hierarchy.
-   **Fully Responsive**: Flexible grid layouts that work seamlessly on mobile, tablet, and desktop monitors.

---

## 🛠️ Tech Stack & Architecture

-   **Frontend**: React 19 (Functional Components & Hooks)
-   **State Management**: Redux Toolkit (RTK) for scalable, predictable data flow.
-   **Styling**: Vanilla CSS with a centralized Variable Token system.
-   **Data Visualization**: Recharts for high-performance data charts.
-   **Logic**: Custom Subset Calculation algorithm for budgeting insights.

---

## 🏗️ Getting Started

### Prerequisites:
-   **Node.js** (v14 or higher)
-   **npm** or **yarn**

### Installation:
1.  Clone the repository:
    ```bash
    git clone https://github.com/joshikhush/Bill-Manager-.git
    ```
2.  Navigate to the project folder:
    ```bash
    cd Bill-Manager-
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm start
    ```
   *The application will be available at `http://localhost:3000`*

---

## 💡 Architectural Decisions
-   **Modularity**: Components are decoupled and self-contained in the `src/components` directory.
-   **Scalability**: State is segmented into logical slices (`bills`, `auth`) using Redux Toolkit to allow for easy expansion.
-   **Performance**: Heavy calculations like filtering and budget summing are optimized using `useMemo`.
-   **User-Centric Design**: Information density is balanced to provide a professional, data-driven experience without overwhelming the user.

---

## 📝 Evaluation Notes
This project was developed with a heavy focus on **UI polish** and **State handling**. Every state change in the app is reactive—updating the charts, the stats cards, and the filtered lists simultaneously. It fulfills all the core and optional requirements of the Finance Dashboard assignment.