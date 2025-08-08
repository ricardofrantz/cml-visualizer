# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CML Visualizer is a Next.js web application for exploring coupled map lattices (CML) and iterative maps with interactive visualizations. It features multiple map types, visualization options, and themed color schemes for studying chaos theory and complex systems.

## Commands

### Development
- `npm run dev` - Start the Next.js development server on http://localhost:3000
- `npm run build` - Build the production-ready application
- `npm run start` - Run the production build
- `npm run lint` - Run Next.js linting

### Installation
- `npm install` - Install all dependencies (requires Node.js >= 18.0.0)

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 14.1.0 with App Router
- **UI**: React 18, Tailwind CSS
- **Visualization**: D3.js v7, Three.js/React-Three-Fiber for 3D
- **TypeScript**: Strict typing throughout
- **Styling**: CSS-in-JS with CSS variables for dynamic theming

### File Structure
All components and modules are currently in the root directory (flat structure):
- `page.tsx` - Home page with map selection cards
- `layout.tsx` - Root layout with theme provider
- `globals.css` - Global styles
- Visualization components: `*MapVisualization.tsx`, `CMLVisualization.tsx`
- Map calculation modules: `logistic.ts`, `henon.ts`, `standard.ts`, `cml.ts`
- Theme system: `ThemeContext.tsx`, `ThemeSwitcher.tsx`, `theme-variants.ts`, `theme-types.ts`
- `MacOSCompatibility.tsx` - Platform-specific optimizations

### Map Implementations

1. **Logistic Map** (`logistic.ts`)
   - Formula: x_{n+1} = rx_n(1-x_n)
   - Shows period-doubling route to chaos
   - Parameter r controls behavior (chaos at r ≈ 3.9)

2. **Hénon Map** (`henon.ts`)
   - Formula: x_{n+1} = 1 - ax_n^2 + y_n, y_{n+1} = bx_n
   - Classic values: a = 1.4, b = 0.3
   - Exhibits strange attractor with fractal structure

3. **Standard Map** (`standard.ts`)
   - Formula: p_{n+1} = p_n + K sin(θ_n), θ_{n+1} = θ_n + p_{n+1}
   - Area-preserving Hamiltonian system
   - Parameter K controls chaos level

4. **Coupled Map Lattice** (`cml.ts`)
   - Coupling types:
     - **Diffusive**: x_{n+1}(i) = (1-ε)f(x_n(i)) + (ε/2){f(x_n(i+1)) + f(x_n(i-1))}
     - **Global**: x_{n+1}(i) = (1-ε)f(x_n(i)) + (ε/N)∑_j f(x_n(j))
     - **Directional**: x_{n+1}(i) = (1-ε)f(x_n(i)) + εf(x_n(i-1))
   - Parameter ε controls coupling strength

### Visualization Types
Each map supports multiple visualization modes:
- Time series plots
- Phase space (2D/3D)
- Cobweb plots (1D maps)
- Bifurcation diagrams
- Power spectrum analysis
- Heat maps/space-time plots (CML)

### Theming System
Five built-in themes with dynamic CSS variable injection:
- **Dune**: Desert-inspired colors
- **Tron**: Neon blue/cyan on dark
- **Matrix**: Green code on black
- **Scientific**: Clean, publication-ready
- **Ice Fire**: Blue and red gradient

Themes are defined in `theme-variants.ts` and managed via `ThemeContext.tsx`.

### Interactive Features
- Real-time parameter adjustment with sliders
- Visualization type selection
- Preset configurations for interesting behaviors
- Animation controls (play/pause/reset)
- Zoom and pan controls
- Adjustable animation speed

### Responsive Design
Three breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Development Patterns

1. **Client-side rendering**: All visualization components use `"use client"` directive
2. **Component organization**: Flat structure in root directory
3. **State management**: React hooks for local state, Context API for themes
4. **Performance considerations**:
   - Consider Web Workers for heavy computations
   - Memoization for calculation results
   - Progressive rendering for complex visualizations
   - WebGL for hardware acceleration

### macOS Optimizations
`MacOSCompatibility.tsx` contains platform-specific adjustments:
- Font rendering optimizations
- Trackpad and mouse wheel behavior
- Touch-friendly controls

## Project Status

### Completed Features
- Basic layout structure
- Core UI components
- Map calculation functions (all types)
- Visualization components (all types)
- Interactive controls (sliders, dropdowns, animation)
- Theme system implementation

### Pending Enhancements
- Performance optimization
- Additional futuristic design elements
- Extended responsive design testing
- Deployment configuration

## Contributing Guidelines

### Code Standards
- Use TypeScript for type safety
- Follow existing code style
- Use meaningful variable and function names
- Keep components modular and reusable
- Write comments for complex logic

### Testing Requirements
- Test in multiple browsers
- Verify macOS compatibility
- Check all themes work correctly
- Test responsive design on different screen sizes

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make changes following code standards
4. Test thoroughly
5. Submit pull request with clear description

## Mathematical Background

The application implements several chaotic systems from nonlinear dynamics:

- **Discrete time, discrete space, continuous state** systems (CML)
- **Sensitivity to initial conditions** (butterfly effect)
- **Period-doubling route to chaos** (logistic map)
- **Strange attractors** (Hénon map)
- **Hamiltonian chaos** (standard map)
- **Spatiotemporal chaos** (coupled map lattice)

Analysis tools include fixed points, Lyapunov exponents, bifurcation diagrams, and power spectrum analysis.