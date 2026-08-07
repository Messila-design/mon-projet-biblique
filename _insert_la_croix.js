const fs = require('fs');
const path = require('path');

const INDEX_PATH = 'C:/Users/Messila/Downloads/lamed_code/index.html';
const IMG_COVER = 'C:/Users/Messila/Downloads/lamed_code/images - la croix/image du projet.jpg';

const imgBuf = fs.readFileSync(IMG_COVER);
const imgB64 = imgBuf.toString('base64');
const coverDataUri = 'data:image/jpeg;base64,' + imgB64;

const contenu = `
      <p><em>Bonjour, bonsoir à tous,</em></p>
      <p>Des religions de mystère au christianisme moderne, un symbole de piété est l'objet d'une attention particulière, même d'une adoration quasi-divine&nbsp;: la croix. Cet objet formé d'une poutre verticale et d'une traverse, où souvent le <em>Mashiyaḥ</em> (Christ) est représenté décharné et dénudé, a été adopté par le christianisme comme symbole de sa crucifixion depuis le IV<sup>è</sup> siècle. Cependant, cette croix est-elle d'origine chrétienne&nbsp;? Quels sens le Seigneur et les apôtres donnaient à la croix&nbsp;?</p>
      <p>Par la présente étude biblique, nous voulons démontrer qu'en réalité, cet objet, dépourvu de toute substance divine, a été emprunté au paganisme des nations pour en faire un objet de vénération, voire de prostitution spirituelle au sein de l'Église.</p>

      <h3>Les origines</h3>
      <p>Longtemps considéré comme un symbole purement chrétien, la croix, qui n'a été instituée ni par le Seigneur <em>Yehowshuw'a ha-Mashiyaḥ</em> (Jésus-Christ) ni par ses apôtres, trouve en réalité ses origines dans les traditions de l'ancienne <em>Bavèl</em> (Babylone). Et selon les peuples et les cultures, sa forme varie.</p>
      <p>À Bavèl, l'<em>èlohiym</em> (dieu) Tammuz dont nous parle la Bible (Ézéchiel 8&nbsp;: 14), était symbolisé par «&nbsp;Tau&nbsp;»<sup class="note-marque" tabindex="0" data-note="Lettre finale de l'alphabet hébraïque (ת). Le mot &laquo;&nbsp;Tau&nbsp;&raquo; a la même forme que la lettre T latine. Le dieu mésopotamien Tammuz était adoré sous ce symbole dès l'Antiquité.">1</sup> (ת), la dernière lettre de l'alphabet hébraïque&nbsp;:</p>
      <blockquote>
        <p>Ce qu'on appelle maintenant la croix du christianisme n'était nullement à l'origine un emblème chrétien, c'était le <em>Tau</em> mystique des Chaldéens et des Égyptiens, la vraie forme première de la lettre T, l'initiale du nom de Tammuz, qui, en hébreu, est absolument la même que dans l'ancien chaldéen&nbsp;; on la trouvait sur les monnaies&nbsp;; et en étrurien et en copte.</p>
        <cite>Tertullien — <em>Apologétique</em>, XVI<sup class="note-marque" tabindex="0" data-note="Tertullien (vers 155-220), apologète et théologien latin de Carthage. Cette citation figure dans son &laquo;&nbsp;Apologétique&nbsp;&raquo;, chapitre XVI, adressé aux magistrés romains pour défendre les chrétiens.">2</sup></cite>
      </blockquote>

      <h3>Les différents types de croix (dans les religions)</h3>
      <p>Dans l'histoire du monde, plusieurs formes de croix ont existé, variant selon les traditions&nbsp;:</p>
      <p><strong>L'Ankh&nbsp;:</strong> une Croix en T surmontée d'une boucle. Elle est d'origine de l'Égypte ancienne dont la signification est la vie éternelle, la vitalité, l'union des opposés.</p>
      <figure class="etude-figure-inline">
        <img src="images - la croix/image 1.jpg" alt="L'Ankh — croix égyptienne surmontée d'une boucle" loading="lazy">
        <figcaption>L'<em>Ankh</em> — symbole égyptien de la vie éternelle</figcaption>
      </figure>
      <p><strong>La croix solaire&nbsp;:</strong> Croix égale inscrite dans un cercle. Elle est d'origine indo-européenne dont la signification est le soleil, les cycles cosmiques, les points cardinaux.</p>
      <figure class="etude-figure-inline">
        <img src="images - la croix/image 2.jpg" alt="La croix solaire inscrite dans un cercle" loading="lazy">
        <figcaption>La <em>croix solaire</em> — symbole indo-européen des cycles cosmiques</figcaption>
      </figure>
      <p><strong>Swastika (ou la croix gammée)&nbsp;:</strong> Croix à bras coudés. Elle est d'origine Inde (hindouisme, bouddhisme, jaïnisme), Asie, Europe ancienne dont la signification est la bonne fortune, le cycle éternel, le soleil&nbsp;; détournée au XX<sup>è</sup> siècle.</p>
      <figure class="etude-figure-inline">
        <img src="images - la croix/image 3.jpg" alt="La swastika ou croix gammée à bras coudés" loading="lazy">
        <figcaption>La <em>swastika</em> (croix gammée) — symbole de bon augure dans l'Inde ancienne</figcaption>
      </figure>
      <p><strong>Tau&nbsp;:</strong> Forme de T. Il est d'origine Mésopotamie (Tammuz), Égypte, judaïsme (lettre <em>taw</em>) dont la signification est la marque divine, la protection (Ézéchiel 9).</p>
      <figure class="etude-figure-inline">
        <img src="images - la croix/image 4.jpg" alt="La lettre Tau (ת) — dernière lettre de l'alphabet hébraïque" loading="lazy">
        <figcaption>Le <em>Tau</em> (ת) — dernière lettre de l'alphabet hébraïque, marque divine en Ézéchiel 9:4</figcaption>
      </figure>
      <p>Voici donc quelques symboles attestés bien avant la période pré-christique. Bien qu'il existe bien d'autres, j'ai choisi ces exemples pour vous montrer que de telles croix existaient déjà à l'époque avant la venue physique de <em>Yehowshuw'a ha-Mashiyaḥ</em>.</p>

      <h3>La croix&nbsp;: instrument de torture chez les Phéniciens, les Carthaginois et les Romains</h3>
      <p>Bien qu'en apparence, la croix puisse sembler si douce et évoquer la mort de notre Seigneur, elle était en réalité un instrument de torture réservé aux esclaves, aux grands criminels de grand chemin et aux prisonniers politiques. La langue latine le rappelle clairement&nbsp;: les mots «&nbsp;la croix&nbsp;» et «&nbsp;le crucifix&nbsp;» dérivent de <em>cruciare</em><sup class="note-marque" tabindex="0" data-note="Du latin &laquo;&nbsp;cruciare&nbsp;&raquo; : &laquo;&nbsp;torturer&nbsp;&raquo;, &laquo;&nbsp;supplicier&nbsp;&raquo;. Le verbe &laquo;&nbsp;crucifier&nbsp;&raquo; en dérive directement, soulignant le caractère purement instrumental et douloureux de la croix dans la culture romaine.">3</sup>, qui signifie «&nbsp;torturer&nbsp;».</p>
      <p>Avant d'être largement pratiquée sous l'empire romain, ce supplice odieux était déjà utilisé par les Perses, les Phéniciens, les Carthaginois. Les Romains l'employaient ensuite en public pour dissuader toutes formes de sédition. Selon les sources historiques, les condamnés étaient torturés avant d'être crucifiés&nbsp;:</p>
      <blockquote>
        <p>Les soldats arrêtèrent des citoyens paisibles, les amenèrent devant Florus, qui les fit d'abord fouetter, puis crucifier. Le nombre de victimes ce jour-là s'éleva à environ 3&nbsp;600, y compris des femmes et des enfants. Florus osa même fouetter et crucifier des hommes de rang équestre.</p>
        <cite>Flavius Josèphe — <em>Guerre des Juifs</em>, II, 18:5<sup class="note-marque" tabindex="0" data-note="Flavius Josèphe (37-100), historien judéo-romain. Ce passage décrit la répression de Florus, procurateur de Judée, contre la population juive de Jérusalem en 66 ap. J.-C.">4</sup></cite>
      </blockquote>
      <blockquote>
        <p>Parmi eux, beaucoup furent tués, beaucoup capturés&nbsp;; il en fit fouetter certains et les attacha aux croix, ceux qui avaient été les chefs de la conspiration, et il en restitua d'autres à leurs maîtres.</p>
        <cite>Flavius Josèphe — <em>Antiquités Judaïques</em>, XVII, 10:10</cite>
      </blockquote>
      <p>Les condamnés pouvaient rester jusqu'à trois jours ou plus avant de mourir. Dans le contexte des évangiles, les Juifs, à cause du shabbat, demandèrent à Ponce Pilate de précipiter la mort des condamnés en leur brisant les jambes&nbsp;:</p>
      <blockquote>
        <p>Alors les Juifs, afin que les corps ne restent pas sur la croix durant le shabbat, parce que c'était la préparation — car le jour de ce shabbat était un grand —, demandèrent à Pilate qu'on leur brise les jambes et qu'on les enlève.</p>
        <cite>Yohanan (Jean) 19&nbsp;: 31 — BYM</cite>
      </blockquote>
      <p>La mort était lente et extrêmement douloureuse. Suspendu par les bras, le poids du corps bloquait mécaniquement la cage thoracique. Pour respirer, la victime devait constamment se redresser en poussant sur ses pieds cloués ou attachés. Épuisé, le supplicié finissait par mourir d'asphyxie.</p>
      <p>Sur le plan de la médecine légale, la sortie de «&nbsp;sang et d'eau&nbsp;» après la mort par crucifixion s'explique par l'accumulation de liquides physiologiques provoquée par le traumatisme et l'asphyxie<sup class="note-marque" tabindex="0" data-note="Description reprise des travaux du Dr William Edwards (1986) et du Dr Pierre Barbet (1937) sur la physiopathologie de la crucifixion. Le péricarde, sous l'effet du stress cardiogénique, se remplit d'un liquide clair (hydropericarde) ; le &laquo;&nbsp;sang et l'eau&nbsp;&raquo; mentionnés en Jean 19:34 correspondent à cette accumulation liquidienne.">5</sup>. Le soldat romain a enfoncé sa lance dans le côté droit du thorax (l'espace intercostal) et cela a provoqué un épanchement péricardique (l'eau)&nbsp;: le stress extrême et le choc cardiogénique entraînent une inflammation du sac entourant le cœur (le péricarde), qui se remplit lui aussi d'un liquide clair (hydropericarde).</p>

      <h3>L'église catholique et la croix païenne</h3>
      <p>La croix fut introduite dans le milieu catholique par le moyen de l'empereur romain Constantin I<sup>er</sup>. En guerre contre son rival Maxence sur le pont de Milvius pour le contrôle de Rome, Constantin I<sup>er</sup>, peu de temps auparavant, eut une vision dans laquelle il vit une croix au ciel et une voix qui lui dit&nbsp;:</p>
      <blockquote>
        <p><em>In hoc signo vinces</em></p>
        <cite>Eusèbe de Césarée — <em>Vie de Constantin</em>, I, 28<sup class="note-marque" tabindex="0" data-note="Eusèbe de Césarée (vers 265-340), évêque et historien de l'Église, est le premier à rapporter cette vision dans sa &laquo;&nbsp;Vie de Constantin&nbsp;&raquo;. La phrase latine signifie : &laquo;&nbsp;Par ce signe, tu vaincras.&nbsp;&raquo; Cet épisode est à l'origine de l'adoption officielle de la croix comme emblème impérial romain.">6</sup></cite>
      </blockquote>
      <p>Ce qui signifie «&nbsp;Par ce signe, tu vaincras&nbsp;». Il fit alors peindre ce signe sur les boucliers de son armée et sortit victorieux de ladite bataille. Plus tard, elle deviendra un symbole officiel du christianisme.</p>

      <h3>Véritable signification de la croix</h3>
      <p>De tout ce qui précède, il apparaît clairement que le sens de la croix est tout autre pour le Seigneur <em>Yehowshuw'a ha-Mashiyaḥ</em> et ses disciples. Il est hors de tout doute que le Seigneur est mort sur une croix&nbsp;:</p>
      <blockquote>
        <p>Mais il s'est vidé de lui-même en prenant la forme d'esclave, en devenant semblable aux humains, et, quant à la figure, étant reconnu comme un être humain, il s'est abaissé lui-même, devenant obéissant jusqu'à la mort, de plus la mort de la croix.</p>
        <cite>Philippiens 2&nbsp;: 7-8</cite>
      </blockquote>
      <p>Cependant, transformer cet instrument en objet d'adoration reviendrait à idolâtrer un morceau de bois, ce qu'<em>Èlohiym</em> hait (Exode 20&nbsp;: 1-7). Dans la Bible, le mot «&nbsp;croix&nbsp;» possède plusieurs sens et revêt avant tout une valeur spirituelle que physique.</p>

      <h4>1. La délivrance par l'œuvre de la croix</h4>
      <p>L'apôtre Paulus présente la croix comme le moyen par lequel le Seigneur a effacé les condamnations qui pesaient sur l'humanité et a vaincu les puissances démoniaques par la croix&nbsp;:</p>
      <blockquote>
        <p>Il a effacé l'acte dont les dogmes étaient contre nous et qui nous était contraire, et il l'a enlevé hors du milieu de nous en le clouant à la croix. Ayant dépouillé les principautés et les autorités, et les a exposées publiquement en spectacle, en triomphant d'elles en lui-même.</p>
        <cite>Colossiens 2&nbsp;: 14-15 — BYM</cite>
      </blockquote>

      <h4>2. La destruction du vieil homme</h4>
      <p>C'est par sa mort sur la croix qu'il a détruit la vieille nature adamique afin que nous qui avons cru en lui, nous demeurions en lui dans la victoire sur la chair, c'est-à-dire notre vieil homme&nbsp;:</p>
      <blockquote>
        <p>Car si nous sommes nés ensemble avec lui en devenant semblables à sa mort, et nous le serons aussi à sa résurrection. Sachant ceci, que notre vieil être humain a été crucifié avec lui, afin que le corps du péché soit inactif et que nous ne soyons plus esclaves du péché.</p>
        <cite>Romains 6&nbsp;: 5-6 — BYM</cite>
      </blockquote>

      <h4>3. Les souffrances à cause de l'Évangile</h4>
      <p>Le Seigneur nous invite à le suivre, quoi qu'il arrive, en portant chaque jour notre croix, c'est-à-dire les souffrances liées à notre foi en lui&nbsp;:</p>
      <blockquote>
        <p>Mais il disait à tous&nbsp;: Si quelqu'un veut venir après moi, qu'il se renie lui-même, qu'il se charge chaque jour de sa croix et qu'il me suive.</p>
        <cite>Luc 9&nbsp;: 23</cite>
      </blockquote>
      <blockquote>
        <p>Tous ceux qui veulent avoir un bel aspect dans la chair, ceux-là vous forcent à vous faire circoncire, seulement afin qu'ils ne soient pas persécutés à cause de la croix du Mashiah.</p>
        <cite>Galates 6&nbsp;: 12</cite>
      </blockquote>
      <blockquote>
        <p>Dorénavant que personne ne me cause d'ennuis, car moi, je porte sur mon corps les stigmates du Seigneur Yéhoshoua.</p>
        <cite>Galates 6&nbsp;: 17</cite>
      </blockquote>

      <p>Nous espérons que cette étude biblique vous a encouragé. Que le Seigneur vous bénisse énormément. Amen&nbsp;!</p>
      <p><em>Shalôm à tous&nbsp;!</em></p>
    `;

const newEntry = `  {
    id: "la-croix",
    titre: "LA CROIX : SYMBOLE PAÏEN OU VOLONTÉ DIVINE ?",
    date: "03/08/2026",
    image: "${coverDataUri}",
    imagePosition: "center 15%",
    contenu: \`${contenu}\`
  },
`;

let html = fs.readFileSync(INDEX_PATH, 'utf8');

const NL = String.fromCharCode(13, 10);
const marker = '    `' + NL + '  }' + NL + '];' + NL;
const idx = html.indexOf(marker);
if (idx < 0) {
  console.error('MARKER NOT FOUND');
  process.exit(1);
}

const insertPos = idx + ('    `' + NL + '  }').length;

html = html.slice(0, insertPos) + ',' + NL + newEntry + html.slice(insertPos);

fs.writeFileSync(INDEX_PATH, html, 'utf8');
console.log('Inserted at offset', insertPos);
console.log('New file size:', html.length);
