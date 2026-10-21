# Belle Clinic 旧网站资料整理（网站改版用）

- 来源：https://mybelleclinic.com/ ，抓取日期 2026-10-21
- 工具：Apify `apify/website-content-crawler`（cheerio 模式），共 31 页，0 失败，费用约 US$0.0007
- Run: https://console.apify.com/actors/runs/bL8LIDyX2cuT9mw7e · Dataset: https://console.apify.com/storage/datasets/5raHDVqmHTfLZrrmo

> ⚠️ 以下内容只代表旧网站上的现有资料，不代表最新事实。价格、资历、疗程都需要你确认后才能用在新网站。没有来源的内容一律没有补写。

## 文件清单

| 文件 | 内容 |
|---|---|
| `treatments.csv` | 现有治疗清单（15 项）：名称、URL、标题、介绍、子项目、网站上写的价格、图片、问题标记 |
| `categories.csv` | 现有分类清单（10 项）：名称、URL、介绍、列出的问题、链接的治疗、图片、问题标记 |
| `images.csv` | 图片及支持材料清单（38 张）：图片 URL、alt、用途、出现在哪些页面 |
| `pages-main-content.txt` | 每页正文（已去重），方便直接复制文案 |
| `scripts/` | 重新抓取和整理：`node belle-clinic/scripts/crawl.js`，然后 `node belle-clinic/scripts/extract.js output/belle-clinic`、`node belle-clinic/scripts/build.js output/belle-clinic`。原始数据 `raw-pages.json`（16MB）存放在 `output/belle-clinic/`，不提交到 git |

---

## 1. 新网站 6 项治疗 vs 旧网站现有资料

### 优先 ① Weight management —— ❌ 旧网站没有对应页面

最接近的现有内容（都不是"体重管理"）：
- **Body Contouring**（https://mybelleclinic.com/treatments/body-contouring）：只列了 Cellulite Reduction、Stubborn Fat Deposits、Skin Tightening、Double Chin Reduction、Body Sculpting，每项一句话，没有写疗法、仪器或价格。
- **Mesolipo**（放在 https://mybelleclinic.com/treatments/face-sculpting 页）："fat-dissolving enzymes, plant extracts, and amino acids"，每次约 45 分钟，4–8 次，间隔 1–2 周，"Starting at RM 600 per session"。

➡️ 需要你提供：体重管理具体包括什么（药物、注射、饮食/营养计划、溶脂、仪器？）、疗程、价格、适合人群。

### 优先 ② Eyebag removal —— ⚠️ 有页面，但资料很少

- **Eyebag Treatment**（https://mybelleclinic.com/treatments/eyebag-treatment）：只有一般性描述（"reduce under-eye bags, dark circles, and fine lines using specialized techniques and products"），没有写方法、产品、疗程、价格。
- 其他页面提到眼部的地方：
  - Dermal Fillers 页："Under Eye Filler – Reduce the appearance of dark circles and hollowness under the eyes"
  - FaceLifts and Threadlifts 页："Under Eyes – Collagen Stimulation and Tightening"
  - Facial Contouring 分类页："Eye Bag Reduction – Minimizing the appearance of puffiness and sagging skin under the eyes"
- 可用图片：https://framerusercontent.com/images/8P8FQ1dAgXvk26rYcIpxg4fjm0.jpg

➡️ 需要确认：新名称用 "removal"，通常会被理解为手术切除眼袋。实际是手术，还是填充、线雕、溶脂等非手术方式？

### 优先 ③ Skin booster —— ✅ 有两个相关页面，可以合并

- **Gold Cell Skin Booster**（https://mybelleclinic.com/treatments/gold-cell-skin-booster）："Gold Cell (Salmon DNA) Skin Booster"，hyaluronic acid + peptides，先敷麻药后全脸注射；"Each session is priced at RM 1,200, with a recommended course of 3 sessions available for RM 3,000"
- **Skin Rejuvenation Injections / Sunekos**（https://mybelleclinic.com/treatments/skin-rejuvination-injections）：amino acids + hyaluronic acid，mesotherapy 注射，页面自称 "This skin booster…"；"Prices start at RM 750 to RM 3,000 per session, depending on the treatment area"
- 图片：Gold Cell https://framerusercontent.com/images/y0wsQazH64uLEOnkHtq7Q95aM.webp ；Sunekos https://framerusercontent.com/images/WuogT71YxvSq4xKPQkk6xLe9VBE.jpg

➡️ 需要确认：两种产品是否都继续提供？价格是否仍然有效？（Acne Scar 页写 "starts at 1200 per session for 3 sessions"，与 Gold Cell 页表述不一致。）

### ④ Biostimulator program —— ❌ 旧网站没有

旧网站没有提到任何 biostimulator 产品名。唯一相关的说法是 Sunekos 页的 "stimulate collagen and elastin production"，以及 FaceLifts 页的 "Collagen Stimulation"。
➡️ 需要你提供：使用的产品、疗程结构、价格。

### ⑤ Mini Facelift —— ⚠️ 只有部分相关内容

- **FaceLifts and Threadlifts**（https://mybelleclinic.com/treatments/facelifts-and-threadlifts）："Threadlifts offer a minimally invasive option…"，另列出 Jawline Slimming、Chin Tightening、Neck Rejuvenation、Under Eyes、Brow/Forehead Lift、"Sagging Face – Non-Surgical Face Lift Options"。没有写线材、疗程、价格。

➡️ 需要确认："Mini Facelift" 是线雕（非手术），还是手术型拉皮？

### ⑥ Anti-wrinkle treatment —— ⚠️ 没有专门页面

- Treatments 总页的 meta description 提到 "Botox"，但网站上没有 Botox 或抗皱注射页面。
- Anti-Aging 分类页（https://mybelleclinic.com/treatments/anti-aging）列出 Fine Lines and Wrinkles、Crow's Feet、Nasolabial Folds，每项一句话。
- Gummy Smile Corrections 页没有说明使用什么方法。

➡️ 需要你提供：产品、部位、价格。

---

## 2. 现有治疗清单（15 项，来源：https://mybelleclinic.com/treatments）

| # | 治疗 | URL | 网站上的子项目 / 产品 | 网站上写的价格 |
|---|---|---|---|---|
| 1 | Acne Scar Treatments | /treatments/acne-scar-treatments | BioRePeelCl3 Peel; Fractional Erbium Glass Laser; Gold Cell Skin Booster | RM350/次×6；RM400/次；"1200 per session for 3 sessions" |
| 2 | Body Contouring | /treatments/body-contouring | Cellulite, Stubborn Fat, Skin Tightening, Double Chin, Body Sculpting | — |
| 3 | Chemical Peel Skin Treatment | /treatments/skin-peeling-solutions | Advanced BioRePeelCl3 | RM350/次，6 次，间隔 2–3 周 |
| 4 | Dermal Fillers | /treatments/dermal-fillers | Chin/Jawline, Lip, Under Eye, Cheek, Nose, Facial Volumization | — |
| 5 | Eyebag Treatment | /treatments/eyebag-treatment | Eyebag Reduction（无具体方法） | — |
| 6 | Face Sculpting | /treatments/face-sculpting | Mesolipo; V-Shape; Full Rounded Forehead; Double Chin Reduction | Mesolipo RM600/次 |
| 7 | FaceLifts and Threadlifts | /treatments/facelifts-and-threadlifts | Jawline, Chin, Neck, Under Eyes, Brow/Forehead, Sagging Face | — |
| 8 | Gold Cell Skin Booster | /treatments/gold-cell-skin-booster | Gold Cell (Salmon DNA) | RM1,200/次；3 次 RM3,000 |
| 9 | Gummy Smile Corrections | /treatments/gummy-smile-corrections | （无具体方法） | — |
| 10 | Hair Loss Treatments | /treatments/hair-loss-treatments | Topical Minoxidil; FUE; Finasteride | — |
| 11 | Laser Hair Removal | /treatments/laser-hair-removal | GentleMax | RM400/次起，6–8 次 |
| 12 | Laser Skin Pigmentation Treatment | /treatments/laser-skin-pigmentation-treatment | PICO Antipigment Laser | RM400/次 |
| 13 | Laser Skin Rejuvenation Treatment | /treatments/laser-skin-treatment | Fractional Erbium Glass Laser | RM400/次起，建议 6 次 |
| 14 | Nose Shaping | /treatments/noseshaping | （无具体方法） | — |
| 15 | Skin Rejuvenation Injections | /treatments/skin-rejuvination-injections | Sunekos | RM750–RM3,000/次 |

首页 "Discover Aesthetic Services" 区块另外用了不同名称：ThreadLifts and Facelifts、Nose Contouring、Dermal Fillers、Eyebag Solutions。

## 3. 现有分类清单（10 项，来源：https://mybelleclinic.com/treatments/conditions）

| # | 分类 | URL | 链接到的治疗 |
|---|---|---|---|
| 1 | Skin Rejuvenation and Renewal | /treatments/anti-aging-solutions | （无） |
| 2 | Skin Disease and Conditions | /treatments/skin-disease-treatments | （无） |
| 3 | Skin Brightening and Whitening | /treatments/skin-brightening-and-whitening | Chemical Peel; Laser Pigmentation |
| 4 | Scars and Stretch Marks | /treatments/scars-and-stretch-marks | （无） |
| 5 | Hair Restoration | /treatments/hair-restoration | Hair Loss Treatments |
| 6 | Hair Removal | /treatments/hair-removal | Laser Hair Removal |
| 7 | Facial Contouring | /treatments/facial-contouring | Body Contouring; Dermal Fillers; Eyebag; Gummy Smile; Nose Shaping |
| 8 | Body Contouring | /treatments/body-contouring-solutions | Body Contouring; Eyebag; Face Sculpting; FaceLifts; Gummy Smile; Nose Shaping |
| 9 | Anti-Aging | /treatments/anti-aging | Acne Scar; Dermal Fillers; Eyebag; Face Sculpting; FaceLifts; Laser Pigmentation |
| 10 | Acne and Blemishes | /treatments/acne-and-blemishes | Acne Scar; Chemical Peel |

## 4. 诊所资料（来源：https://mybelleclinic.com/contact 、首页、about-us）

- **诊所名称：** Belle Clinic；版权公司：Destination Beauty Sdn. Bhd.（页脚 © 2025）
- **地址：** A-G-03, block A, Neo Damansara, Jalan PJU 8/1, Bandar Damansara Perdana, 47820 Petaling Jaya, Selangor
- **Email：** belleclinicmalaysia@gmail.com
- **电话 / WhatsApp：** Dr. Chiam +60 11-2616 8698；Dr. Jeffrey +60 12-933 3767（页脚只列 011-2616 8698）
- **营业时间：** Monday–Saturday 10AM–6PM；Sunday Closed
- **社交媒体：** https://www.instagram.com/belleclinicmalaysia/ · https://www.facebook.com/belleclinicmalaysia/
- **医生**（来源：首页、about-us "Meet Your Doctors"）：
  - **Dr. Jeffrey Lim**，"Aesthetic Doctor"，照片 https://framerusercontent.com/images/r2HfZUkof6SJpUXIqZQhpj2rY2M.png
  - **Dr. Chiam Tee Kiang**，没有写职称，照片 https://framerusercontent.com/images/FL6jP2jVH4jlZ903runIr0pBxw.png
  - 网站上**没有个人简介**。只有整体说法："LCP-certified doctors"、"10+ Years of Experience"、"combined experience of 20+ years"、"Established in 2018"。
- **网站上的宣传数据：** "+1k Patients Treated"、"100% Satisfied Patients"、About Us meta 写 "Korean FDA-approved fillers"
- **6 则患者评价**（Eliz A.、Tan J.、Mi Chin L.、S. Y.、Raymond C.、Leia D.），每个页面都重复出现

## 5. 图片及支持材料（详见 `images.csv`）

- 共 38 张不重复图片，全部存放在 framerusercontent.com（Framer CDN）。改版前请先下载备份，Framer 网站下线后这些链接可能失效。
- 每个治疗、每个分类各有 1 张主图，另有医生照片 2 张、团队/诊所照片 3 张、首页主视觉 2 张。
- 31 张图片没有 alt 文字。
- 有 3 处 alt 是**牙科模板残留**："Dental Clinic"、"Dentist with his Patient"、"Girl with a bright white smile"。首页文案也有 "entrusted their smiles to Our Doctors"。
- 没有找到：前后对比照、仪器照片、证书、PDF 或价目表文件。

---

## 6. 需要你确认的问题

**新治疗（优先）**
1. Weight management 具体包括哪些疗法、产品、价格？（旧网站没有资料）
2. Eyebag removal 是手术还是非手术？用什么方法或产品？价格？
3. Skin booster 要放 Gold Cell、Sunekos 两种，还是换成别的产品？旧价格（RM1,200 / 3 次 RM3,000；Sunekos RM750–3,000）是否仍然有效？
4. Biostimulator program 用什么产品？疗程和价格？
5. Mini Facelift 是线雕还是手术？
6. Anti-wrinkle treatment 的产品、部位和价格？

**旧治疗去留**
7. 以下 15 项旧治疗中，哪些在新网站继续保留？特别是 Hair Loss（FUE 植发、Finasteride）、Gummy Smile、Nose Shaping、Skin Disease（Light Therapy）是否仍然提供？
8. 新网站只放 6 项，还是 6 项再加部分旧治疗？

**重复或不一致**
9. `/treatments/body-contouring` 与 `/treatments/body-contouring-solutions` 内容完全相同，新网站只保留一个？
10. `anti-aging` 与 `anti-aging-solutions`（Skin Rejuvenation and Renewal）主题重叠，是否合并？
11. Mesolipo 写"塑造身体线条"，却放在 Face Sculpting 页面下。它是脸部治疗还是身体治疗？（也可能归入 Weight management。）
12. Hair Restoration 分类提到 PRP 和激光生发，但治疗页没有这两项。实际有没有提供？
13. Laser Skin Rejuvenation 页写 "Our dermatologists"，其他页面写 aesthetic doctor / LCP。新网站应该怎么描述医生资格？

**医生和宣传用语**
14. 两位医生的正式职称、学历、LCP 证书、经验年数？Dr. Chiam 的职称？（旧网站没有个人简介。）
15. "10+ Years of Experience" 与 "Established in 2018" 是否矛盾？前者是指医生个人经验吗？
16. "100% Satisfied Patients"、"+1k Patients"、"Korean FDA-approved fillers" 是否继续使用？
17. 两个 WhatsApp 号码都保留吗？页脚只放 Dr. Chiam 的号码，对吗？营业时间仍是周一至六 10AM–6PM 吗？
18. 6 则患者评价能否继续使用（是否取得同意、是否为真实评价）？

**小错误（改版时顺便修正）**
- Gold Cell 页："xperience"（少了 E）
- Skin Brightening 页："Disocover"
- 网址拼写错误：`skin-rejuvination-injections`
- 产品名拼写不统一：BioRePeelCl3 / BiorepeelCl3 / BiorepelCI3
- 联系表单："get back to your shortly"
- Facebook 链接有的有结尾斜杠，有的没有
