// lib/i18n/data/zh/tours-data.ts — Chinese Simplified tour data
export interface TranslatedTour {
  slug: string; title: string; shortDescription: string
  metaTitle: string; metaDescription: string; keywords: string[]
  highlights: string[]; included: string[]; excluded: string[]
}

export const zhTours: TranslatedTour[] = [
  {
    slug: "masai-mara-luxury-safari",
    title: "马赛马拉豪华野生动物园",
    shortDescription: "肯尼亚最著名野生动物保护区5天豪华野生动物园之旅",
    metaTitle: "马赛马拉豪华野生动物园2026 | 捷旅探险",
    metaDescription: "与捷旅预订马赛马拉豪华野生动物园。享受游猎、豪华帐篷营地和专业导游。起价3,500美元。",
    keywords: ["马赛马拉野生动物园", "肯尼亚豪华safari", "非洲野生动物园", "大迁徙肯尼亚", "肯尼亚旅游套餐"],
    highlights: ["马赛马拉国家保护区游猎","豪华帐篷营地住宿","可选热气球safari","专业野生动物向导","所有餐食包含"],
    included: ["豪华旅馆住宿","所有餐食和饮料","4x4游猎车","专业向导服务","公园入场费"],
    excluded: ["国际机票","旅行保险","小费","个人费用","签证费"],
  },
  {
    slug: "gorilla-trekking-experience",
    title: "大猩猩徒步探险体验",
    shortDescription: "在卢旺达或乌干达的自然栖息地与山地大猩猩相遇",
    metaTitle: "大猩猩徒步卢旺达和乌干达2026 | 捷旅探险",
    metaDescription: "在卢旺达和乌干达体验山地大猩猩徒步。包含许可证、豪华旅馆和认证向导。",
    keywords: ["大猩猩徒步卢旺达", "山地大猩猩乌干达", "非洲大猩猩safari", "布温迪原始森林", "火山国家公园卢旺达"],
    highlights: ["与山地大猩猩相遇","布温迪原始森林","火山国家公园","认证大猩猩向导","每组最多8人"],
    included: ["大猩猩徒步许可证","豪华旅馆住宿","所有餐食","4x4交通","专业大猩猩向导"],
    excluded: ["国际机票","卢旺达/乌干达签证","旅行保险","小费","个人费用"],
  },
  {
    slug: "serengeti-migration-tour",
    title: "塞伦盖蒂大迁徙之旅",
    shortDescription: "见证坦桑尼亚塞伦盖蒂大迁徙壮观景象",
    metaTitle: "塞伦盖蒂大迁徙坦桑尼亚2026 | 捷旅探险",
    metaDescription: "与捷旅观赏塞伦盖蒂角马大迁徙。游猎、河流穿越和豪华住宿一应俱全。",
    keywords: ["塞伦盖蒂大迁徙", "坦桑尼亚safari", "非洲角马迁徙", "塞伦盖蒂2026", "马拉河穿越"],
    highlights: ["角马大迁徙","惊险马拉河穿越","逾150万头角马","清晨黄昏游猎","精彩野生动物摄影"],
    included: ["旅馆/营地住宿","所有餐食","弹出式天窗车辆","专家向导","国家公园费用"],
    excluded: ["国际机票","坦桑尼亚签证","保险","小费","个人费用"],
  },
  {
    slug: "wheelchair-accessible-safari",
    title: "无障碍轮椅野生动物园肯尼亚",
    shortDescription: "专为轮椅使用者设计的safari，配备德国液压升降机",
    metaTitle: "无障碍轮椅野生动物园肯尼亚2026 | 液压升降4x4 | 捷旅",
    metaDescription: "肯尼亚轮椅safari，配备德国液压升降机（400公斤）。马赛马拉、无障碍旅馆。立即预订您的无障碍safari。",
    keywords: ["轮椅safari肯尼亚", "无障碍非洲safari", "液压升降safari车", "残障旅游肯尼亚", "无障碍野生动物园"],
    highlights: ["德国液压升降系统（400公斤）","改装4x4越野车","无障碍旅馆住宿","医疗配备车辆","专业无障碍导游"],
    included: ["配备液压升降机的改装4x4","无障碍旅馆","所有餐食","专业向导","公园入场费"],
    excluded: ["机票","签证","保险","小费","个人费用"],
  },
]

export function getZhTourBySlug(slug: string): TranslatedTour | undefined {
  return zhTours.find(t => t.slug === slug)
}
