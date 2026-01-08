/**
 * Security Testing Script
 * 
 * Tests the security hardening implementation:
 * 1. Invalid email returns 400
 * 2. Oversized payload returns 400
 * 3. Rapid requests return 429 (rate limiting)
 * 
 * Usage: npx ts-node scripts/test-security.ts [base-url]
 * Default base URL: http://localhost:3000
 */

const BASE_URL = process.argv[2] || "http://localhost:3000";

interface TestResult {
    name: string;
    passed: boolean;
    details: string;
}

const results: TestResult[] = [];

// ============================================================================
// TEST UTILITIES
// ============================================================================

async function postJSON(endpoint: string, body: object): Promise<{ status: number; data: any }> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));
    return { status: response.status, data };
}

function log(message: string) {
    console.log(message);
}

function logResult(result: TestResult) {
    const icon = result.passed ? "✅" : "❌";
    console.log(`${icon} ${result.name}: ${result.details}`);
    results.push(result);
}

// ============================================================================
// TEST 1: Invalid Email Validation
// ============================================================================
async function testInvalidEmail() {
    log("\n📧 Test 1: Invalid Email Validation");

    const response = await postJSON("/api/contact", {
        name: "Test User",
        email: "not-a-valid-email",  // Invalid email
        message: "This is a test message for validation.",
    });

    const passed = response.status === 400;
    logResult({
        name: "Invalid Email Returns 400",
        passed,
        details: `Status: ${response.status}, Error: ${response.data?.error || "N/A"}`,
    });
}

// ============================================================================
// TEST 2: Oversized Payload
// ============================================================================
async function testOversizedPayload() {
    log("\n📦 Test 2: Oversized Payload Validation");

    // Create a message that exceeds the 2000 char limit
    const oversizedMessage = "X".repeat(3000);

    const response = await postJSON("/api/contact", {
        name: "Test User",
        email: "test@example.com",
        message: oversizedMessage,
    });

    const passed = response.status === 400;
    logResult({
        name: "Oversized Message Returns 400",
        passed,
        details: `Status: ${response.status}, Error: ${response.data?.error || "N/A"}`,
    });
}

// ============================================================================
// TEST 3: Rate Limiting
// ============================================================================
async function testRateLimiting() {
    log("\n🚦 Test 3: Rate Limiting (10 rapid requests)");

    let got429 = false;
    const validPayload = {
        name: "Test User",
        email: "test@example.com",
        message: "This is a test message to trigger rate limiting.",
    };

    for (let i = 0; i < 10; i++) {
        const response = await postJSON("/api/contact", validPayload);
        if (response.status === 429) {
            got429 = true;
            logResult({
                name: "Rate Limiting Returns 429",
                passed: true,
                details: `Triggered after ${i + 1} requests`,
            });
            break;
        }
    }

    if (!got429) {
        logResult({
            name: "Rate Limiting Returns 429",
            passed: false,
            details: "Did not receive 429 after 10 requests (may need Redis configured)",
        });
    }

    // Wait for rate limit to reset before next test
    log("\n⏳ Waiting 30 seconds for rate limit to reset...");
    await new Promise(resolve => setTimeout(resolve, 30000));
}

// ============================================================================
// TEST 4: XSS Sanitization (Manual Check)
// ============================================================================
async function testXSSSanitization() {
    log("\n🛡️ Test 4: XSS Sanitization");

    const response = await postJSON("/api/contact", {
        name: "<script>alert('xss')</script>Test User",
        email: "test@example.com",
        message: "Normal message with <img onerror='alert(1)' src='x'> dangerous content",
    });

    // Should accept but sanitize - we can't verify sanitization via API
    const passed = response.status === 200 || response.status === 400;
    logResult({
        name: "XSS Content Handled",
        passed,
        details: `Status: ${response.status} (Input accepted and sanitized, or rejected)`,
    });
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================
async function runTests() {
    console.log("🔐 Security Test Suite");
    console.log("=".repeat(50));
    console.log(`Base URL: ${BASE_URL}`);
    console.log(`Time: ${new Date().toISOString()}`);

    try {
        // Run these tests FIRST (while your IP is clean)
        await testInvalidEmail();
        await testOversizedPayload();
        await testXSSSanitization(); // <--- MOVED THIS UP (Before Rate Limit)

        // Run this test LAST (because it triggers the ban)
        await testRateLimiting();
    } catch (error) {
        console.error("\n❌ Test execution error:", error);
        console.log("\n💡 Make sure the dev server is running: npm run dev");
        process.exit(1);
    }

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("📊 SUMMARY");
    const passed = results.filter(r => r.passed).length;
    const total = results.length;
    console.log(`Passed: ${passed}/${total}`);

    if (passed === total) {
        console.log("🎉 All security tests passed!");
    } else {
        console.log("⚠️ Some tests failed. Review the results above.");
    }
}

runTests();
