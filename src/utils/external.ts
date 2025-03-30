export async function fetchHitokoto() {
	const controller = new AbortController();
	try {
		const response = await fetch('https://v1.hitokoto.cn/?c=a&c&b&k', {
			signal: controller.signal,
		});
		const {
			hitokoto: hitokotoText,
			from: fromText,
			from_who: fromWhoText,
		} = await response.json();

		let hitokoto;
		if (fromWhoText != null) {
			hitokoto = `『${hitokotoText}』<br>——&nbsp;${fromWhoText}「${fromText}」`;
		} else {
			hitokoto = `『${hitokotoText}』<br>——「${fromText}」`;
		}

		return hitokoto;
	} catch (error) {
		if (error.name === 'AbortError') return '请求已取消';
		console.error('获取 hitokoto 时出错:', error);
		return '无法获取 hitokoto';
	} finally {
		controller.abort();
	}
}
