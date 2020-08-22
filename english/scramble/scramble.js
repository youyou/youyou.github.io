function getPageSize() {
    var c,
        a;
    if (window.innerHeight && window.scrollMaxY) {
        c = document.body.scrollWidth;
        a = window.innerHeight + window.scrollMaxY
    } else {
        if (document.body.scrollHeight > document.body.offsetHeight) {
            c = document.body.scrollWidth;
            a = document.body.scrollHeight
        } else {
            c = document.body.offsetWidth;
            a = document.body.offsetHeight
        }
    }
    var b,
        d;
    if (self.innerHeight) {
        b = self.innerWidth;
        d = self.innerHeight
    } else {
        if (document.documentElement && document.documentElement.clientHeight) {
            b = document.documentElement.clientWidth;
            d = document.documentElement.clientHeight
        } else {
            if (document.body) {
                b = document.body.clientWidth;
                d = document.body.clientHeight
            }
        }
    }
    if (a < d) {
        pageHeight = d
    } else {
        pageHeight = a
    }
    if (c < b) {
        pageWidth = b
    } else {
        pageWidth = c
    }
    arrayPageSize = new Array(pageWidth, pageHeight, b, d);
    return arrayPageSize
}
function intToChar(a) {
    switch (a) {
    case 0:
        return "a";
    case 1:
        return "b";
    case 2:
        return "c";
    case 3:
        return "d";
    case 4:
        return "e";
    case 5:
        return "f";
    case 6:
        return "g";
    case 7:
        return "h";
    case 8:
        return "i";
    case 9:
        return "j";
    case 10:
        return "k";
    case 11:
        return "l";
    case 12:
        return "m";
    case 13:
        return "n";
    case 14:
        return "o";
    case 15:
        return "p";
    case 16:
        return "q";
    case 17:
        return "r";
    case 18:
        return "s";
    case 19:
        return "t";
    case 20:
        return "u";
    case 21:
        return "v";
    case 22:
        return "w";
    case 23:
        return "x";
    case 24:
        return "y";
    case 25:
        return "z";
    default:
        assert(false, "intToChar paremeter out of range!");
        return ""
    }
}
function charToInt(b) {
    var a = "abcdefghijklmnopqrstuvwxyz";
    return a.indexOf(b)
}
var scramble = null;
var _loadingScene = null;
function Scramble(l) {
    var D = null;
    var n = null;
    var z = null;
    var y = null;
    var B = 38;
    var h = 25;
    var t = 25;
    var aa = new Array();
    var N = null;
    var H = null;
    var f = null;
    var c = null;
    var p = null;
    var U = null;
    var o = ["ax|斧子", "aid|帮助,援助工,救助", "ban|取缔,查禁", "beg|恳求,请求", "bet|打赌,赌注", "bid|企图", "cab|出租汽车", "cop|警察", "cue|暗示,信号", "dim|昏暗的,隐约的", "dot|点,小圆点", "dye|染料", "era|时代,纪元", "fax|传真机", "fee|费,酬金", "fog|雾", "fry|油煎,油炸", "fur|柔毛软毛", "gap|缺口,间隙", "gas|气体,煤气", "gum|牙龈,口香糖", "ham|火腿", "hay|干草", "hen|母鸡", "hip|臀部,髋部", "hut|茅舍,棚屋", "jam|果酱", "jar|罐子,广口瓶", "jaw|下颚", "jet|喷气式飞机,喷射", "kid|小孩", "inn|小旅馆,客栈", "lad|男孩,小伙子", "lag|落后,滞后", "lid|盖子", "log|原木,木材", "mat|席子,垫子", "mud|泥，泥浆", "mug|大杯", "odd|奇怪的,古怪的", "ore|矿石", "pad|垫,衬垫", "paw|爪,爪子", "pit|地洞,坑", "pub|酒吧，酒馆", "rag|破布，破旧衣服", "rat|老鼠", "raw|自然状态的", "rib|肋骨", "rid|使摆脱，使解除", "rob|抢劫", "rub|擦，磨擦", "sin|罪孽", "sum|总数，总和", "wit|风趣，妙语", "acid|酸，酸性物质", "acre|英亩", "ally|同盟国,同盟者", "amid|在...中间，在...之中", "atom|原子", "band|管乐队", "bare|赤裸的,光光的", "barn|谷仓,牲口棚", "beam|束,(光线等的)柱", "bean|豆子", "bind|捆绑,捆扎", "bold|勇敢的,无畏的", "bolt|螺栓,插销", "bomb|炸弹", "bond|联结,联系", "boom|激增,繁荣", "brow|前额,眉毛", "bulb|电灯泡,球状物", "bulk|(巨大)物体,(大)块", "bump|碰,撞", "cash|钱,现款", "cast|投,扔", "cell|细胞", "chap|小伙子,家伙", "chew|咀嚼,咬", "chin|下巴", "chip|碎片,碎屑", "chop|砍,劈", "cite|引用,引证", "clap|拍手,鼓掌", "claw|爪,脚爪", "clay|泥土,黏土", "clue|线索,提示", "code|准则,法规", "coil|圈,线圈", "cope|应付,处理    ", "cord|(细)绳", "core|果核,核心,要点", "crew|全体工作人员,船员,机组人员", "cube|立方形,立方体", "curl|鬈发,卷状物", "dash|猛冲,飞奔", "data|数据,资料", "debt|欠款,债务", "deck|甲板,层面", "deer|鹿", "deny|否认,不承认", "dial|标度盘,拨号盘", "diet|日常饮食", "dirt|尘土,污垢", "disk|圆盘,光盘，磁盘", "dive|跳水,潜水", "dose|剂量,一剂,一份", "drag|拖,拉", "drum|鼓,鼓声", "dumb|哑,哑巴的", "dump|倾倒,倾卸", "dusk|黄昏", "ease|容易,不费力", "echo|回音,回声", "edit|编辑,选辑", "emit|发出,射击", "envy|忌妒,羡慕", "evil|邪恶的,坏的", "exit|出口,通道", "fade|褪去,褪色", "fame|声誉,名声", "fare|费,票价", "fate|命运", "file|档案,文件", "flee|逃走,逃掉", "folk|亲属", "fund|基金,专款", "fuss|忙乱,大惊小怪", "gang|(一)帮,(一)伙", "gaze|凝视,注视", "gear|齿轮装置", "gene|基因", "germ|微生物,细菌", "glow|光亮,光辉", "glue|胶,胶水确良", "golf|高尔夫球运动", "grab|抓住,攫取", "gram|克", "grip|抓紧,掌握", "gulf|海湾", "halt|停止,停住", "harm|损害,伤害", "heal|使愈合,治愈", "heap|一堆,许多", "heel|脚后跟", "hell|地狱", "herd|兽群,牧群", "hint|暗示,示意", "holy|神圣的,圣洁的", "hook|钩,钩状物", "horn|角,犄角", "host|主人,东道主", "hunt|打猎,猎取", "idle|懒散的,无所事事的", "item|条款,项目", "jazz|爵士乐", "jury|陪审团", "keen|热心的,渴望的", "knot|结,打结", "lamb|羔羊，小羊", "lane|小路，小巷", "lawn|草地，草坪", "leak|漏，渗出", "lean|倾斜，依靠", "leap|跳跃，跳动", "lens|透镜，镜片", "lest|惟恐,免得", "lick|舔,舔食", "limb|肢,臂,腿", "link|连接,联系", "loaf|面包", "loan|贷款,借贷", "loop|圈,环,环状物", "lord|领主,君主", "lump|块,小方块儿", "lung|肺,肺部", "maid|女仆,侍女", "male|男性的,雄性的", "mask|面具,面罩", "mate|伙伴,同事", "melt|(使)融化,(使)消遣", "mere|仅仅的,只不过的", "mess|脏乱状态,弄乱", "mild|温和的,温柔的,温暖的", "mill|磨坊,碾磨机", "mist|薄雾", "mode|方式,样式", "mold|霉,霉菌", "mood|心情,情绪", "navy|海军", "nest|巢,窝", "nest|巢,窝", "omit|省略,删节", "oral|口头的", "oval|椭圆形的,卵形的", "oven|烤箱,烤炉", "pace|步,步速,节奏", "palm|手掌,掌状物", "peak|山峰,顶点", "peer|同龄人,贵族", "pill|药丸", "pint|品脱(度量单位)", "pine|松树", "plot|故事情节,计划", "plug|插头,插座,塞子", "plus|加,加号", "poll|民意测验", "pond|池塘", "pose|造成,引起", "pray|祈求,祈祷", "pump|泵，抽", "quit|停止，放弃", "quiz|智力竞赛", "rack|挂架，搁架", "rage|狂怒，盛怒", "raid|袭击，抢劫", "rail|栏杆，铁轨", "rank|军衔，等级", "rare|稀有的，罕见的", "rate|速度，比率", "rear|后部，尾部", "rely|依靠，依赖", "rent|租用，出租", "riot|暴乱，骚乱", "risk|危险，风险", "roar|吼叫，怒吼", "rude|粗鲁的，不礼貌的", "rust|铁锈，生锈", "sack|麻袋，包，解雇", "sake|缘故，理由", "scan|细看", "seal|封条，图章", "shed|脱落，脱去", "skim|掠过，浏览", "slap|拍，击打", "slim|薄的，苗条的", "slip|滑倒，跌落", "soak|浸泡，渗透", "soar|猛增，剧增", "stem|茎干，花枝", "suck|吸，吮", "tame|驯服的，温顺的", "tide|潮，潮汐", "trap|陷阱，圈套", "tube|软管，显象管", "undo|解开，松开", "urge|鼓励，激励", "vain|徒劳的，无效的", "vary|变化", "vice|缺点，弱点", "vote|票，选票", "wage|工资，报酬", "weed|杂草，野草", "weep|哭泣", "weld|焊接", "wool|羊毛，毛线", "yawn|打哈欠", "zone|地区，区域", "abuse|滥用，妄用", "acute|严重的，激烈的", "acute|严重的，激烈的", "adapt|使适应，使适合", "adopt|收养，采纳，采用", "adult|成年人，成年的", "agent|代理人,代理商", "alarm|惊恐,忧虑", "alert|警觉,留神,注意的", "alike|相像的,同样的", "alter|改变,改动,变更", "amaze|使惊奇,使惊愕", "amuse|逗乐,逗笑", "angle|角,角度", "ankle|踝,踝关节", "annoy|使恼怒,使烦恼", "apart|成距离,相间隔", "apply|申请,请求", "arise|产生,出现,发生", "asset|人价值的,优点", "audio|听觉的,声音的", "avoid|避免,预防", "await|等候,期待", "award|授予,给予", "aware|意识到,知道的", "awful|极坏的,可怕的", "basis|基础,根据,原则", "beard|胡须", "beast|野兽,牲畜", "being|生物,人", "bible|圣经", "blade|刀刃,刀片", "blank|空白的,空着的", "blast|爆炸", "bleed|出血,流血", "blend|(使)混合,(使)混杂", "bloom|花,开花", "boast|自夸,夸口,吹嘘", "boost|提高,使增长", "brake|制动器,刹车", "brand|商标,牌子", "brass|黄铜", "breed|品种,繁殖", "brick|砖", "bride|新娘", "brief|短暂的,简短的", "cabin|小木屋", "cable|缆绳,纲索", "camel|骆驼", "canal|运河,沟渠", "cargo|货物", "cease|停止,终止", "chaos|混乱,紊乱", "charm|魅力", "chart|图表", "cheat|欺骗,骗取", "chase|追逐,追捕", "chess|国际象棋,棋", "chill|使变冷,寒冷", "china|瓷器", "choke|窒息,堵塞", "cigar|雪茄烟", "civil|公民的,国内的", "claim|声称,断言", "flash|发生冲突,冲突", "cliff|悬崖,峭壁", "coach|教练,指导", "crack|(使)破裂,(使)裂开", "craft|工艺,手艺", "crane|起重机,鹤", "crash|碰撞,倒下,随落", "crawl|爬行,匍匐行进", "creep|爬行,匍匐", "crime|罪,罪行", "crown|王冠", "crude|粗鲁的,粗俗的", "crush|压碎,碾碎", "curse|诅咒,咒骂", "curve|曲线，弧线", "cycle|自行车，摩托车", "dairy|牛奶场,乳品店", "decay|腐烂,腐朽", "dense|密集的,稠密的", "devil|魔鬼,恶魔", "ditch|沟,渠道", "draft|草稿,草案", "drain|排走,放掉", "drama|戏,剧本", "drift|漂流,漂", "drunk|醉酒的", "elbow|肘,肘部", "elect|选举,推选", "email|电子邮件", "entry|参赛的人", "erect|挺直的,直立的", "error|错误,差错", "essay|散文,随笔", "exert|用力,尽力", "fairy|小精灵,小仙子", "fancy|想要,喜欢", "fatal|致命的,灾难性的", "fiber|纤维", "flame|火焰,火舌", "flash|闪光,闪烁", "fleet|舰队,船队,车队", "flesh|肉,果肉,肉体", "flock|羊群,一群,一批", "flour|面粉", "fluid|流体,液体", "focus|(使)聚集,(使)集中", "folks|父母", "forge|伪造,假冒", "forth|向前,往外", "frame|镜框,画框", "frank|坦白的,直率的", "frost|霜冻,严寒天气", "frown|皱眉头", "ghost|鬼魂,幽灵", "giant|巨人", "glove|手套", "grace|优美,优雅", "grain|谷物", "grand|宏伟的,壮丽的", "grant|拨款,授予物", "grape|葡萄", "graph|图表，图解", "grasp|抓紧,抓牢,理解", "grave|坟墓", "grind|磨,磨碎", "gross|总的,总量的", "handy|方便的,近便的", "harsh|严厉的,严酷的", "haste|急速,急忙", "heave|举起,提起", "hedge|篱笆,障碍物", "hence|因此,所以", "honey|蜂蜜", "humor|幽默,诙谐", "ideal|理想的,完美的", "image|形象,声誉", "issue|问题,争论点,发行", "jeans|牛仔裤", "jewel|宝石,珠宝", "joint|连接的,联合的", "imply|暗示,含有...意思", "index|索引,标志,指标", "infer|推断,推论", "inner|内部的,里面的", "input|输入,投入", "lable|标签,标记", "laser|激光器", "layer|层，层次", "lease|租约，租契，出租", "legal|法律的，法定的", "lemon|柠檬，柠檬色", "liter|升(容积单位)", "liver|肝,肝脏", "lobby|大厅,休息室", "local|地方性的,当地的", "lodge|暂住,借宿", "logic|逻辑学,逻辑性", "loose|松的,宽松的", "loyal|忠诚的,忠心的", "magic|魔法,魔术", "mayor|市长", "means|方法,手段", "medal|奖牌,奖章", "media|新闻媒介,传媒", "mercy|慈悲,仁慈", "minor|较小的,较少的", "minus|减,减号", "moist|潮湿的,湿润的", "mount|登上,爬上", "movie|电影,影片", "naked|赤身的,赤裸的", "naval|海军的", "Negro|黑人", "nerve|神经,勇气", "niece|侄女,外甥女", "noble|贵族的,高尚的", "Negro|黑人", "nerve|神经,勇气", "niece|侄女,外甥女", "noble|贵族的,高尚的", "onion|洋葱", "opera|歌剧", "orbit|轨道", "organ|器官,机构", "ounce|盎司", "outer|外面的,外层的", "owing|应付的,未付的", "panel|板,控制板,仪表盘", "panic|恐慌,慌乱", "pants|长裤,便裤", "paste|糊,浆糊", "patch|补丁,修补", "peach|桃,桃树", "phase|阶段,时期", "pinch|掐,捏", "pitch|球场", "prime|首要的,最好的,壮年", "proof|证据，证明", "pulse|脉搏，脉冲", "punch|猛击，猛打", "purse|钱包，女用小提包", "queue|行列，长队", "quote|引用，援引", "radar|雷达", "rainy|下雨的，多雨的", "rally|集会，大会，集合", "range|一系列，范围", "react|所应，反对", "realm|领域，范围", "relax|放松，松驰", "renew|重新开始", "ridge|山脊，田埂", "rifle|步枪", "rigid|严格的，死板的", "rival|竞争对手", "roast|烤，烘", "robot|机器人", "rouse|惊起，唤起", "royal|王室的，皇家的", "rumor|传闻，谣言", "rural|农村", "saint|圣徒，圣人", "salad|色拉", "sauce|调味汁，佐料", "scale|大小，规模", "scare|惊恐，恐慌", "scope|范围，余地", "scout|侦察，侦察员", "screw|螺丝", "shave|剃，刮", "sheer|完全的，十足的", "shell|壳，外壳", "shift|移动，改变", "shrug|耸肩", "slice|薄片，切片", "slide|滑动，下滑", "slope|斜坡，倾斜", "smash|粉碎，打烂", "stain|沾污，染污", "stake|木桩，股份", "stale|不新鲜的，过时的", "steak|牛排，肉排", "steep|陡峭的，急剧的", "steer|驾驶，引导", "stiff|硬的，僵直的", "sting|刺，蜇，叮", "stock|备料，库存", "stoop|弯腰，俯身", "strap|皮带，捆扎", "strip|脱光衣服，剥去", "stuff|原料，材料", "style|风格，文体，样式", "swift|迅速的，敏捷的", "tempt|吸引，诱惑", "tense|紧张的，绷紧的", "theme|主题，题目", "toast|烤面包，吐司", "topic|题目，主题", "torch|手电筒，火把", "tough|困难的，难对付的", "trace|查出，找到，探索", "trash|垃圾，废物", "trial|审叛，审讯", "tutor|导师", "twist|使缠绕，歪曲", "unity|团结，联合", "upset|使苦恼，搅乱", "urban|城市的", "vague|含糊的，模糊的", "valid|有效的，符合逻辑的", "video|录像，录像机", "virus|病毒", "vital|极其重要的", "vivid|生动的，鲜艳的", "wagon|四轮马车，大篷车", "widow|寡妇", "width|宽度，广度", "wreck|破坏，毁坏", "wrist|腕，腕关节", "yield|屈服，顺从", "aboard|在飞机上，在船上", "absent|缺席的，不在场的", "absorb|吸收", "accent|口音，腔调", "access|通道，入口", "accord|一致，符合", "accuse|指控，控告，指责", "action|行动，行动过程", "adjust|校正，调整", "adverb|副词", "affect|影响", "agency|代理行,经销处", "agenda|议事日程", "amount|量,数量,数额", "anchor|锚,抛锚", "annual|每年的,年度的", "anyhow|无论如何,至少", "anyway|不管怎么说,无论如何", "appeal|呼于,恳求", "arouse|引起,唤起", "arrest|逮捕,拘留", "aspect|方面,面貌", "assess|对...估价", "assign|指派,选派", "assist|帮助,协助", "assume|假定,假设", "assure|使确信,使放心", "attach|系,贴,连接", "attain|获得,达到", "author|作者,作家", "avenue|林荫道,大街", "banner|横幅,旗帜", "barber|理发师", "barely|仅仅,只不过", "barrel|桶", "beggar|乞丐", "behalf|利益", "belief|相信,信任", "bloody|绝对,血染的,该诅咒的", "blouse|女衬衫", "border|边缘,界线", "boring|令人厌烦的,无聊的", "bounce|(使)弹起,(使)反弹", "breast|胸脯,乳房", "breeze|微风,轻风", "bubble|泡,气泡", "budget|预算,安排", "bundle|捆,包,束", "burden|重负,重担", "bureau|局,办事处", "campus|校园", "cancel|取消,废除", "cancer|癌,癌症", "carbon|碳", "career|生涯,职业", "casual|漠不关心,冷淡的", "cement|水泥", "Christ|基督,救世主", "clause|条款,分句", "client|委托人,当事人,顾客", "clumsy|笨拙的,粗陋的", "coarse|粗的,粗糙的", "colony|殖民地", "column|柱,圆柱", "combat|战斗,格斗", "comedy|喜剧,喜剧性事件", "commit|犯(错误),干(坏事)", "compel|强迫,迫使", "convey|表达,传达", "costly|昂贵的,代价高的", "crisis|危机,危急关头", "critic|批评家,评论家", "cruise|巡航,航游", "debate|争论,辩论", "decade|十年,十年期", "decent|像样的,体面的", "defect|缺点,毛病", "define|解释,限定,规定", "delete|删除", "dental|牙齿的,牙科的", "depart|离开,出发", "deputy|副职,副手", "derive|取得,得到", "detail|细节,详情", "detect|察觉,发现", "device|装置,设备", "devise|发明,策划,想出", "differ|不同,相异", "digest|消化,吸收", "donkey|驴", "dragon|龙", "drawer|抽屉", "emerge|浮现,出现", "empire|帝国", "enable|使能够,使可能", "ending|结局,结尾", "endure|忍受,容忍", "engage|吸引,占用,使从事", "engine|发动机,引擎", "ensure|保证,担保,确保", "estate|住宅区,地产,财产", "evolve|(使)进化,(使)发展", "exceed|超出,越出", "excess|过量,过度", "expand|扩大,扩张", "expert|专家,能手", "export|出口,出口物", "expose|暴露,显露", "extend|延伸,延长", "extent|程度,范围", "fabric|织物,织品", "factor|因素,要素", "famine|饥荒", "fasten|扎牢,系牢", "faulty|有错误的,有缺点的", "female|雌的,女性的", "fierce|凶猛的,残酷的", "filter|过滤器,过滤咀", "fluent|流利的,流畅的", "forbid|不许,禁止", "formal|正式的,正规的", "format|设计,安排,格式", "former|在前的,以前的", "fulfil|履行,实现", "gallon|加仑", "garlic|大蒜", "genius|天才,天赋", "govern|统治,管理", "greedy|贪食的,嘴馋的", "grocer|食品杂货商", "growth|增长,增加", "guilty|内疚的", "hammer|锤,榔头", "handle|处理,应付", "harbor|海港,港口", "harden|变硬,硬化", "hatred|憎恶,憎恨", "hazard|危害,公害", "heroic|英雄的,英勇的", "highly|高度地,非常", "hollow|空的,中空的", "horror|恐怖", "humble|谦逊的,谦虚的", "ignore|不顾,不理,忽视", "impact|影响,作用", "inward|内心的,内部的", "jungle|丛林,密林", "junior|年少的,年幼的", "kettle|水壶", "import|进口,输入", "impose|把...强加于", "infant|婴儿,幼儿", "infect|传染,感染", "inform|通知,报告", "injure|伤害,损害", "insect|昆虫,虫子", "insert|插入,嵌入", "insult|侮辱,辱骂", "insure|给...保险,保证", "intend|想要,打算", "invade|侵入,侵略", "invent|发明,创造", "invest|投资,投入", "latter|后者的，末了的", "launch|发动，发起", "layout|布局，安排", "liable|可能的,大概的", "likely|可能的,有希望的", "liquid|液体", "liquor|酒，烈性酒", "locate|探明,找出", "loosen|解开,放松", "luxury|奢侈,华贵", "magnet|磁铁,磁体", "manner|方式,方法", "manual|用手的,手工做的", "margin|页边空白,边缘", "marine|海军的,海运的,海洋的", "mature|熟的,成熟的", "medium|中等的,适中的", "metric|公制的,米制的", "mirror|镜子,反射", "mobile|运动的,可动的", "modest|谦虚的,谦逊的", "modify|修改,更改", "mostly|主要地,几乎全部地", "motion|运动,动作，手势", "motive|动机,动因", "muscle|肌肉,体力", "museum|博物馆", "mutual|相互的,彼此的", "namely|也就是,即是", "nephew|侄子,外甥", "notify|通知,告知", "nephew|侄子,外甥", "notify|通知,告知", "occupy|占领,占用", "offend|冒犯,得罪,违反", "oppose|反对,反抗", "option|选择,选择权", "origin|起源,来源", "outlet|出口,出路", "output|产量", "outset|开端,开始", "oxygen|氧,氧气", "parade|游行,检阅", "parcel|小包,包裹", "pepper|胡椒,胡椒粉", "petrol|汽油", "phrase|短语,词组", "pierce|刺穿,刺破", "pigeon|鸽子", "pillar|柱,支柱", "pillow|枕头", "planet|行星", "pledge|保证,誓言", "plunge|纵身投入,一头进入", "plural|复数的", "poetry|诗篇,诗歌", "policy|政策,方针", "polish|磨光,擦亮,润色", "porter|搬运工人,看门人", "poster|海报,广告", "powder|粉,粉末", "priest|神父,牧师", "prince|王子", "profit|利润，收益", "prompt|促使，推动", "purple|紫色的，紫色", "pursue|继续，从事", "puzzle|迷惑，为难", "rabbit|兔子", "racial|人种的，种族的", "rarely|难得地，不常地", "recall|回忆，撤回", "reckon|认为，估计", "refine|精炼，提纯", "reform|改革，改良", "region|地区，地带", "reject|拒绝，拒纳", "relate|有关联，适应", "relief|轻松，宽慰，", "remark|评论，评说", "remedy|补救方法", "remote|遥远的", "render|使得，致使", "rescue|营救，求援", "resign|辞职", "resist|抵抗，所抗", "resort|求助，诉诸", "resume|重新开始，继续", "retail|零售", "retain|保留，保持", "retire|退休，退役", "reveal|揭露，泄露", "revise|修订，修改", "revolt|反叛，起议", "reward|报答，奖赏", "rhythm|节奏", "rocket|火箭", "roller|滚轴", "rotate|旋转，转动", "saddle|马鞍，车座", "sailor|水手，海员", "salary|薪金，薪水", "sample|样品，抽样", "saucer|荼托，碟子", "saving|节省，节约", "scarce|缺乏的，不足的", "scheme|计划，方案", "screen|屏幕，银幕", "script|剧本，广播稿", "sector|扇形，部门", "secure|安全的，可靠的", "select|选择，挑选", "senate|参议院，上院", "senior|资格老的", "series|一系列，一套", "severe|严重的，严厉的", "shield|护罩，防护", "shiver|战栗，发抖", "shrink|收缩，退缩", "sketch|略图，草图", "sleeve|袖子", "slight|轻微的，纤细的", "starve|挨饿，饿死", "static|静态的，静止的", "statue|塑像，雕塑", "status|地位，身份", "steady|稳定的，稳重的", "sticky|粘的，粘性的", "strain|拉紧，绷紧", "stream|小河，溪流", "stress|压力，紧张，强调", "studio|画室，摄影棚", "submit|屈服，听从", "suburb|市郊，郊区", "summit|顶峰，最高点", "superb|极好的，高质量的", "survey|调查，勘查", "switch|转变，改变", "symbol|符号，标志", "talent|天资，天才", "target|对象，目标", "temper|脾气，情绪", "temple|庙宇，寺院", "terror|恐怖，恐怖活动", "thirst|干渴，渴望", "thrust|挤，推，刺", "timber|木材，原木", "treaty|条约，协定", "uneasy|心神不安的，担心的", "unique|唯一的，独特的", "unload|卸下，卸货", "urgent|紧急的，急迫的", "utmost|极度的，最大的", "vacant|未被占用的，空着的", "vacuum|真空", "vanish|消失，绝迹", "verify|核实，查对", "vessel|船，舰艇", "victim|牺牲品，受害者", "violin|小提琴", "virtue|美德，德行", "vision|幻想，视觉", "wander|漫游，漫步", "weapon|武器，兵器", "wholly|完全地，全部地", "wicked|邪恶的，恶劣的", "wisdom|明智，智慧", "worthy|值得的，有价值的", "writer|作者，作家", "abandon|离弃，丢弃", "ability|能力，本领", "absence|缺席的，不在", "academy|研究院，学会", "account|记述，描述，报告", "acquire|取得，获得", "airline|航空公司", "alcohol|酒精", "amateur|业余爱好者,外行", "analyze|分析,细查", "ancient|古代的,古老的", "antique|古时的，古老的", "anxiety|焦虑,挂虑", "apology|道歉,认错", "appoint|任命,委派", "arrange|安排,准备", "athlete|运动员,体育家", "awkward|尴尬的,棘手的", "baggage|行李", "balance|平衡,均衡", "balcony|阳台", "balloon|气球", "barrier|栅栏,关卡", "battery|电池,蓄电池", "bearing|举止,风度", "beloved|所钟爱的,所爱戴的", "beneath|在...的下面", "benefit|益处,好处", "biology|生物学", "breadth|宽度,幅度", "cabinet|内阁", "capable|有能力的,有技能的", "capture|俘虏,捕获", "carrier|运输公司,运输工具", "cartoon|漫画,幽默画", "cashier|出纳", "catalog|目录", "channel|频道,渠道", "chapter|章,句,篇", "charity|救济金,施舍物", "charter|宪法章", "chemist|化学家", "circuit|电路,线路", "clarify|澄清,阐明", "classic|典范的,典型的,古典的", "climate|气候,气候区", "combine|结合,联合,化合", "command|命令,指令", "comment|评论,意见", "compass|罗盘,指南针", "compete|竞争,比赛", "complex|复合的,复杂的", "compose|组成,构成", "conceal|隐藏,掩盖", "concede|(不情愿地)承认", "concept|概念,观念", "concern|关切的事,有关的事", "condemn|遣责,判...有罪", "conduct|管理,指挥", "confess|坦白,供认", "confine|限制,使局限", "confirm|证实,肯定", "confuse|使困惑,混淆", "conquer|攻克,征服", "consent|准许,同意", "consist|组成,构成,", "consult|请教,商量", "consume|消耗,花费", "contact|接触,联系", "contest|竞争,比赛", "context|背景,环境,语境", "convert|(使)转变,(使)转化", "convict|证明..有罪宣判..有罪", "council|委员会,理事会", "counsel|律师,法律顾问", "counter|柜台", "crucial|至关重要的,决定性的", "crystal|水晶,石英晶体", "culture|文化,文明", "current|现时的,当前的", "cushion|垫子，坐垫", "darling|亲爱的", "deceive|欺骗,蒙蔽", "decline|下降,减少,衰退", "deposit|定金,押金,存款", "depress|使沮丧,使消沉", "descend|下来,下降", "deserve|应受,应得,值得", "despair|绝望", "despite|不管,尽管", "dessert|甜食,甜点", "diagram|图解,图表", "dialect|方言,土语", "dictate|口授,口述", "digital|数字的,数字显示的", "discard|丢弃,抛弃", "disgust|厌恶,反感", "dismiss|不接受,解雇,解散", "display|陈列,展览", "dispose|排列,布置", "dispute|争论,争吵", "diverse|不同的,多种多样的", "divorce|离婚", "durable|耐用的,持久的", "dynamic|有活力的,强有力的", "earnest|认真的,诚挚的", "economy|经济,经济制度", "edition|版,版本", "educate|教育,培养", "elastic|橡皮图,松紧带", "elderly|较老的,年长的", "elegant|优美的,文雅的", "element|元素,要素", "embassy|大使馆", "embrace|拥抱,怀抱", "emotion|情感,感情,激情", "enclose|围住,包住", "endless|无止境的", "enforce|实施,生效,强迫", "enhance|提高,增加", "enlarge|扩大,扩展", "entitle|给权利,给资格", "evident|明显的,明白的", "exclaim|呼喊,惊叫", "exclude|不包括,排斥在外", "execute|处死,处决", "exhaust|使盘皮力尽,耗尽", "exhibit|显示,显出,展出", "expense|花费,价钱", "explode|爆炸", "exploit|剥削,开发,开采", "explore|勘探,探测", "extreme|极度的,极端的", "faculty|能力,技能", "failure|失败", "fantasy|想象,幻想", "fashion|方式,样子,款式", "fatigue|疲劳,劳累", "fearful|可怕的,可怖的", "feature|特征,特色", "federal|联邦的,联邦政府的", "fertile|肥沃的,富饶的", "fiction|小说", "finally|最后,终于", "finance|财政,金融", "finding|调查结果", "formula|原则,方案", "freight|货物,货运,运送", "funeral|葬礼", "furnace|熔炉,火炉", "furnish|布置,装备", "gallery|画廊,美术馆", "garbage|垃圾,废物", "genuine|真的,真诚的", "gesture|姿势,手势", "glimpse|一瞥,一看", "gradual|逐渐的,逐步的", "gravity|重力,地心引力", "handful|一把,少量", "harmony|和谐,融洽", "harness|马具,挽具", "heading|标题", "hearing|听力,听觉", "highway|公路,交通要道", "horizon|地平线", "hostile|敌对的,敌意的", "housing|房屋,住宅", "illegal|非法的", "imitate|模仿,仿效", "immense|广大的,巨大的", "involve|包含,含有", "jealous|妒忌的,猜忌的", "journal|杂志,期刊", "justice|正义,公正", "justify|证明有理,辩护", "impress|使铭记,使留下印象", "incline|(使)倾斜", "inherit|继承", "initial|开始的,最初的", "inquire|打听,询问", "insight|洞察力,洞悉", "inspect|检查,视察", "install|安装,设置", "instant|立即的,即刻的", "intense|强烈的,剧烈的", "largely|大部分，主要地", "laundry|洗衣店，洗衣房", "leading|最重要的，主要的", "learned|有学问的，博学的", "leather|皮革，皮革制品", "leisure|空闲时间，闲暇", "liberal|心胸开阔的,开明的", "liberty|自由,自由权", "license|许可证,执照", "limited|有限的", "luggage|行李", "mankind|人类", "married|已婚的,婚姻的", "massive|大的,大而重的", "maximum|最高的,最大的", "minimum|最低的,最小的", "miracle|奇迹", "mislead|误解,使误入歧途", "missile|导弹,飞弹", "missing|缺掉的,失踪的", "mission|使命,任务,使团", "mixture|混合,混合物", "monthly|每月的,每月一次的", "neglect|忽视,忽略", "network|网状物,网络", "neutral|中立的,中性的", "network|网状物,网络", "neutral|中立的,中性的", "opening|洞,孔,开口", "optical|光学的,视觉的", "orderly|整齐的,有秩序的", "organic|有机的,有机物的", "outcome|结果", "outline|提纲,要点", "outlook|观点,见解", "outward|外表的,向外的", "overall|总体的,全面的", "package|包裹,包装", "partial|部分的,不完全的", "partner|配偶,搭档", "passion|激情,热情", "passive|被动的,消极的", "payment|支付的款项,付款", "penalty|处罚,惩罚", "pension|养老金,抚恤金", "persist|坚持不懈,执意", "plastic|塑料,塑料制品", "pollute|弄脏,污染", "portion|一部分,一份", "possess|占有,拥有", "postage|邮费,邮资", "poverty|贫穷,贫困", "precise|精确的,准确的", "predict|预言,预测", "preface|序言,引言", "prevail|流行,盛行", "private|私人的，个人的", "proceed|进行，继续下去", "process|过程，进程", "product|产品，产物", "profile|侧面，轮廊", "project|方案，计划", "promote|促进，增进", "pronoun|代词", "propose|提议，建议", "protein|蛋白质", "protest|抗议，反对", "provoke|挑衅，激怒", "publish|出版，刊印", "qualify|胜任，合格", "radical|根本的，激进的", "rainbow|虹，彩虹", "readily|乐意地，欣然地", "rebel(n|)反叛者", "rebel(v|)反叛", "receipt|发票，收据", "recruit|新兵，新成员", "reflect|反映，显示", "refrain|抑制，克制", "refresh|振作精神", "refugee|难民，灾民", "refusal|拒绝", "release|释放，排放,解脱", "relieve|缓解，减轻，解除", "removal|除去，消除", "replace|代替，取代", "reserve|保留，留存", "resolve|解决，解答", "respond|回答，答复", "restore|恢复，归还", "retreat|退却，撤退", "revenue|收益，税收", "reverse|撤销，推翻", "routine|例行公事，惯例", "sausage|香肠", "scandal|丑闻，丑事", "scatter|撒，使散开", "scenery|风景，景色", "scholar|学者", "scratch|抓，刮，擦", "segment|部分，断片", "selfish|自私的，利已的", "session|会议，一届会期", "setting|环境，背景", "shallow|浅的，浅薄的", "shelter|掩蔽处，掩护", "shortly|立刻，不久", "sincere|诚挚的，真诚的", "skilled|熟练，有技能的", "slender|苗条的，修长的", "steamer|轮船，汽船", "storage|储藏，保管", "stretch|伸展，延伸", "suicide|自杀", "supreme|最高的，至上的", "surgery|外科，外科手术", "surplus|过剩，盈余", "tedious|乏味的，单调的", "textile|纺织品", "therapy|治疗，理疗", "thereby|因此，从而", "thunder|雷，雷声", "torture|拷问，折磨", "tragedy|灾难，悲剧", "triumph|胜利，成功", "trumpet|喇叭，小号", "undergo|经历，遭受", "upright|直立的，挺立的", "utility|功用，效用", "utilize|利用", "vehicle|交通工具，车辆", "venture|风险投资，冒险", "version|版本，译本", "vibrate|振动，摇摆", "violate|违反，违背", "virtual|实质上的，事实上的", "volcano|火山", "voltage|电压", "wealthy|富裕的", "welfare|福利", "whereas|然而，但是，尽管", "whistle|吹口哨，汽笛声", "witness|目击者，见证人", "worship|崇拜，崇敬", "writing|著作，作品", "absolute|十足的，地道的", "abstract|抽象的", "abundant|大量的，充足的", "academic|学校的，学院的", "accuracy|准确（性）精确（性)", "activity|活动，行动", "addition|加，加法", "adequate|充足的，足够的", "advanced|超前的，先进的", "advocate|拥护,提倡,主张", "aircraft|飞机,航空器", "alliance|结盟,联盟", "alphabet|字母表", "altitude|高度,海拔", "aluminum|铝", "ambition|抱负,雄心,野心", "ancestor|祖宗,祖先", "apparent|显然的,明白的", "appetite|胃口,食欲", "applause|鼓掌,掌声", "approach|靠近,接近", "approval|赞成,同意", "argument|争论,争吵,辩论", "artistic|艺术的,美术的", "assemble|混合,聚集", "assembly|立法机构,议会", "astonish|使惊讶", "attitude|态度,看法", "attorney|律师", "audience|听众,观众,读者", "backward|向后的,反向的", "bacteria|细菌", "bankrupt|破产的,彻底失败的", "baseball|棒球", "behavior|行为,举,表现", "boundary|分界线,边界", "calendar|日历,月历", "campaign|运动，战役", "capacity|容量,容积", "carriage|马车,客车厢", "cassette|盒式录音带", "category|种类,类别", "cautious|谨慎的", "ceremony|典礼,仪式", "champion|冠军", "cheerful|欢乐的,高兴的", "chemical|化学的,化学制品", "circular|圆形的,环形的", "civilian|平民,百姓", "collapse|倒坍,塌下", "commerce|商业,贸易", "complain|抱怨,诉苦", "compound|化合物,复合物", "compress|压紧,压缩", "comprise|包含,包括", "conclude|推断出,推论出", "concrete|实在的,具体的", "condense|(使)冷凝,(使)凝结", "conflict|冲突,抵触", "confront|遇到,遭遇", "congress|代表大会,国会", "conquest|攻取,克服", "constant|始终的,不变的", "consumer|消费者,用户", "contract|合同,契约", "contrary|相反的,对抗的", "contrast|对比,对照", "convince|使确信,使信服", "corridor|走廊,通道", "creative|创造性的,有创造力的", "creature|生物,动物,人", "criminal|罪犯,犯人", "critical|决定性的,关键性的", "cupboard|食橱,碗柜", "currency|通货,货币", "deadline|最后期限", "decorate|装饰,装潢", "decrease|减小,减少", "definite|明确的,确切的", "delegate|代表,代表团", "delicate|易碎的,脆弱的", "delivery|投递,送交", "diameter|直径", "directly|直接地,径直地", "disaster|灾难,大祸", "discount|折扣,打折扣", "disorder|混乱,凌乱", "disposal|丢掉,清除", "dissolve|溶解,融化", "distinct|清晰的,不同的", "distress|痛苦,悲伤，忧虑", "dissturb|打扰,妨碍", "division|分,分开,分隔", "document|公文,文件,记录", "domestic|本国的,国内的", "dominant|占优势,统治的", "dominate|支配,控制", "donation|捐赠物,损款", "doubtful|难预测的,未定的", "dramatic|引人注目的,戏剧性的", "economic|经济的,经济学的", "electron|电子", "elevator|电梯,升降机", "emphasis|强调", "employee|雇工,雇员", "employer|雇主,雇佣者", "enormous|巨大的,极大的", "equality|相等,相同", "equation|议程,等式", "estimate|估计,估量", "evaluate|评估,评价", "evidence|根据,证据", "exchange|交换,调换", "exterior|外部,外表", "eyesight|视力", "facility|设备,设施", "faithful|忠诚的,忠实的", "farewell|告别,欢送会", "feedback|反馈,反馈信息", "festival|节日,喜庆日", "flexible|易弯曲的,柔韧的", "flourish|茂盛,兴旺", "footstep|脚步,脚步声", "forecast|预测,预报", "forehead|额,前额", "fraction|小部分,片断", "fragment|碎片,碎块", "frontier|边境,边界", "fruitful|多产的,丰富的", "function|功能,作用", "gardener|园丁", "gasoline|汽油", "generate|生成,产生,引起", "generous|慷慨的,大方的", "geometry|几何,几何学", "glorious|光荣的,壮丽的", "governor|州长,地方长官", "grateful|感激的,感谢的", "guidance|指导,指引", "hardship|艰难,困苦", "hardware|五金器具,硬件", "headline|大字标题,头版头条新闻", "hesitate|犹豫,踌躇", "historic|历史上的,有历史意义的", "horrible|令人恐惧的,可怕的", "hydrogen|氢,氢元素", "identify|认出,鉴定", "identity|身份", "ignorant|不知道", "keyboard|键盘", "incident|发生的事,事变", "indicate|指示,指出,表明", "inferior|劣等的,次的", "infinite|无限的,无穷的", "innocent|清白的,无罪的", "inspirse|彭舞,激起", "instance|例子,事例", "instinct|本能,直觉", "instruct|指示,命令", "interior|内部,内地", "internal|内部的,国内的", "Internet|因特网", "interval|间隔,间距", "intimate|亲密的,密切的", "invasion|侵犯,侵略", "landlord|地主，房东，店主", "laughter|笑，笑声", "lavatory|厕所，洗手间", "learning|知识，学问", "liberate|解放,使获得自由", "likewise|同样地,照样地", "literary|文学的,文人的", "location|位置,场所", "mainland|大陆", "maintain|维持,保持", "meantime|其间,与此同时", "mechanic|技工,机修工", "memorial|纪念的,悼念的", "merchant|商人", "military|军事的,军用的", "ministry|部门,(政府的)部", "minority|少数派,少数", "moderate|中等的,一般的", "moisture|潮湿,湿气", "molecule|分子", "monument|纪念碑,纪念馆", "moreover|而且,此外", "mosquito|蚊子", "motivate|激励,激发", "multiple|复合的,多重的", "multiply|(使)增加,(使)繁殖", "mushroom|蘑菇", "musician|音乐家,乐师", "negative|否定的,消极的", "nonsense|胡说,废话", "normally|通常,正常地", "nonsense|胡说,废话", "normally|通常,正常地", "operator|话务员,经营者", "opponent|敌手,对手", "optional|可任选的,非强制的", "organize|组织,使有条理", "original|起初的,原来的", "overlook|忽视,忽略", "overtake|赶上,追上,超过", "parallel|可比拟的事物,相似处", "particle|微粒,粒子", "passport|护照", "patience|忍耐,耐心", "perceive|感知,感觉", "physical|身体的,肉体,物质的", "platform|平台,讲台,站台", "portable|便于携带的,手提式的", "positive|确实的明确的", "postpone|推迟,延期", "powerful|强大的,有力的", "pregnant|怀孕的", "presence|出席,到场", "preserve|保护,维持", "pressure|压力,压迫", "previous|在先的,以前的", "princess|公主", "priority|优先权,重点", "probable|很可能的，大概的", "prohibit|禁止，不许", "property|财产，所有物", "prospect|前景，前途", "provided|假如，若是", "province|省，领域", "punctual|准时的", "purchase|买，购买", "railroad|铁路", "rational|理性的，理智的", "receiver|听筒，接收器", "recently|最近，新近", "recorder|录音机，录像机", "recovery|恢复，收复", "register|登记", "regulate|管理，控制，调整", "relevant|有关的，切题的", "reliable|可靠的，可依赖的", "religion|宗教", "resemble|像，类似于", "resident|居民，定居者", "resource|资源，财力", "restless|焦躁不安的", "restrain|阻止，控制", "restrict|限制，约束", "romantic|浪漫的，多情的", "sanction|批准，认可", "schedule|时刻表，日程表", "scissors|剪刀", "semester|学期", "sensible|明智的", "sequence|连续，一连串", "shortage|不足，缺少", "simplify|简化，使简单", "singular|单数，非凡的", "striking|显著的，突出的", "submerge|潜入水中，淹没", "sympathy|同情，同情心", "teenager|青少年", "tendency|趋势，趋向", "terminal|晚期的，不治的", "thorough|彻底的，完全的", "transfer|转移，调动", "transmit|播送，发射", "triangle|三角，三角形", "tropical|热带的，炎热的", "ultimate|极端的，最高的", "variable|易变的，多变的", "vertical|垂直的，纵向的", "vigorous|有力的，精力充沛的", "violence|暴力，强暴", "withdraw|收回，撤回", "accompany|陪伴，陪同", "adjective|形容词", "admission|准许进入，准许加入", "advantage|优点，有利条件", "advertise|为...做广告，宣传", "advisable|可取的,适当的", "affection|喜爱,爱慕之情", "allowance|津贴,补贴", "alongside|在旁,沿着边,并排地", "ambulance|救护车", "apartment|一套公寓房间,房间", "appliance|器具,器械,装置", "applicant|申请人", "arbitrary|随意的,任意的", "architect|建筑师,设计师", "associate|把...联系起来,结合", "attribute|把...归因于", "authority|权力,管辖权", "automatic|自动的", "auxiliary|辅助的,补助的", "available|可利用的,可使用的", "brilliant|光辉的,灿烂的", "butterfly|蝴蝶", "calculate|计算,核算", "candidate|侯选人,候补者", "carpenter|木匠,木工", "challenge|艰巨的任务,挑战", "character|性格,品质", "Christian|基督教徒", "circulate|(使)循环,(使)流通", "classical|古典的,经典的", "colleague|同事,同僚", "collision|碰撞,冲突", "committee|委员会", "community|社区,社会", "competent|有能力的,能胜任的", "component|零件,部件", "conductor|(乐队)指挥", "confident|确信的,肯定的", "confusion|困惑,糊涂", "conscious|意识到的,自觉的", "construct|建造,构筑", "container|容器,集装箱", "continual|不间断的,不停的", "cooperate|合作,协作", "criticize|批评,批判", "cultivate|耕作,栽培", "curiosity|好奇", "democracy|民主,民主制", "desirable|值得拥有的", "desperate|不顾一切的,孤注一掷的", "detective|侦探,私人侦探", "dimension|方面,特点", "disappear|消失,不见", "discharge|释放,解雇", "effective|有效的,生效的", "elaborate|精心计划的,详尽的", "eliminate|排除,消除,根除", "elsewhere|在别处,到别处", "embarrass|使尴尬", "emergency|紧急情况,不测事件", "encounter|遇到,遭到", "entertain|招待,款待", "essential|非常重要的,本质的", "establish|建立,创办", "evolution|演变,进化", "exception|例外", "excessive|过多的,过分的", "exclusive|奢华的,高级的", "excursion|远足,短途旅行", "executive|主管,行政官", "existence|存在,生存", "extensive|广大的,广阔的", "fantastic|极好的,极出色的", "favorable|称赞的,赞同的", "following|接着的,下述的", "formation|形式,组成,结构", "fortnight|两星期,十四天", "frequency|次数,频率", "frustrate|使沮丧,使灰心", "generally|一般地,通常", "generator|发电机,发生器", "guideline|指导方针,准则", "gymnasium|体育馆,健身房", "highlight|强调,突出", "honorable|光荣的,荣誉的", "household|家庭", "housewife|家庭主妇", "identical|相同的,相等的", "ignorance|无知,愚昧", "immigrant|移民,侨民", "impatient|不耐烦的,急躁的", "implement|使生效,履行", "judgement|看法,意见,判断", "inference|结论,结果", "inflation|通货膨胀", "influence|影响,影响力", "injection|注射,注入", "institute|学会,学院", "insurance|保险,保险费", "integrate|(使)成为一体,(使)合并", "intensive|加强的,集中的", "intention|意图,意向", "interfere|干涉,介入,妨碍", "interpret|口译,翻译", "interrupt|打断,打扰", "interview|接见,面试", "invisible|看不见的,无形的", "landscape|风景，景色", "lightning|闪电", "machinery|机器,机械", "marvelous|奇迹般的,惊人的", "mechanism|机械装置", "miserable|痛苦的,悲惨的", "naturally|当然,自然,天然地", "necessity|必需品,必要性", "negotiate|洽谈,协商", "nightmare|恶梦,可怕的事", "negotiate|洽谈,协商", "nightmare|恶梦,可怕的事", "ocurrence|发生的事情,事件", "offensive|冒犯的,无礼的", "orchestra|管弦乐队", "ownership|所有权,所有制", "paragraph|段落", "penetrate|透入,渗入", "permanent|永久的,固定的", "personnel|人员,员工", "physician|内科医生", "physicist|物理学家", "plentiful|丰富的,充足的", "poisonous|有毒,恶毒", "potential|潜在的,可能的", "preceding|在先的,在前的", "prejudice|偏见的,成见的", "prescribe|开药,吩咐采用", "presently|不久,一会儿", "primarily|主要的,首先", "primitive|原始的,早期的,简单的", "principal|最重要的,负责人,校长", "principle|原则,原理", "privilege|特权，优惠", "procedure|程序，手续", "prominent|突出的，杰出的", "provision|供应", "publicity|公众的注意,宣传", "quotation|引语，语录", "radiation|放射物，辐射", "realistic|现实的，可行的", "reception|招待会，招待", "recession|衰退，衰退期", "recognize|认出，识别", "recommend|推荐，建议", "reduction|缩小，减少", "reference|提到，论及", "regarding|关于", "reinforce|增强，增援", "reluctant|不情愿的", "represent|表示，象征", "reproduce|复制，再现", "reservoir|水库，蓄水池", "sacrifice|牺牲，舍身", "satellite|卫星，人造卫星", "secondary|次要的，第二的", "sensitive|敏感的", "signature|签名，署名", "statement|声明，陈述", "statistic|统计数值", "stimulate|刺激，激励", "strategic|关键的，战略上的", "structure|结构，构造", "substance|物质，实质，要旨", "summarize|摘要，概括", "surrender|投降，放弃", "territory|领士，版图", "tolerance|宽容，容忍", "tradition|传统，惯例", "transform|使改变，改革", "transport|运输，运送", "treatment|治疗，疗法", "undertake|承担，着手做", "universal|普遍的，全体的", "voluntary|自愿的，志愿的", "volunteer|志愿者", "withstand|经受，承受", "youngster|青年，年轻人", "accelerate|(使)加快,(使)增速", "acceptance|接受，接纳", "accidental|意外,偶然(发生)的", "accomplish|达到（目的）完成（任务）", "accordance|一致，和谐，符合", "accountant|会计人员，会计师", "accumulate|堆积，积累", "accustomed|习惯于..的,适应的", "additional|添加的，额外的", "afterwards|以后,过后,后来", "aggressive|侵犯的,侵略的,挑衅的", "ambassador|大使,使节", "anticipate|预期,期望,预料", "appearance|出现,显露", "applicable|可应用的,可实施的", "appreciate|重视,赏识,欣赏", "arithmetic|算术", "artificial|人工的,人造的", "assignment|任务,作业", "attraction|吸引,吸引力", "attractive|有吸引力的", "automobile|汽车", "background|背景,经历", "calculator|计算器", "centigrade|摄氏的", "centimeter|厘米", "collection|收藏品", "collective|集体的,共同的", "commercial|商业的,商务的", "commission|委员会", "commitment|承诺,保证", "comparable|可比较的,类似的", "comparison|比较,对照", "compromise|妥协,折中的办法", "concession|让步,妥协", "conference|会议", "confidence|信任,信心", "connection|联系,关系", "conscience|良心", "consistent|组成的,一贯的", "constitute|构成,组成,形成", "consultant|顾问", "contribute|捐款,作出贡献", "convention|习俗,惯例", "conversely|相反(地)", "conviction|确信,坚定的信仰", "coordinate|调节，协调", "correspond|相符合,相一致", "deliberate|故意的,蓄意的", "democratic|民主的,有民主精神的", "diplomatic|外交的,策略的", "discipline|纪律", "discourage|使泄气,使灰心", "distribute|分发,分选，分配", "earthquake|地震", "economical|节约的,省俭的", "efficiency|效率,功效", "electrical|电的,电气科学的", "electronic|电子的", "elementary|基本的,基础的", "employment|工作,职业", "enterprise|事业,计划,公司", "enthusiasm|热情,热心", "equivalent|相等的,等价的", "exaggerate|夸大,夸张", "excitement|刺激,兴奋", "fertilizer|肥料", "foundation|地基,基础,建立", "greenhouse|温室,暖房", "helicopter|直升机", "horizontal|地平的,水平的", "horsepower|马力", "illustrate|说明,阐明", "journalist|新闻记者", "impression|印象,感觉", "impressive|给人印象深刻的", "incredible|难以置信的,不可信的", "individual|个别的,单独的", "industrial|工业的,产业的", "inevitable|不可避免的", "ingredient|组成部分,成份", "inhabitant|居民,住户", "initiative|主动性,首创精神", "instrument|仪器,工具", "invitation|邀请", "laboratory|实验室", "leadership|领导，领导层", "limitation|限制,限度", "literature|文学的,文学作品", "mechanical|机械的,机械学的", "membership|会员身份,会籍", "microphone|扩音器,麦克风", "microscope|显微镜", "millimeter|毫米", "mysterious|神秘的,难以理解的", "navigation|航海术,航行学", "noticeable|显而易见的", "parliament|议会,国会", "percentage|百分比,百分率", "perception|觉察力,洞察力", "permission|允许,许可", "pertroleum|石油", "phenomenon|现象,迹象,非凡的人", "philosophy|哲学", "plantation|种植园,人工林", "politician|政治家,政客", "precaution|预防,防备", "preferable|更好的,更合意的", "preference|喜爱的,偏爱的", "presumably|大概,可能", "procession|队伍，行列", "profession|职业，自由职业", "proportion|比例", "prosperity|兴旺，繁荣", "protection|保护，防护", "reasonable|通情达理的", "recreation|娱乐，消遣", "regardless|不管怎样,不顾后果", "regulation|规章，规则", "relativity|相对论、相对性", "remarkable|值得注意的，异常的", "repetition|重复，反复", "republican|共和政体的", "reputation|名气，名声", "resolution|正式决定", "respective|各自的", "ridiculous|可笑的，荒谬的", "settlement|解决，协议", "standpoint|立场，观点", "strengthen|加强，巩固", "subsequent|随后的，后来的", "substitute|代用品，替代者", "succession|连续，一连串", "sufficient|足够的，充分的", "supplement|增补，补充物", "technology|工艺，技术", "tremendous|巨大的，极大的", "up-to-date|现代化的，最新的", "waterproof|防水的，不透水的", "widespread|分布广的", "worthwhile|值得做的", "accordingly|照着，相应地", "achievement|成就，成绩", "acknowledge|承认,承认...的权威", "acquisition|取得，获得，习得", "alternative|两者择一,供选择的", "anniversary|周年纪念", "application|申请,申请书", "appointment|约会,约定,任命", "appropriate|适当的,恰当的", "approximate|大概的,大约的", "association|协会,联盟", "certificate|证书,执照", "communicate|交流,交际,通讯", "comparative|比较的,相对的", "competition|竞争,比赛", "complicated|复杂的,难懂的", "concentrate|全神贯注,精力集中", "conjunction|连接(词)", "consequence|结果,后果", "considerate|考虑周到的,体贴的", "consumption|消耗量,消费量", "controversy|争论,辩论", "convenience|方便,合宜", "corporation|公司", "declaration|宣布,宣告", "demonstrate|论证,证明,演示", "destination|目的地,终点", "destruction|破坏,毁坏", "distinguish|区别,辩别", "engineering|工程(学),工程师行业", "environment|环境,周围状况", "exceedingly|非常,极其", "expectation|期待,预期", "fascinating|迷人的,有吸引力的", "fortunately|幸运地,幸亏", "fundamental|基本的,根本的", "furthermore|而且,此外", "handwriting|笔迹,书法", "imagination|想象,想象力", "implication|含意,暗示", "improvement|改进,增进", "indifferent|冷漠的,不关心的", "institution|社会公共机构", "intelligent|聪明的,智慧的", "interaction|相互作用,相互影响", "investigate|调查", "legislation|法律，法规", "magnificent|壮丽的,宏伟的", "maintenance|维修,保养", "manufacture|制造,加工", "measurement|衡量,测量", "nationality|国籍,民族", "necessarily|必要地,必需地", "operational|运转的,即可使用的", "opportunity|机会,时机", "outstanding|突出的,显著的", "participate|参与,参加", "performance|演出,表演", "personality|个性,人格", "perspective|视角,观点", "pessimistic|悲观的", "possibility|可能性,可能的事", "practically|几乎,简直", "preliminary|预备的,初步的", "preparation|准备,预备", "preposition|介词", "progressive|进步的，先进的", "publication|出版，发行", "requirement|要求，需要", "responsible|负责任的", "scholarship|奖学金", "shortcoming|缺点，短处", "sightseeing|观光，游览", "substantial|可观的，大量的", "superficial|肤浅的，浅薄的", "thermometer|温度计", "transparent|透明的，明显的", "acquaintance|相识的人，熟人", "architecture|建筑学,建筑业", "circumstance|环境,条件", "civilization|文明,文化", "consequently|所以,因此", "conservation|保存,保护", "conservative|保守的,守旧的", "considerable|相当大(多)的", "constitution|宪法,章程", "contemporary|当代的,同时代的", "conventional|普通的,习惯的", "experimental|实验的,试验的", "headquarters|总部,司令部", "kindergarten|幼儿园", "increasingly|日益,越来越多地", "independence|独立,自主", "intellectual|智力的,善于思维的", "intermediate|中间的,中级的", "introduction|介绍,引进", "manufacturer|制造商,制造厂", "mathematical|数学的", "neighborhood|邻居,街坊", "nevertheless|仍然,然而", "neighborhood|邻居,街坊", "nevertheless|仍然,然而", "organization|团体,组织，机构", "particularly|特别,尤其", "presentation|提供,显示,外观", "relationship|关系，联系", "satisfactory|令人满意的", "significance|含义，意义", "accommodation|住处，膳宿", "advertisement|广告,公告,启事", "comprehension|理解力", "comprehensive|综合的,广泛的", "contradiction|矛盾,不一致", "controversial|引起争议的,有争议的", "correspondent|通讯员,记者", "corresponding|相应的,相当的", "determination|决心,决定", "entertainment|娱乐,文娱节目", "extraordinary|不平常的,非凡的", "indispensable|必需的,必不可少的", "industrialize|(使)工业化", "misunderstand|误会", "psychological|心理的，心理学的", "qualification|资格，合格证书", "revolutionary|革命的，革新的", "semiconductor|半导体", "administration|管理，经营，支配", "characteristic|特有的,典型的", "classification|分类,分级", "correspondence|信件,函件", "interpretation|解释,说明,诠释", "representative|代表，代理人"];
    var m = ["apt|a.恰当的；聪明的 ", "arc|n.弧，弓形物；弧光 ", "ban|n. 禁令 vt. 禁止,取缔 ", "bid|n. 出价vt.vi. 命令,吩咐,投标 ", "bud|n.芽，萌芽；蓓蕾 ", "bug|n.虫子；臭虫 ", "cue|n. 开端,线索,发辫,长队 ", "ego|n. 自我 ", "fax|n. 传真 vt. 传真 ", "guy|n. 家伙,支索 vt.用支索撑住,取笑 ", "hug|vt.搂 n.紧紧拥抱 ", "kit|n.成套工具；用具包 ", "rig|vt. 操纵,垄断 n. 钻井架,塔台 ", "rim|n.边；边缘，(眼镜)框 ", "rip|vi.撕啐，扯破，划破 ", "rot|vt.烂，腐坏 n.腐烂 ", "sin|n.罪，罪孽 vi.犯罪 ", "spy|n.间谍，特务 vt.侦察 ", "sue|vt. 控告,请愿 ", "tar|n.柏油，焦油 ", "tow|vt.&n.拖引，牵引 ", "tug|vi.用力拖 n.猛拉，拖 ", "web|n.网，丝，网状物 ", "ally|n.盟国，同盟者，伙伴 ", "arch|n.拱门 vt.用拱连接 ", "axis|n.轴，轴线；第二颈椎 ", "bald|a.秃头的；无毛的 ", "bias|n. 偏见,偏袒，斜线 vt. 使有偏见 ", "boom|vi. n. 急速发展,繁荣,隆隆响 ", "bull|n.买空的证券投机商 ", "bump|vt.撞击 vi.撞 n.肿块 ", "buzz|vi.(蜂等)嗡嗡叫 ", "chat|n. 闲谈 vi. 闲谈,聊天 ", "chip|n.薄片，碎片 ", "cite|vt.引用，引证；举例 ", "clip|vt.剪；剪辑报刊 ", "curb|n. 抑制,勒马绳 vt. 抑制,束缚 ", "curt|a. 简略的,简短的,生硬的 ", "deem|vt.认为，相信 vi.想 ", "defy|vt.向…挑战；蔑视 ", "diet|n.饮食，食物 ", "dine|vi.吃饭 vt.宴请 ", "dock|n.船坞；码头；船厂 ", "dome|n.圆屋顶，拱顶 ", "doom|n.命运，毁灭 vt.注定 ", "dual|a. 双重的,双的 n. 双数 ", "edit|vt.编辑，编纂；校订 ", "fake|n.假货，膺品 a.假的 ", "fist|n.拳(头) ", "flap|vt.&n.拍打 vi.拍动 ", "flaw|n.缺点，瑕疵；裂隙 ", "flee|vi.逃走 vt.逃避 ", "foam|n.泡沫；泡沫塑料 ", "foil|n. 箔,金属薄片 vt. 贴箔于, 衬托 ", "fort|n.要塞，堡垒 ", "foul|a.肮脏的；丑恶的 ", "fuse|n.保险丝，导火线 ", "fuss|n.忙乱；吹捧 vi.忙乱 ", "gaol|n. 监禁,监狱 vt. 监禁 ", "gasp|vi.气喘，喘息 ", "gear|n.齿轮，传动装置 ", "gene|n. 基因,因子 ", "grab|vt.&vi.攫取，抓取 ", "grim|a.冷酷无情的，严厉的 ", "grin|vi.咧着嘴笑 ", "haul|vt.拖曳；拖运 ", "heal|vt.治愈；使和解 ", "heir|n.后嗣，继承人 ", "hose|n.长筒袜；软管 ", "hurl|vt.猛投 vi.猛冲 ", "jail|n.监狱 vi.监禁 ", "jerk|vt.猛地一拉 vi.急拉 ", "jury|n.陪审团；评奖团 ", "knit|vt.把…编结 vi.编织 ", "knob|n.门把，拉手；旋纽 ", "lamb|n.羔羊，小羊；羔羊肉 ", "lame|a.跛的；瘸的，残废的 ", "lick|vt.舔；舔吃 ", "limp|vi.蹒跚，跛行 n.跛行 ", "mall|n.大型购物中心 ", "mess|vt.弄脏，弄乱，搞糟 ", "mock|n.嘲弄 vt.嘲弄，挖苦 ", "myth|n. 神话,虚构的事,虚构的人 ", "norm|n.标准，规范；平均数 ", "oath|n.誓言，誓约，宣誓 ", "odor|n. 气味,名声,味 ", "oval|a.卵形的 n.卵形 ", "pave|vt.铺，筑(路等) ", "peel|vt.剥(皮)，削(皮) ", "peer|vi.凝视；隐约出现 ", "pest|n.害虫；害人虫 ", "plea|n.请愿，请求，恳求 ", "plea|n.请愿，请求，恳求 ", "poke|vt.戳，刺；伸(头等) ", "poll|n.投票 vi.投票 ", "pope|n.(罗马天主教的)教皇 ", "pore|n.毛孔，气孔，细孔 ", "pose|vi.假装，摆姿势 n.姿势 ", "prey|vi.猎物 vi.捕获 ", "rage|n.(一阵)狂怒，盛怒 ", "raid|n.袭击；突然搜查 ", "reap|vt.&vi.收割，收获 ", "riot|n.&vi.骚乱，暴乱 ", "scar|n.瘢痕 ", "seam|n.缝口；接缝；骨缝 ", "skip|vi.跳；跳绳；略过 ", "slap|vt.掴，拍 n.巴掌，拍 ", "slim|a.细长的；微小的 ", "slot|n. 缝,狭槽,位置,职位 ", "slum|n.贫民窟，贫民区 ", "snap|vt.猛咬，突然折断 ", "soar|vi. 猛增，高耸，高飞,翱翔 ", "solo|n.独唱，独奏；独唱曲 ", "tick|n.滴答声；记号 ", "tile|n.瓦片，瓷砖；贴砖 ", "tilt|vt.&vi.(使)倾斜 ", "toss|vi.翻来复去 ", "tuck|vt.折短，卷起；塞 ", "veil|n.面纱，面罩；遮蔽物 ", "vein|n.静脉，血管，矿脉 ", "vent|n. 排放口,通风口 vt. 发泄,表达 ", "veto|n.否决，否决权，禁止 ", "void|a.空的；无效的 ", "ward|n.病房，病室；监房 ", "watt|n.瓦(特) ", "yell|vi.叫喊 ", "yoke|n.轭，牛轭；枷锁 ", "zinc|n.锌 ", "acute|a. 敏锐的 ", "agony|n.极度痛苦 ", "alert|a.警惕的；活跃的 ", "alien|a.外国的 n.外国人 ", "amend|vt. 修正,改善,vi. 改过自新 ", "ample|a.足够的；宽敞的 ", "angel|n.天使，神差，安琪儿 ", "array|vt.装扮 n.队列；排列 ", "asset|n. 资产,有用的东西 ", "avail|vt.有益于 n.效用 ", "avert|vt. 转开,避免,防止 ", "badge|n.徽章，像章；标志 ", "batch|n. 一组,分批,成批,批 ", "blaze|n.火；闪光 vi.燃烧 ", "bleak|a. 萧瑟的,苍白的,荒凉的 ", "bless|vt.为…祝福 ", "blunt|a. 钝的,坦率的,麻痹的 ", "blush|vi.脸红，害臊 n.脸红 ", "bonus|n. 奖金,红利 ", "boost|vt. n. 推进,支援,吹捧 ", "brace|n.支柱 vt.拉紧，撑牢 ", "bribe|n.贿赂 vt.向…行贿 ", "brisk|a.活泼的；清新的 ", "brood|n.同窝幼鸟 vt.孵(蛋) ", "bunch|n.束，球，串；一群 ", "carve|vt.刻，雕刻；切开 ", "cater|vi.迎合，投合 ", "chaos|n. 大混乱,混沌 ", "charm|n.魅力；妩媚 vi.迷人 ", "chord|n.(乐器的)弦 vi.协调 ", "clamp|n.夹子 vt.夹住，夹紧 ", "clash|n.碰撞声；抵触，冲突 ", "clasp|n.扣子，钩子；别针 ", "cling|vi.粘住；依附；坚持 ", "comet|n. 慧星 ", "corps|n. 军团,队,团,兵种 ", "couch|n.睡椅，长沙发椅 ", "crisp|a.脆的；卷曲的 ", "d*amn|vt.诅咒 n.诅咒；丝毫 ", "dizzy|a.头晕眼花的，眩晕的 ", "dwell|n.居住 vi.凝思，细想 ", "eject|vt.逐出，排斥；喷射 ", "elbow|n.肘，肘部；弯管 ", "elite|n. 精华,精锐,中坚分子 ", "embed|vt. 使插入,使嵌入 ", "endow|vt.资助；赋予，授予 ", "ensue|vt. 追求 vi. 跟着发生,继起 ", "epoch|n.(新)时代；历元 ", "erupt|vi. 爆发 vt. 喷出 ", "evoke|vt. 唤起,引起 ", "exile|vt.流放 n.被流放者 ", "expel|vt.驱逐，开除；排出 ", "facet|n. 小平面,方面,刻面 ", "feast|n.盛宴，筵席；节日 ", "ferry|n.渡船；渡口 vt.运送 ", "flank|n.肋，肋腹；侧面 ", "flare|vi.闪耀 vt.使闪亮 ", "fling|vi.&vt.(用力)扔，抛 ", "flush|vi.奔流；(脸)发红 ", "forum|n.论坛，讨论会 ", "fraud|n. 骗子,欺骗,欺诈,诡计 ", "given|a. 赠予的,沉溺的,约定的 ", "glare|vi.瞪眼 n.瞪眼 ", "gleam|n.微光 vi.发微光 ", "glide|vi.滑动；消逝 n.滑行 ", "graze|vi.喂草；放牧(牲畜) ", "grief|n.悲哀，悲痛，悲伤 ", "groan|vi.哼，呻吟 n.呻吟 ", "grope|vi.(暗中)摸索，探索 ", "hasty|a.急速的；仓促的 ", "hatch|vt.舱盖，舱口；短门 ", "haunt|vt.常去 vi.经常出没 ", "heave|vt.(用力地)举起；抛 ", "hinge|n.合页，折叶，铰链 ", "hoist|vt.升起 vi.扯起来 ", "hover|vi.徘徊；傍徨；翱翔 ", "idiom|n.习语，成语 ", "incur|vt. 招致,蒙受,遭遇 ", "inlet|n.进口，水湾 vt.引进 ", "irony|n. 反讽,讽剌,讽剌之事 ", "ivory|n.象牙；牙质；乳白色 ", "lease|n.租约，契约，租契 ", "liner|n.班船，班机 ", "lobby|n.前厅，(剧院的)门廊 ", "lofty|a.高耸的；高尚的 ", "lunar|a.月亮的 ", "marsh|n.沼泽地，湿地 ", "medal|n.奖章，勋章，纪念章 ", "media|n. 媒体 ", "merge|vt. 使合并,使并为一体 ", "midst|n.中部，中间，当中 ", "motel|n.汽车游客旅馆 ", "mourn|vi.哀痛，哀悼 ", "muddy|a.多泥的，泥泞的 ", "naive|a. 天真的,纯真的,朴素的 ", "nasty|a.龌龊的；淫猥的 ", "overt|a. 明显的,公然的 ", "oxide|n.氧化物 ", "panic|n.恐慌，惊慌 ", "pearl|n.珍珠；珍珠母 ", "pedal|n.踏脚，踏板，脚蹬 ", "petty|a.细小的；器量小的 ", "plead|vt.为…辩护 vi.抗辩 ", "polar|a.南(北)极的；极性的 ", "porch|n.门廊，入口处 ", "probe|n.探针 vt.用探针探查 ", "prone|a. 俯伏的,易于...的 ", "prose|n.散文 ", "quart|n.夸脱(=2品脱) ", "queer|a.奇怪的，古怪的 ", "quest|vt.寻找 vi.追求 ", "rally|n.&vt.&vi.(重新)集合 ", "recur|vi. 复发,重现,再发生 ", "reign|n.朝代 ", "relay|vt.分程传递；使接替 ", "repay|vt.&vi.偿还，报答 ", "repel|vt.拒绝；使厌恶 ", "saint|n.圣徒；基督教徒 ", "sauce|n.调味汁，酱汁 ", "scent|n.气味，香味；香水 ", "scorn|n.轻蔑；嘲笑 vt.轻蔑 ", "scrap|n.碎片；废料 vt.废弃 ", "shaft|n.(工具的)柄，杆状物 ", "sheer|a.纯粹的；全然的；陡峭的 ", "shrug|vt.&vi.耸(肩) n.耸肩 ", "slack|a. 松弛的；萧条的；懈怠的；vt.使松弛 ", "smash|vt.打碎，打破，粉碎 ", "snack|n.快餐，小吃 ", "sober|a.清醒的；适度的 ", "stall|n.货摊，书摊；厩 ", "stern|n.艉，船尾；臀部 ", "surge|n.vt. 激增,奔放,汹涌,澎湃 ", "swamp|n.沼泽，沼泽地 ", "tease|vt.逗乐，戏弄；强求 ", "tempo|n. 拍子,速率,节奏 ", "theft|n.盗窃，偷窃(行为) ", "theme|n.题目；词干；主旋律 ", "thorn|n.刺，棘；荆棘；蒺藜 ", "timid|a.胆怯的；羞怯的 ", "token|n.象征；辅币；纪念品 ", "tract|n.传单,小册子,大片（土地或森林） ", "trait|n. 显著特点，特性 ", "tribe|n.部落，宗族 ", "tutor|vt.教，指导 ", "unify|vt. 统一,使成一体 ", "valve|n.阀，阀门；电子管 ", "verge|n.边缘，边界，界限 ", "verse|n.诗，韵文；诗行 ", "virus|n. 病毒 ", "vocal|a. 直言不讳的，嗓音的,有声的 ", "weary|a.疲倦的 vt.使疲乏 ", "wedge|n.楔 vt.楔入；挤入 ", "whirl|vt.使回旋 vi.&n.回旋 ", "yacht|n.游艇，快艇 ", "abrupt|a. 突然的，意外的，唐突的 ", "absurd|a.不合理的，荒唐的 ", "accord|vt.一致(~ with)；给予 ", "adhere|vi. (fml)粘附；追随；坚持 (~ to sth) ", "adjoin|vt.贴近，毗连；靠近 ", "aerial|a.空气的；航空的 ", "affirm|vt.断言，批准；证实 ", "allege|vt. 宣称,申述,主张,断言 ", "amends|n. 赔偿 ", "arctic|a.北极的 n.北极 ", "ascend|vi.攀登，登高；追溯 ", "assert|vt.断言，宣称；维护 ", "baffle|vt.使挫折 n.迷惑 ", "ballet|n.芭蕾舞；舞剧 ", "barely|ad.仅仅，勉强 ", "barren|a.贫瘠的；不妊的 ", "betray|vt.背叛；辜负；泄漏 ", "bronze|n.青铜色 ", "bruise|n.青肿，伤痕；擦伤 ", "brutal|a. 残忍的,野蛮的,不讲理的 ", "budget|n.预算，预算案 ", "buffer|n. 缓冲,缓冲区 vt. 缓冲 ", "burial|n.安葬，埋葬，埋藏 ", "bypass|n.旁通管 vt.绕过 ", "canvas|n.粗帆布；一块油画布 ", "cavity|n.洞，穴，空腔 ", "cellar|n.地窑，地下室 ", "census|n. 户口普查 vt.统计调查 ", "cereal|n.谷类，五谷，禾谷 ", "chorus|vt.&vi.合唱 ", "circus|n.马戏；马戏团 ", "clause|n. 子句,条款 ", "client|n.顾客；诉讼委托人 ", "climax|n.顶点，高潮 ", "clinic|n.诊所，医务室；会诊 ", "closet|n.小房间；壁碗橱 ", "clutch|vt.抓住 vi.掌握，攫 ", "combat|vt.跟…战斗 vi.格斗 ", "comedy|n.喜剧；喜剧场面 ", "comply|vi.应允，遵照，照做 ", "confer|vt. 赠予,协议 vi. 协商 ", "cosmic|a.宇宙的；广大无边的 ", "coward|a.懦怯的，胆小的 ", "cradle|n.摇篮，发源地 ", "cruise|vi.巡航 vt.巡航于… ", "dazzle|vt.&vi.炫耀；迷惑 ", "deadly|a.致命的，死一般的 ", "decent|a.正派的；体面的 ", "denial|n.否定；拒绝相信 ", "denote|vt.指示，意味着 ", "depict|vt. 描述,描写 ", "depute|vt. 指定代理人,委任 ", "detach|vt.分开；派遣(军队) ", "dilute|vt. 冲淡,稀释 a. 淡的,稀释的 ", "dismay|n.惊慌，沮丧，灰心 ", "distil|v. 蒸馏, 提取....的精华 ", "divert|vt.使转向 vi.转移 ", "divine|a.神的；敬神的 ", "domain|n. 领域,领土,产业,范围 ", "donate|vt.vi. 捐赠 ", "Easter|n. 复活节 ", "edible|a. 可食用的 n. 食品,食物 ", "elapse|vi.(时间)过去，消逝 ", "elicit|vt. 引出,抽出,引起 ", "embark|vi. 乘船,着手,从事,上飞机 ", "embody|vt.体现；包含，收录 ", "enrich|vt.使富裕；使丰富 ", "enroll|vt.登记，招收vi.参军 ", "entail|vt. 使必需,使承担 ", "entity|n. 实体,实存物,存在 ", "escort|n.&vt.护卫，护送 ", "estate|n.房地产；财产，产业 ", "ethics|n. 道德规范 ", "ethnic|a.民族特有的 ", "exempt|a. 免除的 vt. 使免除,豁免 ", "exotic|a. 异国的,外来的 n. 外来物,舶来品 ", "expend|vt. 花费,消耗,支出 ", "expire|vi.满期，到期；断气 ", "feeble|a.虚弱的；微弱的 ", "finite|a.有限的；有尽的 ", "format|n. 格式 v. 格式化 ", "fossil|n.化石 a.化石的 ", "foster|vt.养育，抚养；培养 ", "fringe|n.穗，毛边；边缘 ", "fusion|n. 熔合物,结合,熔合 ", "galaxy|n. 银河,星系,一群显赫的人物 ", "gamble|n.赌博 vt.冒…的险 ", "global|a.球面的；全球的 ", "gloomy|a.黑暗的；令人沮丧的 ", "gossip|n.闲谈；碎嘴子；漫笔 ", "grease|n.动物脂，脂肪 ", "grieve|vt.使悲痛 vi.悲痛 ", "hamper|vt.妨碍，阻碍，牵制 ", "hinder|a. 后面的 vt.vi. 阻碍,打扰 ", "ignite|vt.引燃 vi.着火 ", "immune|a. 免疫的,免除的,不受影响的 ", "impair|vt. 损害,减少,削弱 ", "impart|vt.给予，传递；告诉 ", "induce|vt.劝诱；引起；感应 ", "inject|vt.注射；注满；喷射 ", "inland|a.国内的；内地的 ", "insane|a. 患精神病的,不理智的 ", "intact|a.原封不动的,完整的 ", "intent|a.目不转睛的，热切的 ", "invert|vt. 使反转,使颠倒,使转化 ", "kidney|n.肾，腰子；性格 ", "latent|a.存在但看不见的 ", "layman|n. 俗人,门外汉,凡人 ", "legend|n.传说，传奇 ", "linear|a.线的；长度的 ", "linger|vi.逗留，徘徊；拖延 ", "litter|n.废物，杂乱 vi.乱扔 ", "lounge|n.(旅馆等的)休息室 ", "marble|n.大理石 ", "meadow|n.草地，牧草地 ", "melody|n.旋律，曲调；歌曲 ", "menace|vt.&vi.&n.(进行)威胁 ", "mingle|vt.使混合vi.混合起来 ", "misery|n.痛苦，悲惨，不幸 ", "mortal|a.终有一死的；致死的 ", "murmur|vi. 低语,低声而言 n.低语 ", "mutter|vi.轻声低语；抱怨 ", "nickel|n.镍；镍币 ", "notify|vt.通知，告知；报告 ", "notion|n.概念，意念；看法 ", "offset|n.分支，抵销 vt.抵销 ", "opaque|a.不透明的；不传导的 ", "option|n.选择，取舍 ", "orient|n.东方；亚洲，远东 ", "patent|a.专利的 n.专利 ", "patrol|n.巡逻 n.巡逻，巡查 ", "perish|vi.死亡，夭折；枯萎 ", "plague|n.瘟疫，鼠疫；天灾 ", "pledge|n.誓言 vt.使发誓 ", "ponder|vt.考虑 vi.沉思 ", "poster|n. 海报,招贴,脚夫 ", "prayer|n.祈祷，祈求 ", "preach|vt.说教，布道；鼓吹 ", "priest|n.教士，牧师，神父 ", "propel|vt.推进，推动 ", "purify|vt.提纯，精炼(金属) ", "purity|n.纯净；纯洁；纯度 ", "quartz|n.石英 ", "quench|vt.熄灭，扑灭；压制 ", "quiver|vi.(轻微地)颤动 ", "racket|n.球拍 ", "random|n.随机 a.随机的 ", "rating|n. 等级,评定结果，收视（听）率 ", "recipe|n.菜谱，烹饪法；处方 ", "recite|vt.&vi.背诵，朗诵 ", "reckon|vi.数，算帐 vt.认为 ", "refute|vt.驳斥，反驳，驳倒 ", "regime|n.政体，政权；制度 ", "resent|vt.对…不满，怨恨 ", "reside|vi.居住，驻扎；属于 ", "retail|n.零售 a.零售的 ", "retort|vt.&vi.反击；反驳 ", "revive|vt.&vi.苏醒；复兴 ", "ripple|n.涟漪，细浪，波纹 ", "ritual|n. 仪式 a. 仪式的,例行公事的 ", "robust|a. 强健的,粗野的,坚定的 ", "scared|adj. 受惊吓的 ", "savage|a. 未开发的,野蛮的,残暴的 n.野蛮人 ", "script|n. 手迹,手稿,剧本,字母表 ", "sector|n.部门,部分,扇形 ", "sexual|a. 性的,性别的 ", "shabby|a.褴褛的；破旧的 ", "shrewd|a. 精明的,敏锐的,机灵的 ", "slogan|n.标语，口号 ", "snatch|n. 抢夺,攫取,片段 vt. 夺取,攫取 ", "spiral|a.螺旋(形)的，盘旋的 ", "splash|vt.溅泼 vi.泼水 n.溅 ", "sponge|n.海绵 ", "spouse|n. 配偶,夫妻 ", "stereo|n.立体声 a.立体声的 ", "stitch|n.一针，缝线 vt.缝 ", "stride|vi.大踏步走 n.大步 ", "strive|vi.努力，奋斗，力求 ", "studio|n.工作室；播音室 ", "sturdy|a.坚定的；牢固的 ", "subtle|a.微妙的；精巧的 ", "summit|n.顶点，最高点；极度 ", "summon|vt.召唤；鼓起(勇气) ", "superb|a.壮丽的；超等的 ", "tablet|n.碑，匾；药片 ", "tackle|vt.解决，对付 n.用具 ", "tangle|vt.使缠结，使纠缠 ", "tariff|n. 关税,价格表,收费表 vt. 课以关税 ", "tenant|n.承租人，房客，佃户 ", "thesis|n.论题，论点；论文 ", "thirst|n.渴，口渴；渴望 ", "thrill|vt.&vi.(使)激动 ", "timber|n.木材，木料 ", "timely|a.及时的；适时的 ", "tragic|a.悲剧性的，悲惨的 ", "trench|n.深沟；壕沟，战壕 ", "trifle|n.小事，琐事；少许 ", "triple|a. 三倍的,三方的 vt. 使增至三倍 ", "tumble|vi.摔倒，跌倒；打滚 ", "unfold|vt.展开 vi.呈现 ", "update|vt. 更新,使现代化 ", "uphold|vt.举起；支撑；赞成 ", "verbal|a. 言辞的,文字的,口头的,,动词的 ", "versus|prep.(比赛等中)对 ", "virgin|n.处女 a.处女的 ", "vulgar|a.粗俗的，庸俗的 ", "wallet|n.钱包，皮夹子 ", "wrench|vt.拧，扭伤 n.拧 ", "abolish|vt.废除，取消 ", "academy|n.私立中学；专科院校 ", "adverse|a. 不利的,敌对的,相反的,逆的 ", "afflict|vt. 使痛苦,折磨 ", "agenda |n. 议程,应办事项 ", "amateur|a.业余的n.业余爱好者 ", "amplify|vt.放大，增强；扩大 ", "analogy|n.相似，类似；比拟 ", "antique|a.古代的 n.古物 ", "applaud|vt.喝彩；欢呼vi.欢呼 ", "ascribe|vt.把…归于 ", "assault|vt.袭击；殴打 n.攻击 ", "athlete|n.运动员；田径运动员 ", "augment|vt.vi.n. 增加,增大 ", "bandage|n.绷带，包带 ", "bearing|n.支承；忍受；方位 ", "bizarre|a. 奇异的 ", "blossom|n.花，开花 vi.开花 ", "blunder|vi.犯大错 n.大错 ", "boycott|vt.&n.联合抵制 ", "bracket|n. 支架,括弧,托架 ", "brittle|a.脆的；易损坏的 ", "capsule|n. 胶囊,瓶帽,太空舱 ", "captive|n.俘虏，被监禁的人 ", "cartoon|n.漫画，动画片 ", "caution|n.小心；告诫 vt.警告 ", "ceramic|a. 陶器的 n. 陶瓷制品 ", "certify|vt.vi. 证明,保证 ", "charity|n.施舍；慈善事业 ", "charter|vt.租 n.宪章；契据 ", "cherish|vt.珍爱；怀有(感情) ", "chronic|a. 慢性的,习惯性的 n. 慢性病患者 ", "clarity|n. 清楚,透明 ", "classic|n.名著 a.不朽的 ", "cluster|n.一串 vt.使成群 ", "collide|vi.碰撞；冲突，抵触 ", "commend|vt.称赞，表扬；推荐 ", "commute|vt. 交换,兑换, 经常来往 ", "compact|a.紧密的 vt.使紧凑 ", "compile|vt.编辑，编制，搜集 ", "concede|vt. 承认,退让 vi. 让步 ", "concise|a. 简洁的,简明的 ", "conform|vt.使遵守 vi.一致 ", "contend|vi.竞争 vt.坚决主张 ", "context|n.上下文；来龙去脉 ", "convict|n. 囚犯,罪犯 vt. 宣告有罪 ", "cordial|a.真诚的，诚恳的 ", "corrode|vt.vi 腐蚀,侵蚀,破坏 ", "corrupt|vt.贿赂 a.腐败的 ", "costume|n. 装束,服装 ", "counsel|n.商议；忠告；律师 ", "cripple|n.跛子；残废的人 ", "crucial|a. 决定性的,重要的,严厉的 ", "cynical|a. 愤世嫉俗的,讽刺的,冷嘲的 ", "decimal|a.小数的，十进制的 ", "decline|vt.下倾；偏斜；衰退 ", "deficit|n. 赤字,不足额 ", "degrade|vt.使降给；使堕落 ", "dentist|n.牙科医生 ", "deprive|vt.夺去；使(人)失去 ", "descent|n.下降；出身；斜坡 ", "despise|vt.鄙视，蔑视 ", "destiny|n. 命运,定数 ", "deviate|vt.(使)背离，偏离 ", "diffuse|vt.vi. 散播,传播 a. 散开的,弥漫的 ", "dignity|a.尊贵；(举止)庄严 ", "dilemma|n. 困境,进退两难的局面 ", "diploma|n.毕业文凭，学位证书 ", "disable|vt.使无能，使伤残 ", "discern|vt.看出，辨出；辨别 ", "disrupt|a. 分裂的,分散的 vt. 使分裂,使瓦解 ", "distort|vt.歪曲，曲解，扭曲 ", "drastic|a.激烈的；严厉的 ", "drought|n.旱灾，干旱 ", "dubious|a. 可疑的,不确定的 ", "eclipse|n.(日，月)食 ", "ecology|n.生态学；个体生态学 ", "elderly|a. 过了中年的,稍老的 ", "elegant|a.(举止、服饰)雅致的 ", "elevate|vt.提高(思想)；抬高 ", "embassy|n.大使馆；大使的职务 ", "enhance|vt.提高，增加；夸张 ", "episode|n.一段情节；插曲 ", "equator|n.赤道，天球赤道 ", "erosion|n.腐蚀，侵蚀；糜烂 ", "essence|n.本质，本体；精华 ", "eternal|n.永久的；不朽的 ", "extinct|a.绝种的；熄灭了的 ", "extract|vt.取出；榨取 n.摘录 ", "fantasy|n. 幻想,白日梦 ", "fitting|a.适当的 n.配合 ", "fixture|n.固定；定期存款 ", "flatter|vt.奉承，阿谀，谄媚 ", "flutter|vi.(鸟)振翼；飘动 ", "foresee|vt.预见，预知，看穿 ", "fragile|a.脆的；体质弱的 ", "furious|a.狂怒的；狂暴的 ", "gallery|n.长廊，游廊；画廊 ", "garbage|n.垃圾，污物，废料 ", "garment|n.衣服；服装，衣着 ", "genetic|a. 遗传的,起源的 ", "geology|n.地质学；(某地)地质 ", "glitter|vi.闪闪发光 n.闪光 ", "hearing|n. 听,听觉 ", "hostage|n.人质，抵押品 ", "immerse|vt.沉浸；给…施洗礼 ", "impetus|n. 动力,推动力,激励 ", "impulse|n.冲动，推动，脉冲 ", "indulge|vt.放纵(感情)vi.纵情 ", "inertia|n.惯性，惯量；无力 ", "inflict|vt. 施以,加害,使承受 ", "inhabit|vt.居住于，栖息于 ", "inhibit|vt. 禁止,抑制 ", "insight|n.洞察力，洞悉，见识 ", "interim|a. 中间的,暂时的,间歇的,n.过渡时期 ", "invalid|n.病人 a.有病的，无效的 ", "leaflet|n.传单，活页；广告 ", "literal|a.文字(上)的；字面的 ", "magnify|vt.放大，扩大 ", "majesty|n.威严，尊严；陛下 ", "marshal|n.元帅；陆军元帅 ", "massive|a.粗大的；大而重的 ", "mediate|a. 居间的,间接的vt. 斡旋,调停 ", "migrate|vi.迁移，移居 ", "minimal|a. 最小的,极微的,最小限度的 ", "monster|n.怪物；畸形的动植物 ", "nominal|a. 名义上的,名字的 n. 名词性词 ", "notable|n.值得注意的；著名的 ", "nourish|vt.提供养分，养育 ", "novelty|n.新颖；新奇的事物 ", "obscene|a. 淫秽的,猥亵的 ", "obscure|a.阴暗的；蒙昧的 ", "offence|n.犯罪，犯规；冒犯 ", "oppress|vt.压迫，压制；压抑 ", "optimum|n.最适条件，最适度 ", "overlap|vt.与…交搭 vi.重迭 ", "paradox|n. 似非而是的论点,自相矛盾的话 ", "pastime|n.消遣，娱乐 ", "pasture|n.牧场；牲畜饲养 ", "penalty|n.处罚，刑罚；罚款 ", "pension|n.抚恤金，年金 ", "perfume|n.香味，芳香；香料 ", "perplex|vt.迷惑，困惑，难住 ", "plaster|n.灰泥；硬膏；熟石膏 ", "plateau|n.高原；平稳时期 ", "portray|vt. 描绘,描写,描写...的肖像, ", "precede|vt.先于… vi.领先 ", "premise|n. 前提,假设，房产 ", "premium|n. 额外费用,奖金,奖赏,保险费 ", "preside|vi.主持；主奏 ", "presume|vt.假定，假设，揣测 ", "pretext|n. 借口,托辞 ", "privacy|n. 隐私,隐居,秘密 ", "profile|n. 侧面,轮廓,人物素描,传略 ", "prolong|vt.延长，拉长，拖延 ", "prophet|n.预言家，先知 ", "provoke|vt. 激怒,惹起,驱使 ", "pursuit|n.追赶；追求；事务 ", "radiant|a.绚丽的；容光焕发的 ", "radiate|vi.发射光线；辐射 ", "radical|a.基本的；激进的 ", "readily|ad.乐意地；无困难地 ", "reclaim|vt.开垦，开拓；回收 ", "recruit|vi. 征募（新兵）,招收 n. 新兵,新成员 ", "rectify|vt.纠正；调整；精馏 ", "recycle|vt. 使再循环,再利用,再制 ", "refrain|vi.抑制，制止，忍住 ", "refugee|n.难民，流亡者 ", "rejoice|vi.欣喜，高兴 ", "remnant|n. 残留部分，遗迹 a. 剩余的,残余的 ", "revenge|vt.替…报仇 n.报仇 ", "revolve|vt.&vi.(使)旋转 ", "romance|n.传奇；浪漫文学 ", "royalty|n.皇家，王族，皇族 ", "rupture|n. 破裂,决裂 vt.(使)破裂 ", "scandal|n.丑事，丑闻；耻辱 ", "segment|n.切片，部分；段，节 ", "seminar|n. 研究会,讨论发表会 ", "senator|n.参议员；评议员 ", "shatter|vt.粉碎，破碎；毁坏 ", "shutter|n.百叶窗；(相机)快门 ", "shuttle|n.(织机的)梭 ", "signify|vt.表示，意味着 ", "silicon|n.硅(旧名矽) ", "smuggle|vt.私运 vi.走私 ", "sparkle|vi.发火花 vt.使闪耀 ", "spatial|a.空间的，占据空间的 ", "species|n.种，物种；种类 ", "stagger|vi.蹒跚 vt.使摇晃 ", "startle|vt.使大吃一惊 n.吃惊 ", "stumble|vi.绊倒；犯错误 ", "subsidy|n. 补助金,津贴 ", "suffice|vi.足够；有能力 ", "suicide|n.&vi.&vt.自杀 ", "surgeon|n.外科医师；军医 ", "surpass|vt.超过，超越，胜过 ", "surplus|n.过剩，剩余(物资) ", "symptom|n.症状，征候，征兆 ", "tactics|n.策略；战术，兵法 ", "terrace|n.平台，阳台，露台 ", "terrain|n. 地带,地域,范围,领域 ", "terrify|vt.使恐怖，使惊吓 ", "testify|v.证明，证实，作证 ", "texture|n. 质地，纹理 ", "therapy|n. 治疗 ", "thermal|a.热的；温泉的 ", "transit|n.运输 a.中转的，过境的 ", "tribute|n.贡物；献礼，贡献 ", "trigger|n.扳机 vt.触发，引起 ", "trivial|a.琐碎的；平常的 ", "tuition|n.教，教诲；学费 ", "upgrade|vt. 使升级,提升 ", "verdict|n. 裁决,结论,定论,判断 ", "vicious|a.邪恶的；恶性的 ", "violate|vt.违犯，违背；侵犯 ", "virtual|a.实际上的，实质上的 ", "warfare|n.战争，战争状态 ", "warrant|n. 正当理由, 委任状，许可证 ", "whereas|conj.而，却，反之 ", "whereby|ad.靠什么；靠那个 ", "wrinkle|n.皱纹 vt.使起皱纹 ", "abnormal|a.不正常的；变态的 ", "acquaint|vt.使认识，使了解 ", "activate|vt. 刺激,使活动 ", "adjacent|a.毗连的；紧接着的 ", "advocate|n.辩护者 vt.拥护 ", "alliance|n. 联盟,联合 ", "allocate|vt. 分派,分配 ", "analytic|a. 分析的,解析的 ", "appendix|n.附录，附属物；阑尾 ", "attorney|n.代理人；辩护律师 ", "autonomy|n. 自治 ", "aviation|n.飞行 ", "bachelor|n.未婚男子；学士 ", "bankrupt|a.破产的 vt.使破产 ", "basement|n.地下室；地窖；底层 ", "bewilder|vt.迷惑，把…弄糊涂 ", "bulletin|告示，公告，公报 ", "casualty|n. 伤亡,受害者 ", "category|n.种类，类目；范畴 ", "Catholic|a.天主教的n.天主教徒 ", "cautious|a.小心的，谨慎的 ", "civilian|n.平民 a.平民的 ", "coherent|a.粘着的；紧凑的 ", "coincide|vi.相符合；相巧合 ", "colonial|a.殖民地的，殖民的 ", "commence|vt.开始 vi.获得学位 ", "conceive|vt.设想，以为；怀孕 ", "confront|vt.使面对；使对证 ", "conserve|vt. 保存,保全 n. 蜜饯,果酱 ", "consumer|n.消费者，用户 ", "contempt|n.轻蔑；藐视 ", "contrive|vt.vi. 发明,设计,图谋 ", "converge|vi. 聚合,集中于一点 ", "courtesy|n.礼貌，谦恭，请安 ", "creation|n. 创造,创作物,发明 ", "currency|n.通货；通用；市价 ", "cylinder|n.圆筒；柱(面)；汽缸 ", "decisive|a.决定性的；果断的 ", "dedicate|vt.奉献；献身 ", "delegate|n.代表，委员，特派员 ", "denounce|vt.谴责，声讨；告发 ", "despatch|vt.vi.n. 派遣 ", "destined|a. (由神、命运) 预定的,注定的 ", "diagnose|vt.诊断(疾病) ", "diminish|vt.减少，减小，递减 ", "disclose|vt.揭开，揭发；透露 ", "discount|n.折扣；打折扣卖 ", "discrete|a. 不连续的, 离散的 ", "disguise|vi.隐瞒，掩埋 n.假装 ", "dispatch|vt.派遣；调度 n.急件 ", "disperse|vt.(使)分散；驱散 ", "displace|vt.移置；取代；置换 ", "distract|vt.分散(心思)；打扰 ", "doctrine|n.教义，主义；学说 ", "dominant|a.统治的 n.主因 ", "dominate|vt.统治，支配，控制 ", "drainage|n.排水；下水道 ", "drawback|n.退款；妨碍；弊端 ", "dreadful|a.可怕的；令人敬畏的 ", "earnings|n.工资，收入；收益 ", "eligible|n. 有资格者,合格者 a.有资格的 ", "eloquent|a. 雄辩的,有口才的,动人的 ", "endeavor|vi.&n.努力，尽力 ", "envisage|vt. 面对,正视,想象 ", "esthetic|a. 审美的 ", "explicit|a.明晰的；直率的 ", "feminine|a.女性的；女子气的 ", "foremost|a.最初的；第一流的 ", "fracture|n.破裂；裂痕 vi.破裂 ", "gigantic|a.巨大的；巨人似的 ", "gorgeous|a.绚丽的；极好的 ", "gracious|a.谦和的 ", "guardian|n. 监护人,保护人 a. 保护的 ", "handbook|n.手册，便览，指南 ", "handicap|vt.妨碍，使不利 ", "heighten|vt.加高，提高；增加 ", "heritage|n. 遗产,继承物,传统 ", "historic|a.历史的；历史性的 ", "hitherto|ad.迄今，到目前为止 ", "horrible|a. 可怕的,极可憎的,极可厌的 ", "humanity|n.人类；人性，人情 ", "humidity|n.湿气；湿度 ", "identity|n. 相同,身分,恒等式,特性,一致 ", "ideology|n. 意识形态,思想体系 ", "illusion|n.幻想；错觉；假象 ", "imperial|a. 帝王的,至尊的 n. 特等品 ", "implicit|a. 暗示的,盲从的,绝对的,固有的 ", "initiate|vt.开始，创始；启蒙 ", "insulate|vt.使绝缘，使绝热 ", "integral|a.组成的；整的 ", "interact|vi.相互作用 ", "intrigue|n. 阴谋 vi. 密谋,耍诡计 vt. 激起兴趣 ", "irritate|vt.激怒；引起不愉快 ", "junction|n.连接；接头；中继线 ", "latitude|n.纬度；黄纬 ", "literacy|n. 读写能力,识字 ", "locality|n.位置，地点，发生地 ", "luminous|a.发光的；光明的 ", "manifest|vt.表明 a.明白的 ", "marginal|a.记在页边的；边缘的 ", "medieval|a. 中古的,中世纪的 ", "metallic|a.金属的 n.金属粒子 ", "militant|a. 好战的 ", "minimize|vt.使减到最小 ", "mobilize|vt.动员 vi.动员起来 ", "momentum|n. 动力,要素 ", "monopoly|n.垄断，独占，专利 ", "morality|n.道德，美德，品行 ", "mortgage|n.抵押 vt.抵押 ", "muscular|a.肌肉发达的，强健的 ", "nominate|vt.提名，推荐；任命 ", "notation|n. 记号法,表示法,注释 ", "obedient|n.服从的，顺从的 ", "optimism|n.乐观，乐观主义 ", "oriental|a.东方的；东方国家的 ", "ornament|n.装饰物 vt.装修 ", "orthodox|a. 正统的,传统的,惯常的 ", "outbreak|n.(战争、愤怒等)爆发 ", "overflow|vt.从…中溢出 ", "overhear|vt.偶然听到；偷听 ", "pamphlet|n.小册子 ", "paradise|n.伊甸乐园；天堂 ", "paralyze|vt. 使瘫痪,使麻痹 ", "pathetic|a.哀婉动人的；可怜的 ", "pendulum|n.(钟等的)摆 ", "periodic|n.周期的；一定时期的 ", "permeate|vt. 弥漫,渗透,充满 vi. 透入 ", "petition|n.请愿 vt.向…请愿 ", "preclude|vt. 预先排除,预防,阻止,妨碍 ", "pregnant|a.怀孕的；意义深长的 ", "prestige|n.威望，威信，声望 ", "priority|n.先，前；优先，重点 ", "proclaim|vt.宣告，宣布；表明 ", "profound|a.深刻的；渊博的 ", "quantify|vt.确定…的数量 ", "reckless|a.粗心大意的；鲁莽的 ", "reliance|n.信任，信赖，信心 ", "reproach|vt.&n.责备，指责 ", "retrieve|vt. 取回,挽回, 检索 ", "rigorous|a.(性格等)严峻的 ", "sanction|n. 制裁，批准 ", "saturate|vt. 使浸透,使充满,使饱和 ", "scrutiny|n. 细看,仔细检查,监视 ", "shipment|n.装货；装载的货物 ", "simulate|vt. 模拟,假装,模仿 ", "situated|a.位于…的 ", "skeleton|n.骨骼，骷髅；骨架 ", "software|n.(计算机的)软件 ", "solitary|n. 独居者 a. 孤独的,独居的 ", "spacious|a.广阔的，广大的 ", "spectrum|n.系列，范围；波谱 ", "stimulus|n. 刺激,激励,刺激品 ", "striking|a.显著的，惊人的 ", "stubborn|a.顽固的；顽强的 ", "suitcase|n.小提箱，衣箱 ", "suppress|vt.镇压；抑制；隐瞒 ", "survival|n.幸存，残存；幸存者 ", "symmetry|n.对称(性)，匀称 ", "symphony|n.交响乐；交响乐团 ", "terrific|a.可怕的；极大的 ", "tolerant|a.容忍的；有耐力的 ", "traverse|vt.横越，横切，横断 ", "turnover|n. 人员调整，营业额，成交量 ", "validity|n.有效，效力；正确 ", "vicinity|n.邻近；附近地区 ", "withhold|vt. 拒绝，不给，使停止，阻挡 ", "wretched|a.不幸的；卑鄙的 ", "abundance|n.丰富，充裕 ", "accessory|n.同谋 a.附属的 ", "advertise|vt.通知 vi.登广告 ", "aesthetic|a. 美学的,审美的,有美感 ", "affiliate|vt. 附属,接纳 vi. 有关 ", "aggravate|vt. 使恶化,使更加重 ", "agitation|n.鼓动，煸动；搅动 ", "agreeable|a.惬意的；同意的 ", "alleviate|vt. 减轻,使缓和 ", "allowance|n津贴，补助费 ", "alongside|prep.在…旁边 ", "alternate|vt.使交替 a.交替的 ", "ambiguous|a.模棱两可的；分歧的 ", "ambitious|a.有雄心的；热望的 ", "anonymous|a. 匿名的 ", "Antarctic|a.南极的 n.南极区 ", "appraisal|n. 评价,估价,鉴定 ", "architect|n.建筑师；创造者 ", "ascertain|vt.查明，确定，弄清 ", "assurance|n.保证；财产转让书 ", "astronomy|n.天文学 ", "attendant|n.侍者；护理人员 ", "authentic|a. 真实的,可靠的,可信的 ", "authorize|vt. 授权与,批准,委托代替 ", "biography|n. 传记 ", "breakdown|n.崩溃，倒塌；失败 ", "cafeteria|n.自助食堂 ", "cathedral|n.总教堂；大教堂 ", "certainty|n.确实性，确信，确实 ", "clearance|n. 清除,解除,间隙 ", "clockwise|a.&ad.顺时针方向转的 ", "commodity|n.日用品，商品，物品 ", "composite|a.合成的 n.合成物 ", "confusion|n.混乱；骚乱；混淆 ", "consensus|n. 一致 ", "constrain|vt. 强迫,勉强,驱使 ", "corporate|n. 组织 ", "correlate|n.互相关联的事物 ", "criterion|n.标准，准则，尺度 ", "culminate|vi.vi. 到绝顶,达于极点,达到高潮 ", "customary|a.通常的；照惯例的 ", "designate|vt.指出，指示；指定 ", "detective|n.侦探，密探 ", "directory|n.姓名地址录；董事会 ", "disregard|vt.不管，不顾 n.不管 ", "dissipate|vt.驱散；浪费vi.消散 ", "diversion|n.转移；改道；娱乐 ", "doubtless|ad.无疑地；很可能 ", "duplicate|n.复制品 vt.复制 ", "eccentric|n. 怪人,偏心圆 a. 古怪的,不同圆心的 ", "economics|n.经济学；经济 ", "editorial|n.社论，期刊的社论 ", "empirical|a.经验主义的 ", "enclosure|n.围绕；围场，围栏 ", "endurance|n.耐久力，持久力 ", "energetic|a.积极的；精力旺盛的 ", "enlighten|vt.启发，开导；启蒙 ", "erroneous|a. 错误的,不正确的 ", "exclusive|a.排外的；孤傲的 ", "execution|n.实行，执行；处死刑 ", "exemplify|vt.举例证明(解释) ", "expertise|n. 专家的意见,专门技术 ", "exquisite|a. 精致的,细腻的,敏锐的 ", "fabricate|vt.制作，组合；捏造 ", "fantastic|a.空想的；奇异的 ", "fascinate|vt.迷住 vi.迷人 ", "fluctuate|vi.波动 vt.使波动 ", "formulate|vt.用公式表示 ", "frustrate|vt.挫败；使无效 ", "guideline|n. 指导路线,方针,指标 ", "hierarchy|n.等级制度，统治集团 ", "highlight|n. 突出,精彩场面 vt. 加亮,使显著 ", "historian|n.历史学家；编史家 ", "hurricane|n.飓风，十二级风 ", "ignorance|n.无知，无学，愚昧 ", "imitation|n.仿制品，伪制物 ", "implement|n.工具 vt. 实现,使生效,执行 ", "incentive|n. 动机 a. 激励的 ", "incidence|n.发生，影响；入射 ", "inclusive|a.包围住的；包括的 ", "indignant|a.愤慨的，义愤的 ", "inference|n.推论；推断的结果 ", "inflation|n.通货膨胀，物价飞涨 ", "ingenious|a.机灵的；精巧制成的 ", "integrate|vt.使结合，使并入 ", "integrity|n.诚实，正直 ", "intellect|n.理智，智力，才智 ", "intensify|vt.vi. 加强，强化 ", "intervene|vi.干涉，干预；播进 ", "intricate|a. 复杂的,错综的,缠结的,难懂的 ", "intrinsic|a. 本质的,原有的,真正的 ", "intuition|n. 直觉,直觉的知识 ", "inventory|n. 详细目录,存货清单 ", "landscape|n.风景，景色，景致 ", "liability|n.责任；倾向；债务 ", "longitude|n.经线，经度 ", "lubricate|vt.使润滑vi.加润滑油 ", "magnitude|n.大小；重大；星等 ", "manoeuvre|n.vi. 调遣,演习 vt. 调动,操纵 ", "masculine|a.男性的；强壮的 ", "mechanism|n.机械装置；机制 ", "messenger|n.送信者，信使 ", "miniature|n.缩影 a.缩小的 ", "multitude|n.大批，大群；大量 ", "municipal|a.市的，市立的 ", "narrative|n. 叙述,故事 a. 叙述的,叙事的 ", "negotiate|vi.谈判，交涉，议定 ", "nightmare|n.恶梦；经常的恐惧 ", "notorious|a.臭名昭著的 ", "numerical|a.数字的，数值的 ", "nutrition|n. 营养,营养学 ", "offensive|a.冒犯的；进攻的 ", "offspring|n.儿女，子孙，后代 ", "originate|vi.发源 vt.首创 ", "overthrow|vt.推翻 n.推翻，瓦解 ", "overwhelm|vt.压倒，使不知所措 ", "parameter|n.参(变)数；参量 ", "partition|n.分开，分割；融墙 ", "patriotic|a.爱国的 ", "perpetual|a.永久的；四季开花的 ", "plausible|a. 似乎真实的,似乎合理的 ", "postulate|vt.要求，假定，假设 ", "premature|a. 早熟的,过早的 n. 早产儿 ", "prevalent|a.流行的；盛行的 ", "promising|a.有希望的；有前途的 ", "propagate|vt.繁殖；传播，普及 ", "prototype|n.原型；典型，范例 ", "proximity|n. 接近,亲近 ", "publicity|n. 公开,名声,宣传 ", "quarterly|a.季度的 ad.季度地 ", "realistic|a.现实的；现实主义的 ", "rebellion|n.造反；叛乱；反抗 ", "recession|n. （经济）衰退,不景气 ", "recipient|n. 接受者，接收者 ", "reconcile|vt.使和好；调停 ", "redundant|a. 多余的,过多的,冗长的 ", "remainder|n.剩余(物)；余数 ", "resonance|n. 共鸣,回声,共振 ", "resultant|a.作为结果而发生的 ", "retention|n. 保留,保有,保持 ", "safeguard|n.保护措施；护照 ", "sceptical|a. 怀疑的 ", "sculpture|n. 雕刻,雕塑,雕刻(术) ", "seemingly|ad.表面上，外表上 ", "segregate|a. 分离的,被隔离的 vt. 使分离,使隔离 ", "sensation|n.感觉，知觉；轰动 ", "sentiment|n.感情；情操；情绪 ", "skeptical|a. 怀疑的,多疑的 ", "slaughter|vt.&n.屠杀，屠宰 ", "sociology|n.社会学 ", "sovereign|n.君主 a.统治的 ", "spectacle|n.场面；景象，奇观 ", "spectator|n.参观者，观众 ", "speculate|vi.思索，沉思；投机 ", "spokesman|n.发言人，代言人 ", "stabilize|vt. 使稳定,使坚固 vi. 稳定,安定 ", "staircase|n.楼梯，楼梯间 ", "strategic|a. 战略的,战略上的 ", "subscribe|vi.订购，认购；预订 ", "successor|n.继承人，继任者 ", "supervise|vt.&vi.监督，监视 ", "symposium|n.酒会；座谈会 ", "synthesis|n.合成；综合，综合物 ", "tentative|n. 试验,假设 a. 试验性质的,暂时的 ", "terminate|vt.&vi.停止，终止 ", "testimony|n. 证言,证据,声明 ", "threshold|n.门槛；入门，开端 ", "transcend|vt. 超越,胜过 ", "transient|a. 短暂的,转瞬即逝的,临时的,暂住的 ", "turbulent|a.骚动的，骚乱的 ", "unanimous|a.(全体)一致的 ", "undermine|vt. 渐渐破坏,暗中破坏,侵蚀基础 ", "ventilate|vt.使通风，使换气 ", "versatile|a.多方面的；通用的 ", "visualize|vt. 使看得见,使具体化,想象,设想 ", "volunteer|n.志愿者 vt.志愿 ", "warehouse|n.仓库，货栈 ", "youngster|n.儿童，少年，年轻人 ", "administer|vt.执行,管理,治理, ", "adolescent|a. 青春期的,青年的 n. 青少年 ", "ambassador|n.大使，使节 ", "analytical|a. 分析的,解析的 ", "articulate|a. 发音清晰的，听得懂的 ", "assimilate|vt. 使同化,吸收,比较 ", "assumption|n.采取；假定；傲慢 ", "attendance|n.到场；出席人数 ", "automation|n.自动，自动化 ", "beforehand|ad.预先；提前地 ", "commentary|n. 注释,评论,批评 ", "commitment|n. 委托,实行,承担义务,赞助 ", "comparable|a.可比较的；类似的 ", "compatible|a.一致的；兼容制的 ", "compensate|vt.&vi.补偿，赔偿 ", "competence|n. 胜任,资格,能力 ", "complement|vt.补充 n.补足(物) ", "compliment|n.问候 vt.赞美，祝贺 ", "compulsory|a.强迫的，义务的 ", "conception|n.概念，观念，想法 ", "concession|n.让步，迁就 ", "consequent|a.作为结果的；必然的 ", "consultant|n. 顾问,商议者 ", "continuity|n. 连续性 ", "contradict|vt.反驳，否认 ", "conviction|n.确信，信服，深信 ", "cumulative|a. 累积的 ", "curriculum|n. 课程 ", "deficiency|n.缺乏；不足之数 ", "degenerate|a. 堕落的 vi.vt.（使）变质,（使）退化 ", "deliberate|a.深思熟虑的；审慎的 ", "depression|n.消沉；不景气萧条期 ", "descendant|n.子孙，后裔；弟子 ", "diplomatic|a.外交的；有策略的 ", "disastrous|a.灾难性的；悲惨的 ", "engagement|n.婚约；约会，债务 ", "enterprise|n.企业，事业心 ", "expedition|n.探险；探险队 ", "exposition|n.说明，解释；陈列 ", "extinguish|vt.熄灭，扑灭；消灭 ", "facilitate|vt.使容易；助长 ", "federation|n. 联邦,联合,联盟 ", "fellowship|n.伙伴关系；联谊会 ", "formidable|a.可怕的；难对付的 ", "generalize|vt.概括出vi.形成概念 ", "hemisphere|n.半球；半球地图 ", "henceforth|ad.今后，从今以后 ", "hypothesis|n.假设；前提 ", "hysterical|a. 歇斯底里的,异常兴奋的 ", "illuminate|vt.照明，照亮；阐明 ", "imperative|n. 命令, a.命令式的,急需的,强制的 ", "inaugurate|vt.开始；使就职 ", "incredible|a.难以置信的，惊人的 ", "indefinite|a.不明确的；不定的 ", "indicative|a.指示的；陈述的 ", "infectious|a.传染的；感染性的 ", "ingredient|n.配料，成分 ", "initiative|a.创始的 n.第一步 ", "innovation|n.创新，改革，新设施 ", "intimidate|vt. 威胁,恐吓,胁迫 ", "invaluable|a. 无价的,价值无法衡量的 ", "invariably|ad.不变地，永恒地 ", "irrigation|n.灌溉；冲洗法 ", "jeopardize|vt. 危害,使受危困,使陷危地 ", "journalist|n.记者，新闻工作者 ", "legitimate|a. 合法的,正当的 vt. 使合法 ", "likelihood|n.可能(性) ", "locomotive|a.运动的；机动 ", "manipulate|vt.操作；控制，手持 ", "manuscript|n.手稿，底稿，原稿 ", "membership|n.成员资格；会员人数 ", "misfortune|n.不幸，灾祸，灾难 ", "missionary|n.传教士 ", "negligible|a.微不足道的 ", "obligation|n.义务，职责，责任 ", "pedestrian|n.行人，步行者 ", "perception|n.感觉；概念；理解力 ", "perfection|n.尽善尽美；无比精确 ", "periodical|n.期刊，杂志 ", "persistent|a. 固执的,坚持的,持续的 ", "presumably|ad.推测起来，大概 ", "proceeding|n.程序，行动，事项 ", "productive|a.生产的；出产…的 ", "profitable|a.有利的；有益的 ", "propaganda|n.宣传；宣传机构 ", "reciprocal|a.相互的；互利的 ", "recreation|n.消遣，娱乐活动 ", "repertoire|n. 全部剧目,保留剧目,全部技能 ", "republican|a.共和国的 ", "retrospect|n. 回顾,追忆,回溯 ", "revelation|n. 揭露,泄露,启示,展示 ", "solidarity|n.团结；休戚相关 ", "speciality|n.专业，特长；特产 ", "stationary|a.固定的,静止不动的 ", "statistics|n.统计，统计数字 ", "stereotype|n.陈腔滥调,老套 ", "streamline|n.流线；流线型 ", "subjective|a. 主观的,个人的 ", "subsidiary|a.辅助的，补充的 ", "supersonic|a.超声的，超声速的 ", "suspension|n. 悬挂,暂停,中止 ", "suspicious|a.可疑的；猜疑的 ", "thereafter|ad.此后，以后 ", "transition|n.转变，变迁；过渡 ", "transplant|vt.&vi.移植，移种 ", "underlying|a. 在下面的,含蓄的,潜在的 ", "vegetation|n. 植物,草木 ", "vocational|a. 职业的 ", "vulnerable|a. 易受伤害的,脆弱的,易受攻击的 ", "watertight|a.不漏水的，防水的 ", "accommodate|vt.容纳；供应，供给 ", "acquisition|n. 获得,添加的物品 ", "anniversary|n.周年纪念日 ", "appreciable|a.可估价的；可察觉的 ", "bureaucracy|n.官僚主义；官僚机构 ", "circulation|n.循环；(货币等)流通 ", "coincidence|n. 巧合,同时发生 ", "commemorate|vt. 纪念 ", "commonplace|a.平凡的 n.平常话 ", "compartment|n. 间隔,个别室,车厢 ", "competitive|a.竞争的，比赛的 ", "consecutive|a. 连续的,联贯的,始终一贯的 ", "consolidate|vt.巩固 vi.合并 ", "conspicuous|a. 显著的,显眼的,出众的 ", "constituent|a.形成的 n.选民 ", "contaminate|vt. 弄脏,毒害,传染 ", "contemplate|vt. 注视,沉思,打算 vi. 冥思苦想 ", "controversy|n.争论，辩论，争吵 ", "cooperative|a.合作的 n.合作社 ", "counterpart|n. 副本,复本,配对物,相应物 ", "declaration|n.宣布，宣言；申诉 ", "destructive|a.破坏(性)的，危害的 ", "deteriorate|vt.vi. (使)恶化 ", "discrepancy|n. 相差,差异,差别 ", "disposition|n. 性情,处置,处理,布置 ", "disturbance|n.动乱；干扰；侵犯 ", "electrician|n.电工，电气技师 ", "electronics|n.电子学 ", "equilibrium|n.平衡，均衡；均衡论 ", "exceptional|a.例外的；优越的 ", "expenditure|n.(时间等)支出，消费 ", "extravagant|a.奢侈的；过度的 ", "forthcoming|a.即将到来的；现有的 ", "homogeneous|a.同类的；均匀的 ", "hospitality|n.好客，殷勤；宜人 ", "imaginative|a. 想象的,虚构的 ", "incorporate|vt.结合，合并，收编 ", "indignation|n.愤怒，愤慨，义愤 ", "innumerable|a.无数的，数不清的 ", "inspiration|n.灵感；妙想；鼓舞 ", "installment|n.分期付款 ", "legislation|n.立法；法规 ", "masterpiece|n.杰作，名著 ", "necessitate|vt. 迫使,使成为必需,需要 ", "nonetheless|adv. 尽管如此,然而 ", "orientation|n.向东；定位；方向 ", "participant|n.参加者 a.有份的 ", "permissible|a. 可允许的 ", "practicable|a.能实行的；适用的 ", "precipitate|a.突如其来的 vt.使突然发生 n. 沉淀物 ", "predecessor|n.前辈，前任者 ", "predominant|a.占优势的；主要的 ", "proficiency|n.熟练，精通 ", "proposition|n.命题，主题；提议 ", "prospective|a. 有希望的,预期的,将来的 ", "provocative|a. 挑衅的,刺激的,挑逗的 ", "qualitative|a.质的；定性的 ", "rectangular|a. 矩形的,成直角的 ", "refreshment|n.茶点，点心，便餐 ", "renaissance|n. 复活,复兴,文艺复兴 ", "replacement|n.归还；取代；置换 ", "resemblance|n.相似，相似性 ", "reservation|n.保留；预定，预订 ", "residential|a. 住宅的,与居住有关的 ", "spectacular|a. 公开展示的,惊人的 n. 展览物 ", "spontaneous|a.自发的；本能的 ", "subordinate|a.下级的，辅助的 ", "superiority|n.优越(性)，优势 ", "susceptible|a. 易受影响的,易感动的 ", "temperament|n. 气质,性质,性情 ", "transaction|n.处理；交易；和解 ", "ultraviolet|a.紫外的n.紫外线辐射 ", "*acknowledge|vt.承认；告知收到 ", "apprehension|n. 理解,忧惧,逮捕 ", "bibliography|n. 参考书目 ", "characterize|vt.表示…的特性 ", "commonwealth|n.共和国；联邦 ", "complication|n.复杂，混乱；并发症 ", "confidential|a.秘密的；亲信的 ", "contribution|n. 捐助,捐助之物,贡献 ", "discriminate|vt.vi. 区别对待，歧视 ", "enthusiastic|a.热情的，热心的 ", "entrepreneur|n. 企业家,主办人 ", "incidentally|ad.附带地；顺便提及 ", "instrumental|a.仪器的；有帮助的 ", "intelligible|a. 可理解的,易理解的,明了的 ", "intermittent|a. 间歇的,断断续续的 ", "intersection|n. 交集,十字路口,交叉点 ", "irrespective|a.不考虑的，不顾的 ", "metropolitan|a.主要都市的n.大主教 ", "prescription|n.药方，处方的药 ", "presentation|n.介绍；赠送；呈现 ", "productivity|n.生产率；多产 ", "quantitative|a.量的；定量的 ", "simultaneous|a.同时的，同时存在的 ", "specifically|ad. 特定的,明确的 ", "Thanksgiving|n.感恩节 ", "unemployment|n.失业；失业人数 ", "advent       |n. 来到,来临 ", "authoritative|a. 权威的,有权威的,命令式的 ", "collaboration|n. 合作,通敌 ", "configuration|n. 结构,配置,形态 ", "conscientious|a. 本着良心的,负责的 ", "controversial|a. 争论的,论争的,被议论的 ", "correspondent|n.通信者；通讯员 ", "differentiate|vt.vi. 区别,区分 ", "entertainment|n. 娱乐,款待,娱乐表演 ", "instantaneous|a.瞬间的，即刻的 ", "justification|n. 辩护,证明是正当的,释罪 ", "Mediterranean|n.地中海 a.地中海的 ", "physiological|a. 生理学的,生理学上的 ", "qualification|n.资格；限制条件 ", "questionnaire|n.调查表，征求意见表 ", "specification|n.载明，详述；规格 ", "supplementary|a. 补足的,补充的,追加的 ", "underestimate|vt.低估，看轻 ", "correspondence|n.通信；符合；对应 ", "identification|n.认出，鉴定；身份证 ", "representation|n.描写；陈述；代表 ", "notwithstanding|prep.尽管，虽然 ", "straightforward|a.老实的 ad.坦率地 "];
    var w = o;
    var M = math.random(0, w.length - 1);
    var d = 0;
    var I = false;
    var L = 0;
    var s = null;
    var Z = null;
    var b = 0;
    var P = null;
    var K = null;
    var O = 30;
    var E = null;
    var F = null;
    var J = null;
    function X() {
        b = 0;
        O = 30;
        L = 0;
        s.setString(" x " + L);
        E.setString("LIVES: " + O);
        P.setString("SCORE: " + b)
    }
    function k(ab, i) {
        ab.stopAllActions();
        ab.runAction(MoveTo(0.1, B + i * h, z.height / 2))
    }
    function e(i) {
        var ae = charToInt(i);
        var ac = CCLayer.create();
        ac.setContentSize(CCSizeMake(24, 100));
        ac.charIndex = ae;
        var ab = CCSprite.create("Resource/images/chars/" + intToChar(ae) + ".png");
        ab.setPosition(12, 50);
        ac.addChild(ab);
        var ad = aa.push(ac);
        k(ac, ad - 1);
        z.addChild(ac)
    }
    function G() {
        for (var ab = 0; ab < aa.length; ++ab) {
            if (aa[ab].charIndex != charToInt(N.charAt(ab))) {
                return false
            }
        }
        return true
    }
    function T(ah) {
        assert(ah.length > 1, "lenth is not enough");
        ah = ah.toLowerCase();
        N = ah;
        var af = new Array();
        var ad = new Array();
        for (var ae = 0; ae < ah.length; ++ae) {
            af.push(ah.charAt(ae))
        }
        var ab = false;
        while (!ab) {
            for (var ae = 0; ae < ah.length; ++ae) {
                var ac = math.random(0, af.length - 1);
                var ag = charToInt(af[ac]);
                ad.push(af[ac]);
                af.splice(ac, 1);
                if (ag != charToInt(ah.charAt(ae))) {
                    ab = true
                }
            }
            if (!ab) {
                for (var ae = 0; ae < ah.length; ++ae) {
                    af.push(ah.charAt(ae))
                }
                ad.length = 0
            }
        }
        for (var ae = 0; ae < ah.length; ++ae) {
            e(ad[ae])
        }
    }
    function r() {
        for (var ab = 0; ab < aa.length; ++ab) {
            aa[ab].removeAllChildsAndCleanUp(true)
        }
        aa.length = 0
    }
    function g() {
        r();
        var ac = null;
        meaning = "";
        M += math.random(1, 18);
        ac = w[M % w.length];
        var ab = ac.split("|");
        if (ab.length == 2) {
            ac = ab[0];
            meaning = ab[1]
        }
        if (ac.length > 10 || M > w.length) {
            M = 0;
            g();
            return
        }
        c.setString(meaning);
        T(ac);
        if (M >= w.length) {
            M = 0
        }
        var i = "HINT: ";
        for (W = 0; W < ac.length; ++W) {
            i += "*"
        }
        p.setString(i);
        d = 0;
        I = true
    }
    function S() {
        L += 1;
        document.title = "我猜对了" + L + "个单词，快来挑战我吧！";
        s.setString(" x " + L);
        Z.setOpacity(1);
        Z.setPosition(76, 60);
        var i = new Array();
        i.push(FadeOut(1));
        i.push(MoveBy(1, 0, -30));
        Z.runAction(Spawn(i))
    }
    function q(i) {
        b += i;
        P.setString("SCORE: " + b);
        K.setOpacity(1);
        K.setPosition(225, 60);
        K.setString("+" + i);
        var ab = new Array();
        ab.push(FadeOut(1));
        ab.push(MoveBy(1, 0, -30));
        K.runAction(Spawn(ab))
    }
    function C(ac) {
        O += ac;
        E.setString("LIVES: " + O);
        F.setOpacity(1);
        F.setPosition(180, 430);
        var ad = new Array();
        ad.push(FadeOut(0.5));
        if (ac > 0) {
            F.setColor(ccc3(155, 255, 155));
            F.setString("+" + ac);
            ad.push(MoveBy(1, 0, -30))
        } else {
            F.setColor(ccc3(255, 0, 0));
            F.setString("" + ac);
            ad.push(MoveBy(1, 0, 30))
        }
        var i = new Array();
        i.push(Spawn(ad));
        i.push(CallFunc(ab));
        F.runAction(Sequence(i));
        function ab() {
            if (O <= 0) {
                if (typeof (h5api) !== "undefined" && h5api.isWeixinBrowser()) {
                    J.setString("我猜对了" + L + "个单词，得了" + b + "分。快来挑战我吧！")
                } else {
                    J.setString("您猜对了" + L + "个单词，得了" + b + "分。")
                }
                U.setVisible(true);
                U.setOpacity(0);
                U.runAction(FadeTo(0.3, 0.9))
            }
        }
    }
    function Q() {
        I = false;
        f.setVisible(true);
        f.setOpacity(0);
        f.setScale(6);
        var ac = new Array();
        ac.push(FadeIn(0.2));
        ac.push(ScaleTo(0.2, 1));
        var ab = new Array();
        ab.push(Spawn(ac));
        ab.push(CallFunc(i));
        f.runAction(Sequence(ab));
        function i() {
            S();
            q(parseInt(100 / (d + 1)));
            if (d == 0) {
                C(1)
            }
        }
    }
    function u() {
        H.setVisible(true);
        H.setOpacity(0);
        H.setScale(6);
        var ac = new Array();
        ac.push(FadeIn(0.2));
        ac.push(ScaleTo(0.2, 1));
        var i = new Array();
        i.push(Spawn(ac));
        i.push(CallFunc(ab));
        H.runAction(Sequence(i));
        function ab() {
            if (I) {
                d += 1;
                var ad = "HINT: ";
                for (W = 0; W < N.length; ++W) {
                    if (aa[W].charIndex != charToInt(N.charAt(W))) {
                        ad += "*"
                    } else {
                        ad += N.charAt(W)
                    }
                }
                p.setString(ad);
                I = false;
                C(-1)
            }
        }
    }
    function R() {
        function ab(ad) {
            if (ad.code == 10000) {
                for (var ac = 0; ac <= data.length; ac++) {
                    if (data[ac].score <= b) {
                        alert("您的排名为第" + data[ac].rank + "名");
                        break
                    }
                }
            }
        }
        function i(ac) {
            if (ac.code == 10000) {
                h5api.getRank(ab)
            }
        }
        h5api.submitScore(b, i)
    }
    function V() {
        if (D == null) {
            D = CCScene.create();
            D.setContentSize(CCSizeMake(320, 480));
            D.element.style.boxShadow = "0px 0px 20px #1f91b6";
            D.setVisible(false);
            n = CCLayer.create();
            n.setContentSize(CCSizeMake(320, 480));
            n.setAnchorpoint(0, 0);
            n.setPosition(0, 0);
            n.setColor(ccc3(47, 161, 198));
            D.addChild(n);
            z = CCLayer.create();
            z.setContentSize(CCSizeMake(480, 100));
            z.setAnchorpoint(0, 0);
            z.setPosition(0, 236);
            n.addChild(z);
            y = CCLayer.create();
            y.setContentSize(CCSizeMake(480, 100));
            y.setAnchorpoint(0, 0);
            y.setDepth(10)
        }
        y.setTouchEnabled(true);
        var ak = -1;
        var ad = -1;
        var ab = -1;
        y.touchBegin = function(ao, aq) {
            var ap = parseInt((ao - B) / h + 0.5);
            if (ap >= 0 && ap < aa.length) {
                ak = ao;
                ab = ap;
                ad = aa[ab].x;
                aa[ab].setDepth(1);
                aa[ab].setPosition(aa[ab].x, aa[ab].y - 10)
            }
        };
        y.touchMoved = function(ao, at) {
            if (ab >= 0) {
                var ap = parseInt((ao - B) / h + 0.5);
                if (ap >= 0 && ap < aa.length) {
                    if (ap != ab) {
                        var ar = ab;
                        var aq = aa[ap];
                        aa[ap] = aa[ab];
                        aa[ab] = aq;
                        ab = ap;
                        k(aq, ar);
                        I = true
                    }
                }
                aa[ab].setPosition(ad + (ao - ak), aa[ab].y)
            }
        };
        y.touchEnded = function(ao, ap) {
            if (ab >= 0) {
                k(aa[ab], ab);
                aa[ab].setDepth(0)
            }
            ak = -1;
            ad = -1;
            ab = -1
        };
        y.touchCancled = y.touchEnded;
        z.addChild(y);
        var aj = null;
        if (typeof (l) !== "undefined" && l != null) {
            var aj = CCSprite.create(l);
            aj.setPosition(180, 60);
            n.addChild(aj)
        }
        P = createLabelDefaultStyle("SCORE: 0", 160, 60);
        n.addChild(P);
        P.setColor(ccc3(255, 255, 255));
        P.setAnchorpoint(0.5, 0.5);
        K = createLabelDefaultStyle("", 225, 60);
        n.addChild(K);
        K.setColor(ccc3(155, 255, 155));
        K.setAnchorpoint(0.5, 0.5);
        E = createLabelDefaultStyle("LIVES: " + O, 122, 430);
        n.addChild(E);
        E.setColor(ccc3(255, 255, 255));
        E.setAnchorpoint(0.5, 0.5);
        F = createLabelDefaultStyle("", 180, 430);
        n.addChild(F);
        F.setAnchorpoint(0.5, 0.5);
        p = createLabelDefaultStyle("", 30, 120);
        n.addChild(p);
        p.setColor(ccc3(155, 255, 155));
        c = createLabelDefaultStyle("", 30, 200);
        n.addChild(c);
        c.setColor(ccc3(255, 255, 255));
        H = CCSprite.create("Resource/images/wrong.png");
        H.setPosition(160, 340);
        n.addChild(H);
        H.setVisible(false);
        f = CCSprite.create("Resource/images/right.png");
        f.setPosition(160, 340);
        n.addChild(f);
        f.setVisible(false);
        var ag = createButton(function() {}, "Resource/images/right.png");
        ag.setPosition(38, 66);
        n.addChild(ag);
        s = createLabelDefaultStyle(" x 0", 62, 60);
        n.addChild(s);
        s.setColor(ccc3(255, 255, 255));
        Z = createLabelDefaultStyle("+1", 76, 60);
        n.addChild(Z);
        Z.setColor(ccc3(155, 255, 155));
        Z.setAnchorpoint(0.5, 0.5);
        Z.setOpacity(0);
        var an = null;
        var af = createButton(function() {
            if (G()) {
                af.setVisible(false);
                an.setVisible(true);
                Q()
            } else {
                u()
            }
        }, "Resource/images/checkmyguess.png");
        af.setPosition(160, 390);
        n.addChild(af);
        an = createButton(function() {
            g();
            H.setVisible(false);
            f.setVisible(false);
            af.setVisible(true);
            an.setVisible(false)
        }, "Resource/images/nextword.png");
        an.setPosition(160, 390);
        n.addChild(an);
        an.setVisible(false);
        var al = CCLayer.create();
        al.setContentSize(CCSizeMake(320, 480));
        al.setAnchorpoint(0, 0);
        al.setPosition(0, 0);
        al.setColor(ccc3(22, 22, 22));
        al.setOpacity(0.8);
        al.setDepth(10000);
        n.addChild(al);
        var ac = createLabelDefaultStyle("拖动下面圆形卡片复原打乱的单词", 35, 240);
        al.addChild(ac);
        ac.setColor(ccc3(255, 255, 255));
        ac.setAnchorpoint(0.5, 0.5);
        var ah = createButton(function() {
            al.removeAllChildsAndCleanUp(true);
            al.removeFromParent()
        }, "Resource/images/closeTip.png");
        ah.setPosition(160, 350);
        al.addChild(ah);
        U = CCLayer.create();
        U.setContentSize(CCSizeMake(320, 480));
        U.setAnchorpoint(0, 0);
        U.setPosition(0, 0);
        U.setColor(ccc3(47, 161, 198));
        U.setOpacity(0.9);
        U.setDepth(9999);
        U.setVisible(false);
        n.addChild(U);
        var ai = createLabelDefaultStyle("GAME OVER", 108, 80);
        U.addChild(ai);
        ai.setColor(ccc3(255, 255, 255));
        ai.setAnchorpoint(0.5, 0.5);
        var i = CCLayer.create();
        i.setContentSize(CCSizeMake(225, 60));
        i.setAnchorpoint(0.5, 0.5);
        i.setPosition(160, 200);
        U.addChild(i);
        J = createLabelDefaultStyle("", 0, 0);
        i.addChild(J);
        J.setColor(ccc3(255, 255, 255));
        J.setAnchorpoint(0.5, 0.5);
        var am = createButton(function() {
            X();
            _loadingScene.setVisible(true);
            _loadingScene.onFinishedLoading();
            U.setVisible(false)
        }, "Resource/images/replay.png");
        am.setPosition(160, 330);
        U.addChild(am);
        var ae = null;
        if (typeof (h5api) !== "undefined") {
            if (h5api.isWeixinBrowser()) {
                ae = createButton(function() {
                    var ao = "我猜对了" + L + "个单词，得了" + b + "分。快来挑战我吧！";
                    h5api.share(ao)
                }, "Resource/images/share.png");
                ae.setPosition(160, 300);
                am.setPosition(160, 400);
                U.addChild(ae)
            }
            R()
        }
    }
    V();
    function Y() {
        for (var ad = w.length - 1; ad > 0; --ad) {
            for (var ac = 0; ac < ad; ++ac) {
                var ae = w[ac].split("|");
                if (ae.length != 2) {
                    cclog("Error Word Def:" + w[ac])
                }
                var ah = ae[0];
                ae = w[ac + 1].split("|");
                if (ae.length != 2) {
                    cclog("Error Word Def:" + w[ac])
                }
                var af = ae[0];
                if (af.length < ah.length) {
                    var ab = w[ac];
                    w[ac] = w[ac + 1];
                    w[ac + 1] = ab
                }
            }
        }
        var ag = "";
        for (var ad = 0; ad < w.length; ++ad) {
            ag += '"' + w[ad] + '",'
        }
        cclog(ag)
    }
    function A() {
        w = o;
        M = 0;
        g()
    }
    function x() {
        w = m;
        M = 0;
        g()
    }
    var v = new Array();
    for (var W = 0; W < 26; ++W) {
        v[W] = CCSprite.create("Resource/images/chars/" + intToChar(W) + ".png");
        v[W].setVisible(false)
    }
    function j() {
        for (var ab = 0; ab < 26; ++ab) {
            v[ab].removeFromParent()
        }
        D.setVisible(true)
    }
    var a = new Object();
    a.run = j;
    a.loadCET4 = A;
    a.loadCET6 = x;
    return a
}
function createLoadingScene() {
    var h = CCScene.create();
    h.setContentSize(CCSizeMake(320, 480));
    h.element.style.boxShadow = "0px 0px 20px #1f91b6";
    h.setColor(ccc3(47, 161, 198));
    h.setDepth(11);
    var g = createLabelDefaultStyle("SCRAMBLE beta 1.0", 80, 100);
    h.addChild(g);
    g.setColor(ccc3(55, 255, 55));
    g.setAnchorpoint(0.5, 0.5);
    var c = createLabelDefaultStyle("0%", 156, 230);
    h.addChild(c);
    c.setColor(ccc3(255, 255, 255));
    c.setAnchorpoint(0.5, 0.5);
    var f = createButton(function() {
        scramble.loadCET4();
        scramble.run();
        h.setVisible(false)
    }, "Resource/images/cet4.png");
    f.setPosition(160, 200);
    h.addChild(f);
    f.setVisible(false);
    var d = createButton(function() {
        scramble.loadCET6();
        scramble.run();
        h.setVisible(false)
    }, "Resource/images/cet6.png");
    d.setPosition(160, 300);
    h.addChild(d);
    d.setVisible(false);
    var b = null;
    if (typeof (h5api) !== "undefined") {
        var b = createButton(function() {
            if (typeof (h5api) !== "undefined") {
                h5api.moreGame()
            }
        }, "Resource/images/moregame.png");
        b.setPosition(160, 400);
        h.addChild(b);
        b.setVisible(false)
    }
    function e() {
        f.setVisible(true);
        d.setVisible(true);
        if (b != null) {
            b.setVisible(true)
        }
        c.setVisible(false)
    }
    h.onFinishedLoading = e;
    function a(i) {
        c.setString("" + parseInt(i) + "%")
    }
    h.updatePercent = a;
    return h
}
function StartGame(a) {
    scramble = Scramble(a);
    gLoadingScene = createLoadingScene();
    _loadingScene = gLoadingScene
}
function startAnimation() {
    if (typeof (h5api) !== "undefined") {
        h5api.initGame(100035984, "猜单词", 320, 480)
    }
    function a() {
        processAction(1 / 60);
        if (gLoadingScene) {
            if (!isAllResourceReady()) {
                gLoadingScene.updatePercent(getLoadingPercentage());
                if (typeof (h5api) !== "undefined") {
                    h5api.progress(parseInt(getLoadingPercentage()), "loading...")
                }
            } else {
                gLoadingScene.onFinishedLoading();
                gLoadingScene = null;
                if (typeof (h5api) !== "undefined") {
                    try {
                        h5api.progress(100, "loading...")
                    } catch (b) {}
                }
            }
        }
    }
    CCDirector.sharedDirector().getScheduler().scheduleScriptFunc(a, 1 / 60, false)
}
function start() {
    startAnimation();
    StartGame(null)
}
setTimeout(start, 1000);