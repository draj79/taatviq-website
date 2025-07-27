const products = {
    spark: {
        img: '/assets/image/spark.png',
        title: 'TaatvIQ Spark',
        desc: 'TaatvIQ Spark is the foundational offering in the TaatvIQ product suite, designed as an ' +
          'easy entry point for organizations beginning their data intelligence journey. It provides ' +
          'core capabilities for data ingestion, handling, management, and storage, enabling businesses ' +
          'to establish a clean, scalable data pipeline with minimal friction.\n'+
          'Spark includes an intuitive analytics layer that translates raw data into meaningful insights, ' +
          'empowering businesses to identify inefficiencies, fix operational issues, and boost productivity. ' +
          'With built-in alerting and reporting features, Spark ensures stakeholders are continuously informed ' +
          'and ready to act on emerging trends or anomalies.',
        benefits: [
          "Rapid deployment with minimal configuration required",
          "Seamless integration for unified data ingestion and scalable storage",
          "Operational insights delivered through an intuitive analytics dashboard — supporting both real-time and historical data views",
          "Built-in alerting and reporting tools to keep stakeholders informed and responsive"
        ]
    },
    vision: {
        img: '/assets/image/vision.png',
        title: 'TaatvIQ Vision',
        desc: 'TaatvIQ Vision is the next evolution beyond Spark, designed for businesses ready to transform ' +
          'raw analytics into predictive and prescriptive intelligence. Building on robust data management and analytics ' +
          'foundations, Vision introduces machine learning capabilities that uncover patterns, anticipate trends, and ' +
          'guide operational decisions in real time.\n' +
          'With advanced pattern recognition, anomaly detection, and forecasting models, Vision helps organizations ' +
          'identify subtle signals in data that might otherwise be missed — from shifting customer behavior to supply ' +
          'chain inefficiencies. Vision empowers teams with automated decision support, reducing the need for constant ' +
          'manual analysis and enabling faster response to emerging opportunities or risks.',
        benefits: [
          "Transforms traditional analytics into predictive and prescriptive intelligence using machine learning models",
          "Detects subtle patterns and anomalies in large datasets to uncover emerging risks or opportunities before they escalate",
          "Delivers accurate forecasts and simulations to support strategic and operational planning",
          "Reduces dependency on manual analysis by enabling automated, data-driven recommendations"
        ]
    },
    quantum: {
        img: '/assets/image/quantum.png',
        title: 'TaatvIQ Quantum',
        desc: 'TaatvIQ Quantum is the pinnacle of the TaatvIQ suite, designed for enterprises seeking cutting-edge ' +
            'intelligence at scale. Going beyond predictive analytics and operational automation, Quantum leverages ' +
            'generative AI, autonomous reasoning models, and multi-modal data understanding to drive strategic decision-making ' +
            'without human-in-the-loop dependencies.\n' +
            'Quantum synthesizes data from diverse sources — structured, unstructured, visual, behavioral — to ' +
            'generate context-aware insights, simulate business outcomes, and even propose optimal courses of action. ' +
            'With capabilities like natural language query interfaces, self-evolving models, and intelligent scenario ' +
            'simulation, it transforms decision support into decision autonomy.',
          benefits: [
            "Delivers autonomous decision-making capabilities through generative AI and reasoning-based models",
            "Synthesizes structured, unstructured, behavioral, and visual data to provide holistic, context-aware insights",
            "Learns and adapts continuously through self-evolving models, improving accuracy and relevance over time",
            "Enables natural language interaction with data, allowing stakeholders to query insights without technical expertise"
          ]
    }
};

function showProduct(productKey, buttonElement = null) {
    const { img, title, desc } = products[productKey];
    const formattedDesc = desc.replace(/\n/g, '<br><br>');
    const titleHTML = title;

    // Conditionally embed link for Spark only
    // const titleHTML = productKey === 'spark'
    //     ? `<a href="https://analytics.taatviqai.com/" target="_blank" rel="noopener">${title}</a>`
    //     : title;

    // Set title and image
    document.getElementById('product-title').innerHTML = titleHTML;
    const imgEl = document.getElementById('product-img');
    imgEl.src = img;
    imgEl.alt = title;
  
    // Generate HTML for benefits
    let benefitsHTML = '';
    if (products[productKey].benefits && products[productKey].benefits.length) {
        benefitsHTML = `
            <div class="product-benefits">
                <h3>Key Benefits</h3>
                <div class="benefit-card">
                    ${products[productKey].benefits.map(benefit => `
                        <div class="benefit-card">${benefit}</div> 
                    `).join('')}
                </div>
            </div>`;
    }
  
    // Inject description and benefits
    document.getElementById('product-text-content').innerHTML = `
        <p>${formattedDesc}</p>
        ${benefitsHTML}
    `;

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
