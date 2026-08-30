const apiRoot = import.meta.env.VITE_API_URL || '/api';
const backendRoot = apiRoot.replace(/\/api\/?$/, '');

export function mediaUrl(value, folder) {
  if (!value) return '';
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  const clean = String(value).replace(/^\/+/, '').replace(/^uploads\//, '').replace(new RegExp(`^${folder}/`), '');
  return `${backendRoot}/uploads/public/${folder}/${clean}`;
}

export const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"%3E%3Crect width="640" height="400" fill="%23e2e8f0"/%3E%3Cpath d="M180 290l90-100 70 75 55-55 115 120H180z" fill="%2394a3b8"/%3E%3Ccircle cx="430" cy="125" r="35" fill="%23cbd5e1"/%3E%3Ctext x="320" y="350" text-anchor="middle" fill="%23475569" font-family="sans-serif" font-size="24" font-weight="700">BKK</text%3E%3C/svg%3E';
