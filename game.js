// ==========================================
// BABEL CODE - Game Logic & Data Definition
// ==========================================

// --- Game Database ---
const CARD_DATABASE = {
  // A Cards (Subject/Direction)
  // Type 1: Infinitive/Base Form (🔴)
  // Type 2: Gerund/ing (🟢)
  // Type 3: Past Participle (🔵)
  // Type 4: Clause/Subject+Verb (🟡)
  // Type 5: WH-Clause (🟣)
  aCards: [
    // --- Starter Curse/Obstruct Card (お邪魔カード) ---
    { id: 'c_waste', title: 'Wound', type: 1, rarity: 'starter', cost: 1, pronounce: 'ｳｰﾝﾄﾞｩ', translation: '「傷口」', desc: '【お邪魔カード】手札を圧迫するゴミ。プレイするとエナジー1を失って除外（廃棄）されるだけ。', baseDamage: 0 },

    // --- Type 1 (🔴 Base Form) ---
    { id: 'a_wanna', title: 'I wanna...', type: 1, rarity: 'starter', cost: 1, pronounce: 'ｱｲﾜﾅ', translation: '「〜したい」', desc: '敵に8ダメージ。残り2エナジーでトッピングを盛る基本形。', baseDamage: 4 },
    { id: 'a_wanna_plus', title: 'I wanna...+', type: 1, rarity: 'rare', cost: 1, pronounce: 'ｱｲﾜﾅ', translation: '「〜したい」', desc: '敵に12ダメージ。シンプルかつ使いやすい基本火力。', baseDamage: 6 },
    
    { id: 'a_need', title: 'I need to...', type: 1, rarity: 'starter', cost: 1, pronounce: 'ｱｲﾆｰﾄﾞｩﾄｩ', translation: '「〜する必要がある」', desc: 'シールド+8', baseDamage: 0 },
    { id: 'a_need_plus', title: 'I need to...+', type: 1, rarity: 'rare', cost: 0, pronounce: 'ｱｲﾆｰﾄﾞｩﾄｩ', translation: '「〜する必要がある」', desc: '【コスト0】シールド+8', baseDamage: 0 },
    
    { id: 'a_gonna', title: "I'm gonna...", type: 1, rarity: 'common', cost: 1, pronounce: 'ｱｲﾑｺﾞﾅ', translation: '「〜するつもりだ」', desc: '次ターンの攻撃力+4。次ターンの1枚目のアタックコスト-1。仕込み用。（※単体での攻撃・防御はなし）', baseDamage: 0 },
    { id: 'a_gonna_plus', title: "I'm gonna...+", type: 1, rarity: 'rare', cost: 1, pronounce: 'ｱｲﾑｺﾞﾅ', translation: '「〜するつもりだ」', desc: '次ターンの攻撃力+6。', baseDamage: 0 },
    
    { id: 'a_should', title: 'You should...', type: 1, rarity: 'common', cost: 1, pronounce: 'ﾕｰｼｭｯﾄﾞｩ', translation: '「あなたは〜すべきだ」', desc: 'シールド+10。山札から「Type 1」を1枚手札に加える。', baseDamage: 0 },
    { id: 'a_should_plus', title: 'You should...+', type: 1, rarity: 'rare', cost: 1, pronounce: 'ﾕｰｼｭｯﾄﾞｩ', translation: '「あなたは〜すべきだ」', desc: 'シールド+14。次ターンの指定Typeをサーチ＆次ターンのエナジーを+1。', baseDamage: 0 },
    
    { id: 'a_lets', title: "Let's...", type: 1, rarity: 'common', cost: 0, pronounce: 'ﾚｯﾂ', translation: '「〜しよう」', desc: '敵に3ダメージ。最初からコスト0の超優良パーツ。', baseDamage: 3 },
    { id: 'a_lets_plus', title: "Let's...+", type: 1, rarity: 'rare', cost: 0, pronounce: 'ﾚｯﾂ', translation: '「〜しよう」', desc: '敵に5ダメージ。原形連打の手数を劇的に増やす。', baseDamage: 5 },
    
    { id: 'a_managed', title: 'I managed to...', type: 1, rarity: 'uncommon', cost: 2, pronounce: 'ｱｲﾏﾆｯｼﾞﾄﾞｩﾄｩ', translation: '「なんとか〜できた」', desc: '【廃棄】シールド+18。次ターンの自分の全ダメージ2倍。', baseDamage: 0 },
    { id: 'a_managed_plus', title: 'I managed to...+', type: 1, rarity: 'rare', cost: 2, pronounce: 'ｱｲﾏﾆｯｼﾞﾄﾞｩﾄｩ', translation: '「なんとか〜できた」', desc: '【廃棄されない】シールド18 ＋ 次ターンの攻撃力1.5倍。', baseDamage: 0 },
    
    { id: 'a_rather', title: "I'd rather...", type: 1, rarity: 'uncommon', cost: 1, pronounce: 'ｱｲﾄﾞｩﾗｻﾞｰ', translation: '「むしろ〜したい」', desc: '【手動破棄】手札を1枚選んで捨てる代わりに強力な18ダメージ。', baseDamage: 0 },
    { id: 'a_rather_plus', title: "I'd rather...+", type: 1, rarity: 'rare', cost: 1, pronounce: 'ｱｲﾄﾞｩﾗｻﾞｰ', translation: '「むしろ〜したい」', desc: '【手動破棄】手札を1枚選んで捨てる。捨てるカードが「Type 1」なら威力が24ダメージに跳ね上がる。', baseDamage: 0 },
    
    { id: 'a_hurt_not', title: "It wouldn't hurt to...", type: 1, rarity: 'uncommon', cost: 0, pronounce: 'ｲｯﾄｩｳｯﾄﾞｩﾝﾊｰﾄｩﾄｩ', translation: '「〜しても損はない」', desc: 'シールド+4。さらにカードを1枚引く。トッピングにエナジーを全力投入。', baseDamage: 0 },
    { id: 'a_hurt_not_plus', title: "It wouldn't hurt to...+", type: 1, rarity: 'rare', cost: 0, pronounce: 'ｲｯﾄｩｳｯﾄﾞｩﾝﾊｰﾄｩﾄｩ', translation: '「〜しても損はない」', desc: 'シールド+8。さらにカードを1枚引く。手札を減らさないお守り。', baseDamage: 0 },
    
    { id: 'a_were_would', title: 'If I were to ..., I would...', type: 1, rarity: 'rare', cost: 2, pronounce: 'ｲﾌｱｲﾜｰﾄｩｰｱｲｳｯﾄﾞｩ', translation: '「もし〜なら、〜するだろう」', desc: '【全体遅延攻撃】次のターン開始時に敵全体に30ダメージ。（※単体ダイレクト攻撃は発生せず、トッピング時のみその場で攻撃）', baseDamage: 0 },
    { id: 'a_were_would_plus', title: 'If I were to ..., I would...+', type: 1, rarity: 'rare', cost: 1, pronounce: 'ｲﾌｱｲﾜｰﾄｩｰｱｲｳｯﾄﾞｩ', translation: '「もし〜なら、〜するだろう」', desc: '【全体遅延攻撃/コスト1】次ターン開始時に敵全体に30ダメージ。', baseDamage: 0 },
    
    { id: 'a_takes_balls', title: 'It takes so much balls to...', type: 1, rarity: 'rare', cost: 3, pronounce: 'ｲｯﾄｩﾃｲｸｽｿｰﾏｯﾁﾎﾞｰﾙｽﾞﾄｩ', translation: '「〜するには勇気がいる」', desc: '自分のHPを3削り、敵に40ダメージ。超重量のロマン砲。', baseDamage: 0 },
    { id: 'a_takes_balls_plus', title: 'It takes so much balls to...+', type: 1, rarity: 'rare', cost: 2, pronounce: 'ｲｯﾄｩﾃｲｸｽｿｰﾏｯﾁﾎﾞｰﾙｽﾞﾄｩ', translation: '「〜するには勇気がいる」', desc: '【コスト2】自傷3ダメージ ＆ 敵に35ダメージ。', baseDamage: 0 },

    // --- Type 2 (🟢 Gerund/ing) ---
    { id: 'a_like', title: 'I like...', type: 2, rarity: 'starter', cost: 1, pronounce: 'ｱｲﾗｲｸ', translation: '「〜するのが好きだ」', desc: '敵に「炎上（毎ターン4ダメ）」を2ターン付与。（※単体での攻撃・防御は発生せず、トッピング時のみ攻撃）', baseDamage: 0 },
    { id: 'a_like_plus', title: 'I like...+', type: 2, rarity: 'rare', cost: 1, pronounce: 'ｱｲﾗｲｸ', translation: '「〜するのが好きだ」', desc: '敵に「炎上（毎ターン6ダメ）」を3ターン付与。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_keep', title: 'I keep...', type: 2, rarity: 'common', cost: 1, pronounce: 'ｱｲｷｰﾌﾟ', translation: '「〜し続ける」', desc: '敵に「毒（毎ターン4ダメ）」付与。すでに毒なら数値を2倍に。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_keep_plus', title: 'I keep...+', type: 2, rarity: 'rare', cost: 1, pronounce: 'ｱｲｷｰﾌﾟ', translation: '「〜し続ける」', desc: '「毒」の付与数が4➔7に倍増。すでに毒なら数値を2倍に。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_bad_at', title: "I'm bad at...", type: 2, rarity: 'common', cost: 1, pronounce: 'ｱｲﾑﾊﾞｯﾄﾞｩｱｯﾄｩ', translation: '「〜するのが苦手だ」', desc: '敵の攻撃力を2ターン「-3」する。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_bad_at_plus', title: "I'm bad at...+", type: 2, rarity: 'rare', cost: 0, pronounce: 'ｱｲﾑﾊﾞｯﾄﾞｩｱｯﾄｩ', translation: '「〜するのが苦手だ」', desc: '【コスト0】敵を弱体化させ、こちらの被ダメージを抑える。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_enjoy', title: 'I enjoy...', type: 2, rarity: 'common', cost: 0, pronounce: 'ｱｲｴﾝｼﾞｮｲ', translation: '「〜を楽しむ」', desc: 'シールド+4。ターン終了時にHPを2回復。さらにこのターン「バフ保護（完成バフの打消しを防ぐ）」を獲得。', baseDamage: 0 },
    { id: 'a_enjoy_plus', title: 'I enjoy...+', type: 2, rarity: 'rare', cost: 0, pronounce: 'ｱｲｴﾝｼﾞｮｲ', translation: '「〜を楽しむ」', desc: 'シールド+6 ＆ ターン終了時にHP3回復。さらにこのターン「バフ保護」を獲得。', baseDamage: 0 },
    
    { id: 'a_sick_of', title: "I'm sick of...", type: 2, rarity: 'uncommon', cost: 2, pronounce: 'ｱｲﾑｼｯｸｵﾌﾞ', translation: '「〜するのはうんざりだ」', desc: '敵のバフを全て解除し、1ターン「脆弱（受けるダメ1.5倍）」に。（※単体攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_sick_of_plus', title: "I'm sick of...+", type: 2, rarity: 'rare', cost: 1, pronounce: 'ｱｲﾑｼｯｸｵﾌﾞ', translation: '「〜するのはうんざりだ」', desc: '【コスト1】敵のバフを全て解除、1ターン攻撃力半減（脱力）。（※単体攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_looking_forward', title: "I'm looking forward to...", type: 2, rarity: 'uncommon', cost: 2, pronounce: 'ｱｲﾑﾙｯｷﾝｸﾞﾌｫｰﾜｰﾄﾞﾄｩ', translation: '「〜するのを楽しみにしている」', desc: '【全体遅延攻撃】3ターン後に敵全体に25ダメージ＆1ターン麻痺。（※単体ダイレクト攻撃は発生せず、トッピング時のみ攻撃）', baseDamage: 0 },
    { id: 'a_looking_forward_plus', title: "I'm looking forward to...+", type: 2, rarity: 'rare', cost: 2, pronounce: 'ｱｲﾑﾙｯｷﾝｸﾞﾌｫｰﾜｰﾄﾞﾄｩ', translation: '「〜するのを楽しみにしている」', desc: '【全体遅延】3ターン後に敵全体に35ダメージ。さらに敵を1ターン麻痺。', baseDamage: 0 },
    
    { id: 'a_good_at', title: "I'm good at...", type: 2, rarity: 'uncommon', cost: 1, pronounce: 'ｱｲﾑｸﾞｯﾄﾞｩｱｯﾄｩ', translation: '「〜するのが得意だ」', desc: '敵にかかっているすべてのデバフの持続ターンを+2。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_good_at_plus', title: "I'm good at...+", type: 2, rarity: 'rare', cost: 0, pronounce: 'ｱｲﾑｸﾞｯﾄﾞｩｱｯﾄｩ', translation: '「〜するのが得意だ」', desc: '【コスト0】デバフ持続ターンを+2延長。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_help_but', title: "I can't help (but)...", type: 2, rarity: 'rare', cost: 2, pronounce: 'ｱｲｷｬﾝﾄﾍﾙﾌﾟﾊﾞｯﾄ', translation: '「〜せずにはいられない」', desc: 'このターンに完成させた英文のダメージやシールド（トッピング込）をもう一度再発動する。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_help_but_plus', title: "I can't help (but)...+", type: 2, rarity: 'rare', cost: 1, pronounce: 'ｱｲｷｬﾝﾄﾍﾙﾌﾟﾊﾞｯﾄ', translation: '「〜せずにはいられない」', desc: '【コスト1】完成させた英文のダメージやシールドをもう一度再発動する。', baseDamage: 0 },
    
    { id: 'a_no_use', title: "It's no use...", type: 2, rarity: 'rare', cost: 3, pronounce: 'ｲｯﾂﾉｰﾕｰｽ', translation: '「〜しても無駄だ」', desc: '【廃棄】敵の次のターンの行動を完全キャンセル。相手のターンを強制停止。（※単体攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_no_use_plus', title: "It's no use...+", type: 2, rarity: 'rare', cost: 2, pronounce: 'ｲｯﾂﾉｰﾕｰｽ', translation: '「〜しても無駄だ」', desc: '【コスト2】敵の次のターンの行動を完全キャンセル。（※単体攻撃・防御なし）', baseDamage: 0 },

    // --- Type 3 (🔵 Past Participle) ---
    { id: 'a_ve', title: "I've...", type: 3, rarity: 'starter', cost: 1, pronounce: 'ｱｲｳﾞ', translation: '「〜したことがある」', desc: '自分の捨て札の枚数×2ダメージ。戦闘後半に1コスとは思えない破壊力へ。', baseDamage: 4 },
    { id: 'a_ve_plus', title: "I've...+", type: 3, rarity: 'rare', cost: 1, pronounce: 'ｱｲｳﾞ', translation: '「〜したことがある」', desc: '捨て札の枚数×4ダメージに強化。戦闘後半に強烈な火力になる。', baseDamage: 6 },
    
    { id: 'a_ve_already', title: "I've already...", type: 3, rarity: 'common', cost: 0, pronounce: 'ｱｲｳﾞｵｰﾙﾚﾃﾞｨ', translation: '「〜し終えている」', desc: '【開幕手札】敵に6ダメージ。初手からエナジーをフルに使ってトッピングを盛る。', baseDamage: 4 },
    { id: 'a_ve_already_plus', title: "I've already...+", type: 3, rarity: 'rare', cost: 0, pronounce: 'ｱｲｳﾞｵｰﾙﾚﾃﾞｨ', translation: '「〜し終えている」', desc: '【開幕手札】12ダメージ ＆ カードを1枚引く。', baseDamage: 8 },
    
    { id: 'a_havenot_yet', title: "I haven't ... yet", type: 3, rarity: 'common', cost: 1, pronounce: 'ｱｲﾊｳﾞﾝﾄｲｪｯﾄ', translation: '「まだ〜していない」', desc: '山札の上から2枚を墓地に送り、シールド+8。墓地肥やしの基礎。', baseDamage: 0 },
    { id: 'a_havenot_yet_plus', title: "I haven't ... yet+", type: 3, rarity: 'rare', cost: 1, pronounce: 'ｱｲﾊｳﾞﾝﾄｲｪｯﾄ', translation: '「まだ〜していない」', desc: '山札から3枚を墓地へ送り、シールド+11に強化。', baseDamage: 0 },
    
    { id: 'a_got', title: 'I got...', type: 3, rarity: 'common', cost: 1, pronounce: 'ｱｲｶﾞｯﾄｩ', translation: '「〜を得た/〜になった」', desc: 'シールド+10。他のカードを廃棄していた場合、HP2回復。', baseDamage: 0 },
    { id: 'a_got_plus', title: 'I got...+', type: 3, rarity: 'rare', cost: 0, pronounce: 'ｱｲｶﾞｯﾄｩ', translation: '「〜を得た/〜になった」', desc: '【コスト0】シールド+10。HP2回復。', baseDamage: 0 },
    
    { id: 'a_should_have', title: 'I should have...', type: 3, rarity: 'uncommon', cost: 1, pronounce: 'ｱｲｼｭｯﾄﾞｩﾊｳﾞ', translation: '「〜すべきだった」', desc: '【手動破棄】手札を1枚選んで捨てる。捨て札から「直前に使ったカード」を1枚手札に戻す。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_should_have_plus', title: 'I should have...+', type: 3, rarity: 'rare', cost: 1, pronounce: 'ｱｲｼｭｯﾄﾞｩﾊｳﾞ', translation: '「〜すべきだった」', desc: '【手動破棄】カード回収。戻したカードの威力をこの戦闘中永続的に+5する。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_used_to', title: "I'm used to...", type: 3, rarity: 'uncommon', cost: 1, pronounce: 'ｱｲﾑﾕｰｽﾄｩ', translation: '「〜することに慣れている」', desc: 'この戦闘中に使用したカード総数×1シールド。累積防壁。', baseDamage: 0 },
    { id: 'a_used_to_plus', title: "I'm used to...+", type: 3, rarity: 'rare', cost: 1, pronounce: 'ｱｲﾑﾕｰｽﾄｩ', translation: '「〜することに慣れている」', desc: '使用カード総数×2シールド。', baseDamage: 0 },
    
    { id: 'a_had_something', title: 'I had my car...', type: 3, rarity: 'uncommon', cost: 2, pronounce: 'ｱｲﾊｯﾄﾞｩﾏｲｶｰ', translation: '「車を〜してもらった」', desc: '敵に8ダメージ。自分の手札のコスト2以上のカード1枚のコストをこの戦闘中-1する。', baseDamage: 0 },
    { id: 'a_had_something_plus', title: 'I had my car...+', type: 3, rarity: 'rare', cost: 1, pronounce: 'ｱｲﾊｯﾄﾞｩﾏｲｶｰ', translation: '「車を〜してもらった」', desc: '【コスト1】敵に8ダメージ。手札のコスト2以上のカード1枚 of コストを-1する。', baseDamage: 0 },
    
    { id: 'a_been_trying', title: 'I\'ve been trying to...', type: 3, rarity: 'rare', cost: 2, pronounce: 'ｱｲｳﾞﾋﾞｰﾝﾄﾗｲﾝｸﾞﾄｩ', translation: '「ずっと〜しようとしていた」', desc: 'このターン中、墓地から回収したカードのコストをすべて0にする。（※単体攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_been_trying_plus', title: 'I\'ve been trying to...+', type: 3, rarity: 'rare', cost: 1, pronounce: 'ｱｲｳﾞﾋﾞｰﾝﾄﾗｲﾝｸﾞﾄｩ', translation: '「ずっと〜しようとしていた」', desc: '【コスト1】墓地回収カードコストをすべて0化。（※単体攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_wish_had', title: 'I wish I had...', type: 3, rarity: 'rare', cost: 2, pronounce: 'ｱｲｳｨｯｼｭｱｲﾊｯﾄﾞｩ', translation: '「〜していればよかったのに」', desc: '【廃棄/コスト2】自分の捨て札（discard）にあるすべてのカードを手札（hand）に戻す。極限のループ用。', baseDamage: 0 },
    { id: 'a_wish_had_plus', title: 'I wish I had...+', type: 3, rarity: 'rare', cost: 1, pronounce: 'ｱｲｳｨｯｼｭｱｲﾊｯﾄﾞｩ', translation: '「〜していればよかったのに」', desc: '【廃棄/コスト1】捨て札にあるすべてのカードを手札に戻す。', baseDamage: 0 },

    // --- Type 4 (🟡 SV Clause / 文系) ---
    { id: 'a_think', title: 'I think...', type: 4, rarity: 'starter', cost: 1, pronounce: 'ｱｲｼﾝｸ', translation: '「〜と思う」', desc: 'カードを1枚引き、シールド+5。手札を減らさず守る優良な潤滑油。', baseDamage: 0 },
    { id: 'a_think_plus', title: 'I think...+', type: 4, rarity: 'rare', cost: 0, pronounce: 'ｱｲｼﾝｸ', translation: '「〜と思う」', desc: '【コスト0】カードを1枚引く、シールド+5。', baseDamage: 0 },
    
    { id: 'a_hope', title: 'I hope...', type: 4, rarity: 'common', cost: 1, pronounce: 'ｱｲﾎｰﾌﾟ', translation: '「〜を望む」', desc: 'カードを2枚引く。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_hope_plus', title: 'I hope...+', type: 4, rarity: 'rare', cost: 0, pronounce: 'ｱｲﾎｰﾌﾟ', translation: '「〜を望む」', desc: '【コスト0】ノーコスト2ドロー。最強のドローカード。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_know', title: 'I know...', type: 4, rarity: 'common', cost: 1, pronounce: 'ｱｲﾉｳ', translation: '「〜と知っている」', desc: '山札の上3枚を確認し、不要な1枚を墓地へ送る。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_know_plus', title: 'I know...+', type: 4, rarity: 'rare', cost: 0, pronounce: 'ｱｲﾉｳ', translation: '「〜と知っている」', desc: '【コスト0】山札の上3枚確認、不要な1枚を墓地へ送る。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_glad', title: "I'm glad...", type: 4, rarity: 'common', cost: 0, pronounce: 'ｱｲﾑｸﾞﾗｯﾄﾞｩ', translation: '「〜で嬉しい」', desc: '手札が10枚になるまでドロー（手札が溢れて燃えたカード1枚につき敵に3ダメ）。引いた枚数×2シールドを追加。', baseDamage: 0 },
    { id: 'a_glad_plus', title: "I'm glad...+", type: 4, rarity: 'rare', cost: 0, pronounce: 'ｱｲﾑｸﾞﾗｯﾄﾞｩ', translation: '「〜で嬉しい」', desc: '手札が10枚になるまでドロー、手札が溢れて燃えたカード1枚につき敵全体に3ダメージ。', baseDamage: 0 },
    
    { id: 'a_thought', title: 'I thought...', type: 4, rarity: 'uncommon', cost: 1, pronounce: 'ｱｲｿｰﾄｩ', translation: '「〜だと思っていた」', desc: '手札のランダムなカード1枚のコストをこのターン0にする。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_thought_plus', title: 'I thought...+', type: 4, rarity: 'rare', cost: 0, pronounce: 'ｱｲｿｰﾄｩ', translation: '「〜だと思っていた」', desc: '【コスト0】手札のランダムなカード1枚のコストをこのターン0にする。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_heard', title: 'I heard...', type: 4, rarity: 'uncommon', cost: 2, pronounce: 'ｱｲﾊｰﾄﾞｩ', translation: '「〜と聞いている」', desc: '敵の次のターン行う強力な攻撃を1ターン先延ばしにする。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_heard_plus', title: 'I heard...+', type: 4, rarity: 'rare', cost: 1, pronounce: 'ｱｲﾊｰﾄﾞｩ', translation: '「〜と聞いている」', desc: '【コスト1】敵の次のターンの強力な攻撃を1ターン先延ばしにする。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_seems', title: 'It seems...', type: 4, rarity: 'uncommon', cost: 1, pronounce: 'ｲｯﾄｩｼｰﾑｽﾞ', translation: '「〜のようだ」', desc: '敵が今構えているスキル（バフやデバフ）をコピーして使う。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_seems_plus', title: 'It seems...+', type: 4, rarity: 'rare', cost: 1, pronounce: 'ｲｯﾄｩｼｰﾑｽﾞ', translation: '「〜のようだ」', desc: '敵が構えているスキルを効果2倍にしてコピー発動する。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_turns_out', title: 'It turns out...', type: 4, rarity: 'rare', cost: 2, pronounce: 'ｲｯﾄｩﾀｰﾝｽﾞｱｳﾄｩ', translation: '「〜ということが判明する」', desc: '敵に10ダメージ。手札が5枚以上なら3枚ドロー＆エナジー+1。実質1コス。', baseDamage: 0 },
    { id: 'a_turns_out_plus', title: 'It turns out...+', type: 4, rarity: 'rare', cost: 2, pronounce: 'ｲｯﾄｩﾀｰﾝｽﾞｱｳﾄｩ', translation: '「〜ということが判明する」', desc: '敵に15ダメージ。条件達成で4枚ドロー＆エナジー+2。', baseDamage: 0 },
    
    { id: 'a_stand_corrected', title: 'I stand corrected...', type: 4, rarity: 'rare', cost: 1, pronounce: 'ｱｲｽﾀﾝﾄﾞｩｺﾚｸﾃｨｯﾄﾞｩ', translation: '「考えを改める」', desc: '【廃棄/コスト1】手札をすべて捨て、捨てた枚数の2倍ドロー。（※手動破棄なし。単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_stand_corrected_plus', title: 'I stand corrected...+', type: 4, rarity: 'rare', cost: 1, pronounce: 'ｱｲｽﾀﾝﾄﾞｩｺﾚｸﾃｨｯﾄﾞｩ', translation: '「考えを改める」', desc: '【廃棄/コスト1】手札をすべて捨て、捨てた枚数の2倍ドロー ＆ エナジー+1。', baseDamage: 0 },

    // --- Type 5 (🟣 WH-Clause) ---
    { id: 'a_know_who', title: 'I know...', type: 5, rarity: 'starter', cost: 1, pronounce: 'ｱｲﾉｳ', translation: '「知っている」', desc: '敵に6ダメージ。次に使うカードのダメージを+3する。', baseDamage: 4 },
    { id: 'a_know_who_plus', title: 'I know...+', type: 5, rarity: 'rare', cost: 1, pronounce: 'ｱｲﾉｳ', translation: '「知っている」', desc: '敵に10ダメージ。次に使うカードのダメージを+6する。', baseDamage: 6 },
    
    { id: 'a_know_where', title: 'I know...', type: 5, rarity: 'common', cost: 1, pronounce: 'ｱｲﾉｳ', translation: '「知っている」', desc: '敵がデバフ状態ならダメージ2倍（基本8ダメージ）。', baseDamage: 4 },
    { id: 'a_know_where_plus', title: 'I know...+', type: 5, rarity: 'rare', cost: 0, pronounce: 'ｱｲﾉｳ', translation: '「知っている」', desc: '【コスト0】デバフ脆弱シナジーで大ダメージ。', baseDamage: 6 },
    
    { id: 'a_dont_know_why', title: "I don't know...", type: 5, rarity: 'common', cost: 1, pronounce: 'ｱｲﾄﾞﾝﾉｳ', translation: '「わからない」', desc: '敵にランダムなデバフ（脆弱、脱力など）を2つ付与。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_dont_know_why_plus', title: "I don't know...+", type: 5, rarity: 'rare', cost: 0, pronounce: 'ｱｲﾄﾞﾝﾉｳ', translation: '「わからない」', desc: '【コスト0】敵にランダムなデバフを2つ付与。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_show_how', title: "I'll show you...", type: 5, rarity: 'rare', cost: 2, pronounce: 'ｱｲﾙｼｮｳﾕｰ', translation: '「見せよう」', desc: '【レア】次の自分の攻撃ダメージが必ず2倍になる。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_show_how_plus', title: "I'll show you...+", type: 5, rarity: 'rare', cost: 1, pronounce: 'ｱｲﾙｼｮｳﾕｰ', translation: '「見せよう」', desc: '【レア/コスト1】次の自分の攻撃ダメージが「3倍」になる。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_know_what', title: 'I know...', type: 5, rarity: 'uncommon', cost: 2, pronounce: 'ｱｲﾉｳ', translation: '「知っている」', desc: '敵の行動を看破し、このターンの被ダメージを0にする。（※単体での攻撃・防御なし）', baseDamage: 0 },
    { id: 'a_know_what_plus', title: 'I know...+', type: 5, rarity: 'rare', cost: 1, pronounce: 'ｱｲﾉｳ', translation: '「知っている」', desc: '【コスト1】被ダメージを0にする。（※単体での攻撃・防御なし）', baseDamage: 0 },
    
    { id: 'a_dont_care_who', title: "I don't care...", type: 5, rarity: 'uncommon', cost: 2, pronounce: 'ｱｲﾄﾞﾝｹｱ', translation: '「気にしない」', desc: '【全体遅延攻撃】敵全体に8ダメージ。敵が「攻撃」を構えているなら+4ダメージ。（※単体ダイレクト攻撃は発生せず、トッピング時のみ攻撃）', baseDamage: 0 },
    { id: 'a_dont_care_who_plus', title: "I don't care...+", type: 5, rarity: 'rare', cost: 2, pronounce: 'ｱｲﾄﾞﾝｹｱ', translation: '「気にしない」', desc: '【全体遅延/コスト2】敵全体に14ダメージ。敵が「攻撃」を構えているなら+8ダメージ。', baseDamage: 0 },
    
    { id: 'a_know_when', title: 'Do you know...?', type: 5, rarity: 'uncommon', cost: 2, pronounce: 'ﾃﾞｭｰﾕｰﾉｳ', translation: '「知っている？」', desc: '現在のターン数×6ダメージ。', baseDamage: 0 },
    { id: 'a_know_when_plus', title: 'Do you know...?+', type: 5, rarity: 'rare', cost: 2, pronounce: 'ﾃﾞｭｰﾕｰﾉｳ', translation: '「知っている？」', desc: '現在のターン数×10ダメージ。', baseDamage: 0 },
    
    { id: 'a_no_idea_how', title: 'I have no idea...', type: 5, rarity: 'rare', cost: 3, pronounce: 'ｱｲﾊｳﾞﾉｰｱｲﾃﾞｨｱ', translation: '「見当がつかない」', desc: '自分のHPが減っているほど、敵の最大HPの15%のダメージ。', baseDamage: 0 },
    { id: 'a_no_idea_how_plus', title: 'I have no idea...+', type: 5, rarity: 'rare', cost: 2, pronounce: 'ｱｲﾊｳﾞﾉｰｱｲﾃﾞｨｱ', translation: '「見当がつかない」', desc: '【コスト2】自分のHPが減っているほど、敵の最大HPの20%のダメージ。', baseDamage: 0 },
    
    { id: 'a_depends_what', title: 'It depends on...', type: 5, rarity: 'rare', cost: 2, pronounce: 'ｲｯﾄｩﾃｨﾍﾟﾝｽﾞｵﾝ', translation: '「〜による」', desc: '手札のType1〜4のカードの種類数×8ダメージ。', baseDamage: 0 },
    { id: 'a_depends_what_plus', title: 'It depends on...+', type: 5, rarity: 'rare', cost: 2, pronounce: 'ｲｯﾄｩﾃｨﾍﾟﾝｽﾞｵﾝ', translation: '「〜による」', desc: '手札のType1〜4のカードの種類数×15ダメージ。', baseDamage: 0 }
  ],

  // B Choices (Verbs / Actions)
  bChoices: {
    1: [
      { text: 'go', color: 'red', type: 1, val: 4, effect: 'boost', translation: '行く', desc: '攻守 +4' },
      { text: 'stay', color: 'blue', type: 1, val: 4, effect: 'boost', translation: '留まる', desc: '攻守 +4' },
      { text: 'play', color: 'blue', type: 1, val: 4, effect: 'boost', translation: '遊ぶ', desc: '攻守 +4' },
      { text: 'understand', color: 'purple', type: 1, val: 9, effect: 'boost', translation: '理解する', desc: '攻守 +9' },
      { text: 'remember', color: 'purple', type: 1, val: 9, effect: 'boost', translation: '思い出す', desc: '攻守 +9' },
      { text: 'accept', color: 'purple', type: 1, val: 9, effect: 'boost', translation: '受け入れる', desc: '攻守 +9' },
      { text: 'going', color: 'trap', type: 1, val: 0, effect: 'boost_trap', translation: '行くこと', desc: '【罠】自爆ダメ 5 ＆ 脆弱', isTrap: true },
      { text: 'went', color: 'trap', type: 1, val: 0, effect: 'boost_trap', translation: '行った', desc: '【罠】自爆ダメ 5 ＆ 脆弱', isTrap: true }
    ],
    2: [
      { text: 'running', color: 'red', type: 2, val: 4, effect: 'boost', translation: '走ること', desc: '攻守 +4' },
      { text: 'working', color: 'blue', type: 2, val: 4, effect: 'boost', translation: '働くこと', desc: '攻守 +4' },
      { text: 'living', color: 'blue', type: 2, val: 4, effect: 'boost', translation: '生きること', desc: '攻守 +4' },
      { text: 'complaining', color: 'purple', type: 2, val: 9, effect: 'boost', translation: '不平を言うこと', desc: '攻守 +9' },
      { text: 'exploring', color: 'purple', type: 2, val: 9, effect: 'boost', translation: '探検すること', desc: '攻守 +9' },
      { text: 'improving', color: 'purple', type: 2, val: 9, effect: 'boost', translation: '改善すること', desc: '攻守 +9' },
      { text: 'run', color: 'trap', type: 2, val: 0, effect: 'boost_trap', translation: '走る', desc: '【罠】自爆ダメ 5 ＆ 脆弱', isTrap: true },
      { text: 'to run', color: 'trap', type: 2, val: 0, effect: 'boost_trap', translation: '走るために', desc: '【罠】自爆ダメ 5 ＆ 脆弱', isTrap: true }
    ],
    3: [
      { text: 'done', color: 'red', type: 3, val: 4, effect: 'boost', translation: 'なされた', desc: '攻守 +4' },
      { text: 'seen', color: 'blue', type: 3, val: 4, effect: 'boost', translation: '見られた', desc: '攻守 +4' },
      { text: 'gone', color: 'blue', type: 3, val: 4, effect: 'boost', translation: '行ってしまった', desc: '攻守 +4' },
      { text: 'forgotten', color: 'purple', type: 3, val: 9, effect: 'boost', translation: '忘れられた', desc: '攻守 +9' },
      { text: 'stolen', color: 'purple', type: 3, val: 9, effect: 'boost', translation: '盗まれた', desc: '攻守 +9' },
      { text: 'repaired', color: 'purple', type: 3, val: 9, effect: 'boost', translation: '修理された', desc: '攻守 +9' },
      { text: 'did', color: 'trap', type: 3, val: 0, effect: 'boost_trap', translation: 'した(過去形)', desc: '【罠】自爆ダメ 5 ＆ 脆弱', isTrap: true },
      { text: 'do', color: 'trap', type: 3, val: 0, effect: 'boost_trap', translation: 'する(原形)', desc: '【罠】自爆ダメ 5 ＆ 脆弱', isTrap: true }
    ],
    4: [
      { text: 'you are right', color: 'red', type: 4, val: 4, effect: 'boost', translation: 'あなたの言う通りだ', desc: '攻守 +4' },
      { text: 'it works', color: 'blue', type: 4, val: 4, effect: 'boost', translation: 'それは機能する', desc: '攻守 +4' },
      { text: 'I can do it', color: 'blue', type: 4, val: 4, effect: 'boost', translation: '私ならできる', desc: '攻守 +4' },
      { text: 'everything will be fine', color: 'purple', type: 4, val: 9, effect: 'boost', translation: 'すべて上手くいくだろう', desc: '攻守 +9' },
      { text: 'we made a mistake', color: 'purple', type: 4, val: 9, effect: 'boost', translation: '私たちは間違えた', desc: '攻守 +9' },
      { text: 'to you', color: 'trap', type: 4, val: 0, effect: 'boost_trap', translation: 'あなたへ(句)', desc: '【罠】自爆ダメ 5 ＆ 脆弱', isTrap: true },
      { text: 'because', color: 'trap', type: 4, val: 0, effect: 'boost_trap', translation: 'なぜなら(接続詞のみ)', desc: '【罠】自爆ダメ 5 ＆ 脆弱', isTrap: true }
    ],
    5: [
      { text: 'who you live with', color: 'red', type: 5, val: 4, effect: 'boost', translation: 'あなたが誰と住んでいるか', desc: '攻守 +4' },
      { text: 'where it is', color: 'blue', type: 5, val: 4, effect: 'boost', translation: 'それがどこにあるか', desc: '攻守 +4' },
      { text: 'why we should go', color: 'blue', type: 5, val: 4, effect: 'boost', translation: 'なぜ私たちが行くべきか', desc: '攻守 +4' },
      { text: 'what happened last night', color: 'purple', type: 5, val: 9, effect: 'boost', translation: '昨夜何が起きたか', desc: '攻守 +9' },
      { text: 'how the treasure was stolen', color: 'purple', type: 5, val: 9, effect: 'boost', translation: 'どうやって宝が盗まれたか', desc: '攻守 +9' },
      { text: 'who is he?', color: 'trap', type: 5, val: 0, effect: 'boost_trap', translation: '彼は誰ですか(疑問文順)', desc: '【罠】自爆ダメ 5 ＆ 脆弱', isTrap: true },
      { text: 'where is it?', color: 'trap', type: 5, val: 0, effect: 'boost_trap', translation: 'それはどこですか(疑問文順)', desc: '【罠】自爆ダメ 5 ＆ 脆弱', isTrap: true }
    ]
  },

  // Topping Choices (Extra attachments)
  toppings: [
    { id: 'top_crying', text: 'crying', cost: 1, val: 6, effect: 'shield', translation: '泣きながら', desc: 'シールド+6', icon: '😭' },
    { id: 'top_headache', text: 'with a headache', cost: 1, val: 6, effect: 'attack', translation: '頭痛を抱えて', desc: '追加ダメージ +6', icon: '🤕' },
    { id: 'top_laughing', text: 'laughing out loud', cost: 1, val: 2, effect: 'debuff_vuln', translation: '大笑いしながら', desc: '脆弱(被ダメ+50%) 2ターン', icon: '😂' }, // Vulnerable lasts 2 turns
    { id: 'top_dictionary', text: 'holding a dictionary', cost: 1, val: 1, effect: 'draw', translation: '辞書を持ちながら', desc: 'カードを1枚引く', icon: '📖' }
  ],

  bossRelics: {
    'megaphone': { id: 'megaphone', name: '巨人のメガホン', desc: 'コスト2以上のAカード使用時、戦闘中永続で攻撃力が ＋3 される。', icon: '📢' },
    'fountain_pen': { id: 'fountain_pen', name: '万年筆', desc: '戦闘中に1ターンにカードを3枚以上引いた場合、エナジーを ＋1 回復する。', icon: '✒️' },
    'coffee': { id: 'coffee', name: '冷めたブラックコーヒー', desc: '敵にデバフ（毒、脆弱、脱力など）を与えるたび、自分のシールドが ＋3 される。', icon: '☕' }
  },

  relics: {
    'dictionary_piece': { id: 'dictionary_piece', name: '電子辞書の破片', desc: '全ての選択フェーズの制限時間が+1.5秒される', icon: '💾' },
    'fluorescent_marker': { id: 'fluorescent_marker', name: '蛍光マーカー', desc: '選択肢が出現した瞬間、正解のBフレーズの1つをネオングリーンに光らせる', icon: '🖍️' },
    'desire_bracelet': { id: 'desire_bracelet', name: '欲望のブレスレット', desc: 'Type 1(原形)を発動した際、追加で敵に3ダメージを与える', icon: '📿' },
    'photo_frame': { id: 'photo_frame', name: '思い出のフォトフレーム', desc: 'Type 3(過去分詞系)カードでシールド獲得時、追加シールド+4', icon: '🖼️' }
  }
};

// --- Enemy Templates ---
const ENEMY_TEMPLATES = {
  // Layer 1
  slime_1: {
    id: 'slime_1',
    name: '見習いスライム',
    maxHp: 20, // 40 -> 20
    avatar: '🟢',
    desc: 'Bパーツで惑わせてくるスライム。',
    actions: [
      { type: 'attack', val: 7, desc: '体当たり (7 ダメージ)' },
      { type: 'shield', val: 3, desc: 'ゼリーシールド (シールド3)' }
    ]
  },
  slime_2: {
    id: 'slime_2',
    name: 'タイポ・スライム',
    maxHp: 25, // 50 -> 25
    avatar: '🟢',
    desc: '不適切な文法形態を混ぜて惑わせてくる',
    actions: [
      { type: 'attack', val: 8, desc: 'ヘドロ吐き (8 ダメージ)' },
      { type: 'shield', val: 4, desc: '硬化 (シールド4)' }
    ]
  },
  slime_3: {
    id: 'slime_3',
    name: '巨大スライム',
    maxHp: 30, // 60 -> 30
    avatar: '🟢',
    desc: 'お邪魔カードを送り込んできてデッキを圧迫するスライム。',
    actions: [
      { type: 'attack', val: 9, desc: '押しつぶし (9 ダメージ)' },
      { type: 'add_waste', val: 1, desc: '粘着糸 (お邪魔カード「傷口」を捨て札に1枚追加)' },
      { type: 'attack', val: 11, desc: '強のしかかり (11 ダメージ)' }
    ]
  },
  slime_boss: {
    id: 'slime_boss',
    name: 'スライムキング (1層ボス)',
    maxHp: 100,
    avatar: '👑🟢',
    desc: '3ターン周期行動：通常 ➔ 攻撃2倍バフ ➔ 特大プレス',
    actions: [
      { type: 'attack', val: 11, desc: 'ロイヤルスタンプ (11 ダメージ)' },
      { type: 'buff_double_next', val: 0, desc: '王の激昂 (次のターン攻撃力2倍バフ)' },
      { type: 'attack', val: 15, desc: 'キングプレス (15 大ダメージ)' }
    ]
  },

  // Layer 2
  shadow_1: {
    id: 'shadow_1',
    name: '影の使い魔',
    maxHp: 35, // 75 -> 35
    avatar: '🦇',
    desc: '制限時間を少し短縮する。さらにトッピングするたびに筋力+2。',
    toppingReaction: true,
    actions: [
      { type: 'attack', val: 10, desc: '影噛みつき (10 ダメージ)' },
      { type: 'shield', val: 5, desc: 'ダークカバー (シールド5)' }
    ]
  },
  shadow_2: {
    id: 'shadow_2',
    name: 'さまようシャドー',
    maxHp: 40, // 85 -> 40
    avatar: '👥',
    desc: '毎ターン筋力+3のバフをかける。速攻で倒さないとインフレする。',
    actions: [
      { type: 'buff_strength_gain', val: 3, desc: '自己増殖 (毎ターン筋力+3のバフ)' },
      { type: 'attack', val: 9, desc: 'シャドークロー (9 ダメージ)' },
      { type: 'attack', val: 11, desc: '闇の連続撃 (11 ダメージ)' }
    ]
  },
  shadow_3: {
    id: 'shadow_3',
    name: '凶悪なシャドー',
    maxHp: 45, // 95 -> 45
    avatar: '👥',
    desc: 'プレイヤーに「混乱（コストランダム化）」を付与してくる。',
    actions: [
      { type: 'debuff_confuse', val: 3, desc: 'カオス・ノイズ (混乱デバフ3ターン)' },
      { type: 'add_waste', val: 1, desc: '影の足枷 (お邪魔カード「傷口」を捨て札に1枚追加)' },
      { type: 'attack', val: 12, desc: 'ダークストライク (12 ダメージ)' }
    ]
  },
  shadow_boss: {
    id: 'shadow_boss',
    name: '早口のシャドー (2層ボス)',
    maxHp: 190,
    avatar: '👑👥',
    desc: 'プレイヤーのバフを解除する「バフ無効化」を行ってくる。',
    actions: [
      { type: 'attack', val: 13, desc: '早口影撃 (13 ダメージ)' },
      { type: 'wipe_buff', val: 0, desc: '文法リセット (プレイヤーの完成バフを0に戻す)' },
      { type: 'attack', val: 17, desc: 'シャドーストライク (17 ダメージ)' }
    ]
  },

  // Layer 3
  instructor_1: {
    id: 'instructor_1',
    name: '見習い小僧',
    maxHp: 50, // 110 -> 50
    avatar: '👶',
    desc: '1ターンおきに「無形（被ダメージがすべて1）」になる。',
    actions: [
      { type: 'intangible', val: 1, desc: '透化 (1ターン無形状態になるバフ)' },
      { type: 'attack', val: 12, desc: '落書きチョーク (12 ダメージ)' }
    ]
  },
  instructor_2: {
    id: 'instructor_2',
    name: '赤ペン小僧',
    maxHp: 60, // 125 -> 60
    avatar: '👶',
    desc: 'カウントダウン：5ターン目に攻撃力が爆発的に上昇する。',
    actions: [
      { type: 'attack', val: 10, desc: '赤ペン突き (10 ダメージ)' },
      { type: 'shield', val: 7, desc: '消しゴムシールド (シールド7)' },
      { type: 'countdown_power', val: 5, desc: '集中力充填 (5ターン目に爆発強化予告)' }
    ]
  },
  instructor_3: {
    id: 'instructor_3',
    name: '筆頭赤ペン小僧',
    maxHp: 65, // 140 -> 65
    avatar: '🧑‍🏫',
    desc: '脆弱デバフ（プレイヤーの被ダメージ1.5倍）を付与。',
    actions: [
      { type: 'debuff_vulnerable', val: 2, desc: '赤ペン指摘 (脆弱2ターン付与)' },
      { type: 'add_waste', val: 2, desc: '過剰指導 (お邪魔カード「傷口」を捨て札に2枚追加)' },
      { type: 'attack', val: 13, desc: '赤ペン乱舞 (13 ダメージ)' }
    ]
  },
  instructor_boss: {
    id: 'instructor_boss',
    name: '文法の鬼教官 (3層ボス)',
    maxHp: 330,
    avatar: '👹',
    desc: 'すべてを司る教官。バフ無効、無形、呪いなどを織り交ぜてくる。',
    actions: [
      { type: 'attack', val: 14, desc: '赤ペン突撃 (14 ダメージ)' },
      { type: 'curse', val: 0, desc: '「原形に戻れ！」(手札呪い予告)' },
      { type: 'intangible', val: 1, desc: '精神集中 (無形1ターン獲得)' },
      { type: 'wipe_buff', val: 0, desc: '問答無用 (プレイヤーのバフを完全打ち消し)' },
      { type: 'attack', val: 22, desc: '再提出ギロチン (22 大ダメージ)' }
    ]
  }
};

let state = {
  screen: 'title', // title, char_select, neow_bonus, map, map_choice, battle, shop, rest, victory, defeat
  player: {
    class: 'default',
    hp: 30,
    maxHp: 30,
    gold: 99,
    energy: 3,
    maxEnergy: 3,
    deck: [],
    hand: [],
    discard: [],
    exiled: [],
    relics: [], 
    potions: [null, null],
    shield: 0,
    tempPower: 0, 
    critMultiplier: 1,
    sentencePower: 0, // Gained ONLY via topping completed sentence in battle
    statusEffects: {
      weak: 0,
      poison: 0,
      vulnerable: 0,
      counter: 0,
      confused: 0,     // Confusion status
      buffProtect: false,
      nextTurnDamageBoost: 0,
      nextAttackMultiplier: 0
    }
  },
  battle: {
    enemies: [],
    targetIndex: 0, // Targets enemy panel click selection
    turn: 1,
    currentSlotCard: null,
    chosenVerb: null,
    chosenToppings: [],
    choices: [],
    toppingChoices: [],
    timerVal: 0,
    maxTimerVal: 6,
    timerInterval: null,
    combatLog: [],
    battlePhase: 'a_select', 
    rerollCount: 1, 
    drawnThisTurn: 0, 
    fountainPenTriggered: false,
    cardCostModifiers: {}, // Key: handIndex, Value: cost modifier
    discardSelectCount: 0,
    discardCallback: null,
    shouldExileCurrentCard: false,
    // Accumulators for help_but double effect
    lastSentenceDmg: 0,
    lastSentenceShld: 0,
    smallTalkUsed: false // FIX: Track small talk usage per turn
  },
  map: {
    currentFloor: 0,
    currentLayer: 1, 
    nodes: [
      // Layer 1
      { floor: 1, type: 'battle', enemyId: 'slime_1', label: '1-1: 見習いスライム', visited: false },
      { floor: 2, type: 'battle', enemyId: 'slime_2', label: '1-2: タイポ・スライム', visited: false },
      { floor: 3, type: 'battle', enemyId: 'slime_3', label: '1-3: 巨大スライム', visited: false },
      { floor: 4, type: 'choice', choices: ['shop', 'rest'], label: '1-4: 選択: ショップ / 休憩', visited: false },
      { floor: 5, type: 'battle', enemyId: 'slime_boss', label: '1-5: 1層ボス: スライムキング', visited: false },
      // Layer 2
      { floor: 6, type: 'battle', enemyId: 'shadow_1', label: '2-1: 影の使い魔', visited: false },
      { floor: 7, type: 'battle', enemyId: 'shadow_2', label: '2-2: さまようシャドー', visited: false },
      { floor: 8, type: 'battle', enemyId: 'shadow_3', label: '2-3: 凶悪なシャドー', visited: false },
      { floor: 9, type: 'choice', choices: ['shop', 'rest'], label: '2-4: 選択: ショップ / 休憩', visited: false },
      { floor: 10, type: 'battle', enemyId: 'shadow_boss', label: '2-5: 2層ボス: 早口のシャドー', visited: false },
      // Layer 3
      { floor: 11, type: 'battle', enemyId: 'instructor_1', label: '3-1: 見習い小僧', visited: false },
      { floor: 12, type: 'battle', enemyId: 'instructor_2', label: '3-2: 赤ペン小僧', visited: false },
      { floor: 13, type: 'battle', enemyId: 'instructor_3', label: '3-3: 筆頭赤ペン小僧', visited: false },
      { floor: 14, type: 'choice', choices: ['shop', 'rest'], label: '3-4: 選択: ショップ / 休憩', visited: false },
      { floor: 15, type: 'battle', enemyId: 'instructor_boss', label: '3-5: 最終ボス: 文法の鬼教官', visited: false }
    ],
    selectedChoice: null
  },
  shop: {
    cards: [],
    relics: [],
    potions: [],
    removePrice: 50,
    upgradePrice: 50,
    hasRemovedThisShop: false,
    hasUpgradedThisShop: false
  },
  rest: {
    used: false
  }
};

// --- Active Grammar Dictionary Tab State ---
let activeDictTab = 1;
let deckViewerMode = 'view'; // view, remove, upgrade, upgrade_shop, remove_rest
let currentPreviewCardIndex = null;
let hasRelicChosen = false; 

// --- Damage Popup helper ---
function showDamagePopup(target, amount, type) {
  let parentId = '';
  if (target === 'player') parentId = 'player-avatar-box';
  else if (target === 'enemy-0') parentId = 'enemy-avatar-box-0';
  else if (target === 'enemy-1') parentId = 'enemy-avatar-box-1';
  
  const parent = document.getElementById(parentId);
  if (!parent) return;
  
  const popup = document.createElement('div');
  popup.className = `combat-popup ${type}`;
  
  let text = '';
  if (type === 'damage') text = `-${amount}`;
  if (type === 'shield') text = `+${amount} 🛡️`;
  if (type === 'block') text = `🛡️ブロック ${amount}`;
  if (type === 'heal') text = `+${amount} ❤️`;
  
  popup.innerHTML = text;
  parent.appendChild(popup);
  
  setTimeout(() => {
    popup.remove();
  }, 1200);
}

// --- Toast notification helper ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// --- Combat Logger helper ---
function logCombat(message, type = 'system') {
  state.battle.combatLog.push({ message, type });
  const container = document.getElementById('combat-log-container');
  if (container) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.innerText = message;
    container.appendChild(entry);
    container.scrollTop = container.scrollHeight;
  }
}

// --- Card/Deck Utilities ---
function getRequiredNextTypeLabel(type) {
  switch (type) {
    case 1: return '👉 後ろ：動詞の原形';
    case 2: return '👉 後ろ：ing形 (動名詞)';
    case 3: return '👉 後ろ：過去分詞 (ed形)';
    case 4: return '👉 後ろ：主語＋動詞 (S+V)';
    case 5: return '👉 後ろ：WH節 (疑問詞+文)';
    default: return '';
  }
}

function getModText(mod) {
  if (!mod) return '';
  let parts = [];
  if (mod.attack !== 1.0) parts.push(`攻:${mod.attack}x`);
  if (mod.shield !== 1.0) parts.push(`防:${mod.shield}x`);
  if (mod.debuff !== 1.0) parts.push(`デバフ:${mod.debuff}x`);
  return parts.length > 0 ? parts.join(' / ') : '';
}

function getCardById(id) {
  return CARD_DATABASE.aCards.find(c => c.id === id);
}

// --- Instance-based Temporary Card Costs ---
function getCardCost(cardId, handIndex) {
  const baseCard = getCardById(cardId);
  if (!baseCard) return 0;
  
  if (state.battle.cardCostModifiers && state.battle.cardCostModifiers[handIndex] !== undefined) {
    return Math.max(0, baseCard.cost + state.battle.cardCostModifiers[handIndex]);
  }
  return baseCard.cost;
}

function initDeck(className) {
  state.player.deck = [
    'a_wanna', 'a_wanna', 'a_need', 'a_need',
    'a_gonna', 'a_lets', 'a_should',
    'a_like', 'a_think', 'a_know_who'
  ];
  shuffleDeck(state.player.deck);
}

function shuffleDeck(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function drawCards(num) {
  for (let i = 0; i < num; i++) {
    if (state.player.hand.length >= 10) break;
    if (state.player.deck.length === 0) {
      if (state.player.discard.length === 0) break;
      state.player.deck = [...state.player.discard];
      state.player.discard = [];
      shuffleDeck(state.player.deck);
      logCombat("山札が切れたため、捨て札をシャッフルして山札に戻しました。", "system");
    }
    const cardId = state.player.deck.pop();
    state.player.hand.push(cardId);
    const handIndex = state.player.hand.length - 1;
    
    // Confusion cost randomized check
    if (state.player.statusEffects.confused > 0) {
      const baseCard = getCardById(cardId);
      if (baseCard) {
        const randCost = Math.floor(Math.random() * 4); // 0 to 3 cost
        state.battle.cardCostModifiers[handIndex] = randCost - baseCard.cost;
      }
    }
    
    // Track cards drawn this turn for Fountain Pen Relic
    if (state.screen === 'battle') {
      state.battle.drawnThisTurn = (state.battle.drawnThisTurn || 0) + 1;
      if (hasRelic('fountain_pen') && state.battle.drawnThisTurn >= 3 && !state.battle.fountainPenTriggered) {
        state.player.energy = Math.min(state.player.maxEnergy + 2, state.player.energy + 1);
        state.battle.fountainPenTriggered = true;
        logCombat("【万年筆】1ターンに3枚以上カードを引いたため、エナジー+1回復！", "system");
      }
    }
  }
}

function hasRelic(relicId) {
  return state.player.relics.includes(relicId);
}

function isBattleOver() {
  return state.player.hp <= 0 || state.battle.enemies.length === 0;
}

// --- Battle Logic ---
function startBattle(enemyId) {
  const template = ENEMY_TEMPLATES[enemyId];
  const primaryEnemy = {
    ...template,
    hp: template.maxHp,
    shield: 0,
    tempPower: 0,
    nextActionIndex: 0,
    intent: null,
    statusEffects: { weak: 0, poison: 0, vulnerable: 0, intangible: 0, strength: 0 }
  };
  
  state.battle.enemies = [primaryEnemy];
  state.battle.targetIndex = 0; 
  
  // Dynamic minion spawns
  if (enemyId === 'slime_3' || enemyId === 'slime_boss') {
    state.battle.enemies.push({
      id: 'sub_slime',
      name: 'プチスライム',
      maxHp: 30, 
      hp: 30,
      avatar: '💧',
      desc: 'お供として現れ、シールドで本体を守る。',
      shield: 0,
      tempPower: 0,
      nextActionIndex: 0,
      actions: [
        { type: 'attack', val: 7, desc: 'ぷちプレス (7 ダメージ)' },
        { type: 'shield', val: 4, desc: 'ぷちガード (シールド4)' }
      ],
      intent: null,
      statusEffects: { weak: 0, poison: 0, vulnerable: 0, intangible: 0, strength: 0 }
    });
  } else if (enemyId === 'shadow_3' || enemyId === 'shadow_boss') {
    state.battle.enemies.push({
      id: 'familiar',
      name: '影の使い魔',
      maxHp: 45, 
      hp: 45,
      avatar: '🦇',
      desc: '後衛に隠れて攻撃してくる使い魔。',
      shield: 0,
      tempPower: 0,
      nextActionIndex: 0,
      actions: [
        { type: 'attack', val: 8, desc: '影噛みつき (8 ダメージ)' },
        { type: 'shield', val: 3, desc: '影の帳 (シールド3)' }
      ],
      intent: null,
      statusEffects: { weak: 0, poison: 0, vulnerable: 0, intangible: 0, strength: 0 }
    });
  } else if (enemyId === 'instructor_3' || enemyId === 'instructor_boss') {
    state.battle.enemies.push({
      id: 'apprentice',
      name: '赤ペン小僧',
      maxHp: 65, 
      hp: 65,
      avatar: '👶',
      desc: 'バリアや攻撃で教官を補助する。',
      shield: 0,
      tempPower: 0,
      nextActionIndex: 0,
      actions: [
        { type: 'attack', val: 9, desc: '落書きチョーク (9 ダメージ)' },
        { type: 'shield', val: 6, desc: '消しゴムバリア (シールド6)' }
      ],
      intent: null,
      statusEffects: { weak: 0, poison: 0, vulnerable: 0, intangible: 0, strength: 0 }
    });
  }
  
  state.battle.turn = 1;
  state.battle.currentSlotCard = null;
  state.battle.chosenVerb = null;
  state.battle.chosenToppings = [];
  state.battle.combatLog = [];
  state.battle.cardCostModifiers = {};
  state.battle.shouldExileCurrentCard = false;
  state.battle.discardCallback = null;
  state.battle.lastSentenceDmg = 0;
  state.battle.lastSentenceShld = 0;
  state.battle.smallTalkUsed = false; // Reset turn start
  
  state.player.shield = 0;
  state.player.tempPower = 0;
  state.player.critMultiplier = 1;
  state.player.sentencePower = 0; 
  state.player.statusEffects = { weak: 0, poison: 0, vulnerable: 0, counter: 0, confused: 0, buffProtect: false };
  
  state.player.energy = state.player.maxEnergy;
  state.battle.rerollCount = 1; 
  state.battle.drawnThisTurn = 0;
  state.battle.fountainPenTriggered = false;
  
  state.player.deck = [...state.player.deck, ...state.player.hand, ...state.player.discard, ...state.player.exiled];
  state.player.hand = [];
  state.player.discard = [];
  state.player.exiled = [];
  shuffleDeck(state.player.deck);
  drawCards(5);
  
  state.battle.enemies.forEach(e => decideEnemyAction(e));
  state.battle.battlePhase = 'a_select';
  state.screen = 'battle';
  
  logCombat(`戦闘開始！ VS ${template.name}`, "system");
  render();
}

function selectTarget(index) {
  if (state.screen !== 'battle') return;
  if (index >= state.battle.enemies.length) return;
  state.battle.targetIndex = index;
  logCombat(`ターゲットを 「${state.battle.enemies[index].name}」 に切り替えました。`, "system");
  render();
}

function decideEnemyAction(enemy) {
  const actions = enemy.actions;
  const index = enemy.nextActionIndex;
  
  if (enemy.id === 'slime_boss') {
    const turnStep = (state.battle.turn - 1) % 3;
    enemy.intent = actions[turnStep] || actions[0];
  } else {
    enemy.intent = actions[index];
  }
}

function advanceEnemyActionIndex(enemy) {
  enemy.nextActionIndex = (enemy.nextActionIndex + 1) % enemy.actions.length;
}

// Grammar mistake generator for Slime
function makeGrammarMistake(text, correctType) {
  if (correctType === 1) {
    if (Math.random() < 0.5) {
      if (text.startsWith('go')) return 'going';
      if (text.startsWith('stay')) return 'staying';
      if (text.startsWith('play')) return 'playing';
      if (text.startsWith('understand')) return 'understanding';
      if (text.startsWith('remember')) return 'remembering';
      if (text.startsWith('accept')) return 'accepting';
      return text + 'ing';
    } else {
      if (text.startsWith('go')) return 'went';
      if (text.startsWith('stay')) return 'stayed';
      if (text.startsWith('play')) return 'played';
      if (text.startsWith('understand')) return 'understood';
      if (text.startsWith('remember')) return 'remembered';
      if (text.startsWith('accept')) return 'accepted';
      return text + 'ed';
    }
  }
  if (correctType === 2) {
    if (text.startsWith('running')) return 'run';
    if (text.startsWith('working')) return 'work';
    if (text.startsWith('living')) return 'live';
    if (text.startsWith('complaining')) return 'complain';
    if (text.startsWith('exploring')) return 'explore';
    if (text.startsWith('improving')) return 'improve';
    return text.replace('ing', '');
  }
  if (correctType === 3) {
    if (Math.random() < 0.5) {
      if (text.startsWith('done')) return 'do';
      if (text.startsWith('seen')) return 'see';
      if (text.startsWith('gone')) return 'go';
      if (text.startsWith('forgotten')) return 'forget';
      if (text.startsWith('stolen')) return 'steal';
      if (text.startsWith('repaired')) return 'repair';
      return text;
    } else {
      if (text.startsWith('done')) return 'doing';
      if (text.startsWith('seen')) return 'seeing';
      if (text.startsWith('gone')) return 'going';
      if (text.startsWith('forgotten')) return 'forgetting';
      if (text.startsWith('stolen')) return 'stealing';
      if (text.startsWith('repaired')) return 'repairing';
      return text;
    }
  }
  if (correctType === 4) {
    if (text.startsWith('you are')) return 'you be';
    if (text.startsWith('it works')) return 'to work';
    if (text.startsWith('I can')) return 'to do';
    return 'to ' + text;
  }
  if (correctType === 5) {
    if (text.startsWith('who you')) return 'who you are?';
    if (text.startsWith('where it')) return 'where is it?';
    if (text.startsWith('why we')) return 'why should we?';
    return 'is ' + text;
  }
  return text;
}

// Card details overlay viewer logic
function openCardPreview(cardId, index) {
  currentPreviewCardIndex = index;
  const modal = document.getElementById('card-preview-modal');
  const container = document.getElementById('preview-card-container');
  const playBtn = document.getElementById('preview-play-btn');
  
  if (!modal || !container || !playBtn) return;
  
  const card = getCardById(cardId);
  const cost = getCardCost(cardId, index);
  
  container.innerHTML = '';
  const cardEl = document.createElement('div');
  const isUpgraded = card.id.endsWith('_plus');
  cardEl.className = `game-card type-${card.type} rarity-${card.rarity} preview-card-large`;
  if (isUpgraded) cardEl.classList.add('rarity-rare');
  
  const translationHtml = card.translation ? `<div class="card-translation">${card.translation}</div>` : '';
  const rubyHtml = card.pronounce ? `<span class="card-pronounce">${card.pronounce}</span>` : '';
  
  cardEl.innerHTML = `
    <div class="card-cost-badge">${cost}</div>
    <div class="card-footer">
      <span class="card-type-tag">T${card.type}</span>
    </div>
    ${rubyHtml}
    <div class="card-title">${card.title}</div>
    ${translationHtml}
    <div class="card-body" style="margin-top: 15px;">${card.desc}</div>
    <div class="card-footer" style="font-size: 0.75rem; color: var(--text-secondary);">
      <span>${isUpgraded ? 'UPGRADED (+)' : card.rarity.toUpperCase()}</span>
    </div>
  `;
  container.appendChild(cardEl);
  
  playBtn.innerText = `このカードをプレイ (コスト: ${cost})`;
  if (state.player.energy < cost) {
    playBtn.setAttribute('disabled', 'true');
    playBtn.style.opacity = '0.5';
  } else {
    playBtn.removeAttribute('disabled');
    playBtn.style.opacity = '1';
  }
  
  modal.classList.add('active');
}

function closeCardPreview() {
  const modal = document.getElementById('card-preview-modal');
  if (modal) modal.classList.remove('active');
  currentPreviewCardIndex = null;
}

function confirmPlayCard() {
  if (currentPreviewCardIndex === null) return;
  const idx = currentPreviewCardIndex;
  closeCardPreview();
  playACard(idx);
}

function playACard(handIndex) {
  if (state.battle.battlePhase !== 'a_select') return;
  
  const cardId = state.player.hand[handIndex];
  const card = getCardById(cardId);
  const cost = getCardCost(cardId, handIndex);
  
  if (state.player.energy < cost) {
    showToast("エナジーが不足しています！", "error");
    return;
  }
  
  state.player.energy -= cost;
  state.player.hand.splice(handIndex, 1);
  state.battle.currentSlotCard = card;
  
  // Wound curse card just plays and goes straight to exile
  if (cardId === 'c_waste') {
    state.player.exiled.push('c_waste');
    logCombat("Wound (傷口) がプレイされ、廃棄（除外）されました。", "player");
    discardCurrentSentence();
    state.battle.battlePhase = 'a_select';
    render();
    return;
  }
  
  state.battle.battlePhase = 'b_select';
  generateBChoices(card.type);
  startBTimer();
  render();
}

function generateBChoices(type) {
  const pool = CARD_DATABASE.bChoices[type];
  const regularPool = pool.filter(b => !b.isTrap);
  const trapPool = pool.filter(b => b.isTrap);
  
  const shuffledRegulars = [...regularPool];
  shuffleDeck(shuffledRegulars);
  
  const guaranteedCorrect = shuffledRegulars.slice(0, 2);
  const remainingRegulars = shuffledRegulars.slice(2);
  const selected = [...guaranteedCorrect];
  
  if (trapPool.length > 0) {
    selected.push(trapPool[Math.floor(Math.random() * trapPool.length)]);
  } else if (remainingRegulars.length > 0) {
    selected.push(remainingRegulars.pop());
  }
  
  if (remainingRegulars.length > 0) {
    selected.push(remainingRegulars.pop());
  } else {
    selected.push(shuffledRegulars[0]); 
  }
  
  shuffleDeck(selected);
  
  let typoIntroduced = false;
  state.battle.choices = selected.map(choice => {
    let text = choice.text;
    let isTypo = false;
    
    if (!choice.isTrap && state.battle.enemies.length > 0 && state.battle.enemies[0].id.startsWith('slime')) {
      if (!typoIntroduced && Math.random() < 0.35) {
        text = makeGrammarMistake(text, type);
        isTypo = true;
        typoIntroduced = true;
      }
    }
    
    return {
      ...choice,
      displayText: text,
      isTypo: isTypo
    };
  });
}

function rerollBChoices() {
  if (state.battle.rerollCount <= 0) {
    showToast("このターンのリロール回数がありません！", "error");
    return;
  }
  
  state.battle.rerollCount--;
  generateBChoices(state.battle.currentSlotCard.type);
  showToast("Bパーツをリロールしました！", "success");
  render();
}

function startBTimer() {
  clearInterval(state.battle.timerInterval);
  
  let baseTimer = 6.0;
  if (state.battle.enemies.length > 0 && state.battle.enemies[0].id.startsWith('shadow')) {
    baseTimer = 4.5;
  }
  
  if (hasRelic('dictionary_piece')) {
    baseTimer += 1.5;
  }
  
  state.battle.timerVal = baseTimer;
  state.battle.maxTimerVal = baseTimer;
  
  const timerElement = document.getElementById('round-timer-val');
  const timerBox = document.getElementById('round-timer-box');
  
  if (timerElement) timerElement.innerText = state.battle.timerVal.toFixed(1);
  if (timerBox) timerBox.classList.remove('warning');
  
  state.battle.timerInterval = setInterval(() => {
    state.battle.timerVal -= 0.1;
    if (state.battle.timerVal <= 0) {
      state.battle.timerVal = 0;
      clearInterval(state.battle.timerInterval);
      handleBTimeout();
    } else {
      if (timerElement) timerElement.innerText = state.battle.timerVal.toFixed(1);
      if (state.battle.timerVal < 2.0) {
        if (timerBox) timerBox.classList.add('warning');
      }
    }
  }, 100);
}

function handleBTimeout() {
  clearInterval(state.battle.timerInterval);
  logCombat("時間切れ！ 自爆 5ダメージ ＆ 脆弱デバフを受けてターンが強制終了します。", "error");
  showToast("時間切れ！ ターン強制終了！", "error");
  
  takePlayerDamage(5);
  state.player.statusEffects.vulnerable += 1;
  
  discardCurrentSentence();
  state.battle.battlePhase = 'a_select';
  
  setTimeout(() => {
    endPlayerTurn();
  }, 1200);
}

function isModelActive() {
  return state.screen === 'battle' || state.screen === 'map';
}

function showGrammarExplanation(wrongChoice, type, isTrap) {
  const modal = document.getElementById('grammar-modal');
  const partA = document.getElementById('grammar-part-a');
  const partB = document.getElementById('grammar-part-b-wrong');
  const textContainer = document.getElementById('grammar-explanation-text');
  const closeBtn = document.getElementById('grammar-close-btn');
  
  if (!modal || !partA || !partB || !textContainer || !closeBtn) return;
  
  const titleA = state.battle.currentSlotCard ? state.battle.currentSlotCard.title : '???';
  partA.innerText = titleA + ' ';
  partB.innerText = wrongChoice.displayText;
  
  let explanation = '';
  if (isTrap) {
    explanation = `<strong>😈 【文法エラー！】 罠を選択してしまいました。(自爆 5ダメ ＆ 脆弱デバフ)</strong><br>
    "${titleA} ${wrongChoice.displayText}" は英語として不整合な構造です。<br><br>
    <strong>【何が間違っていたか】</strong><br>`;
  } else {
    explanation = `<strong>👾 【文法形態エラー！】 (スライムによる妨害です / 自爆 5ダメ ＆ 脆弱デバフ)</strong><br>
    "${titleA}" の後ろに "${wrongChoice.displayText}" を繋ぐことはできません。<br><br>
    <strong>【何が間違っていたか】</strong><br>`;
  }
  
  switch (type) {
    case 1:
      explanation += `"${titleA}"（wanna / need to / should 等）は、助動詞や不定詞 to の働きを持っています。したがって、後ろに続く動詞は必ず<strong>「動詞の原形（Base Form）」</strong>にする必要があります。<br>
      選択された "${wrongChoice.displayText}" は現在分詞(-ing)や過去形・過去分詞(-ed)に変形しているため不成立です。(正解例: go, stay, play)`;
      break;
    case 2:
      explanation += `"${titleA}"（like / keep / enjoy 等）は、目的語に<strong>「動名詞（-ing形）」</strong>のみを要求する表現です。<br>
      選択された "${wrongChoice.displayText}" の動詞が原形や不定詞の形をしているため、文法エラーとなります。(正解例: running, working)`;
      break;
    case 3:
      explanation += `"${titleA}"（I\'ve / I\'ve already 等）は現在完了形を作ります。したがって、後ろに続く動詞は<strong>「過去分詞（Past Participle）」</strong>にする必要があります。<br>
      選択された "${wrongChoice.displayText}" の動詞が原形や過去形のままであるため、不一致となります。(正解例: done, seen, gone)`;
      break;
    case 4:
      explanation += `"${titleA}"（I think / I hope 等）は、後ろに that（省略可）を伴う文系です。したがって、後ろには必ず<strong>「主語 + 動詞 (S + V)」からなる完全な文章</strong>が必要です。<br>
      選択された "${wrongChoice.displayText}" は前置詞句や接続詞単体で文章が終わっているため不成立です。(正解例: you are right, it works)`;
      break;
    case 5:
      explanation += `"${titleA}"（I know / I don't know 等）は間接疑問文（WH節）を作ります。WH節の中は「疑問詞 + 主語 + 動詞」という<strong>「肯定文と同じ語順（S+V）」</strong>にする必要があります。<br>
      選択された "${wrongChoice.displayText}" が is it? などの疑問文の語順になっているため不成立です。(正解例: who you live with, where it is)`;
      break;
    default:
      explanation += `文法形態が一致しません。AカードのTypeに応じた適切な形態のB選択肢を選択してください。`;
  }
  
  textContainer.innerHTML = explanation;
  modal.classList.add('active');
  
  const newCloseBtn = closeBtn.cloneNode(true);
  closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
  
  newCloseBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    discardCurrentSentence();
    state.battle.battlePhase = 'a_select';
    
    // B choice mistakes end player's turn immediately
    endPlayerTurn();
  });
}

function selectBChoice(index) {
  clearInterval(state.battle.timerInterval);
  const choice = state.battle.choices[index];
  const cardType = state.battle.currentSlotCard ? state.battle.currentSlotCard.type : 1;
  
  if (choice.isTrap) {
    logCombat(`文法エラー！ "${state.battle.currentSlotCard ? state.battle.currentSlotCard.title : '???'} ${choice.displayText}" は不成立。(自爆 5ダメージ ＆ 脆弱デバフ)`, "error");
    showToast("文法エラー！ 自爆 5ダメージ ＆ 脆弱！", "error");
    
    takePlayerDamage(5);
    state.player.statusEffects.vulnerable += 1;
    
    if (isBattleOver()) return;
    showGrammarExplanation(choice, cardType, true);
    
  } else if (choice.isTypo) {
    logCombat(`形態エラー！ "${state.battle.currentSlotCard ? state.battle.currentSlotCard.title : '???'} ${choice.displayText}" は不成立。(スライムの妨害 / 自爆 5ダメージ ＆ 脆弱デバフ)`, "error");
    showToast("文法不一致！ 自爆 5ダメージ ＆ 脆弱！", "error");
    
    takePlayerDamage(5);
    state.player.statusEffects.vulnerable += 1;
    
    if (isBattleOver()) return;
    showGrammarExplanation(choice, cardType, false);
    
  } else {
    state.battle.chosenVerb = choice;
    
    state.battle.lastSentenceDmg = 0;
    state.battle.lastSentenceShld = 0;
    
    applyCardEffect(state.battle.currentSlotCard, choice);
    if (isBattleOver()) return;
    
    if (state.battle.battlePhase !== 'card_discard_select') {
      proceedToPostBSelection(state.battle.currentSlotCard, choice);
    }
  }
}

function proceedToPostBSelection(aCard, bChoice) {
  logCombat(`文法成功！ "${aCard.title} ${bChoice.text}" を構築した。`, "player");
  
  if (state.player.energy > 0 && state.battle.enemies.length > 0) {
    state.battle.battlePhase = 'topping_select';
    generateToppingChoices();
  } else {
    logCombat("文を完成させました。", "player");
    finishSentence();
  }
  render();
}

function discardCurrentSentence() {
  if (state.battle.currentSlotCard) {
    if (state.battle.shouldExileCurrentCard) {
      state.player.exiled.push(state.battle.currentSlotCard.id);
      state.battle.shouldExileCurrentCard = false;
    } else {
      state.player.discard.push(state.battle.currentSlotCard.id);
    }
  }
  state.battle.currentSlotCard = null;
  state.battle.chosenVerb = null;
  state.battle.chosenToppings = [];
  state.battle.cardCostModifiers = {}; 
}

function generateToppingChoices() {
  const guaranteed = CARD_DATABASE.toppings.find(t => t.id === 'top_headache');
  const others = CARD_DATABASE.toppings.filter(t => t.id !== 'top_headache');
  shuffleDeck(others);
  
  state.battle.toppingChoices = [guaranteed, others[0], others[1]];
  shuffleDeck(state.battle.toppingChoices);
}

function selectTopping(index) {
  if (state.player.energy <= 0) {
    showToast("エナジーがありません！", "error");
    return;
  }
  
  const topping = state.battle.toppingChoices[index];
  state.player.energy -= topping.cost;
  state.battle.chosenToppings.push(topping);
  
  applyToppingEffect(topping);
  if (isBattleOver()) return;
  
  // Shadow topping reaction
  if (state.battle.enemies.length > 0 && state.battle.enemies[0].toppingReaction) {
    state.battle.enemies[0].tempPower = (state.battle.enemies[0].tempPower || 0) + 2;
    logCombat(`⚠️【トッピング妨害】${state.battle.enemies[0].name}は、トッピングに反応して一時攻撃力+2を獲得した！`, "enemy");
  }
  
  logCombat(`トッピング追加: "... ${topping.text}" (+ ${topping.desc})`, "player");
  
  const avatarBox = document.getElementById('player-avatar-box');
  if (avatarBox) {
    avatarBox.setAttribute('data-topping-icon', topping.icon);
  }
  
  if (state.player.energy > 0) {
    generateToppingChoices();
  } else {
    finishSentence();
  }
  render();
}

function getBuiltSentenceString() {
  let sentence = "";
  if (state.battle.currentSlotCard) {
    sentence += state.battle.currentSlotCard.title + " ";
  }
  if (state.battle.chosenVerb) {
    sentence += state.battle.chosenVerb.displayText;
  }
  if (state.battle.chosenToppings.length > 0) {
    sentence += " " + state.battle.chosenToppings.map(t => t.text).join(' ');
  }
  return sentence.trim();
}

function getBuiltSentenceTranslation() {
  let sentenceTrans = "";
  if (state.battle.currentSlotCard) {
    sentenceTrans += state.battle.currentSlotCard.translation + " ";
  }
  if (state.battle.chosenVerb) {
    sentenceTrans += "➔ 「" + state.battle.chosenVerb.translation + "」";
  }
  if (state.battle.chosenToppings.length > 0) {
    sentenceTrans += " ＋ 「" + state.battle.chosenToppings.map(t => t.translation).join('・') + "」";
  }
  return sentenceTrans.trim();
}

function finishSentence() {
  const builtSentence = getBuiltSentenceString();
  const builtTranslation = getBuiltSentenceTranslation();
  
  // Gained sentencePower (筋力) ONLY if toppings were attached
  let hasToppingBonus = false;
  if (state.battle.chosenToppings.length > 0) {
    state.player.sentencePower += 1;
    hasToppingBonus = true;
  }
  
  // doubleNextVerb re-execution logic for I can't help
  if (state.player.statusEffects.doubleNextVerb) {
    state.player.statusEffects.doubleNextVerb = false;
    logCombat("【I can't help (but)... 再発動】直前の英文と同じ効果を連続発動！", "system");
    if (state.battle.lastSentenceDmg > 0) {
      damageEnemy(state.battle.lastSentenceDmg);
    }
    if (state.battle.lastSentenceShld > 0) {
      gainPlayerShield(state.battle.lastSentenceShld);
    }
  }
  
  const banner = document.getElementById('sentence-complete-banner');
  const textEl = document.getElementById('completed-sentence-text');
  
  if (banner && textEl) {
    let bonusHeaderHtml = '';
    if (hasToppingBonus) {
      bonusHeaderHtml = `<div style="color: #00e676; font-size: 1.1rem; font-weight: bold; margin-bottom: 5px; text-shadow: 0 0 8px rgba(0, 230, 118, 0.6);">★【トッピングボーナス（筋力）発動！】</div>`;
    }
    
    textEl.innerHTML = `
      ${bonusHeaderHtml}
      <div class="english-line">${builtSentence}</div>
      <div class="japanese-line" style="font-size: 1.15rem; color: #94a3b8; margin-top: 10px; font-weight: normal; font-style: italic;">
        ${builtTranslation}
      </div>
    `;
    banner.style.display = 'block';
    
    // Extend display time of finished sentences by +2 seconds (total 4.2 seconds)
    setTimeout(() => {
      banner.style.display = 'none';
    }, 4200);
  }

  discardCurrentSentence();
  if (isBattleOver()) return;
  
  state.battle.battlePhase = 'a_select';
  
  setTimeout(() => {
    const avatarBox = document.getElementById('player-avatar-box');
    if (avatarBox) {
      avatarBox.setAttribute('data-topping-icon', '');
    }
  }, 1500);
  
  state.player.critMultiplier = 1;
  
  render();
}

function getSafeBattleActionTargets() {
  return {
    card: state.battle.currentSlotCard,
    verb: state.battle.chosenVerb
  };
}

function applyCardEffect(aCard, bChoice) {
  let val = bChoice.val;
  let baseDamage = aCard.baseDamage || 0;
  
  if (hasRelic('megaphone') && aCard.cost >= 2) {
    state.player.sentencePower += 3;
    logCombat("📢【巨人のメガホン】コスト2以上のカード使用：戦闘中永続攻撃力+3！", "system");
  }
  
  let appliedDebuff = false;
  
  // --- Individual Card Behaviors ---
  if (aCard.id === 'a_need' || aCard.id === 'a_need_plus') {
    gainPlayerShield(8);
  }
  
  if (aCard.id === 'a_gonna') {
    state.player.statusEffects.nextTurnDamageBoost += 4;
    logCombat("【I'm gonna...効果】次のターンの攻撃ダメージ +4 を付与！", "system");
  }
  if (aCard.id === 'a_gonna_plus') {
    state.player.statusEffects.nextTurnDamageBoost += 6;
    logCombat("【I'm gonna...+効果】次のターンの攻撃ダメージ +6 を付与！", "system");
  }
  
  if (aCard.id === 'a_should') {
    gainPlayerShield(10);
    const t1Index = state.player.deck.findIndex(cid => {
      const c = getCardById(cid);
      return c && c.type === 1;
    });
    if (t1Index !== -1) {
      const cid = state.player.deck.splice(t1Index, 1)[0];
      state.player.hand.push(cid);
      logCombat("【You should...効果】山札からType 1カードを引き当てました。", "system");
    } else {
      drawCards(1);
    }
  }
  if (aCard.id === 'a_should_plus') {
    gainPlayerShield(14);
    drawCards(1);
    state.player.nextTurnEnergyBonus = (state.player.nextTurnEnergyBonus || 0) + 1;
    logCombat("【You should...+効果】シールド+14 ＆ 山札ドロー ＆ 次ターンエナジー+1！", "system");
  }
  
  if (aCard.id === 'a_lets') {
    damageEnemy(3);
    logCombat("【Let's...効果】敵に3ダメージ", "system");
  }
  if (aCard.id === 'a_lets_plus') {
    damageEnemy(5);
    logCombat("【Let's...+効果】敵に5ダメージ", "system");
  }
  
  if (aCard.id === 'a_managed') {
    gainPlayerShield(18);
    state.player.statusEffects.doubleNextDamage = true;
    logCombat("【I managed to...効果】シールド18 ＆ 次ターンの全与ダメージ2倍！ (完成時に廃棄)", "system");
    state.battle.shouldExileCurrentCard = true;
  }
  if (aCard.id === 'a_managed_plus') {
    gainPlayerShield(18);
    state.player.statusEffects.doubleNextDamage = true;
    logCombat("【I managed to...+効果】シールド18 ＆ 次ターンの全与ダメージ2倍！", "system");
  }
  
  if (aCard.id === 'a_rather' || aCard.id === 'a_rather_plus') {
    if (state.player.hand.length > 0) {
      const randomIdx = Math.floor(Math.random() * state.player.hand.length);
      const discardedCardId = state.player.hand[randomIdx];
      state.player.hand.splice(randomIdx, 1);
      state.player.discard.push(discardedCardId);
      
      let dmg = 18;
      if (aCard.id === 'a_rather_plus' && getCardById(discardedCardId).type === 1) {
        dmg = 24;
        logCombat(`【I'd rather...+効果】手札からランダムに "${getCardById(discardedCardId).title}" (Type 1) を捨てて24ダメージに強化！`, "system");
      } else {
        logCombat(`【I'd rather...効果】手札からランダムに "${getCardById(discardedCardId).title}" を捨てて18ダメージ！`, "system");
      }
      damageEnemy(dmg);
    } else {
      damageEnemy(18);
    }
  }
  
  if (aCard.id === 'a_hurt_not_plus') {
    gainPlayerShield(8);
    drawCards(1);
  }
  if (aCard.id === 'a_hurt_not') {
    gainPlayerShield(4);
    drawCards(1);
  }
  
  if (aCard.id === 'a_were_would') {
    state.player.nextTurnDelayDamage = (state.player.nextTurnDelayDamage || 0) + 30;
    logCombat("【If I were to...効果】次ターン開始時に敵全体に30ダメージを与える爆弾をセット。", "system");
  }
  if (aCard.id === 'a_were_would_plus') {
    state.player.nextTurnDelayDamage = (state.player.nextTurnDelayDamage || 0) + 30;
    logCombat("【If I were to...+効果】次ターン開始時に敵全体に30ダメージを与える爆弾をセット。", "system");
  }
  
  if (aCard.id === 'a_takes_balls') {
    state.player.hp = Math.max(1, state.player.hp - 3);
    damageEnemy(40);
    logCombat("【It takes so much balls...効果】自傷3ダメージ ＆ 敵に40ダメージ！", "system");
  }
  if (aCard.id === 'a_takes_balls_plus') {
    state.player.hp = Math.max(1, state.player.hp - 3);
    damageEnemy(40);
    logCombat("【It takes so much balls...+効果】自傷3ダメージ ＆ 敵に40ダメージ！", "system");
  }

  // Type 2 (ing) Card Effects
  if (aCard.id === 'a_like') {
    if (state.battle.enemies.length > 0) {
      state.battle.enemies[0].statusEffects.poison += 8; 
      appliedDebuff = true;
      logCombat("【I like...効果】炎上(毎ターン4ダメ)を2ターン付与。", "system");
    }
  }
  if (aCard.id === 'a_like_plus') {
    if (state.battle.enemies.length > 0) {
      state.battle.enemies[0].statusEffects.poison += 18; 
      appliedDebuff = true;
      logCombat("【I like...+効果】炎上(毎ターン6ダメ)を3ターン付与！", "system");
    }
  }
  
  if (aCard.id === 'a_keep') {
    if (state.battle.enemies.length > 0) {
      const currentPoison = state.battle.enemies[0].statusEffects.poison;
      if (currentPoison > 0) {
        state.battle.enemies[0].statusEffects.poison *= 2;
        logCombat("【I keep...効果】敵の毒効果を2倍に増幅させました！", "system");
      } else {
        state.battle.enemies[0].statusEffects.poison += 4;
      }
      appliedDebuff = true;
      logCombat("【I keep...効果】毒(毎ターン4ダメ)を付与。", "system");
    }
  }
  if (aCard.id === 'a_keep_plus') {
    if (state.battle.enemies.length > 0) {
      const currentPoison = state.battle.enemies[0].statusEffects.poison;
      if (currentPoison > 0) {
        state.battle.enemies[0].statusEffects.poison *= 2;
      } else {
        state.battle.enemies[0].statusEffects.poison += 7;
      }
      appliedDebuff = true;
      logCombat("【I keep...+効果】毒を付与/増幅！", "system");
    }
  }
  
  if (aCard.id === 'a_bad_at') {
    if (state.battle.enemies.length > 0) {
      state.battle.enemies[0].statusEffects.weak += 2;
      appliedDebuff = true;
      logCombat("【I'm bad at...効果】敵に脱力2ターンを付与。", "system");
    }
  }
  if (aCard.id === 'a_bad_at_plus') {
    if (state.battle.enemies.length > 0) {
      state.battle.enemies[0].statusEffects.weak += 2;
      appliedDebuff = true;
      logCombat("【I'm bad at...+効果】敵に脱力2ターンを付与。", "system");
    }
  }
  
  if (aCard.id === 'a_enjoy') {
    gainPlayerShield(4);
    state.player.statusEffects.endTurnHeal = (state.player.statusEffects.endTurnHeal || 0) + 2;
    state.player.statusEffects.buffProtect = true;
    logCombat("【I enjoy...効果】シールド+4 ＆ 回復セット、さらにこのターンバフ保護獲得！", "system");
  }
  if (aCard.id === 'a_enjoy_plus') {
    gainPlayerShield(6);
    state.player.statusEffects.endTurnHeal = (state.player.statusEffects.endTurnHeal || 0) + 3;
    state.player.statusEffects.buffProtect = true;
    logCombat("【I enjoy...+効果】シールド+6 ＆ 回復セット ＆ バフ打消しガード！", "system");
  }
  
  if (aCard.id === 'a_sick_of') {
    if (state.battle.enemies.length > 0) {
      state.battle.enemies[0].shield = 0;
      state.battle.enemies[0].statusEffects.vulnerable += 1;
      appliedDebuff = true;
      logCombat("【I'm sick of...効果】敵のバフ・シールドを全解除し、1ターン脆弱付与！", "system");
    }
  }
  if (aCard.id === 'a_sick_of_plus') {
    if (state.battle.enemies.length > 0) {
      state.battle.enemies[0].shield = 0;
      state.battle.enemies[0].statusEffects.vulnerable += 1;
      appliedDebuff = true;
      logCombat("【I'm sick of...+効果】敵のバフ・シールドを全解除し、1ターン脆弱付与！", "system");
    }
  }
  
  if (aCard.id === 'a_looking_forward') {
    state.player.statusEffects.delayAttackTurns = 3;
    state.player.statusEffects.delayAttackDmg = 25;
    logCombat("【I'm looking forward to...効果】3ターン後に大爆発(25ダメージ)を起こします。", "system");
  }
  if (aCard.id === 'a_looking_forward_plus') {
    state.player.statusEffects.delayAttackTurns = 3;
    state.player.statusEffects.delayAttackDmg = 35;
    logCombat("【I'm looking forward to...+効果】3ターン後に35ダメージを敵全体にセット。", "system");
  }
  
  if (aCard.id === 'a_good_at') {
    if (state.battle.enemies.length > 0) {
      state.battle.enemies[0].statusEffects.weak = state.battle.enemies[0].statusEffects.weak > 0 ? state.battle.enemies[0].statusEffects.weak + 2 : 0;
      state.battle.enemies[0].statusEffects.vulnerable = state.battle.enemies[0].statusEffects.vulnerable > 0 ? state.battle.enemies[0].statusEffects.vulnerable + 2 : 0;
      state.battle.enemies[0].statusEffects.poison = state.battle.enemies[0].statusEffects.poison > 0 ? state.battle.enemies[0].statusEffects.poison + 2 : 0;
      appliedDebuff = true;
      logCombat("【I'm good at...効果】敵にかかっているすべてのデバフ時間を+2T延長！", "system");
    }
  }
  if (aCard.id === 'a_good_at_plus') {
    if (state.battle.enemies.length > 0) {
      state.battle.enemies[0].statusEffects.weak = state.battle.enemies[0].statusEffects.weak > 0 ? state.battle.enemies[0].statusEffects.weak + 2 : 0;
      state.battle.enemies[0].statusEffects.vulnerable = state.battle.enemies[0].statusEffects.vulnerable > 0 ? state.battle.enemies[0].statusEffects.vulnerable + 2 : 0;
      state.battle.enemies[0].statusEffects.poison = state.battle.enemies[0].statusEffects.poison > 0 ? state.battle.enemies[0].statusEffects.poison + 2 : 0;
      appliedDebuff = true;
    }
  }
  
  if (aCard.id === 'a_help_but') {
    state.player.statusEffects.doubleNextVerb = true;
    logCombat("【I can't help (but)...効果】完成させた英文のダメージやシールドをもう一度発動！", "system");
  }
  if (aCard.id === 'a_help_but_plus') {
    state.player.statusEffects.doubleNextVerb = true;
    logCombat("【I can't help (but)...+効果】完成させた英文のダメージやシールドをもう一度発動！", "system");
  }
  
  if (aCard.id === 'a_no_use') {
    if (state.battle.enemies.length > 0) {
      state.battle.enemies[0].intent = { type: 'shield', val: 0, desc: '妨害キャンセルにより行動不能' };
      logCombat("【It's no use...効果】敵の次のターンの行動を完全キャンセル！(完成時に廃棄されます)", "system");
    }
    state.battle.shouldExileCurrentCard = true;
  }
  if (aCard.id === 'a_no_use_plus') {
    if (state.battle.enemies.length > 0) {
      state.battle.enemies[0].intent = { type: 'shield', val: 0, desc: '妨害キャンセルにより行動不能' };
      logCombat("【It's no use...+効果】敵の次のターンの行動を完全キャンセル！", "system");
    }
  }

  // Type 3 (Past Participle) Card Effects
  if (aCard.id === 'a_ve') {
    const discCount = state.player.discard.length;
    damageEnemy(discCount * 2);
  }
  if (aCard.id === 'a_ve_plus') {
    const discCount = state.player.discard.length;
    damageEnemy(discCount * 4);
  }
  
  if (aCard.id === 'a_ve_already') {
    damageEnemy(6);
  }
  if (aCard.id === 'a_ve_already_plus') {
    damageEnemy(12);
    drawCards(1);
  }
  
  if (aCard.id === 'a_havenot_yet') {
    for (let k = 0; k < 2; k++) {
      if (state.player.deck.length > 0) {
        state.player.discard.push(state.player.deck.pop());
      }
    }
    gainPlayerShield(8);
  }
  if (aCard.id === 'a_havenot_yet_plus') {
    for (let k = 0; k < 3; k++) {
      if (state.player.deck.length > 0) {
        state.player.discard.push(state.player.deck.pop());
      }
    }
    gainPlayerShield(11);
  }
  
  if (aCard.id === 'a_got') {
    gainPlayerShield(10);
  }
  if (aCard.id === 'a_got_plus') {
    gainPlayerShield(10);
  }
  
  // FIX: Hand Discard Select Callback now safely resolves using getSafeBattleActionTargets()
  if (aCard.id === 'a_should_have' || aCard.id === 'a_should_have_plus') {
    let recoveredCardId = null;
    
    // 1. 優先的に構築中の英文パーツの最後から手札へ回収する（文法の書き直し）
    if (state.battle.sentenceParts && state.battle.sentenceParts.length > 0) {
      const poppedPart = state.battle.sentenceParts.pop();
      recoveredCardId = poppedPart.cardId;
      state.player.hand.push(recoveredCardId);
      logCombat(`【I should have...効果】直前に使ったカード "${getCardById(recoveredCardId).title}" を手札に回収しました。`, "system");
      
      // 画面上の構築中英文テキストの描画を即座に更新する
      updateConstructingSentenceDisplay();
    }
    // 2. 構築中英文がなければ、従来の捨て札の末尾から回収する
    else if (state.player.discard.length > 0) {
      recoveredCardId = state.player.discard.pop();
      state.player.hand.push(recoveredCardId);
      logCombat(`【I should have...効果】捨て札から直前に使ったカード "${getCardById(recoveredCardId).title}" を手札に回収しました。`, "system");
    } else {
      logCombat("【I should have...効果】回収できる使用済みカードが存在しません。", "system");
    }
    
    // 3. 回収後、手札からランダムに1枚捨て札に送る
    if (state.player.hand.length > 0) {
      const randomIdx = Math.floor(Math.random() * state.player.hand.length);
      const discardedCardId = state.player.hand[randomIdx];
      state.player.hand.splice(randomIdx, 1);
      state.player.discard.push(discardedCardId);
      logCombat(`【I should have...効果】手札からランダムに "${getCardById(discardedCardId).title}" を捨てました。`, "system");
    }
    
    if (aCard.id === 'a_should_have_plus') {
      state.player.tempPower += 5;
      logCombat("【I should have...+効果】このターンの攻撃力を +5 しました！", "system");
    }
  }
  
  if (aCard.id === 'a_used_to') {
    const totalPlayed = state.player.discard.length + state.player.exiled.length;
    gainPlayerShield(totalPlayed);
  }
  if (aCard.id === 'a_used_to_plus') {
    const totalPlayed = state.player.discard.length + state.player.exiled.length;
    gainPlayerShield(totalPlayed * 2);
  }
  
  if (aCard.id === 'a_had_something') {
    damageEnemy(8);
  }
  if (aCard.id === 'a_had_something_plus') {
    damageEnemy(8);
    let foundIdx = -1;
    for (let h = 0; h < state.player.hand.length; h++) {
      const cid = state.player.hand[h];
      const cost = getCardCost(cid, h);
      if (cost >= 2) {
        foundIdx = h;
        break;
      }
    }
    if (foundIdx !== -1) {
      state.battle.cardCostModifiers[foundIdx] = (state.battle.cardCostModifiers[foundIdx] || 0) - 1;
      logCombat(`【I had my car...+効果】手札の "${getCardById(state.player.hand[foundIdx]).title}" のコストを-1しました！`, "system");
    }
  }
  
  // Wish I had: Reclaim all discard cards to hand!
  if (aCard.id === 'a_wish_had' || aCard.id === 'a_wish_had_plus') {
    state.player.hand = [...state.player.hand, ...state.player.discard].slice(0, 10);
    state.player.discard = [];
    logCombat("【I wish I had...効果】墓地（捨て札）にあるすべてのカードを手札に戻しました！", "system");
    state.battle.shouldExileCurrentCard = true;
  }

  // Type 4 (Clause) Card Effects
  if (aCard.id === 'a_think') {
    drawCards(1);
    gainPlayerShield(5);
  }
  if (aCard.id === 'a_think_plus') {
    drawCards(1);
    gainPlayerShield(5);
  }
  
  if (aCard.id === 'a_hope') {
    drawCards(2);
  }
  if (aCard.id === 'a_hope_plus') {
    drawCards(2);
  }
  
  if (aCard.id === 'a_know') {
    let peeked = [];
    for (let k = 0; k < 3; k++) {
      if (state.player.deck.length > 0) peeked.push(state.player.deck.pop());
    }
    if (peeked.length > 0) {
      const disc = peeked.pop(); 
      state.player.discard.push(disc);
      state.player.deck = [...state.player.deck, ...peeked];
      logCombat(`【I know...効果】山札の上3枚を確認し、"${getCardById(disc).title}" を捨て札に送りました。`, "system");
    }
  }
  if (aCard.id === 'a_know_plus') {
    let peeked = [];
    for (let k = 0; k < 3; k++) {
      if (state.player.deck.length > 0) peeked.push(state.player.deck.pop());
    }
    if (peeked.length > 0) {
      const disc = peeked.pop();
      state.player.discard.push(disc);
      state.player.deck = [...state.player.deck, ...peeked];
      logCombat(`【I know...+効果】山札の上3枚を確認し、"${getCardById(disc).title}" を捨て札に送りました。`, "system");
    }
  }
  
  if (aCard.id === 'a_glad') {
    const beforeCount = state.player.hand.length;
    drawCards(10 - beforeCount);
    const drawn = state.player.hand.length - beforeCount;
    gainPlayerShield(drawn * 2);
  }
  if (aCard.id === 'a_glad_plus') {
    const beforeCount = state.player.hand.length;
    drawCards(10 - beforeCount);
    const drawn = state.player.hand.length - beforeCount;
    gainPlayerShield(drawn * 2);
    const overflow = Math.max(0, beforeCount + drawn - 10);
    if (overflow > 0) {
      damageAllEnemies(overflow * 3);
    }
  }
  
  if (aCard.id === 'a_thought') {
    if (state.player.hand.length > 0) {
      const idx = Math.floor(Math.random() * state.player.hand.length);
      state.battle.cardCostModifiers[idx] = -9; 
      logCombat(`【I thought...効果】手札のランダムなカード1枚のコストを一時的0にしました！`, "system");
    }
  }
  if (aCard.id === 'a_thought_plus') {
    if (state.player.hand.length > 0) {
      const idx = Math.floor(Math.random() * state.player.hand.length);
      state.battle.cardCostModifiers[idx] = -9;
    }
  }
  
  if (aCard.id === 'a_heard') {
    logCombat("【I heard...効果】敵の次のターン行う攻撃を1ターン先延ばしにします。", "system");
  }
  if (aCard.id === 'a_heard_plus') {
    logCombat("【I heard...+効果】敵の次のターン行う攻撃を1ターン先延ばしにします。", "system");
  }
  
  if (aCard.id === 'a_seems') {
    logCombat("【It seems...効果】敵のスキル効果をコピーします。", "system");
  }
  if (aCard.id === 'a_seems_plus') {
    logCombat("【It seems...+効果】敵のスキル効果を2倍にしてコピー発動！", "system");
  }
  
  if (aCard.id === 'a_turns_out') {
    damageEnemy(10);
    if (state.player.hand.length >= 5) {
      drawCards(3);
      state.player.energy = Math.min(state.player.maxEnergy, state.player.energy + 1);
    }
  }
  if (aCard.id === 'a_turns_out_plus') {
    damageEnemy(15);
    if (state.player.hand.length >= 5) {
      drawCards(4);
      state.player.energy = Math.min(state.player.maxEnergy + 1, state.player.energy + 2);
    }
  }
  
  if (aCard.id === 'a_stand_corrected' || aCard.id === 'a_stand_corrected_plus') {
    const handCount = state.player.hand.length;
    state.player.discard = [...state.player.discard, ...state.player.hand];
    state.player.hand = [];
    drawCards(handCount * 2);
    logCombat("【I stand corrected...効果】手札を全て捨てて倍の枚数を引き直しました！", "system");
    state.battle.shouldExileCurrentCard = true;
    if (aCard.id === 'a_stand_corrected_plus') {
      state.player.energy = Math.min(state.player.maxEnergy + 1, state.player.energy + 1);
    }
  }

  // Type 5 (WH Clause) Card Effects
  if (aCard.id === 'a_know_who') {
    damageEnemy(6);
    state.player.tempPower += 3;
  }
  if (aCard.id === 'a_know_who_plus') {
    damageEnemy(10);
    state.player.tempPower += 6;
  }
  
  if (aCard.id === 'a_know_where') {
    if (state.battle.enemies.length > 0 && state.battle.enemies[0].statusEffects.vulnerable > 0) {
      damageEnemy(16);
    } else {
      damageEnemy(8);
    }
  }
  if (aCard.id === 'a_know_where_plus') {
    if (state.battle.enemies.length > 0 && state.battle.enemies[0].statusEffects.vulnerable > 0) {
      damageEnemy(24);
    } else {
      damageEnemy(8);
    }
  }
  
  if (aCard.id === 'a_dont_know_why') {
    if (state.battle.enemies.length > 0) {
      state.battle.enemies[0].statusEffects.weak += 1;
      state.battle.enemies[0].statusEffects.vulnerable += 1;
      appliedDebuff = true;
    }
  }
  if (aCard.id === 'a_dont_know_why_plus') {
    if (state.battle.enemies.length > 0) {
      state.battle.enemies[0].statusEffects.weak += 2;
      state.battle.enemies[0].statusEffects.vulnerable += 2;
      appliedDebuff = true;
    }
  }
  
  if (aCard.id === 'a_show_how') {
    state.player.statusEffects.nextAttackMultiplier = 2;
    logCombat("【I'll show you...効果】次の英文完成攻撃ダメージ 2倍バフ を獲得！", "system");
  }
  if (aCard.id === 'a_show_how_plus') {
    state.player.statusEffects.nextAttackMultiplier = 3;
    logCombat("【I'll show you...+効果】次の英文完成攻撃ダメージ 3倍バフ を獲得！", "system");
  }
  
  if (aCard.id === 'a_know_what') {
    state.player.statusEffects.invincible = true;
  }
  if (aCard.id === 'a_know_what_plus') {
    state.player.statusEffects.invincible = true;
  }
  
  if (aCard.id === 'a_dont_care_who') {
    damageAllEnemies(8);
    if (state.battle.enemies.length > 0 && state.battle.enemies[0].intent && state.battle.enemies[0].intent.type === 'attack') {
      damageEnemy(4);
    }
  }
  if (aCard.id === 'a_dont_care_who_plus') {
    damageAllEnemies(14);
    if (state.battle.enemies.length > 0 && state.battle.enemies[0].intent && state.battle.enemies[0].intent.type === 'attack') {
      damageEnemy(8);
    }
  }
  
  if (aCard.id === 'a_know_when') {
    const turnDmg = state.battle.turn * 6;
    damageEnemy(turnDmg);
  }
  if (aCard.id === 'a_know_when_plus') {
    const turnDmg = state.battle.turn * 10;
    damageEnemy(turnDmg);
  }
  
  if (aCard.id === 'a_no_idea_how') {
    if (state.battle.enemies.length > 0) {
      const lostHpRatio = (state.player.maxHp - state.player.hp) / state.player.maxHp;
      const targetMaxHp = state.battle.enemies[0].maxHp;
      const calcDmg = Math.floor(targetMaxHp * 0.15 * (1 + lostHpRatio));
      damageEnemy(calcDmg);
    }
  }
  if (aCard.id === 'a_no_idea_how_plus') {
    if (state.battle.enemies.length > 0) {
      const lostHpRatio = (state.player.maxHp - state.player.hp) / state.player.maxHp;
      const targetMaxHp = state.battle.enemies[0].maxHp;
      const calcDmg = Math.floor(targetMaxHp * 0.20 * (1 + lostHpRatio));
      damageEnemy(calcDmg);
    }
  }
  
  if (aCard.id === 'a_depends_what') {
    const types = new Set(state.player.hand.map(cid => {
      const c = getCardById(cid);
      return c ? c.type : null;
    }).filter(t => t !== null && t <= 4));
    damageEnemy(types.size * 8);
  }
  if (aCard.id === 'a_depends_what_plus') {
    const types = new Set(state.player.hand.map(cid => {
      const c = getCardById(cid);
      return c ? c.type : null;
    }).filter(t => t !== null && t <= 4));
    damageEnemy(types.size * 15);
  }

  if (hasRelic('coffee') && appliedDebuff) {
    gainPlayerShield(3);
    logCombat("☕【冷めたブラックコーヒー】デバフ付与によるシールド+3獲得！", "system");
  }

  // --- Strict Card Category Separator Rule ---
  let isAttackCard = false;
  if (aCard.id === 'a_wanna' || aCard.id === 'a_wanna_plus' || aCard.id === 'a_lets' || aCard.id === 'a_lets_plus' ||
      aCard.id === 'a_rather' || aCard.id === 'a_rather_plus' || aCard.id === 'a_takes_balls' || aCard.id === 'a_takes_balls_plus' ||
      aCard.id === 'a_ve' || aCard.id === 'a_ve_plus' || aCard.id === 'a_ve_already' || aCard.id === 'a_ve_already_plus' ||
      aCard.id === 'a_had_something' || aCard.id === 'a_had_something_plus' || aCard.id === 'a_turns_out' || aCard.id === 'a_turns_out_plus' ||
      aCard.id === 'a_know_who' || aCard.id === 'a_know_who_plus' || aCard.id === 'a_know_where' || aCard.id === 'a_know_where_plus' ||
      aCard.id === 'a_know_when' || aCard.id === 'a_know_when_plus' ||
      aCard.id === 'a_no_idea_how' || aCard.id === 'a_no_idea_how_plus' || aCard.id === 'a_depends_what' || aCard.id === 'a_depends_what_plus') {
    isAttackCard = true;
  }
  
  let isShieldCard = false;
  if (aCard.id === 'a_need' || aCard.id === 'a_need_plus' || aCard.id === 'a_should' || aCard.id === 'a_should_plus' ||
      aCard.id === 'a_managed' || aCard.id === 'a_managed_plus' || aCard.id === 'a_hurt_not' || aCard.id === 'a_hurt_not_plus' ||
      aCard.id === 'a_enjoy' || aCard.id === 'a_enjoy_plus' || aCard.id === 'a_havenot_yet' || aCard.id === 'a_havenot_yet_plus' ||
      aCard.id === 'a_got' || aCard.id === 'a_got_plus' || aCard.id === 'a_used_to' || aCard.id === 'a_used_to_plus' ||
      aCard.id === 'a_think' || aCard.id === 'a_think_plus' || aCard.id === 'a_glad' || aCard.id === 'a_glad_plus') {
    isShieldCard = true;
  }

  if (!bChoice.isTrap) {
    if (isAttackCard) {
      let finalDmg = baseDamage + val + state.player.sentencePower;
      if (state.player.tempPower > 0) {
        finalDmg += state.player.tempPower;
      }
      if (state.player.critMultiplier > 1) {
        finalDmg = finalDmg * state.player.critMultiplier;
      }
      if (state.player.statusEffects.nextAttackMultiplier > 1) {
        finalDmg = finalDmg * state.player.statusEffects.nextAttackMultiplier;
        logCombat(`🔥【次の攻撃倍率発動】ダメージが ${state.player.statusEffects.nextAttackMultiplier} 倍に強化されました！ (最終 ${finalDmg} ダメージ)`, "player");
        state.player.statusEffects.nextAttackMultiplier = 0; // 消費
      }
      damageEnemy(finalDmg);
    } else if (isShieldCard) {
      gainPlayerShield(val);
    }
  }
  
  if (hasRelic('photo_frame') && isShieldCard && aCard.type === 3) {
    gainPlayerShield(4);
  }
}

function applyToppingEffect(topping) {
  if (topping.effect === 'shield') {
    gainPlayerShield(topping.val);
  }
  if (topping.effect === 'attack') {
    damageEnemy(topping.val);
  }
  if (topping.effect === 'debuff_vuln') {
    const target = state.battle.enemies[state.battle.targetIndex] || state.battle.enemies[0];
    if (target) {
      target.statusEffects.vulnerable += topping.val;
      if (hasRelic('coffee')) {
        gainPlayerShield(3);
      }
    }
  }
  if (topping.effect === 'draw') {
    drawCards(topping.val);
  }
}

// --- Player State Modifications ---
function damageEnemy(amount) {
  if (state.battle.enemies.length === 0) return;
  
  let targetIndex = state.battle.targetIndex;
  if (targetIndex >= state.battle.enemies.length) {
    targetIndex = 0;
    state.battle.targetIndex = 0;
  }
  
  const enemy = state.battle.enemies[targetIndex];
  let actualDmg = amount;
  
  if (enemy.statusEffects.intangible > 0) {
    actualDmg = 1;
    logCombat(`🛡️【無形状態】${enemy.name}へのダメージが1に制限されました！`, "enemy");
  } else if (enemy.statusEffects.vulnerable > 0) {
    actualDmg = Math.floor(actualDmg * 1.5);
  }
  
  if (actualDmg <= 0) return;
  
  state.battle.lastSentenceDmg = (state.battle.lastSentenceDmg || 0) + actualDmg;
  
  const avatar = document.getElementById(`enemy-avatar-box-${targetIndex}`);
  if (avatar) {
    avatar.classList.add('shake');
    setTimeout(() => avatar.classList.remove('shake'), 400);
  }
  
  const playerAvatar = document.getElementById('player-avatar-box');
  if (playerAvatar) {
    playerAvatar.classList.add('attack-bump-right');
    setTimeout(() => playerAvatar.classList.remove('attack-bump-right'), 400);
  }
  
  if (enemy.shield > 0) {
    if (enemy.shield >= actualDmg) {
      enemy.shield -= actualDmg;
      logCombat(`${enemy.name}のシールドが ${actualDmg} 吸収した。`, "enemy");
      showDamagePopup(`enemy-${targetIndex}`, actualDmg, 'block');
      actualDmg = 0;
    } else {
      actualDmg -= enemy.shield;
      logCombat(`${enemy.name}のシールドが ${enemy.shield} 吸収した。`, "enemy");
      showDamagePopup(`enemy-${targetIndex}`, enemy.shield, 'block');
      enemy.shield = 0;
    }
  }
  
  if (actualDmg > 0) {
    enemy.hp -= actualDmg;
    logCombat(`${enemy.name}に ${actualDmg} ダメージを与えた！`, "player");
    showDamagePopup(`enemy-${targetIndex}`, actualDmg, 'damage');
    
    if (enemy.hp <= 0) {
      enemy.hp = 0;
      logCombat(`${enemy.name}を撃破した！`, "system");
      state.battle.enemies.splice(targetIndex, 1);
      state.battle.targetIndex = 0; 
      
      if (state.battle.enemies.length === 0) {
        handleBattleVictory();
      }
    }
  }
}

function damageAllEnemies(amount) {
  const activeEnemies = [...state.battle.enemies];
  let totalDmgDealt = 0;
  
  activeEnemies.forEach((enemy, idx) => {
    let actualDmg = amount;
    
    if (enemy.statusEffects.intangible > 0) {
      actualDmg = 1;
      logCombat(`🛡️【無形状態】${enemy.name}への全体攻撃ダメージが1に減少。`, "enemy");
    } else if (enemy.statusEffects.vulnerable > 0) {
      actualDmg = Math.floor(actualDmg * 1.5);
    }
    
    if (actualDmg <= 0) return;
    totalDmgDealt += actualDmg;
    
    const avatar = document.getElementById(`enemy-avatar-box-${idx}`);
    if (avatar) {
      avatar.classList.add('shake');
      setTimeout(() => avatar.classList.remove('shake'), 400);
    }
    
    if (enemy.shield > 0) {
      if (enemy.shield >= actualDmg) {
        enemy.shield -= actualDmg;
        showDamagePopup(`enemy-${idx}`, actualDmg, 'block');
        actualDmg = 0;
      } else {
        actualDmg -= enemy.shield;
        showDamagePopup(`enemy-${idx}`, enemy.shield, 'block');
        enemy.shield = 0;
      }
    }
    
    if (actualDmg > 0) {
      enemy.hp -= actualDmg;
      logCombat(`${enemy.name}に ${actualDmg} ダメージを与えた！`, "player");
      showDamagePopup(`enemy-${idx}`, actualDmg, 'damage');
      
      if (enemy.hp <= 0) {
        enemy.hp = 0;
        logCombat(`${enemy.name}を撃破した！`, "system");
      }
    }
  });
  
  state.battle.lastSentenceDmg = (state.battle.lastSentenceDmg || 0) + totalDmgDealt;
  state.battle.enemies = state.battle.enemies.filter(e => e.hp > 0);
  state.battle.targetIndex = 0; 
  
  if (state.battle.enemies.length === 0) {
    handleBattleVictory();
  }
}

function damageEnemyDirect(amount) {
  if (state.battle.enemies.length === 0) return;
  const targetIndex = state.battle.targetIndex < state.battle.enemies.length ? state.battle.targetIndex : 0;
  const enemy = state.battle.enemies[targetIndex];
  
  let actualDmg = amount;
  if (enemy.statusEffects.intangible > 0) {
    actualDmg = 1;
  }
  
  enemy.hp -= actualDmg;
  state.battle.lastSentenceDmg = (state.battle.lastSentenceDmg || 0) + actualDmg;
  
  logCombat(`${enemy.name}のシールドを貫通！ ${actualDmg} ダメージを与えた！`, "player");
  showDamagePopup(`enemy-${targetIndex}`, actualDmg, 'damage');
  
  const avatar = document.getElementById(`enemy-avatar-box-${targetIndex}`);
  if (avatar) {
    avatar.classList.add('shake');
    setTimeout(() => avatar.classList.remove('shake'), 400);
  }
  
  if (enemy.hp <= 0) {
    enemy.hp = 0;
    logCombat(`${enemy.name}を撃破した！`, "system");
    state.battle.enemies.splice(targetIndex, 1);
    state.battle.targetIndex = 0;
    if (state.battle.enemies.length === 0) {
      handleBattleVictory();
    }
  }
}

function dealDirectDamageToEnemy(amount) {
  if (state.battle.enemies.length === 0) return;
  const targetIndex = state.battle.targetIndex < state.battle.enemies.length ? state.battle.targetIndex : 0;
  const enemy = state.battle.enemies[targetIndex];
  
  let actualDmg = amount;
  if (enemy.statusEffects.intangible > 0) {
    actualDmg = 1;
  }
  
  enemy.hp -= actualDmg;
  state.battle.lastSentenceDmg = (state.battle.lastSentenceDmg || 0) + actualDmg;
  showDamagePopup(`enemy-${targetIndex}`, actualDmg, 'damage');
  
  if (enemy.hp <= 0) {
    enemy.hp = 0;
    logCombat(`${enemy.name}を撃破した！`, "system");
    state.battle.enemies.splice(targetIndex, 1);
    state.battle.targetIndex = 0;
    if (state.battle.enemies.length === 0) {
      handleBattleVictory();
    }
  }
}

function gainPlayerShield(amount) {
  state.player.shield += amount;
  state.battle.lastSentenceShld = (state.battle.lastSentenceShld || 0) + amount;
  logCombat(`シールド +${amount} 獲得。`, "player");
  showDamagePopup('player', amount, 'shield');
}

function healPlayer(amount) {
  state.player.hp = Math.min(state.player.maxHp, state.player.hp + amount);
  logCombat(`プレイヤーのHPが ${amount} 回復した。`, "player");
  showDamagePopup('player', amount, 'heal');
}

function takePlayerDamage(amount) {
  let actualDmg = amount;
  
  if (state.player.statusEffects.invincible) {
    logCombat("プレイヤーは無敵状態！ ダメージを無効化した。", "player");
    return;
  }
  
  if (state.player.statusEffects.vulnerable > 0) {
    actualDmg = Math.floor(actualDmg * 1.5);
    logCombat("💥 プレイヤー脆弱状態：受けるダメージが1.5倍に増加しています！", "enemy");
  }
  
  if (state.player.statusEffects.halfDamage) {
    actualDmg = Math.floor(actualDmg * 0.5);
  }
  
  if (actualDmg <= 0) return;
  
  const avatar = document.getElementById('player-avatar-box');
  if (avatar) {
    avatar.classList.add('shake');
    setTimeout(() => avatar.classList.remove('shake'), 400);
  }
  
  if (state.player.shield > 0) {
    if (state.player.shield >= actualDmg) {
      state.player.shield -= actualDmg;
      logCombat(`シールドが ${actualDmg} ダメージを吸収した。`, "player");
      showDamagePopup('player', actualDmg, 'block');
      actualDmg = 0;
    } else {
      actualDmg -= state.player.shield;
      logCombat(`シールドが ${state.player.shield} ダメージを吸収した。`, "player");
      showDamagePopup('player', state.player.shield, 'block');
      state.player.shield = 0;
    }
  }
  
  if (actualDmg > 0) {
    state.player.hp -= actualDmg;
    logCombat(`プレイヤーは ${actualDmg} ダメージを受けた！`, "enemy");
    showDamagePopup('player', actualDmg, 'damage');
    if (state.player.hp <= 0) {
      state.player.hp = 0;
      handleBattleDefeat();
    }
  }
}

// --- End Turn ---
function endPlayerTurn() {
  if (state.battle.battlePhase !== 'a_select' && state.battle.battlePhase !== 'card_discard_select') return;
  
  clearInterval(state.battle.timerInterval);
  logCombat("プレイヤーのターン終了。", "system");
  
  state.battle.enemies.forEach(e => {
    if (e.statusEffects.poison > 0) {
      logCombat(`炎上効果: ${e.name}が ${e.statusEffects.poison} ダメージを受けた。`, "system");
      e.hp -= e.statusEffects.poison;
      showDamagePopup(state.battle.enemies.indexOf(e) === 0 ? 'enemy-0' : 'enemy-1', e.statusEffects.poison, 'damage');
      
      if (e.hp <= 0) {
        e.hp = 0;
      }
    }
  });
  
  state.battle.enemies = state.battle.enemies.filter(e => e.hp > 0);
  if (state.battle.enemies.length === 0) {
    handleBattleVictory();
    return;
  }
  
  setTimeout(() => {
    if (isBattleOver()) return;
    executeEnemyTurn();
  }, 800);
}

function executeEnemyTurn() {
  const activeEnemies = [...state.battle.enemies];
  
  activeEnemies.forEach((enemy, idx) => {
    if (state.player.hp <= 0) return;
    const intent = enemy.intent;
    
    logCombat(`敵のターン: ${enemy.name} は "${intent.desc}" を使用！`, "enemy");
    
    let dmg = intent.val;
    if (enemy.statusEffects.weak > 0) {
      dmg = Math.max(1, Math.floor(dmg * 0.5));
    }
    
    if (enemy.statusEffects.doubleNextAttack) {
      dmg *= 2;
      enemy.statusEffects.doubleNextAttack = false;
      logCombat(`👑【スライムキングの激昂発動】大ダメージ突撃！ (威力2倍: ${dmg}ダメージ)`, "enemy");
    }
    
    if (enemy.statusEffects.strength > 0) {
      dmg += enemy.statusEffects.strength;
    }
    if (enemy.tempPower > 0) {
      dmg += enemy.tempPower;
      enemy.tempPower = 0; 
    }
    
    if (intent.type === 'attack') {
      takePlayerDamage(dmg);
    } else if (intent.type === 'shield') {
      enemy.shield += intent.val;
      logCombat(`${enemy.name}はシールド +${intent.val} を獲得した。`, "enemy");
      showDamagePopup(`enemy-${idx}`, intent.val, 'shield');
    } else if (intent.type === 'debuff_weak') {
      state.player.statusEffects.weak += intent.val;
      logCombat(`プレイヤーに脱力 ${intent.val} ターンを付与された。`, "enemy");
    } else if (intent.type === 'curse') {
      logCombat("【鬼教官の呪い】手札がすべて「Type 1 (原形)」に強制変換された！", "enemy");
      const t1Starter = ['a_wanna', 'a_need', 'a_gonna', 'a_should', 'a_lets'];
      state.player.hand = state.player.hand.map(() => {
        return t1Starter[Math.floor(Math.random() * t1Starter.length)];
      });
    } else if (intent.type === 'buff_double_next') {
      enemy.statusEffects.doubleNextAttack = true;
      logCombat(`${enemy.name}は力を溜めている！(次ターンの攻撃力2倍)`, "enemy");
    } else if (intent.type === 'buff_strength_gain') {
      enemy.statusEffects.strength = (enemy.statusEffects.strength || 0) + intent.val;
      logCombat(`📈【筋力増加】${enemy.name}の攻撃力が永続+${intent.val}増加した！`, "enemy");
    } else if (intent.type === 'debuff_confuse') {
      state.player.statusEffects.confused = intent.val;
      
      for (let h = 0; h < state.player.hand.length; h++) {
        const cid = state.player.hand[h];
        const baseCard = getCardById(cid);
        const randCost = Math.floor(Math.random() * 4); // 0-3 cost
        state.battle.cardCostModifiers[h] = randCost - baseCard.cost;
      }
      
      logCombat(`🌀【混乱付与】コストがランダムにシャッフルされる状態になった！(${intent.val}ターン)`, "enemy");
    } else if (intent.type === 'intangible') {
      enemy.statusEffects.intangible += intent.val;
      logCombat(`🛡️【無形獲得】${enemy.name}は受ける全ダメージを1にするバリアを張った！`, "enemy");
    } else if (intent.type === 'countdown_power') {
      enemy.statusEffects.strength = (enemy.statusEffects.strength || 0) + 15;
      logCombat(`⏰【カウントダウン】${enemy.name}の怒りが頂点に達し、攻撃力が爆発的に+15された！`, "enemy");
    } else if (intent.type === 'debuff_vulnerable') {
      state.player.statusEffects.vulnerable += intent.val;
      logCombat(`💥【脆弱付与】被ダメージが+50%増加するデバフ(${intent.val}ターン)を受ける。`, "enemy");
    } else if (intent.type === 'wipe_buff') {
      if (state.player.statusEffects.buffProtect) {
        logCombat("🛡️【バフ保護】教官のバフ打ち消しを完全に無効化し、完成バフを守りました！", "player");
      } else {
        state.player.sentencePower = 0;
        logCombat("👿【問答無用】プレイヤーの完成バフ（筋力）がすべて打ち消され、0に戻された！", "enemy");
      }
    } else if (intent.type === 'add_waste') {
      for (let w = 0; w < intent.val; w++) {
        state.player.discard.push('c_waste');
      }
      logCombat(`👾【お邪魔カード追加】捨て札に「Wound (傷口)」が ${intent.val} 枚追加されました。`, "enemy");
    }
    
    if (enemy.statusEffects.weak > 0) enemy.statusEffects.weak--;
    if (enemy.statusEffects.vulnerable > 0) enemy.statusEffects.vulnerable--;
    if (enemy.statusEffects.intangible > 0) enemy.statusEffects.intangible--;
  
    advanceEnemyActionIndex(enemy);
    decideEnemyAction(enemy);
  });
  
  if (isBattleOver()) return;
  
  if (state.player.statusEffects.weak > 0) state.player.statusEffects.weak--;
  
  if (state.player.statusEffects.vulnerable > 0) {
    state.player.statusEffects.vulnerable--;
  }
  
  if (state.player.statusEffects.confused > 0) {
    state.player.statusEffects.confused--;
  }
  
  state.player.shield = 0;
  state.player.statusEffects.buffProtect = false;
  state.player.statusEffects.invincible = false;
  state.player.statusEffects.halfDamage = false;
  
  state.player.tempPower = 0; 
  if (state.player.statusEffects.nextTurnDamageBoost > 0) {
    state.player.tempPower += state.player.statusEffects.nextTurnDamageBoost;
    logCombat(`📈【次ターンバフ適用】攻撃力強化が発動し、今ターンの攻撃力 +${state.player.statusEffects.nextTurnDamageBoost}！`, "player");
    state.player.statusEffects.nextTurnDamageBoost = 0; // 消費
  }
  
  state.battle.turn++;
  state.player.energy = state.player.maxEnergy;
  state.battle.rerollCount = 1; 
  state.battle.drawnThisTurn = 0; 
  state.battle.fountainPenTriggered = false;
  state.battle.cardCostModifiers = {}; 
  state.battle.smallTalkUsed = false; // Reset Small Talk for new turn!
  
  // Re-roll costs if confused is still active on turn start
  if (state.player.statusEffects.confused > 0) {
    for (let h = 0; h < state.player.hand.length; h++) {
      const cid = state.player.hand[h];
      const baseCard = getCardById(cid);
      const randCost = Math.floor(Math.random() * 4); // 0-3
      state.battle.cardCostModifiers[h] = randCost - baseCard.cost;
    }
  }
  
  if (state.player.nextTurnEnergyBonus > 0) {
    state.player.energy += state.player.nextTurnEnergyBonus;
    state.player.nextTurnEnergyBonus = 0;
  }
  
  // --- Delayed attack / delay logic resolution ---
  if (state.player.nextTurnDelayDamage > 0) {
    damageAllEnemies(state.player.nextTurnDelayDamage);
    logCombat(`【If I were to... 遅延発動】敵全体に ${state.player.nextTurnDelayDamage} ダメージ！`, "system");
    state.player.nextTurnDelayDamage = 0;
  }
  
  if (state.player.statusEffects.delayAttackTurns > 0) {
    state.player.statusEffects.delayAttackTurns--;
    if (state.player.statusEffects.delayAttackTurns === 0) {
      damageAllEnemies(state.player.statusEffects.delayAttackDmg || 25);
      showToast("⏰【I'm looking forward to...】遅延攻撃発動！ 敵全体に大ダメージ！", "success");
      
      if (state.battle.enemies.length > 0) {
        state.battle.enemies[0].statusEffects.weak += 1;
        logCombat(`【I\'m looking forward to... 遅延発動】敵全体に ${state.player.statusEffects.delayAttackDmg || 25} ダメージ ＆ 脱力付与！`, "system");
      }
    }
  }

  if (state.player.statusEffects.endTurnHeal > 0) {
    healPlayer(state.player.statusEffects.endTurnHeal);
    state.player.statusEffects.endTurnHeal = 0;
  }

  if (isBattleOver()) return;

  drawCards(5 - state.player.hand.length);
  
  logCombat(`ターン ${state.battle.turn} 開始！`, "system");
  render();
}

function handleBattleVictory() {
  clearInterval(state.battle.timerInterval);
  logCombat("戦闘勝利！ すべての敵を撃破した！", "system");
  showToast("戦闘勝利！", "success");
  
  state.player.deck = [...state.player.deck, ...state.player.hand, ...state.player.discard, ...state.player.exiled]
    .filter(cid => cid !== 'c_waste');
  
  state.player.hand = [];
  state.player.discard = [];
  state.player.exiled = [];
  
  const goldGained = 15 + Math.floor(Math.random() * 10);
  state.player.gold += goldGained;
  logCombat(`報酬: ゴールド +${goldGained} 獲得！`, "system");
  
  if (Math.random() < 0.40) {
    const potPool = ['potion_hp', 'potion_shield', 'potion_energy'];
    obtainPotion(potPool[Math.floor(Math.random() * potPool.length)]);
  }
  
  const node = state.map.nodes.find(n => n.floor === state.map.currentFloor);
  if (node) node.visited = true;
  
  if (state.map.currentFloor === 5 && !hasRelicChosen) {
    openBossRelicDraft();
  } else {
    triggerCardDraftReward();
  }
}

function triggerCardDraftReward() {
  state.battle.battlePhase = 'victory_reward';
  const draftPool = CARD_DATABASE.aCards.filter(c => c.rarity !== 'starter' && c.id !== 'c_waste' && !c.id.endsWith('_plus'));
  const shuffled = [...draftPool];
  shuffleDeck(shuffled);
  state.battle.choices = shuffled.slice(0, 3);
  render();
}

function openBossRelicDraft() {
  const modal = document.getElementById('relic-draft-modal');
  const grid = document.getElementById('relic-draft-grid');
  if (!modal || !grid) return;
  
  grid.innerHTML = '';
  const relics = CARD_DATABASE.bossRelics;
  
  Object.keys(relics).forEach(rk => {
    const relic = relics[rk];
    const card = document.createElement('div');
    card.className = 'relic-item';
    card.style.cursor = 'pointer';
    card.style.border = '2px solid rgba(255, 214, 0, 0.2)';
    card.style.background = 'rgba(15, 23, 42, 0.9)';
    card.innerHTML = `
      <div class="relic-icon-box" style="font-size: 2.2rem; background: rgba(255, 214, 0, 0.05); border-color: rgba(255, 214, 0, 0.4);">${relic.icon}</div>
      <div class="relic-info" style="text-align: left;">
        <div class="relic-title" style="color: var(--color-yellow); font-size: 1.15rem;">${relic.name}</div>
        <div class="relic-desc" style="font-size: 0.85rem; color: #94a3b8; margin-top: 5px;">${relic.desc}</div>
      </div>
    `;
    card.addEventListener('click', () => chooseBossRelic(rk));
    grid.appendChild(card);
  });
  
  modal.classList.add('active');
}

function chooseBossRelic(relicId) {
  const modal = document.getElementById('relic-draft-modal');
  if (modal) modal.classList.remove('active');
  
  state.player.relics.push(relicId);
  hasRelicChosen = true;
  showToast(`秘宝「${CARD_DATABASE.bossRelics[relicId].name}」を獲得しました！`, "success");
  
  triggerCardDraftReward();
}

function chooseDraftCard(index) {
  const card = state.battle.choices[index];
  state.player.deck.push(card.id);
  showToast(`デッキに "${card.title}" を追加しました。`, "success");
  
  if (state.map.currentFloor === 5) {
    state.map.currentLayer = 2;
  } else if (state.map.currentFloor === 10) {
    state.map.currentLayer = 3;
  }
  
  if (state.map.currentFloor === 15) {
    state.screen = 'victory';
  } else {
    state.screen = 'map';
  }
  render();
}

function skipDraftCard() {
  showToast("カード獲得をスキップしました。", "info");
  
  if (state.map.currentFloor === 5) {
    state.map.currentLayer = 2;
  } else if (state.map.currentFloor === 10) {
    state.map.currentLayer = 3;
  }
  
  if (state.map.currentFloor === 15) {
    state.screen = 'victory';
  } else {
    state.screen = 'map';
  }
  render();
}

function handleBattleDefeat() {
  clearInterval(state.battle.timerInterval);
  logCombat("プレイヤー敗北... ゲームオーバー。", "error");
  showToast("ゲームオーバー...", "error");
  state.screen = 'defeat';
  render();
}

// --- Map Logic ---
function getNextPlayableFloor() {
  let maxVisited = 0;
  state.map.nodes.forEach(n => {
    if (n.visited && n.floor > maxVisited) {
      maxVisited = n.floor;
    }
  });
  return maxVisited + 1;
}

function enterNode(floorIndex) {
  const node = state.map.nodes[floorIndex];
  const nextPlayable = getNextPlayableFloor();
  if (node.floor !== nextPlayable) return;
  
  state.map.currentFloor = node.floor;
  
  if (node.type === 'battle') {
    startBattle(node.enemyId);
  } else if (node.type === 'choice') {
    state.map.selectedChoice = null;
    state.screen = 'map_choice';
    render();
  }
}

function selectChoiceNode(type) {
  if (type === 'shop') {
    setupShop();
    state.screen = 'shop';
  } else if (type === 'rest') {
    setupRest();
    state.screen = 'rest';
  }
  
  const node = state.map.nodes.find(n => n.floor === state.map.currentFloor);
  if (node) node.visited = true;
  
  render();
}

// --- Shop Logic ---
function setupShop() {
  state.shop.hasRemovedThisShop = false;
  state.shop.hasUpgradedThisShop = false;
  
  const aPool = CARD_DATABASE.aCards.filter(c => c.rarity !== 'starter' && c.id !== 'c_waste' && !c.id.endsWith('_plus'));
  const shuffledA = [...aPool];
  shuffleDeck(shuffledA);
  
  state.shop.cards = shuffledA.slice(0, 3).map(c => {
    return { ...c, price: 50 + Math.floor(Math.random() * 20), sold: false };
  });
  
  const rKeys = Object.keys(CARD_DATABASE.relics);
  shuffleDeck(rKeys);
  state.shop.relics = rKeys.slice(0, 2).map(rk => {
    return { ...CARD_DATABASE.relics[rk], price: 120 + Math.floor(Math.random() * 30), sold: false };
  });
  
  state.shop.potions = [
    { id: 'potion_hp', name: 'HPポーション', price: 30, desc: 'HPを12回復する', sold: false },
    { id: 'potion_shield', name: 'シールドポーション', price: 30, desc: 'シールド+15を獲得', sold: false },
    { id: 'potion_energy', name: 'エナジーポーション', price: 30, desc: 'エナジーを2回復', sold: false }
  ];
  shuffleDeck(state.shop.potions);
  state.shop.potions = state.shop.potions.slice(0, 2);
  
  state.shop.removePrice = 50 + (state.player.relics.length * 10);
  state.shop.upgradePrice = 50 + (state.player.relics.length * 10);
}

function buyShopCard(index) {
  const item = state.shop.cards[index];
  if (item.sold) return;
  if (state.player.gold < item.price) {
    showToast("ゴールドが不足しています！", "error");
    return;
  }
  state.player.gold -= item.price;
  state.player.deck.push(item.id);
  item.sold = true; 
  showToast(`"${item.title}" を購入しました。`, "success");
  render();
}

function buyShopRelic(index) {
  const item = state.shop.relics[index];
  if (item.sold) return;
  if (state.player.gold < item.price) {
    showToast("ゴールドが不足しています！", "error");
    return;
  }
  if (hasRelic(item.id)) {
    showToast("既にこのレリックを所持しています！", "error");
    return;
  }
  state.player.gold -= item.price;
  state.player.relics.push(item.id);
  item.sold = true; 
  showToast(`レリック "${item.name}" を獲得！`, "success");
  render();
}

function buyShopPotion(index) {
  const item = state.shop.potions[index];
  if (item.sold) return;
  if (state.player.gold < item.price) {
    showToast("ゴールドが不足しています！", "error");
    return;
  }
  const success = obtainPotion(item.id);
  if (success) {
    state.player.gold -= item.price;
    item.sold = true;
    render();
  }
}

function startShopCardRemoval() {
  if (state.shop.hasRemovedThisShop) {
    showToast("このショップでは既に削除サービスを利用しています！", "error");
    return;
  }
  if (state.player.gold < state.shop.removePrice) {
    showToast("ゴールドが不足しています！", "error");
    return;
  }
  openDeckViewer('remove');
}

function startShopCardUpgrade() {
  if (state.shop.hasUpgradedThisShop) {
    showToast("このショップでは既に強化サービスを利用しています！", "error");
    return;
  }
  if (state.player.gold < state.shop.upgradePrice) {
    showToast("ゴールドが不足しています！", "error");
    return;
  }
  openDeckViewer('upgrade_shop');
}

function removeCardFromDeck(cardId, indexInDeck) {
  if (deckViewerMode === 'remove') {
    state.player.gold -= state.shop.removePrice;
    state.shop.hasRemovedThisShop = true;
  } else if (deckViewerMode === 'remove_rest') {
    state.player.gold -= 50;
    state.rest.used = true;
  }
  
  state.player.deck.splice(indexInDeck, 1);
  closeDeckViewer();
  showToast("カードをデッキから削除しました。", "success");
  
  if (deckViewerMode === 'remove_rest') {
    setTimeout(() => {
      state.screen = 'map';
      render();
    }, 800);
  }
  render();
}

function upgradeCardInDeck(cardId, indexInDeck, fromShop = false) {
  const upgradedId = cardId + '_plus';
  const upgradedCard = getCardById(upgradedId);
  
  if (upgradedCard) {
    state.player.deck[indexInDeck] = upgradedId;
    
    if (fromShop) {
      state.player.gold -= state.shop.upgradePrice;
      state.shop.hasUpgradedThisShop = true;
    } else {
      state.rest.used = true;
    }
    
    closeDeckViewer();
    showToast(`カード「${upgradedCard.title}」に強化完了！`, "success");
    
    if (!fromShop) {
      setTimeout(() => {
        state.screen = 'map';
        render();
      }, 800);
    }
    render();
  } else {
    showToast("このカードは強化できません！", "error");
  }
}

function leaveShop() {
  state.screen = 'map';
  render();
}

// --- Rest Logic ---
function setupRest() {
  state.rest.used = false;
}

function restOptionHeal() {
  if (state.rest.used) return;
  state.player.hp = state.player.maxHp;
  state.rest.used = true;
  showToast("HPが全回復しました！", "success");
  setTimeout(() => {
    state.screen = 'map';
    render();
  }, 1000);
  render();
}

function restOptionMaxHp() {
  if (state.rest.used) return;
  state.player.maxHp += 8; 
  state.rest.used = true;
  showToast(`最大HP上限を +8 向上させました！ (最大HP: ${state.player.maxHp})`, "success");
  setTimeout(() => {
    state.screen = 'map';
    render();
  }, 1000);
  render();
}

function restOptionUpgrade() {
  if (state.rest.used) return;
  openDeckViewer('upgrade');
}

function restOptionRemove() {
  if (state.rest.used) return;
  if (state.player.gold < 50) {
    showToast("ゴールドが不足しています！(必要: 🪙 50)", "error");
    return;
  }
  openDeckViewer('remove_rest');
}

// --- Deck Viewer ---
function openDeckViewer(mode = 'view') {
  deckViewerMode = mode;
  const overlay = document.getElementById('deck-overlay');
  if (!overlay) return;
  overlay.classList.add('active');
  
  const titleEl = overlay.querySelector('.deck-overlay-title');
  if (titleEl) {
    if (mode === 'remove') titleEl.innerText = `🗑️ デッキ圧縮 (削除したいカードを選んでください / 🪙 ${state.shop.removePrice})`;
    else if (mode === 'remove_rest') titleEl.innerText = `🗑️ 焚き火でカード破棄 (削除カードを選択 / 🪙 50)`;
    else if (mode === 'upgrade') titleEl.innerText = `⚡ カード強化 (アップグレードしたいAカードを選択してください)`;
    else if (mode === 'upgrade_shop') titleEl.innerText = `⚡ カード強化サービス (強化したいAカードを選択してください / 🪙 ${state.shop.upgradePrice})`;
    else titleEl.innerText = `🎴 所持カード一覧`;
  }
  
  const grid = document.getElementById('deck-overlay-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  let targetPool = [];
  if (mode === 'view' && state.screen === 'battle') {
    targetPool = [...state.player.deck, ...state.player.hand, ...state.player.discard, ...state.player.exiled];
  } else {
    targetPool = state.player.deck;
  }
  
  targetPool.forEach((cardId, index) => {
    const card = getCardById(cardId);
    const cardEl = document.createElement('div');
    cardEl.className = `game-card type-${card.type} rarity-${card.rarity}`;
    
    const isUpgraded = card.id.endsWith('_plus');
    if (isUpgraded) {
      cardEl.classList.add('rarity-rare');
    }
    
    const modText = getModText(card.baseMod);
    const badgeHtml = modText ? `<div class="card-mod-badge">${modText}</div>` : '';
    const nextHintHtml = `<div class="card-next-hint">${getRequiredNextTypeLabel(card.type)}</div>`;
    const translationHtml = card.translation ? `<div class="card-translation">${card.translation}</div>` : '';
    const rubyHtml = card.pronounce ? `<span class="card-pronounce">${card.pronounce}</span>` : '';
    cardEl.innerHTML = `
      <div class="card-cost-badge">${card.cost}</div>
      <div class="card-footer">
        <span class="card-type-tag">T${card.type}</span>
      </div>
      ${rubyHtml}
      <div class="card-title">${card.title}</div>
      ${translationHtml}
      ${badgeHtml}
      ${nextHintHtml}
      <div class="card-body">${card.desc}</div>
      <div class="card-footer" style="font-size: 0.65rem; color: var(--text-secondary);">
        <span>${isUpgraded ? 'UPGRADED (+)' : card.rarity.toUpperCase()}</span>
      </div>
    `;
    
    if (mode === 'remove' || mode === 'remove_rest') {
      cardEl.style.borderColor = 'var(--color-red)';
      cardEl.style.cursor = 'pointer';
      cardEl.addEventListener('click', () => {
        if (confirm(`本当に "${card.title}" を削除しますか？`)) {
          removeCardFromDeck(cardId, index);
        }
      });
    } else if (mode === 'upgrade' || mode === 'upgrade_shop') {
      if (isUpgraded) {
        cardEl.style.opacity = '0.5';
        cardEl.style.cursor = 'not-allowed';
      } else {
        cardEl.style.borderColor = '#c084fc';
        cardEl.style.boxShadow = '0 0 12px rgba(168, 85, 247, 0.4)';
        cardEl.style.cursor = 'pointer';
        cardEl.addEventListener('click', () => {
          if (confirm(`本当に "${card.title}" を強化しますか？`)) {
            upgradeCardInDeck(cardId, index, mode === 'upgrade_shop');
          }
        });
      }
    }
    
    grid.appendChild(cardEl);
  });
}

function closeDeckViewer() {
  const overlay = document.getElementById('deck-overlay');
  if (overlay) overlay.classList.remove('active');
}

// --- Grammar Dictionary Viewer (B-Cards Gallery) ---
function openDictViewer() {
  const overlay = document.getElementById('dict-overlay');
  if (!overlay) return;
  overlay.classList.add('active');
  switchDictTab(activeDictTab);
}

function closeDictViewer() {
  const overlay = document.getElementById('dict-overlay');
  if (overlay) overlay.classList.remove('active');
}

function switchDictTab(tabIndex) {
  activeDictTab = tabIndex;
  
  for (let i = 1; i <= 5; i++) {
    const tabBtn = document.getElementById(`tab-btn-${i}`);
    if (tabBtn) {
      if (i === tabIndex) tabBtn.classList.add('active');
      else tabBtn.classList.remove('active');
    }
  }
  
  const grid = document.getElementById('dict-overlay-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const list = CARD_DATABASE.bChoices[tabIndex] || [];
  list.forEach(choice => {
    const cardEl = document.createElement('div');
    cardEl.className = `game-card type-${tabIndex} rarity-uncommon`;
    if (choice.isTrap) cardEl.className += ' rarity-rare';
    
    const trapBadgeHtml = choice.isTrap ? '<div class="card-mod-badge" style="color:var(--color-red); border-color:var(--color-red);">⚠️ 罠 (Trap)</div>' : '';
    cardEl.innerHTML = `
      <div class="card-cost-badge" style="border-color: #64748b; color: #94a3b8; background: #1e293b !important;">B</div>
      <div class="card-footer">
        <span class="card-type-tag">T${tabIndex}</span>
      </div>
      <div class="card-title" style="font-size: 1.15rem; color: #fff;">${choice.text}</div>
      <div class="card-translation" style="color: #00e676; font-style: normal;">「${choice.translation}」</div>
      ${trapBadgeHtml}
      <div class="card-body" style="margin-top: 10px; font-size: 0.8rem;">${choice.desc}</div>
      <div class="card-footer" style="font-size: 0.65rem; color: var(--text-secondary);">
        <span>${choice.isTrap ? 'TRAP' : 'ACTION'}</span>
      </div>
    `;
    grid.appendChild(cardEl);
  });
}

// --- Potion Management ---
function usePotion(index) {
  if (state.screen !== 'battle' && state.screen !== 'map') {
    showToast("今はポーションを使えません！", "error");
    return;
  }
  
  const potion = state.player.potions[index];
  if (!potion) return;
  
  // Double tap confirmation logic
  if (state.player.selectedPotionIndex !== index) {
    state.player.selectedPotionIndex = index;
    showToast(`🧪【${getPotionName(potion)}】効果: ${getPotionDesc(potion)} (使用するにはもう一度タップしてください！)`, "info");
    render();
    return;
  }
  
  state.player.selectedPotionIndex = null;
  
  if (potion === 'potion_hp') {
    healPlayer(12);
    showToast("HPポーションを使用してHPを12回復しました！", "success");
  } else if (potion === 'potion_shield') {
    if (state.screen !== 'battle') {
      showToast("戦闘中のみ使用できます！", "error");
      return;
    }
    gainPlayerShield(15);
    showToast("シールドポーションを使用してシールド+15を得ました！", "success");
  } else if (potion === 'potion_energy') {
    if (state.screen !== 'battle') {
      showToast("戦闘中のみ使用できます！", "error");
      return;
    }
    state.player.energy = Math.min(state.player.maxEnergy + 2, state.player.energy + 2);
    showToast("エナジーポーションを使用してエナジーを2回復しました！", "success");
  }
  
  state.player.potions[index] = null;
  render();
}

function getPotionDesc(id) {
  if (id === 'potion_hp') return 'HPを12回復します。';
  if (id === 'potion_shield') return '防壁シールド+15を獲得します。';
  if (id === 'potion_energy') return 'エナジーを2ポイント回復します。';
  return '';
}

function obtainPotion(potionId) {
  for (let i = 0; i < 2; i++) {
    if (!state.player.potions[i]) {
      state.player.potions[i] = potionId;
      showToast(`ポーション「${getPotionName(potionId)}」を獲得しました！`, "success");
      return true;
    }
  }
  showToast("ポーションスロットが満杯です！", "error");
  return false;
}

function getPotionName(id) {
  if (id === 'potion_hp') return 'HPポーション';
  if (id === 'potion_shield') return 'シールドポーション';
  if (id === 'potion_energy') return 'エナジーポーション';
  return '';
}

// --- Neow's System Bonus ---
function selectStyle(styleId) {
  state.player.selectedPotionIndex = null;
  state.player.relics = ['fluorescent_marker'];
  state.player.potions = ['potion_hp', null];
  state.player.gold = 100;
  
  if (styleId === 'A') {
    state.player.maxHp = 35;
    state.player.hp = 35;
    state.player.deck = [
      'a_wanna', 'a_wanna', 'a_wanna', 
      'a_need', 'a_need', 
      'a_lets', 
      'a_gonna', 
      'a_takes_balls', 
      'a_think', 
      'a_know_who'
    ];
    showToast("スタイルA：パワー/脳筋型 で起動！", "success");
  } else if (styleId === 'B') {
    state.player.maxHp = 28;
    state.player.hp = 28;
    state.player.deck = [
      'a_wanna', 
      'a_need', 
      'a_lets', 
      'a_hurt_not', 
      'a_hope', 'a_hope', 
      'a_glad', 
      'a_ve_already', 
      'a_show_how', 
      'a_think'
    ];
    showToast("スタイルB：テクニカル/コンボ型 で起動！", "success");
  } else if (styleId === 'C') {
    state.player.maxHp = 30;
    state.player.hp = 30;
    state.player.deck = [
      'a_wanna', 
      'a_need', 'a_need', 
      'a_keep', 'a_keep', 
      'a_bad_at', 
      'a_enjoy', 
      'a_sick_of', 
      'a_think', 
      'a_know_where'
    ];
    showToast("スタイルC：毒＆鉄壁耐久型 で起動！", "success");
  }

  hasRelicChosen = false;
  state.map.currentLayer = 1;
  state.map.nodes.forEach(n => n.visited = false);
  
  shuffleDeck(state.player.deck);
  state.screen = 'map';
  render();
}

// --- Game Initialization ---
function initGame(className) {
  state.player.class = className || 'default';
  state.player.selectedPotionIndex = null;
  
  // クラスごとのステータス・デッキ・レリック分岐設定
  if (className === 'wizard') {
    state.player.maxHp = 25;
    state.player.hp = 25;
    state.player.gold = 100;
    state.player.relics = ['fountain_pen'];
    state.player.potions = ['potion_hp', null];
    state.player.deck = ['a_ve', 'a_ve', 'a_ve_already', 'a_havenot_yet', 'a_think', 'a_think', 'a_hope', 'a_know', 'a_need', 'a_wanna'];
  } else if (className === 'explorer') {
    state.player.maxHp = 30;
    state.player.hp = 30;
    state.player.gold = 100;
    state.player.relics = ['coffee'];
    state.player.potions = ['potion_hp', null];
    state.player.deck = ['a_like', 'a_like', 'a_keep', 'a_keep', 'a_bad_at', 'a_enjoy', 'a_need', 'a_wanna', 'a_think', 'a_lets'];
  } else if (className === 'scholar') {
    state.player.maxHp = 28;
    state.player.hp = 28;
    state.player.gold = 100;
    state.player.relics = ['dictionary_piece'];
    state.player.potions = ['potion_hp', null];
    state.player.deck = ['a_know_who', 'a_know_who', 'a_know_where', 'a_dont_know_why', 'a_need', 'a_need', 'a_think', 'a_wanna', 'a_lets', 'a_gonna'];
  } else { // default
    state.player.maxHp = 35;
    state.player.hp = 35;
    state.player.gold = 100;
    state.player.relics = ['fluorescent_marker'];
    state.player.potions = ['potion_hp', null];
    state.player.deck = ['a_wanna', 'a_wanna', 'a_lets', 'a_lets', 'a_need', 'a_need', 'a_gonna', 'a_should', 'a_think', 'a_know_who'];
  }
  
  hasRelicChosen = false;
  state.map.currentLayer = 1; 
  state.map.nodes.forEach(n => n.visited = false);
  
  shuffleDeck(state.player.deck);
  state.screen = 'neow_bonus';
  showToast("バベルのシステム起動中...", "success");
  render();
}

function selectCharacter(className) {
  initGame(className);
}

function restartGame() {
  state.screen = 'title';
  state.player.class = 'default';
  state.player.hp = 30;
  state.player.maxHp = 30;
  state.player.gold = 100;
  state.player.relics = [];
  state.player.potions = [null, null];
  state.player.deck = [];
  state.map.currentFloor = 0;
  state.map.currentLayer = 1;
  state.map.nodes.forEach(n => n.visited = false);
  render();
}

// --- Real-time Sentence constructing display ---
function updateConstructingSentenceDisplay() {
  const banner = document.getElementById('constructing-sentence-banner');
  if (!banner) return;
  
  if (state.battle.battlePhase === 'a_select') {
    banner.style.display = 'none';
    return;
  }
  
  banner.style.display = 'block';
  const built = getBuiltSentenceString();
  const translation = getBuiltSentenceTranslation();
  
  let nextHint = '';
  if (state.battle.battlePhase === 'b_select' && state.battle.currentSlotCard) {
    nextHint = ` <span style="font-size: 1.2rem; color: #a855f7; animation: blink 1.2s infinite; font-weight: 500;">(後: ${getRequiredNextTypeLabel(state.battle.currentSlotCard.type)})</span>`;
  }
  
  banner.innerHTML = `
    <div class="english">${built}${nextHint}</div>
    <div class="japanese">${translation}</div>
  `;
}

// --- Common Action Button Resolvers (Small Talk) ---
function executeSmallTalk() {
  if (state.screen !== 'battle' || state.battle.battlePhase !== 'a_select') {
    showToast("今は世間話（Small Talk）をしている場合ではありません！", "error");
    return;
  }
  
  // FIX: Enforce 1 use of Small Talk per turn rule
  if (state.battle.smallTalkUsed) {
    showToast("スモールトーク（世間話）は1ターンに1度までです！", "error");
    return;
  }
  
  state.battle.smallTalkUsed = true;
  
  const lines = ["Well...", "You know...", "I mean...", "Like...", "Actually...", "Basically...", "Hey!"];
  const randLine = lines[Math.floor(Math.random() * lines.length)];
  
  logCombat(`🗣️ Small Talk: "${randLine}" (敵に3ダメージ)`, "player");
  
  const pAvatar = document.getElementById('player-avatar-box');
  if (pAvatar) {
    const bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    bubble.innerText = randLine;
    pAvatar.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1000);
  }
  
  damageEnemy(3);
  render();
}

// --- Dom Rendering & Screen Switches ---
function render() {
  const screens = [
    'title-screen', 'char-select-screen', 'neow-screen', 'map-screen', 
    'map-choice-screen', 'battle-screen', 'shop-screen', 'rest-screen', 
    'victory-screen', 'defeat-screen'
  ];
  screens.forEach(s => {
    const el = document.getElementById(s);
    if (el) el.classList.remove('active');
  });
  
  let activeScreenId = '';
  if (state.screen === 'title') activeScreenId = 'title-screen';
  else if (state.screen === 'char_select') activeScreenId = 'char-select-screen';
  else if (state.screen === 'neow_bonus') activeScreenId = 'neow-screen';
  else if (state.screen === 'map') activeScreenId = 'map-screen';
  else if (state.screen === 'map_choice') activeScreenId = 'map-choice-screen';
  else if (state.screen === 'battle') activeScreenId = 'battle-screen';
  else if (state.screen === 'shop') activeScreenId = 'shop-screen';
  else if (state.screen === 'rest') activeScreenId = 'rest-screen';
  else if (state.screen === 'victory') activeScreenId = 'victory-screen';
  else if (state.screen === 'defeat') activeScreenId = 'defeat-screen';
  
  const activeEl = document.getElementById(activeScreenId);
  if (activeEl) activeEl.classList.add('active');
  
  renderHUD();
  
  if (state.screen === 'map') renderMap();
  else if (state.screen === 'map_choice') renderMapChoice();
  else if (state.screen === 'battle') renderBattle();
  else if (state.screen === 'shop') renderShop();
  
  if (state.screen === 'victory') {
    const hpEl = document.getElementById('victory-hp');
    if (hpEl) hpEl.innerText = `${state.player.hp}/${state.player.maxHp}`;
    const goldEl = document.getElementById('victory-gold');
    if (goldEl) goldEl.innerText = state.player.gold;
    const deckEl = document.getElementById('victory-deck');
    if (deckEl) deckEl.innerText = `${state.player.deck.length}枚`;
  } else if (state.screen === 'defeat') {
    const floorEl = document.getElementById('defeat-floor');
    if (floorEl) floorEl.innerText = `F${state.map.currentFloor}`;
    const goldEl = document.getElementById('defeat-gold');
    if (goldEl) goldEl.innerText = state.player.gold;
    const deckEl = document.getElementById('defeat-deck');
    if (deckEl) deckEl.innerText = `${state.player.deck.length}枚`;
  }
  resizeGame();
}

function renderHUD() {
  const header = document.getElementById('global-header');
  if (header) {
    if (state.screen === 'title' || state.screen === 'char_select' || state.screen === 'neow_bonus') {
      header.style.display = 'none';
      return;
    } else {
      header.style.display = 'flex';
    }
  }

  const hpFill = document.getElementById('hud-hp-fill');
  const hpVal = document.getElementById('hud-hp-val');
  const goldVal = document.getElementById('hud-gold-val');
  const floorVal = document.getElementById('hud-floor-val');
  const relicList = document.getElementById('hud-relics-list');
  
  if (hpFill) hpFill.style.width = `${(state.player.hp / state.player.maxHp) * 100}%`;
  if (hpVal) hpVal.innerText = `${state.player.hp}/${state.player.maxHp}`;
  if (goldVal) goldVal.innerText = state.player.gold;
  if (floorVal) floorVal.innerText = `F${state.map.currentFloor}`;
  
  if (relicList) {
    relicList.innerHTML = '';
    state.player.relics.forEach(rid => {
      const r = CARD_DATABASE.relics[rid] || CARD_DATABASE.bossRelics[rid];
      if (r) {
        const span = document.createElement('span');
        span.style.cursor = 'help';
        span.title = `${r.name}: ${r.desc}`;
        span.style.fontSize = '1.3rem';
        span.innerText = r.icon;
        
        // Tap handler for relic details on mobile devices
        span.addEventListener('click', (e) => {
          e.stopPropagation();
          showToast(`🔮【${r.name}】効果: ${r.desc}`, "info");
        });
        
        relicList.appendChild(span);
      }
    });
  }

  for (let i = 0; i < 2; i++) {
    const slotBtn = document.getElementById(`potion-slot-${i}`);
    if (slotBtn) {
      const potion = state.player.potions[i];
      if (potion) {
        const isSelected = state.player.selectedPotionIndex === i;
        slotBtn.className = `potion-btn${isSelected ? ' selected' : ''}`;
        if (potion === 'potion_hp') slotBtn.innerText = isSelected ? '🧪 使用する？' : '🧪 赤 (HP+12)';
        else if (potion === 'potion_shield') slotBtn.innerText = isSelected ? '🧪 使用する？' : '🧪 青 (防+15)';
        else if (potion === 'potion_energy') slotBtn.innerText = isSelected ? '🧪 使用する？' : '🧪 紫 (気+2)';
        slotBtn.title = `${getPotionName(potion)}: ${getPotionDesc(potion)}`;
      } else {
        slotBtn.className = 'potion-btn empty';
        slotBtn.innerText = '🧪 空';
        slotBtn.title = 'ポーションを持っていません';
      }
    }
  }
}

function renderMap() {
  const container = document.getElementById('map-grid');
  if (!container) return;
  container.innerHTML = '';
  
  const activeLayer = state.map.currentLayer || 1;
  const startFloor = (activeLayer - 1) * 5 + 1;
  const endFloor = activeLayer * 5;
  
  const titleEl = document.querySelector('#map-screen h2');
  if (titleEl) {
    titleEl.innerText = `バベルの塔 - 第 ${activeLayer} 層`;
  }
  
  for (let f = startFloor; f <= endFloor; f++) {
    const floorNode = state.map.nodes.find(n => n.floor === f);
    const floorEl = document.createElement('div');
    floorEl.className = 'map-floor';
    
    const nodeEl = document.createElement('div');
    let isPlayable = false;
    let isVisited = floorNode.visited;
    
    if (floorNode.floor === getNextPlayableFloor()) {
      isPlayable = true;
    }
    
    nodeEl.className = `map-node ${isPlayable ? 'playable' : 'locked'} ${isVisited ? 'visited' : ''}`;
    
    let icon = '⚔️';
    if (floorNode.type === 'choice') icon = '❓';
    if (floorNode.floor % 5 === 0) icon = '👹'; 
    
    nodeEl.innerHTML = `
      <span>${icon}</span>
      <div class="node-label">${floorNode.label}</div>
    `;
    
    if (isPlayable) {
      nodeEl.addEventListener('click', () => enterNode(f - 1));
    }
    
    floorEl.appendChild(nodeEl);
    container.appendChild(floorEl);
  }
}

function renderMapChoice() {
  const node = state.map.nodes.find(n => n.floor === state.map.currentFloor);
  const title = document.getElementById('choice-floor-label');
  if (title) title.innerText = `Floor ${state.map.currentFloor}: 運命の分かれ道`;
}

function selectCardInHand(index) {
  if (state.battle.battlePhase === 'a_select') {
    openCardPreview(state.player.hand[index], index);
  } else if (state.battle.battlePhase === 'card_discard_select') {
    discardSelectedCard(index);
  }
}

function discardSelectedCard(index) {
  const cardId = state.player.hand[index];
  state.player.hand.splice(index, 1);
  state.player.discard.push(cardId);
  
  const callback = state.battle.discardCallback;
  state.battle.battlePhase = 'a_select'; 
  state.battle.discardCallback = null;
  
  if (callback) {
    callback(cardId);
  }
  render();
}

function renderBattle() {
  const enemies = state.battle.enemies;
  const targetIndex = state.battle.targetIndex;
  
  for (let i = 0; i < 2; i++) {
    const panel = document.getElementById(`enemy-panel-${i}`);
    if (panel) {
      const enemy = enemies[i];
      if (enemy) {
        panel.style.display = 'block';
        
        panel.className = 'combatant-panel target-selectable';
        if (targetIndex === i) {
          panel.className += ' target-active';
        }
        
        const avatar = document.getElementById(`enemy-avatar-${i}`);
        const name = document.getElementById(`enemy-name-${i}`);
        const hpVal = document.getElementById(`enemy-hp-val-${i}`);
        const hpInner = document.getElementById(`enemy-hp-inner-${i}`);
        const shield = document.getElementById(`enemy-shield-badge-${i}`);
        const status = document.getElementById(`enemy-status-effects-${i}`);
        
        const intentIcon = document.getElementById(`enemy-intent-icon-${i}`);
        const intentVal = document.getElementById(`enemy-intent-val-${i}`);
        const intentDesc = document.getElementById(`enemy-intent-desc-${i}`);
        const intentBubble = document.getElementById(`enemy-intent-desc-${i}`);
        
        if (avatar) avatar.innerText = enemy.avatar || '🟢';
        
        let targetPrefix = '';
        if (targetIndex === i && enemies.length > 1) {
          targetPrefix = '🎯 ';
        }
        if (name) name.innerText = `${targetPrefix}${enemy.name} ${i === 0 ? '(前衛)' : '(後衛)'}`;
        if (hpVal) hpVal.innerText = `${enemy.hp}/${enemy.maxHp}`;
        if (hpInner) hpInner.style.width = `${(enemy.hp / enemy.maxHp) * 100}%`;
        
        if (shield) {
          if (enemy.shield > 0) {
            shield.style.display = 'inline-block';
            shield.innerText = `🛡️ ${enemy.shield}`;
          } else {
            shield.style.display = 'none';
          }
        }
        
        if (status) {
          status.innerHTML = '';
          if (enemy.statusEffects.weak > 0) {
            status.innerHTML += `<div class="status-effect weak" title="脱力: 与ダメージ50%減" style="color:var(--color-yellow); border-color:var(--color-yellow); cursor:help;">💢 敵与ダメ-50%:${enemy.statusEffects.weak}T</div>`;
          }
          if (enemy.statusEffects.poison > 0) {
            status.innerHTML += `<div class="status-effect poison" title="炎上: ターン終了時炎上ダメージ" style="color:#ff5722; border-color:#ff5722; cursor:help;">🔥 炎上ダメ:${enemy.statusEffects.poison}T</div>`;
          }
          if (enemy.statusEffects.vulnerable > 0) {
            status.innerHTML += `<div class="status-effect vulnerable" title="脆弱: 被ダメージ50%増" style="color:#ff1744; border-color:#ff1744; cursor:help;">💥 敵被ダメ+50%:${enemy.statusEffects.vulnerable}T</div>`;
          }
          if (enemy.statusEffects.doubleNextAttack) {
            status.innerHTML += `<div class="status-effect" title="激昂: 次のターン攻撃力2倍" style="color:orange; border-color:orange; cursor:help;">👑 攻撃2倍バフ</div>`;
          }
          if (enemy.statusEffects.strength > 0) {
            status.innerHTML += `<div class="status-effect" title="筋力: 恒久攻撃力増加" style="color:#ff1744; border-color:#ff1744; cursor:help;">📈 敵筋力:+${enemy.statusEffects.strength}</div>`;
          }
          if (enemy.statusEffects.intangible > 0) {
            status.innerHTML += `<div class="status-effect" title="無形: 受ける全ダメージを1にする" style="color:cyan; border-color:cyan; cursor:help;">🛡️ 無形:${enemy.statusEffects.intangible}T</div>`;
          }
        }
        
        if (enemy.intent) {
          if (intentBubble) intentBubble.style.display = 'flex';
          
          let icon = '⚔️';
          if (enemy.intent.type === 'shield') icon = '🛡️';
          if (enemy.intent.type === 'debuff_weak') icon = '💢';
          if (enemy.intent.type === 'curse') icon = '💀';
          if (enemy.intent.type === 'buff_double_next') icon = '👑';
          if (enemy.intent.type === 'buff_strength_gain') icon = '📈';
          if (enemy.intent.type === 'debuff_confuse') icon = '🌀';
          if (enemy.intent.type === 'intangible') icon = '🛡️';
          if (enemy.intent.type === 'countdown_power') icon = '⏰';
          if (enemy.intent.type === 'debuff_vulnerable') icon = '💥';
          if (enemy.intent.type === 'wipe_buff') icon = '👿';
          if (enemy.intent.type === 'add_waste') icon = '👾';
          
          if (intentIcon) intentIcon.innerText = icon;
          if (intentVal) {
            if (enemy.intent.val > 0) {
              let displayVal = enemy.intent.val;
              if (enemy.statusEffects.strength > 0) {
                displayVal += enemy.statusEffects.strength;
              }
              if (enemy.tempPower > 0) {
                displayVal += enemy.tempPower;
              }
              if (enemy.statusEffects.weak > 0) {
                displayVal = Math.max(1, Math.floor(displayVal * 0.5));
              }
              if (state.player.statusEffects.vulnerable > 0) {
                displayVal = Math.floor(displayVal * 1.5);
              }
              if (enemy.statusEffects.doubleNextAttack) {
                displayVal *= 2;
              }
              intentVal.innerText = displayVal;
              intentVal.style.display = 'inline';
            } else {
              intentVal.style.display = 'none';
            }
          }
          if (intentDesc) intentDesc.title = enemy.intent.desc;
        } else {
          if (intentBubble) intentBubble.style.display = 'none';
        }
        
      } else {
        panel.style.display = 'none';
      }
    }
  }
  
  const playerAvatar = document.getElementById('player-avatar');
  const playerHpVal = document.getElementById('player-hp-val');
  const playerHpInner = document.getElementById('player-hp-inner');
  const playerShield = document.getElementById('player-shield-badge');
  const playerStatus = document.getElementById('player-status-effects');
  
  let playerIcon = '🤠';
  if (state.player.class === 'wizard') playerIcon = '🧙‍♂️';
  else if (state.player.class === 'explorer') playerIcon = '🦁';
  else if (state.player.class === 'scholar') playerIcon = '🧐';
  
  if (playerAvatar) playerAvatar.innerText = playerIcon;
  if (playerHpVal) playerHpVal.innerText = `${state.player.hp}/${state.player.maxHp}`;
  if (playerHpInner) playerHpInner.style.width = `${(state.player.hp / state.player.maxHp) * 100}%`;
  
  if (playerShield) {
    if (state.player.shield > 0) {
      playerShield.style.display = 'inline-block';
      playerShield.innerText = `🛡️ ${state.player.shield}`;
    } else {
      playerShield.style.display = 'none';
    }
  }
  
  if (playerStatus) {
    playerStatus.innerHTML = '';
    if (state.player.statusEffects.weak > 0) {
      playerStatus.innerHTML += `<div class="status-effect weak" title="脱力" style="color:var(--color-yellow); border-color:var(--color-yellow); cursor:help;">💢 与ダメ-50%:${state.player.statusEffects.weak}T</div>`;
    }
    if (state.player.statusEffects.counter > 0) {
      playerStatus.innerHTML += `<div class="status-effect poison" title="反撃" style="color:#00e676; border-color:#00e676; cursor:help;">⚡ 反撃ダメ:${state.player.statusEffects.counter}</div>`;
    }
    if (state.player.statusEffects.vulnerable > 0) {
      playerStatus.innerHTML += `<div class="status-effect vulnerable" title="脆弱" style="color:#ff1744; border-color:#ff1744; cursor:help;">💥 被ダメ+50%:${state.player.statusEffects.vulnerable}T</div>`;
    }
    if (state.player.statusEffects.confused > 0) {
      playerStatus.innerHTML += `<div class="status-effect vulnerable" title="混乱: 引いたカードコストが0~3にランダム変化" style="color:#c084fc; border-color:#c084fc; cursor:help;">🌀 混乱コスト乱数:${state.player.statusEffects.confused}T</div>`;
    }
    if (state.player.statusEffects.buffProtect) {
      playerStatus.innerHTML += `<div class="status-effect" title="バフ保護: 教官の打ち消し無効" style="border-color:#60a5fa; color:#60a5fa; cursor:help;">🛡️ バフ保護</div>`;
    }
    if (state.player.statusEffects.invincible) {
      playerStatus.innerHTML += `<div class="status-effect" title="無敵: 被ダメージ0" style="border-color:cyan; color:cyan; cursor:help;">💎 無敵 (受ダメ0)</div>`;
    }
    if (state.player.critMultiplier > 1) {
      playerStatus.innerHTML += `<div class="status-effect" title="クリティカル" style="border-color:orange; color:orange; cursor:help;">🔥 クリティカル:${state.player.critMultiplier}x</div>`;
    }
    if (state.player.tempPower > 0) {
      playerStatus.innerHTML += `<div class="status-effect" title="攻撃強化" style="border-color:red; color:red; cursor:help;">💪 攻撃強化:+${state.player.tempPower}</div>`;
    }
    if (state.player.sentencePower > 0) {
      playerStatus.innerHTML += `<div class="status-effect" title="完成バフ(筋力)" style="border-color:#00e676; color:#00e676; cursor:help;">📖 完成バフ:+${state.player.sentencePower}</div>`;
    }
    if (state.player.statusEffects.nextTurnDamageBoost > 0) {
      playerStatus.innerHTML += `<div class="status-effect" title="次ターン攻撃強化" style="border-color:#f87171; color:#f87171; cursor:help;">⏰ 次ターン:+${state.player.statusEffects.nextTurnDamageBoost}</div>`;
    }
    if (state.player.statusEffects.nextAttackMultiplier > 1) {
      playerStatus.innerHTML += `<div class="status-effect" title="次攻撃倍率" style="border-color:#f59e0b; color:#f59e0b; cursor:help;">🔥 次攻撃:${state.player.statusEffects.nextAttackMultiplier}倍</div>`;
    }
  }
  
  const energyOrb = document.getElementById('battle-energy-orb');
  if (energyOrb) energyOrb.innerText = `${state.player.energy}/${state.player.maxEnergy}`;
  
  const drawPileCount = document.getElementById('deck-draw-pile-count');
  if (drawPileCount) drawPileCount.innerText = state.player.deck.length;
  
  const discardPileCount = document.getElementById('deck-discard-pile-count');
  if (discardPileCount) discardPileCount.innerText = state.player.discard.length;

  updateConstructingSentenceDisplay();
  
  const choiceOverlay = document.getElementById('choice-overlay-container');
  const handZone = document.getElementById('player-hand-container');
  const endTurnBtn = document.getElementById('end-turn-btn');
  const rerollContainer = document.getElementById('reroll-container');
  
  const smallTalkContainer = document.getElementById('small-talk-container');
  const smallTalkBtn = document.getElementById('small-talk-btn');
  if (smallTalkContainer && smallTalkBtn) {
    if (state.battle.battlePhase === 'a_select') {
      smallTalkContainer.style.display = 'flex';
      
      // FIX: Disable Small Talk button visually when already used
      if (state.battle.smallTalkUsed) {
        smallTalkBtn.setAttribute('disabled', 'true');
        smallTalkBtn.style.opacity = '0.4';
        smallTalkBtn.innerText = '🗣️ Small Talk (使用済)';
      } else {
        smallTalkBtn.removeAttribute('disabled');
        smallTalkBtn.style.opacity = '1';
        smallTalkBtn.innerText = '🗣️ Small Talk (0)';
      }
    } else {
      smallTalkContainer.style.display = 'none';
    }
  }
  
  if (state.battle.battlePhase === 'a_select') {
    if (choiceOverlay) choiceOverlay.style.display = 'none';
    if (handZone) handZone.style.visibility = 'visible';
    if (endTurnBtn) endTurnBtn.removeAttribute('disabled');
    if (rerollContainer) rerollContainer.style.display = 'none';
    renderPlayerHand();
  } else if (state.battle.battlePhase === 'card_discard_select') {
    if (choiceOverlay) choiceOverlay.style.display = 'none';
    if (handZone) handZone.style.visibility = 'visible';
    if (endTurnBtn) endTurnBtn.setAttribute('disabled', 'true');
    if (rerollContainer) rerollContainer.style.display = 'none';
    renderPlayerHand();
  } else if (state.battle.battlePhase === 'b_select') {
    if (choiceOverlay) {
      choiceOverlay.style.display = 'flex';
      renderBChoicesUI();
    }
    if (rerollContainer) {
      rerollContainer.style.display = 'block';
      const rerollBtn = document.getElementById('reroll-b-btn');
      if (rerollBtn) {
        rerollBtn.innerText = `🔄 Bパーツをリロール (今ターン残り: ${state.battle.rerollCount}回)`;
        if (state.battle.rerollCount <= 0) {
          rerollBtn.setAttribute('disabled', 'true');
          rerollBtn.style.opacity = '0.5';
        } else {
          rerollBtn.removeAttribute('disabled');
          rerollBtn.style.opacity = '1';
        }
      }
    }
    if (handZone) handZone.style.visibility = 'hidden';
    if (endTurnBtn) endTurnBtn.setAttribute('disabled', 'true');
  } else if (state.battle.battlePhase === 'topping_select') {
    if (choiceOverlay) {
      choiceOverlay.style.display = 'flex';
      renderToppingsChoicesUI();
    }
    if (rerollContainer) rerollContainer.style.display = 'none';
    if (handZone) handZone.style.visibility = 'hidden';
    if (endTurnBtn) endTurnBtn.setAttribute('disabled', 'true');
  } else if (state.battle.battlePhase === 'victory_reward') {
    if (choiceOverlay) {
      choiceOverlay.style.display = 'flex';
      renderVictoryDraftUI();
    }
    if (rerollContainer) rerollContainer.style.display = 'none';
    if (handZone) handZone.style.visibility = 'hidden';
    if (endTurnBtn) endTurnBtn.setAttribute('disabled', 'true');
  }
}

function renderPlayerHand() {
  const handContainer = document.getElementById('battle-hand');
  if (!handContainer) return;
  handContainer.innerHTML = '';
  
  const handWrapper = document.getElementById('player-hand-container');
  if (handWrapper) {
    if (state.battle.battlePhase === 'card_discard_select') {
      handWrapper.setAttribute('data-hand-title', '🎴 捨てるカードを1枚クリックして選択してください。');
      handWrapper.classList.add('discard-mode-active');
    } else {
      handWrapper.setAttribute('data-hand-title', '');
      handWrapper.classList.remove('discard-mode-active');
    }
  }
  
  state.player.hand.forEach((cardId, index) => {
    const card = getCardById(cardId);
    const cardEl = document.createElement('div');
    const cost = getCardCost(cardId, index);
    
    const isUpgraded = card.id.endsWith('_plus');
    cardEl.className = `game-card type-${card.type} rarity-${card.rarity}`;
    if (isUpgraded) {
      cardEl.className += ' rarity-rare';
    }
    
    if (state.battle.battlePhase === 'card_discard_select') {
      cardEl.style.borderColor = 'var(--color-red)';
      cardEl.style.cursor = 'pointer';
      cardEl.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
    }
    
    const modText = getModText(card.baseMod);
    const badgeHtml = modText ? `<div class="card-mod-badge">${modText}</div>` : '';
    const nextHintHtml = `<div class="card-next-hint">${getRequiredNextTypeLabel(card.type)}</div>`;
    const translationHtml = card.translation ? `<div class="card-translation">${card.translation}</div>` : '';
    const rubyHtml = card.pronounce ? `<span class="card-pronounce">${card.pronounce}</span>` : '';
    cardEl.innerHTML = `
      <div class="card-cost-badge">${cost}</div>
      <div class="card-footer">
        <span class="card-type-tag">T${card.type}</span>
      </div>
      ${rubyHtml}
      <div class="card-title">${card.title}</div>
      ${translationHtml}
      ${badgeHtml}
      ${nextHintHtml}
      <div class="card-body">${card.desc}</div>
      <div class="card-footer" style="font-size: 0.65rem; color: var(--text-secondary);">
        <span>${isUpgraded ? 'UPGRADED (+)' : card.rarity.toUpperCase()}</span>
      </div>
    `;
    
    cardEl.addEventListener('click', () => selectCardInHand(index));
    handContainer.appendChild(cardEl);
  });
}

function renderBChoicesUI() {
  const title = document.getElementById('overlay-title-text');
  const grid = document.getElementById('overlay-choice-grid');
  const actions = document.getElementById('overlay-sub-actions');
  
  if (title) title.innerText = '英文構築：後ろに続くフレーズ(B)を選択してください';
  if (actions) actions.style.display = 'none';
  
  if (grid) {
    grid.innerHTML = '';
    state.battle.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = `choice-btn ${choice.color}`;
      
      let hintMarker = '';
      if (hasRelic('fluorescent_marker') && !choice.isTrap && !choice.isTypo) {
        hintMarker = '💡 ';
        btn.style.boxShadow = '0 0 15px #00e676';
        btn.style.borderColor = '#00e676';
      }
      
      btn.innerHTML = `
        <span class="choice-text">${hintMarker}${choice.displayText}</span>
        <span class="choice-desc">「${choice.translation}」 (${choice.desc})</span>
      `;
      btn.addEventListener('click', () => selectBChoice(index));
      grid.appendChild(btn);
    });
  }
}

function renderToppingsChoicesUI() {
  const title = document.getElementById('overlay-title-text');
  const grid = document.getElementById('overlay-choice-grid');
  const actions = document.getElementById('overlay-sub-actions');
  
  if (title) title.innerText = 'トッピング：追加効果カードを繋げますか？ (エナジー消費)';
  
  if (actions) {
    actions.style.display = 'flex';
    actions.innerHTML = `
      <button class="action-btn secondary" onclick="finishSentence()">文を完成させる (終了)</button>
    `;
  }
  
  if (grid) {
    grid.innerHTML = '';
    state.battle.toppingChoices.forEach((topping, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn purple';
      btn.innerHTML = `
        <span class="choice-text">${topping.icon} ${topping.text}</span>
        <span class="choice-desc">「${topping.translation}」 (+${topping.desc} / コスト: ${topping.cost})</span>
      `;
      btn.addEventListener('click', () => selectTopping(index));
      grid.appendChild(btn);
    });
  }
}

function renderVictoryDraftUI() {
  const title = document.getElementById('overlay-title-text');
  const grid = document.getElementById('overlay-choice-grid');
  const actions = document.getElementById('overlay-sub-actions');
  
  if (title) title.innerText = '勝利報酬！ デッキに追加するカードを選択してください';
  
  if (actions) {
    actions.style.display = 'flex';
    actions.innerHTML = `
      <button class="action-btn secondary" onclick="skipDraftCard()">スキップ</button>
    `;
  }
  
  if (grid) {
    grid.innerHTML = '';
    state.battle.choices.forEach((card, index) => {
      const btn = document.createElement('button');
      btn.className = `choice-btn type-${card.type} rarity-${card.rarity}`;
      btn.style.minHeight = '160px';
      const modText = getModText(card.baseMod);
      const modBadgeHtml = modText ? `<span style="font-size:0.75rem; color:var(--color-yellow); font-family:var(--font-mono); margin-top:4px; font-weight:bold;">${modText}</span>` : '';
      const nextHintText = getRequiredNextTypeLabel(card.type);
      const rubyHtml = card.pronounce ? `<span class="card-pronounce" style="font-size:0.6rem; text-align:left; color:rgba(255,255,255,0.4);">${card.pronounce}</span>` : '';
      btn.innerHTML = `
        <span style="font-family: var(--font-mono); color: var(--text-secondary); font-size: 0.8rem;">Type ${card.type} | コスト: ${card.cost} | ${card.translation}</span>
        ${rubyHtml}
        <span class="choice-text" style="font-size: 1.15rem; margin-top:5px;">${card.title}</span>
        ${modBadgeHtml}
        <span style="font-size: 0.72rem; color: #00e676; margin-top: 4px; font-weight: bold;">${nextHintText}</span>
        <span class="choice-desc" style="margin-top:10px;">${card.desc}</span>
      `;
      btn.addEventListener('click', () => chooseDraftCard(index));
      grid.appendChild(btn);
    });
  }
}

function renderShop() {
  const cardsGrid = document.getElementById('shop-cards-grid');
  const relicsGrid = document.getElementById('shop-relics-grid');
  
  const shopGoldEl = document.getElementById('shop-player-gold');
  if (shopGoldEl) shopGoldEl.innerText = state.player.gold;
  
  if (cardsGrid) {
    cardsGrid.innerHTML = '';
    
    // Cards in shop
    state.shop.cards.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = `shop-card-item rarity-${item.rarity}`;
      
      if (item.sold) {
        div.className += ' sold-out';
      }
      
      const modText = getModText(item.baseMod);
      const modBadgeHtml = modText ? `<div style="font-size:0.7rem; color:var(--color-yellow); font-weight:800; font-family:var(--font-mono); margin-top:3px;">${modText}</div>` : '';
      const nextHintText = getRequiredNextTypeLabel(item.type);
      const rubyHtml = item.pronounce ? `<div class="card-pronounce" style="font-size:0.6rem; color:rgba(255,255,255,0.4); text-align:center; margin-top:2px;">${item.pronounce}</div>` : '';
      div.innerHTML = `
        <div style="font-size: 0.72rem; color:var(--text-secondary);">T${item.type} | コスト: ${item.cost} | ${item.translation}</div>
        ${rubyHtml}
        <div style="font-weight:bold; font-size:0.95rem; text-align:center; height:36px; display:flex; align-items:center; justify-content:center;">${item.title}</div>
        ${modBadgeHtml}
        <div style="font-size: 0.65rem; color: #00e676; margin-top: 3px; font-weight: bold;">${nextHintText}</div>
        <div class="shop-price-tag" style="margin-top:5px;">🪙 ${item.price}</div>
      `;
      div.title = item.desc;
      
      if (!item.sold) {
        div.addEventListener('click', () => buyShopCard(index));
      }
      cardsGrid.appendChild(div);
    });

    // Potions in shop
    state.shop.potions.forEach((potion, index) => {
      const div = document.createElement('div');
      div.className = 'shop-card-item rarity-uncommon';
      div.style.borderColor = '#c084fc';
      
      if (potion.sold) {
        div.className += ' sold-out';
      }
      
      div.innerHTML = `
        <div style="font-size: 0.75rem; color:#c084fc;">ポーション</div>
        <div style="font-weight:bold; font-size:0.95rem; text-align:center; height:36px; display:flex; align-items:center; justify-content:center;">🧪 ${potion.name}</div>
        <div style="font-size: 0.65rem; color: var(--text-secondary); margin-top: 3px;">${potion.desc}</div>
        <div class="shop-price-tag" style="margin-top:5px;">🪙 ${potion.price}</div>
      `;
      
      if (!potion.sold) {
        div.addEventListener('click', () => buyShopPotion(index));
      }
      cardsGrid.appendChild(div);
    });
  }
  
  if (relicsGrid) {
    relicsGrid.innerHTML = '';
    state.shop.relics.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'relic-item';
      
      if (item.sold) {
        div.className += ' sold-out';
      }
      
      div.innerHTML = `
        <div class="relic-icon-box">${item.icon}</div>
        <div class="relic-info">
          <div class="relic-title">${item.name}</div>
          <div class="relic-desc">${item.desc}</div>
        </div>
        <div class="shop-price-tag">🪙 ${item.price}</div>
      `;
      
      if (!item.sold) {
        div.addEventListener('click', () => buyShopRelic(index));
      }
      relicsGrid.appendChild(div);
    });
  }
  
  const removePriceLabel = document.getElementById('shop-remove-price');
  if (removePriceLabel) removePriceLabel.innerText = `🪙 ${state.shop.removePrice}`;
  
  const upgradePriceLabel = document.getElementById('shop-upgrade-price');
  if (upgradePriceLabel) upgradePriceLabel.innerText = `🪙 ${state.shop.upgradePrice}`;

  const removeBtn = document.getElementById('shop-remove-btn');
  if (removeBtn) {
    if (state.shop.hasRemovedThisShop || state.player.gold < state.shop.removePrice) {
      removeBtn.setAttribute('disabled', 'true');
      removeBtn.style.opacity = '0.5';
    } else {
      removeBtn.removeAttribute('disabled');
      removeBtn.style.opacity = '1';
    }
  }
  
  const upgradeBtn = document.getElementById('shop-upgrade-btn');
  if (upgradeBtn) {
    if (state.shop.hasUpgradedThisShop || state.player.gold < state.shop.upgradePrice) {
      upgradeBtn.setAttribute('disabled', 'true');
      upgradeBtn.style.opacity = '0.5';
    } else {
      upgradeBtn.removeAttribute('disabled');
      upgradeBtn.style.opacity = '1';
    }
  }
}

// --- Global Scope bindings to window for HTML event handlers ---
window.selectCharacter = selectCharacter;
window.selectStyle = selectStyle;
window.usePotion = usePotion;
window.openDeckViewer = openDeckViewer;
window.closeDeckViewer = closeDeckViewer;
window.openDictViewer = openDictViewer;
window.closeDictViewer = closeDictViewer;
window.switchDictTab = switchDictTab;
window.selectChoiceNode = selectChoiceNode;
window.restartGame = restartGame;
window.endPlayerTurn = endPlayerTurn;
window.finishSentence = finishSentence;
window.skipDraftCard = skipDraftCard;
window.chooseDraftCard = chooseDraftCard;
window.restOptionHeal = restOptionHeal;
window.restOptionMaxHp = restOptionMaxHp;
window.restOptionUpgrade = restOptionUpgrade;
window.restOptionRemove = restOptionRemove;
window.buyShopCard = buyShopCard;
window.buyShopRelic = buyShopRelic;
window.buyShopPotion = buyShopPotion;
window.startShopCardRemoval = startShopCardRemoval;
window.startShopCardUpgrade = startShopCardUpgrade;
window.leaveShop = leaveShop;
window.enterNode = enterNode;
window.rerollBChoices = rerollBChoices;
window.closeCardPreview = closeCardPreview;
window.confirmPlayCard = confirmPlayCard;
window.chooseBossRelic = chooseBossRelic;
window.selectTarget = selectTarget;
window.executeSmallTalk = executeSmallTalk;

// --- Auto scaling utility to maintain 16:9 aspect ratio ---
function resizeGame() {
  const game = document.getElementById('game-screen');
  if (!game) return;
  
  const isPortrait = window.innerHeight > window.innerWidth && window.innerWidth < 900;
  if (isPortrait) {
    game.style.transform = 'none';
    game.style.position = 'relative';
    game.style.left = 'auto';
    game.style.top = 'auto';
    return;
  }
  
  const baseWidth = 1280;
  const baseHeight = 720;
  
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  const scaleX = windowWidth / baseWidth;
  const scaleY = windowHeight / baseHeight;
  const scale = Math.min(scaleX, scaleY);
  
  // Enforce center scaling via absolute translation so it fills maximum viewport space
  game.style.position = 'absolute';
  game.style.left = '50%';
  game.style.top = '50%';
  game.style.transform = `translate(-50%, -50%) scale(${scale})`;
  game.style.transformOrigin = 'center center';
}

// Bind resize handler
window.addEventListener('resize', resizeGame);
window.resizeGame = resizeGame;

// --- Initial Startup Bindings ---
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('title-btn-start');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      initGame('default');
    });
  }
  resizeGame();
  render();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  const startBtn = document.getElementById('title-btn-start');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      initGame('default');
    });
  }
  resizeGame();
  render();
}
