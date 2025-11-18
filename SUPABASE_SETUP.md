# Supabase Setup Guide

Panduan lengkap untuk mengatur database Supabase untuk aplikasi Sistem Pengelolaan Kas Kelas Digital SMK YPE SAMPANG.

## Langkah 1: Buat Project Supabase

1. Kunjungi [https://supabase.com](https://supabase.com)
2. Buat akun atau login
3. Klik "New Project"
4. Isi informasi project:
   - **Name**: SMK YPE SAMPANG (atau nama yang Anda inginkan)
   - **Database Password**: Buat password yang kuat (simpan dengan aman!)
   - **Region**: Pilih region terdekat (misalnya: Southeast Asia)
5. Klik "Create new project" dan tunggu hingga project selesai dibuat (sekitar 2 menit)

## Langkah 2: Dapatkan API Keys

1. Di dashboard Supabase, klik **Settings** (ikon gear) di sidebar kiri
2. Pilih **API** dari menu
3. Catat informasi berikut:
   - **Project URL** (contoh: `https://xxxxx.supabase.co`)
   - **anon/public key** (kunci yang aman untuk client-side)
   - **service_role key** (kunci rahasia untuk server-side - JANGAN expose di client!)

## Langkah 3: Setup Environment Variables

1. Copy file `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit file `.env.local` dan isi dengan nilai dari Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

**PENTING**: Jangan commit file `.env.local` ke Git! File ini sudah ada di `.gitignore`.

## Langkah 4: Buat Database Schema

1. Di dashboard Supabase, klik **SQL Editor** di sidebar kiri
2. Klik **New query**
3. Buka file `supabase/schema.sql` di project Anda
4. Copy semua isi file tersebut
5. Paste ke SQL Editor di Supabase
6. Klik **Run** (atau tekan Ctrl+Enter)
7. Pastikan tidak ada error dan semua tabel berhasil dibuat

## Langkah 5: Install Dependencies

Jalankan perintah berikut untuk menginstall package yang diperlukan:

```bash
npm install @supabase/supabase-js bcryptjs dotenv
npm install --save-dev @types/bcryptjs
```

Atau jika menggunakan pnpm:
```bash
pnpm add @supabase/supabase-js bcryptjs dotenv
pnpm add -D @types/bcryptjs
```

## Langkah 6: Seed Database

Jalankan script untuk mengisi database dengan data awal:

```bash
npm run seed
```

Atau:
```bash
node scripts/seed-database.js
```

Script ini akan membuat:
- 3 user (2 bendahara, 1 guru)
- 22 siswa
- 4 pengeluaran contoh
- Pengaturan kelas

**Default Credentials:**
- **Bendahara 1**: 
  - Email: `aufa@smkypesampang.sch.id`
  - Password: `aufa123`
- **Bendahara 2**: 
  - Email: `azkia@smkypesampang.sch.id`
  - Password: `azkia123`
- **Guru**: 
  - Email: `diana@smkypesampang.sch.id`
  - Password: `guru2025`

## Langkah 7: Verifikasi Setup

1. Jalankan development server:
   ```bash
   npm run dev
   ```

2. Buka browser dan akses `http://localhost:3000`

3. Coba login dengan salah satu credential di atas

4. Pastikan data siswa dan pengeluaran muncul dengan benar

## Troubleshooting

### Error: Missing Supabase environment variables
- Pastikan file `.env.local` sudah dibuat dan berisi semua variabel yang diperlukan
- Restart development server setelah menambahkan environment variables

### Error: relation "users" does not exist
- Pastikan Anda sudah menjalankan SQL schema di Supabase SQL Editor
- Cek apakah semua tabel sudah dibuat di dashboard Supabase (Table Editor)

### Error: Invalid API key
- Pastikan Anda menggunakan key yang benar dari Settings > API
- Pastikan `NEXT_PUBLIC_SUPABASE_ANON_KEY` untuk client-side
- Pastikan `SUPABASE_SERVICE_ROLE_KEY` untuk server-side (seed script)

### Password tidak match saat login
- Pastikan password sudah di-hash dengan benar di database
- Jalankan ulang seed script untuk reset password

## Struktur Database

### Tabel yang dibuat:
1. **users** - Data pengguna (bendahara, guru, admin)
2. **students** - Data siswa
3. **expenses** - Data pengeluaran kelas
4. **class_settings** - Pengaturan kelas (dana, iuran, dll)
5. **payment_history** - Riwayat pembayaran siswa

### Row Level Security (RLS)
- Semua tabel memiliki RLS enabled
- Policy sudah dikonfigurasi untuk:
  - Bendahara dapat mengelola siswa dan pengeluaran
  - Semua user terautentikasi dapat membaca data
  - User hanya dapat membaca data mereka sendiri

## Next Steps

Setelah setup selesai, Anda dapat:
1. Mengubah password default user melalui Supabase dashboard
2. Menambahkan user baru melalui API atau dashboard
3. Menyesuaikan pengaturan kelas sesuai kebutuhan
4. Menambahkan kelas baru jika diperlukan

## Support

Jika mengalami masalah, cek:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)

