'use client'

// O antd 5 foi feito para React 18; o patch ajusta o render interno (modais, mensagens, efeito
// de onda dos botões) para o React 19 que o App Router do Next 16 usa.
import '@ant-design/v5-patch-for-react-19'

const AntdReact19Patch = () => null

export default AntdReact19Patch
