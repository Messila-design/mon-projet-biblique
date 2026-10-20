/* ====================================================================
   SQUELLETTES DE PUBLICATION — Laméd
   ====================================================================
   Copiez le bloc correspondant, collez-le dans la ZONE DE CONFIGURATION
   de app.js (recherchez "ZONE DE CONFIGURATION"), puis remplacez les
   valeurs entre crochets.

   Apres avoir publie, lancez dans le dossier du site :
       npm run modele
   Le script verifie que la publication respecte le gabarit.

   -------------------------------------------------------------------
   A. NOUVELLE ETUDE BIBLIQUE (dans ETUDES_BIBLIQUES)
   -------------------------------------------------------------------
   {
     id: "[identifiant-court-en-minuscules]",
     titre: "[TITRE DE L'ETUDE]",
     date: "[jj/mm/aaaa]",
     image: "images/[nom-de-l-image].jpg",
     resume: "[Phrase d'accroche, facultatif.]",
     contenu: `
       <p><em>Bonjour, bonsoir a tous,</em></p>

       <h3>1. Premier chapitre</h3>
       <p>Le texte du premier chapitre. Les notes s'ajoutent ainsi :</p>
       <p>Une phrase avec une note.<sup class="note-marque" tabindex="0" data-note="Texte de la note de bas de page.">1</sup></p>

       <blockquote>
         <p>La citation biblique, dans son texte d'origine.</p>
         <cite>Reference 3:16</cite>
       </blockquote>

       <h3>2. Second chapitre</h3>
       <p>La suite du developpement.</p>

       <h4>Un sous-chapitre</h4>
       <p>Les balises <h4> creent des sous-rubriques dans la table des matieres.</p>

       <p><em>Shalom a tous !</em></p>
     `
   }

   -------------------------------------------------------------------
   B. NOUVEL ARTICLE (dans ARTICLES)
   -------------------------------------------------------------------
   {
     title: "[Titre de l'article]",
     category: "[La Doctrine Apostolique | Propheties bibliques | Doctrines | Les Livres]",
     description: "[Une phrase d'accroche affichee dans les listes.]",
     date: "[jj/mm/aaaa]",
     image: "images/[nom-de-l-image].jpg",
     lien: "https://drive.google.com/file/d/[IDENTIFIANT_DU_FICHIER]/view"
   }

   Pour un article publie en ligne, ajoutez son contenu dans
   articles-contenu.js, sous la meme cle que le title :

     window.ARTICLES_CONTENU = {
       ...
       "[Titre de l'article]": `
         <p><em>Bonjour, bonsoir a tous,</em></p>
         <h3>1. Premier chapitre</h3>
         <p>Le texte...</p>
       `,
       ...
     };

   -------------------------------------------------------------------
   C. NOUVELLE VIDEO (dans VIDEOS)
   -------------------------------------------------------------------
   {
     id: "[IDENTIFIANT_YOUTUBE]",
     titre: "[Titre de la video]",
     description: "[Description courte.]"
   }

   -------------------------------------------------------------------
   D. NOUVELLE PUBLICATION (dans PUBLICATIONS)
   -------------------------------------------------------------------
   {
     image: "images/[nom-de-l-image].jpg",
     category: "[Exegese | Theologie | Histoire]",
     date: "[12 octobre 2026]",
     read: "[15 min]",
     title: "[Titre de la publication]",
     excerpt: "[Phrase d'accroche.]",
     lien: "#"
   }

   -------------------------------------------------------------------
   POINTS DE VIGILANCE
   -------------------------------------------------------------------
   - L'identifiant d'une etude (id) et le titre d'un article (title)
     servent d'ancre d'URL. Ne les modifiez jamais apres publication.
   - Un identifiant d'etude ne contient QUE des minuscules, des chiffres
     et des tirets.
   - La date s'ecrit jj/mm/aaaa pour une etude, jj/mm/aaaa pour un
     article, et en toutes lettres pour une publication.
   - Toute image citee doit exister dans images/ sur le serveur.
   - Une etude sans <h3> ni <h4> s'affiche sans table des matieres, mais
     conserve exactement la meme mise en page que les autres.
   - Les fichiers PDF se deposent dans un dossier servi par le site
     (par exemple "la croix/") et se referencent ainsi :
        telechargement: "la croix/La Croix.docx.pdf",
        telechargementLabel: "Telecharger l'etude en PDF",
   ==================================================================== */
