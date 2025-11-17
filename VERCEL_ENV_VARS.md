# 📋 Environment Variables untuk Vercel

**URL Vercel Settings**: https://vercel.com/getmuris-projects/portofolio-next-js/settings/environment-variables

---

## 🔴 **CRITICAL - HARUS DITAMBAHKAN**

### 1. DATABASE_URL

```
Name: DATABASE_URL
Value: prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19yVGZPb1FncnBCTG1yZHRtTEFkUGoiLCJhcGlfa2V5IjoiMDFLOVhGMVZZWlhRV1hYMEtWQ1NOWllaRzMiLCJ0ZW5hbnRfaWQiOiI2MmJhY2ViYjMwNTg5MmVhM2Y4MDM5OGY1M2ZiN2M5ZGE5MGU0M2M3ZThiZjkxNmRjNDg0NGMxZjNhN2FhODZjIiwiaW50ZXJuYWxfc2VjcmV0IjoiYzQ0YmJkYWEtZDFjOS00NWQwLWFhODQtMWQ2YzA2MmVmNGZkIn0.1ycbRR_VskmAK5QZ5TcYP8H2Etn82vI9lm4YcjaHyKk
Environment: Production
```

### 2. ADMIN_SESSION_TOKEN

```
Name: ADMIN_SESSION_TOKEN
Value: secure-admin-token-2024
Environment: Production
```

### 3. BLOB_READ_WRITE_TOKEN

```
Name: BLOB_READ_WRITE_TOKEN
Value: vercel_blob_rw_4eEHiggcCs1MD0If_KbfkHtE4HRXCyAX8t94vEwBaixT3XS
Environment: Production
```

---

## 📝 **LANGKAH TAMBAH ENVIRONMENT VARIABLE**

1. **Buka Vercel Dashboard**:

   ```
   https://vercel.com/getmuris-projects/portofolio-next-js/settings/environment-variables
   ```

2. **Klik "Add New"** untuk setiap variable

3. **Copy-paste**:

   - **Name**: Copy dari atas
   - **Value**: Copy dari atas
   - **Environment**: Production
   - **Klik "Save"**

4. **Ulangi** untuk semua 3 variables

---

## ✅ **VERIFIKASI**

Setelah tambah semua variables:

```bash
# Redeploy untuk apply changes
vercel deploy --prod

# Atau push ke GitHub untuk auto-deploy
git push origin master
```

**Test setelah deploy**:

- ✅ Homepage: https://rifqysaputra.my.id
- ✅ Admin login: https://rifqysaputra.my.id/login
- ✅ File upload: Test di admin panel

---

## ⚠️ **PENTING**

**Tanpa environment variables ini, aplikasi TIDAK AKAN BEKERJA:**

- **DATABASE_URL** → Error: "Cannot fetch data from service"
- **ADMIN_SESSION_TOKEN** → Error: "Unauthorized" di admin routes
- **BLOB_READ_WRITE_TOKEN** → Error: Upload file gagal

---

## 🔄 **JIKA SUDAH ADA**

Jika variables sudah ada tapi salah value:

1. **Delete** yang lama
2. **Add** yang baru dengan value yang benar
3. **Redeploy**

---

**Status**: ⏳ Menunggu environment variables ditambahkan di Vercel
**Next**: Redeploy aplikasi setelah semua variables ditambahkan
