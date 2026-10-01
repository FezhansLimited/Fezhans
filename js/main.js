// Fezhans Agency Interactive JavaScript - Antigravity Blue Theme

let currentHeroSlide = 0;
const totalHeroSlides = 3;
let heroInterval;

document.addEventListener('DOMContentLoaded', () => {
  startHeroAutoPlay();
  updateRoiCalc();
});

// HERO CAROUSEL LOGIC
function setHeroSlide(index) {
  currentHeroSlide = index;

  // Update Backgrounds
  for (let i = 0; i < totalHeroSlides; i++) {
    const bg = document.getElementById(`hero-bg-${i}`);
    const content = document.getElementById(`hero-content-${i}`);
    if (bg && content) {
      if (i === index) {
        bg.classList.remove('opacity-0');
        bg.classList.add('opacity-100');
        content.classList.remove('hidden');
      } else {
        bg.classList.remove('opacity-100');
        bg.classList.add('opacity-0');
        content.classList.add('hidden');
      }
    }
  }

  // Update Indicator Bars (Antigravity Blue #1a73e8 - NO PILLS)
  const dots = document.querySelectorAll('.hero-dot');
  dots.forEach((dot, idx) => {
    if (idx === index) {
      dot.className = 'hero-dot w-6 h-2 rounded-sm bg-[#1a73e8] transition-all duration-300';
    } else {
      dot.className = 'hero-dot w-3 h-2 rounded-sm bg-white/40 hover:bg-white/70 transition-all duration-300';
    }
  });

  resetHeroAutoPlay();
}

function nextHeroSlide() {
  const next = (currentHeroSlide + 1) % totalHeroSlides;
  setHeroSlide(next);
}

function prevHeroSlide() {
  const prev = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
  setHeroSlide(prev);
}

function startHeroAutoPlay() {
  heroInterval = setInterval(() => {
    nextHeroSlide();
  }, 6000);
}

function resetHeroAutoPlay() {
  clearInterval(heroInterval);
  startHeroAutoPlay();
}

// TOP BAR & REGION SELECTOR
function dismissTopBar() {
  const bar = document.getElementById('top-bar');
  if (bar) {
    bar.style.display = 'none';
  }
}

function handleRegionChange() {
  const select = document.getElementById('country-select');
  const region = select ? select.options[select.selectedIndex].text : 'Selected Region';
  alert(`Region set to: ${region}. Currency & regional offerings updated for Fezhans.`);
}

// MOBILE MENU TOGGLE
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// INTERACTIVE ROI CALCULATOR
function updateRoiCalc() {
  const visitors = parseFloat(document.getElementById('calc-visitors').value) || 25000;
  const aov = parseFloat(document.getElementById('calc-aov').value) || 150;
  const currentConv = parseFloat(document.getElementById('calc-conv').value) || 1.2;

  // Format Labels
  document.getElementById('calc-visitors-val').innerText = visitors.toLocaleString();
  document.getElementById('calc-aov-val').innerText = '$' + aov.toLocaleString();
  document.getElementById('calc-conv-val').innerText = currentConv.toFixed(1) + '%';

  // Math Calculations
  const currentMonthlyOrders = (visitors * (currentConv / 100));
  const currentMonthlyRev = currentMonthlyOrders * aov;

  // Fezhans estimated conversion rate
  const fezhansConvRate = Math.min(currentConv * 2.2, 4.5);
  const fezhansMonthlyOrders = (visitors * (fezhansConvRate / 100));
  const fezhansMonthlyRev = fezhansMonthlyOrders * aov;

  const additionalRev = fezhansMonthlyRev - currentMonthlyRev;

  // Render Results
  document.getElementById('res-current-rev').innerText = '$' + Math.round(currentMonthlyRev).toLocaleString();
  document.getElementById('res-fezhans-rev').innerText = '$' + Math.round(fezhansMonthlyRev).toLocaleString();
  document.getElementById('res-additional').innerText = '+$' + Math.round(additionalRev).toLocaleString() + ' / mo';
}

// PORTFOLIO FILTER TABS (NO PILLS)
function filterPortfolio(category) {
  const items = document.querySelectorAll('.portfolio-item');
  const tabs = document.querySelectorAll('.portfolio-tab');

  tabs.forEach(tab => {
    if (tab.innerText.toLowerCase().includes(category) || (category === 'all' && tab.innerText.toLowerCase() === 'all')) {
      tab.className = 'portfolio-tab text-xs font-bold px-4 py-2 rounded-md bg-[#1a73e8] text-white shadow-xs transition';
    } else {
      tab.className = 'portfolio-tab text-xs font-bold px-4 py-2 rounded-md text-slate-600 hover:text-slate-900 transition';
    }
  });

  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// CONSULTATION MODAL
function openConsultationModal(serviceName = null) {
  const modal = document.getElementById('consult-modal');
  const select = document.getElementById('modal-service-select');
  const form = document.getElementById('consult-form');
  const success = document.getElementById('form-success');

  if (serviceName && select) {
    for (let option of select.options) {
      if (option.value.toLowerCase().includes(serviceName.toLowerCase()) || option.text.toLowerCase().includes(serviceName.toLowerCase())) {
        option.selected = true;
        break;
      }
    }
  }

  if (form && success) {
    form.classList.remove('hidden');
    success.classList.add('hidden');
  }

  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeConsultationModal() {
  const modal = document.getElementById('consult-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function handleConsultSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('consult-form');
  const success = document.getElementById('form-success');
  if (form && success) {
    form.classList.add('hidden');
    success.classList.remove('hidden');
  }
}
