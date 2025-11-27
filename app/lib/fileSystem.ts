// 文件系统工具 - 从 COS 获取产品数据
const COS_BASE_URL = "https://cdn.gzxfjxyxgs.com/products";

// 产品文件夹映射
export const productFolderMap: Record<string, string> = {
  "modular-combined-display": "01 Modular Combined Display",
  "quick-release-jaws-vise": "02 Quick Release Jaws Vise",
  "manual-vise-series": "03 Manual Vise Series",
  "pneumatic-vise-serieswith-pressurization": "04 Pneumatic Vise Series(With Pressurization",
  "pneumatic-vise-seriespneumatic-type": "05 Pneumatic Vise Series(Pneumatic Type",
  "zero-point-clampingaluminum-base": "06 Zero Point Clamping(Aluminum Base",
  "zero-point-clampingsteel-base": "07 Zero Point Clamping(Steel Base)",
  "high-precision-zero-point-clamping": "08 High Precision Zero Point Clamping",
  "high-precision-pneumatic-zero-point-clamping": "09 High Precision Pneumatic Zero Point Clamping",
  "pull-studs-series": "10 Pull Studs Series",
  "dovetail-fixture": "11 Dovetail Fixture",
  "er-clamping-series": "12 ER Clamping Series",
  "modular-combination-series": "13 Modular Combination Series",
  "modular-set-series": "14 Modular Set Series",
  "l-bridge-plate-series": "15 L Bridge Plate Series",
  "5axis-pyramid-series": "16 5Axis Pyramid Series",
  "run_out-tester": "17 Run_out Tester",
  "unilateral-positione": "18 Unilateral Positione",
  "cnc-tombstone-series": "19 CNC Tombstone Series",
  "precision-bench-vice": "20 Precision Bench Vice",
  "hydraulic-bite-machine": "21 Hydraulic Bite Machine",
  "pneumatic-single-hole-zero-plate-series": "22 Pneumatic Single Hole Zero Plate Series",
};

export interface FileSystemItem {
  name: string;           // 显示名称
  type: 'folder' | 'image'; // 类型
  path: string;           // 完整路径
  url?: string;           // 如果是图片，提供COS URL
  fileName?: string;      // 原始文件名
  thumbnailUrl?: string;  // 文件夹缩略图URL
}

/**
 * 将文件夹名转换为文件名格式
 * 文件夹：detail_CP155130(RoundBase) -> 文件：CP155130(Round Base).webp
 * 规则：去掉 detail_ 前缀，在大写字母前添加空格（括号内）
 */
function folderNameToFileName(folderName: string): string {
  // 去掉 detail_ 前缀
  let name = folderName.replace(/^detail_/i, '').trim();
  
  // 在括号内的驼峰命名中插入空格
  name = name.replace(/\(([^)]+)\)/g, (match, content) => {
    // 在大写字母前插入空格，但不在开头
    const spaced = content.replace(/([a-z])([A-Z])/g, '$1 $2');
    return `(${spaced})`;
  });
  
  return name;
}

// 产品结构配置 - 基于实际 COS 上的文件夹结构
// 注意：保持与 COS 上完全一致的文件夹名称（包括空格）
const productStructures: Record<string, string[]> = {
  "modular-combined-display": [
    "detail_ BridgePlate",
    "detail_4PositionSystem",
    "detail_CV255125",
    "detail_HorizontalModularCombination",
    "detail_ModularCombination",
    "detail_SchematicDiagram",
    "detail_SingleSide",
    "detail_twoCV155125",
    "detail_VerticalAndHorizontal",
    "detail_ZeroPointClamping",
  ],
  "quick-release-jaws-vise": [
    "detail_CP155130(RoundBase)",
    "detail_HP10077(AluminumJaw)",
    "detail_HP10077(SteelJaw)",
    "detail_HP15077 (DoubleJaw)",
    "detail_HP15077(AluminumJaw)",
    "detail_HP15077(SteelJaw)",
    "detail_HP155130(AluminumJaw)",
    "detail_HP155130(Double)",
    "detail_HP155130(SteelJaw)",
    "detail_HP255130 ( BaseSeries)",
    "detail_HP255130 (DoubleStation)",
    "detail_HP255130 (SteelJaw)",
    "detail_HP255130(AluminumJaw)",
    "detail_HP300160(AluminumJaw)",
    "detail_HP300160(Double)",
    "detail_HP300160(SteelJaw)",
    "detail_HP300160(WithBase)",
  ],
  "manual-vise-series": [
    "detail_CV10075",
    "detail_CV15075",
    "detail_CV155125",
    "detail_CV255125",
    "detail_DV155125",
    "detail_TB255125",
  ],
  "pneumatic-vise-serieswith-pressurization": [
    "detail_Pneumatic Vice",
  ],
  "pneumatic-vise-seriespneumatic-type": [
    "detail_AR155-I",
    "detail_AR155-II",
  ],
  "zero-point-clampingaluminum-base": [
    "detail_TA52-108",
    "detail_TA9652",
  ],
  "zero-point-clampingsteel-base": [
    "detail_TO96-200",
    "detail_TO96130-255",
    "detail_TO9652-200",
    "detail_TS130-195",
    "detail_TS52-108_1",
    "detail_TS52-120",
    "detail_TS52-170",
    "detail_TS52-210",
    "detail_TS52-210BS",
    "detail_TS52-96",
    "detail_TS96-155",
    "detail_TS96-178",
    "detail_TS96-200",
    "detail_TS96-340",
    "detail_TS96-340BS",
    "detail_TS96130-195",
    "detail_TS9652",
    "detail_TS9652-200",
  ],
  "high-precision-zero-point-clamping": [
    "detail_PM52-120",
    "detail_PM52-139",
    "detail_PM96-160",
    "detail_PM96-175",
    "detail_PM96-175BS",
    "detail_PM96-200",
  ],
  "high-precision-pneumatic-zero-point-clamping": [
    "detail_AP52-125",
    "detail_AP52-139",
    "detail_AP52-230",
    "detail_AP52-2304",
    "detail_AP96-160",
    "detail_AP96-200",
    "detail_AP96-352",
    "detail_AP96-3604",
  ],
  "pull-studs-series": [
    "detail_PM52-Pull Studs",
    "detail_PM96-PullStuds",
    "detail_TS52-PullStuds",
    "detail_TS96-PullStuds",
  ],
  "dovetail-fixture": [
    "detail_TS52-V50",
    "detail_TS96-V50",
    "detail_V50",
  ],
  "er-clamping-series": [
    "detail_TS52-ER32",
    "detail_TS52-ER40",
    "detail_TS96-ER32",
    "detail_TS96-ER40",
  ],
  "modular-combination-series": [
    "detail_TS52-0090",
    "detail_TS52-120R",
    "detail_TS52-9052",
    "detail_TS52-9096",
    "detail_TS96-0090",
    "detail_TS96-9096",
    "detail_TS96-9690",
  ],
  "modular-set-series": [
    "detail_TS52-combination",
    "detail_TS96-combination",
  ],
  "l-bridge-plate-series": [
    "detail_L170_108",
    "detail_L200_155",
    "detail_L255",
  ],
  "5axis-pyramid-series": [
    "detail_TO96-296（HallowType）",
    "detail_TS52-215(Square)",
    "detail_TS52-3P(3 Station)",
    "detail_TS96-276(Circle)",
    "detail_TS96-276(Square)",
    "detail_TS96-3P(3 Station)",
    "detail_TS96-4P(4Station)",
  ],
  "run_out-tester": [
    "detail_BT40Standard",
    "detail_Hand Type",
  ],
  "unilateral-positione": [
    "detail_DW-1",
  ],
  "cnc-tombstone-series": [
    "detail_TS96-HM400-3p",
    "detail_TS96-HM400-4P",
  ],
  "precision-bench-vice": [
    "detail_TH1-A",
  ],
  "hydraulic-bite-machine": [
    "detail_YC-M1",
  ],
  "pneumatic-single-hole-zero-plate-series": [
    "detail_ZP130-168",
    "detail_ZP130-200",
    "detail_ZP130-4018",
    "detail_ZP4036",
  ],
};

/**
 * 读取指定路径下的所有文件和文件夹（从 COS 配置读取）
 * @param productId 产品ID
 * @param subPath 子路径数组（可选）
 * @returns 文件系统项目列表
 */
export function readProductDirectory(
  productId: string,
  subPath: string[] = []
): FileSystemItem[] {
  const folderName = productFolderMap[productId];
  if (!folderName) {
    return [];
  }

  const result: FileSystemItem[] = [];
  const encodedFolder = encodeURIComponent(folderName);

  // 如果是根目录，返回产品的 detail_ 文件夹列表
  if (subPath.length === 0) {
    const folders = productStructures[productId] || [];
    
    for (const folder of folders) {
      // 将文件夹名转换为文件名（处理驼峰转空格）
      const displayName = folderNameToFileName(folder);
      
      // 生成缩略图URL（使用转换后的文件名）
      const thumbnailUrl = `${COS_BASE_URL}/${encodedFolder}/${encodeURIComponent(folder)}/${encodeURIComponent(displayName)}.webp`;
      
      result.push({
        name: displayName,
        type: 'folder',
        path: folder,
        fileName: folder,
        thumbnailUrl,
      });
    }
  } else {
    // 如果是子路径（进入了某个 detail_ 文件夹），返回该文件夹中的图片
    const detailFolderName = subPath[0];
    const displayName = folderNameToFileName(detailFolderName);
    
    // 返回该文件夹中的图片（使用转换后的文件名）
    const images = [
      {
        name: displayName,
        type: 'image' as const,
        path: [...subPath, `${displayName}.webp`].join('/'),
        url: `${COS_BASE_URL}/${encodedFolder}/${encodeURIComponent(detailFolderName)}/${encodeURIComponent(displayName)}.webp`,
        fileName: `${displayName}.webp`,
      }
    ];
    
    result.push(...images);
  }

  return result;
}

/**
 * 检查指定路径是否为文件夹
 */
export function isFolder(productId: string, subPath: string[]): boolean {
  if (subPath.length === 0) {
    return true; // 根目录总是文件夹
  }
  
  // 检查是否是 detail_ 文件夹
  const lastSegment = subPath[subPath.length - 1];
  return lastSegment.startsWith('detail_');
}

/**
 * 获取文件夹的缩略图（第一张图片）
 */
export function getFolderThumbnail(productId: string, subPath: string[]): string | null {
  const folderName = productFolderMap[productId];
  if (!folderName) {
    return null;
  }

  if (subPath.length === 0) {
    return null;
  }

  const detailFolderName = subPath[subPath.length - 1];
  const displayName = folderNameToFileName(detailFolderName);
  const encodedFolder = encodeURIComponent(folderName);
  
  // 返回该 detail 文件夹的产品图片作为缩略图
  return `${COS_BASE_URL}/${encodedFolder}/${encodeURIComponent(detailFolderName)}/${encodeURIComponent(displayName)}.webp`;
}

/**
 * 获取指定路径下的所有图片（用于详情页浏览）
 */
export function getImagesInPath(productId: string, subPath: string[]): FileSystemItem[] {
  const items = readProductDirectory(productId, subPath);
  return items.filter(item => item.type === 'image');
}

/**
 * 获取面包屑导航数据
 */
export function getBreadcrumbs(productId: string, subPath: string[]) {
  const breadcrumbs = [
    { name: 'Products', path: '/products' },
  ];

  // 添加产品名称
  const product = getProductNameById(productId);
  if (product) {
    breadcrumbs.push({
      name: product,
      path: `/products/${productId}`,
    });
  }

  // 添加子路径
  let currentPath = `/products/${productId}`;
  for (let i = 0; i < subPath.length; i++) {
    currentPath += `/${subPath[i]}`;
    breadcrumbs.push({
      name: subPath[i],
      path: currentPath,
    });
  }

  return breadcrumbs;
}

/**
 * 根据产品ID获取产品名称
 */
function getProductNameById(productId: string): string | null {
  const folderName = productFolderMap[productId];
  if (!folderName) {
    return null;
  }
  // 去掉序号前缀
  return folderName.replace(/^\d+\s+/, '');
}

/**
 * 获取产品封面图
 */
export function getProductCover(productId: string): string {
  const folderName = productFolderMap[productId];
  if (!folderName) {
    return '';
  }

  const encodedFolder = encodeURIComponent(folderName);
  const encodedCover = encodeURIComponent('cover');
  
  // 优先返回 webp 格式
  return `${COS_BASE_URL}/${encodedFolder}/${encodedCover}/cover.webp`;
}
