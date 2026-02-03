// Данные для сайта
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация
    initNavigation();
    initScrollTop();
    initQuranSection();
    initHadithSection();
    
    // Загрузка данных
    loadFullQuran();
    loadHadithData();
    
    // Анимации
    animateOnScroll();
});

// Навигация
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Кнопка прокрутки вверх
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Секция Корана
function initQuranSection() {
    const searchInput = document.getElementById('surahSearch');
    const closeBtn = document.getElementById('closeSurahView');
    const prevBtn = document.getElementById('prevSurah');
    const nextBtn = document.getElementById('nextSurah');
    
    // Поиск сур
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const surahCards = document.querySelectorAll('.surah-card');
        
        surahCards.forEach(card => {
            const surahName = card.querySelector('.surah-name').textContent.toLowerCase();
            const surahMeaning = card.querySelector('.surah-meaning').textContent.toLowerCase();
            const surahArabic = card.querySelector('.surah-name-arabic').textContent;
            
            if (surahName.includes(searchTerm) || 
                surahMeaning.includes(searchTerm) || 
                surahArabic.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Закрыть просмотр суры
    closeBtn.addEventListener('click', () => {
        document.getElementById('surahView').style.display = 'none';
        document.getElementById('surahList').style.display = 'grid';
    });
    
    // Навигация по сурам
    prevBtn.addEventListener('click', navigateSurah.bind(null, 'prev'));
    nextBtn.addEventListener('click', navigateSurah.bind(null, 'next'));
}

// Загрузка полного Корана (114 сур)
function loadFullQuran() {
    const surahList = document.getElementById('surahList');
    
    // Список всех 114 сур Корана
    const allSurahs = [
        // 1-10
        { id: 1, name: "Аль-Фатиха", arabic: "الفاتحة", meaning: "Открывающая", verses: 7, revelation: "Мекканская", order: 5, rukus: 1 },
        { id: 2, name: "Аль-Бакара", arabic: "البقرة", meaning: "Корова", verses: 286, revelation: "Мединская", order: 87, rukus: 40 },
        { id: 3, name: "Аль Имран", arabic: "آل عمران", meaning: "Семейство Имрана", verses: 200, revelation: "Мединская", order: 89, rukus: 20 },
        { id: 4, name: "Ан-Ниса", arabic: "النساء", meaning: "Женщины", verses: 176, revelation: "Мединская", order: 92, rukus: 24 },
        { id: 5, name: "Аль-Маида", arabic: "المائدة", meaning: "Трапеза", verses: 120, revelation: "Мединская", order: 112, rukus: 16 },
        { id: 6, name: "Аль-Анам", arabic: "الأنعام", meaning: "Скот", verses: 165, revelation: "Мекканская", order: 55, rukus: 20 },
        { id: 7, name: "Аль-Араф", arabic: "الأعراف", meaning: "Преграды", verses: 206, revelation: "Мекканская", order: 39, rukus: 24 },
        { id: 8, name: "Аль-Анфаль", arabic: "الأنفال", meaning: "Трофеи", verses: 75, revelation: "Мединская", order: 88, rukus: 10 },
        { id: 9, name: "Ат-Тауба", arabic: "التوبة", meaning: "Покаяние", verses: 129, revelation: "Мединская", order: 113, rukus: 16 },
        { id: 10, name: "Юнус", arabic: "يونس", meaning: "Юнус", verses: 109, revelation: "Мекканская", order: 51, rukus: 11 },
        
        // 11-20
        { id: 11, name: "Худ", arabic: "هود", meaning: "Худ", verses: 123, revelation: "Мекканская", order: 52, rukus: 10 },
        { id: 12, name: "Юсуф", arabic: "يوسف", meaning: "Юсуф", verses: 111, revelation: "Мекканская", order: 53, rukus: 12 },
        { id: 13, name: "Ар-Ра'д", arabic: "الرعد", meaning: "Гром", verses: 43, revelation: "Мединская", order: 96, rukus: 6 },
        { id: 14, name: "Ибрахим", arabic: "إبراهيم", meaning: "Ибрахим", verses: 52, revelation: "Мекканская", order: 72, rukus: 7 },
        { id: 15, name: "Аль-Хиджр", arabic: "الحجر", meaning: "Хиджр", verses: 99, revelation: "Мекканская", order: 54, rukus: 6 },
        { id: 16, name: "Ан-Нахль", arabic: "النحل", meaning: "Пчелы", verses: 128, revelation: "Мекканская", order: 70, rukus: 16 },
        { id: 17, name: "Аль-Исра", arabic: "الإسراء", meaning: "Ночной перенос", verses: 111, revelation: "Мекканская", order: 50, rukus: 12 },
        { id: 18, name: "Аль-Кахф", arabic: "الكهف", meaning: "Пещера", verses: 110, revelation: "Мекканская", order: 69, rukus: 12 },
        { id: 19, name: "Марьям", arabic: "مريم", meaning: "Марьям", verses: 98, revelation: "Мекканская", order: 44, rukus: 6 },
        { id: 20, name: "Та Ха", arabic: "طه", meaning: "Та Ха", verses: 135, revelation: "Мекканская", order: 45, rukus: 8 },
        
        // 21-30
        { id: 21, name: "Аль-Анбия", arabic: "الأنبياء", meaning: "Пророки", verses: 112, revelation: "Мекканская", order: 73, rukus: 7 },
        { id: 22, name: "Аль-Хадж", arabic: "الحج", meaning: "Хадж", verses: 78, revelation: "Мединская", order: 103, rukus: 10 },
        { id: 23, name: "Аль-Муминун", arabic: "المؤمنون", meaning: "Верующие", verses: 118, revelation: "Мекканская", order: 74, rukus: 6 },
        { id: 24, name: "Ан-Нур", arabic: "النور", meaning: "Свет", verses: 64, revelation: "Мединская", order: 102, rukus: 9 },
        { id: 25, name: "Аль-Фуркан", arabic: "الفرقان", meaning: "Различение", verses: 77, revelation: "Мекканская", order: 42, rukus: 6 },
        { id: 26, name: "Аш-Шу'ара", arabic: "الشعراء", meaning: "Поэты", verses: 227, revelation: "Мекканская", order: 47, rukus: 11 },
        { id: 27, name: "Ан-Намль", arabic: "النمل", meaning: "Муравьи", verses: 93, revelation: "Мекканская", order: 48, rukus: 7 },
        { id: 28, name: "Аль-Касас", arabic: "القصص", meaning: "Рассказ", verses: 88, revelation: "Мекканская", order: 49, rukus: 9 },
        { id: 29, name: "Аль-Анкабут", arabic: "العنكبوت", meaning: "Паук", verses: 69, revelation: "Мекканская", order: 85, rukus: 7 },
        { id: 30, name: "Ар-Рум", arabic: "الروم", meaning: "Римляне", verses: 60, revelation: "Мекканская", order: 84, rukus: 6 },
        
        // 31-40
        { id: 31, name: "Лукман", arabic: "لقمان", meaning: "Лукман", verses: 34, revelation: "Мекканская", order: 57, rukus: 4 },
        { id: 32, name: "Ас-Саджда", arabic: "السجدة", meaning: "Земной поклон", verses: 30, revelation: "Мекканская", order: 75, rukus: 3 },
        { id: 33, name: "Аль-Ахзаб", arabic: "الأحزاب", meaning: "Союзники", verses: 73, revelation: "Мединская", order: 90, rukus: 9 },
        { id: 34, name: "Саба", arabic: "سبإ", meaning: "Саба", verses: 54, revelation: "Мекканская", order: 58, rukus: 6 },
        { id: 35, name: "Фатыр", arabic: "فاطر", meaning: "Творец", verses: 45, revelation: "Мекканская", order: 43, rukus: 5 },
        { id: 36, name: "Йа Син", arabic: "يس", meaning: "Йа Син", verses: 83, revelation: "Мекканская", order: 41, rukus: 5 },
        { id: 37, name: "Ас-Саффат", arabic: "الصافات", meaning: "Выстроившиеся в ряды", verses: 182, revelation: "Мекканская", order: 56, rukus: 5 },
        { id: 38, name: "Сад", arabic: "ص", meaning: "Сад", verses: 88, revelation: "Мекканская", order: 38, rukus: 5 },
        { id: 39, name: "Аз-Зумар", arabic: "الزمر", meaning: "Толпы", verses: 75, revelation: "Мекканская", order: 59, rukus: 8 },
        { id: 40, name: "Гафир", arabic: "غافر", meaning: "Прощающий", verses: 85, revelation: "Мекканская", order: 60, rukus: 9 },
        
        // 41-50
        { id: 41, name: "Фуссылят", arabic: "فصلت", meaning: "Разъяснены", verses: 54, revelation: "Мекканская", order: 61, rukus: 6 },
        { id: 42, name: "Аш-Шура", arabic: "الشورى", meaning: "Совет", verses: 53, revelation: "Мекканская", order: 62, rukus: 5 },
        { id: 43, name: "Аз-Зухруф", arabic: "الزخرف", meaning: "Украшения", verses: 89, revelation: "Мекканская", order: 63, rukus: 7 },
        { id: 44, name: "Ад-Духан", arabic: "الدخان", meaning: "Дым", verses: 59, revelation: "Мекканская", order: 64, rukus: 3 },
        { id: 45, name: "Аль-Джасия", arabic: "الجاثية", meaning: "Коленопреклоненные", verses: 37, revelation: "Мекканская", order: 65, rukus: 4 },
        { id: 46, name: "Аль-Ахкаф", arabic: "الأحقاف", meaning: "Пески", verses: 35, revelation: "Мекканская", order: 66, rukus: 4 },
        { id: 47, name: "Мухаммад", arabic: "محمد", meaning: "Мухаммад", verses: 38, revelation: "Мединская", order: 95, rukus: 4 },
        { id: 48, name: "Аль-Фатх", arabic: "الفتح", meaning: "Победа", verses: 29, revelation: "Мединская", order: 111, rukus: 4 },
        { id: 49, name: "Аль-Худжурат", arabic: "الحجرات", meaning: "Комнаты", verses: 18, revelation: "Мединская", order: 106, rukus: 2 },
        { id: 50, name: "Каф", arabic: "ق", meaning: "Каф", verses: 45, revelation: "Мекканская", order: 34, rukus: 3 },
        
        // 51-60
        { id: 51, name: "Аз-Зарият", arabic: "الذاريات", meaning: "Рассеивающие", verses: 60, revelation: "Мекканская", order: 67, rukus: 3 },
        { id: 52, name: "Ат-Тур", arabic: "الطور", meaning: "Гора", verses: 49, revelation: "Мекканская", order: 76, rukus: 2 },
        { id: 53, name: "Ан-Наджм", arabic: "النجم", meaning: "Звезда", verses: 62, revelation: "Мекканская", order: 23, rukus: 3 },
        { id: 54, name: "Аль-Камар", arabic: "القمر", meaning: "Луна", verses: 55, revelation: "Мекканская", order: 37, rukus: 3 },
        { id: 55, name: "Ар-Рахман", arabic: "الرحمن", meaning: "Милостивый", verses: 78, revelation: "Мединская", order: 97, rukus: 3 },
        { id: 56, name: "Аль-Ваки'а", arabic: "الواقعة", meaning: "Событие", verses: 96, revelation: "Мекканская", order: 46, rukus: 3 },
        { id: 57, name: "Аль-Хадид", arabic: "الحديد", meaning: "Железо", verses: 29, revelation: "Мединская", order: 94, rukus: 4 },
        { id: 58, name: "Аль-Муджадиля", arabic: "المجادلة", meaning: "Препирающаяся", verses: 22, revelation: "Мединская", order: 105, rukus: 3 },
        { id: 59, name: "Аль-Хашр", arabic: "الحشر", meaning: "Сбор", verses: 24, revelation: "Мединская", order: 101, rukus: 3 },
        { id: 60, name: "Аль-Мумтахана", arabic: "الممتحنة", meaning: "Испытуемая", verses: 13, revelation: "Мединская", order: 91, rukus: 2 },
        
        // 61-70
        { id: 61, name: "Ас-Сафф", arabic: "الصف", meaning: "Ряды", verses: 14, revelation: "Мединская", order: 109, rukus: 2 },
        { id: 62, name: "Аль-Джуму'а", arabic: "الجمعة", meaning: "Собрание", verses: 11, revelation: "Мединская", order: 110, rukus: 2 },
        { id: 63, name: "Аль-Мунафикун", arabic: "المنافقون", meaning: "Лицемеры", verses: 11, revelation: "Мединская", order: 104, rukus: 2 },
        { id: 64, name: "Ат-Тагабун", arabic: "التغابن", meaning: "Взаимное обделение", verses: 18, revelation: "Мединская", order: 108, rukus: 2 },
        { id: 65, name: "Ат-Таляк", arabic: "الطلاق", meaning: "Развод", verses: 12, revelation: "Мединская", order: 99, rukus: 2 },
        { id: 66, name: "Ат-Тахрим", arabic: "التحريم", meaning: "Запрещение", verses: 12, revelation: "Мединская", order: 107, rukus: 2 },
        { id: 67, name: "Аль-Мульк", arabic: "الملك", meaning: "Власть", verses: 30, revelation: "Мекканская", order: 77, rukus: 2 },
        { id: 68, name: "Аль-Калям", arabic: "القلم", meaning: "Письменная трость", verses: 52, revelation: "Мекканская", order: 2, rukus: 2 },
        { id: 69, name: "Аль-Хакка", arabic: "الحاقة", meaning: "Неминуемое", verses: 52, revelation: "Мекканская", order: 78, rukus: 2 },
        { id: 70, name: "Аль-Ма'аридж", arabic: "المعارج", meaning: "Ступени", verses: 44, revelation: "Мекканская", order: 79, rukus: 2 },
        
        // 71-80
        { id: 71, name: "Нух", arabic: "نوح", meaning: "Нух", verses: 28, revelation: "Мекканская", order: 71, rukus: 2 },
        { id: 72, name: "Аль-Джинн", arabic: "الجن", meaning: "Джинны", verses: 28, revelation: "Мекканская", order: 40, rukus: 2 },
        { id: 73, name: "Аль-Муззаммиль", arabic: "المزمل", meaning: "Закутавшийся", verses: 20, revelation: "Мекканская", order: 3, rukus: 2 },
        { id: 74, name: "Аль-Муддассир", arabic: "المدثر", meaning: "Завернувшийся", verses: 56, revelation: "Мекканская", order: 4, rukus: 2 },
        { id: 75, name: "Аль-Кийама", arabic: "القيامة", meaning: "Воскресение", verses: 40, revelation: "Мекканская", order: 31, rukus: 2 },
        { id: 76, name: "Аль-Инсан", arabic: "الانسان", meaning: "Человек", verses: 31, revelation: "Мединская", order: 98, rukus: 2 },
        { id: 77, name: "Аль-Мурсалят", arabic: "المرسلات", meaning: "Посылаемые", verses: 50, revelation: "Мекканская", order: 33, rukus: 2 },
        { id: 78, name: "Ан-Наба", arabic: "النبأ", meaning: "Весть", verses: 40, revelation: "Мекканская", order: 80, rukus: 2 },
        { id: 79, name: "Ан-Нази'ат", arabic: "النازعات", meaning: "Исторгающие", verses: 46, revelation: "Мекканская", order: 81, rukus: 2 },
        { id: 80, name: "Абаса", arabic: "عبس", meaning: "Нахмурился", verses: 42, revelation: "Мекканская", order: 24, rukus: 1 },
        
        // 81-90
        { id: 81, name: "Ат-Таквир", arabic: "التكوير", meaning: "Скручивание", verses: 29, revelation: "Мекканская", order: 7, rukus: 1 },
        { id: 82, name: "Аль-Инфитар", arabic: "الإنفطار", meaning: "Раскалывание", verses: 19, revelation: "Мекканская", order: 82, rukus: 1 },
        { id: 83, name: "Аль-Мутаффифин", arabic: "المطففين", meaning: "Обвешивающие", verses: 36, revelation: "Мекканская", order: 86, rukus: 1 },
        { id: 84, name: "Аль-Иншикак", arabic: "الإنشقاق", meaning: "Разверзнется", verses: 25, revelation: "Мекканская", order: 83, rukus: 1 },
        { id: 85, name: "Аль-Бурудж", arabic: "البروج", meaning: "Созвездия", verses: 22, revelation: "Мекканская", order: 27, rukus: 1 },
        { id: 86, name: "Ат-Тарик", arabic: "الطارق", meaning: "Ночной путник", verses: 17, revelation: "Мекканская", order: 36, rukus: 1 },
        { id: 87, name: "Аль-А'ля", arabic: "الأعلى", meaning: "Высочайший", verses: 19, revelation: "Мекканская", order: 8, rukus: 1 },
        { id: 88, name: "Аль-Гашия", arabic: "الغاشية", meaning: "Покрывающее", verses: 26, revelation: "Мекканская", order: 68, rukus: 1 },
        { id: 89, name: "Аль-Фаджр", arabic: "الفجر", meaning: "Заря", verses: 30, revelation: "Мекканская", order: 10, rukus: 1 },
        { id: 90, name: "Аль-Баляд", arabic: "البلد", meaning: "Город", verses: 20, revelation: "Мекканская", order: 35, rukus: 1 },
        
        // 91-100
        { id: 91, name: "Аш-Шамс", arabic: "الشمس", meaning: "Солнце", verses: 15, revelation: "Мекканская", order: 26, rukus: 1 },
        { id: 92, name: "Аль-Ляйль", arabic: "الليل", meaning: "Ночь", verses: 21, revelation: "Мекканская", order: 9, rukus: 1 },
        { id: 93, name: "Ад-Духа", arabic: "الضحى", meaning: "Утро", verses: 11, revelation: "Мекканская", order: 11, rukus: 1 },
        { id: 94, name: "Аш-Шарх", arabic: "الشرح", meaning: "Раскрытие", verses: 8, revelation: "Мекканская", order: 12, rukus: 1 },
        { id: 95, name: "Ат-Тин", arabic: "التين", meaning: "Смоковница", verses: 8, revelation: "Мекканская", order: 28, rukus: 1 },
        { id: 96, name: "Аль-Аляк", arabic: "العلق", meaning: "Сгусток", verses: 19, revelation: "Мекканская", order: 1, rukus: 1 },
        { id: 97, name: "Аль-Кадр", arabic: "القدر", meaning: "Предопределение", verses: 5, revelation: "Мекканская", order: 25, rukus: 1 },
        { id: 98, name: "Аль-Баййина", arabic: "البينة", meaning: "Ясное знамение", verses: 8, revelation: "Мединская", order: 100, rukus: 1 },
        { id: 99, name: "Аз-Зальзаля", arabic: "الزلزلة", meaning: "Сотрясение", verses: 8, revelation: "Мединская", order: 93, rukus: 1 },
        { id: 100, name: "Аль-Адият", arabic: "العاديات", meaning: "Скачущие", verses: 11, revelation: "Мекканская", order: 14, rukus: 1 },
        
        // 101-110
        { id: 101, name: "Аль-Кари'а", arabic: "القارعة", meaning: "Великое бедствие", verses: 11, revelation: "Мекканская", order: 30, rukus: 1 },
        { id: 102, name: "Ат-Такасур", arabic: "التكاثر", meaning: "Страсть к приумножению", verses: 8, revelation: "Мекканская", order: 16, rukus: 1 },
        { id: 103, name: "Аль-Аср", arabic: "العصر", meaning: "Предвечернее время", verses: 3, revelation: "Мекканская", order: 13, rukus: 1 },
        { id: 104, name: "Аль-Хумаза", arabic: "الهمزة", meaning: "Хулитель", verses: 9, revelation: "Мекканская", order: 32, rukus: 1 },
        { id: 105, name: "Аль-Филь", arabic: "الفيل", meaning: "Слон", verses: 5, revelation: "Мекканская", order: 19, rukus: 1 },
        { id: 106, name: "Курайш", arabic: "قريش", meaning: "Курайш", verses: 4, revelation: "Мекканская", order: 29, rukus: 1 },
        { id: 107, name: "Аль-Ма'ун", arabic: "الماعون", meaning: "Мелочь", verses: 7, revelation: "Мекканская", order: 17, rukus: 1 },
        { id: 108, name: "Аль-Каусар", arabic: "الكوثر", meaning: "Изобилие", verses: 3, revelation: "Мекканская", order: 15, rukus: 1 },
        { id: 109, name: "Аль-Кафирун", arabic: "الكافرون", meaning: "Неверующие", verses: 6, revelation: "Мекканская", order: 18, rukus: 1 },
        { id: 110, name: "Ан-Наср", arabic: "النصر", meaning: "Помощь", verses: 3, revelation: "Мединская", order: 114, rukus: 1 },
        
        // 111-114
        { id: 111, name: "Аль-Масад", arabic: "المسد", meaning: "Пальмовые волокна", verses: 5, revelation: "Мекканская", order: 6, rukus: 1 },
        { id: 112, name: "Аль-Ихляс", arabic: "الإخلاص", meaning: "Очищение веры", verses: 4, revelation: "Мекканская", order: 22, rukus: 1 },
        { id: 113, name: "Аль-Фаляк", arabic: "الفلق", meaning: "Рассвет", verses: 5, revelation: "Мекканская", order: 20, rukus: 1 },
        { id: 114, name: "Ан-Нас", arabic: "الناس", meaning: "Люди", verses: 6, revelation: "Мекканская", order: 21, rukus: 1 }
    ];
    
    // Очистка загрузки
    surahList.innerHTML = '';
    
    // Создание карточек для всех сур
    allSurahs.forEach(surah => {
        const surahCard = createSurahCard(surah);
        surahList.appendChild(surahCard);
    });
    
    // Добавление обработчиков для карточек
    document.querySelectorAll('.surah-card').forEach(card => {
        card.addEventListener('click', function() {
            const surahId = this.dataset.surahId;
            showSurah(surahId);
        });
    });
}

// Создание карточки суры
function createSurahCard(surah) {
    const card = document.createElement('div');
    card.className = 'surah-card';
    card.dataset.surahId = surah.id;
    
    card.innerHTML = `
        <div class="surah-header">
            <div class="surah-number">${surah.id}</div>
            <div class="surah-name-arabic">${surah.arabic}</div>
        </div>
        <h3 class="surah-name">${surah.name}</h3>
        <p class="surah-meaning">${surah.meaning}</p>
        <div class="surah-info">
            <span><i class="fas fa-verse"></i> ${surah.verses} аятов</span>
            <span><i class="fas fa-map-marker-alt"></i> ${surah.revelation}</span>
            <span><i class="fas fa-list-ol"></i> ${surah.rukus} руку'</span>
        </div>
    `;
    
    return card;
}

// Показать выбранную суру
function showSurah(surahId) {
    const surahList = document.getElementById('surahList');
    const surahView = document.getElementById('surahView');
    const surahViewTitle = document.getElementById('surahViewTitle');
    const surahViewInfo = document.getElementById('surahViewInfo');
    const versesContainer = document.getElementById('versesContainer');
    
    // Получение данных суры
    const surahData = getSurahData(surahId);
    
    if (surahData) {
        // Установка заголовка
        surahViewTitle.textContent = `${surahData.name} (${surahData.meaning}) - Сура ${surahId}`;
        
        // Установка информации
        surahViewInfo.innerHTML = `
            <p><i class="fas fa-verse"></i> <strong>Количество аятов:</strong> ${surahData.verses}</p>
            <p><i class="fas fa-map-marker-alt"></i> <strong>Место ниспослания:</strong> ${surahData.revelation}</p>
            <p><i class="fas fa-list-ol"></i> <strong>Количество руку':</strong> ${surahData.rukus}</p>
            <p><i class="fas fa-sort-numeric-down"></i> <strong>Порядок ниспослания:</strong> ${surahData.order}</p>
        `;
        
        // Загрузка аятов (в реальном проекте - через API)
        versesContainer.innerHTML = '';
        
        // Для демонстрации показываем первые 5 аятов
        for (let i = 1; i <= Math.min(5, surahData.verses); i++) {
            const verseElement = document.createElement('div');
            verseElement.className = 'verse-item';
            
            // Арабский текст (для демо)
            const arabicText = getArabicVerse(surahId, i);
            
            // Перевод (для демо)
            const translation = getVerseTranslation(surahId, i);
            
            verseElement.innerHTML = `
                <div class="verse-header">
                    <div class="verse-number">${i}</div>
                </div>
                <div class="verse-arabic">${arabicText}</div>
                <div class="verse-translation">${translation}</div>
            `;
            
            versesContainer.appendChild(verseElement);
        }
        
        // Показать сообщение, если аятов больше 5
        if (surahData.verses > 5) {
            const message = document.createElement('div');
            message.className = 'verse-message';
            message.innerHTML = `<p><i class="fas fa-info-circle"></i> Показаны первые 5 аятов из ${surahData.verses}. В полной версии будут все аяты.</p>`;
            versesContainer.appendChild(message);
        }
        
        // Сохраняем текущую суру для навигации
        surahView.dataset.currentSurah = surahId;
        
        // Показать просмотр суры и скрыть список
        surahView.style.display = 'block';
        surahList.style.display = 'none';
        
        // Прокрутка к началу суры
        surahView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Навигация по сурам
function navigateSurah(direction) {
    const surahView = document.getElementById('surahView');
    const currentSurahId = parseInt(surahView.dataset.currentSurah);
    
    let newSurahId;
    if (direction === 'prev' && currentSurahId > 1) {
        newSurahId = currentSurahId - 1;
    } else if (direction === 'next' && currentSurahId < 114) {
        newSurahId = currentSurahId + 1;
    } else {
        return;
    }
    
    showSurah(newSurahId);
}

// Получить данные суры
function getSurahData(surahId) {
    // В реальном проекте это был бы запрос к API
    // Для демо возвращаем статические данные
    
    const allSurahs = [
        // Первые 10 сур для демонстрации
        { id: 1, name: "Аль-Фатиха", arabic: "الفاتحة", meaning: "Открывающая", verses: 7, revelation: "Мекканская", order: 5, rukus: 1 },
        { id: 2, name: "Аль-Бакара", arabic: "البقرة", meaning: "Корова", verses: 286, revelation: "Мединская", order: 87, rukus: 40 },
        { id: 3, name: "Аль Имран", arabic: "آل عمران", meaning: "Семейство Имрана", verses: 200, revelation: "Мединская", order: 89, rukus: 20 },
        { id: 4, name: "Ан-Ниса", arabic: "النساء", meaning: "Женщины", verses: 176, revelation: "Мединская", order: 92, rukus: 24 },
        { id: 5, name: "Аль-Маида", arabic: "المائدة", meaning: "Трапеза", verses: 120, revelation: "Мединская", order: 112, rukus: 16 },
        { id: 6, name: "Аль-Анам", arabic: "الأنعام", meaning: "Скот", verses: 165, revelation: "Мекканская", order: 55, rukus: 20 },
        { id: 7, name: "Аль-Араф", arabic: "الأعراف", meaning: "Преграды", verses: 206, revelation: "Мекканская", order: 39, rukus: 24 },
        { id: 8, name: "Аль-Анфаль", arabic: "الأنفال", meaning: "Трофеи", verses: 75, revelation: "Мединская", order: 88, rukus: 10 },
        { id: 9, name: "Ат-Тауба", arabic: "التوبة", meaning: "Покаяние", verses: 129, revelation: "Мединская", order: 113, rukus: 16 },
        { id: 10, name: "Юнус", arabic: "يونس", meaning: "Юнус", verses: 109, revelation: "Мекканская", order: 51, rukus: 11 },
        // Остальные суры будут иметь данные по умолчанию
    ];
    
    // Найти суру или вернуть данные по умолчанию
    const foundSurah = allSurahs.find(s => s.id === parseInt(surahId));
    
    if (foundSurah) {
        return foundSurah;
    } else {
        // Данные по умолчанию для остальных сур
        const defaultData = [
            { id: 11, verses: 123, revelation: "Мекканская", rukus: 10, order: 52 },
            { id: 12, verses: 111, revelation: "Мекканская", rukus: 12, order: 53 },
            { id: 13, verses: 43, revelation: "Мединская", rukus: 6, order: 96 },
            // ... и так далее для всех сур
        ];
        
        const defaultSurah = defaultData.find(s => s.id === parseInt(surahId));
        if (defaultSurah) {
            return {
                id: defaultSurah.id,
                name: `Сура ${defaultSurah.id}`,
                meaning: "Описание суры",
                verses: defaultSurah.verses,
                revelation: defaultSurah.revelation,
                rukus: defaultSurah.rukus,
                order: defaultSurah.order
            };
        }
    }
    
    return null;
}

// Получить арабский текст аята (для демо)
function getArabicVerse(surahId, verseNumber) {
    // В реальном проекте это был бы запрос к API
    // Для демо возвращаем примеры
    
    const verseExamples = {
        1: {
            1: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
            2: "ٱلْحَمْدُ لِلَّٰهِ رَبِّ ٱلْعَالَمِينَ",
            3: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
            4: "مَالِكِ يَوْمِ ٱلدِّينِ",
            5: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ"
        },
        2: {
            1: "الٓمٓ",
            2: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
            3: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ"
        },
        112: {
            1: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
            2: "ٱللَّهُ ٱلصَّمَدُ",
            3: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
            4: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ"
        }
    };
    
    if (verseExamples[surahId] && verseExamples[surahId][verseNumber]) {
        return verseExamples[surahId][verseNumber];
    }
    
    // Дефолтный аят
    return "وَٱللَّهُ يَهْدِى مَن يَشَآءُ إِلَىٰ صِرَٰطٍ مُّسْتَقِيمٍ";
}

// Получить перевод аята (для демо)
function getVerseTranslation(surahId, verseNumber) {
    // В реальном проекте это был бы запрос к API
    // Для демо возвращаем примеры
    
    const translationExamples = {
        1: {
            1: "Во имя Аллаха, Милостивого, Милосердного!",
            2: "Хвала Аллаху, Господу миров,",
            3: "Милостивому, Милосердному,",
            4: "Властелину Дня воздаяния!",
            5: "Тебе одному мы поклоняемся и Тебя одного молим о помощи."
        },
        2: {
            1: "Алиф. Лам. Мим.",
            2: "Это Писание, в котором нет сомнения, является верным руководством для богобоязненных,",
            3: "которые веруют в сокровенное, совершают намаз и расходуют из того, чем Мы их наделили."
        },
        112: {
            1: "Скажи: «Он — Аллах Единый,",
            2: "Аллах Самодостаточный.",
            3: "Он не родил и не был рожден,",
            4: "и нет никого, равного Ему»."
        }
    };
    
    if (translationExamples[surahId] && translationExamples[surahId][verseNumber]) {
        return translationExamples[surahId][verseNumber];
    }
    
    // Дефолтный перевод
    return "Аллах наставляет на прямой путь того, кого пожелает.";
}

// Секция хадисов
function initHadithSection() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loadMoreBtn = document.getElementById('loadMoreHadith');
    
    // Переключение вкладок
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const collection = btn.dataset.collection;
            showHadithCollection(collection);
        });
    });
    
    // Загрузить больше хадисов
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreHadiths();
        });
    }
}

// Загрузка данных хадисов
function loadHadithData() {
    // Показать первую коллекцию по умолчанию
    showHadithCollection('bukhari');
}

// Показать коллекцию хадисов
function showHadithCollection(collection) {
    // Скрыть все коллекции
    document.querySelectorAll('.hadith-collection').forEach(col => {
        col.classList.remove('active');
    });
    
    // Показать выбранную коллекцию
    const collectionElement = document.getElementById(`${collection}Collection`);
    if (collectionElement) {
        collectionElement.classList.add('active');
        
        // Загрузить хадисы для этой коллекции
        loadHadithsForCollection(collection);
    }
}

// Загрузить хадисы для коллекции
function loadHadithsForCollection(collection) {
    const collectionElement = document.getElementById(`${collection}Collection`);
    
    // Очистка
    collectionElement.innerHTML = '';
    
    // Получение хадисов для выбранной коллекции
    const hadiths = getHadithsByCollection(collection);
    
    // Добавление хадисов
    hadiths.forEach(hadith => {
        const hadithElement = createHadithElement(hadith);
        collectionElement.appendChild(hadithElement);
    });
}

// Получить хадисы по коллекции
function getHadithsByCollection(collection) {
    // В реальном проекте это был бы запрос к API
    // Для демо возвращаем статические данные
    
    const allHadiths = {
        bukhari: [
            {
                id: 1,
                arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
                translation: "Поистине, дела оцениваются только по намерениям, и, поистине, каждому человеку (достанется) только то, что он намеревался (обрести).",
                reference: "Сахих Аль-Бухари, 1",
                category: "Намерения"
            },
            {
                id: 2,
                arabic: "بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ",
                translation: "Ислам основывается на пяти (столпах): свидетельстве о том, что нет бога, кроме Аллаха, и что Мухаммад — посланник Аллаха, совершении молитвы, выплате закята, совершении хаджа и соблюдении поста в рамадане.",
                reference: "Сахих Аль-Бухари, 8",
                category: "Столпы Ислама"
            },
            {
                id: 3,
                arabic: "مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ",
                translation: "Если кто-нибудь внесёт в это наше дело (ислам) то, что не имеет к нему отношения, это будет отвергнуто.",
                reference: "Сахих Аль-Бухари, 2697",
                category: "Нововведения"
            },
            {
                id: 4,
                arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
                translation: "Не уверует никто из вас по-настоящему, пока не станет желать брату своему того же, чего желает самому себе.",
                reference: "Сахих Аль-Бухари, 13",
                category: "Любовь к брату"
            },
            {
                id: 5,
                arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
                translation: "Бойся Аллаха, где бы ты ни был, вслед за дурным делом соверши благое, которое сотрёт собой дурное, и придерживайся в отношениях с людьми хорошего нрава.",
                reference: "Сахих Аль-Бухари, 6021",
                category: "Богобоязненность"
            }
        ],
        muslim: [
            {
                id: 1,
                arabic: "مَنْ صَلَّى الصَّلَوَاتِ الْخَمْسَ، وَصَامَ رَمَضَانَ، وَأَدَّى الزَّكَاةَ، وَحَجَّ الْبَيْتَ، وَاجْتَنَبَ الْكَبَائِرَ دَخَلَ الْجَنَّةَ",
                translation: "Тот, кто совершает пять обязательных молитв, постится в рамадан, выплачивает закят, совершает хадж и избегает больших грехов, войдет в рай.",
                reference: "Сахих Муслим, 15",
                category: "Путь в рай"
            },
            {
                id: 2,
                arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
                translation: "Мусульманин — это тот, от языка и руки которого мусульмане находятся в безопасности.",
                reference: "Сахих Муслим, 40",
                category: "Определение мусульманина"
            },
            {
                id: 3,
                arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
                translation: "Не уверует никто из вас по-настоящему, пока не станет желать брату своему того же, чего желает самому себе.",
                reference: "Сахих Муслим, 45",
                category: "Вера"
            },
            {
                id: 4,
                arabic: "مَنْ رَأَى مِنْكُمْ مُنْكَرًا فَلْيُغَيِّرْهُ بِيَدِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِلِسَانِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِقَلْبِهِ، وَذَلِكَ أَضْعَفُ الإِيمَانِ",
                translation: "Пусть тот из вас, кто увидит порицаемое, изменит это своей рукой. Если он не сможет сделать это рукой, то пусть изменит это своим языком. А если не сможет и языком, то пусть изменит это своим сердцем, и это будет самым слабым проявлением веры.",
                reference: "Сахих Муслим, 49",
                category: "Изменение порицаемого"
            },
            {
                id: 5,
                arabic: "إِنَّ اللَّهَ طَيِّبٌ لاَ يَقْبَلُ إِلاَّ طَيِّبًا",
                translation: "Поистине, Аллах — Благой, и Он принимает только благое.",
                reference: "Сахих Муслим, 1015",
                category: "Принятие дел"
            }
        ],
        forty: [
            {
                id: 1,
                arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
                translation: "Поистине, дела (оцениваются) только по намерениям.",
                reference: "Хадис 1 из 40 хадисов Ан-Навави",
                category: "Намерения"
            }
            ,
            {
                id: 3,
                arabic: "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ",
                translation: "Ислам построен на пяти (столпах).",
                reference: "Хадис 3 из 40 хадисов Ан-Навави",
                category: "Столпы Ислама"
            },
            {
                id: 4,
                arabic: "إِنَّ الْحَلَالَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ",
                translation: "Поистине, дозволенное очевидно и запретное очевидно.",
                reference: "Хадис 6 из 40 хадисов Ан-Навави",
                category: "Халяль и харам"
            },
            {
                id: 5,
                arabic: "الدِّينُ النَّصِيحَةُ",
                translation: "Религия — это проявление искренности.",
                reference: "Хадис 7 из 40 хадисов Ан-Навави",
                category: "Искренность"
            }
        ]
    };
    
    return allHadiths[collection] || [];
}

// Создание элемента хадиса
function createHadithElement(hadith) {
    const element = document.createElement('div');
    element.className = 'hadith-item';
    
    element.innerHTML = `
        <div class="hadith-arabic">${hadith.arabic}</div>
        <div class="hadith-translation">${hadith.translation}</div>
        <div class="hadith-reference">${hadith.reference}</div>
        <div class="hadith-category">Тема: ${hadith.category}</div>
    `;
    
    return element;
}

// Загрузить больше хадисов
function loadMoreHadiths() {
    // В реальном проекте это загружало бы больше хадисов с сервера
    // Для демо просто показываем сообщение
    
    alert('В полной версии сайта здесь будет загрузка дополнительных хадисов из базы данных.');
}

// Анимация при прокрутке
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.surah-card, .hadith-item, .feature').forEach(el => {
        observer.observe(el);
    });
}

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});