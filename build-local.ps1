$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
  & node node_modules/typescript/bin/tsc -b
  if ($LASTEXITCODE -ne 0) {
    throw 'Falha na verificação TypeScript.'
  }
  & './node_modules/@esbuild/win32-x64/esbuild.exe' src/main.tsx --bundle --outdir=dist/assets --loader:.woff2=file --loader:.woff=file --loader:.ttf=file --jsx=automatic --define:process.env.NODE_ENV='"production"' --minify
  if ($LASTEXITCODE -ne 0) {
    throw 'Falha na compilação.'
  }
  Copy-Item public/* dist -Recurse -Force
  (Get-Content index.html -Raw).Replace('<script type="module" src="/src/main.tsx"></script>', '<script type="module" src="/assets/main.js"></script><link rel="stylesheet" href="/assets/main.css"/>') | Set-Content dist/index.html -Encoding utf8
} finally {
  Pop-Location
}
