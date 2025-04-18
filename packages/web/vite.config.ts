import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import path from 'path'

const appName = 'promptOptimizerWeb'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量（从项目根目录加载）
  const env = loadEnv(mode, resolve(process.cwd(), '../../'))

  return {
    base: process.env.NODE_ENV === 'production' ? `/${appName}/` : '/',
    plugins: [
        vue()
    ],
    server: {
      port: 18181,
      host: true,
      fs: {
        // 允许为工作区依赖提供服务
        allow: ['..']
      },
      hmr: true,
      watch: {
        // 确保监视monorepo中其他包的变化
        ignored: ['!**/node_modules/@prompt-optimizer/**']
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        }
      },
      lib: {
        entry: path.resolve(__dirname, './src/main.js'),
        name: appName,
        formats: ['umd']
      },
      outDir: path.resolve(__dirname, `./${appName}`),
    },
    publicDir: 'public',

    resolve: {
      preserveSymlinks: true,
      alias: {
        '@': resolve(__dirname, 'src'),
        '@prompt-optimizer/core': path.resolve(__dirname, '../core'),
        '@prompt-optimizer/ui': path.resolve(__dirname, '../ui'),
        '@prompt-optimizer/web': path.resolve(__dirname, '../web'),
        '@prompt-optimizer/extension': path.resolve(__dirname, '../extension'),
      }
    },
    optimizeDeps: {
      // 预构建依赖
      include: ['element-plus'],
    },
    define: {
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        ...Object.keys(env).reduce((acc, key) => {
          acc[key] = env[key];
          return acc;
        }, {})
      },
      __LIBRARY_NAME__: JSON.stringify(appName)
    }
  }
})