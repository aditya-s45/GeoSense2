# GeoSense — Web3-Powered Geospatial Intelligence Platform

**GeoSense** is a **Web3-powered geospatial intelligence platform** that integrates **AI-driven satellite image segmentation** with **blockchain-based land asset management**.  
It enables users to **analyze, tokenize, and securely trade land-related data** through an intuitive, interactive web mapping interface.

---

## Table of Contents

1. [Problem Statement](#problem-statement)  
2. [Core Features](#core-features)  
   - [Geospatial Intelligence (AI Module)](#geospatial-intelligence-ai-module)  
   - [Blockchain Layer (Web3 Module)](#blockchain-layer-web3-module)  
3. [How It Works](#how-it-works)  
4. [Architecture Overview](#architecture-overview)  
5. [Getting Started](#getting-started)  
6. [System Highlights](#system-highlights)  

---

## Problem Statement

**AI-based Application for Auto-Measurement of Land Area**

Traditional land measurement relies on manual surveys—often **inaccurate**, **time-consuming**, and **non-transparent**.  
**GeoSense** automates this process through a dual-layer approach:

* **AI segmentation of satellite imagery** to measure and map land parcels precisely.  
* **Blockchain integration** for transparent, tamper-proof ownership, trade, and governance of geospatial assets.

**Sector:** Land Administration & Revenue  
**Technology Stack:** React, Vite, React-Leaflet, TailwindCSS, Flask, Python, Solidity, Hardhat, Ethereum

---

## Core Features

### Geospatial Intelligence (AI Module)

- **Auto Land Measurement:** Select an area and let AI calculate its precise area automatically.  
- **Satellite Image Segmentation:** Utilizes the *HQ-SAM (Segment Anything Model – High Quality)* framework for high-accuracy segmentation.  
- **Fine-Tuning on Custom Dataset:** HQ-SAM has been **fine-tuned** using a curated dataset of **satellite images and ground-truth land parcel masks**, significantly improving segmentation accuracy on real-world Indian geospatial data.  
- **Interactive Map Editing:** Draw, edit, and manage polygons directly on the map.  
- **Real-Time Visualization:** Overlay segmented parcels on the live map interface.  
- **Export & Insights:** Export shapefiles, GeoJSONs, and area reports for further analysis.

### Blockchain Layer (Web3 Module)

- **GeoToken (ERC-20):** Native token for payments, rewards, and governance.  
- **GeoNFT (ERC-721):** Represents tokenized land parcels with unique coordinates.  
- **UserRegistry:** Smart contract–based user identity and trust system.  
- **Escrow & Auction Contracts:** Enable secure, automated land trading and auctions.  
- **GeoDAO:** Token-based governance for decisions and dispute resolutions.

---

## How It Works

1. **Bounding Box Selection:** The user draws a bounding box to mark the target area.  
2. **AI Processing:** The backend fetches the satellite image, runs it through **fine-tuned HQ-SAM**, and generates **segmented land parcels**.  
3. **Blockchain Integration:** Each land parcel can be tokenized into a **GeoNFT**, traded via **escrow or auction**, and managed through **GeoDAO**.  
4. **Unified Visualization:** All AI and blockchain outputs are rendered together on an **interactive React-Leaflet** interface.

---

## Architecture Overview

| Layer                 | Technology                              | Function                                                 |
| --------------------- | --------------------------------------- | -------------------------------------------------------- |
| **Client (Frontend)** | React, Vite, React-Leaflet, TailwindCSS | Web mapping interface and user interactions              |
| **Server (Backend)**  | Flask, Python                           | Handles AI requests, segmentation, and shapefile export  |
| **Machine Learning**  | HQ-SAM (fine-tuned)                     | Satellite image segmentation and parcel detection        |
| **Blockchain**        | Solidity, Hardhat, Ethereum             | Asset tokenization, escrow, and DAO governance           |
| **Storage / Data**    | GeoJSON, Shapefile                      | Store land geometry, area stats, and ownership metadata  |

---

## Getting Started

### Client, Client-2 (Frontend)
```bash
cd client
npm install
npm run dev
# Visit http://localhost:3000
````

### Server (AI Backend)

```bash
cd server
conda env create -f ../environment.yml
conda activate samgeo
pip install -r ../requirements.txt
python server.py
# Runs at http://127.0.0.1:5010
```

### Blockchain (Smart Contracts)

```bash
cd blockchain
npm install
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

---

## System Highlights

* **Interactive Land Mapping:** Intuitive GIS interface built with React-Leaflet.
* **Fine-Tuned AI Segmentation:** Custom-trained HQ-SAM improves accuracy on diverse terrains.
* **Web3 Assetization:** Real-world land parcels as GeoNFTs for secure, transparent ownership.
* **DAO Governance:** On-chain decision-making and dispute handling.
* **Smart Escrow System:** Secure transactions using blockchain smart contracts.
