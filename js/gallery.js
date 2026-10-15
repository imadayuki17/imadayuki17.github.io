const galleryImages = document.querySelectorAll('.gallery-image img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

// 画像をクリックしたら拡大表示
galleryImages.forEach(img => {
	img.addEventListener('click', () => {
		lightboxImage.src = img.src;
		lightboxImage.alt = img.alt;
		lightbox.classList.add('active');
	});
});

// 閉じるボタンをクリック
lightboxClose.addEventListener('click', () => {
	lightbox.classList.remove('active');
});

// 背景部分をクリックして閉じる
lightbox.addEventListener('click', event => {
	if (event.target === lightbox) {
		lightbox.classList.remove('active');
	}
});

// Escapeキーで閉じる
document.addEventListener('keydown', event => {
	if (event.key === 'Escape') {
		lightbox.classList.remove('active');
	}
});
