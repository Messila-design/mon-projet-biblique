/**
 * Remplace le contenuHtml de l'article « La Foi en 'Èlohiym » (Doc/001/01-2)
 * par le texte intégral fourni par l'auteur.
 */
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const contenuHtml = `
      <p class="doc-ref"><strong>Ref :</strong> Doc/001/01-2 &nbsp;·&nbsp; <em>Strictement interdit à la vente</em></p>

      <p>Ce terme, qui paraît si simple à aborder au premier abord, est en fait d'une grande complexité dans son ensemble. De nos jours, il se trouve au cœur de nombreuses prédications, de livres ou encore de conférences.</p>

      <p>Mais qu'est-ce que véritablement la Foi dont parlent les chrétiens au sein des églises locales ? Beaucoup ont vu dans ce mot une formule magique capable de produire toutes choses dont on a besoin et le « bon Dieu » comme un guichet automatique prêt à exécuter nos moindres caprices. Pourtant, la réalité a démontré qu'une telle approche a fait plus de mal que de bien, car les personnes auxquelles ce message a été adressé ont été mal enseignées. Ainsi, la mauvaise compréhension de cette notion a induit maintes personnes en erreur, déchirant des vies, brisant des foyers et détruisant des familles simplement parce que le mot Foi n'a pas été bien contextualisé.</p>

      <p>Par ailleurs, la Bible nous présente la Parole d'Èlohiym comme une épée tranchante prête à couper (Éphésiens 6 : 17 ; Hébreux 4 : 12). C'est pourquoi, si elle est mal utilisée, elle peut blesser voire tuer son utilisateur. De ce fait, la nécessité de savoir la manier avec exactitude est d'une rigueur absolue.</p>

      <h3>Qu'est-ce que la Foi ?</h3>

      <p>Ce mot est précisément mentionné 228 fois dans la Nouvelle Alliance. Une telle récurrence nous permet de comprendre que la foi est véritablement ancrée dans la vie de tous les enfants d'Èlohiym. Cependant, bien qu'elle soit moult fois citée dans la Parole, il n'en demeure pas moins qu'elle n'est pas toujours employée dans le même contexte et ne renvoie pas toujours à la même réalité. C'est pourquoi, nous allons présenter les différentes facettes dans lesquelles elle est manifeste, afin de donner une définition appropriée en fonction de chaque situation.</p>

      <p>Selon la Bible, la Foi est définie comme :</p>

      <blockquote>
        <p>Or la foi est une base de choses qu'on espère, une conviction de celles qu'on ne voit pas.</p>
        <cite>Hébreux 11 : 1 — BYM<sup class="note-marque" tabindex="0" data-note="Extrait de la Bible de Yéhoshoua Mashiah – 2014">1</sup></cite>
      </blockquote>

      <p>Dans la version Louis Segond 1910 :</p>

      <blockquote>
        <p>Or la foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas.</p>
        <cite>Hébreux 11 : 1 — Louis Segond 1910</cite>
      </blockquote>

      <p>Pour bien saisir la portée de cette définition, il convient d'identifier les trois mots-clés suivants :</p>

      <ul>
        <li><strong>[Une ferme] assurance</strong>, vient du grec : ὑπόστασις (<em>hou-pos-ta-sis</em>) signifiant « ce qui est fixé ou placé au-dessous » ou « ce qui a un fondement, qui est ferme ». Ainsi l'assurance consiste à avoir un appui sûr sur lequel l'on peut se reposer.</li>
        <li><strong>[Des choses qu'on] espère</strong>, vient du grec : ἐλπίζω (<em>el-pi-dzo</em>) signifiant « espérance », « confiance » ou « attente ».</li>
        <li><strong>Une démonstration</strong>, vient du grec : ἔλεγχος (<em>e-leg-khos</em>) signifiant « preuve », « signe » ou « prouver de manière évidente ».</li>
      </ul>

      <p>Par ailleurs, d'autres traductions de la Bible éclairent différemment cette notion :</p>

      <ul>
        <li><strong>La version Bible du Semeur (BDS)</strong> : « la foi est une façon de posséder ce qu'on espère, c'est un moyen d'être sûr des réalités qu'on ne voit pas. »</li>
        <li><strong>La version Darby</strong> : « Or la foi est l'assurance des choses qu'on espère, et la conviction des choses qu'on ne voit pas. »</li>
        <li><strong>La version Martin 1744</strong> : « Or la foi rend présente les choses qu'on espère, et elle est une démonstration de celles qu'on ne voit point. »</li>
        <li><strong>La version Parole de vie</strong> : « Croire en Dieu, c'est une façon de posséder déjà les biens qu'on espère, c'est être persuadé que les choses qu'on ne voit pas existent vraiment. »</li>
      </ul>

      <p>À la lumière de ces textes, nous comprenons que la Foi est l'assurance certaine et indéfectible dans la Parole d'Èlohiym Yehowshuw'a ha-Mashiyah car il n'est pas un homme pour mentir, ni le fils de l'homme pour se repentir ; car ce qu'il dit arrive (Nombres 23 : 19 ; voir aussi Romains 10 : 17).</p>

      <h3>Tous les hommes ont-ils la Foi ?</h3>

      <p>Oui, tous les hommes ont la foi dans la mesure où toute personne a une espérance en quelque chose. Mais elle est vaine car en aucun cas elle est certaine parce qu'elle n'est pas fondée sur la Parole d'Èlohiym. Par exemple, les satanistes croient en Lucifer. Or, cette foi sera bientôt source de profonde déception, car Lucifer sera jeté dans l'étang de feu et de soufre, où il sera tourmenté jour et nuit, aux siècles des siècles (Apocalypse 20 : 10). Ainsi, toutes les personnes qui se confient en lui seront largement déçues.</p>

      <p>Mais la vraie Foi, celle qui vient de la Bible, tous les hommes ne l'ont pas. En effet, pour l'avoir, il faut croire en Yehowshuw'a ha-Mashiyah, l'Èlohiym véritable, par le moyen de la repentance de ses péchés. Cette foi salvatrice est un don de Dieu, fondée sur Sa Parole infaillible.</p>

      <h3>La Foi chrétienne a-t-elle une source ?</h3>

      <p>La foi chrétienne a une source sûre et incontestable : la Parole de Yehowshuw'a ha-Mashiyah appelée la Bible :</p>

      <blockquote>
        <p>Ainsi la foi vient de ce qu'on entend, et l'on entend par le moyen de la Parole d'Elohîm.</p>
        <cite>Romains 10 : 17</cite>
      </blockquote>

      <h3>Excepté cette approche, existe-t-il d'autres manières de concevoir la Foi ?</h3>

      <h4>1. La Foi, espérance de Salut</h4>

      <p>Dans ce contexte, la Foi est la garantie certaine et la conviction profonde qu'un enfant d'Èlohiym possède qu'il est sauvé. Cette espérance nous est donnée par le Seigneur Yehowshuw'a ha-Mashiyah le jour où nous naissons d'en-haut :</p>

      <blockquote>
        <p>Car vous êtes sauvés par la grâce, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don d'Elohîm. Cela ne vient pas des œuvres, afin que personne ne se glorifie.</p>
        <cite>Éphésiens 2 : 8-9</cite>
      </blockquote>

      <p>Cette espérance demeure dans notre vie tant que le chrétien a une vie de prière, de méditation quotidienne de la Parole d'Èlohiym, une vie de sanctification, et qu'il s'attache fermement aux promesses qui y sont consignées. Les seules choses qui peuvent briser cette espérance sont le péché et les fausses doctrines.</p>

      <p>La Foi n'est pas une sensation que l'on ressent mais une assurance qui est produite en nous par le Saint-Esprit :</p>

      <blockquote>
        <p>L'Esprit lui-même rend témoignage à notre esprit, que nous sommes enfants d'Elohîm.</p>
        <cite>Romains 8 : 16</cite>
      </blockquote>

      <h4>2. La Foi, don spirituel</h4>

      <p>Parmi la diversité de dons spirituels qui existent dans le Corps de Mashiyah, le don de Foi trouve également sa place. Ici, ce don n'est pas l'espérance du Salut que tous les chrétiens reçoivent le jour de leur conversion, mais un don puissant accordé par la volonté du Saint-Esprit :</p>

      <blockquote>
        <p>… mais à un autre, la foi par le même Esprit, mais à un autre, les dons de guérisons par le même Esprit.</p>
        <cite>1 Corinthiens 12 : 9 (voir aussi v. 11)</cite>
      </blockquote>

      <p>C'est une capacité spirituelle au moyen de laquelle des choses extraordinaires et irréalisables par l'homme animal<sup class="note-marque" tabindex="0" data-note="L'homme animal est celui qui n'a jamais accepté Yehowshuw'a ha-Mashiyah (Jésus-Christ) comme Seigneur et Sauveur personnel.">2</sup> se réalisent. Les dons d'opérer des miracles au Nom de Yehowshuw'a ha-Mashiyah et les dons de guérisons reposent sur ce don afin de se manifester. C'est par ce don que la puissance des miracles a permis de rendre la vue aux aveugles (Markos [Marc] 10 : 46-52), la parole aux muets (Matthieu 15 : 30-31), l'ouïe aux sourds (Marc 7 : 32-37), faire marcher des paralytiques (Matthieu 9 : 1-8).</p>

      <h4>3. La Foi, ensemble de la doctrine apostolique</h4>

      <p>Dans l'épître de l'apôtre Yehuwdah (Jude), il est écrit :</p>

      <blockquote>
        <p>Bien-aimés, je le fais en toute hâte en vous écrivant au sujet de notre Salut commun, je me suis trouvé dans la nécessité de vous écrire afin de vous exhorter à combattre pour la foi qui a été donnée une fois pour toutes aux saints.</p>
        <cite>Yéhouda [Jude] 1 : 3</cite>
      </blockquote>

      <p>L'apôtre Yehuwdah présente ici la foi comme un ensemble doctrinal pour lequel nous devons lutter : la saine doctrine.</p>

      <p>Dans cette Foi, nous présenterons deux aspects complémentaires : <strong>la Foi scripturaire</strong> (l'ensemble des écrits bibliques) et <strong>la Foi audible</strong>.</p>

      <h4>a. La Foi scripturaire</h4>

      <p>Elle représente l'ensemble de la doctrine apostolique, c'est-à-dire tous les enseignements de Yehowshuw'a ha-Mashiyah et ceux des apôtres (Actes 2 : 42 ; Éphésiens 4 : 1-6 ; Hébreux 6 : 1-3) qui sont le socle de notre espérance. Comme il est écrit :</p>

      <blockquote>
        <p>Ainsi la foi vient de ce qu'on entend, et l'on entend par le moyen de la Parole d'Elohîm.</p>
        <cite>Romains 10 : 17</cite>
      </blockquote>

      <p>Nous pouvons et devons croire en elle et en toutes ses promesses, en accord avec l'enseignement des apôtres, sans l'ombre d'un doute, car elle est digne de confiance. Cette Foi est certaine et véritable pour tous, puisqu'elle s'appuie directement sur ce qui est écrit.</p>

      <p>Cependant, il faut faire très attention aux promesses de l'Ancienne et de la Nouvelle Alliance : sorties de leur contexte et mal interprétées, elles peuvent causer plus de mal que de bien.</p>

      <p><strong>Exemple :</strong> un passage favori que les chrétiens aiment brandir est celui de Devarim [Deutéronome] 28 : 13 :</p>

      <blockquote>
        <p>YHWH te mettra à la tête et non à la queue, tu seras toujours en haut et tu ne seras jamais en bas, quand tu obéiras aux commandements de YHWH, ton Elohîm, que je t'ordonne aujourd'hui, d'observer et de pratiquer.</p>
        <cite>Devarim [Deutéronome] 28 : 13</cite>
      </blockquote>

      <p>Dans le contexte de ce verset, Moshèh (Moïse), avant de mourir, rappelle la Tôrah aux enfants de Yisra'él de l'autre côté du Yarddén (Jourdain), dans la région aride, vis-à-vis de Suwf, Pa'ran, Tophèl, Lavan, Chatsérot et Diy-Zahav (Devarim [Deutéronome] 1 : 1) avant leur entrée à Ken'aan pour la conquête. Il énumère les bénédictions et les malédictions qui sont susceptibles de leur arriver s'ils obéissent ou pas aux commandements d'Èlohiym.</p>

      <p>Nous comprenons que ces Paroles ne peuvent être attribuées aux chrétiens car elles étaient adressées spécifiquement aux enfants de Yisra'él.</p>

      <p><strong>Autre exemple :</strong> Malachie 3 : 10-11 :</p>

      <blockquote>
        <p>Apportez toutes les dîmes aux magasins, afin qu'il y ait de la provision dans ma maison. Éprouvez-moi à ce sujet, dit YHWH Sabaoth, si je ne vous ouvre pas les écluses des cieux et si je ne répands pas en votre faveur la bénédiction, jusqu'à ce qu'il n'y ait plus assez de place. Et je réprimanderai par amour pour vous celui qui dévore, et il ne vous détruira pas les fruits de la Terre, et vos vignes ne seront pas stériles dans la campagne, a dit YHWH Sabaoth.</p>
        <cite>Malachie 3 : 10-11</cite>
      </blockquote>

      <p>Ce passage est pris à tort par des prédicateurs pour justifier le paiement de la dîme. En effet, la maison dont il est question dans le passage cité ci-dessus fait référence au magasin qui existait dans le Temple de Yeruwshalaïm — bâti par Shlomoh (Salomon) fils de David (Néhémie 10 : 36-40) — où l'on stockait les vivres pour les prêtres (ou les sacrificateurs). La dîme n'existait qu'à cause du Temple. Mais dès lors que le Temple de YHWH a été détruit en l'an 70 après J.-C. par le général romain Titus Flavius Sabinus Vespasianus, le cadre lévitique et sacrificiel qui justifiait la dîme a disparu. Ainsi, selon cette perspective, la dîme n'a plus de raison d'être dans la Nouvelle Alliance.</p>

      <p>Un autre passage mal compris qui cause des dommages dans la vie des hommes est celui de Yohanan [Jean] 14 : 12 :</p>

      <blockquote>
        <p>Amen, amen, je vous le dis : Celui qui croit en moi fera les œuvres que je fais, et il en fera de plus grandes que celles-ci, parce que je m'en vais vers mon Père.</p>
        <cite>Yohanan [Jean] 14 : 12</cite>
      </blockquote>

      <p>C'est une promesse du Seigneur Yehowshuw'a ha-Mashiyah à ses disciples. En entendant cette parole, toutes choses semblent possibles à celui qui croit. Mais comme nous l'avons dit, une mauvaise interprétation de cette parole engendre des problèmes importants. Sur la base de ce passage, si une personne essaye d'aller marcher sur les eaux sans avoir reçu une parole claire venant du Seigneur, elle se noiera, mourra et ira en enfer car il a fait une chose qui ne lui a pas été demandée.</p>

      <p>Par exemple, c'est ce qui causa la perte d'un pasteur d'origine camerounaise d'une église dite de réveil, qui ayant mal interprété ce passage mourut noyé dans les eaux du Gabon<sup class="note-marque" tabindex="0" data-note="Lien de l'article : https://www.afrikmag.com/pasteur-se-noie-en-voulant-marcher-sur-leau-jesus/">3</sup>. L'application de certains versets dans la vie des chrétiens nécessite une parole venant directement du Seigneur. C'est ce que nous appelons la Foi audible.</p>

      <h4>b. La Foi audible / conviction</h4>

      <p>À la différence de la Foi scripturaire, la Foi audible/conviction s'appuie sur ce que l'enfant d'Èlohiym reçoit du Seigneur Yehowshuw'a ha-Mashiyah lui-même. Cela peut lui avoir été communiqué par parole de connaissance, dans un songe ou une vision, par prophétie, conviction, etc. C'est cette Foi que le prophète 'Eliyahuw (Élie) manifesta lorsqu'il parut devant 'Ach'av (Achab), roi de Yisra'él :</p>

      <blockquote>
        <p>Alors Eliyah le Thishbite, d'entre les habitants de Galaad, dit à Achab : YHWH, l'Elohîm d'Israël, en la présence duquel je me tiens, est vivant ! Il n'y aura ces années-ci ni rosée ni pluie, sauf sur la parole de ma bouche.</p>
        <cite>1 Rois 17 : 1</cite>
      </blockquote>

      <p>Cette parole d'autorité prononcée par le prophète eut réellement son accomplissement (1 Rois 18 : 1 ; Jacques 5 : 17-18). Mais pour que cette parole ait de l'effet, 'Èlohiym des Cieux, Yehowshuw'a ha-Mashiyah, a dû mettre son sceau derrière. Il n'y a aucun commandement dans la Tôrah qui donne lieu à l'accomplissement de telles choses. Cela relève bien de la relation que le prophète 'Eliyahuw avait avec 'Èlohiym YHWH. Mais cette foi n'engage que le prédicateur lui-même. Ainsi, avant d'exercer sa Foi, le disciple doit se rassurer que cette parole vienne vraiment de Lui, de peur d'être induit en erreur. La particularité de cette foi est qu'elle ne vient pas en opposition à l'ensemble des écrits apostoliques. Au contraire, elle la confirme :</p>

      <blockquote>
        <p>Mais si un prophète prophétise la paix, c'est quand arrivera la parole de ce prophète qu'il sera reconnu comme véritablement envoyé par YHWH.</p>
        <cite>Yirmeyah [Jérémie] 28 : 9</cite>
      </blockquote>

      <p>Et :</p>

      <blockquote>
        <p>S'il s'élève au milieu de toi un prophète ou un rêveur de rêve, qui te donne un signe ou un miracle, que ce signe ou ce miracle dont il t'a parlé arrive, s'il te dit : Allons après d'autres elohîm que tu ne connais pas, et servons-les ! Tu n'écouteras pas les paroles de ce prophète ni de ce rêveur de rêve, car YHWH, votre Elohîm, vous met à l'épreuve pour savoir si vous aimez YHWH, votre Elohîm, de tout votre cœur et de toute votre âme. Vous marcherez après YHWH, votre Elohîm, vous le craindrez, vous garderez ses commandements, vous obéirez à sa voix, vous le servirez et vous vous attacherez à lui.</p>
        <cite>Devarim [Deutéronome] 13 : 2-5</cite>
      </blockquote>

      <h4>4. La Foi agissante</h4>

      <p>Ce sont les actions que les chrétiens posent parce qu'ils ont cru au Seigneur Yehowshuw'a ha-Mashiyah :</p>

      <blockquote>
        <p>Car nous sommes son ouvrage, ayant été créés en Yéhoshoua Mashiah pour les bonnes œuvres qu'Elohîm a préparées d'avance, afin que nous marchions en elles.</p>
        <cite>Éphésiens 2 : 10</cite>
      </blockquote>

      <p>De notre Foi découlent des œuvres que nous faisons pour notre Père. Voici la recommandation (Yohanan [Jean] 14 : 12) :</p>

      <blockquote>
        <p>Amen, amen, je vous le dis : Celui qui croit en moi fera les œuvres que je fais, et il en fera de plus grandes que celles-ci, parce que je m'en vais vers mon Père.</p>
        <cite>Yohanan [Jean] 14 : 12</cite>
      </blockquote>

      <p>Les œuvres dont parle le Seigneur peuvent se regrouper en trois catégories : <strong>le soutien des frères et des sœurs, le soutien financier de l'œuvre et le soutien spirituel</strong>.</p>

      <h4>a. Soutenir des frères et des sœurs</h4>

      <p>Il est question de l'assistance que nous devons manifester envers les frères et les sœurs et des personnes non chrétiennes qui sont dans le besoin (1 Yohanan [Jean] 3 : 17-18) :</p>

      <blockquote>
        <p>Mais celui qui possède les biens de ce monde, et qui voit son frère dans le besoin, et qui lui ferme ses entrailles, comment l'amour d'Elohîm demeure-t-il en lui ? Mes petits-enfants, n'aimons pas en parole, ni avec la langue, mais en œuvre et vérité.</p>
        <cite>1 Yohanan [Jean] 3 : 17-18</cite>
      </blockquote>

      <blockquote>
        <p>Mes frères, que servira-t-il à quelqu'un de dire qu'il a la foi, s'il n'a pas les œuvres ? Cette foi peut-elle le sauver ? Et si un frère ou une sœur sont nus et manquent de la nourriture de chaque jour, et que l'un d'entre vous leur dise : Allez en paix, chauffez-vous et rassasiez-vous ! et que vous ne leur donniez pas les choses nécessaires pour le corps, que leur servira cela ? De même aussi la foi, si elle n'a pas les œuvres, est morte en elle-même.</p>
        <cite>Yaacov [Jacques] 2 : 14-17 (voir aussi Galates 2 : 10 ; 6 : 6-10 ; 1 Yôhanan [Jean] 4 : 17-21)</cite>
      </blockquote>

      <h4>b. Soutenir financièrement l'œuvre</h4>

      <p>L'implication des finances dans une œuvre permet que le Royaume des Cieux, par le moyen des visions données aux enfants d'Èlohiym, avance :</p>

      <blockquote>
        <p>Mais en ce qui concerne la collecte pour les saints, faites comme je l'ai ordonné aux assemblées de Galatie. Un Shabbat, que chacun de vous mette à part chez lui quelque chose, accumulant selon qu'il aura prospéré, afin qu'on n'attende pas mon arrivée pour faire les collectes. Et quand je serai venu, j'enverrai avec des lettres ceux que vous aurez éprouvés pour porter votre don qui résulte de la grâce à Yeroushalaim.</p>
        <cite>1 Corinthiens 16 : 1-3</cite>
      </blockquote>

      <p>Grâce au financement des œuvres en toute liberté, nous pouvons imprimer des ouvrages, acheter du matériel audiovisuel pour la diffusion massive de l'Évangile et autres besoins (Mishlei [Proverbes] 3 : 27-28 ; Qoheleth [Ecclésiaste] 10 : 19 ; Markos [Marc] 12 : 41-44 ; Loukas [Luc] 21 : 1-4 ; Actes 4 : 32-37 ; 2 Corinthiens 9 : 1-3). Bien évidemment, tous les avares ne seront pas bénis dans leurs œuvres (1 Corinthiens 6 : 9-10 ; 2 Corinthiens 9 : 6).</p>

      <h4>c. Soutenir les frères et sœurs sur le plan spirituel</h4>

      <p>Il est question de mettre au service des uns et des autres les dons spirituels que nous avons reçus pour l'édification :</p>

      <blockquote>
        <p>Or il y a diversité de dons, de grâces, mais c'est le même Esprit. Il y a aussi diversité de services, mais c'est le même Seigneur. Il y a aussi diversité d'opérations, mais c'est le même Elohîm qui opère toutes choses en tous. Or à chacun est donnée la manifestation de l'Esprit pour l'utilité commune.</p>
        <cite>1 Corinthiens 12 : 4-7</cite>
      </blockquote>

      <blockquote>
        <p>Que chacun de vous rende service aux autres selon le don de grâce qu'il a reçu, comme de bons gestionnaires des diverses grâces d'Elohîm.</p>
        <cite>1 Petros [1 Pierre] 4 : 10 (voir aussi Markos [Marc] 16 : 16-18 ; 1 Corinthiens 14 : 12 ; Romains 12 : 3-8 ; Éphésiens 4 : 11-16)</cite>
      </blockquote>

      <h3>Mais qu'est-ce que la Foi n'est pas ?</h3>

      <p>Tout d'abord, la Foi n'est pas de la crédulité. En d'autres termes, être croyant de Yehowshuw'a ha-Mashiyah ne signifie nullement se laisser duper, tromper ou être dépourvu de sens critique et de réflexion. La vraie foi est cohérente, car elle prend appui sur les promesses et la fidélité d'Èlohiym. L'Écriture nous montre l'exemple des chrétiens de Bérée :</p>

      <blockquote>
        <p>Or ceux-ci avaient des sentiments plus nobles que ceux de Thessalonique. Ils reçurent la parole avec tout empressement, examinant tous les jours les Écritures pour voir s'il en était bien ainsi.</p>
        <cite>Actes 17 : 11 (voir aussi Luc 16 : 1-8 ; 1 Corinthiens 4 : 6 ; Hébreux 1 : 1-3 ; 1 Yôhanan [Jean] 4 : 1-3 ; Apocalypse 22 : 18-19)</cite>
      </blockquote>

      <p>De plus, la Foi ne saurait être assimilée à de l'optimisme ou de l'idéalisme, c'est-à-dire que la Foi n'est pas une forme de disposition irraisonnée, un espoir opiniâtre qui, malgré les difficultés, laisse croire que les choses finiront toujours par s'arranger, par s'améliorer. Par exemple, quoique nous fassions, plusieurs hommes seront toujours séduits par les fausses doctrines :</p>

      <blockquote>
        <p>Mais l'Esprit dit expressément que dans les derniers temps, certains s'éloigneront de la foi, s'attachant à des esprits trompeurs et à des doctrines de démons.</p>
        <cite>1 Timothée 4 : 1 (voir aussi Marc 13 : 3-13 ; Luc 21 : 8-19 ; Matthieu 24 : 1-15 ; 2 Thessaloniciens 2 : 3-8)</cite>
      </blockquote>

      <p>Par ailleurs, <strong>la Foi n'est pas une éducation particulière</strong>, c'est-à-dire un type d'éducation, ni l'adhésion à une culture ou l'accomplissement des pratiques religieuses (Actes 4 : 13 ; 23 : 6-8<sup class="note-marque" tabindex="0" data-note="Extrait de la brochure : « Qu'est-ce que La Foi ? » de S. Fayard, éditée aux éditions Bibles et Publications Chrétiennes, page 8.">4</sup>).</p>

      <p>Enfin, elle n'est pas non plus la recherche d'expériences spirituelles ou mystiques, c'est-à-dire avoir des visions, des songes, avoir des sensations extatiques ou fortes, des influences mystérieuses, ou quelque chose de vague.</p>

      <p>Cependant, il existe une dimension fondamentale souvent passée sous silence qui n'est pas toujours évoquée : <strong>la Foi historique</strong>. En effet, lorsque la Foi est enseignée, elle est presque toujours associée uniquement au domaine du surnaturel. Pourtant, elle s'ancre tout autant dans la réalité physique et factuelle, c'est-à-dire dans des éléments concrets qui viennent légitimer notre assurance en Yehowshuw'a ha-Mashiyah. Ainsi, la Foi historique se définit comme l'ensemble des faits matériels et des preuves tangibles qui viennent consolider, appuyer et confirmer la véracité historique des écrits bibliques.</p>

      <h3>Pourquoi considérons-nous notre Foi comme la seule véritable face aux autres croyances ?</h3>

      <p>Qu'est-ce qui nous permet d'affirmer avec certitude que notre Foi est vraie, tandis que les autres ne sont que des religions ?</p>

      <p>Pour qu'une vérité soit reconnue comme incontestable, elle doit reposer sur des preuves indubitables, agissant comme des arguments d'autorité que nul ne peut réfuter.</p>

      <p>À cet égard, des distinctions majeures s'imposent :</p>

      <ul>
        <li>Contrairement à l'Islam qui ne parle que d'un seul homme sans antécédent ni confirmation postérieure,</li>
        <li>Contrairement aux Védas de l'hindouisme, qui sont essentiellement composés de récits mythologiques et légendaires impossibles à situer géographiquement ou historiquement,</li>
        <li>La Bible, quant à elle, se distingue en étant un livre ancré dans l'histoire humaine. Elle contient plus d'un fait réel, historique, existant encore aujourd'hui.</li>
      </ul>

      <p>L'évangéliste Loukas (Luc), auteur de l'évangile qui porte son nom et des Actes des apôtres, a d'ailleurs mené de rigoureuses investigations pour consigner un récit historique fiable et digne de foi afin d'authentifier les propos de ses prédécesseurs, les apôtres, et pour laisser sans voix tous les détracteurs de l'Évangile :</p>

      <blockquote>
        <p>Parce que beaucoup se sont appliqués à mettre par ordre un récit des événements qui ont été pleinement certifiés parmi nous, conformément à ce que nous ont transmis ceux qui, dès le commencement, sont devenus témoins oculaires et serviteurs de la Parole. Il m'a semblé bon, à moi aussi, qui ai suivi exactement toutes ces choses dès l'origine, de te les écrire dans leur ordre, très excellent Theophilos, afin que tu reconnaisses la sûreté des paroles que l'on t'a enseignées oralement.</p>
        <cite>Luc 1 : 1-4</cite>
      </blockquote>

      <p>Il poursuit dans son second ouvrage :</p>

      <blockquote>
        <p>En effet, j'ai fait le premier discours, ô Theophilos, sur toutes les choses que Yéhoshoua commença de faire et d'enseigner, jusqu'au jour où il fut enlevé, après avoir donné par le Saint-Esprit ses ordres aux apôtres qu'il avait élus.</p>
        <cite>Actes 1 : 1-2</cite>
      </blockquote>

      <p>Nous constatons que Loukas ne s'est pas contenté de compiler passivement des témoignages oraux auprès des témoins oculaires pour rédiger ses livres ; il a effectué un véritable travail de recherche documentaire et historique pour asseoir la solidité de ses écrits.</p>

      <h3>Quelles Paroles d'Èlohiym font-elles effet jusqu'aujourd'hui ?</h3>

      <p>Pour répondre pleinement à cette question, il convient de parcourir la quasi-totalité des livres de l'Ancienne Alliance. Toutefois, nous pouvons dégager quelques exemples particulièrement saisissants. Dans les Écritures, Yehowshuw'a ha-Mashiyah, l'Èlohiym des Cieux, met au défi tous les faux 'èlohiym de prédire l'avenir et d'annoncer des événements qui s'accompliront infailliblement dans le temps. Mais malheureusement, aucune divinité jusqu'à ce jour n'a pu relever le défi. À part Yehowshuw'a ha-Mashiyah, il n'y a pas d'autres 'èlohiym :</p>

      <blockquote>
        <p>Ainsi parle YHWH, le roi d'Israël et son Rédempteur, YHWH Sabaoth : Je suis le premier, et je suis le dernier. En dehors de moi, il n'y a pas d'elohîm. Et qui, comme moi, a appelé, déclaré et ordonné cela, depuis que j'ai établi le peuple ancien ? Qu'ils déclarent les choses à venir, les choses qui arriveront ci-après !</p>
        <cite>Yesha'yah [Esaïe] 44 : 6-8 (voir aussi Yesha'yah [Esaïe] 41 : 21-29 ; 43 : 8-19 ; 46 : 8-13)</cite>
      </blockquote>

      <h4>Prophéties accomplies concernant Yisra'él</h4>

      <p>Dans le livre de Devarim (Deutéronome) 28 : 49-58, le prophète Moshèh prophétise la chute et les déportations des deux royaumes hébreux : le royaume de Yisra'él (au Nord) et le royaume de Yehuwdah (au Sud). Cette parole, annoncée au XV<sup>e</sup> siècle avant J.-C., s'est accomplie deux fois dans le temps :</p>

      <ol>
        <li><strong>Le premier accomplissement</strong> de cette parole eut lieu en 587 avant J.-C., lorsque le roi de Bavèl (Babylone) Nevukadnè'tstsar vint détruire la ville et le Temple de Yeruwshalaïm.</li>
        <li><strong>Et le deuxième accomplissement</strong> de cette prophétie eut lieu lorsque le général romain Titus Flavius Sabinus Vespasianus, fils de l'empereur Vespasien, lors de la première guerre judéo-romaine, est venu détruire, saccager et piller la ville et le Temple de Yeruwshalaïm en l'an 70 après J.-C.</li>
      </ol>

      <p>Par ailleurs, Moshèh avait prédit que, lors de ces terribles sièges, la détresse serait telle que les mères mangeraient leurs enfants. Le prophète Yirmeyahuw a confirmé la réalisation de cette prophétie lors de la chute de Bavèl :</p>

      <blockquote>
        <p>[Yod] Les mains des femmes compatissantes font cuire leurs enfants. Ils leur servent de nourriture dans la ruine de la fille de mon peuple.</p>
        <cite>Eikha [Lamentations de Jérémie] 4 : 10</cite>
      </blockquote>

      <p>De la même manière, l'historien Flavius Josèphe rapporte que ce fléau s'est répété de façon effroyable sous le siège de Titus :</p>

      <blockquote>
        <p>Toutes les affections naturelles disparaissaient dans cette misère horrible. Les parents arrachaient la nourriture à leurs enfants, et les enfants à leurs parents ; les maris l'enlevaient à leurs femmes, et les femmes à leurs maris. Une bande d'hommes armés qui parcouraient les rues de la ville, en quête d'aliments, furent attirés par l'odeur d'un mets que l'on faisait cuire. C'était dans la demeure d'une dame riche, de haute naissance, Marie, femme d'Eléazar. Ils entrèrent et exigèrent qu'on leur apporte cette nourriture qu'ils ont sentie. Marie s'avança vers eux, la tenant dans ses mains, mais ces hommes endurcis au mal défaillirent en voyant les restes de son propre enfant dont elle avait mangé elle-même une partie. « Mangez », s'écria-t-elle, « puisque moi j'ai mangé ; ne soyez pas plus délicats qu'une mère. Mais si vous êtes trop religieux pour toucher un tel mets, laissez-m'en le reste ». Saisis d'horreur, ils s'enfuirent.<sup class="note-marque" tabindex="0" data-note="Extrait du livre : « L'Église : une esquisse de son histoire pendant vingt siècles », pages 210-211. Publié et imprimé aux Éditions Bibles et traités chrétiens, Vevey, en Suisse en 1972.">5</sup></p>
      </blockquote>

      <p>La suite de Devarim (Deutéronome 28 : 64-68) annonce la dispersion complète de Yisra'él parmi toutes les nations. Ce fut d'abord le cas pour le royaume de Yisra'él, déporté en 721 avant J.-C. par l'Empire d'Ashshuwr (Assyrie) (2 Rois 17 : 5-23), puis pour celui de Yehuwdah sous l'égide de Bavèl (2 Rois 25 : 1-21 ; Jérémie 39 : 1-10). Enfin, à la suite de la révolte de Bar Kokhba en 132-135 après J.-C., l'empereur romain Hadrien fit massacrer une multitude de Juifs et déporta les survivants à travers tout l'Empire, leur interdisant définitivement l'accès à Yeruwshalaïm.</p>

      <h4>Le retour des enfants de Yisra'él</h4>

      <p>Pourtant, bien avant ces exils successifs, de nombreux prophètes avaient annoncé que Yehowshuw'a ha-Mashiyah, l'Èlohiym des Cieux, rassemblerait un jour les enfants de Yisra'él pour les ramener sur leur propre terre (Yesha'yahuw [Esaïe] 11 : 11-12 ; 43 : 5-6 ; Jérémie 16 : 14-16 ; 30 : 3 ; Yehèzqé'l [Ézéchiel] 11 : 17 ; 36 : 24 ; 37 : 21).</p>

      <h4>Kena'an, terre des enfants de Yisra'él</h4>

      <p>Bien que la souveraineté sur la terre d'Israël soit aujourd'hui au cœur de tensions et de conflits géopolitiques majeurs, les Écritures saintes démontrent sans équivoque que la terre promise aux patriarches 'Avraham, Yitshaq (Isaac) et Ya'aqov (Jacob) appartient de droit divin à la descendance de Yisra'él (Genèse 17 : 8 ; 28 : 4 ; 48 : 4 ; Devariym [Deutéronome] 34 : 4).</p>

      <h4>La restauration de l'État de Yisra'él</h4>

      <p>En plus de promettre le retour physique du peuple hébreu, 'Èlohiym a non seulement promis de ramener son peuple sur la Terre des Patriarches, mais également annoncé la renaissance politique soudaine et inattendue de cette nation comme un Olivier :</p>

      <blockquote>
        <p>Elle a enfanté, avant d'éprouver les douleurs de l'accouchement, elle a donné naissance à un enfant mâle, avant que les douleurs de l'enfantement ne lui viennent. Qui a déjà entendu une telle chose ? Qui a déjà vu quelque chose de semblable ? Un pays peut-il naître en un jour ? Ou une nation peut-elle naître d'un seul coup ? Pourtant dès que Sion a été en travail, elle a enfanté ses enfants ! Moi qui fais enfanter les autres, ne ferais-je pas enfanter Sion ? dit YHWH. Moi qui donne de la postérité aux autres, l'empêcherais-je d'enfanter ? dit ton Elohîm.</p>
        <cite>Yesha'yah [Esaïe] 66 : 6-9</cite>
      </blockquote>

      <p>Cette prophétie grandiose a été proclamée au VIII<sup>e</sup> siècle avant J.-C. De manière spectaculaire, elle s'est accomplie à la lettre dans la nuit du 14 au 15 mai 1948, jour où David Ben Gourion proclama officiellement la renaissance de l'État de Yisra'él en une seule journée.</p>

      <h4>Le Mur de Lamentation ou Mur occidental</h4>

      <p>Ce mur historique constitue le vestige physique le plus célèbre témoignant de la grandeur passée du Temple de Yeruwshalaïm. Il convient de préciser qu'il s'agit du mur de soutènement de l'esplanade du Second Temple, agrandie par Hérode le Grand. Ce lieu demeure un témoin historique majeur du Temple reconstruit après le retour d'exil de Babylone (Ezra [Esdras] 1 : 1-3 ; 2 Hayyamim [Chroniques] 36 : 22-23).</p>

      <h4>Le livre du prophète Yesha'yahuw (Esaïe) retrouvé dans les grottes de Qumrân</h4>

      <p>Parmi les manuscrits de la mer Morte découverts en 1947 dans la grotte 1 de Qumrân, figure le célèbre <strong>Grand Rouleau d'Esaïe</strong> (1QIsa<sup>a</sup>). Cette découverte est d'une valeur inestimable tant pour l'archéologie que pour la critique textuelle de la Bible. Datant du II<sup>e</sup> siècle avant J.-C., ce manuscrit entièrement rédigé en hébreu contient l'intégralité des 66 chapitres du livre de Yesha'yah [Esaïe]. Mesurant 7,34 mètres de long pour une hauteur de 25,3 à 27 cm, le texte y est réparti sur 54 colonnes. Il est précieusement conservé aujourd'hui au Sanctuaire du Livre, au sein du Musée d'Israël à Jérusalem-Ouest<sup class="note-marque" tabindex="0" data-note="Extrait du site Wikipédia sur le mot « Grand Rouleau d'Isaïe ».">6</sup>.</p>

      <h3>Conclusion</h3>

      <p>Que toute la Gloire et l'honneur soient rendus à Yehowshuw'a ha-Mashiyah pour toute la force et la grâce qu'il nous accorde pour vous présenter ce travail. Amen !</p>

      <p>Nous prions que le Seigneur puisse, par cet enseignement, vous affermir dans ses voies et qu'il fortifie votre foi, qu'il la rende plus stable et inébranlable contre tous les détracteurs de la foi chrétienne au Nom Puissant de Yehowshuw'a ha-Mashiyah. Amen !</p>

      <p style="text-align:right; margin-top:1.5em;"><strong>Mvé Mezui Me Mvé Messila</strong></p>

      <h3>Notes de fin d'ouvrage</h3>
      <ol class="notes-fin">
        <li>Extrait de la Bible de Yéhoshoua Mashiah – 2014</li>
        <li>L'homme animal est celui qui n'a jamais accepté Yehowshuw'a ha-Mashiyah (Jésus-Christ) comme Seigneur et Sauveur personnel.</li>
        <li>Le lien de cet article : <a href="https://www.afrikmag.com/pasteur-se-noie-en-voulant-marcher-sur-leau-jesus/" target="_blank" rel="noopener">https://www.afrikmag.com/pasteur-se-noie-en-voulant-marcher-sur-leau-jesus/</a></li>
        <li>Extrait de la brochure : « Qu'est-ce que La Foi ? » de S. Fayard, éditée aux éditions Bibles et Publications Chrétiennes, page 8.</li>
        <li>Extrait du livre : « L'Église : une esquisse de son histoire pendant vingt siècles », pages 210-211. Publié et imprimé aux Éditions Bibles et traités chrétiens, Vevey, en Suisse en 1972.</li>
        <li>Extrait du site Wikipédia sur le mot « Grand Rouleau d'Isaïe ».</li>
      </ol>

      <p class="sources-illu"><strong>Sources des illustrations :</strong><br>
        • Tôrah — image libre de droit : <a href="https://pixabay.com/images/search/torah/?pagi=2" target="_blank" rel="noopener">Pixabay</a><br>
        • Rouleau du prophète Yesha'yah (Esaïe) : <a href="https://fr.wikipedia.org/wiki/Grand_Rouleau_d%27Isa%C3%AFe" target="_blank" rel="noopener">Wikipédia — Grand Rouleau d'Isaïe</a>
      </p>
`;

// Localiser le bloc de l'article (id peut contenir un espace)
const startMarker = 'id: "la-foi-en-elo hiym"';
const startIdx = html.indexOf(startMarker);
if (startIdx === -1) {
  console.error('Article introuvable (id: la-foi-en-elo hiym)');
  process.exit(1);
}

// Trouver le début de contenuHtml pour cet article
const contenuStart = html.indexOf('contenuHtml: `', startIdx);
if (contenuStart === -1) {
  console.error('contenuHtml introuvable');
  process.exit(1);
}

// Trouver la fin du template literal : `\n  },\n  {\n    id: "les-traditions"
const afterContenu = contenuStart + 'contenuHtml: `'.length;
// Chercher la fin : le backtick qui ferme contenuHtml, suivi de \n  },
const endPattern = '`\n  },\n  {\n    id: "les-traditions"';
const endIdx = html.indexOf(endPattern, afterContenu);
if (endIdx === -1) {
  console.error('Fin de contenuHtml introuvable (les-traditions)');
  process.exit(1);
}

const before = html.slice(0, afterContenu);
const after = html.slice(endIdx); // commence par `

// Aussi corriger l'id (espace indésirable) et enrichir la description
let newBefore = before;
// Corriger id dans le bloc avant contenuHtml
const articleBlock = html.slice(startIdx, afterContenu);
const fixedArticleMeta = articleBlock
  .replace('id: "la-foi-en-elo hiym"', 'id: "la-foi-en-elohiym"')
  .replace(
    'description: "Comprendre la nature, le fondement et la puissance de la foi biblique en Èlohiym, selon les enseignements apostoliques."',
    'description: "Doc/001/01-2 — Nature, source et facettes de la foi biblique : espérance de salut, don spirituel, doctrine apostolique, foi agissante et preuves historiques."'
  );

const newHtml =
  html.slice(0, startIdx) +
  fixedArticleMeta +
  contenuHtml +
  after;

// Remplacer aussi toutes les références éventuelles à l'ancien id avec espace
const finalHtml = newHtml.split('la-foi-en-elo hiym').join('la-foi-en-elohiym');

fs.writeFileSync(indexPath, finalHtml, 'utf8');
console.log('OK — article « La Foi en Èlohiym » mis à jour.');
console.log('Taille contenuHtml :', contenuHtml.length, 'caractères');
console.log('Taille fichier :', finalHtml.length, 'caractères');
