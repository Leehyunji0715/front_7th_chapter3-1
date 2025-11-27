import StyleDictionary from 'style-dictionary';
import fs from 'fs';

// 유틸리티 함수들
const toKebabCase = str =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const createVariableName = path => {
  const cleanPath = path.filter(part => part !== 'light' && part !== 'dark');
  const kebabPath = cleanPath.map(toKebabCase);
  return `--${kebabPath.join('-')}`;
};

// 커스텀 포맷: 깔끔한 CSS 변수
StyleDictionary.registerFormat({
  name: 'css/clean-variables',
  format: ({ dictionary, options }) => {
    const selector = options.selector || ':root';
    let css = `${selector} {\n`;

    dictionary.allTokens.forEach(token => {
      const variableName = createVariableName(token.path);
      css += `  ${variableName}: ${token.value};\n`;
    });

    css += '}\n';
    return css;
  },
});

const config = {
  source: [
    'src/tokens/palette.json',
    'src/tokens/semantic.json',
    'src/tokens/components/stats-card.json',
    'src/tokens/components/badge.json',
    'src/tokens/components/button.json',
    'src/tokens/components/alert.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'semantic-light.css',
          format: 'css/clean-variables',
          filter: token => token.path.includes('light'),
          options: {
            selector: ':root',
          },
        },
        {
          destination: 'semantic-dark.css',
          format: 'css/clean-variables',
          filter: token => token.path.includes('dark'),
          options: {
            selector: '[data-theme="dark"]',
          },
        },
        {
          destination: 'component-tokens.css',
          format: 'css/variables',
          filter: token =>
            token.filePath.includes('stats-card.json') ||
            token.filePath.includes('badge.json'),
        },
      ],
    },
  },
};

// components.css 업데이트 함수
const updateComponentsCSS = () => {
  const componentsPath = 'src/styles/components.css';
  const tokenImports = [
    `@import './semantic-light.css';`,
    `@import './semantic-dark.css';`,
    `@import './component-tokens.css';`,
  ];

  // 기존 토큰 import 패턴들
  const tokenImportPatterns = [
    /@import.*semantic.*\.css.*;\n?/g,
    /@import.*component-tokens.*\.css.*;\n?/g,
    /@import.*stats-card-tokens.*\.css.*;\n?/g,
    /@import.*badge-tokens.*\.css.*;\n?/g,
    /@import.*stats-card\.css.*;\n?/g,
  ];

  // 파일 읽기
  let content = fs.existsSync(componentsPath)
    ? fs.readFileSync(componentsPath, 'utf8')
    : '';

  // 기존 토큰 import 제거
  tokenImportPatterns.forEach(pattern => {
    content = content.replace(pattern, '');
  });

  // 새 import 추가
  if (content.includes("@import 'tailwindcss';")) {
    content = content.replace(
      "@import 'tailwindcss';",
      `@import 'tailwindcss';\n${tokenImports.join('\n')}`
    );
  } else {
    content = `${tokenImports.join('\n')}\n${content}`;
  }

  // 파일 저장
  fs.writeFileSync(componentsPath, content);

  console.log('✅ components.css updated with token imports!');
  console.log('📋 Added imports:');
  tokenImports.forEach(imp => console.log(`   ${imp}`));
};

// 메인 실행
const main = async () => {
  const sd = new StyleDictionary(config);
  sd.log.verbosity = 'verbose';
  await sd.buildAllPlatforms();

  console.log('📦 Updating components.css...');
  updateComponentsCSS();
};

main().catch(console.error);
