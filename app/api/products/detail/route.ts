import { NextRequest, NextResponse } from 'next/server';

const COS_BASE_URL = "https://cdn.gzxfjxyxgs.com/products";

// 产品文件夹映射
const productFolderMap: Record<string, string> = {
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

// 文件夹名到实际文件名的映射（从 fileSystem.ts 导入的映射）
import { detailFolderFileMap } from '../../../lib/fileSystem';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get('productId');
  const detailFolder = searchParams.get('detailFolder');

  if (!productId || !detailFolder) {
    return NextResponse.json(
      { error: 'Missing productId or detailFolder' },
      { status: 400 }
    );
  }

  try {
    const folderName = productFolderMap[productId];
    if (!folderName) {
      return NextResponse.json({ productDetail: null });
    }

    const encodedFolder = encodeURIComponent(folderName);
    const encodedDetailFolder = encodeURIComponent(detailFolder);
    
    // 从映射表获取实际文件名
    const actualFileName = detailFolderFileMap[detailFolder];
    if (!actualFileName) {
      return NextResponse.json({ productDetail: null });
    }
    
    // 去掉扩展名得到基础文件名
    const baseFileName = actualFileName.replace(/\.(webp|png|txt)$/i, '');
    
    // 构建文件 URLs
    const productDetail = {
      name: detailFolder.replace(/^detail_/i, '').trim(),
      folderName: detailFolder,
      productImage: `${COS_BASE_URL}/${encodedFolder}/${encodedDetailFolder}/${encodeURIComponent(baseFileName)}.webp`,
      lineDrawing: `${COS_BASE_URL}/${encodedFolder}/${encodedDetailFolder}/${encodeURIComponent(baseFileName)}.png`,
      descriptionUrl: `${COS_BASE_URL}/${encodedFolder}/${encodedDetailFolder}/${encodeURIComponent(baseFileName)}.txt`,
    };
    
    return NextResponse.json({ productDetail });
  } catch (error) {
    console.error('Error building product detail:', error);
    return NextResponse.json(
      { error: 'Failed to build product detail' },
      { status: 500 }
    );
  }
}
