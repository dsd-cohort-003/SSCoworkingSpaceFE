# SSCoworkingSpaceFE

Frontend repository for coworking Space Project for DSD Group

## Setup
### Prerequisites:
Make sure you have **Node.js** installed. You can check with:
```bash
node -v
```

### 1. Install dependencies
```bash
npm install
```
### 2. Start development server
```bash
npm run dev
```
This should run on ``http://localhost:5173/``. Open this in your web browser.
### ...or build production server
```bash
npm run build
```
Then you would copy the build files (in ``dist/``) to where you want them to go on your server (e.g. **nginx**). You can test the production build via:
```bash
npm run preview
```
which should run on ``http://localhost:4173/``.
