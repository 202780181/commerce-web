// API 请求函数
export async function fetchHomeData() {
  // 使用代理路径，避免混合内容问题
  const url = "/api/proxy/portal/home/index";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // 不缓存，每次都获取最新数据
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Home data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
}
