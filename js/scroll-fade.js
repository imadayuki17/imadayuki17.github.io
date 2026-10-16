// IntersectionObserver でスクロール検知
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			// 要素が画面内に入ったとき
			if (entry.isIntersecting) {
				// 表示クラスを付与してフェードイン
				entry.target.classList.add('is-visible');
				// 一度表示したら監視を解除（パフォーマンス最適化）
				observer.unobserve(entry.target);
			}
		});
	},
	{
		// 要素が10%以上見えたら発火
		threshold: 0.1,
		// 画面下から100px手前で発火（早めのタイミング）
		rootMargin: '0px 0px -100px 0px',
	}
);

// .scroll-fade クラスを持つ全要素を監視対象に登録
document.querySelectorAll('.scroll-fade').forEach((el) => {
	observer.observe(el);
});