// ==================== 1. مراقبة التمرير (Scroll Event) ====================

// نقوم أولاً بجلب العناصر من الـ HTML وحفظها في متغيرات (Variables)
const header = document.getElementById('main-header');
const backToTopBtn = document.getElementById('back-to-top');

// نطلب من المتصفح أن يستمع لحركة التمرير (Scroll) وينفذ هذه الوظيفة في كل مرة
window.addEventListener('scroll', () => {
    
    // التحقق من المسافة التي نزلها المستخدم من الأعلى
    if (window.scrollY > 50) {
        // إذا نزل أكثر من 50 بكسل، نضيف كلاس 'scrolled' للـ Header لتطبيق التنسيق النحيف
        header.classList.add('scrolled');
        
        // ونضيف كلاس 'show' لزر العودة للأعلى لكي يظهر في زاوية الشاشة
        backToTopBtn.classList.add('show');
    } else {
        // إذا عاد المستخدم لأعلى الصفحة تماماً، نحذف الكلاسات ليعود كل شيء لحالته الطبيعية
        header.classList.remove('scrolled');
        backToTopBtn.classList.remove('show');
    }
});

// ==================== 2. برمجة نقرة زر العودة للأعلى ====================

// عندما يضغط (Click) المستخدم على الزر، ننفذ عملية الصعود
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // هذا السحر يجعل الصعود انسيابياً وناحماً وليس قفزة مفاجئة
    });
});

// ==================== 3. نظام تصفية المنيو (Menu Filtering) ====================

// 1. جلب جميع أزرار الفئات وجميع كروت الأطباق من الـ HTML
const categoryButtons = document.querySelectorAll('.btn-category');
const menuItems = document.querySelectorAll('.menu-item');

// 2. المرور على كل زر من الأزرار للاستماع لنقرة المستخدم
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        // أ) إزالة كلاس 'active' من الزر السابق وإضافته للزر الحالي الذي ضغطنا عليه
        document.querySelector('.btn-category.active').classList.remove('active');
        button.classList.add('active');
        
        // ب) الحصول على نوع الفلتر المخزن في خاصية (data-filter) للزر الحالي
        const filterValue = button.getAttribute('data-filter');
        
        // ج) التحكم في إظهار أو إخفاء الأطباق بناءً على الفلتر
        menuItems.forEach(item => {
            // إذا اختار المستخدم "الكل" (all) أو إذا كان الكرت يحتوي على كلاس الفئة المختارة
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block'; // إظهار الطبق
            } else {
                item.style.display = 'none';  // إخفاء الطبق فوراً
            }
        });
        
    });
});

// ==================== 4. برمجة استمارة الاتصال (Contact Form) ====================

// 1. جلب الاستمارة وحقول الكتابة من الـ HTML باستخدام الـ IDs والكلاسات
const contactForm = document.querySelector('.contact-form');
const clientNameInput = document.getElementById('client-name');
const clientEmailInput = document.getElementById('client-email');

// 2. الاستماع لحدث إرسال الاستمارة (Submit)
contactForm.addEventListener('submit', (event) => {
    
    // هذا السطر السحري يمنع الصفحة من التحديث (Refresh) واختفاء البيانات فجأة
    event.preventDefault();
    
    // قراءة القيم التي كتبها الزبون داخل الخانات الآن
    const nameValue = clientNameInput.value;
    const emailValue = clientEmailInput.value;
    
    // إظهار نافذة ترحيبية تفاعلية باسم الزبون الذي أدخله
    alert(`شكراً لك يا ${nameValue}! ✨ تم استلام طلبك بنجاح، وسنتواصل معك عبر بريدك الإلكتروني (${emailValue}) في أقرب وقت.`);
    
    // مسح البيانات من الخانات بعد الإرسال لتصبح الاستمارة نظيفة مجدداً
    contactForm.reset();
});

// ==================== 5. ربط أزرار الأطباق باستمارة الطلب ====================

// 1. جلب جميع أزرار "اطلب الآن" من داخل كروت الأطباق، وجلب خانة الرسالة
const orderItemButtons = document.querySelectorAll('.btn-order-item');
const messageTextArea = document.getElementById('client-message'); // المعرّف الخاص بخانة الرسالة

// 2. المرور على كل زر للاستماع لنقرة المستخدم
orderItemButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        // أ) قراءة اسم الطبق المخزن داخل الخاصية data-dish للزر المضغوط
        const dishName = button.getAttribute('data-dish');
        
        // ب) كتابة نص تلقائي ذكي داخل خانة الرسالة في الأسفل
        messageTextArea.value = `مرحباً، أريد طلب وجبة: [${dishName}] من فضلكم.`;
        
        // ج) أخذ الزبون فوراً ونعومة لقسم الاتصال لكي يكمل كتابة اسمه وهاتفه
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
        
    });
});