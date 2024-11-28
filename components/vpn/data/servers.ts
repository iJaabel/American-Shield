import type { Server } from "../types";

export const servers: Server[] = [
  { 
    id: "us-east", 
    name: "US East", 
    location: "New York", 
    latency: 45,
    load: 65,
    protocol: "wireguard"
  },
  { 
    id: "us-west", 
    name: "US West", 
    location: "Los Angeles", 
    latency: 65,
    load: 45,
    protocol: "wireguard"
  },
  { 
    id: "eu-west", 
    name: "EU West", 
    location: "London", 
    latency: 85,
    load: 70,
    protocol: "openvpn"
  },
  { 
    id: "ap-east", 
    name: "AP East", 
    location: "Tokyo", 
    latency: 120,
    load: 30,
    protocol: "wireguard"
  }
];