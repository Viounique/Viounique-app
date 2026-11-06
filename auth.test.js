// จำลองฟังก์ชันตรวจสอบสิทธิ์การเข้าถึงหน้าแอดมิน
function checkAccessPermission(userRole, targetPage) {
  const adminPages = ['/admin/dashboard', '/admin/settings', '/coordinator/manage'];
  
  if (adminPages.includes(targetPage)) {
    return userRole === 'admin' || userRole === 'coordinator';
  }
  return true; // ผู้ใช้ทั่วไปเข้าหน้าอื่นได้ปกติ
}

// ชุดทดสอบสิทธิ์ (Authorization Test Suite)
console.log("Running Authorization & Authentication Tests...");

const test1 = checkAccessPermission('user', '/admin/dashboard');
if (test1 === false) {
  console.log(" Test Passed: ผู้ใช้งานทั่วไป (user) ถูกปฏิเสธการเข้าถึงหน้าแอดมิน");
} else {
  console.error(" Test Failed: ช่องโหว่! ผู้ใช้งานทั่วไปเข้าถึงหน้าแอดมินได้");
  process.exit(1);
}

const test2 = checkAccessPermission('admin', '/admin/dashboard');
if (test2 === true) {
  console.log("Test Passed: ผู้ดูแลระบบ (admin) สามารถเข้าถึงหน้าแอดมินได้");
} else {
  console.error(" Test Failed: แอดมินเข้าหน้าตัวเองไม่ได้");
  process.exit(1);
}

console.log("All authorization security checks passed successfully!");
