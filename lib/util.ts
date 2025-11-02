// lib/utils.ts
import { ReactNode } from 'react';

export function toPlainString(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return node.toString();
  if (node === null || node === undefined) return '';
  if (Array.isArray(node)) {
    return node.map(toPlainString).join('').trim();
  }
  if (typeof node === 'object' && 'props' in node) {
    return toPlainString((node.props as any).children);
  }
  return String(node).trim();
}