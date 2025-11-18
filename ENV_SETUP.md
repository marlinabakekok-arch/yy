# Setup Environment Variables

File ini menjelaskan cara setup environment variables untuk aplikasi.

## Langkah-langkah:

### 1. Copy Template File
Copy file `env.template` menjadi `.env.local`:

**Windows (PowerShell):**
```powershell
Copy-Item env.template .env.local
```

**Windows (CMD):**
```cmd
copy env.template .env.local
```

**Mac/Linux:**
```bash
cp env.template .env.local
```

### 2. Dapatkan Credentials dari Supabase

1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Klik **Settings** (ikon gear) di sidebar
4. Pilih **API** dari menu
5. Copy nilai berikut:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Edit File .env.local

Buka file `.env.local` dan ganti semua `your_xxx` dengan nilai sebenarnya:

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE5MzE4MTUwMjJ9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Verifikasi

Pastikan file `.env.local` berisi 3 variabel dengan nilai yang benar (bukan `your_xxx`).

### 5. Restart Development Server

Setelah mengubah environment variables, restart server development:

```bash
# Stop server (Ctrl+C)
# Kemudian jalankan lagi:
npm run dev
```

## Keamanan

⚠️ **PENTING:**
- File `.env.local` sudah di-ignore oleh git (tidak akan ter-commit)
- JANGAN pernah commit file `.env.local` ke repository
- JANGAN share `SUPABASE_SERVICE_ROLE_KEY` ke siapa pun
- `SUPABASE_SERVICE_ROLE_KEY` hanya untuk server-side operations

## Troubleshooting

### Error: Missing Supabase environment variables
- Pastikan file `.env.local` sudah dibuat
- Pastikan semua 3 variabel sudah diisi dengan benar
- Restart development server setelah mengubah .env.local

### Error: Invalid API key
- Pastikan Anda copy key yang benar dari Supabase dashboard
- Pastikan tidak ada spasi atau karakter tambahan
- Pastikan menggunakan `anon key` untuk `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Pastikan menggunakan `service_role key` untuk `SUPABASE_SERVICE_ROLE_KEY`



