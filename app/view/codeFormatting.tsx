export function formatJavaScript(code: string): string {
    // 'undefined' looks nicer than 'void 0'
    code = code.replace('void 0', 'undefined');
    // Remove gap before backtick in: yield HTML `<h1>Hello!</h1>`;
    code = code.replace(/(\w)\s+(`)/g, "$1$2");
    // Replace Link3(…) with Link(…)
    code = code.replace(/Link\d/g, "Link");
    return code;
}
