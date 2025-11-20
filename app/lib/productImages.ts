// 产品图片数据库
// 每个产品的图片列表
export const productImagesDatabase: Record<string, string[]> = {
	"modular-combined-display": [
		"4Axis Bridge Plate Installed With 3Statio Vise.webp",
		"4Axis Modular Combination Kit.webp",
		"4Axis Single-Side L-Bracket Assembly.webp",
		"52mm and 96mm Vertical And Horizontal Zero Point Clamping (2).webp",
		"52mm and 96mm Vertical And Horizontal Zero Point Clamping.webp",
		"5Axis Double Workstation install two CV255125 Vises.webp",
		"5Axis Dual Workstation install two CV255125 vises two CV155125 Vises.webp",
		"5Axix 4Position System.webp",
		"96mm Integrated Vertical And Horizontal Zero Point Clamping.webp",
		"96mm Vertical And Horizontal Modular Combination.webp",
		"96mm to 52mm Schematic Diagram.webp",
	],
	"quick-release-jaws-vise": [
		"HP10077(Steel Jaw).webp",
		"Quick Release Vise 1.webp",
		"Quick Release Vise 2.webp",
	],
	"manual-vise-series": [
		"Manual Vise 1.webp",
		"Manual Vise 2.webp",
		"Manual Vise 3.webp",
	],
	"pneumatic-vise-pressurization": [
		"Pneumatic Vise 1.webp",
		"Pneumatic Vise 2.webp",
	],
	"pneumatic-vise-pneumatic": [
		"Pneumatic Type 1.webp",
		"Pneumatic Type 2.webp",
	],
	"zero-point-aluminum": [
		"Aluminum Base 1.webp",
		"Aluminum Base 2.webp",
	],
	"zero-point-steel": [
		"Steel Base 1.webp",
		"Steel Base 2.webp",
	],
	"high-precision-zero-point": [
		"High Precision 1.webp",
		"High Precision 2.webp",
	],
	"high-precision-pneumatic-zero": [
		"Pneumatic Zero 1.webp",
		"Pneumatic Zero 2.webp",
	],
	"pull-studs-series": [
		"Pull Studs 1.webp",
		"Pull Studs 2.webp",
	],
	"dovetail-fixture": [
		"Dovetail 1.webp",
		"Dovetail 2.webp",
	],
	"er-clamping-series": [
		"ER Clamping 1.webp",
		"ER Clamping 2.webp",
	],
	"modular-combination": [
		"Modular Combo 1.webp",
		"Modular Combo 2.webp",
	],
	"modular-set-series": [
		"Modular Set 1.webp",
		"Modular Set 2.webp",
	],
	"bridge-plate-series": [
		"Bridge Plate 1.webp",
		"Bridge Plate 2.webp",
	],
	"5Axis-pyramid-series": [
		"5Axis Pyramid 1.webp",
		"5Axis Pyramid 2.webp",
	],
	"run_out-tester": [
		"Run Out Tester 1.webp",
		"Run Out Tester 2.webp",
	],
	"Unilateral-Positione": [
		"Unilateral 1.webp",
		"Unilateral 2.webp",
	],
	"cnc-tombstone-series": [
		"CNC Tombstone 1.webp",
		"CNC Tombstone 2.webp",
	],
	"precision-bench-vice": [
		"Bench Vice 1.webp",
		"Bench Vice 2.webp",
	],
	"hydraulic-bite-machine": [
		"Hydraulic Machine 1.webp",
		"Hydraulic Machine 2.webp",
	],
	"pneumatic-single-hole-zero": [
		"Single Hole Zero 1.webp",
		"Single Hole Zero 2.webp",
	],
};

// 产品文件夹映射
export const productFolderMap: Record<string, string> = {
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

// 获取产品图片列表
export function getProductImages(productId: string) {
	const folderName = productFolderMap[productId];
	const imageNames = productImagesDatabase[productId] || [];
	
	if (!folderName) {
		return [];
	}
	
	const baseUrl = "https://cdn.gzxfjxyxgs.com/products";
	const encodedFolder = encodeURIComponent(folderName);
	
	return imageNames.map(imageName => ({
		name: imageName.replace(/\.(webp|jpg|jpeg|png)$/i, ""),
		url: `${baseUrl}/${encodedFolder}/${encodeURIComponent(imageName)}`,
		fileName: imageName,
	}));
}
