#!/usr/bin/env node

/**
 * NexLed Compliance Auditor
 * Checks HTML files for NexLed Design System compliance.
 *
 * Usage: node scripts/audit-compliance.js <file.html> [file2.html ...]
 * Example: node scripts/audit-compliance.js index.html atoms.html
 */

const fs = require('fs');
const path = require('path');

const VIOLATIONS = {
    STYLE_BLOCK: 'STYLE_BLOCK',
    INLINE_STYLE: 'INLINE_STYLE',
    ARBITRARY_TAILWIND: 'ARBITRARY_TAILWIND',
    HARDCODED_HEX: 'HARDCODED_HEX',
    MISSING_CDN_CONFIG: 'MISSING_CDN_CONFIG',
    MISSING_CDN_CSS: 'MISSING_CDN_CSS',
    MISSING_TAILWIND: 'MISSING_TAILWIND',
    MISSING_FONTS: 'MISSING_FONTS',
    WRONG_HEAD_ORDER: 'WRONG_HEAD_ORDER',
};

function auditFile(filePath) {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
        console.error(`File not found: ${absolutePath}`);
        return null;
    }

    const content = fs.readFileSync(absolutePath, 'utf-8');
    const lines = content.split('\n');
    const violations = [];

    lines.forEach((line, index) => {
        const lineNum = index + 1;

        // Check for <style> blocks (not inside comments or <pre> tags)
        if (/<style[\s>]/i.test(line) && !line.trim().startsWith('<!--') && !line.trim().startsWith('*')) {
            violations.push({
                type: VIOLATIONS.STYLE_BLOCK,
                line: lineNum,
                severity: 'CRITICAL',
                message: '<style> block found — all styling must come from nexled.css',
                content: line.trim(),
            });
        }

        // Check for inline style="" attributes (skip SVG elements)
        if (/\sstyle\s*=/i.test(line) && !/<svg/i.test(line) && !/<path/i.test(line) && !/<circle/i.test(line)) {
            violations.push({
                type: VIOLATIONS.INLINE_STYLE,
                line: lineNum,
                severity: 'CRITICAL',
                message: 'Inline style="" attribute found — use NexLed classes instead',
                content: line.trim(),
            });
        }

        // Check for arbitrary Tailwind values (e.g., w-[320px], text-[#fff], bg-[red])
        // Match class attributes containing square-bracket values
        const arbitraryMatch = line.match(/class="[^"]*\b\w+-\[[^\]]+\][^"]*"/g);
        if (arbitraryMatch) {
            // Filter out legitimate uses (e.g., aria attributes that look similar)
            arbitraryMatch.forEach(match => {
                // Extract the arbitrary values
                const arbitraries = match.match(/\b[\w-]+-\[[^\]]+\]/g);
                if (arbitraries) {
                    arbitraries.forEach(arb => {
                        violations.push({
                            type: VIOLATIONS.ARBITRARY_TAILWIND,
                            line: lineNum,
                            severity: 'HIGH',
                            message: `Arbitrary Tailwind value "${arb}" — use a config-cdn.js token instead`,
                            content: line.trim(),
                        });
                    });
                }
            });
        }

        // Check for hardcoded hex colors in class attributes
        const hexInClass = line.match(/class="[^"]*#[0-9a-fA-F]{3,8}[^"]*"/g);
        if (hexInClass) {
            violations.push({
                type: VIOLATIONS.HARDCODED_HEX,
                line: lineNum,
                severity: 'HIGH',
                message: 'Hardcoded hex color in class attribute — use NexLed color token names',
                content: line.trim(),
            });
        }
    });

    // Check <head> block for required elements
    const headMatch = content.match(/<head[\s\S]*?<\/head>/i);
    if (headMatch) {
        const head = headMatch[0];

        if (!head.includes('cdn.tailwindcss.com')) {
            violations.push({
                type: VIOLATIONS.MISSING_TAILWIND,
                line: 0,
                severity: 'CRITICAL',
                message: 'Tailwind CDN script not found in <head>',
                content: '',
            });
        }

        if (!head.includes('config-cdn.js')) {
            violations.push({
                type: VIOLATIONS.MISSING_CDN_CONFIG,
                line: 0,
                severity: 'CRITICAL',
                message: 'config-cdn.js not found in <head> — NexLed tokens will not load',
                content: '',
            });
        }

        if (!head.includes('nexled.css')) {
            violations.push({
                type: VIOLATIONS.MISSING_CDN_CSS,
                line: 0,
                severity: 'CRITICAL',
                message: 'nexled.css not found in <head> — NexLed components will not load',
                content: '',
            });
        }

        if (!head.includes('fonts.googleapis.com') || !head.includes('Urbanist')) {
            violations.push({
                type: VIOLATIONS.MISSING_FONTS,
                line: 0,
                severity: 'MEDIUM',
                message: 'Urbanist font from Google Fonts not found in <head>',
                content: '',
            });
        }

        // Check order: Tailwind must come before config-cdn.js
        const tailwindPos = head.indexOf('cdn.tailwindcss.com');
        const configPos = head.indexOf('config-cdn.js');
        const cssPos = head.indexOf('nexled.css');

        if (tailwindPos > -1 && configPos > -1 && tailwindPos > configPos) {
            violations.push({
                type: VIOLATIONS.WRONG_HEAD_ORDER,
                line: 0,
                severity: 'HIGH',
                message: 'Tailwind CDN must load BEFORE config-cdn.js',
                content: '',
            });
        }

        if (configPos > -1 && cssPos > -1 && configPos > cssPos) {
            violations.push({
                type: VIOLATIONS.WRONG_HEAD_ORDER,
                line: 0,
                severity: 'HIGH',
                message: 'config-cdn.js must load BEFORE nexled.css',
                content: '',
            });
        }
    }

    return {
        file: filePath,
        violations,
        passed: violations.length === 0,
    };
}

// CLI entry point
const files = process.argv.slice(2);

if (files.length === 0) {
    console.log('NexLed Compliance Auditor');
    console.log('========================');
    console.log('Usage: node scripts/audit-compliance.js <file.html> [file2.html ...]');
    console.log('');
    console.log('Checks:');
    console.log('  - No <style> blocks');
    console.log('  - No inline style="" attributes');
    console.log('  - No arbitrary Tailwind values (e.g., w-[320px])');
    console.log('  - No hardcoded hex colors in class attributes');
    console.log('  - Required <head> block elements present and in order');
    process.exit(0);
}

let totalViolations = 0;

files.forEach(file => {
    const result = auditFile(file);
    if (!result) return;

    console.log('');
    if (result.passed) {
        console.log(`PASS  ${result.file}`);
    } else {
        console.log(`FAIL  ${result.file}  (${result.violations.length} violation${result.violations.length > 1 ? 's' : ''})`);
        result.violations.forEach(v => {
            const lineInfo = v.line > 0 ? `:${v.line}` : '';
            console.log(`  [${v.severity}] ${v.type}${lineInfo}`);
            console.log(`    ${v.message}`);
            if (v.content) {
                console.log(`    > ${v.content.substring(0, 120)}${v.content.length > 120 ? '...' : ''}`);
            }
        });
        totalViolations += result.violations.length;
    }
});

console.log('');
console.log('---');
if (totalViolations === 0) {
    console.log(`All ${files.length} file(s) passed compliance checks.`);
} else {
    console.log(`${totalViolations} total violation(s) found across ${files.length} file(s).`);
}

process.exit(totalViolations > 0 ? 1 : 0);
