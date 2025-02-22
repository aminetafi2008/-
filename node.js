qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');const fs = require('fs');
const path = require('path');
const client = new Client({
    authStrategy: new LocalAuth({ clientId: "whatsapp-bot" }),
    puppeteer: {
        executablePath: '/nix/store/x205pbkd5xh5g4iv0g58xjla55has3cx-chromium-108.0.5359.94/bin/chromium',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});
// حالة المستخدم
const userStates = {};
// القوائم
const content = {
    "جدع مشترك": {
        "الرياضيات": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "الفيزياء والكيمياء": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "علوم الحياة والأرض": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "اللغة العربية": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "اللغة الفرنسية": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "التربية الإسلامية": { 
            "دروس": ["جميع دروس الإسلامية ", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "الفلسفة": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        }
    },
    
    "أولى بكالوريا": {
        "الرياضيات": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "الفيزياء والكيمياء": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "علوم الحياة والأرض": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "اللغة العربية": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "اللغة الفرنسية": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "التربية الإسلامية": { 
            "دروس": ["جميع دروس اسلامية", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "الفلسفة": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        }
    },
    "ثانية بكالوريا": {
        "الرياضيات": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "الفيزياء والكيمياء": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "علوم الحياة والأرض": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "اللغة العربية": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "اللغة الفرنسية": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "التربية الإسلامية": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        },
        "الفلسفة": { 
            "دروس": ["الدرس 1", "الدرس 2", "الدرس 3"], 
            "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"], 
            "فروض": ["فرض الدورة 1", "فرض الدورة 2"]
        }
    }
};
// تعريف القوائم
const menus = {
    main: ["جدع مشترك", "أولى بكالوريا", "ثانية بكالوريا"],
    subjects: {
        "جدع مشترك": ["الرياضيات", "الفيزياء والكيمياء", "علوم الحياة والأرض", "اللغة العربية", "اللغة الفرنسية", "التربية الإسلامية", "الفلسفة"],
        "أولى بكالوريا": ["الرياضيات", "الفيزياء والكيمياء", "علوم الحياة والأرض", "اللغة العربية", "اللغة الفرنسية", "التربية الإسلامية", "الفلسفة"],
        "ثانية بكالوريا": ["الرياضيات", "الفيزياء والكيمياء", "علوم الحياة والأرض", "اللغة العربية", "اللغة الفرنسية", "التربية الإسلامية", "الفلسفة"]
    },
    lessons: {
        "الفيزياء والكيمياء": ["الدرس 1", "الدرس 2", "الدرس 3"],
        "تمارين": ["تمرين 1", "تمرين 2", "تمرين 3"]
    }
};

// رسائل الترحيب والقوائم
function getMainMenu() {
    return `مرحباً بك في بوت المساعدة التعليمي! 👋
اختر المستوى الدراسي:
${menus.main.map((level, index) => `${index + 1}. ${level}`).join('\n')}`;
}
function getSubjectsMenu(level) {
    const subjects = menus.subjects[level];
    return `اختر المادة:
${subjects.map((subject, index) => `${index + 1}. ${subject}`).join('\n')}`;
}
function getLessonsMenu(subject) {
    const lessons = menus.lessons[subject];
    return `اختر الدرس:
${lessons.map((lesson, index) => `${index + 1}. ${lesson}`).join('\n')}`;
}
// معالجة الرسائل
client.on('message', async (message) => {
    const userId = message.from;
    const userState = userStates[userId] || { step: 'start' };
    try {
        if (userState.step === 'start') {
            await message.reply(getMainMenu());
            userStates[userId] = { step: 'awaiting_level' };
            return;
        }
        if (userState.step === 'awaiting_level') {
            const levelIndex = parseInt(message.body) - 1;
            if (levelIndex >= 0 && levelIndex < menus.main.length) {
                const selectedLevel = menus.main[levelIndex];
                userStates[userId] = { 
                    step: 'awaiting_subject',
                    level: selectedLevel
                };
                await message.reply(getSubjectsMenu(selectedLevel));
                return;
            }
        }
        if (userState.step === 'awaiting_subject') {
            const subjectIndex = parseInt(message.body) - 1;
            const subjects = menus.subjects[userState.level];
            
            if (subjectIndex >= 0 && subjectIndex < subjects.length) {
                const selectedSubject = subjects[subjectIndex];
                if (userState.level === 'أولى بكالوريا' && selectedSubject === 'الفيزياء والكيمياء') {
                    await message.reply('هل تريد دروس او فروض او تمارين؟');
                    userStates[userId] = {
                        step: 'awaiting_type',
                        level: userState.level,
                        subject: selectedSubject
                    };
                    return;
                }
                
                await message.reply('هل تريد دروس او فروض او تمارين؟');
                userStates[userId] = {
                    step: 'awaiting_type',
                    level: userState.level,
                    subject: selectedSubject
                };
                return;
                
                // إعادة تعيين حالة المستخدم
                userStates[userId] = { step: 'start' };
                await message.reply('هل تريد اختيار مادة أخرى؟ أرسل أي رسالة للبدء من جديد.');
                return;
            }
        }
        if (userState.step === 'awaiting_type') {
            const type = message.body.trim();
            if (type === 'تمارين' || type === 'فروض' || type === 'دروس') {
                const contentType = type.trim();
                const contentPath = path.join(__dirname, 'pdfs', userState.level, userState.subject, contentType);
                
                if (fs.existsSync(contentPath)) {
                    // If directory is empty, create sample lesson titles
                    const files = fs.readdirSync(contentPath);
                    if (files.length === 0) {
                        const sampleTitles = [
                            'الدرس الأول',
                            'الدرس الثاني',
                            'الدرس الثالث',
                            'الدرس الرابع',
                            'الدرس الخامس'
                        ];
                        const fileList = sampleTitles.map((title, index) => `${index + 1}. ${title}`).join('\n');
                        await message.reply(`اختر الملف المطلوب:\n${fileList}`);
                    } else {
                        const fileList = files.map((file, index) => `${index + 1}. ${path.basename(file, '.pdf')}`).join('\n');
                        await message.reply(`اختر الملف المطلوب:\n${fileList}`);
                    }
                    userStates[userId] = {
                        step: 'awaiting_file',
                        level: userState.level,
                        subject: userState.subject,
                        contentType: contentType,
                        files: files
                    };
                    return;
                } else {
                    await message.reply('عذراً، لا توجد ملفات متوفرة حالياً');
                    userStates[userId] = { step: 'start' };
                    return;
                }
                
                try {
                    // محاولة إرسال الملف PDF
                    const pdfPath = path.join(__dirname, 'pdfs', userState.level, `${userState.subject}`, `${type}.pdf`);
                    if (fs.existsSync(pdfPath)) {
                        const media = MessageMedia.fromFilePath(pdfPath);
                        await message.reply(media);
                    } else {
                        await message.reply('عذراً، الملف غير متوفر حالياً');
                    }
                } catch (error) {
                    console.error('خطأ في إرسال الملف:', error);
                    await message.reply('حدث خطأ أثناء إرسال الملف');
                }
                
                // إعادة تعيين حالة المستخدم
                userStates[userId] = { step: 'start' };
                await message.reply('هل تريد اختيار مادة أخرى؟ أرسل أي رسالة للبدء من جديد.');
                return;
            }
        }
        if (userState.step === 'awaiting_file') {
            const fileIndex = parseInt(message.body) - 1;
            if (fileIndex >= 0 && fileIndex < userState.files.length) {
                const selectedFile = userState.files[fileIndex];
                try {
                    // محاولة إرسال الملف PDF
                    const pdfPath = path.join(__dirname, 'pdfs', userState.level, userState.subject, userState.contentType, selectedFile);
                    if (fs.existsSync(pdfPath)) {
                        const media = MessageMedia.fromFilePath(pdfPath);
                        await message.reply(media);
                    } else {
                        await message.reply('عذراً، الملف غير متوفر حالياً');
                    }
                } catch (error) {
                    console.error('خطأ في إرسال الملف:', error);
                    await message.reply('حدث خطأ أثناء إرسال الملف');
                }
                
                // إعادة تعيين حالة المستخدم
                userStates[userId] = { step: 'start' };
                await message.reply('هل تريد اختيار مادة أخرى؟ أرسل أي رسالة للبدء من جديد.');
                return;
            }
        }
        // في حالة إدخال خاطئ
        await message.reply('اختيار غير صحيح. الرجاء المحاولة مرة أخرى.');
        userStates[userId] = { step: 'start' };
        await message.reply(getMainMenu());
    } catch (error) {
        console.error('خطأ في معالجة الرسالة:', error);
        await message.reply('حدث خطأ. الرجاء المحاولة مرة أخرى.');
    }
});
client.on('auth_failure', msg => {
    console.error('فشل في المصادقة:', msg);
});
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('🔄 برجاء مسح رمز QR باستخدام واتساب');
});
client.on('ready', () => {
    console.log('✅ تم الاتصال بنجاح!');
});
client.initialize().catch(err => {
    console.error('خطأ في بدء التشغيل:', err);
});
