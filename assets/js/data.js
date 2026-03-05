/**
 * DATA PORTFOLIO — data.js
 * Professional Portfolio — Data Analyst | Automation & AI-driven Operations
 */

// ── Projects Data ────────────────────────────────────────────
const PROJECTS = [
    {
        id: 'product-delivery',
        category: 'bi',
        categoryLabel: 'BI & Analytics',
        featured: true,
        title: 'Product Delivery Analytics',
        problem: 'KPIM Mall retail operations needed insights into sales performance, delivery operations, and customer behavior across regions.',
        desc: 'Developed a Power BI analytics dashboard for KPIM Mall retail operations, providing interactive reports on day/month levels, individual products, regions, and customers. The dashboard recorded a $6 million revenue in December 2016.',
        solution: 'Built Power BI reports extracting and transforming data via Power Query, providing a comprehensive overview of the delivery process.',
        impacts: ['$6M Dec 2016 Revenue Tracked', 'Delivery Process Overview', 'Insights for Sales Performance'],
        tools: ['Power BI', 'Power Query', 'Data Modeling', 'Excel'],
        duration: '2022 - 2024',
        icon: '🚚',
        color: '#7c5cfc',
        pageId: null,
        images: [
            'assets/img/projects/Product Delivery Project.jpg',
            'assets/img/projects/Product Delivery Project_2.jpg',
            'assets/img/projects/Product Delivery Project_3.jpg'
        ],
        powerbiLink: '',
        docs: [],
        sampleData: ''
    },
    {
        id: 'rfm-segmentation',
        category: 'bi',
        categoryLabel: 'Customer Analytics',
        featured: true,
        title: 'RFM Customer Segmentation',
        problem: 'Need for data-driven marketing strategies and identification of high-value customer segments in e-commerce.',
        desc: 'Designed RFM-based customer segmentation models to analyze customer behavior across recency, frequency, and monetary dimensions.',
        solution: 'Built scoring models using data analytics to enable targeted marketing strategies by identifying high-value customer segments.',
        impacts: ['Enabled Data-driven Marketing', 'Targeted High-value Segments', 'Behavioral Analysis'],
        tools: ['Power BI', 'Customer Segment Models', 'Data Modeling'],
        duration: '2024 - Present',
        icon: '🎯',
        color: '#00d4ff',
        pageId: null,
        images: ['assets/img/projects/RFM segmentation.jpg'],
        powerbiLink: '',
        docs: [],
        sampleData: ''
    },
    {
        id: 'aol-project',
        category: 'bi',
        categoryLabel: 'Retail Dashboards',
        featured: true,
        title: 'AOL Retail Dashboard',
        problem: 'A retail business in the Philippines handling 1,000+ daily orders needed comprehensive reporting across sales, marketing, and finance.',
        desc: 'Utilized Power BI to develop reports including sales management, marketing costs, and financial reports. Handled approximately 1,000+ daily orders.',
        solution: 'Implemented real-time data pipelines providing updates four times per day for all critical business reports.',
        impacts: ['1,000+ Daily Orders Tracked', '4x Daily Real-time Updates', 'Cross-department Views'],
        tools: ['Power BI', 'Real-time Data', 'Dashboards'],
        duration: 'May 2022 - Dec 2022',
        icon: '🛍️',
        color: '#f59e0b',
        pageId: null,
        images: ['assets/img/projects/AOL Retail Dashboard.jpg'],
        powerbiLink: '',
        docs: [],
        sampleData: ''
    },
    {
        id: 'hr-management',
        category: 'bi',
        categoryLabel: 'HR Analytics',
        featured: false,
        title: 'HR Management Dashboard',
        problem: 'HR needed insights for effective employee management planning and tracking.',
        desc: 'Transformed data using Power Query and created HR Management reports using Power BI to provide insights to the HR manager.',
        solution: 'End-to-end data pipeline from raw HR files to interactive Power BI report.',
        impacts: ['Streamlined HR Planning', 'Actionable Insights for Managers'],
        tools: ['Power BI', 'Power Query', 'Excel'],
        duration: '2022 - 2024',
        icon: '👥',
        color: '#10b981',
        pageId: null,
        images: ['assets/img/projects/HR Management Project.jpg'],
        powerbiLink: '',
        docs: [],
        sampleData: ''
    },
    {
        id: 'pvi-am-portfolio',
        category: 'automation',
        categoryLabel: 'Financial Data Systems',
        featured: false,
        title: 'PVI AM Investment Portfolio',
        problem: 'Need for a structured financial data system to manage complex investment portfolio data including bonds, equities, and deposits.',
        desc: 'Designed a structured financial data system using SharePoint Lists (30+ relational tables). Developed Power BI reporting framework with centralized calculation logic.',
        solution: 'Implemented automated workflows using Power Automate to streamline internal processes and improve data governance.',
        impacts: ['30+ Relational Tables', 'Centralized Calculation', 'Improved Data Governance'],
        tools: ['SharePoint', 'Power Automate', 'Power BI'],
        duration: '2022 - 2024',
        icon: '📈',
        color: '#f59e0b',
        pageId: null,
        images: [],
        powerbiLink: '',
        docs: [],
        sampleData: ''
    },
    {
        id: 'ecommerce-bi-architecture',
        category: 'architecture',
        categoryLabel: 'Data Architecture',
        featured: false,
        title: 'E-commerce BI Architecture',
        problem: 'Fragmented operational data across POS, SharePoint, and CRM caused scaling issues. Marketing needed real-time campaign monitoring.',
        desc: 'Designed a scalable BI architecture integrating POS, SharePoint, and CRM via APIs. Built reports supporting nearly 100 marketing staff to monitor campaign performance, return rates, and SKU profitability.',
        solution: 'Built a star-schema data model (7+ fact tables) and an automated KPI monitoring system triggering real-time alerts via Lark and Telegram.',
        impacts: ['Supported ~100 Staff', 'Analyzed 5,000+ SKUs', 'Alerts via Lark & Telegram'],
        tools: ['Power BI', 'Star Schema', 'Lark / Telegram', 'APIs'],
        duration: '2024 - Present',
        icon: '⚙️',
        color: '#7c5cfc',
        pageId: null,
        images: ['assets/img/projects/E-commerce BI Architecture.jpg'],
        powerbiLink: '',
        docs: [],
        sampleData: ''
    }
];

// ── Render Project Card ──────────────────────────────────────
function renderProjectCard(project) {
    var impactTags = project.impacts.map(function (i) {
        return '<span class="project-impact-tag">' + i + '</span>';
    }).join('');
    var toolTags = project.tools.map(function (t) {
        return '<span class="tag">' + t + '</span>';
    }).join('');
    var onClickAttr = project.pageId
        ? 'onclick="showProject(\'' + project.pageId + '\')"'
        : 'onclick="showToast(\'Full case study coming soon.\')"';
    var featuredBadge = project.featured
        ? '<div class="featured-banner" style="position:absolute;top:1rem;left:1rem">&#11088; Featured</div>'
        : '';

    var imgHtml = '';
    if (project.images && project.images.length > 0) {
        imgHtml = '<img src="' + project.images[0] + '" alt="' + project.title + '" style="width:100%;height:100%;object-fit:cover;border-radius:8px 8px 0 0;">';
    } else {
        imgHtml = '<div style="text-align:center"><div style="font-size:3rem;margin-bottom:.5rem;opacity:.8">' + project.icon + '</div><div style="display:inline-block;width:60px;height:3px;background:' + project.color + ';border-radius:2px;opacity:.6"></div></div>';
    }

    return '<div class="project-card project-item" data-category="' + project.category + '" style="flex-direction:column;display:flex">' +
        '<div class="project-card-img" style="background:linear-gradient(135deg,#060c1a,#0d1e3a)">' +
        '<div class="project-card-img-inner">' + imgHtml + '</div>' + featuredBadge +
        '</div>' +
        '<div class="project-card-body">' +
        '<div class="project-card-cat">' + project.categoryLabel + '</div>' +
        '<div class="project-card-title">' + project.title + '</div>' +
        '<p class="project-card-desc">' + project.desc + '</p>' +
        '<div class="project-card-impacts">' + impactTags + '</div>' +
        '<div class="project-card-footer">' +
        '<div class="project-tools">' + toolTags + '</div>' +
        '<a class="btn btn-secondary btn-sm" ' + onClickAttr + ' href="javascript:void(0)" style="flex-shrink:0">View &#8599;</a>' +
        '</div>' +
        '</div>' +
        '</div>';
}

// ── Render Projects ──────────────────────────────────────────
function renderFeaturedProjects() {
    var grid = document.getElementById('featured-projects-grid');
    if (!grid) return;
    var featured = PROJECTS.filter(function (p) { return p.featured; }).slice(0, 3);
    grid.innerHTML = featured.map(renderProjectCard).join('');
}

function renderAllProjects() {
    var grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = PROJECTS.map(renderProjectCard).join('');
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    renderFeaturedProjects();
    renderAllProjects();
});
