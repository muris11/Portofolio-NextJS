# Admin Panel Test Suite

File test komprehensif untuk memverifikasi semua fungsionalitas admin panel portfolio ketika sudah di-hosting di Vercel.

## Cara Menggunakan

### 1. Jalankan Test via API

```
GET /api/admin/test
```

Endpoint ini akan menjalankan semua test dan memberikan hasil detail dalam format JSON.

### 2. Lihat Hasil Test via Web Interface

```
GET /admin/test
```

Interface web yang user-friendly untuk melihat hasil test dengan visual yang jelas.

### 3. Lihat Informasi Test

```
GET /api/admin/test/info
```

Endpoint untuk mendapatkan informasi tentang test suite yang tersedia.

## Test yang Dilakukan

### ✅ Database Connection

- Memverifikasi koneksi ke database PostgreSQL/Accelerate
- Menguji query dasar untuk memastikan database berfungsi

### ✅ Environment Variables

- Memeriksa semua environment variables yang diperlukan
- DATABASE_URL, ADMIN_SESSION_TOKEN, NODE_ENV

### ✅ Vercel Blob Configuration

- Menguji konfigurasi Vercel Blob untuk file upload
- Test upload file kecil untuk verifikasi

### ✅ Authentication API

- Test endpoint authentication admin
- Verifikasi response API auth

### ✅ Profile CRUD Operations

- Test GET, PUT untuk profile admin
- Verifikasi create/update profile

### ✅ Projects CRUD Operations

- Test GET, POST, PUT, DELETE untuk projects
- Termasuk test dengan file upload

### ✅ Skills CRUD Operations

- Test CRUD lengkap untuk skills
- Create, read, update, delete

### ✅ Education CRUD Operations

- Test CRUD untuk education background
- Verifikasi semua operasi database

### ✅ Experience CRUD Operations

- Test CRUD untuk work experience
- Validasi data experience

### ✅ Messages API

- Test contact form submission
- Verifikasi message storage dan retrieval

### ✅ Cache Revalidation

- Test Next.js cache revalidation
- Pastikan data ter-update di frontend

### ✅ File Upload Integration

- Test upload file dengan Vercel Blob
- Verifikasi file storage dan URL generation

## Cara Membaca Hasil Test

### Status Test:

- **PASS** 🟢: Test berhasil
- **FAIL** 🔴: Test gagal dengan error
- **SKIP** 🟡: Test dilewati (biasanya karena konfigurasi belum lengkap)

### Environment Check:

- **Database**: Apakah DATABASE_URL sudah dikonfigurasi
- **Blob Token**: Apakah BLOB_READ_WRITE_TOKEN sudah ada
- **Admin Token**: Apakah ADMIN_SESSION_TOKEN sudah di-set

## Troubleshooting

### Jika Test FAIL:

1. **Database Connection FAIL**

   - Periksa DATABASE_URL di environment variables Vercel
   - Pastikan database PostgreSQL/Accelerate aktif

2. **Blob Configuration FAIL**

   - Setup BLOB_READ_WRITE_TOKEN di Vercel
   - Pastikan Vercel Blob storage aktif

3. **Authentication FAIL**

   - Periksa ADMIN_SESSION_TOKEN
   - Verifikasi middleware authentication

4. **CRUD Operations FAIL**

   - Check database schema dengan Prisma
   - Periksa API routes untuk error handling

5. **File Upload FAIL**
   - Pastikan Vercel Blob ter-setup dengan benar
   - Check file size limits dan format

### Monitoring di Vercel:

1. Buka **Vercel Dashboard** → **Functions** → **Logs**
2. Cari log dari `/api/admin/test`
3. Lihat detailed error messages dan stack traces

### Debug Steps:

1. Jalankan test di local development dulu
2. Bandingkan hasil dengan production
3. Check Vercel function logs untuk error details
4. Verify semua environment variables

## Contoh Output

```json
{
  "timestamp": "2025-11-17T10:30:00.000Z",
  "environment": {
    "node_env": "production",
    "vercel_env": "production",
    "vercel_url": "https://rifqysaputra.my.id",
    "has_blob_token": true,
    "has_database_url": true,
    "has_admin_token": true
  },
  "summary": {
    "total": 12,
    "passed": 10,
    "failed": 1,
    "skipped": 1,
    "success_rate": "90.9%"
  },
  "results": [
    {
      "test": "Database Connection",
      "status": "PASS",
      "message": "Test passed successfully",
      "duration": 150
    },
    {
      "test": "Projects CRUD Operations",
      "status": "FAIL",
      "message": "Projects PUT failed: 500 - Internal Server Error",
      "details": {...},
      "duration": 2500
    }
  ],
  "total_duration": 8500
}
```

## Tips Penggunaan

1. **Jalankan test setelah deploy** untuk memastikan semua berfungsi
2. **Check logs Vercel** untuk error details yang tidak terlihat di web interface
3. **Monitor secara berkala** untuk memastikan stability
4. **Gunakan untuk debugging** ketika ada issue di production

## File yang Dibuat

- `/api/admin/test/route.ts` - Main test suite
- `/api/admin/test/info/route.ts` - Test information endpoint
- `/admin/test/page.tsx` - Web interface untuk test results
- `TEST_README.md` - Dokumentasi ini
