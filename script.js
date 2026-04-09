// ============================================================
//  script.js — Portfolio Raka Maulana Ramdani
//  Berisi: Navbar, Typing Effect, Mobile Menu,
//          Scroll Reveal, Skill Bar, Form Validasi
// ============================================================

// ===================== 1. MENUNGGU DOM SIAP =====================
// Semua kode dijalankan setelah seluruh HTML selesai dimuat.
document.addEventListener('DOMContentLoaded', () => {

  // ===================== 2. NAVBAR — SCROLL EFFECT =====================
  // Menambahkan class 'scrolled' pada navbar saat halaman di-scroll ke bawah.
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Juga perbarui link aktif & progress skill saat scroll
    setActiveNavLink();
    animateSkillBars();
    revealOnScroll();
  });


  // ===================== 3. SMOOTH SCROLL — NAVIGASI =====================
  // Saat link nav di-klik, scroll halus ke section yang dituju.
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Cegah lompat tiba-tiba

      const targetId = link.getAttribute('href');       // Contoh: "#about"
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navHeight = navbar.offsetHeight;
        // Hitung posisi section dikurangi tinggi navbar agar tidak tertutup
        const offsetTop = targetSection.offsetTop - navHeight;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }

      // Tutup mobile menu setelah link di-klik
      closeMobileMenu();
    });
  });


  // ===================== 4. HIGHLIGHT NAV LINK AKTIF =====================
  // Menandai link nav sesuai section yang sedang terlihat di layar.
  function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = navbar.offsetHeight;

    sections.forEach(section => {
      const sectionTop    = section.offsetTop - navHeight - 60;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scrollY       = window.scrollY;

      // Cari link nav yang href-nya cocok dengan id section
      const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);

      if (correspondingLink) {
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          // Hapus .active dari semua link, lalu tambahkan ke yang aktif
          navLinks.forEach(l => l.classList.remove('active'));
          correspondingLink.classList.add('active');
        }
      }
    });
  }


  // ===================== 5. HAMBURGER / MOBILE MENU =====================
  const hamburgerBtn = document.getElementById('hamburger');
  const navLinksList = document.getElementById('navLinks');

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navLinksList.classList.contains('open');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Fungsi membuka menu mobile
  function openMobileMenu() {
    navLinksList.classList.add('open');
    hamburgerBtn.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  // Fungsi menutup menu mobile
  function closeMobileMenu() {
    navLinksList.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  // Tutup menu saat klik di luar area navbar
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      closeMobileMenu();
    }
  });


  // ===================== 6. TYPING EFFECT =====================
  // Menampilkan teks yang "diketik" secara bergantian di hero section.
  const typedTextEl = document.getElementById('typedText');

  // Daftar teks yang akan diputar bergantian
  const typingTexts = [
    'Web Developer 🌐',
    'Mobile Developer 📱',
    'Data Scientist 📊',
    'Cybersecurity Enthusiast 🔐',
    'Informatika Student 🎓'
  ];

  let textIndex  = 0;   // Indeks teks saat ini
  let charIndex  = 0;   // Indeks karakter saat ini dalam teks
  let isDeleting = false; // Sedang hapus atau ketik?

  function typeEffect() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
      // Mode hapus: kurangi satu karakter
      typedTextEl.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Mode ketik: tambah satu karakter
      typedTextEl.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 100; // Hapus lebih cepat dari ketik

    if (!isDeleting && charIndex === currentText.length) {
      // Teks selesai diketik, tunggu 1.5 detik lalu mulai hapus
      delay = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Teks habis dihapus, pindah ke teks berikutnya
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      delay = 300;
    }

    setTimeout(typeEffect, delay);
  }

  // Mulai typing effect
  typeEffect();


  // ===================== 7. SCROLL REVEAL ANIMATION =====================
  // Elemen dengan class .reveal akan muncul dengan animasi saat masuk viewport.
  const revealElements = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach((el, index) => {
      const elementTop = el.getBoundingClientRect().top;

      // Elemen terlihat jika posisinya 100px dari bawah layar
      if (elementTop < windowHeight - 100) {
        // Tambahkan delay bertahap untuk elemen yang berurutan dalam satu container
        const delay = (index % 4) * 100; // Delay 0, 100, 200, 300ms
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
      }
    });
  }

  // Jalankan sekali saat halaman dimuat (untuk elemen yang sudah terlihat)
  revealOnScroll();


  // ===================== 8. ANIMASI SKILL BAR =====================
  // Progress bar skill akan terisi saat section Skills terlihat di layar.
  const skillBars = document.querySelectorAll('.skill-fill');
  let skillsAnimated = false; // Flag agar animasi hanya jalan sekali

  function animateSkillBars() {
    if (skillsAnimated) return; // Jika sudah pernah dianimasikan, lewati

    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const sectionTop = skillsSection.getBoundingClientRect().top;

    // Jika section skills sudah terlihat (kurang dari 80% tinggi layar dari atas)
    if (sectionTop < window.innerHeight * 0.8) {
      skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width'); // Ambil nilai dari HTML
        bar.style.width = targetWidth + '%';                // Set lebar sesuai data
      });

      skillsAnimated = true; // Tandai sudah dianimasikan
    }
  }


  // ===================== 9. VALIDASI FORM KONTAK =====================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('submitBtn');

  // Input fields
  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Elemen pesan error
  const nameError    = document.getElementById('nameError');
  const emailError   = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // --- Helper: tampilkan pesan error ---
  function showError(inputEl, errorEl, message) {
    inputEl.classList.add('error');     // Border merah
    errorEl.textContent = message;      // Tampilkan pesan
  }

  // --- Helper: hapus pesan error ---
  function clearError(inputEl, errorEl) {
    inputEl.classList.remove('error');  // Hapus border merah
    errorEl.textContent = '';           // Kosongkan pesan
  }

  // --- Validasi real-time: bersihkan error saat user mulai mengetik ---
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length > 0) {
      clearError(nameInput, nameError);
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim().length > 0) {
      clearError(emailInput, emailError);
    }
  });

  messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length > 0) {
      clearError(messageInput, messageError);
    }
  });

  // --- Event submit form ---
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Cegah reload halaman

    // Ambil nilai input (hapus spasi di awal/akhir)
    const nameVal    = nameInput.value.trim();
    const emailVal   = emailInput.value.trim();
    const messageVal = messageInput.value.trim();

    let isValid = true; // Flag validasi keseluruhan

    // ---- Validasi Nama ----
    if (nameVal === '') {
      showError(nameInput, nameError, '⚠ Nama tidak boleh kosong.');
      isValid = false;
    } else if (nameVal.length < 3) {
      showError(nameInput, nameError, '⚠ Nama minimal 3 karakter.');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // ---- Validasi Email ----
    // Regex sederhana untuk cek format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailVal === '') {
      showError(emailInput, emailError, '⚠ Email tidak boleh kosong.');
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      showError(emailInput, emailError, '⚠ Format email tidak valid.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // ---- Validasi Pesan ----
    if (messageVal === '') {
      showError(messageInput, messageError, '⚠ Pesan tidak boleh kosong.');
      isValid = false;
    } else if (messageVal.length < 10) {
      showError(messageInput, messageError, '⚠ Pesan minimal 10 karakter.');
      isValid = false;
    } else {
      clearError(messageInput, messageError);
    }

    // ---- Jika semua valid, "kirim" form ----
    if (isValid) {
      // Tampilkan loading state pada tombol
      submitBtn.classList.add('btn-loading');
      submitBtn.querySelector('span').textContent = 'Mengirim...';

      // Simulasikan pengiriman (setTimeout menggantikan fetch ke server)
      setTimeout(() => {
        // Reset tombol
        submitBtn.classList.remove('btn-loading');
        submitBtn.querySelector('span').textContent = 'Kirim Pesan';

        // Tampilkan pesan sukses
        formSuccess.style.display = 'flex';

        // Reset form
        contactForm.reset();

        // Sembunyikan pesan sukses setelah 5 detik
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);

      }, 1500); // Simulasi delay 1.5 detik
    }
  });


  // ===================== 10. SCROLL KE ATAS (Back to Top) =====================
  // Membuat tombol "scroll to top" yang muncul saat user scroll jauh ke bawah.
  // (Tombol ini dibuat secara dinamis via JS, tidak perlu ditambah di HTML)
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.id = 'backToTop';

  // Style inline langsung dari JS
  Object.assign(backToTopBtn.style, {
    position:     'fixed',
    bottom:       '2rem',
    right:        '2rem',
    width:        '44px',
    height:       '44px',
    background:   '#2563eb',
    color:        'white',
    border:       'none',
    borderRadius: '50%',
    fontSize:     '1rem',
    cursor:       'pointer',
    display:      'none',       // Tersembunyi awalnya
    alignItems:   'center',
    justifyContent: 'center',
    boxShadow:    '0 4px 16px rgba(37,99,235,0.35)',
    transition:   'opacity 0.3s, transform 0.3s',
    zIndex:       '999'
  });

  document.body.appendChild(backToTopBtn);

  // Tampilkan tombol saat scroll > 400px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.display = 'flex';
      backToTopBtn.style.opacity = '1';
    } else {
      backToTopBtn.style.opacity = '0';
      setTimeout(() => {
        if (window.scrollY <= 400) {
          backToTopBtn.style.display = 'none';
        }
      }, 300);
    }
  });

  // Klik tombol: scroll ke atas
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Hover effect tombol back to top
  backToTopBtn.addEventListener('mouseover', () => {
    backToTopBtn.style.transform = 'translateY(-3px)';
    backToTopBtn.style.background = '#1d4ed8';
  });

  backToTopBtn.addEventListener('mouseout', () => {
    backToTopBtn.style.transform = 'translateY(0)';
    backToTopBtn.style.background = '#2563eb';
  });


  // ===================== 11. INISIALISASI =====================
  // Jalankan fungsi-fungsi yang perlu dipanggil saat halaman pertama dimuat.
  setActiveNavLink();
  animateSkillBars();

}); // Akhir DOMContentLoaded
