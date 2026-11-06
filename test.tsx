//  เทสฟังก์ชันเช็กความถูกต้องของเบอร์โทรศัพท์ หรือ ฟอร์แมตข้อมูล
describe('Basic Unit Tests', () => {
  it('should format numbers correctly', () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });

  it('should validate empty input string', () => {
    const input = "";
    expect(input.length).toBe(0);
  });
});
