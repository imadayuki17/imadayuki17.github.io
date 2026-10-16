const centerColumn = document.querySelector('.center-column');
const leftColumn = document.querySelector('.left-column');
const rightColumn = document.querySelector('.right-column');

let targetScroll = 0;
let animationFrameId = null;

function animateScroll() {
	const current = centerColumn.scrollTop;
	const difference = targetScroll - current;

	if (Math.abs(difference) < 1) {
		centerColumn.scrollTop = targetScroll;
		animationFrameId = null;
		return;
	}

	centerColumn.scrollTop = current + difference * 0.25;
	animationFrameId = requestAnimationFrame(animateScroll);
}

// 左右カラムのホイール操作だけ中央へ渡す
[leftColumn, rightColumn].forEach(column => {
	column.addEventListener('wheel', event => {
		event.preventDefault();

		if (animationFrameId === null) {
			targetScroll = centerColumn.scrollTop;
		}

		targetScroll += event.deltaY;

		const maxScroll =
			centerColumn.scrollHeight - centerColumn.clientHeight;

		targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

		if (animationFrameId === null) {
			animationFrameId = requestAnimationFrame(animateScroll);
		}
	}, { passive: false });
});

// 中央カラムを直接ホイール操作したら、アニメーションを解除
centerColumn.addEventListener('wheel', () => {
	if (animationFrameId !== null) {
		cancelAnimationFrame(animationFrameId);
		animationFrameId = null;
	}
	targetScroll = centerColumn.scrollTop;
}, { passive: true });

// ナビゲーションはスムーズに移動
document.querySelectorAll('.navi a').forEach(link => {
	link.addEventListener('click', event => {
		const target = document.querySelector(link.getAttribute('href'));
		if (!target) return;

		event.preventDefault();

		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		const top =
			target.getBoundingClientRect().top -
			centerColumn.getBoundingClientRect().top +
			centerColumn.scrollTop - 20;

		targetScroll = top;

		centerColumn.scrollTo({
			top: top,
			behavior: 'smooth'
		});

		history.replaceState(null, '', link.getAttribute('href'));
	});
});

const highlightText = document.querySelector('.highlight-on-scroll');

if (highlightText && centerColumn) {
	const highlightObserver = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						highlightText.classList.add('active');
					}, 700);

					highlightObserver.unobserve(highlightText);
				}
			});
		},
		{
			root: centerColumn,
			threshold: 0.1
		}
	);

	highlightObserver.observe(highlightText);
}
