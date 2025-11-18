# Integrasi Supabase - Quick Start

Database sudah dikonfigurasi untuk menggunakan Supabase. Ikuti langkah berikut:

## 1. Install Dependencies

```bash
npm install
# atau
pnpm install
```

## 2. Setup Supabase

1. Buat project di [supabase.com](https://supabase.com)
2. Copy `.env.example` menjadi `.env.local`
3. Isi dengan credentials dari Supabase dashboard (Settings > API)
4. Jalankan SQL schema dari `supabase/schema.sql` di Supabase SQL Editor
5. Jalankan seed script: `npm run seed`

## 3. File yang Dibuat

- `lib/supabase.ts` - Konfigurasi Supabase client
- `supabase/schema.sql` - Database schema
- `app/api/` - API routes untuk:
  - `/api/auth/login` - Autentikasi
  - `/api/students` - CRUD siswa
  - `/api/expenses` - CRUD pengeluaran
  - `/api/reports/[className]` - Laporan kelas
- `scripts/seed-database.js` - Script untuk seed data awal

## 4. Environment Variables

Tambahkan ke `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Lihat `SUPABASE_SETUP.md` untuk panduan lengkap.

