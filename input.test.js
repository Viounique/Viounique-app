// ฟังก์ชันจำลองการตรวจสอบและกรองข้อมูล (Sanitization) ป้องกัน XSS
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  // แทนที่เครื่องหมายพิเศษเพื่อป้องกันสคริปต์ฝังตัว (XSS)
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/script/gi, "");
}

console.log("Running Input Validation & Sanitization Tests...");

// เทสต์เคสที่ 1: ตรวจสอบการบล็อกสคริปต์อันตราย (XSS Injection)
const maliciousInput = "<script>alert('hack')</script>";
const sanitized = sanitizeInput(maliciousInput);

if (!sanitized.includes("<script>") && !sanitized.includes("script")) {
  console.log("✅ Test Passed: ระบบสามารถกรองโค้ดสคริปต์อันตรายออกได้อย่างปลอดภัย");
} else {
  console.error("❌ Test Failed: ช่องโหว่! ระบบปล่อยให้สคริปต์อันตรายหลุดรอดเข้ามาได้");
  process.exit(1);
}

console.log("All input validation security checks passed successfully!");
