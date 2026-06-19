document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const companyInput = document.getElementById("company-input");
    const recipientInput = document.getElementById("recipient-input");
    const rolePresetSelect = document.getElementById("role-preset");
    
    const docDateDisplay = document.getElementById("doc-date-display");
    const docRecDisplay = document.getElementById("doc-rec-display");
    const docCompDisplay = document.getElementById("doc-comp-display");
    const docBodyDisplay = document.getElementById("doc-body-display");
    
    const videoMock = document.querySelector(".video-mock-container");
    const videoModal = document.getElementById("video-modal");
    const closeVideoModal = document.getElementById("close-video-modal");

    // Set today's date in letter
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    docDateDisplay.textContent = new Date().toLocaleDateString('en-US', options);

    // Letter Content Templates
    const templates = {
        developer: `
            <p>Dear <span class="highlight-text" id="body-rec-display">Hiring Team</span>,</p>
            
            <p>I am writing to express my interest in joining <span class="highlight-text" id="body-comp-display">Tech Innovators</span> as a Systems Developer. As a General Bachelor of Arts student at Wilfrid Laurier University specializing in Computer Science coursework, my background focuses on the intersection of low-level systems engineering, real-time graphics rendering, and professional media delivery.</p>
            
            <p>During my time at Laurier and throughout my freelance career—which includes delivering over 1,400+ custom technical orders to global clients and generating \$30K+ in revenue—I have consistently pursued systems-level complexity. I engineered a real-time 3D OpenGL rendering engine in C++ incorporating GLSL programmable shader pipelines, index buffer optimizations, and Assimp model parsing. Additionally, I built a 2D space shooter engine in C++20 using SFML and CMake, compiled directly to run in modern browsers via Emscripten and WebAssembly.</p>
            
            <p>With my dual US/Canada citizenship, I require zero visa sponsorship and am ready to relocate immediately. I would welcome the opportunity to discuss how my systems engineering skillset can add value to the development team at <span class="highlight-text" id="body-comp-display2">Tech Innovators</span>.</p>
            
            <p>Thank you for your time and consideration.</p>
        `,
        web_designer: `
            <p>Dear <span class="highlight-text" id="body-rec-display">Hiring Team</span>,</p>
            
            <p>I am writing to express my strong interest in the E-Commerce Website Designer & Administrator position at <span class="highlight-text" id="body-comp-display">Tech Innovators</span>. Combining front-end coding capabilities with extensive multimedia and graphic design experience, I specialize in designing and maintaining responsive e-commerce layouts that drive customer conversion and elevate brand identity.</p>
            
            <p>During my freelance career, I successfully designed e-commerce assets, visual layouts, and promotional graphics for a global clientele, completing over 1,400 orders with a 4.8/5-star rating. I am highly proficient in HTML, CSS, responsive design principles, and content management systems like Shopify. Additionally, my university coursework in Computer Science at Wilfrid Laurier University gives me a solid technical foundation in website performance, SEO best practices, and database structures (SQLite/SQL), ensuring your online store runs fast, ranks highly, and functions flawlessly across desktop, tablet, and mobile devices.</p>
            
            <p>As a dual US/Canada citizen requiring zero sponsorship, I am available to work in-person and relocate immediately. I would welcome the opportunity to discuss how my web design, graphic expertise (Photoshop, Illustrator, Blender), and digital marketing knowledge can support the retail growth of <span class="highlight-text" id="body-comp-display2">Tech Innovators</span>.</p>
            
            <p>Thank you for your time and consideration.</p>
        `,
        analyst: `
            <p>Dear <span class="highlight-text" id="body-rec-display">Hiring Team</span>,</p>
            
            <p>I am writing to apply for the Data / Systems Analyst position at <span class="highlight-text" id="body-comp-display">Tech Innovators</span>. Combining an analytical mindset with intensive Computer Science coursework at Wilfrid Laurier University, I specialize in building data aggregation scripts, designing database schemas, and streamlining administrative workflows.</p>
            
            <p>As a freelance contractor, I successfully coordinated end-to-end task tracking and operational metrics for 1,400+ distinct customer deliverables. To optimize my own job hunting and research pipelines, I engineered <strong>JobScanner Pro</strong>, an automated data crawling tool built in Python and Playwright that aggregates listings into structured SQLite databases with custom deduplication filters. My systems-oriented background allows me to audit spreadsheets, verify configurations, and parse complex technical datasets into clear, actionable operations.</p>
            
            <p>Holding dual US/Canada citizenship, I am available to relocate immediately without any visa requirements. I look forward to discussing how my database, Python scripting, and workflow optimization skills can support the operational efficiency of <span class="highlight-text" id="body-comp-display2">Tech Innovators</span>.</p>
            
            <p>Thank you for your time and consideration.</p>
        `,
        journalist: `
            <p>Dear <span class="highlight-text" id="body-rec-display">Hiring Team</span>,</p>
            
            <p>I am writing to apply for the Tech Journalist / Content Specialist role at <span class="highlight-text" id="body-comp-display">Tech Innovators</span>. I bridge the gap between technical complexity and visual storytelling, merging a university Computer Science background with professional media editing, videography, and 3D design.</p>
            
            <p>As the Lead Videographer for Wilfrid Laurier University Athletics, I oversaw video capture, scriptwriting, and editing (Premiere/Resolve) for sports and promotional media. Concurrently, as a freelance creative contractor, I delivered over 1,400 orders of custom digital media and 3D Blender models. Because I build graphics rendering pipelines and WebAssembly programs myself, I possess the technical literacy to write, present, and explain complex software, graphics engines, and developer tools in a compelling, structured format for public audiences.</p>
            
            <p>I am a dual US/Canada citizen, ready to relocate immediately. I would love to connect and share how my technical-creative background can tell the stories of the innovations happening at <span class="highlight-text" id="body-comp-display2">Tech Innovators</span>.</p>
            
            <p>Thank you for your time and consideration.</p>
        `,
        labourer: `
            <p>Dear <span class="highlight-text" id="body-rec-display">Hiring Team</span>,</p>
            
            <p>I am writing to apply for the Event Crew / Production Assistant position at <span class="highlight-text" id="body-comp-display">Tech Innovators</span>. I offer a strong work ethic, physical stamina, and extensive hands-on experience setting up complex equipment and staging logistics in fast-paced athletics environments.</p>
            
            <p>During my three years as an Athletics Production Assistant at Wilfrid Laurier University, I was responsible for transporting, assembling, and securing heavy video, lighting, and audio equipment on-site for sports matches. I am highly accustomed to standing for long shifts, lifting up to 50 lbs, conducting routine safety checks on rigging, and collaborating under tight timelines. My freelance background demonstrates my absolute reliability, punctuality, and self-discipline.</p>
            
            <p>As a dual US/Canada citizen, I am available for work immediately and look forward to contributing my physical coordination, focus, and reliability to the event crew at <span class="highlight-text" id="body-comp-display2">Tech Innovators</span>.</p>
            
            <p>Thank you for your time and consideration.</p>
        `,
        volunteer: `
            <p>Dear <span class="highlight-text" id="body-rec-display">Hiring Team</span>,</p>
            
            <p>I am writing to express my interest in joining <span class="highlight-text" id="body-comp-display">Tech Innovators</span> as a Tech Support or Digital Literacy Volunteer. I am eager to contribute my technical background and communication experience to support your community programs.</p>
            
            <p>As a Digital Literacy Support Volunteer, I have guided seniors and local community members through configuring device settings, setting up secure accounts, and learning browser safety in patient, non-technical terms. My customer-facing freelance career (delivering 1,400+ custom orders with a 4.8/5-star rating) has refined my active listening and helpful client relations. I am passionate about digital inclusion and helping users navigate device hardware and software troubleshooting with confidence.</p>
            
            <p>I look forward to discussing how I can volunteer my time, patience, and tech skills to support <span class="highlight-text" id="body-comp-display2">Tech Innovators</span>.</p>
            
            <p>Thank you for your time and dedication to our community.</p>
        `
    };

    // Render active letter template
    function updateLetter() {
        const role = rolePresetSelect.value;
        const company = companyInput.value.trim() || "Tech Innovators";
        const recipient = recipientInput.value.trim() || "Hiring Team";

        // Inject template body
        docBodyDisplay.innerHTML = templates[role] || templates.developer;

        // Synchronize all dynamic text displays
        docCompDisplay.textContent = company;
        docRecDisplay.textContent = recipient;

        const bodyRec = document.getElementById("body-rec-display");
        const bodyComp = document.getElementById("body-comp-display");
        const bodyComp2 = document.getElementById("body-comp-display2");

        if (bodyRec) bodyRec.textContent = recipient;
        if (bodyComp) bodyComp.textContent = company;
        if (bodyComp2) bodyComp2.textContent = company;
    }

    // Input Event Bindings
    companyInput.addEventListener("input", updateLetter);
    recipientInput.addEventListener("input", updateLetter);
    rolePresetSelect.addEventListener("change", updateLetter);

    // Initial render
    updateLetter();

    // Video Pitch Modal Event Listeners
    if (videoMock && videoModal) {
        videoMock.addEventListener("click", () => {
            videoModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }

    if (closeVideoModal && videoModal) {
        closeVideoModal.addEventListener("click", () => {
            videoModal.classList.remove("active");
            document.body.style.overflow = "";
        });
        
        videoModal.addEventListener("click", (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }
});
