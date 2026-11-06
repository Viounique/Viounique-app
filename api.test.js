// ฟังก์ชันจำลองการตรวจสอบความปลอดภัยของ API Endpoint
function validateApiRequest(endpoint, requestOptions) {
  const secureOnlyEndpoints = ['/api/admin/data', '/api/users/sensitive'];

  // 1. ตรวจสอบว่า Endpoint สำคัญต้องบังคับใช้ HTTPS หรือไม่
  if (secureOnlyEndpoints.includes(endpoint)) {
    if (!requestOptions.protocol || requestOptions.protocol !== 'https') {
      return { allowed: false, reason: 'Insecure protocol: ต้องใช้ HTTPS เท่านั้น' };
    }
  }

  // 2. ตรวจสอบว่าต้องมี Authentication Token แนบมาด้วยไหม
  if (endpoint.startsWith('/api/') && !endpoint.includes('/public/')) {
    if (!requestOptions.headers || !requestOptions.headers['Authorization']) {
      return { allowed: false, reason: 'Missing Authentication: ไม่พบ Token ยืนยันตัวตน' };
    }
  }

  return { allowed: true, reason: 'Request passed security validation' };
}

console.log("Running API Security Testing...");

// เทสต์เคสที่ 1: ทดสอบยิง API ข้อมูลลับโดยไม่ส่ง Token (ควรถูกบล็อก)
const test1 = validateApiRequest('/api/admin/data', { protocol: 'https', headers: {} });
if (test1.allowed === false) {
  console.log("✅ Test Passed: ระบบบล็อก API Request ที่ไม่มี Token สำเร็จ");
} else {
  console.error("❌ Test Failed: ช่องโหว่! API ยอมให้เข้าถึงข้อมูลโดยไม่ตรวจสอบสิทธิ์");
  process.exit(1);
}

// เทสต์เคสที่ 2: ทดสอบยิง API ผ่าน HTTP ธรรมดาแทนที่จะเป็น HTTPS (ควรถูกบล็อก)
const test2 = validateApiRequest('/api/admin/data', { protocol: 'http', headers: { 'Authorization': 'Bearer token123' } });
if (test2.allowed === false) {
  console.log("✅ Test Passed: ระบบบล็อกการเชื่อมต่อที่ไม่ปลอดภัยผ่าน HTTP สำเร็จ");
} else {
  console.error("❌ Test Failed: ช่องโหว่! ยอมรับการเชื่อมต่อที่ไม่เข้ารหัส (Non-HTTPS)");
  process.exit(1);
}

console.log("All API security checks passed successfully!");
