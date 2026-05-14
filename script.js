const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replacements
  const dict = [
    { from: /bg-\[\#09090b\]/g, to: "bg-white dark:bg-[#09090b]" },
    { from: /bg-\[\#18181b\]/g, to: "bg-zinc-50 dark:bg-[#18181b]" },
    { from: /bg-\[\#13101c\]/g, to: "bg-zinc-50 dark:bg-[#13101c]" },
    { from: /border-zinc-800/g, to: "border-zinc-200 dark:border-zinc-800" },
    { from: /text-zinc-400/g, to: "text-zinc-500 dark:text-zinc-400" },
    { from: /text-zinc-300/g, to: "text-zinc-600 dark:text-zinc-300" },
    { from: /text-zinc-100/g, to: "text-zinc-900 dark:text-zinc-100" },
    { from: /bg-zinc-800/g, to: "bg-zinc-200 dark:bg-zinc-800" },
    { from: /bg-zinc-700/g, to: "bg-zinc-300 dark:bg-zinc-700" },
  ];

  for (const {from, to} of dict) {
    content = content.replace(from, to);
  }

  // Handle specific text-white that are NOT in buttons (we'll assume anything that is just "text-white" that is text color for the page)
  // Actually, let's replace `text-white` with `text-zinc-900 dark:text-white` but ONLY if it's not followed by `fill-white` or inside an element that has `bg-[#8b5cf6]`.
  // This is too complex for regex. Let's just do it manually for text-white where needed, or replace it and fix the broken ones.
  // Actually, I'll just replace text-white with text-zinc-900 dark:text-white globally, AND THEN revert it for buttons.
  content = content.replace(/text-white/g, "text-zinc-900 dark:text-white");
  
  // Revert for known button classes and icons that need white
  content = content.replace(/text-zinc-900 dark:text-white fill-white/g, "text-white fill-white");
  content = content.replace(/text-zinc-900 dark:text-white/g, (match, offset, string) => {
    // If it's near bg-[#8b5cf6], it should be text-white
    const surrounding = string.substring(Math.max(0, offset - 100), Math.min(string.length, offset + 100));
    if (surrounding.includes("bg-[#8b5cf6]") || surrounding.includes("bg-[#8b5cf6]/") || surrounding.includes("text-[10px]") || surrounding.includes("text-white/80") || surrounding.includes("text-white/70") || surrounding.includes("bg-white/20") || surrounding.includes("bg-emerald-500")) {
      return "text-white";
    }
    return match;
  });

  // some specific reversions
  content = content.replace(/text-white\/80/g, "text-zinc-600 dark:text-white/80");
  content = content.replace(/text-white\/70/g, "text-zinc-500 dark:text-white/70");
  content = content.replace(/bg-white\/20/g, "bg-black/10 dark:bg-white/20");
  content = content.replace(/bg-white\/30/g, "bg-black/20 dark:bg-white/30");
  content = content.replace(/hover:bg-white\/10/g, "hover:bg-black/5 dark:hover:bg-white/10");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir('./components');
walkDir('./app');
