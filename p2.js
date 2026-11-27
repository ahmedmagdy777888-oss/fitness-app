/* Phase 2: optional account + cloud sync (Supabase free tier).
   Username + password only; the username maps to a synthetic email internally.
   Syncs the two existing keys (abushuaib_v1, abushuaib_profile_v1) into one row in
   public.user_data protected by row level security. Signup requires the Arabic consent. */
(function(){
  if(!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY||!window.supabase)return;
  var LSK='abushuaib_v1', PK='abushuaib_profile_v1';
  var sb=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY);
  var userId=null, uname=null, syncT=null, pullT=null;

  function $(id){return document.getElementById(id)}
  function t1(m){var e=$('toast');if(!e)return;e.textContent=m;e.hidden=false;setTimeout(function(){e.hidden=true},2800)}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

  /* username -> synthetic email (ascii, deterministic; Arabic chars become codepoints) */
  function toEmail(u){
    var s=String(u).trim().toLowerCase(), out='';
    for(var i=0;i<s.length;i++){
      var c=s[i];
      out+=/[a-z0-9]/.test(c)?c:'_'+s.codePointAt(i).toString(36)+'_';
    }
    if(out.length<3)out=out+'_u';
    return out.slice(0,40)+'@abushuaib.local';
  }

  function localHasData(){
    try{
      var a=JSON.parse(localStorage.getItem(LSK)||'null');
      var p=JSON.parse(localStorage.getItem(PK)||'null');
      var hasA=a&&((a.days&&Object.keys(a.days).length)||(a.weights&&Object.keys(a.weights).length)||(a.inbody&&Object.keys(a.inbody).length));
      return !!(hasA||p);
    }catch(e){return false}
  }

  function push(){
    if(!userId)return;
    clearTimeout(syncT);
    syncT=setTimeout(function(){
      sb.from('user_data').upsert({
        user_id:userId,
        profile:JSON.parse(localStorage.getItem(PK)||'{}'),
        app_data:JSON.parse(localStorage.getItem(LSK)||'{}'),
        consent_at:localStorage.getItem('abushuaib_consent_at'),
        updated_at:new Date().toISOString()
      }).then(function(r){if(r.error)console.warn('sync failed',r.error)});
    },800);
  }

  function applyCloud(row){
    if(row.profile&&Object.keys(row.profile).length)localStorage.setItem(PK,JSON.stringify(row.profile));
    if(row.app_data&&Object.keys(row.app_data).length)localStorage.setItem(LSK,JSON.stringify(row.app_data));
    location.reload();
  }

  function afterLogin(){
    sb.from('user_data').select('profile,app_data').eq('user_id',userId).maybeSingle().then(function(r){
      var row=r.data;
      if(r.error){t1('مشكلة في الشبكة. حاول تاني.');return}
      if(!row){
        if(localHasData()){push();t1('اترفعت بيانات الجهاز ده على حسابك')}
        renderAuthCard();
        return;
      }
      var cloudEmpty=(!row.profile||!Object.keys(row.profile).length)&&(!row.app_data||!Object.keys(row.app_data).length);
      if(cloudEmpty){
        if(localHasData()){push();t1('اترفعت بيانات الجهاز ده على حسابك')}
        renderAuthCard();
        return;
      }
      if(!localHasData()){applyCloud(row);return}
      /* both sides have data: let the user choose */
      var s=$('sheetIn');if(!s)return;
      s.innerHTML='<h2>فيه بيانات في السحابة</h2>'
        +'<p class="note">حسابك فيه بيانات محفوظة من جهاز تاني، والجهاز ده فيه بيانات كمان. تكمل بأنهي؟</p>'
        +'<button class="btn btn-acc btn-wide" id="p2usecloud" style="margin-top:14px">استخدم بيانات السحابة (تتبدل بيانات الجهاز ده)</button>'
        +'<button class="btn btn-wide" id="p2uselocal" style="margin-top:8px">اكمل ببيانات الجهاز ده (هترفع فوق اللي في السحابة)</button>'
        +'<button class="btn btn-ghost btn-wide" id="closeSheet" style="margin-top:8px">لأ</button>';
      $('sheet').hidden=false;
      $('p2usecloud').addEventListener('click',function(){$('sheet').hidden=true;applyCloud(row)});
      $('p2uselocal').addEventListener('click',function(){$('sheet').hidden=true;push();renderAuthCard();t1('اترفعت بيانات الجهاز ده على حسابك')});
    });
  }

  function openAuthSheet(mode){
    var s=$('sheetIn');if(!s)return;
    var isNew=mode==='new';
    s.innerHTML='<h2>'+(isNew?'حساب جديد':'تسجيل دخول')+'</h2>'
      +'<p class="note">'+(isNew?'اسم مستخدم وكلمة سر بس، من غير بريد إلكتروني. بياناتك الصحية بتتخزن عشان تتزامن بين أجهزتك.':'دخّل باسم المستخدم وكلمة السر.')+'</p>'
      +'<div class="srow" style="grid-template-columns:1fr"><input class="inp" id="p2u" placeholder="اسم المستخدم" autocomplete="username"></div>'
      +'<div class="srow" style="grid-template-columns:1fr"><input class="inp" id="p2p" type="password" placeholder="كلمة السر (٦ حروف أو أكتر)" autocomplete="'+(isNew?'new-password':'current-password')+'"></div>'
      +(isNew?'<label style="display:flex;gap:8px;align-items:flex-start;margin-top:12px;font-size:13px"><input type="checkbox" id="p2consent" style="margin-top:3px;flex:none"><span>أوافق على تخزين بياناتي (زي الوزن وفحص InBody) في السحابة عشان تتزامن بين أجهزتي، وأقدر أمسحها في أي وقت. <a href="privacy.html" target="_blank" style="color:var(--accent)">سياسة الخصوصية</a></span></label>':'')
      +'<button class="btn btn-acc btn-wide" id="p2go" style="margin-top:16px">'+(isNew?'اعمل الحساب':'ادخل')+'</button>'
      +'<button class="btn btn-wide" id="p2swap" style="margin-top:8px">'+(isNew?'عندك حساب؟ ادخل':'جديد هنا؟ اعمل حساب')+'</button>'
      +'<button class="btn btn-ghost btn-wide" id="closeSheet" style="margin-top:8px">لأ</button>';
    $('sheet').hidden=false;
    $('p2swap').addEventListener('click',function(){openAuthSheet(isNew?'in':'new')});
    $('p2go').addEventListener('click',function(){
      var u=$('p2u').value.trim(), p=$('p2p').value;
      if(u.length<2){t1('اسم المستخدم قصير');return}
      if(p.length<6){t1('كلمة السر لازم ٦ حروف أو أكتر');return}
      var email=toEmail(u);
      if(isNew){
        if(!$('p2consent').checked){t1('لازم توافق على تخزين البيانات الأول');return}
        localStorage.setItem('abushuaib_consent_at',new Date().toISOString());
        $('p2go').disabled=true;
        sb.auth.signUp({email:email,password:p}).then(function(r){
          $('p2go').disabled=false;
          if(r.error){t1(r.error.message&&/registered|taken|already/i.test(r.error.message)?'الاسم ده محجوز. جرّب غيره أو ادخل بيه':'ما قدرش أعمل الحساب. حاول تاني');return}
          uname=u;$('sheet').hidden=true;t1('اتعمل حسابك يا '+u);
        });
      }else{
        $('p2go').disabled=true;
        sb.auth.signInWithPassword({email:email,password:p}).then(function(r){
          $('p2go').disabled=false;
          if(r.error){t1('اسم المستخدم أو كلمة السر غلط');return}
          uname=u;$('sheet').hidden=true;t1('أهلاً بيك يا '+u);
        });
      }
    });
  }

  function renderAuthCard(){
    var host=document.querySelector('#v-home .hero');
    if(!host)return;
    var card=$('p2card');
    if(!card){card=document.createElement('div');card.id='p2card';host.parentNode.insertBefore(card,host.nextSibling)}
    if(userId){
      card.innerHTML='<div class="card" style="padding:12px 14px"><div class="spread" style="display:flex;align-items:center;gap:8px">'
        +'<span style="font-size:13.5px">سحابتك شغالة'+(uname?' · <b>'+esc(uname)+'</b>':'')+'</span>'
        +'<span style="display:flex;gap:6px"><button class="btn btn-ghost" id="p2out" style="padding:6px 10px;font-size:12.5px">خروج</button>'
        +'<button class="btn btn-ghost" id="p2del" style="padding:6px 10px;font-size:12.5px;color:var(--warn)">مسح حسابي وبياناتي</button></span></div></div>';
      $('p2out').addEventListener('click',function(){sb.auth.signOut().then(function(){location.reload()})});
      $('p2del').addEventListener('click',function(){
        var s=$('sheetIn');
        s.innerHTML='<h2>مسح الحساب والبيانات</h2><p class="note">ده هيمسح حسابك وكل بياناتك من السحابة ومن الجهاز ده نهائياً. مفيش رجوع.</p>'
          +'<button class="btn btn-acc btn-wide" id="p2delYes" style="margin-top:14px;background:var(--warn);color:#06201D">أيوه، امسح كل حاجة</button>'
          +'<button class="btn btn-ghost btn-wide" id="closeSheet" style="margin-top:8px">لأ</button>';
        $('sheet').hidden=false;
        $('p2delYes').addEventListener('click',function(){
          $('p2delYes').disabled=true;
          sb.auth.getSession().then(function(r){
            var tok=r.data.session&&r.data.session.access_token;
            return fetch(window.SUPABASE_URL+'/functions/v1/delete-user',{method:'POST',headers:{Authorization:'Bearer '+tok}});
          }).then(function(){
            localStorage.removeItem(LSK);localStorage.removeItem(PK);localStorage.removeItem('abushuaib_consent_at');localStorage.removeItem('p2_uname');
            location.reload();
          }).catch(function(){t1('حصلت مشكلة. حاول تاني');$('p2delYes').disabled=false});
        });
      });
    }else{
      card.innerHTML='<div class="card" style="padding:12px 14px"><div class="spread" style="display:flex;align-items:center;gap:8px">'
        +'<span style="font-size:13.5px">احفظ بياناتك في السحابة واشتغل من أي تليفون</span>'
        +'<button class="btn btn-acc" id="p2open" style="padding:8px 12px;font-size:13px;flex:none">حساب / دخول</button></div></div>';
      $('p2open').addEventListener('click',function(){openAuthSheet('in')});
    }
  }

  /* auto-push whenever the app saves either key (patch the prototype so real calls are intercepted) */
  try{localStorage.removeItem('setItem')}catch(e){}
  var orig=Storage.prototype.setItem;
  Storage.prototype.setItem=function(k,v){orig.call(this,k,v);try{if(this===localStorage&&userId&&(k===LSK||k===PK))push()}catch(e){}};

  sb.auth.onAuthStateChanged(function(ev,session){
    userId=session&&session.user?session.user.id:null;
    if(userId){
      try{uname=localStorage.getItem('p2_uname')}catch(e){}
      if(ev==='SIGNED_IN')afterLogin();else renderAuthCard();
    }else{
      renderAuthCard();
    }
  });

  sb.auth.getSession().then(function(r){
    userId=r.data.session&&r.data.session.user?r.data.session.user.id:null;
    try{uname=localStorage.getItem('p2_uname')}catch(e){}
    renderAuthCard();
  });

  /* the app re-renders #v-home on its own; re-add the card if it got wiped */
  setInterval(function(){
    if(!document.getElementById('p2card')&&document.querySelector('#v-home .hero'))renderAuthCard();
  },2000);

  /* persist username for display */
  var _signUp=sb.auth.signUp.bind(sb.auth), _signIn=sb.auth.signInWithPassword.bind(sb.auth);
  sb.auth.signUp=function(o){return _signUp(o).then(function(r){if(!r.error){var u=$('p2u')&&$('p2u').value.trim();if(u)localStorage.setItem('p2_uname',u)}return r})};
  sb.auth.signInWithPassword=function(o){return _signIn(o).then(function(r){if(!r.error){var u=$('p2u')&&$('p2u').value.trim();if(u)localStorage.setItem('p2_uname',u)}return r})};
})();
