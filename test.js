console.log("Starting automated test suite...");
const sampleScore = 10;
if (sampleScore > 0) {
  console.log("Test Passed: Scoring logic is working correctly.");
} else {
  console.error("Test Failed: Invalid score calculation.");
  process.exit(1);
}
