export function removeVietnameseTones(str: string): string {
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // bỏ dấu tổ hợp
  str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
  str = str.replace(/[^a-zA-Z0-9\s]/g, '');
  return str
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
    .trim();
}
