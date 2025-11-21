// 产品详情页图片数据库
// 映射产品详情页的图片列表（来自 pdf照片_1763725000895 目录）
// 这些图片将上传到腾讯云 COS

export const productDetailImagesDatabase: Record<string, string[]> = {
	"quick-release-jaws-vise": [
		"CP155130（Round Base）.png",
		"HP15077(Aluminum Jaw).png",
		"HP15077(Double).png",
		"HP15077(Steel Jaw).png",
		"HP155130(Aluminum Jaw).png",
		"HP155130(Double).png",
		"HP155130(Steel Jaw).png",
		"HP255130( With Base).png",
		"HP255130(Aluminum Jaw).png",
		"HP255130(Double).png",
		"HP255130(Steel Jaw).png",
		"HP300160( With Base).png",
		"HP300160(Aluminum Jaw).png",
		"HP300160(Double).png",
		"HP300160(Steel Jaw).png",
	],
	"manual-vise-series": [
		"CV15075（Steel Jaw）.png",
		"CV155125（Steel Jaw）.png",
		"CV255125（Steel Jaw）.png",
		"DV155125（Steel Jaw）.png",
		"TB255125.png",
	],
	"pneumatic-vise-pressurization": [
		"AR155-I.png",
	],
	"pneumatic-vise-pneumatic": [
		"AR155-I.png",
		"AR155-II.png",
	],
	"zero-point-aluminum": [
		"TA52-108.png",
		"TA9652-155.png",
	],
	"zero-point-steel": [
		"TO96-200.png",
		"TO96-276.png",
		"TO96130-255.png",
		"TO9652-200.png",
		"TS130-195.png",
		"TS52-108.png",
		"TS52-120.png",
		"TS52-170.png",
		"TS52-210.png",
		"TS52-210BS.png",
		"TS52-96.png",
		"TS96-155.png",
		"TS96-178.png",
		"TS96-200.png",
		"TS96-340.png",
		"TS96-340BS.png",
		"TS96130-195.png",
		"TS9652-200.png",
		"TS9652.png",
	],
	"high-precision-zero-point": [
		"PM52-120.png",
		"PM52-139.png",
		"PM96-160.png",
		"PM96-175.png",
		"PM96-175BS.png",
		"PM96-200.png",
	],
	"high-precision-pneumatic-zero": [
		"AP52-125.png",
		"AP52-139.png",
		"AP52-230.png",
		"AP52-2304.png",
		"AP96-160.png",
		"AP96-200.png",
		"AP96-352.png",
		"AP96-3604.png",
	],
	"pull-studs-series": [
		"PM52-LD.png",
		"PM96-LD.png",
		"TS52-LD.png",
		"TS96-LD.png",
	],
	"dovetail-fixture": [
		"TS52-V50.png",
		"TS96-V50.png",
		"V50.png",
	],
	"er-clamping-series": [
		"TS52-ER32.png",
		"TS52-ER40.png",
		"TS96-ER32.png",
		"TS96-ER40.png",
	],
	"modular-combination": [
		"TS52-0090.png",
		"TS52-120R.png",
		"TS52-9052.png",
		"TS52-9096.png",
		"TS96-0090.png",
		"TS96-9096.png",
		"TS96-9690.png",
	],
	"modular-set-series": [
		"TS52组合.png",
		"TS96组合.png",
	],
	"bridge-plate-series": [
		"L170.png",
		"L200.png",
		"L255.png",
	],
	"5axis-pyramid-series": [
		"TO96-276.png",
		"TS52-215.png",
		"TS52-3P.png",
		"TS96-276.png",
		"TS96-3P.png",
		"TS96-4P.png",
	],
	"run-out-tester": [
		"BT40标准款.png",
		"手摆款.png",
	],
	"unilateral-positione": [
		"单边定位器.png",
	],
	"cnc-tombstone-series": [
		"TS96-HM400_3P.png",
		"TS96-HM400_4p.png",
	],
	"precision-bench-vice": [
		"TH1-A.png",
	],
	"hydraulic-bite-machine": [
		"YC-M10.png",
	],
	"pneumatic-single-hole-zero": [
		"ZP130-200.png",
		"ZP130-4018.png",
		"ZP130.png",
		"ZP4036.png",
	],
};

// 产品文件夹映射（用于COS路径）
export const productDetailFolderMap: Record<string, string> = {
	"quick-release-jaws-vise": "02",
	"manual-vise-series": "03",
	"pneumatic-vise-pressurization": "04",
	"pneumatic-vise-pneumatic": "05",
	"zero-point-aluminum": "06",
	"zero-point-steel": "07",
	"high-precision-zero-point": "08",
	"high-precision-pneumatic-zero": "09",
	"pull-studs-series": "10",
	"dovetail-fixture": "11",
	"er-clamping-series": "12",
	"modular-combination": "13",
	"modular-set-series": "14",
	"bridge-plate-series": "15",
	"5axis-pyramid-series": "16",
	"run-out-tester": "17",
	"unilateral-positione": "18",
	"cnc-tombstone-series": "19",
	"precision-bench-vice": "20",
	"hydraulic-bite-machine": "21",
	"pneumatic-single-hole-zero": "22",
};

// 获取产品详情页图片列表
export function getProductDetailImages(productId: string) {
	const folderNumber = productDetailFolderMap[productId];
	const imageNames = productDetailImagesDatabase[productId] || [];
	
	if (!folderNumber) {
		return [];
	}
	
	// 腾讯云 COS 基础 URL
	const baseUrl = "https://work-1251384833.cos.ap-singapore.myqcloud.com/pdf%E7%85%A7%E7%89%87";
	
	return imageNames.map(imageName => ({
		name: imageName.replace(/\.png$/i, ""),
		url: `${baseUrl}/${folderNumber}/${encodeURIComponent(imageName)}`,
		fileName: imageName,
	}));
}
