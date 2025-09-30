# Hardware Estimator Calculator

This project helps estimate hardware requirements through a questionnaire interface. The code has been restructured into a modular, maintainable format using shadcn/ui components with modern design elements.

## Key Features

- ✨ **Modern UI Design**: Glassmorphism effects, gradients, and sleek animations
- 📱 **Responsive Layout**: Works seamlessly on mobile, tablet, and desktop
- 📋 **Interactive Questionnaire**: Organized by categories with instant explanations
- 💡 **Fixed Sidebar**: Estimativa calculada and download button always fixed on the right
- 📄 **Modal Explanations**: Click any category to open centered detailed explanation
- 📊 **Unit Display**: Shows appropriate units (GB, TB, cores) for each resource
- 📥 **Status Tracking**: Shows how many questions remain to be answered
- 🎨 **Premium Aesthetic**: Dark theme with purple/indigo accents
- 🔄 **Smooth Animations**: Fade-in, slide-up, and hover effects throughout
- 📊 **Real-time Calculations**: Instant hardware requirement estimates
- 📥 **CSV Export**: Generate Excel-compatible reports

## Project Structure

```
├── excel_hardware_estimator.tsx          # Main entry point
├── package.json                         # Dependencies and scripts
├── tailwind.config.js                   # Tailwind CSS configuration
├── vite.config.ts                       # Vite configuration
├── tsconfig.json                        # TypeScript configuration
├── index.html                           # HTML template
├── public/                              # Public assets
└── src/
    ├── components/                      # React components
    │   ├── ui/                          # shadcn/ui components
    │   │   ├── button.tsx               # Glassmorphism button
    │   │   ├── card.tsx                 # Glassmorphism card
    │   │   └── select.tsx               # Custom select dropdown
    │   └── HardwareEstimator/           # Main estimator component
    │       ├── HardwareEstimator.tsx    # Main component with fixed sidebar
    │       ├── QuestionCard.tsx         # Question card with category badge
    │       ├── ResourceCard.tsx         # Resource display card with units
    │       ├── ExplanationModal.tsx     # Centered modal for explanations
    │       └── CategoryBadge.tsx        # Interactive category badge
    ├── data/                           # Data and configuration
    │   ├── questions.json              # Questionnaire questions
    │   ├── weights.json                # Calculation weights
    │   ├── explanations.json           # Explanations for categories
    │   └── questionsData.ts            # Data utilities
    ├── hooks/                          # Custom React hooks
    │   └── useAnimation.ts             # Animation hooks
    ├── styles/                         # Global styles
    ├── utils/                          # Utility functions
    │   ├── cn.ts                       # Classname utility (cn)
    │   ├── csvGenerator.ts             # CSV generation logic
    │   └── types.ts                    # TypeScript type definitions
    ├── App.tsx                         # Main app component
    ├── index.tsx                       # Application entry point
    └── index.css                       # Global styles and animations
```

## Design Features

- **Glassmorphism UI**: Modern frosted glass effect on cards
- **Fixed Sidebar**: Hardware calculation results and download always visible on right side
- **Unit Display**: Proper units (GB, TB, cores) for each resource type
- **Status Tracking**: Shows remaining questions to be answered
- **Animated Background**: Subtle pulsating gradient elements
- **Centered Modal Explanations**: Click any category to open detailed view
- **Interactive Category Badges**: Click to open explanation modal
- **Smooth Transitions**: Fade-in, slide-up, and hover animations
- **Responsive Design**: Adapts to all screen sizes with mobile-first approach
- **Dark Theme**: Deep cosmic-inspired background with purple/indigo accents

## Dependencies

- React 18+
- shadcn/ui (custom implementation)
- Tailwind CSS
- Lucide React (icons)
- clsx and tailwind-merge for class management
- Vite for build tooling

## File Organization

- **JSON**: Split into 3 files (questions.json, weights.json, explanations.json) in `/src/data/`
- **TSX**: Component logic in `/src/components/` with shadcn/ui components in `/src/components/ui/`
- **TS**: Utility functions and types in `/src/utils/`
- **Data**: Configuration in `/src/data/`
- **Hooks**: Custom hooks in `/src/hooks/`

## Usage

The calculator is ready to use with a properly modularized architecture that makes it easy to add new features, modify existing functionality, and maintain the codebase. Components are properly separated and styled using modern UI patterns.

To start the development server:
```
npm install
npm run dev
```

To build for production:
```
npm run build
```