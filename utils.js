const products = {
    spark: {
        img: 'https://draj79.github.io/taatviq-website/assets/image/spark.png',
        title: 'TaatvIQ Spark',
        desc: 'TaatvIQ Spark is the foundational offering in the TaatvIQ product suite, designed as an ' +
            'easy entry point for organizations beginning their data intelligence journey. It provides ' +
            'core capabilities for data ingestion, handling, management, and storage, enabling businesses ' +
            'to establish a clean, scalable data pipeline with minimal friction.\n'+
            'Spark includes an intuitive analytics layer that translates raw data into meaningful insights, ' +
            'empowering businesses to identify inefficiencies, fix operational issues, and boost productivity. ' +
            'With built-in alerting and reporting features, Spark ensures stakeholders are continuously informed ' +
            'and ready to act on emerging trends or anomalies.'
    },
    vision: {
        img: 'assets/image/vision.png',
        title: 'TaatvIQ Vision',
        desc: 'TaatvIQ Vision is the next evolution beyond Spark, designed for businesses ready to transform ' +
            'raw analytics into predictive and prescriptive intelligence. Building on robust data management and analytics ' +
            'foundations, Vision introduces machine learning capabilities that uncover patterns, anticipate trends, and ' +
            'guide operational decisions in real time.\n' +
            'With advanced pattern recognition, anomaly detection, and forecasting models, Vision helps organizations ' +
            'identify subtle signals in data that might otherwise be missed — from shifting customer behavior to supply ' +
            'chain inefficiencies. Vision empowers teams with automated decision support, reducing the need for constant ' +
            'manual analysis and enabling faster response to emerging opportunities or risks.'
    },
    quantum: {
        img: 'assets/image/quantum.png',
        title: 'TaatvIQ Quantum',
        desc: 'TaatvIQ Quantum is the pinnacle of the TaatvIQ suite, designed for enterprises seeking cutting-edge ' +
            'intelligence at scale. Going beyond predictive analytics and operational automation, Quantum leverages ' +
            'generative AI, autonomous reasoning models, and multi-modal data understanding to drive strategic decision-making ' +
            'without human-in-the-loop dependencies.\n' +
            'Quantum synthesizes data from diverse sources — structured, unstructured, visual, behavioral — to ' +
            'generate context-aware insights, simulate business outcomes, and even propose optimal courses of action. ' +
            'With capabilities like natural language query interfaces, self-evolving models, and intelligent scenario ' +
            'simulation, it transforms decision support into decision autonomy.'
    }
};

function showProduct(productKey, buttonElement = null) {
    const { img, title, desc } = products[productKey];
    const formattedDesc = desc.replace(/\n/g, '<br><br>');
    document.getElementById('product-img').src = img;
    document.getElementById('product-img').alt = title;
    document.getElementById('product-desc').innerHTML = `<h2>${title}</h2><p>${formattedDesc}</p>`;

    // Update active button only if clicked from main buttons (not dropdown)
    document.querySelectorAll('.product-buttons button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.product === productKey);
    });

    if (buttonElement) {
    buttonElement.classList.add('active');
    }
}

function scrollToSectionAfterLayout(sectionId, offset = 100) {
    const targetEl = document.getElementById(sectionId);
    if (!targetEl) return;
  
    let resizeTimer;
  
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const y = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        observer.disconnect(); // stop observing once scroll is done
      }, 100); // wait 100ms after last layout change
    });
  
    observer.observe(document.body);
  }
  
  // On full load, check and scroll
  window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const sectionId = params.get('section');
    const product = params.get('product');
  
    if (sectionId) scrollToSectionAfterLayout(sectionId);
  
    if (product && typeof products !== 'undefined' && products[product]) {
      showProduct(product);
      const matchingBtn = document.querySelector(`.product-buttons button[data-product="${product}"]`);
      if (matchingBtn) matchingBtn.classList.add('active');
    }
  });
  
function navigateTo(sectionId, productKey = null) {
    localStorage.setItem('taatviq_scroll_to', sectionId);
    if (productKey) {
      localStorage.setItem('taatviq_selected_product', productKey);
    }
  
    // Smart redirect based on current link
    if (sectionId === 'contact') window.location.href = '../contact/';
    else if (sectionId === 'analytics') window.location.href = '../demo/';
    else window.location.href = '../products/';
  }  
