import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextVitals,
  {
    // Regras novas do React Compiler (eslint-plugin-react-hooks 7); o código existente
    // ainda não segue esses padrões, então ficam como aviso até a refatoração.
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'cors-proxy.js'],
  },
]

export default eslintConfig
