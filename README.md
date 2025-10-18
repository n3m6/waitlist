# Silent Sea

A retro-futuristic waitlist landing page for Silent Sea, a confidential orderbook DEX on Solana.

**Website**: [https://silentsea.xyz](https://silentsea.xyz)  
**Twitter**: [@silentsea_xyz](https://x.com/silentsea_xyz)

## Getting Started

### Prerequisites

```bash
$ node --version
v24.3.0

$ pnpm --version
10.15.1
```

### Environment Setup

1. Copy the example environment file:

```sh
cp .env.example .env
```

2. Update the `.env` file with your API endpoint:

```
VITE_API_BASE_URL=https://your-api-domain.com
```

### Installation & Development

```sh
pnpm install
pnpm dev
```

## Features

- **Waitlist Form**: Email collection with validation
- **API Integration**: Submits to `${VITE_API_BASE_URL}/api/waitlist`
- **Retro-Futuristic Design**: Custom color palette with flat design
- **Responsive**: Works on all devices
- **Form States**: Loading, success, and error handling

## Color Palette

- Primary Background: `#4D455D` (Deep Lavender-Gray)
- Primary Accent: `#E96479` (Vibrant Coral Pink)
- Primary Text: `#F5E9CF` (Creamy Beige)
- Secondary Accent: `#7DB9B6` (Seafoam Green)

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
