// 导入样式
import 'element-plus/dist/index.css'
import './styles/index.css'
import './styles/scrollbar.css'
import './styles/common.css'

// Components
export { default as ToastUI } from './components/Toast.vue'
export { default as ModelManagerUI } from './components/ModelManager.vue'
export { default as OutputPanelUI } from './components/OutputPanel.vue'
export { default as PromptPanelUI } from './components/PromptPanel.vue'
export { default as TemplateManagerUI } from './components/TemplateManager.vue'
export { default as TemplateSelectUI } from './components/TemplateSelect.vue'
export { default as ModelSelectUI } from './components/ModelSelect.vue'
export { default as HistoryDrawerUI } from './components/HistoryDrawer.vue'
export { default as InputPanelUI } from './components/InputPanel.vue'
export { default as MainLayoutUI } from './components/MainLayout.vue'
export { default as ContentCardUI } from './components/ContentCard.vue'
export { default as ActionButtonUI } from './components/ActionButton.vue'

// 导出指令
export { clickOutside } from './directives/clickOutside'

// 导出 composables
export * from './composables'

// 从core重新导出需要的内容
export {
    templateManager,
    modelManager,
    historyManager,
    createLLMService,
    createPromptService
} from '@prompt-optimizer/core'

// 导出服务
export * from './services'
  