export interface Server {
  id: string;
  name: string;
  location: string;
  latency: number;
  load?: number;
  protocol?: "openvpn" | "wireguard";
}

export interface ConnectionStats {
  bytesReceived: number;
  bytesSent: number;
  connectedTime: number;
  latency: number;
  protocol?: string;
}

export interface ConnectionError {
  code: string;
  message: string;
}