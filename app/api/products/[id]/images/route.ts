import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 产品文件夹映射
const productFolderMap: Record<string, string> = {
	"modular-combined-display": "01 Modular Combined Display",
	"quick-release-jaws-vise": "02 Quick Release Jaws Vise",
	"manual-vise-series": "03 Manual Vise Series",
	"pneumatic-vise-pressurization": "04 Pneumatic Vise Series(With Pressurization",
	"pneumatic-vise-pneumatic": "05 Pneumatic Vise Series(Pneumatic Type",
	"zero-point-aluminum": "06 Zero Point Clamping(Aluminum Base",
	"zero-point-steel": "07 Zero Point Clamping(Steel Base)",
	"high-precision-zero-point": "08 High Precision Zero Point Clamping",
	"high-precision-pneumatic-zero": "09.High Precision Pneumatic Zero Point Clamping",
	"pull-studs-series": "10 Pull Studs Series",
	"dovetail-fixture": "11 Dovetail Fixture",
	"er-clamping-series": "12 ER Clamping Series",
	"modular-combination": "13 Modular Combination Series",
	"modular-set-series": "14 Modular Set Series",
	"bridge-plate-series": "15 L Bridge Plate Series",
	"5Axis-pyramid-series": "16 5Axis Pyramid Series",
	"run_out-tester": "17 Run_out Tester",
	"Unilateral-Positione": "18 Unilateral Positione",
	"cnc-tombstone-series": "19 CNC Tombstone Series",
	"precision-bench-vice": "20 Precision Bench Vice",
	"hydraulic-bite-machine": "21 Hydraulic Bite Machine",
	"pneumatic-single-hole-zero": "22 Pneumatic Single Hole Zero Plate Series",
};

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id: productId } = await params;
		const folderName = productFolderMap[productId];

		if (!folderName) {
			return NextResponse.json(
				{ error: "Product not found" },
				{ status: 404 }
			);
		}

		// 获取产品文件夹路径
		const productPath = path.join(process.cwd(), "app", "product", folderName);

		// 检查文件夹是否存在
		if (!fs.existsSync(productPath)) {
			return NextResponse.json(
				{ error: "Product folder not found" },
				{ status: 404 }
			);
		}

		// 读取文件夹中的所有文件
		const files = fs.readdirSync(productPath);

		// 过滤出图片文件（排除封面文件夹）
		const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
		const images = files
			.filter((file) => {
				const ext = path.extname(file).toLowerCase();
				const stats = fs.statSync(path.join(productPath, file));
				return stats.isFile() && imageExtensions.includes(ext);
			})
			.map((file) => {
				const baseUrl = "https://cdn.gzxfjxyxgs.com/products";
				const encodedFolder = encodeURIComponent(folderName);
				const encodedFile = encodeURIComponent(file);
				
				return {
					name: file.replace(/\.(jpg|jpeg|png|webp|gif)$/i, ""),
					url: `${baseUrl}/${encodedFolder}/${encodedFile}`,
					fileName: file,
				};
			});

		return NextResponse.json({ images });
	} catch (error) {
		console.error("Error reading product images:", error);
		return NextResponse.json(
			{ error: "Failed to load images" },
			{ status: 500 }
		);
	}
}
