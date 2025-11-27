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
 * 文件夹名到实际文件名的映射
 * 由于文件命名规则不一致，需要精确映射每个文件夹对应的实际文件名
 */
export const detailFolderFileMap: Record<string, string> = {
  // 01 Modular Combined Display
  "detail_ BridgePlate": "4Axis Bridge Plate Installed With 3Statio Vise.webp",
  "detail_4PositionSystem": "5Axix 4Position System.webp",
  "01_detail_CV255125": "5Axis Double Workstation install two CV255125 Vises.webp",
  "detail_HorizontalModularCombination": "96mm Vertical And Horizontal Modular Combination.webp",
  "detail_ModularCombination": "4Axis Modular Combination Kit.webp",
  "detail_SchematicDiagram": "96mm to 52mm Schematic Diagram.webp",
  "detail_SingleSide": "4Axis Single-Side L-Bracket Assembly.webp",
  "detail_twoCV155125": "5Axis Dual Workstation install two CV255125 vises two CV155125 Vises.webp",
  "detail_VerticalAndHorizontal": "52mm and 96mm Vertical And Horizontal Zero Point Clamping(2).webp",
  "detail_ZeroPointClamping": "96mm Integrated Vertical And Horizontal Zero Point Clamping.webp",
  
  // 02 Quick Release Jaws Vise
  "detail_CP155130(RoundBase)": "CP155130(Round Base).webp",
  "detail_HP10077(AluminumJaw)": "HP10077(Aluminum Jaw).webp",
  "detail_HP10077(SteelJaw)": "HP10077(Steel Jaw).webp",
  "detail_HP15077 (DoubleJaw)": "HP15077 (Double Jaw).webp",
  "detail_HP15077(AluminumJaw)": "HP15077(Aluminum Jaw).webp",
  "detail_HP15077(SteelJaw)": "HP15077(Steel Jaw).webp",
  "detail_HP155130(AluminumJaw)": "HP155130(Aluminum Jaw).webp",
  "detail_HP155130(Double)": "HP155130(Double).webp",
  "detail_HP155130(SteelJaw)": "HP155130(Steel Jaw).webp",
  "detail_HP255130 ( BaseSeries)": "HP255130 ( Base Series).webp",
  "detail_HP255130 (DoubleStation)": "HP255130(Double).webp",
  "detail_HP255130 (SteelJaw)": "HP255130(Steel Jaw).webp",
  "detail_HP255130(AluminumJaw)": "HP255130(Aluminum Jaw).webp",
  "detail_HP300160(AluminumJaw)": "HP300160(Aluminum Jaw).webp",
  "detail_HP300160(Double)": "HP300160(Double).webp",
  "detail_HP300160(SteelJaw)": "HP300160(Steel Jaw).webp",
  "detail_HP300160(WithBase)": "HP300160_z3.webp",
  
  // 03 Manual Vise Series
  "detail_CV10075": "CV10075.432.webp",
  "detail_CV15075": "CV15075(Steel Jaw).webp",
  "detail_CV155125": "CV155125(Steel Jaw).webp",
  "detail_CV255125": "CV255125(Steel Jaw).webp",
  "detail_DV155125": "DV155125(Steel Jaw).webp",
  "detail_TB255125": "TB255125(Double).webp",
  
  // 04 Pneumatic Vise Series(With Pressurization
  "detail_Pneumatic Vice": "AH160(Pneumatic Vice).webp",
  
  // 05 Pneumatic Vise Series(Pneumatic Type
  "detail_AR155-I": "AR155-I.webp",
  "detail_AR155-II": "AR155-II.webp",
  
  // 06 Zero Point Clamping(Aluminum Base
  "detail_TA52-108": "TA52-108.webp",
  "detail_TA9652": "TA9652.webp",
  
  // 07 Zero Point Clamping(Steel Base)
  "detail_TO96-200": "TO96-200.webp",
  "detail_TO96130-255": "TO96130-255.webp",
  "detail_TO9652-200": "TO9652-200.webp",
  "detail_TS130-195": "TS130-195.webp",
  "detail_TS52-108_1": "TS52-108_1.webp",
  "detail_TS52-120": "TS52-120.webp",
  "detail_TS52-170.": "TS52-170.webp",
  "detail_TS52-210": "TS52-210.webp",
  "detail_TS52-210BS": "TS52-210BS_1.456.webp",
  "detail_TS52-96": "TS52-96.webp",
  "detail_TS96-155": "TS96-155.webp",
  "detail_TS96-178": "TS96-178.png",
  "detail_TS96-200": "TS96-200.webp",
  "detail_TS96-340": "TS96-340.webp",
  "detail_TS96-340BS": "TS96-340BS.webp",
  "detail_TS96130-195": "TS96130-195.webp",
  "detail_TS9652": "TS9652.webp",
  "detail_TS9652-200": "TS9652-200.webp",
  
  // 08 High Precision Zero Point Clamping
  "detail_PM52-120": "PM52-120.webp",
  "detail_PM52-139": "PM52-139.webp",
  "detail_PM96-160": "PM96-160.webp",
  "detail_PM96-175": "PM96-175.webp",
  "detail_PM96-175BS": "PM96-175BS.webp",
  "detail_PM96-200": "PM96-200.webp",
  
  // 09 High Precision Pneumatic Zero Point Clamping
  "detail_AP52-125": "AP52-125.webp",
  "detail_AP52-139": "AP52-139.webp",
  "detail_AP52-230": "AP52-230.webp",
  "detail_AP52-2304": "AP52-2304.webp",
  "detail_AP96-160": "AP96-160.webp",
  "detail_AP96-200": "AP96-200.webp",
  "detail_AP96-352": "AP96-352.webp",
  "detail_AP96-3604": "AP96-3604.webp",
  
  // 10 Pull Studs Series
  "detail_PM52-Pull Studs": "PM52-Pull Studs.webp",
  "detail_PM96-PullStuds": "PM96-Pull Studs.webp",
  "detail_TS52-PullStuds": "TS52-Pull Studs.webp",
  "detail_TS96-PullStuds": "TS96-Pull Studs.webp",
  
  // 11 Dovetail Fixture
  "detail_TS52-V50": "TS52-V50.webp",
  "detail_TS96-V50": "TS96-V50.webp",
  "detail_V50": "V50.webp",
  
  // 12 ER Clamping Series
  "detail_TS52-ER32": "TS52-ER32.webp",
  "detail_TS52-ER40": "TS52-ER40.webp",
  "detail_TS96-ER32": "TS96-ER32.webp",
  "detail_TS96-ER40": "TS96-ER40.webp",
  
  // 13 Modular Combination Series
  "detail_TS52-0090": "TS52-0090.webp",
  "detail_TS52-120R": "TS52-120R.webp",
  "detail_TS52-9052": "TS52-9052.webp",
  "detail_TS52-9096": "TS52-9096.webp",
  "detail_TS96-0090": "TS96-0090.webp",
  "detail_TS96-9096": "TS96-9096.webp",
  "detail_TS96-9690": "TS96-9690.webp",
  
  // 14 Modular Set Series
  "detail_TS52-combination": "TS52-combination.webp",
  "detail_TS96-combination": "TS96-combination.webp",
  
  // 15 L Bridge Plate Series
  "detail_L170_108": "L170_108.webp",
  "detail_L200_155": "L200.webp",
  "detail_L255": "L255.webp",
  
  // 16 5Axis Pyramid Series
  "detail_TO96-296（HallowType）": "TO96-276（Hallow Type）.webp",
  "detail_TS52-215(Square)": "TS52-215(Square).webp",
  "detail_TS52-3P(3 Station)": "TS52-3P(3 Station).webp",
  "detail_TS96-276(Circle)": "TS96-276(Circle).webp",
  "detail_TS96-276(Square)": "TS96-276(Square).webp",
  "detail_TS96-3P(3 Station)": "TS96-3P(3 Station).webp",
  "detail_TS96-4P(4Station)": "TS96-4P(4 Station).webp",
  
  // 17 Run_out Tester
  "detail_BT40Standard": "1.webp",
  "detail_Hand Type": "Runout-tester.webp",
  
  // 18 Unilateral Positione
  "detail_DW-1": "DW-1.webp",
  
  // 19 CNC Tombstone Series
  "detail_TS96-HM400-3p": "TS96-HM400-3p.487.webp",
  "detail_TS96-HM400-4P": "TS96-HM400.484.webp",
  
  // 20 Precision Bench Vice
  "detail_TH1-A": "TH1-A.webp",
  
  // 21 Hydraulic Bite Machine
  "detail_YC-M1": "YC-M1.webp",
  
  // 22 Pneumatic Single Hole Zero Plate Series
  "detail_ZP130-168": "ZP130-168.webp",
  "detail_ZP130-200": "ZP130-200.webp",
  "detail_ZP130-4018": "ZP130-4018.webp",
  "detail_ZP4036": "ZP4036.webp",
};

/**
 * 获取实际的文件名（从映射表查询）
 * @param detailFolderName detail_ 文件夹名（可能带产品ID前缀）
 * @returns 实际的文件名（带扩展名）
 */
function getActualFileName(detailFolderName: string): string {
  // 先尝试直接查找
  if (detailFolderFileMap[detailFolderName]) {
    return detailFolderFileMap[detailFolderName];
  }
  // 尝试去掉产品ID前缀后查找（如 01_detail_CV255125 -> detail_CV255125）
  const withoutPrefix = detailFolderName.replace(/^\d+_/, '');
  if (detailFolderFileMap[withoutPrefix]) {
    return detailFolderFileMap[withoutPrefix];
  }
  // 默认返回去掉 detail_ 前缀的文件名
  return `${detailFolderName.replace(/^(\d+_)?detail_/i, '').trim()}.webp`;
}

/**
 * 获取显示名称（去掉扩展名）
 * @param fileName 文件名
 * @returns 显示名称
 */
function getDisplayName(fileName: string): string {
  return fileName.replace(/\.webp$/i, '');
}

/**
 * 将文件夹名转换为文件名格式
 * 使用实际的文件名映射表
 */
function folderNameToFileName(folderName: string): string {
  const actualFileName = getActualFileName(folderName);
  return getDisplayName(actualFileName);
}

// 产品结构配置 - 基于实际 COS 上的文件夹结构
// 注意：保持与 COS 上完全一致的文件夹名称（包括空格）
const productStructures: Record<string, string[]> = {
  "modular-combined-display": [
    "detail_ BridgePlate",
    "detail_4PositionSystem",
    "01_detail_CV255125",
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
    "detail_TS52-170.",
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
      // 使用实际的文件名映射
      const actualFileName = getActualFileName(folder);
      const displayName = getDisplayName(actualFileName);
      
      // 生成缩略图URL（使用实际的文件名）
      const thumbnailUrl = `${COS_BASE_URL}/${encodedFolder}/${encodeURIComponent(folder)}/${encodeURIComponent(actualFileName)}`;
      
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
    const actualFileName = getActualFileName(detailFolderName);
    const displayName = getDisplayName(actualFileName);
    
    // 返回该文件夹中的图片（使用实际的文件名）
    const images = [
      {
        name: displayName,
        type: 'image' as const,
        path: [...subPath, actualFileName].join('/'),
        url: `${COS_BASE_URL}/${encodedFolder}/${encodeURIComponent(detailFolderName)}/${encodeURIComponent(actualFileName)}`,
        fileName: actualFileName,
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
  const actualFileName = getActualFileName(detailFolderName);
  const encodedFolder = encodeURIComponent(folderName);
  
  // 返回该 detail 文件夹的产品图片作为缩略图
  return `${COS_BASE_URL}/${encodedFolder}/${encodeURIComponent(detailFolderName)}/${encodeURIComponent(actualFileName)}`;
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
