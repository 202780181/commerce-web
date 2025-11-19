// 产品配置 - 基于文件夹结构定义产品层级
// COS 基础路径
const COS_BASE_URL = "https://work-1251384833.cos.ap-singapore.myqcloud.com/products";

// 产品类型定义
export interface ProductImage {
  name: string;          // 图片名称（不含扩展名）
  url: string;           // 完整的COS URL
  fileName: string;      // 原始文件名
}

export interface ProductCategory {
  id: string;            // 分类ID（文件夹名）
  name: string;          // 分类显示名称
  images: ProductImage[]; // 该分类下的所有产品图片
}

export interface Product {
  id: string;                    // 产品ID
  index: number;                 // 产品序号
  name: string;                  // 产品名称
  folderName: string;            // 文件夹名称
  coverImage: string;            // 封面图片URL
  hasCategories: boolean;        // 是否有子分类
  categories?: ProductCategory[]; // 子分类列表（如果有）
  images?: ProductImage[];        // 直接产品图片列表（如果没有子分类）
}

// 所有产品配置
export const productsConfig: Product[] = [
  {
    id: "modular-combined-display",
    index: 1,
    name: "Modular Combined Display",
    folderName: "01 Modular Combined Display",
    coverImage: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: [
      {
        name: "4Axis Bridge Plate Installed With 3Statio Vise",
        fileName: "4Axis Bridge Plate Installed With 3Statio Vise.webp",
        url: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/4Axis%20Bridge%20Plate%20Installed%20With%203Statio%20Vise.webp`
      },
      {
        name: "4Axis Modular Combination Kit",
        fileName: "4Axis Modular Combination Kit.webp",
        url: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/4Axis%20Modular%20Combination%20Kit.webp`
      },
      {
        name: "4Axis Single-Side L-Bracket Assembly",
        fileName: "4Axis Single-Side L-Bracket Assembly.webp",
        url: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/4Axis%20Single-Side%20L-Bracket%20Assembly.webp`
      },
      {
        name: "52mm and 96mm Vertical And Horizontal Zero Point Clamping (2)",
        fileName: "52mm and 96mm Vertical And Horizontal Zero Point Clamping (2).webp",
        url: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/52mm%20and%2096mm%20Vertical%20And%20Horizontal%20Zero%20Point%20Clamping%20(2).webp`
      },
      {
        name: "52mm and 96mm Vertical And Horizontal Zero Point Clamping",
        fileName: "52mm and 96mm Vertical And Horizontal Zero Point Clamping.webp",
        url: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/52mm%20and%2096mm%20Vertical%20And%20Horizontal%20Zero%20Point%20Clamping.webp`
      },
      {
        name: "5Axis Double Workstation install two CV255125 Vises",
        fileName: "5Axis Double Workstation install two CV255125 Vises.webp",
        url: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/5Axis%20Double%20Workstation%20install%20two%20CV255125%20Vises.webp`
      },
      {
        name: "5Axis Dual Workstation install two CV255125 vises two CV155125 Vises",
        fileName: "5Axis Dual Workstation install two CV255125 vises two CV155125 Vises.webp",
        url: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/5Axis%20Dual%20Workstation%20install%20two%20CV255125%20vises%20two%20CV155125%20Vises.webp`
      },
      {
        name: "5Axix 4Position System",
        fileName: "5Axix 4Position System.webp",
        url: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/5Axix%204Position%20System.webp`
      },
      {
        name: "96mm Integrated Vertical And Horizontal Zero Point Clamping",
        fileName: "96mm Integrated Vertical And Horizontal Zero Point Clamping.webp",
        url: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/96mm%20Integrated%20Vertical%20And%20Horizontal%20Zero%20Point%20Clamping.webp`
      },
      {
        name: "96mm Vertical And Horizontal Modular Combination",
        fileName: "96mm Vertical And Horizontal Modular Combination.webp",
        url: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/96mm%20Vertical%20And%20Horizontal%20Modular%20Combination.webp`
      },
      {
        name: "96mm to 52mm Schematic Diagram",
        fileName: "96mm to 52mm Schematic Diagram.webp",
        url: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/96mm%20to%2052mm%20Schematic%20Diagram.webp`
      }
    ]
  },
  {
    id: "quick-release-jaws-vise",
    index: 2,
    name: "Quick Release Jaws Vise",
    folderName: "02 Quick Release Jaws Vise",
    coverImage: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: true,
    categories: [
      {
        id: "cp155130",
        name: "CP155130",
        images: [
          {
            name: "CP155130 (Round Base)",
            fileName: "CP155130(Round Base).webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/CP155130/CP155130(Round%20Base).webp`
          }
        ]
      },
      {
        id: "hp10077",
        name: "HP10077",
        images: [
          {
            name: "HP10077 (Steel Jaw)",
            fileName: "HP10077(Steel Jaw).webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP10077/HP10077(Steel%20Jaw).webp`
          },
          {
            name: "HP10077 (Aluminum Jaw)",
            fileName: "HP10077（Aluminum Jaw）.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP10077/HP10077%EF%BC%88Aluminum%20Jaw%EF%BC%89.webp`
          }
        ]
      },
      {
        id: "hp15077",
        name: "HP15077",
        images: [
          {
            name: "HP15077 (Aluminum Jaw)",
            fileName: "HP15077（Aluminum Jaw）.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP15077/HP15077%EF%BC%88Aluminum%20Jaw%EF%BC%89.webp`
          },
          {
            name: "HP15077 (Double)",
            fileName: "HP15077（Double).webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP15077/HP15077%EF%BC%88Double).webp`
          },
          {
            name: "HP15077 (Steel Jaw)",
            fileName: "HP15077（Steel Jaw）.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP15077/HP15077%EF%BC%88Steel%20Jaw%EF%BC%89.webp`
          }
        ]
      },
      {
        id: "hp155130",
        name: "HP155130",
        images: [
          {
            name: "HP155130 (Aluminum Jaw)",
            fileName: "HP155130(Aluminum Jaw).webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP155130/HP155130(Aluminum%20Jaw).webp`
          },
          {
            name: "HP155130 (Double)",
            fileName: "HP155130(Double).webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP155130/HP155130(Double).webp`
          },
          {
            name: "HP155130 (Steel Jaw)",
            fileName: "HP155130(Steel Jaw).webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP155130/HP155130(Steel%20Jaw).webp`
          }
        ]
      },
      {
        id: "hp255130",
        name: "HP255130",
        images: [
          {
            name: "HP255130 (With Base)",
            fileName: "HP255130（ With Base）.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP255130/HP255130%EF%BC%88%20With%20Base%EF%BC%89.webp`
          },
          {
            name: "HP255130 (Aluminum Jaw)",
            fileName: "HP255130（Aluminum Jaw）.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP255130/HP255130%EF%BC%88Aluminum%20Jaw%EF%BC%89.webp`
          },
          {
            name: "HP255130 (Double)",
            fileName: "HP255130（Double）.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP255130/HP255130%EF%BC%88Double%EF%BC%89.webp`
          },
          {
            name: "HP255130 (Steel Jaw)",
            fileName: "HP255130（Steel Jaw）.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP255130/HP255130%EF%BC%88Steel%20Jaw%EF%BC%89.webp`
          }
        ]
      },
      {
        id: "hp300160",
        name: "HP300160",
        images: [
          {
            name: "HP300160 (With Base)",
            fileName: "HP300160（ With Base）.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP300160/HP300160%EF%BC%88%20With%20Base%EF%BC%89.webp`
          },
          {
            name: "HP300160 (Aluminum Jaw)",
            fileName: "HP300160（Aluminum Jaw）.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP300160/HP300160%EF%BC%88Aluminum%20Jaw%EF%BC%89.webp`
          },
          {
            name: "HP300160 (Double)",
            fileName: "HP300160（Double）.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP300160/HP300160%EF%BC%88Double%EF%BC%89.webp`
          },
          {
            name: "HP300160 (Steel Jaw)",
            fileName: "HP300160（Steel Jaw）.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP300160/HP300160%EF%BC%88Steel%20Jaw%EF%BC%89.webp`
          }
        ]
      },
      {
        id: "accessory-series",
        name: "Accessory Series",
        images: [
          {
            name: "Aluminum Jaw Quick Release Kit",
            fileName: "Aluminum Jaw Quick Release Kit.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/Accessory%20Series/Aluminum%20Jaw%20Quick%20Release%20Kit.webp`
          },
          {
            name: "Aluminum Jaws",
            fileName: "Aluminum Jaws.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/Accessory%20Series/Aluminum%20Jaws.webp`
          },
          {
            name: "Quick Release Hardened Jaws",
            fileName: "Quick Release Hardened Jaws.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/Accessory%20Series/Quick%20Release%20Hardened%20Jaws.webp`
          },
          {
            name: "Screw Kit",
            fileName: "Screw Kit.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/Accessory%20Series/Screw%20Kit.webp`
          }
        ]
      },
      {
        id: "vise-operating-instructions",
        name: "Vise Operating Instructions",
        images: [
          {
            name: "Aluminum Soft Jaw",
            fileName: "Aluminum Soft Jaw.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/Vise%20Operating%20Instructions/Aluminum%20Soft%20Jaw.webp`
          },
          {
            name: "Double Station Vice",
            fileName: "Double Station Vice .webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/Vise%20Operating%20Instructions/Double%20Station%20Vice%20.webp`
          },
          {
            name: "Install Jaws In Reverse",
            fileName: "Install Jaws In Reverse.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/Vise%20Operating%20Instructions/Install%20Jaws%20In%20Reverse.webp`
          },
          {
            name: "Quick Release Aluminum Jaw Installation Diagram",
            fileName: "Quick Release Aluminum Jaw Installation Diagram.webp",
            url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/Vise%20Operating%20Instructions/Quick%20Release%20Aluminum%20Jaw%20Installation%20Diagram.webp`
          }
        ]
      }
    ]
  },
  // 其他产品配置...
  {
    id: "manual-vise-series",
    index: 3,
    name: "Manual Vise Series",
    folderName: "03 Manual Vise Series",
    coverImage: `${COS_BASE_URL}/03%20Manual%20Vise%20Series/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "pneumatic-vise-pressurization",
    index: 4,
    name: "Pneumatic Vise Series(With Pressurization",
    folderName: "04 Pneumatic Vise Series(With Pressurization",
    coverImage: `${COS_BASE_URL}/04%20Pneumatic%20Vise%20Series%28With%20Pressurization/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "pneumatic-vise-pneumatic",
    index: 5,
    name: "Pneumatic Vise Series(Pneumatic Type",
    folderName: "05 Pneumatic Vise Series(Pneumatic Type",
    coverImage: `${COS_BASE_URL}/05%20Pneumatic%20Vise%20Series%28Pneumatic%20Type/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "zero-point-aluminum",
    index: 6,
    name: "Zero Point Clamping(Aluminum Base",
    folderName: "06 Zero Point Clamping(Aluminum Base",
    coverImage: `${COS_BASE_URL}/06%20Zero%20Point%20Clamping%28Aluminum%20Base/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "zero-point-steel",
    index: 7,
    name: "Zero Point Clamping(Steel Base)",
    folderName: "07 Zero Point Clamping(Steel Base)",
    coverImage: `${COS_BASE_URL}/07%20Zero%20Point%20Clamping%28Steel%20Base%29/%E5%B0%81%E9%9D%A2%E5%9B%BE/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "high-precision-zero-point",
    index: 8,
    name: "High Precision Zero Point Clamping",
    folderName: "08 High Precision Zero Point Clamping",
    coverImage: `${COS_BASE_URL}/08%20High%20Precision%20Zero%20Point%20Clamping/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "high-precision-pneumatic-zero",
    index: 9,
    name: "High Precision Pneumatic Zero Point Clamping",
    folderName: "09.High Precision Pneumatic Zero Point Clamping",
    coverImage: `${COS_BASE_URL}/09.High%20Precision%20Pneumatic%20Zero%20Point%20Clamping/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "pull-studs-series",
    index: 10,
    name: "Pull Studs Series",
    folderName: "10 Pull Studs Series",
    coverImage: `${COS_BASE_URL}/10%20Pull%20Studs%20Series/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "dovetail-fixture",
    index: 11,
    name: "Dovetail Fixture",
    folderName: "11 Dovetail Fixture",
    coverImage: `${COS_BASE_URL}/11%20Dovetail%20Fixture/%E5%B0%81%E9%9D%A2%E5%9B%BE/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "er-clamping-series",
    index: 12,
    name: "ER Clamping Series",
    folderName: "12 ER Clamping Series",
    coverImage: `${COS_BASE_URL}/12%20ER%20Clamping%20Series/12%20ER%20Clamping%20Series/%E5%B0%81%E9%9D%A2%E5%9B%BE/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "modular-combination",
    index: 13,
    name: "Modular Combination Series",
    folderName: "13 Modular Combination Series",
    coverImage: `${COS_BASE_URL}/13%20Modular%20Combination%20Series/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "modular-set-series",
    index: 14,
    name: "Modular Set Series",
    folderName: "14 Modular Set Series",
    coverImage: `${COS_BASE_URL}/14%20Modular%20Set%20Series/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "bridge-plate-series",
    index: 15,
    name: "Bridge Plate Series",
    folderName: "15 L Bridge Plate Series",
    coverImage: `${COS_BASE_URL}/15%20L%20Bridge%20Plate%20Series/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "5axis-pyramid-series",
    index: 16,
    name: "5Axis Pyramid Series",
    folderName: "16 5Axis Pyramid Series",
    coverImage: `${COS_BASE_URL}/16%205Axis%20Pyramid%20Series/%E5%B0%81%E9%9D%A2%E5%9B%BE/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "run-out-tester",
    index: 17,
    name: "Run_out Tester",
    folderName: "17 Run_out Tester",
    coverImage: `${COS_BASE_URL}/17%20Run_out%20Tester/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "unilateral-positione",
    index: 18,
    name: "Unilateral Positione",
    folderName: "18 Unilateral Positione",
    coverImage: `${COS_BASE_URL}/18%20Unilateral%20Positione/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "cnc-tombstone-series",
    index: 19,
    name: "CNC Tombstone Series",
    folderName: "19 CNC Tombstone Series",
    coverImage: `${COS_BASE_URL}/19%20CNC%20Tombstone%20Series/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "precision-bench-vice",
    index: 20,
    name: "Precision Bench Vice",
    folderName: "20 Precision Bench Vice",
    coverImage: `${COS_BASE_URL}/20%20Precision%20Bench%20Vice/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "hydraulic-bite-machine",
    index: 21,
    name: "Hydraulic Bite Machine",
    folderName: "21 Hydraulic Bite Machine",
    coverImage: `${COS_BASE_URL}/21%20Hydraulic%20Bite%20Machine/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  },
  {
    id: "pneumatic-single-hole-zero",
    index: 22,
    name: "Pneumatic Single Hole Zero Plate Series",
    folderName: "22 Pneumatic Single Hole Zero Plate Series",
    coverImage: `${COS_BASE_URL}/22%20Pneumatic%20Single%20Hole%20Zero%20Plate%20Series/%E5%B0%81%E9%9D%A2/cover.webp`,
    hasCategories: false,
    images: []
  }
];

// 辅助函数：根据ID获取产品
export function getProductById(id: string): Product | undefined {
  return productsConfig.find(p => p.id === id);
}

// 辅助函数：获取所有产品
export function getAllProducts(): Product[] {
  return productsConfig;
}

// 辅助函数：根据产品ID和分类ID获取分类
export function getCategoryById(productId: string, categoryId: string): ProductCategory | undefined {
  const product = getProductById(productId);
  if (!product || !product.hasCategories || !product.categories) {
    return undefined;
  }
  return product.categories.find(c => c.id === categoryId);
}
