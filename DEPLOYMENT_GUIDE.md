# 🚀 Panduan Deployment ke Vercel

## ✅ Langkah-Langkah Deploy

### 1. Persiapan Supabase

Sebelum deploy, Anda perlu menyiapkan database Supabase:

1. **Buat Akun Supabase**
   - Kunjungi https://app.supabase.com
   - Daftar atau login dengan akun GitHub/Google

2. **Buat Project Baru**
   - Klik "New Project"
   - Pilih organization
   - Beri nama project (contoh: `smk-ype-class-fund`)
   - Pilih region terdekat (Singapore untuk Indonesia)
   - Buat password database yang kuat
   - Tunggu ~2 menit sampai project siap

3. **Dapatkan API Credentials**
   - Buka project Anda
   - Klik **Settings** (ikon gear) → **API**
   - Copy 3 nilai ini:
     - `Project URL` (contoh: https://abcdefg.supabase.co)
     - `anon/public key` (key yang panjang untuk public)
     - `service_role key` (key untuk server-side)

4. **Setup Database Schema**
   - Buka **SQL Editor** di Supabase
   - Copy isi file `supabase/schema.sql` dari project ini
   - Paste dan jalankan SQL tersebut
   - Atau jalankan script: `node scripts/seed-database.js` (perlu env vars)

### 2. Deploy ke Vercel

#### Opsi A: Deploy via GitHub (Recommended)

1. **Push Code ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

2. **Import ke Vercel**
   - Login ke https://vercel.com
   - Klik **"Add New Project"**
   - Import repository GitHub Anda
   - Vercel akan auto-detect Next.js

3. **Configure Environment Variables**
   
   Sebelum deploy, tambahkan environment variables:
   
   - Klik **"Environment Variables"**
   - Tambahkan 3 variables berikut:
   
   | Key | Value | Environment |
   |-----|-------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | URL dari Supabase | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key dari Supabase | Production, Preview, Development |
   | `SUPABASE_SERVICE_ROLE_KEY` | Service role key dari Supabase | Production, Preview, Development |

4. **Deploy!**
   - Klik **"Deploy"**
   - Tunggu ~2-3 menit
   - Aplikasi Anda live! 🎉

#### Opsi B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   ```

5. **Redeploy**
   ```bash
   vercel --prod
   ```

### 3. Verifikasi Deployment

1. **Buka URL Vercel**
   - Vercel akan memberikan URL (contoh: `your-app.vercel.app`)
   
2. **Test Aplikasi**
   - Halaman utama harus load
   - Coba login (setelah buat user di Supabase)
   - Test fitur tambah siswa dan pengeluaran

3. **Check Logs**
   - Jika ada error, cek di Vercel Dashboard → Functions → Logs
   - Atau gunakan: `vercel logs`

### 4. Custom Domain (Opsional)

1. **Tambah Domain**
   - Vercel Dashboard → Settings → Domains
   - Tambahkan domain Anda
   - Update DNS records sesuai instruksi

2. **SSL Certificate**
   - Vercel auto-setup SSL/HTTPS gratis

## 🐛 Troubleshooting

### Error: "Database not configured"

**Penyebab:** Environment variables belum diset

**Solusi:**
1. Cek Vercel Dashboard → Settings → Environment Variables
2. Pastikan ketiga variables ada dan valuenya benar
3. Redeploy: Deployments → kebab menu (⋯) → Redeploy

### Error: "Missing Supabase environment variables"

**Penyebab:** .env.local tidak ada atau kosong

**Solusi:**
1. Vercel tidak membaca `.env.local`
2. Harus set via Vercel Dashboard (langkah 2.3 di atas)

### Build Error: "Module not found"

**Penyebab:** Dependencies tidak terinstall

**Solusi:**
```bash
npm install
# atau
pnpm install
```

### Error 503 pada API Routes

**Penyebab:** Supabase credentials salah atau expired

**Solusi:**
1. Verify credentials di Supabase Dashboard
2. Regenerate jika perlu
3. Update di Vercel Environment Variables
4. Redeploy

## 📋 Database Schema Required

Pastikan Supabase database Anda memiliki tabel berikut:

```sql
-- users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT CHECK (role IN ('bendahara', 'guru')),
  assigned_class TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  nis TEXT UNIQUE NOT NULL,
  class TEXT NOT NULL,
  has_paid BOOLEAN DEFAULT FALSE,
  last_payment DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- expenses table
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_name TEXT NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- class_settings table
CREATE TABLE class_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_name TEXT UNIQUE NOT NULL,
  initial_fund DECIMAL(10,2) DEFAULT 0,
  current_fund DECIMAL(10,2) DEFAULT 0,
  total_expenses DECIMAL(10,2) DEFAULT 0,
  total_weekly_fee DECIMAL(10,2) DEFAULT 0,
  student_count INTEGER DEFAULT 0,
  weekly_fee_per_student DECIMAL(10,2) DEFAULT 5000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- payment_history table
CREATE TABLE payment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔒 Security Checklist

- [ ] Service Role Key hanya untuk Production (jangan di git)
- [ ] Enable Row Level Security (RLS) di Supabase
- [ ] Set proper CORS policies
- [ ] Rate limiting pada API routes (opsional)
- [ ] Use HTTPS only (Vercel default)

## 📞 Support

Jika masih ada masalah:

1. Check Vercel Logs: `vercel logs`
2. Check Supabase Logs: Dashboard → Logs
3. Review file `SUPABASE_SETUP.md` untuk database setup
4. Review file `ENV_SETUP.md` untuk environment variables

---

**Good luck! 🚀**
