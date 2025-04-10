# Container Security Dashboard

A modern web application for monitoring and managing security vulnerabilities in container images. This dashboard provides real-time insights into your container security posture, helping teams identify and remediate vulnerabilities efficiently.

![Dashboard Preview](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3)

## Features

- 📊 **Comprehensive Dashboard**
  - Real-time vulnerability statistics
  - Critical and high-priority issue tracking
  - Container image inventory management

- 🔍 **Advanced Search & Filtering**
  - Search by image name and tag
  - Filter by vulnerability severity
  - Quick-access vulnerability distribution

- 🛡️ **Security Insights**
  - Severity-based vulnerability categorization
  - Fix availability tracking
  - Last scan timestamp monitoring

- 📱 **Responsive Design**
  - Modern, clean interface
  - Mobile-friendly layout
  - Intuitive navigation

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/container-security-dashboard.git
```

2. Navigate to the project directory:
```bash
cd container-security-dashboard
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
container-security-dashboard/
├── src/
│   ├── App.tsx           # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html          # HTML template
└── package.json        # Project dependencies and scripts
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React best practices and hooks guidelines
- Maintain consistent component structure
- Use Tailwind CSS for styling

### Commit Guidelines

Follow conventional commits specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style updates
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Maintenance tasks

### Branch Strategy

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `fix/*`: Bug fixes
- `release/*`: Release preparation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Lucide Icons](https://lucide.dev/) for the beautiful icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the build tooling

## Support

For support, please open an issue in the repository or contact the maintainers.

---

Made with ❤️ by Your Team Name