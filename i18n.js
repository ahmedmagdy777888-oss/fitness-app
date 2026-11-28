/* Wa Uddu i18n: Arabic-first app, English overlay. Default ar; EN translates rendered DOM text. */
(function(){
var LS='wa_lang';
var lang=localStorage.getItem(LS)||'ar';
window.I18N={lang:lang,set:function(l){if(l!==lang){localStorage.setItem(LS,l);location.reload();}}};
if(lang!=='en')return;
var D={
/* brand & chrome */
'وأعدّوا':'Wa Uddu','الرئيسية':'Home','التمرين':'Workout','الأكل':'Food','التقدم':'Progress',
'الإعدادات':'Settings','فاتح أو غامق':'Dark or light','أهلاً بيك':'Welcome','تخطي':'Skip','حفظ':'Save','أضف':'Add','لأ':'No','تمام':'Done','انسخ':'Copy',
/* home hero & stats */
'يوم في الرحلة':'day of the journey','السعرات النهاردة':"Today's calories",'البروتين النهاردة':"Today's protein",
'تمرين الأسبوع':"Week's workouts",'أيام مكتملة':'days done','الوزن':'Weight','بداية الرحلة':'Journey start',
'سلسلة الالتزام':'Streak','يوم متواصل':'days in a row','المية النهاردة':"Today's water",'خطوات النهاردة':"Today's steps",
'المية':'Water','كوب':'cup','زود كوب':'Add a cup','نقص كوب':'Remove a cup','اكتب عدد الخطوات':'Enter step count',
'يلا نبدأ':"Let's go",'عوّضه':'Make it up','فاتك تمرين':'You missed','يوم':'on','تحب تعوّضه النهاردة؟':'Make it up today?',
'احفظ بياناتك في السحابة واشتغل من أي تليفون':'Back up your data to the cloud and work from any phone','حساب / دخول':'Account / Sign in',
'الـ 1300 ريال دول هنطلّعهم بالمليم، ما تقلقش':"We'll squeeze out every halala of that 1300 riyals, don't worry",
/* workout */
'اختار التمرين':'Choose workout','علوي أ':'Upper A','علوي ب':'Upper B','سفلي أ':'Lower A','سفلي ب':'Lower B',
'خلّصت التمرين':'Workout done','عاش يا بطل!':'Beast mode!','تمرين النهاردة متسجّل':"Today's workout is logged.",
'خد نفسك… المجموعة الجاية جاية':'Catch your breath… next set is coming','شرح الحركة':'How to do it',
'كجم':'kg','عدّة':'reps','دقيقة':'min','يوم راحة':'Rest day',
'النهاردة راحة يا باشا':'Today is a rest day, champ','لو حابب تتمرن برضه، التمرين اللي تحت جاهز.':'If you feel like training anyway, the workout below is ready.',
'آخر مرة':'Last time','النهاردة':'Today','تمرين':'Workout',
/* exercises */
'ضغط دمبل مائل بقبضة متوازية':'Incline dumbbell press, neutral grip','سحب ظهر (لات بول داون)':'Lat pulldown',
'تجديف بالجهاز وصدرك على السند':'Chest-supported machine row','رفرفة جانبي':'Lateral raise','ترايسبس بالحبل':'Rope pushdown',
'باي بالدمبل':'Dumbbell curl','فيس بول':'Face pull','ليج برس':'Leg press','رومانيان ديدلفت بالدمبل':'Dumbbell Romanian deadlift',
'ليج كيرل':'Leg curl','لانجز مشي':'Walking lunge','سمانة':'Calf raise','بلانك':'Plank','تشست برس على الجهاز':'Machine chest press',
'تجديف كابل جالس':'Seated cable row','سحب بقبضة متوازية':'Neutral-grip pulldown','هامر كيرل':'Hammer curl',
'دوران خارجي بالكابل':'Cable external rotation','هاك سكوات أو جوبلت سكوات':'Hack squat or goblet squat','هيب ثرست':'Hip thrust',
'ليج إكستنشن':'Leg extension','رفع ركب وإنت متعلق':'Hanging knee raise','مشي على المشاية بميل':'Incline treadmill walk',
/* food */
'أكل النهاردة':"Today's food",'صوّر وجبتك':'Snap your meal','قدّر من الوصف':'Estimate from text','أضف بسرعة':'Quick add','دوّر على أكلة…':'Search food…','لا نتائج. جرّب اسم تاني أو أضفها يدوي من تحت.':'No results. Try another name or add it manually below.','الأرقام تقديرية للحصة المذكورة':'Numbers are estimates for the stated portion','مرة في الأسبوع':'Once a week','بروتينات':'Protein','نشويات وحبوب':'Carbs and grains','فاكهة وخضار':'Fruit and veg','مكسرات ودهون':'Nuts and fats','أطباق بيتي':'Home dishes','مشروبات':'Drinks',
'أكلة مش في القائمة':'A dish not on the list','اسم الأكلة':'Dish name','اكتب أو قول إيه اللي أكلته…':'Type or say what you ate…',
'ارفع صورة الأكل، أو اكتب اللي أكلته (أو اتكلم بمايك الكيبورد)، وClaude يقدّر لك السعرات والبروتين.':'Upload a food photo, or type what you ate (or speak with the keyboard mic), and Claude will estimate calories and protein.',
'لسه ما كلتش حاجة ولا إيه؟ اختار من تحت أو صوّر وجبتك.':"Nothing eaten yet? Pick from below or snap your meal.",
'لسه مفيش مفضلات. دوس ★ جنب أي أكلة سجّلتها وهتظهر هنا.':'No favorites yet. Tap ★ next to any logged dish and it will show up here.',
'مفضلة':'Favorite','س':'kcal','ب':'p','سعرات':'Calories','بروتين':'Protein','الأداء الصح':'Eating quality',
'براحتك':'Freely','بحساب':'Careful','مرة في الأسبوع':'Once a week','مفضلات':'Favorites','من المفضلة':'from favorites',
'الأرقام تقديرية':'Numbers are estimates','اسم مختصر للوجبة بالعامية المصرية':'Short meal name in Egyptian Arabic',
'الأكل ده كله ليك ولا مشاركه مع حد؟':'Is all this food yours or shared with someone?','ليك':'Mine','مشاركة':'Shared',
/* progress */
'رسم الوزن':'Weight chart','آخر 7 أيام':'Last 7 days','سجّل وزنك':'Log your weight','مثلاً 104.6':'e.g. 104.6',
'نزلت لحد دلوقتي':'Down so far','الهدف':'Goal','مرة في الأسبوع، الصبح على الريق بعد الحمام.':'Once a week, in the morning on an empty stomach after the bathroom.',
'فحص InBody':'InBody scan','سجّل فحص جديد':'Log a new scan','السهم الأخضر يعني تحسّن.':'A green arrow means improvement.',
'فحص InBody جديد':'New InBody scan','اكتب الأرقام اللي في التقرير. فاضي مش مشكلة.':'Enter the numbers from the report. Blank is fine.',
'التاريخ':'Date','الدهون (كجم)':'Fat (kg)','نسبة الدهون (%)':'Fat %','العضلات (كجم)':'Muscle (kg)','الدهون الحشوية':'Visceral fat',
'الخصر للورك':'Waist-to-hip','حفظ الفحص':'Save scan','آخر فحص':'Last scan','دهون':'fat','عضلات':'muscle',
'يوم على آخر فحص. المفروض كل 4 إلى 6 أسابيع في نفس الوقت تقريباً.':'days since the last scan. Aim for every 4 to 6 weeks at roughly the same time.',
'عدّى أكتر من 6 أسابيع على آخر فحص InBody. عملت فحص جديد؟ سجّله':"It's been over 6 weeks since your last InBody scan. Got a new one? Log it",
'الدهون':'Fat','العضلات':'Muscle','الحد 0.90':'limit 0.90','الطبيعي أقل من 10':'normal is under 10','المقارنة مع فحص':'Compared to scan',
/* program card */
'برنامجك الشخصي':'Your personal program','اعمل برنامجي':'Build my program','غيّر البرنامج':'Change program','اعمل البرنامج':'Build program',
'برنامج تمرين متبني على جسمك وهدفك، وأدق لو سجّلت فحص InBody.':'A training program built on your body and goal, more accurate if you log an InBody scan.',
'نصيحة: سجّل فحص InBody من تبويب التقدم الأول، عشان البرنامج يبقى مبني على جسمك الحقيقي.':'Tip: log an InBody scan from the Progress tab first, so the program is built on your real body.',
'برنامج':'Program','الشخصي':'personal','أيام التمرين بالأسبوع':'Training days per week','هدفك':'Your goal',
'تنشيف وحرق دهون':'Cut & burn fat','لياقة وثبات':'Fitness & stability','زيادة عضل':'Build muscle','أيام':'days',
'نسبة الدهون عالية':'Body fat is high','الأولوية دلوقتي للتنشيف، والعضلات تكبر تحتها.':'priority now is cutting, muscle grows underneath.',
'الدهون الحشوية':'Visceral fat','أعلى من الطبيعي: الكارديو والمشي مش اختياري.':'is above normal: cardio and walking are not optional.',
'كتلتك العضلية':'Your muscle mass','محتاجة بناء: التزم بالبروتين وبالتدرج في الأوزان.':'needs building: stick to protein and progressive overload.',
'رتّب الأيام بحيث يبقى فيه راحة بين كل يومين قدر الإمكان.':'Arrange days so there is rest between every two sessions as much as possible.',
'برنامجك جاهز يا':'Your program is ready,',
/* settings */
'الأهداف والإعدادات':'Goals & settings','السعرات اليومية':'Daily calories','البروتين اليومي (جم)':'Daily protein (g)',
'هدف الخطوات':'Step goal','أكواب المية':'Cups of water','الوزن المستهدف (كجم)':'Target weight (kg)','وزن البداية (كجم)':'Start weight (kg)',
'تاريخ بداية الرحلة':'Journey start date','حفظ الأهداف':'Save goals','الشكل':'Appearance','تلقائي':'Auto','فاتح':'Light','غامق':'Dark',
'الوضع الغامق':'Dark mode','الوضع الفاتح':'Light mode','المساعد الذكي (Claude)':'AI assistant (Claude)',
'تقدير الوجبات من الصورة أو الوصف، ومراجعة الأسبوع. لو قفلته كل حاجة تانية بتشتغل عادي.':'Meal estimates from a photo or description, and a weekly review. If you turn it off, everything else works as usual.',
'شغال':'On','متوقف':'Off','الخطوات من صحة آبل (تلقائي)':'Steps from Apple Health (automatic)',
'تليفونك يبعت عدد خطواتك لوحده مرة في اليوم من تطبيق صحة آبل، من غير ما تكتب حاجة.':'Your phone sends your step count by itself once a day from Apple Health, without you typing anything.',
'أنشئ مفتاح الربط':'Create link key','مفتاح الربط (تحطه في الاختصار مرة واحدة)':'Link key (paste into the Shortcut once)',
'رابط الإرسال':'Send URL','كود الوصول (ثابت، للترويسة Authorization)':'Access code (fixed, for the Authorization header)',
'مفتاح جديد (القديم يبطل)':'New key (old one stops working)','نسخة احتياطية':'Backup','صدّر JSON':'Export JSON','استورد نسخة':'Import backup',
'الحساب والسحابة':'Account & cloud','سجّل دخولك عشان بياناتك تتزامن بين أجهزتك':'Sign in so your data syncs across your devices',
'ثبّت التطبيق على التليفون':'Install the app on your phone',
'لتثبيته كتطبيق: من قائمة المتصفح اختار «إضافة إلى الشاشة الرئيسية».':'To install it as an app: from the browser menu choose "Add to Home Screen".',
'بياناتك بتتحفظ على جهازك وبتتزامن مع حسابك على السحابة زي ما هي. النسخة الاحتياطية ملف تقدر تحتفظ بيه وترجّعه في أي وقت.':'Your data is stored on your device and syncs with your cloud account as is. The backup is a file you can keep and restore anytime.',
'اللغة':'Language','العربية':'العربية',
/* review */
'مراجعة الأسبوع مع Claude':'Weekly review with Claude','مراجعة الأسبوع من Claude':'Weekly review by Claude',
'Claude يبص على أرقامك الأسبوع ده (سعرات، بروتين، خطوات، تمارين، وزن) ويقترح تعديلات. مفيش حاجة بتتغير غير لما تدوس «طبّق».':'Claude looks at this week\u2019s numbers (calories, protein, steps, workouts, weight) and suggests changes. Nothing changes until you tap "Apply".',
'اطلب المراجعة':'Request review','اطلب مراجعة جديدة':'Request a new review','طبّق':'Apply','تجاهل':'Ignore',
'مراجعة الأسبوع الذكية محتاجة تشغيل من داخل Claude عشان تشتغل. باقي التطبيق شغال كامل من غيرها.':'The smart weekly review needs to be enabled from inside Claude to work. The rest of the app works fully without it.',
'متوسط السعرات':'Avg calories','متوسط البروتين':'Avg protein','متوسط الخطوات':'Avg steps','أيام تمرين':'workout days',
'لازم توافق إن الصفحة تسأل Claude.':'You need to allow the page to ask Claude.','لازم توافق إن الصفحة تبعت الصورة لـ Claude.':'You need to allow the page to send the photo to Claude.',
'حصلت مشكلة في التحليل. جرّب تاني بعد شوية.':'Analysis hit a problem. Try again in a bit.','حصلت مشكلة في المراجعة':'The review hit a problem',
'حصلت مشكلة. حاول تاني':'Something went wrong. Try again','حصلت مشكلة. جرّب تاني بعد شوية.':'Something went wrong. Try again in a bit.',
/* onboarding & auth */
'التطبيق ده بيشتغل على جهازك أنت، وبياناتك بتفضل على تليفونك وما بتتبعتش لأي حتة. عرّفنا بنفسك الأول.':'This app runs on your own device, and your data stays on your phone and is not sent anywhere. Tell us about yourself first.',
'اسمك':'Your name','وزنك الحالي (كجم) · اختياري':'Your current weight (kg) · optional','اكتب اسمك الأول':'Enter your name first',
'تسجيل دخول':'Sign in','دخّل باسم المستخدم وكلمة السر.':'Enter your username and password.','اسم المستخدم':'Username',
'كلمة السر (٦ حروف أو أكتر)':'Password (6+ characters)','ادخل':'Sign in','جديد هنا؟ اعمل حساب':'New here? Create an account',
'سجّل دخولك أو اعمل حساب جديد عشان تبدأ':'Sign in or create a new account to get started','خروج':'Sign out','مسح حسابي وبياناتي':'Delete my account and data',
'سحابتك شغالة':'Your cloud is on','مسح الحساب والبيانات':'Delete account and data',
'ده هيمسح حسابك وكل بياناتك من السحابة ومن الجهاز ده نهائياً. مفيش رجوع.':'This will permanently delete your account and all your data from the cloud and this device. No undo.',
'أيوه، امسح كل حاجة':'Yes, delete everything','استعادة بياناتك الأصلية':'Restore your original data','استعد بياناتي الأصلية':'Restore my original data',
'اترجعت بياناتك الأصلية':'Your original data was restored',
'مفيش بيانات محفوظة على الحساب ده لسه. لو معاك ملف النسخة الاحتياطية، الصق محتواه هنا أو اختاره، وهيترجع على الجهاز ده ويتخزن في حسابك. لو سجلت أي حاجة جديدة على الجهاز ده، هتتبدل بمحتوى النسخة.':'No data saved on this account yet. If you have a backup file, paste its contents here or choose it, and it will be restored on this device and stored in your account. If you logged anything new on this device, it will be replaced by the backup contents.',
'الملف مش سليم. الصق محتوى النسخة الاحتياطية كامل':'Invalid file. Paste the full backup contents',
/* days & months */
'السبت':'Saturday','الأحد':'Sunday','الاثنين':'Monday','الثلاثاء':'Tuesday','الأربعاء':'Wednesday','الخميس':'Thursday','الجمعة':'Friday',
'يناير':'January','فبراير':'February','مارس':'March','أبريل':'April','مايو':'May','يونيو':'June','يوليو':'July','أغسطس':'August','سبتمبر':'September','أكتوبر':'October','نوفمبر':'November','ديسمبر':'December',
/* misc */
'سياسة الخصوصية':'Privacy policy','شروط الاستخدام':'Terms of use','. تحب تعوّضه النهاردة؟':'. Make it up today?',
'اضغط لتغيير صورتك':'Tap to change your photo','صورتك':'Your photo','اختار صورة':'Choose a photo','تسجيل صوتي':'Voice recording',
'عنوان قصير':'Short title','كرّر أكل':'Repeat the food of','أكلة':'dishes','الهدف 8 أكواب':'Goal: 8 cups'
};
var RULES=[
[/^تمرين (.+)$/,function(m){return 'Workout: '+(D[m[1]]||m[1]);}],
[/^يوم (\S+)\. تحب تعوّضه النهاردة؟$/,function(m){return 'on '+(D[m[1]]||m[1])+'. Make it up today?';}],
[/^يا ([\u0621-\u064A]{2,15})$/,function(m){return 'Hey '+m[1];}],
[/^النهاردة (.+)$/,function(m){return 'Today is '+(D[m[1]]||m[1]);}],
[/^(.+) (\d{1,2}) (.+) · يوم (\d+) في الرحلة$/,function(m){return (D[m[1]]||m[1])+', '+(D[m[3]]||m[3])+' '+m[2]+' · Day '+m[4]+' of the journey';}],
[/^يوم (\d+) في الرحلة$/,function(m){return 'Day '+m[1]+' of the journey';}],
[/^من ([\d,]+)$/,function(m){return 'of '+m[1];}],
[/^من ([\d,]+) جم$/,function(m){return 'of '+m[1]+' g';}],
[/^باقي ([\d,]+)$/,function(m){return m[1]+' left';}],
[/^الهدف ([\d,]+)$/,function(m){return 'Goal '+m[1];}],
[/^الهدف ([\d,]+) أكواب$/,function(m){return 'Goal '+m[1]+' cups';}],
[/^(\d+) لكل رجل$/,function(m){return m[1]+' each leg';}],
[/^(\d+–\d+) ثانية$/,function(m){return m[1]+' sec';}],
[/^(\d+–\d+) دقيقة$/,function(m){return m[1]+' min';}],
[/^(\d+) يوم على آخر فحص\./,function(m){return m[1]+' days since the last scan.';}],
[/^شيل «(.+)» من المفضلة$/,function(m){return 'Remove "'+m[1]+'" from favorites';}],
[/^احذف (.+)$/,function(m){return 'Delete '+m[1];}],
[/^(.+) أيام التمرين$/,function(m){return m[1]+' workout days';}],
[/^مرة في الأسبوع · (.+)$/,function(m){return 'Once a week · '+m[1];}]
];
function tr(t){
  if(!t)return t;
  var m=t.match(/^(\s*)([\s\S]*?)(\s*)$/);var core=m[2];
  if(!core||!/[ء-ي]/.test(core))return t;
  var r=D[core];
  if(!r)for(var i=0;i<RULES.length;i++){var mm=core.match(RULES[i][0]);if(mm){r=RULES[i][1](mm);break;}}
  if(!r&&core.indexOf(' · ')>-1){
    var parts=core.split(' · '),ch=false;
    for(var j=0;j<parts.length;j++){var p=tr(parts[j]);
      if(p===parts[j]&&/…$/.test(parts[j].trim())){var q=parts[j].replace(/…\s*$/,'');var p2=tr(q);if(p2!==q)p=p2+' …';}
      if(p!==parts[j]){ch=true;parts[j]=p;}}
    if(ch)r=parts.join(' · ');
  }
  return r?m[1]+r+m[3]:t;
}
var SKIP=/^(SCRIPT|STYLE)$/;
function walk(root){
  var it=document.createNodeIterator(root,NodeFilter.SHOW_TEXT,null),n;
  while(n=it.nextNode()){
    var p=n.parentElement;
    if(!p||SKIP.test(p.tagName)||p.closest('.ayah'))continue;
    var v=n.nodeValue;
    if(/[ء-ي]/.test(v)){var nv=tr(v);if(nv!==v)n.nodeValue=nv;}
  }
}
var ATTRS=['placeholder','title','aria-label','alt'];
function fixEl(el){
  if(el.nodeType!==1)return;
  if(el.getAttribute&&el.getAttribute('dir')==='rtl'&&!el.closest('.ayah'))el.setAttribute('dir','ltr');
  for(var i=0;i<ATTRS.length;i++){var a=el.getAttribute&&el.getAttribute(ATTRS[i]);if(a&&/[ء-ي]/.test(a)){var na=tr(a);if(na!==a)el.setAttribute(ATTRS[i],na);}}
  walk(el);
  var els=el.querySelectorAll?el.querySelectorAll('[placeholder],[title],[aria-label],[alt],[dir]'):[];
  for(var k=0;k<els.length;k++)fixEl(els[k])===undefined;
  for(var k2=0;k2<els.length;k2++){var e=els[k2];
    for(var i2=0;i2<ATTRS.length;i2++){var a2=e.getAttribute(ATTRS[i2]);if(a2&&/[ء-ي]/.test(a2)){var na2=tr(a2);if(na2!==a2)e.setAttribute(ATTRS[i2],na2);}}
    if(e.getAttribute('dir')==='rtl'&&!e.closest('.ayah'))e.setAttribute('dir','ltr');
  }
}
function full(){
  document.documentElement.lang='en';document.documentElement.dir='ltr';
  if(document.body)document.body.dir='ltr';
  document.title='Wa Uddu';
  fixEl(document.body);
}
var mo=new MutationObserver(function(recs){
  for(var i=0;i<recs.length;i++){var r=recs[i];
    if(r.type==='characterData'){var n=r.target,v=n.nodeValue;
      if(v&&/[ء-ي]/.test(v)){var p=n.parentElement;if(p&&!SKIP.test(p.tagName)&&!p.closest('.ayah')){var nv=tr(v);if(nv!==v)n.nodeValue=nv;}}
    }else{
      for(var j=0;j<r.addedNodes.length;j++){var n2=r.addedNodes[j];
        if(n2.nodeType===3){var v2=n2.nodeValue;if(v2&&/[ء-ي]/.test(v2)){var p2=n2.parentElement;if(p2&&!SKIP.test(p2.tagName)&&!p2.closest('.ayah')){var nv2=tr(v2);if(nv2!==v2)n2.nodeValue=nv2;}}}
        else if(n2.nodeType===1)fixEl(n2);
      }
    }
  }
});
function start(){full();mo.observe(document.body,{childList:true,subtree:true,characterData:true});}
if(document.body)start();else document.addEventListener('DOMContentLoaded',start);
})();
