# CLAUDE.md

本文件提供 Claude Code（及其他 AI coding agent）在此專案中工作所需的背景資訊。

## 專案概覽

**ai-resources** 是一個純靜態網站資源庫，無需建置工具或套件管理器。所有頁面皆為獨立的 HTML 檔案，可直接在瀏覽器中開啟，亦可透過任何靜態檔案伺服器提供服務。

## 技術棧

- 純 HTML5 + CSS3 + 原生 JavaScript（無框架、無相依套件）
- 所有樣式採用 CSS Custom Properties（CSS 變數），色彩主題集中於 `:root` 區塊
- 互動功能（搜尋、3D 動畫等）均以原生 JS 實作

## 檔案說明

| 檔案 | 功能 |
|------|------|
| `index.html` | 主入口頁，導覽至所有子頁面 |
| `ai-services.html` | AI 服務快速連結頁 |
| `ai-models.html` | AI 模型指南（主流 LLM 特色、OpenRouter、挑選建議） |
| `graphify_guide.html` | Graphify 入門指南（AI 程式碼知識圖譜、安裝與使用教學） |
| `periodic_table.html` | 互動式元素週期表（含詳細元素資料） |
| `space/solar_system.html` | 太陽系互動視覺化（Canvas 2D，行星軌道 / 縮放 / 速度調整） |
| `space/galaxy.html` | 銀河系互動視覺化（程序生成旋臂、核球、太陽系定位標記） |
| `space/black_hole.html` | 黑洞結構與特色互動導覽（事件視界、奇點、時間膨脹、霍金輻射） |
| `space/rocket_physics.html` | 火箭與軌道物理互動指南（發射流程、逃逸速度、引力助推） |
| `space/modern_rockets.html` | 現代火箭構造與回收技術導覽 |
| `space/space_shuttle.html` | 太空梭構造與飛行任務流程導覽 |
| `space/star_lifecycle.html` | 恆星生命週期與分類互動導覽（光譜分類、太陽演化、代表性恆星） |
| `vim_cheat_sheet.html` | Vim 指令速查表，支援即時搜尋與分類篩選 |
| `tmux_cheat_sheet.html` | tmux 指令速查表 |
| `minicom_cheat_sheet.html` | minicom 指令速查表 |
| `5g_architecture.html` | 5G 網路架構互動圖（SBA、切片、介面說明） |
| `f1_engine_2026.html` | F1 2026 動力單元架構圖（ICE、MGU-K、永續燃料） |
| `ai-infrastructure.html` | AI 基礎設施生態系（伺服器、交換器、CPO、NVLink） |
| `power-industry.html` | 電源與能源產業分析頁面 |
| `taipei_mrt_map.html` | 台北捷運路網互動圖（包含營運中、興建中與規劃中路線） |
| `metro_knowledge.html` | 捷運系統知識庫（形式分類、技術規格、信號系統、知名廠商、世界著名系統） |
| `hbm_memory.html` | HBM 高頻寬記憶體完整解析（3D 堆疊、TSV、CoWoS、世代演進、vs 傳統記憶體比較） |
| `thermal-industry.html` | 散熱產業生態系（氣冷/液冷技術、AI 伺服器解熱、供應鏈廠商） |
| `ems-industry.html` | EMS 電子代工產業生態系導覽 |
| `shipping-industry.html` | 航運產業生態系與商業模式導覽 |
| `stock-valuation.html` | 投資評價工具（本益比、估值模型、成長性分析） |
| `gerd_guide.html` | 胃食道逆流完整指南（成因、症狀、治療策略） |
| `linux_kernel_overview.html` | Linux Kernel 架構與子系統全覽 |
| `brain_forgetting.html` | 人腦遺忘原理互動圖（艾賓豪斯曲線、神經機制、白熊效應） |
| `philippine_eagle.html` | 菲律賓鷹互動知識頁 |
| `whale_knowledge.html` | 鯨魚世界互動知識庫 |
| `dolphin.html` | 海豚互動知識頁 |
| `dinosaurs.html` | 恐龍百科互動知識頁 |
| `animal_eyes_iris.html` | 動物眼睛與虹膜科學知識頁 |
| `sonic_nos_guide.html` | SONiC 開源網路作業系統（容器化架構、SAI、AI 網路） |
| `README.md` | 專案說明與 AI 工具目錄清單 |

## 開發慣例

### 風格一致性
- 所有 HTML 頁面共用相同的深色主題設計語言（背景 `#0a0a0f`，強調色 `#7c6aff`）
- 新增頁面時，應沿用現有的 CSS 變數命名（`--bg`、`--surface`、`--accent` 等）
- 頁面語言屬性：繁體中文頁面使用 `lang="zh-Hant"`

### 無建置流程
- 不引入 npm、bundler 或任何外部建置工具
- 外部資源（字型、圖示）若需引入，優先使用 CDN，並考量離線可用性

### README 維護
- 新增 HTML 頁面時，同步更新 `README.md` 的「專案結構」表格
- AI 工具目錄的連結應定期驗證是否仍然有效

## 測試方式

直接在瀏覽器開啟 HTML 檔案即可測試；或使用簡易本地伺服器：

```bash
python3 -m http.server 8000
```

然後造訪 `http://localhost:8000` 驗證功能。

## 授權

本專案採用 [CC BY 4.0](LICENSE) 授權。
