// =====================================================================
// PURPLE PROGRAMMING — SHARED CHECKER HELPERS
// Small, reusable helpers for grading student code submitted in the
// quest textareas. These are intentionally lenient about *how* a
// student writes correct code (spacing, quote style, combining
// variables into one print(), f-strings, etc.) while still requiring
// that the actual required ingredient is present somewhere.
// =====================================================================

// True if `varName` is assigned a value somewhere in `code`.
// - Ignores comparisons (==, !=, >=, <=) so `age == 5` doesn't count.
// - Matches the variable as a whole word, so "name" won't match inside
//   "first_name".
// - Allows any amount of whitespace around the "=".
function hasAssignment(code, varName) {
    const re = new RegExp(
        "\\b" + varName + "\\b\\s*(?:[:][^=\\n]*)?=(?!=)"
    );
    return re.test(code);
}

// True if `varName` is used inside ANY print(...) call in `code` —
// whether it's the only thing printed, combined with other variables
// separated by commas, concatenated with +, or interpolated inside an
// f-string / .format() call. This accepts every reasonable way a
// student could correctly print a variable's value.
function printsVar(code, varName) {
    const re = new RegExp("print\\s*\\([^\\n]*\\b" + varName + "\\b[^\\n]*\\)");
    return re.test(code);
}

// Counts how many times a raw pattern (string or RegExp with a global
// flag) occurs in `code`. Useful for "called at least twice" checks.
function countMatches(code, pattern) {
    const re = typeof pattern === "string" ? new RegExp(pattern, "g") : pattern;
    return (code.match(re) || []).length;
}
